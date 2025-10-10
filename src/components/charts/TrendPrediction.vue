<template>
  <div class="trend-prediction-container">
    <!-- 页面标题 -->
    <div class="prediction-header">
      <h2 class="prediction-title">走势预测</h2>
    </div>

    <!-- 响应式网格布局的卡片容器 -->
    <div class="prediction-grid">
      <!-- 第一个卡片：解锁卡片 -->
      <div class="prediction-card unlock-card">
        <div class="card-content">
          <!-- 顶部货币图标 -->
          <div class="currency-icons">
            <div class="icon-wrapper bitcoin-icon">
              <i class="fab fa-bitcoin"></i>
            </div>
            <div class="icon-wrapper ethereum-icon right-icon">
              <i class="fab fa-ethereum"></i>
            </div>
          </div>

          <!-- 中间图表区域 -->
          <div class="chart-section">
            <div class="echart-container" v-if="isUnlocked">
              <div ref="unlockChart"></div>
            </div>
          </div>

          <!-- 新的解锁覆盖层 -->
          <div class="lock-overlay" v-if="!isUnlocked" @click="unlockCard">
            <div class="lock-content">
              <div class="empty-element"></div>
              <span class="lock-price">¥34</span>
              <i class="fas fa-lock lock-icon"></i>
            </div>
          </div>

          <!-- 免责声明 -->
          <div class="disclaimer-section">
            <span class="disclaimer-text">该预测只作为参考 不作为实际运用</span>
          </div>
        </div>
      </div>

      <!-- 第二个卡片：上涨预测 -->
      <div class="prediction-card uptrend-card">
        <div class="card-content">
          <!-- 顶部货币图标 -->
          <div class="currency-icons">
            <div class="icon-wrapper ethereum-icon">
              <i class="fab fa-ethereum"></i>
            </div>
            <div class="icon-wrapper litecoin-icon right-icon">
              <i class="fas fa-coins"></i>
            </div>
          </div>

          <!-- 中间趋势图表 -->
          <div class="chart-section">
            <div ref="upChart" class="echart-container"></div>
          </div>

          <!-- 免责声明 -->
          <div class="disclaimer-section">
            <span class="disclaimer-text">该预测只作为参考 不作为实际运用</span>
          </div>
        </div>
      </div>

      <!-- 第三个卡片：下跌预测 -->
      <div class="prediction-card downtrend-card">
        <div class="card-content">
          <!-- 顶部货币图标 -->
          <div class="currency-icons">
            <div class="icon-wrapper litecoin-icon">
              <i class="fas fa-coins"></i>
            </div>
            <div class="icon-wrapper bitcoin-icon right-icon">
              <i class="fab fa-bitcoin"></i>
            </div>
          </div>

          <!-- 中间趋势图表 -->
          <div class="chart-section">
            <div ref="downChart" class="echart-container"></div>
          </div>

          <!-- 免责声明 -->
          <div class="disclaimer-section">
            <span class="disclaimer-text">该预测只作为参考 不作为实际运用</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import * as echarts from 'echarts'

// 图表引用
const upChart = ref<HTMLElement>()
const downChart = ref<HTMLElement>()
const unlockChart = ref<HTMLElement>()

// 解锁状态
const isUnlocked = ref(false)

// 解锁卡片函数
const unlockCard = () => {
  // 这里可以添加实际的解锁逻辑，比如调用API、验证支付等
  // 现在只是模拟解锁
  isUnlocked.value = true

  // 解锁后重新初始化图表
  nextTick(() => {
    initUnlockChart()
  })
}

