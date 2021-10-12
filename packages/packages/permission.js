/*
 * @Description: 请输入当前文件描述
 * @Author: @Xin (834529118@qq.com)
 * @Date: 2021-09-11 14:36:02
 * @LastEditTime: 2021-10-12 17:26:17
 * @LastEditors: @Xin (834529118@qq.com)
 */
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import {
  addRoutes,
  flatAsyncRoute,
  handleModules,
  handleMenu,
  mergeRoutes,
  localStorageGetLoginToken,
  handleRequestTokenElMessageBoxConfirm,
} from './utils/index'
import { createDuserStore } from './userStore/index'
import { defaultRoutes } from './router/index'
import { login, getUserInfo } from './service/index'
import { authPropsInjectKey } from './injectKey'
import { START_LOCATION } from 'vue-router'

/**
 * @description:  重定向路由（解决动态添加路由第一次不生效）
 * @param {*}
 * @return {*}
 */
const routeReplace = (routes, to, path = null) => {
  if (path) {
    return { path }
  }

  const findRoute = routes.find(route => route.path === to.path)

  const { query: { ak, ...rest }, params } = to

  // 如果动态路由中存在此路径 && vue-router 没有匹配到或者匹配到404则进行刷新
  if (findRoute && (!to.matched.length || to.matched.some(({ name }) => name === '404'))) {
    return { path: to.fullPath, replace: true, query: { ...rest }, params: params }
  } else if (!to.name) {
    // to.name 不存在应指向404
    return { path: '/404', replace: true }
  } else if (ak) {
    return {
      path: to.path,
      params,
      query: {
        ...rest
      }
    }
  }

  return true
}

export default (app, {
  loginAuth = true,
  asyncRoutes = [],
  loginPath = '',
  systemName = '通用权限平台'
}) => {
  console.log(`[dfsj-auth-module]:「接入权限管理系统」`)

  if (loginAuth && !loginPath) {
    throw Error('[dfsj-auth-module]：「已开启权限校验，请设置登录跳转地址！」')
  }

  if (asyncRoutes && !Array.isArray(asyncRoutes)) {
    throw Error('[dfsj-auth-module]：「asyncRoutes is not Array」')
  }

  const DuserStore = createDuserStore()

  app.use(DuserStore)

  const router = app.config.globalProperties.$router

  const propsData = {
    loginPath,
    systemName,
    loginAuth,
  }
  app.provide(authPropsInjectKey, propsData)

  const asynLogincRoutesPath = Array.from(
    new Set(
      flatAsyncRoute(asyncRoutes)
        .map(v => v.path)
        .filter(v => v)
    )
  )

  /**
   * @desription:  处理后端module数据
   * @param {*} modules
   * @return {*}
   */    
  const handleRequestModule = async (modules, userInfo) => {
    let Routes = []
    try {
      Routes = mergeRoutes(handleModules(modules), flatAsyncRoute(asyncRoutes))
    } catch (error) {
      handleRequestTokenElMessageBoxConfirm({
        message: error.message,
        loginPath,
        url: window.location.href.replace(/\?ak=(\S*)/, ''),
        systemName,
      })
    }

    const menus = handleMenu(Routes)

    DuserStore.setUserState({
      login: true,
      ...propsData,
      ...userInfo,
      Routes,
      menus,
      flatMenus: flatAsyncRoute(menus),
    })

    const addroutesArray = [].concat(Routes, defaultRoutes)

    await addRoutes(router, addroutesArray)

    NProgress.done()

    return {
      Routes: flatAsyncRoute(Routes),
      addroutesArray: flatAsyncRoute(addroutesArray),
    }
  }

  /**
   * @description:  登录操作
   * @param {*}
   * @return {*}
   */  
  const handleLogin = async ak => {
    await login({ ak }, loginPath, systemName)
  
    return getUserInfo(loginPath, systemName)
  }

  router.beforeEach(async (to, from) => {
    NProgress.start()

    const { ak } = to.query
    
    // 开发模式开放所有路由
    if (!loginAuth) {
      const routes = [].concat(asyncRoutes, defaultRoutes)

      let menus = []
      try {
        menus = handleMenu(asyncRoutes)
      } catch (error) {
        console.error(error)
      }

      DuserStore.setUserState({
        menus,
        flatMenus: flatAsyncRoute(menus),
      })

      await addRoutes(router, routes)

      NProgress.done()

      return routeReplace(routes, to)
    }

    if (ak && !localStorageGetLoginToken()) {
      const res = await handleLogin(ak, to)

      const { addroutesArray } = await handleRequestModule(res.data.modules, res.data)

      if (to.path === '/403') {
        return {
          path: START_LOCATION.path,
          replace: true
        }
      }

      return routeReplace(addroutesArray, to)
    }

    // store中信息丢失 且 localStorage存在
    if (localStorageGetLoginToken() && !DuserStore.userState.login) {
      const res = await getUserInfo(loginPath, systemName)

      const { modules } = res.data

      const { Routes } = await handleRequestModule(modules, res.data)
      return routeReplace(Routes, to)
    }

    // 检测访问非动态路由
    if (!asynLogincRoutesPath.includes(to.path)) {
      NProgress.done()

      await addRoutes(router, defaultRoutes)

      return routeReplace(defaultRoutes, to)
    }

    // 检测到访问动态路由 && localStorage丢失
    if (asynLogincRoutesPath.includes(to.path) && !localStorageGetLoginToken()) {
      NProgress.done()

      return {
        path: '/403',
        replace: true
      }
    }

    NProgress.done()
    return true
  })

  router.afterEach(() => {
    NProgress.done()
  })
}
