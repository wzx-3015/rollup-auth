/*
 * @Description: 请输入当前文件描述
 * @Author: @Xin (834529118@qq.com)
 * @Date: 2021-09-15 10:10:43
 * @LastEditTime: 2021-10-12 15:50:57
 * @LastEditors: @Xin (834529118@qq.com)
 */
import { inject } from 'vue'

export const injectKey = 'DuserStore'

export function useDStore () {
  return inject(injectKey)
}
