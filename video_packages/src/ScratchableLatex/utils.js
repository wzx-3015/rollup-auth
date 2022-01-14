/*
 * @Description: 请输入当前文件描述
 * @Author: @Xin (834529118@qq.com)
 * @Date: 2022-01-14 13:27:43
 * @LastEditTime: 2022-01-14 13:27:44
 * @LastEditors: @Xin (834529118@qq.com)
 */

/**
 * @description: 计算DOM尺寸
 * @param {*}
 * @return {*}
 */
export const calcDOMSize = (num, gap = 2) => {
  if (num === 9) {
    const gapTotal = (gap * 2) / 3
    const DOMsize = `calc(${100 / 3}% - ${gapTotal}px)`
    return {
      height: DOMsize,
      width: DOMsize,
    }
  }

  if (num === 4) {
    const gapTotal = gap / 2

    const DOMsize = `calc(${100 / 2}% - ${gapTotal}px)`
    return {
      height: DOMsize,
      width: DOMsize,
    }
  }

  if (num === 2) {
    const gapTotal = gap / 2
    return {
      width: `calc(${100 / 2}% - ${gapTotal}px)`,
      height: '100%',
    }
  }

  return {
    width: '100%',
    height: '100%',
  }
}
