/*
 * @Description: 请输入当前文件描述
 * @Author: @Xin (834529118@qq.com)
 * @Date: 2022-01-06 17:19:42
 * @LastEditTime: 2022-01-06 17:26:35
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
