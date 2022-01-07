/*
 * @Description: 请输入当前文件描述
 * @Author: @Xin (834529118@qq.com)
 * @Date: 2022-01-05 13:26:36
 * @LastEditTime: 2022-01-06 17:24:55
 * @LastEditors: @Xin (834529118@qq.com)
 */

/**
 * @description: 获取音频权限
 * @param {*}
 * @return {*}
 */
export const getMediaDevices = () => {
  if (navigator && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    return navigator.mediaDevices.getUserMedia({ audio: true })
  }

  return Promise.reject('no mediaDevices')
}

/**
 * @description: 加载文件Jessibuca
 * @param {*}
 * @return {*}
 */
export const loadJessibuca = (url = '/jessibuca.js') => {
  const jscript_essibuca = document.querySelector('script[jessibuca]')
  if (window.Jessibuca) {
    return Promise.resolve(window.Jessibuca)
  }

  if (jscript_essibuca) {
    return new Promise((resolve, reject) => {
      jscript_essibuca.addEventListener('load', () => {
        resolve(window.Jessibuca)
      })
    })
  }

  const script = document.createElement('script')
  script.src = url
  script.setAttribute('jessibuca', true)

  return new Promise((resolve, reject) => {
    script.addEventListener('load', () => {
      resolve(window.Jessibuca)
    })

    script.onerror = err => {
      console.error(err)
      reject(err)
    }

    document.body.appendChild(script)
  })
}
