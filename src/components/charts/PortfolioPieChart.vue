<template>
  <div class="portfolio-distribution-section">
    <div class="portfolio-card">
      <!-- 饼状图容器 -->
      <div class="pie-chart-container">
        <!-- echarts饼状图容器 -->
        <div ref="pieChartRef" style="width: 100%; height: 100%"></div>

        <!-- 选中的货币图标 (左下侧) -->
        <div class="selected-currency-icon">
          <el-image
            class="currency-icon-small"
            :alt="selectedCurrency"
            :src="getCurrencyIconUrl(selectedCurrency)"
            :placeholder="'加载中...'"
          >
            <template #error>
              <el-icon class="image-error-icon"><PictureRounded /></el-icon>
            </template>
          </el-image>
        </div>

        <!-- 中心显示内容 -->
        <div class="pie-chart-center">
          <div class="allocation-percentage">{{ selectedPercentage }}%</div>
          <div class="allocation-currency">{{ selectedCurrency }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import type { ECharts } from 'echarts'
import { PictureRounded } from '@element-plus/icons-vue'

// 定义props
interface AssetData {
  name: string
  value: number
  itemStyle: {
    color: string
  }
}

interface PortfolioPieChartProps {
  assets?: AssetData[]
  selectedCurrency?: string
}

const props = withDefaults(defineProps<PortfolioPieChartProps>(), {
  assets: () => [
    { name: 'ETH', value: 50, itemStyle: { color: '#627EEA' } },
    { name: 'BTC', value: 40, itemStyle: { color: '#F7931A' } },
    { name: 'SOL', value: 10, itemStyle: { color: '#00FFA3' } },
  ],
  selectedCurrency: 'ETH',
})

// 定义emits
const emit = defineEmits<{
  'currency-change': [currency: string]
}>()

// 饼状图相关状态
const selectedPercentage = ref(50)
const pieChartRef = ref<HTMLElement>()
let pieChartInstance: ECharts | null = null

// 获取货币图标URL
const getCurrencyIconUrl = (currency: string): string => {
  const iconUrls: Record<string, string> = {
    ETH: 'https://cryptologos.cc/logos/ethereum-eth-logo.png?v=014',
    BTC: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=014',
    SOL: 'https://cryptologos.cc/logos/solana-sol-logo.png?v=014',
  }
  return iconUrls[currency] || ''
}

// 初始化饼状图
const initPieChart = () => {
  if (!pieChartRef.value) return

  // 销毁已有实例
  if (pieChartInstance) {
    pieChartInstance.dispose()
  }

  // 创建新实例
  pieChartInstance = echarts.init(pieChartRef.value)

  // 定义渐变色
  const gradientETH = new echarts.graphic.LinearGradient(0, 0, 1, 1, [
    { offset: 0, color: '#627EEA' },
    { offset: 1, color: '#57AAFF' },
  ])

  const gradientBTC = new echarts.graphic.LinearGradient(0, 0, 1, 0, [
    { offset: 0, color: '#F7931A' },
    { offset: 1, color: '#FBB95B' },
  ])

  const gradientSOL = new echarts.graphic.LinearGradient(0, 1, 1, 0, [
    { offset: 0, color: '#00FFA3' },
    { offset: 1, color: '#00B5FF' },
  ])

  const option = {
    tooltip: {
      show: false,
    },
    series: [
      {
        type: 'pie',
        radius: ['60%', '85%'],
        center: ['50%', '50%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 0,
          borderColor: '#fff',
          borderWidth: 0,
        },
        label: {
          show: false,
        },
        emphasis: {
          label: {
            show: false,
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { name: 'ETH', value: 50, itemStyle: { color: gradientETH } },
          { name: 'BTC', value: 40, itemStyle: { color: gradientBTC } },
          { name: 'SOL', value: 10, itemStyle: { color: gradientSOL } },
        ],
      },
    ],
  }

  // 设置图表配置
  pieChartInstance.setOption(option)

  // 添加窗口大小改变事件监听
  const handleResize = () => {
    pieChartInstance?.resize()
  }

  window.addEventListener('resize', handleResize)

  // 清理函数
  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
    if (pieChartInstance) {
      pieChartInstance.dispose()
      pieChartInstance = null
    }
  })
}

// 组件挂载时初始化图表
onMounted(() => {
  initPieChart()
})
</script>

<style scoped>
/* 错误状态的图片图标样式 */
.image-error-icon {
  color: #c0c4cc;
  font-size: 24px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
/* 资产配置饼状图区域样式 */
.portfolio-distribution-section {
  margin-top: 20px;
  width: 100%;
}

/* 饼状图卡片样式 - 圆角矩形 */
.portfolio-card {
  background-color: #ffffff;
  border-radius: 28px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

/* 饼状图容器样式 */
.pie-chart-container {
  position: relative;
  width: 160px;
  height: 160px;
  margin: 0 auto;
}

/* 选中的货币图标样式 - 左下侧 */
.selected-currency-icon {
  position: absolute;
  bottom: 10px;
  left: 10px;
  width: 32px;
  height: 32px;
  background-color: #f5f7fa;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

/* 货币小图标样式 */
.currency-icon-small {
  width: 20px;
  height: 20px;
  object-fit: contain;
}

/* 饼状图中心显示内容样式 */
.pie-chart-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

/* 占比值样式 - 大号黑色加粗 */
.allocation-percentage {
  font-size: 28px;
  font-weight: bold;
  color: #303133;
  margin: 0;
  line-height: 1;
  /* 确保占比值精确居中 */
  text-align: center;
  min-width: 70px;
}

/* 货币名称样式 - 黑色 */
.allocation-currency {
  font-size: 16px;
  color: #303133;
  margin: 4px 0 0 0;
  font-weight: 500;
  cursor: pointer;
  /* 确保货币名称精确居中且在占比值正下方 */
  text-align: center;
  width: auto;
  height: auto;
  min-width: 30px;
}

/* 图片错误图标样式 */
.image-error-icon {
  color: #909399;
  font-size: 16px;
}
</style>