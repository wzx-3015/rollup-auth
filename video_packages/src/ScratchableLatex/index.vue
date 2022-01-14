<!--
 * @Description: 请输入当前文件描述
 * @Author: @Xin (834529118@qq.com)
 * @Date: 2022-01-06 11:31:30
 * @LastEditTime: 2022-01-14 13:31:04
 * @LastEditors: @Xin (834529118@qq.com)
-->
<template>
  <div class="scratchable-latex-container" ref="scratchableLatexContainer" :scratchable-latex-number="scratchableLatexNumber">
    <slot></slot>
  </div>
</template>
<script>
import { provide, ref, nextTick, onMounted } from 'vue'
import { scratchableLatexConfig } from '../injectKey'
import emitter from '../emitter/index'
import { calcDOMSize } from './utils'

export default {
  name: 'scratchableLatex',
  expose: ['setScratchableLatex'],
  props: {
    defaultNum: {
      type: Number,
      default: 9
    },
    autoPlay: {
      type: Boolean,
      default: false
    },
    config: {
      type: Object,
      default: () => {}
    },
    gap: {
      type: Number,
      default: 2,
    }
  },
  setup(props, { slots }) {
    provide(scratchableLatexConfig, {
      ...props.config,
      autoPlay: props.autoPlay
    })

    const scratchableLatexContainer = ref(null)

    // 获取插槽数量
    const slotsLen = props.defaultNum || slots.default().length || 0

    const maxLength = 9

    const maxSlots = slotsLen > maxLength ? maxLength : slotsLen

    const scratchableLatexNumber = ref(maxSlots)

    const handleSlots = (len, gap = props.gap) => {
      scratchableLatexContainer.value.style.gap = `${gap}px`
      Array.from(scratchableLatexContainer.value.children).forEach((node, i) => {
        if (i >= len) {
          node.style.display = 'none'
          node.style.visibility = 'hidden'
        } else {
          const { width, height } = calcDOMSize(len, gap)
          node.style.display = 'block'
          node.style.visibility = 'visible'
          node.style.width = width
          node.style.height = height
        }
      })

      scratchableLatexNumber.value = len

      // 延迟等待component 加载完成
      nextTick(() => {
        emitter.emit('videoShow')
        emitter.emit('videoResize')
      })
    }

    /**
     * @description: 设置视频数量
     * @param {*}
     * @return {*}
     */  
    const setScratchableLatex = (len = maxSlots) => {
      if (Number(len) === 'NaN') {
        console.error('arguments is not Number')
      } else {
        handleSlots(len)
      }
    }

    onMounted(() => {
      setScratchableLatex()
    })

    return {
      scratchableLatexNumber,
      scratchableLatexContainer,
      handleSlots,
      setScratchableLatex
    }
  },
}
</script>

<style lang="less" scoped>
.scratchable-latex-container {
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  transition: all 0.2s;
  gap: 2px;
  // animation: zoomIn 2s ease 1.5s 1 both;
  ::v-deep(.scratchable--latex--item-9) {
    width: calc(100% / 3);
    height: calc(100% / 3);
  }

  ::v-deep(.scratchable--latex--item-4) {
    width: calc(100% / 2);
    height: calc(100% / 2);
  }

  ::v-deep(.scratchable--latex--item-2) {
    width: calc(100% / 2);
    height: 100%;
  }
}


// .scratchable-latex-container[scratchable-latex-number="9"] {
//   grid-template-columns: repeat(3, 33.33%);
//   grid-template-rows: repeat(3, calc(33.33% - 1.33px));
// }

// .scratchable-latex-container[scratchable-latex-number="4"] {
//   grid-template-columns: repeat(2, calc(50% - 1px));
//   grid-template-rows: repeat(2, calc(50% - 1px));
// }

// .scratchable-latex-container[scratchable-latex-number="2"] {
//   grid-template-columns: repeat(2, calc(50% - 1px));
//   grid-template-rows: 100%;
// }
</style>
