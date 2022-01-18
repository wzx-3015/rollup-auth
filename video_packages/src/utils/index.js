/*
 * @Description: 请输入当前文件描述
 * @Author: @Xin (834529118@qq.com)
 * @Date: 2022-01-05 13:26:36
 * @LastEditTime: 2022-01-18 11:39:19
 * @LastEditors: @Xin (834529118@qq.com)
 */
import emitter from '../emitter/index'
import { unref } from 'vue'

/**
 * @description: 加载文件Jessibuca
 * @param {*}
 * @return {*}
 */
export const loadJessibuca = (
  url = "/video_packages/dist/jessibuca/jessibuca.js"
) => {
  const jscript_essibuca = document.querySelector("script[jessibuca]");
  if (window.Jessibuca) {
    return Promise.resolve(window.Jessibuca);
  }

  if (jscript_essibuca) {
    return new Promise((resolve, reject) => {
      jscript_essibuca.addEventListener("load", () => {
        resolve(window.Jessibuca);
      });
    });
  }

  const script = document.createElement("script");
  script.src = url;
  script.setAttribute("jessibuca", true);

  return new Promise((resolve, reject) => {
    script.addEventListener("load", () => {
      resolve(window.Jessibuca);
    });

    script.onerror = (err) => {
      console.error(err);
      document.body.removeChild(script)
      reject(err);
    };

    document.body.appendChild(script);
  });
};

/**
 * @description: 全屏操作
 * @param {*}
 * @return {*}
 */
export const launchFullscreen = (element) => {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullScreen();
  }
};

/**
 * @description: 退出全屏操作
 * @param {*}
 * @return {*}
 */
export const exitFullscreen = () => {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
};

/**
 * @description: 判断元素是否可见
 * @param {*}
 * @return {*}
 */
export const isDOMVisible = el => {
  if (!el) return false;

  const style = window.getComputedStyle(unref(el))

  return style.visibility === 'visible'
}

/**
 * @description: emitter事件
 * @param {Object} emitterEventObject 事件对象
 * @return {Object}
 */
export const handleEmitterEvent = (emitterEventObject) => {
  return {
    // 监听事件
    on: () => {
      Object.entries(emitterEventObject).forEach(([ eventName, fn ]) => {
        if(typeof fn !== 'function') {
          return
        }
        emitter.on(eventName, fn)
      })
    },
    // 移除事件
    off: () => {
      Object.entries(emitterEventObject).forEach(([ eventName, fn ]) => {
        if(typeof fn !== 'function') {
          console.error(`key: ${eventName} value is not a function`)
          return
        }
        emitter.off(eventName, fn)
      })
    }
  }
}

/**
 * @description: 处理DOM事件函数
 * @param {String} eventName 事件名称
 * @param {Function} fn 事件方法
 * @param {DOM} dom 元素默认为window
 * @return {*}
 */
export const handleDOMEventLinstener = (eventName, fn, el = window) => {
  if (typeof fn !== 'function') {
    console.error(`${fn} is not a function`)
    return
  }

  return {
    on: () => {
      unref(el).addEventListener(eventName, fn)
    },
    off: () => {
      unref(el).removeEventListener(eventName, fn)
    }
  }
}

/**
 * @description: 处理多个事件监听
 * @param {Object} EventObject 事件对象
 * @param {DOM} DOM dom元素默认为window
 * @return {Object}
 */
export const handleDOMEventLinsteners = (EventObject, el = window) => {
  const eventLinsteners = Object.entries(EventObject).map(([ eventName, fn ]) => {
    if(typeof fn !== 'function') {
      return
    }

    return handleDOMEventLinstener(eventName, fn, el)
  })

  return {
    on: () => eventLinsteners.forEach(({ on }) => on && on()),
    off: () => eventLinsteners.forEach(({ off }) => off && off())
  }
}
