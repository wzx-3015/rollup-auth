<!--
 * @Description: 请输入当前文件描述
 * @Author: @Xin (834529118@qq.com)
 * @Date: 2022-01-06 11:31:30
 * @LastEditTime: 2022-01-08 11:21:43
 * @LastEditors: @Xin (834529118@qq.com)
-->
<template>
  <div class="scratchable-latex-container" :scratchable-latex-number="scratchableLatexNumber">
    <component
      v-for="(item, i) in slotsData"
      v-show="item.show"
      :style="{visibility: item.show ? 'visible' : 'hidden'}"
      :key="item.component.scopeId + i"
      :is="item.component"
      class="scratchable-latex-item"
    />
  </div>
</template>
<script>
import { provide, ref, nextTick } from 'vue'
import { scratchableLatexData } from '../injectKey'
import emitter from '../emitter/index'

export default {
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
    jessibucaConfig: {
      type: Object,
      default: () => {}
    }
  },
  setup(props, { slots }) {
    console.log(props.jessibucaConfig)
    provide(scratchableLatexData, {
      type: 'flv',
      jessibucaConfig: props.jessibucaConfig,
      autoPlay: props.autoPlay
    })

    // 获取插槽数量
    const slotsLen = props.defaultNum || slots.default().length || 0

    const maxLength = 9

    const maxSlots = slotsLen > maxLength ? maxLength : slotsLen

    const scratchableLatexNumber = ref(maxSlots)

    const slotsData = ref([])

    const handleSlots = len => {
      if (scratchableLatexNumber.value === len && slotsData.value.length) {
        return
      }

      scratchableLatexNumber.value = len

      slotsData.value = slots.default().splice(0, maxLength).map((v, i) => {
        if (i < len) {
          return {
            show: true,
            component: v,
          }
        }
        return {
          show: false,
          component: v,
        }
      })

      // 延迟等待component 加载完成
      nextTick(() => {
        emitter.emit('videShow')
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

    setScratchableLatex()

    return {
      slotsData,
      scratchableLatexNumber,
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
