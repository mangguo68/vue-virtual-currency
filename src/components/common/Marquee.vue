<template>
  <div class="marquee-container" ref="containerRef" :style="{ minWidth: `${minWidth}px` }">
    <div class="marquee-wrapper">
      <div
        class="marquee-text"
        ref="textRef"
        :class="{ animate: isOverflowing }"
        :data-text="text"
        :style="{
          animationDuration: `${duration}s`,
          '--gap-size': `${gap}px`,
        }"
      >
        {{ text }}
      </div>
    </div>

    <div v-if="showStatus" class="marquee-status" :class="statusClass">
      {{ statusText }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'

interface Props {
  // 走马灯文字内容
  text: string
  // 容器最小宽度
  minWidth?: number
  // 是否显示状态信息
  showStatus?: boolean
  // 动画速度（秒）
  duration?: number
  // 原始文本与复制文本之间的间距（像素）
  gap?: number
}

const props = withDefaults(defineProps<Props>(), {
  text: '',
  minWidth: 200,
  showStatus: false,
  duration: 8,
  gap: 30,
})

// 元素引用
const containerRef = ref<HTMLElement | null>(null)
const textRef = ref<HTMLElement | null>(null)

// 状态
const isOverflowing = ref(false)
const textWidth = ref(0)
const containerWidth = ref(0)

// ResizeObserver实例
let resizeObserver: ResizeObserver | null = null

// 计算状态文本和类名
const statusText = computed(() =>
  isOverflowing.value
    ? `文字溢出，走马灯动画运行中（间距: ${props.gap}px）`
    : '文字未溢出，正常显示',
)

const statusClass = computed(() => (isOverflowing.value ? 'overflow' : 'normal'))

// 测量文本宽度
const measureTextWidth = (): number => {
  if (!textRef.value) return 0

  const temp = document.createElement('span')
  const textStyle = getComputedStyle(textRef.value)

  // 复制文本样式
  temp.style.font = textStyle.font
  temp.style.fontSize = textStyle.fontSize
  temp.style.fontFamily = textStyle.fontFamily
  temp.style.fontWeight = textStyle.fontWeight
  temp.style.letterSpacing = textStyle.letterSpacing
  temp.style.whiteSpace = 'nowrap'
  temp.style.padding = textStyle.padding
  temp.textContent = props.text

  // 添加到DOM中测量
  document.body.appendChild(temp)
  const width = temp.offsetWidth
  document.body.removeChild(temp)

  textWidth.value = width
  return width
}

// 检测是否溢出
const checkOverflow = (): void => {
  if (!containerRef.value) return

  containerWidth.value = containerRef.value.clientWidth
  isOverflowing.value = textWidth.value > containerWidth.value
}

// 初始化ResizeObserver
const initResizeObserver = () => {
  if (!containerRef.value) return

  resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      if (entry.target === containerRef.value) {
        checkOverflow()
      }
    }
  })

  resizeObserver.observe(containerRef.value)
}

// 清理ResizeObserver
const cleanupResizeObserver = () => {
  if (resizeObserver) {
    resizeObserver.disconnect()
    resizeObserver = null
  }
}

// 初始化测量
onMounted(() => {
  nextTick(() => {
    measureTextWidth()
    checkOverflow()
    initResizeObserver()
  })
})

// 组件卸载时清理
onUnmounted(() => {
  cleanupResizeObserver()
})

// 监听文本变化 - 重新测量宽度
watch(
  () => props.text,
  () => {
    nextTick(() => {
      measureTextWidth()
      checkOverflow()
    })
  },
)

// 监听容器最小宽度变化
watch(
  () => props.minWidth,
  () => {
    nextTick(() => {
      checkOverflow()
    })
  },
)

// 监听动画速度变化
watch(
  () => props.duration,
  (newDuration) => {
    if (textRef.value && isOverflowing.value) {
      textRef.value.style.animationDuration = `${newDuration}s`
    }
  },
)
</script>

<style scoped>
.marquee-container {
  width: 100%;
  position: relative;
  /* background-color: #65b4ae; */
  border-radius: 8px;
}

.marquee-wrapper {
  width: 100%;
  overflow: hidden;
  position: relative;
  white-space: nowrap;
}

.marquee-text {
  display: inline-block;
  color: #fff;
  white-space: nowrap;
  font-size: 14px;
  color: #909399;
}

.marquee-text:hover {
  animation-play-state: paused;
}

.marquee-text.animate {
  animation: marquee linear infinite;
}

/* 创建无缝循环的副本 - 添加间距 */
.marquee-text.animate::before {
  content: attr(data-text);
  position: absolute;
  left: 100%; /* 放置在原始文本右侧 */
  top: 0;
  white-space: nowrap;
  /* padding: 0 16px; */
  /* 关键修复：在副本前添加间距 */
  margin-left: var(--gap-size, 30px);
}

@keyframes marquee {
  0% {
    transform: translateX(0%);
  }
  100% {
    /* 关键修复：考虑间距的偏移量 */
    transform: translateX(calc(-100% - var(--gap-size, 30px)));
  }
}

.marquee-status {
  margin-top: 10px;
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 0.9rem;
  background: rgba(0, 0, 0, 0.2);
  text-align: center;
}

.marquee-status.overflow {
  color: #ff6b6b;
}

.marquee-status.normal {
  color: #51cf66;
}
</style>