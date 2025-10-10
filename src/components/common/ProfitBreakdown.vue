<template>
  <div class="profit-breakdown-section">
    <div class="profit-breakdown-card">
      <!-- 标题区域 -->
      <div class="profit-breakdown-header">
        <h3 class="profit-breakdown-title">收益分解</h3>
      </div>
      <!-- 列表内容 -->
      <div class="profit-breakdown-list">
        <!-- 列表项 -->
        <div v-for="item in profitItems" :key="item.currency" class="profit-item">
          <!-- ECharts曲线进度条 -->
          <div class="echarts-progress-container">
            <div
              :ref="(el) => (profitChartRefs[item.currency] = el as HTMLElement)"
              class="progress-chart"
            ></div>
            <!-- 进度值 -->
            <div class="progress-value">{{ item.progress }}%</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'

// 定义收益项目数据结构
interface ProfitItemData {
  currency: string
  progress: number
  color: string
}

// 收益项目列表数据
const profitItems = ref<ProfitItemData[]>([
  { currency: 'BTC', progress: 84, color: '#5E91ED' },
  { currency: 'ETH', progress: 65, color: '#67c23a' },
  { currency: 'XRP', progress: 45, color: '#e6a23c' },
  { currency: 'DOT', progress: 30, color: '#409eff' },
])

// 存储各个图表实例的引用
const profitChartRefs = ref<Record<string, HTMLElement | null>>({})
const chartInstances = ref<Record<string, echarts.ECharts | null>>({})

// 生成二次函数曲线数据
const generateCurveData = (): number[][] => {
  const points: number[][] = []
  const numPoints = 50 // 增加数据点密度确保平滑度

  for (let i = 0; i <= numPoints; i++) {
    const x = i / numPoints
    // 使用平缓的二次函数 y = 0.0 + 0.5x² 生成更平缓的曲度
    const y = 0.1 + 0.5 * Math.pow(x, 2)
    points.push([x, y])
  }
  return points
}

// 根据进度生成截断的曲线数据
const generateProgressCurveData = (fullCurve: number[][], progress: number): number[][] => {
  const progressRatio = progress / 100
  const progressPoints: number[][] = []

  // 找到进度对应的数据点
  for (let i = 0; i < fullCurve.length; i++) {
    const [x, y] = fullCurve[i]
    if (x <= progressRatio) {
      progressPoints.push([x, y])
    } else {
      // 线性插值计算最后一个点
      if (i > 0) {
        const prevPoint = fullCurve[i - 1]
        const currentPoint = fullCurve[i]
        const ratio = (progressRatio - prevPoint[0]) / (currentPoint[0] - prevPoint[0])
        const interpolatedY = prevPoint[1] + ratio * (currentPoint[1] - prevPoint[1])
        progressPoints.push([progressRatio, interpolatedY])
      }
      break
    }
  }

  return progressPoints
}

// 初始化单个ECharts图表
const initChart = (currency: string, progress: number, color: string): void => {
  const chartDom = profitChartRefs.value[currency]
  if (!chartDom) return

  // 销毁已存在的实例
  if (chartInstances.value[currency]) {
    chartInstances.value[currency]?.dispose()
  }

  // 创建新的图表实例
  const chart = echarts.init(chartDom)
  chartInstances.value[currency] = chart

  // 生成完整的二次函数曲线
  const fullCurve = generateCurveData()

  // 根据进度生成截断的进度曲线
  const progressCurve = generateProgressCurveData(fullCurve, progress)

  // 配置ECharts选项
  const option = {
    grid: {
      left: 0,
      right: 0,
      top: 8, // 减小顶部边距
      bottom: 0,
    },
    xAxis: {
      show: false,
      type: 'value' as const,
      min: 0,
      max: 1,
    },
    yAxis: {
      show: false,
      type: 'value' as const,
      min: 0,
      max: 0.5, // 保持平缓曲线的最大值
      scale: true,
    },
    graphic: [
      {
        type: 'text',
        left: 0,
        top: 0, // 调整货币名称位置到图表上方
        style: {
          text: currency,
          fontSize: 10, // 减小字体大小
          fontWeight: 'bold',
          fill: color,
          textAlign: 'left',
          textVerticalAlign: 'bottom',
        },
        z: 10,
      },
    ],
    series: [
      // 背景曲线（灰色实线）- 完整的二次函数曲线
      {
        name: '背景',
        type: 'line' as const,
        smooth: true,
        symbol: 'none',
        data: fullCurve,
        lineStyle: {
          width: 1.5, // 稍微减小线条宽度
          color: '#ECECEC',
        },
        z: 1,
      },
      // 进度曲线（彩色实线）- 根据进度截断的曲线
      {
        name: '进度',
        type: 'line' as const,
        smooth: true,
        symbol: 'none',
        data: progressCurve,
        lineStyle: {
          width: 2.5, // 稍微减小线条宽度
          color: color,
        },
        z: 2,
      },
    ],
  }

  chart.setOption(option)
}

// 初始化所有图表
const initAllCharts = (): void => {
  profitItems.value.forEach((item) => {
    initChart(item.currency, item.progress, item.color)
  })
}

// 处理窗口大小变化
const handleResize = (): void => {
  Object.values(chartInstances.value).forEach((chart) => {
    chart?.resize()
  })
}

// 组件挂载时初始化图表
onMounted(() => {
  // 使用setTimeout确保DOM已经渲染完成
  setTimeout(() => {
    initAllCharts()
    window.addEventListener('resize', handleResize)
  }, 100)
})

// 组件卸载时清理图表实例
onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  Object.values(chartInstances.value).forEach((chart) => {
    chart?.dispose()
  })
})
</script>

<style scoped>
/* 收益分解模块整体样式 */
.profit-breakdown-section {
  width: 100%;
  margin-top: 0;
  /* height: 294px; */
  min-width: 270px;
}

/* 卡片样式 */
.profit-breakdown-card {
  width: 100%;
  height: 100%;
  background: #ffffff;
  border-radius: 28px;
  padding: 25px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);
  box-sizing: border-box;
}

/* 标题样式 */
.profit-breakdown-header {
  margin-bottom: 20px;
}

.profit-breakdown-title {
  font-size: 18px;
  font-weight: bold;
  color: #1b1b1b;
  margin: 0;
}

/* 列表样式 */
.profit-breakdown-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* 单个列表项样式 */
.profit-item {
  display: flex;
  align-items: center;
  gap: 12px;
  /* padding: 12px 0; */
}

/* ECharts进度条容器 */
.echarts-progress-container {
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
}

/* ECharts图表容器 */
.progress-chart {
  width: 100%;
  height: 40px;
  flex: 1;
}

/* 进度值样式 */
.progress-value {
  font-size: 14px;
  font-weight: 500;
  color: #1b1b1b;
  min-width: 35px;
  text-align: right;
}
</style>