// 初始化上涨图表
const initUpChart = () => {
  if (!upChart.value) return

  const chart = echarts.init(upChart.value)
  const option = {
    grid: {
      left: 0,
      right: 0,
      top: 5,
      bottom: 5,
      containLabel: false,
    },
    xAxis: {
      type: 'category',
      data: ['1', '2', '3', '4', '5', '6', '7'],
      show: false,
    },
    yAxis: {
      type: 'value',
      show: false,
      min: 0,
      max: 100,
    },
    series: [
      {
        data: [45, 38, 32, 25, 18, 12, 8],
        type: 'line',
        smooth: true,
        lineStyle: {
          color: '#ef4444',
          width: 1,
        },
        symbol: 'circle',
        symbolSize: 0,
        itemStyle: {
          color: '#ef4444',
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(239, 68, 68, 0.3)' },
              { offset: 1, color: 'rgba(239, 68, 68, 0.05)' },
            ],
          },
        },
      },
    ],
  }

  chart.setOption(option)

  // 添加百分比标注
  chart.setOption({
    graphic: [
      {
        type: 'text',
        left: 'center',
        top: '25%',
        style: {
          text: '+12.36%',
          fontSize: 14,
          fontWeight: 'bold',
          fill: '#ef4444',
          textAlign: 'center',
        },
      },
    ],
  })
}

// 初始化解锁图表
const initUnlockChart = () => {
  if (!unlockChart.value) return

  const chart = echarts.init(unlockChart.value)
  const option = {
    grid: {
      left: 0,
      right: 0,
      top: 5,
      bottom: 5,
      containLabel: false,
    },
    xAxis: {
      type: 'category',
      data: ['1', '2', '3', '4', '5', '6', '7'],
      show: false,
    },
    yAxis: {
      type: 'value',
      show: false,
      min: 0,
      max: 100,
    },
    series: [
      {
        data: [20, 25, 30, 28, 32, 35, 38],
        type: 'line',
        smooth: true,
        lineStyle: {
          color: '#3b82f6',
          width: 1,
        },
        symbol: 'circle',
        symbolSize: 0,
        itemStyle: {
          color: '#3b82f6',
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(59, 130, 246, 0.3)' },
              { offset: 1, color: 'rgba(59, 130, 246, 0.05)' },
            ],
          },
        },
      },
    ],
  }

  chart.setOption(option)

  // 添加百分比标注
  chart.setOption({
    graphic: [
      {
        type: 'text',
        left: 'center',
        top: '25%',
        style: {
          text: '+15.24%',
          fontSize: 14,
          fontWeight: 'bold',
          fill: '#3b82f6',
          textAlign: 'center',
        },
      },
    ],
  })
}

// 初始化下跌图表
const initDownChart = () => {
  if (!downChart.value) return

  const chart = echarts.init(downChart.value)
  const option = {
    grid: {
      left: 0,
      right: 0,
      top: 5,
      bottom: 5,
      containLabel: false,
    },
    xAxis: {
      type: 'category',
      data: ['1', '2', '3', '4', '5', '6', '7'],
      show: false,
    },
    yAxis: {
      type: 'value',
      show: false,
      min: 0,
      max: 100,
    },
    series: [
      {
        data: [8, 15, 22, 28, 35, 42, 48],
        type: 'line',
        smooth: true,
        lineStyle: {
          color: '#22c55e',
          width: 1,
        },
        symbol: 'circle',
        symbolSize: 0,
        itemStyle: {
          color: '#22c55e',
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(34, 197, 94, 0.3)' },
              { offset: 1, color: 'rgba(34, 197, 94, 0.05)' },
            ],
          },
        },
      },
    ],
  }

  chart.setOption(option)

  // 添加百分比标注
  chart.setOption({
    graphic: [
      {
        type: 'text',
        left: 'center',
        top: '25%',
        style: {
          text: '-39.56%',
          fontSize: 14,
          fontWeight: 'bold',
          fill: '#22c55e',
          textAlign: 'center',
        },
      },
    ],
  })
}

onMounted(() => {
  nextTick(() => {
    initUpChart()
    initDownChart()
    initUnlockChart()
  })
})
</script>

<style scoped>
/* 整体容器 */
.trend-prediction-container {
  padding: 20px 0;
  /* margin: 0 16px; */
  /* min-width: 291px; */
  width: 100%;
  height: fit-content;
  min-width: fit-content;
}

/* 标题样式 */
.prediction-header {
  margin-bottom: 24px;
  /* text-align: center; */
}

