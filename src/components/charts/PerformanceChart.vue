<template>
  <div class="performance-section">
    <div class="performance-card">
      <div class="performance-header">
        <h3 class="performance-title">收益表现</h3>
      </div>
      <div ref="chartRef" class="chart-container"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import * as echarts from 'echarts'

const chartRef = ref<HTMLElement | null>(null)
let chartInstance: echarts.ECharts | null = null
let chartOption: any

const initChart = () => {
  if (!chartRef.value) return
  if (chartInstance) chartInstance.dispose()
  chartInstance = echarts.init(chartRef.value)

  const months = ['一月', '二月', '三月', '四月', '五月', '六月']

  // 重新设计图表配置以匹配参考图
  chartOption = {
    grid: { top: '20%', bottom: '10%', left: '0%', right: '0%' },
    xAxis: {
      type: 'category',
      data: months,
      axisLine: {
        lineStyle: {
          color: 'transparent',
        },
      },
      axisTick: { show: false },
      axisLabel: {
        color: '#1B1B1B', // 灰色字体
        fontSize: 12,
      },
    },
    yAxis: {
      type: 'value',
      show: false,
      splitLine: { show: false },
    },
    series: [
      // 散点图系列 - 纯黑点无连线
      {
        name: '散点图',
        data: [100, 80, 30, 40, 60, 90], // 调整数据以匹配参考图
        type: 'scatter',
        symbol: 'circle',
        symbolSize: 8, // 大黑点
        itemStyle: {
          color: '#1B1B1B', // 纯黑
        },
        z: 1,
      },
      // 虚线图系列 - 灰色虚线+空心灰圈
      {
        name: '虚线图',
        data: [110, 70, 90, 60, 80, 100], // 调整数据以匹配参考图
        type: 'line',
        smooth: true, // 平滑曲线
        symbol: 'circle',
        symbolSize: 8,
        lineStyle: {
          width: 1,
          type: 'dashed', // 虚线
          color: '#CCCCCC', // 灰色
        },
        itemStyle: {
          color: '#FFFFFF', // 空心
          borderColor: '#CCCCCC', // 灰色边框
          borderWidth: 1,
        },
        z: 2,
      },
      // 复杂线图系列 - 黑色实线+三层同心圆点样式
      {
        name: '复杂线图',
        data: [80, 120, 100, 70, 130, 140], // 调整数据以匹配参考图
        type: 'line',
        smooth: true, // 平滑曲线
        symbol: 'none', // 不显示默认点，通过自定义系列显示
        lineStyle: {
          width: 1,
          color: '#989898', // 黑色
        },
        z: 3,
      },
      // 自定义系列 - 复杂点样式和标签
      {
        name: '自定义点样式',
        type: 'custom',
        renderItem: renderCustomPoints,
        data: [
          [0, 80, null], // 一月
          [1, 120, 4.5], // 二月，带标签 4.5%
          [2, 100, 3.5], // 三月，带标签 +3.5%
          [3, 70, null], // 四月
          [4, 130, -8.5], // 五月，带标签 8.5%
          [5, 140, 19.5], // 六月，带标签 19.5%
        ],
        z: 10,
      },
    ],
  }

  chartInstance.setOption(chartOption)
}

