/*
 * @Description: 请输入当前文件描述
 * @Author: @Xin (834529118@qq.com)
 * @Date: 2022-01-06 17:19:42
 * @LastEditTime: 2022-01-12 16:56:56
 * @LastEditors: @Xin (834529118@qq.com)
 */
export const jessibucaConfig = () => {
  return {
    videoBuffer: 1,
    decoder: 'decoder.js',
    forceNoOffscreen: true,
    hiddenAutoPause: false,
    hasAudio: false,
    rotate: 0,
    isResize: true,
    isFullSize: false,
  }
}

/**
 * @description: 校验配置项
 * @param {*}
 * @return {*}
 */
export const validatorJessibucaConfig = (config) => {
  if (!config) {
    return {}
  }

  if (config.hasOwnProperty('container')) {
    const { container, ...rest } = config
    return {
      ...rest
    }
  }

  return config
}

/**
 * @description: 获取默认配置项
 * @param {*}
 * @return {*}
 */
export const getDefaultConfig = () => {
  return {
    isNotMute: false,
    loadingText: 'loading...',
    supportDblclickFullscreen: false,
    operateBtns: {
      play: false,
      audio: false,
      fullscreen: false,
    }
  }
}