.prediction-title {
  font-size: 18px;
  font-weight: bold;
  color: #1b1b1b;
  margin: 0;
}

/* 响应式网格布局 - 改为纵向排列 */
.prediction-grid {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  width: 100%;
}

/* 卡片通用样式 - 适配横向排列，紧凑设计 */
.prediction-card {
  border-radius: 20px;
  padding: 17px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: fit-content;
  box-sizing: border-box;
  position: relative; /* 为毛玻璃效果提供定位上下文 */
}

.prediction-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
}

/* 卡片背景色 - 统一白色背景，无边框 */
.unlock-card,
.uptrend-card,
.downtrend-card {
  background: #ffffff;
  border: none;
}

/* 卡片内容区域 - 横向排列，紧凑间距 */
.card-content {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 14px;
  justify-content: space-between;
  width: 100%;
  height: 50px;
}

/* 货币图标区域 - 横向排列，紧凑间距 */
.currency-icons {
  position: relative;
  height: 49px;
  width: 49px;
  background-color: #f1f1ef;
  border-top-left-radius: 14px;
  border-bottom-left-radius: 35px;
  border-top-right-radius: 35px;
  border-bottom-right-radius: 14px;
  flex-shrink: 0;
  border: 4px solid transparent;
  z-index: 15; /* 确保在解锁覆盖层之上 */
}

.icon-wrapper {
  position: absolute;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease;
  z-index: 20; /* 确保在解锁覆盖层之上 */
}

.icon-wrapper:hover {
  transform: scale(1.05);
}

.icon-wrapper i {
  font-size: 16px;
}

.bitcoin-icon i {
  color: #f7931a;
}

.ethereum-icon i {
  color: #627eea;
  position: absolute;
}

.right-icon {
  right: 0%;
  bottom: 0%;
}

.litecoin-icon i {
  color: #bfbbbb;
}

/* 解锁区域 - 横向排列，紧凑布局 */
.unlock-section {
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: center;
}

.unlock-info {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #6b7280;
  font-size: 12px;
  font-weight: 500;
}

.unlock-icon {
  font-size: 18px;
  color: #9ca3af;
}

/* 图表区域 - 横向排列，ECharts图表 */
.chart-section {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  width: 60px;
  height: 100%;
}

/* 解锁占位区域 */
.unlock-placeholder {
  width: 110px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f9fafb;
  border-radius: 8px;
  border: 1px dashed #d1d5db;
}

.echart-container {
  width: 100%;
  height: 100%;
}

.chart-svg {
  width: 100%;
  height: 100%;
}

/* 新增的毛玻璃覆盖层样式 */
.lock-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #eaeaea2a; /* 灰色半透明背景 */
  backdrop-filter: blur(10px); /* 毛玻璃效果 */
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10; /* 确保在其他内容之上 */
}

.lock-content {
  display: flex;
  align-items: center;
  justify-content: space-between; /* 使用space-between实现均匀分布 */
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

.empty-element {
  width: 16px; /* 与锁图标大致相同的宽度，保持对称 */
}

.lock-price {
  font-size: 16px;
  font-weight: bold;
  color: #000000; /* 黑色文字 */
}

.lock-icon {
  font-size: 16px;
  color: #000000; /* 黑色图标 */
  /* margin-left: auto; */
}

/* 免责声明区域 - 横向排列，灰色文字 */
.disclaimer-section {
  display: flex;
  align-items: center;
  /* margin-left: auto; */
  width: 120px;
  flex-shrink: 0;
  position: relative; /* 确保在毛玻璃层之下 */
  z-index: 5; /* 确保在毛玻璃层之下 */
}

.disclaimer-text {
  font-size: 12px;
  color: #9ca3af;
  line-height: 1.3;
  text-align: center;
  margin: 0;
}

/* 底部免责声明 - 横向排列时隐藏 */
.card-footer {
  display: none;
}

.disclaimer {
  font-size: 12px;
  color: #6b7280;
  line-height: 1.4;
}
</style>
