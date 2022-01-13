<!--
 * @Description: 请输入当前文件描述
 * @Author: @Xin (834529118@qq.com)
 * @Date: 2022-01-06 11:31:30
 * @LastEditTime: 2022-01-13 14:37:52
 * @LastEditors: @Xin (834529118@qq.com)
-->
<template>
  <div class="scratchable-latex-container" ref="scratchableLatexContainer" :scratchable-latex-number="scratchableLatexNumber">
    <slot></slot>
  </div>
</template>
<script>
import { provide, ref, nextTick, onMounted } from 'vue'
import { scratchableLatexData } from '../injectKey'
import emitter from '../emitter/index'

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
    }
  },
  setup(props, { slots }) {
    provide(scratchableLatexData, {
      ...props.config,
      autoPlay: props.autoPlay
    })

    const scratchableLatexContainer = ref(null)

    // 获取插槽数量
    const slotsLen = props.defaultNum || slots.default().length || 0

    const maxLength = 9

    const maxSlots = slotsLen > maxLength ? maxLength : slotsLen

    const scratchableLatexNumber = ref(maxSlots)

    const handleSlots = len => {
      Array.from(scratchableLatexContainer.value.children).forEach((node, i) => {
        if (i >= len) {
          node.style.display = 'none'
          node.style.visibility = 'hidden'
        } else {
          node.style.display = 'block'
          node.style.visibility = 'visible'
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
  display: grid;
  height: 100%;
  grid-row-gap: 2px;
  grid-column-gap: 2px;
  animation: zoomIn 2s ease 1.5s 1 both;
}

.scratchable-latex-container[scratchable-latex-number="9"] {
  grid-template-columns: repeat(3, calc(33.33% - 1.33px));
  grid-template-rows: repeat(3, calc(33.33% - 1.33px));
}

.scratchable-latex-container[scratchable-latex-number="4"] {
  grid-template-columns: repeat(2, calc(50% - 1px));
  grid-template-rows: repeat(2, calc(50% - 1px));
}

.scratchable-latex-container[scratchable-latex-number="2"] {
  grid-template-columns: repeat(2, calc(50% - 1px));
  grid-template-rows: 100%;
}
</style>