// 自定义渲染函数，用于绘制参考图中的复杂点样式
function renderCustomPoints(params: any, api: any) {
  const xIndex = api.value(0)
  const value = api.value(1)
  const labelValue = api.value(2)
  const point = api.coord([xIndex, value])

  const children = <any>[]

  function UpStyle() {
    // 正值，绘制增长的样式
    // 最外层的透明蓝圈
    children.push({
      type: 'circle',
      shape: { cx: point[0], cy: point[1], r: 17 },
      style: {
        fill: 'rgba(204, 215, 235, 0.3)',
        stroke: '#DBDDEA',
        lineWidth: 1,
      },
      z2: 1,
    })

    // 中间的蓝圈
    children.push({
      type: 'circle',
      shape: { cx: point[0], cy: point[1], r: 8 },
      style: {
        fill: 'rgba(219, 221, 234, 0.3)',
        stroke: '#DBDDEA',
        lineWidth: 1,
      },
      z2: 2,
    })

    // 中心的黑圈
    children.push({
      type: 'circle',
      shape: { cx: point[0], cy: point[1], r: 3 },
      style: {
        fill: '#FFF',
        stroke: '#000000',
        lineWidth: 1,
      },
      z2: 3,
    })

    children.push({
      type: 'circle',
      shape: { cx: point[0], cy: point[1], r: 5 },
      style: {
        fill: '#FFF',
      },
      z2: 2,
    })

    // 绘制标签
    children.push({
      type: 'text',
      style: {
        text: '+3.5%',
        fill: 'rgb(245,108,108)',
        fontSize: 10,
        x: point[0] - 12,
        y: point[1] - 35,
      },
      z2: 5,
    })

    // 绘制路径
    children.push({
      type: 'path',
      x: point[0] - 17,
      y: point[1] - 18,
      shape: {
        d: `M34 45C34 50.5228 29.5228 55 24 55L10 55C4.47715 55 0 50.5228 0 45L0 17C0 7.61116 7.61116 0 17 0C26.3888 0 34 7.61116 34 17L34 45Z`,
      },
      style: {
        fill: 'rgba(204, 215, 235, 0.3)',
      },
      z2: 0,
    })
  }

  function DownStyle() {
    // 负值，绘制下降的样式
    // 最外层的透明蓝圈
    children.push({
      type: 'circle',
      shape: { cx: point[0], cy: point[1], r: 17 },
      style: {
        fill: 'rgba(94, 145, 237, 0.3)',
        stroke: '#5E91ED',
        lineWidth: 1,
      },
      z2: 1,
    })

    // 中间的蓝圈
    children.push({
      type: 'circle',
      shape: { cx: point[0], cy: point[1], r: 8 },
      style: {
        fill: '#92B7FA',
        stroke: '#5E91ED',
        lineWidth: 1,
      },
      z2: 2,
    })

    // 中心的黑圈
    children.push({
      type: 'circle',
      shape: { cx: point[0], cy: point[1], r: 3 },
      style: {
        fill: '#FFF',
        stroke: '#000000',
        lineWidth: 1,
      },
      z2: 3,
    })

    // 绘制方形
    children.push({
      type: 'rect',
      shape: {
        x: point[0] - 15,
        y: point[1] + 28,
        width: 30,
        height: 30,
        r: [10, 10, 10, 10],
      },
      style: {
        fill: 'rgba(0, 0, 0, 1)',
        stroke: '#ffffff',
        lineWidth: 1,
      },
      z2: 4,
    })

    // 绘制标签
    children.push({
      type: 'text',
      style: {
        text: '3.5%',
        fill: 'rgb(103,194, 58)',
        fontSize: 10,
        x: point[0] - 12,
        y: point[1] + 38,
      },
      z2: 5,
    })

    // 绘制路径
    children.push({
      type: 'path',
      x: point[0] - 17,
      y: point[1] - 18,
      shape: {
        d: `M34 68C34 73.5229 29.5228 78 24 78L10 78C4.47715 78 0 73.5229 0 68L0 17C0 7.61116 7.61116 0 17 0C26.3888 0 34 7.61116 34 17L34 68Z`,
      },
      style: {
        fill: 'rgba(94, 145, 237, 0.3)',
      },
      z2: 0,
    })
  }

  function NoLabelStyle() {
    // 无标签，绘制持平的样式
    // 最外层的透明蓝圈
    children.push({
      type: 'circle',
      shape: { cx: point[0], cy: point[1], r: 17 },
      style: {
        fill: 'rgba(94, 145, 237, 0.3)',
        stroke: '#5E91ED',
        lineWidth: 1,
      },
      z2: 1,
    })

    // 中间的蓝圈
    children.push({
      type: 'circle',
      shape: { cx: point[0], cy: point[1], r: 8 },
      style: {
        fill: '#92B7FA',
        stroke: '#5E91ED',
        lineWidth: 1,
      },
      z2: 2,
    })

    // 中心的黑圈
    children.push({
      type: 'circle',
      shape: { cx: point[0], cy: point[1], r: 3 },
      style: {
        fill: '#FFF',
        stroke: '#000000',
        lineWidth: 1,
      },
      z2: 3,
    })
  }

  // 根据参考图样式，绘制三层同心圆点
  if (labelValue > 0) {
    // 正值，绘制增长的样式
    UpStyle()
  } else if (labelValue < 0) {
    // 负值，绘制下降的样式
    DownStyle()
  } else {
    // 无标签，绘制持平的样式
    NoLabelStyle()
  }

  return {
    type: 'group',
    children: children,
  }
}

const handleResize = () => chartInstance?.resize()

onMounted(() =>
  nextTick(() => {
    initChart()
    window.addEventListener('resize', handleResize)
  }),
)

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  chartInstance?.dispose()
  chartInstance = null
})
</script>

<style scoped>
.performance-section {
  width: 100%;
  min-width: 0px;
  /* min-height: 305px; */
}
.performance-card {
  width: 100%;
  height: 100%;
  background: #ffffff;
  border-radius: 28px;
  padding: 25px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);
  box-sizing: border-box;
}
.performance-header {
  margin-bottom: 20px;
}
.performance-title {
  font-size: 18px;
  font-weight: bold;
  color: #1b1b1b;
  margin: 0;
}
.chart-container {
  width: 100%;
  min-height: 208px;
  display: flex;
  align-items: center;
  justify-content: center;
}
@media (max-width: 1200px) {
  .chart-container {
    height: 250px;
  }
}
</style>
