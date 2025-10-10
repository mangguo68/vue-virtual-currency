<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import * as echarts from 'echarts'

// 定义props
interface Props {
  data?: number[]
  color?: string
}

const props = withDefaults(defineProps<Props>(), {
  data: () => [20, 35, 28, 45, 38, 52, 41, 48, 55, 42],
  color: undefined,
})

// 图表容器引用
const chartRef = ref<HTMLElement>()
let chartInstance: echarts.ECharts | null = null

// 计算趋势和颜色（中国股市标准：上涨红色，下跌绿色）
const getTrendColor = (data: number[]) => {
  if (data.length < 2) return '#409eff'

  const first = data[0]
  const last = data[data.length - 1]
  const change = last - first

  if (change > 0) {
    return '#f56c6c' // 红色 - 正增长（上涨）
  } else if (change < 0) {
    return '#67c23a' // 绿色 - 负增长（下跌）
  } else {
    return '#409eff' // 蓝色 - 持平
  }
}

// 初始化图表
const initChart = () => {
  if (!chartRef.value) return

  if (chartInstance) {
    chartInstance.dispose()
  }

  chartInstance = echarts.init(chartRef.value)

  const lineColor = props.color || getTrendColor(props.data)
  const areaColor = lineColor.replace(')', ', 0.1)').replace('rgb', 'rgba')

  const option: echarts.EChartsOption = {
    grid: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      containLabel: false,
    },
    xAxis: {
      type: 'category',
      data: props.data.map((_, index) => index.toString()),
      show: false,
    },
    yAxis: {
      type: 'value',
      show: false,
      min: Math.min(...props.data) - 5,
      max: Math.max(...props.data) + 5,
    },
    series: [
      {
        data: props.data,
        type: 'line',
        smooth: true,
        lineStyle: {
          color: lineColor,
          width: 2,
        },
        symbol: 'none', // 不显示点
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: areaColor },
              { offset: 1, color: 'rgba(255, 255, 255, 0)' },
            ],
          },
        },
      },
    ],
  }

  chartInstance.setOption(option)
}

// 响应式处理
const handleResize = () => {
  chartInstance?.resize()
}

// 监听数据变化
watch(
  () => props.data,
  () => {
    nextTick(() => {
      initChart()
    })
  },
  { deep: true },
)

// 生命周期
onMounted(() => {
  nextTick(() => {
    initChart()
    window.addEventListener('resize', handleResize)
  })
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  if (chartInstance) {
    chartInstance.dispose()
    chartInstance = null
  }
})
</script>

<template>
  <div class="micro-echart-container">
    <div ref="chartRef" class="micro-chart"></div>
  </div>
</template>

<style lang="scss" scoped>
.micro-echart-container {
  width: 100%;
  height: 100%;
}

.micro-chart {
  width: 100%;
  height: 100%;
}
</style>