<template>
  <div class="switch-page-container">
    <div class="page-header">
      <h1 class="page-title">服务器状态</h1>
      <p class="page-subtitle">服务器状态监控和管理（由于该页面无UI设计图，所以UI较为随意）</p>
    </div>

    <div class="grow content">
      <!-- 服务器状态卡片 -->
      <div class="status-card">
        <h3 class="status-card-title">状态</h3>
        <div class="status-list">
          <!-- 负载状态 -->
          <div class="status-item">
            <div class="status-label">负载状态</div>
            <div class="status-circle-container">
              <svg class="status-circle" width="80" height="80" viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="35" fill="none" stroke="#f0f0f0" stroke-width="6" />
                <circle
                  cx="40"
                  cy="40"
                  r="35"
                  fill="none"
                  stroke="#00da3c"
                  stroke-width="6"
                  :stroke-dasharray="219.91"
                  :stroke-dashoffset="215.51"
                  transform="rotate(-90 40 40)"
                />
                <text x="40" y="45" text-anchor="middle" font-size="14" fill="#303133">2%</text>
              </svg>
            </div>
            <div class="status-value">运行流畅</div>
          </div>

          <!-- CPU使用率 -->
          <div class="status-item">
            <div class="status-label">CPU使用率</div>
            <div class="status-circle-container">
              <svg class="status-circle" width="80" height="80" viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="35" fill="none" stroke="#f0f0f0" stroke-width="6" />
                <circle
                  cx="40"
                  cy="40"
                  r="35"
                  fill="none"
                  stroke="#409eff"
                  stroke-width="6"
                  :stroke-dasharray="219.91"
                  :stroke-dashoffset="175.93"
                  transform="rotate(-90 40 40)"
                />
                <text x="40" y="45" text-anchor="middle" font-size="14" fill="#303133">20%</text>
              </svg>
            </div>
            <div class="status-value">2核心</div>
          </div>

          <!-- 内存使用率 -->
          <div class="status-item">
            <div class="status-label">内存使用率</div>
            <div class="status-circle-container">
              <svg class="status-circle" width="80" height="80" viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="35" fill="none" stroke="#f0f0f0" stroke-width="6" />
                <circle
                  cx="40"
                  cy="40"
                  r="35"
                  fill="none"
                  stroke="#e6a23c"
                  stroke-width="6"
                  :stroke-dasharray="219.91"
                  :stroke-dashoffset="164.93"
                  transform="rotate(-90 40 40)"
                />
                <text x="40" y="45" text-anchor="middle" font-size="12" fill="#303133">19.8%</text>
              </svg>
            </div>
            <div class="status-value">752/3789MB</div>
          </div>

          <!-- 硬盘使用率 -->
          <div class="status-item">
            <div class="status-label">硬盘使用率</div>
            <div class="status-circle-container">
              <svg class="status-circle" width="80" height="80" viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="35" fill="none" stroke="#f0f0f0" stroke-width="6" />
                <circle
                  cx="40"
                  cy="40"
                  r="35"
                  fill="none"
                  stroke="#909399"
                  stroke-width="6"
                  :stroke-dasharray="219.91"
                  :stroke-dashoffset="158.34"
                  transform="rotate(-90 40 40)"
                />
                <text x="40" y="45" text-anchor="middle" font-size="12" fill="#303133">28%</text>
              </svg>
            </div>
            <div class="status-value">28G/50G</div>
          </div>

          <!-- 网络状态 -->
          <div class="status-item">
            <div class="status-label">网络状态</div>
            <div class="status-circle-container">
              <svg class="status-circle" width="80" height="80" viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="35" fill="none" stroke="#f0f0f0" stroke-width="6" />
                <circle
                  cx="40"
                  cy="40"
                  r="35"
                  fill="none"
                  stroke="#67c23a"
                  stroke-width="6"
                  :stroke-dasharray="219.91"
                  :stroke-dashoffset="219.91 - 219.91 * 0.92"
                  transform="rotate(-90 40 40)"
                />
                <text x="40" y="45" text-anchor="middle" font-size="12" fill="#303133">92%</text>
              </svg>
            </div>
            <div class="status-value">连接正常</div>
          </div>
        </div>
      </div>

      <!-- 服务器概览卡片 -->
      <div class="status-card">
        <div class="overview-card-header">
          <h3 class="status-card-title">概览</h3>
          <button class="settings-button" @click="handleSettingsClick">
            <i class="fas fa-cog" style="color: #909399"></i>
          </button>
        </div>
        <div class="overview-list">
          <!-- 网站 -->
          <div class="overview-item" @click="handleOverviewItemClick('网站', '5')">
            <div class="overview-label">网站</div>
            <div class="overview-value overview-value-blue">5</div>
          </div>

          <!-- FTP -->
          <div class="overview-item" @click="handleOverviewItemClick('FTP', '2')">
            <div class="overview-label">FTP</div>
            <div class="overview-value overview-value-green">2</div>
          </div>

          <!-- 数据库 -->
          <div class="overview-item" @click="handleOverviewItemClick('数据库', '3')">
            <div class="overview-label">数据库</div>
            <div class="overview-value overview-value-orange">3</div>
          </div>

          <!-- 安全风险 -->
          <div class="overview-item" @click="handleOverviewItemClick('安全风险', '1')">
            <div class="overview-label">安全风险</div>
            <div class="overview-value overview-value-red">1</div>
          </div>

          <!-- 备忘录 -->
          <div class="overview-item" @click="handleOverviewItemClick('备忘录', '编辑')">
            <div class="overview-label">备忘录</div>
            <div class="overview-value overview-value-placeholder">当前内容为空点击编辑</div>
          </div>
        </div>
      </div>

      <!-- 第三个和第四个卡片 - 同一行均分 -->
      <div class="cards-row">
        <!-- 第三个卡片 - 软件卡片 -->
        <div class="status-card software-card">
          <h3 class="status-card-title">软件</h3>
          <div class="software-list">
            <div class="software-item">
              <div class="software-icon software-icon-blue">
                <i class="fas fa-globe"></i>
              </div>
              <div class="software-name">Chrome</div>
            </div>
            <div class="software-item">
              <div class="software-icon software-icon-green">
                <i class="fas fa-file-alt"></i>
              </div>
              <div class="software-name">VS Code</div>
            </div>
            <div class="software-item">
              <div class="software-icon software-icon-orange">
                <i class="fas fa-terminal"></i>
              </div>
              <div class="software-name">Terminal</div>
            </div>
            <div class="software-item">
              <div class="software-icon software-icon-purple">
                <i class="fas fa-database"></i>
              </div>
              <div class="software-name">Database</div>
            </div>
          </div>
        </div>

        <!-- 第四个卡片 - 监控卡片 -->
        <div class="status-card monitor-card">
          <h3 class="status-card-title">监控</h3>
          <div class="monitor-tabs">
            <button
              class="monitor-tab"
              :class="{ active: activeTab === 'traffic' }"
              @click="switchTab('traffic')"
            >
              流量
            </button>
            <button
              class="monitor-tab"
              :class="{ active: activeTab === 'diskio' }"
              @click="switchTab('diskio')"
            >
              磁盘IO
            </button>
          </div>
          <div class="monitor-chart-container">
            <div id="traffic-chart" v-if="activeTab === 'traffic'" class="chart-container"></div>
            <div id="diskio-chart" v-if="activeTab === 'diskio'" class="chart-container"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 开关页面的组件逻辑
import { onMounted, ref, nextTick } from 'vue'
import * as echarts from 'echarts'
import { ElMessage } from 'element-plus'

// 当前激活的监控tab
const activeTab = ref('traffic')

// 切换tab
const switchTab = (tab: string) => {
  activeTab.value = tab
  // 等待DOM更新后初始化图表
  nextTick(() => {
    if (tab === 'traffic') {
      initTrafficChart()
    } else {
      initDiskioChart()
    }
  })
}

const handleSettingsClick = () => {
  ElMessage({
    message: '点击了设置按钮',
    type: 'info',
  })
}

// 处理概览项点击事件
const handleOverviewItemClick = (label: string, value: string) => {
  // 根据不同的标签显示不同的消息
  switch (label) {
    case '网站':
      ElMessage({
        message: `您有${value}个网站服务正在运行`,
        type: 'info',
      })
      break
    case 'FTP':
      ElMessage({
        message: `您有${value}个FTP服务正在运行`,
        type: 'success',
      })
      break
    case '数据库':
      ElMessage({
        message: `您有${value}个数据库服务正在运行`,
        type: 'warning',
      })
      break
    case '安全风险':
      ElMessage({
        message: `警告：发现${value}个安全风险，请及时处理！`,
        type: 'error',
      })
      break
    case '备忘录':
      ElMessage({
        message: '打开备忘录编辑界面',
        type: 'info',
      })
      break
    default:
      ElMessage({
        message: `点击了${label}: ${value}`,
        type: 'info',
      })
  }
}

// 初始化流量图表
const initTrafficChart = () => {
  const chartDom = document.getElementById('traffic-chart')
  if (!chartDom) return

  // 检查是否已存在图表实例，如果存在则销毁
  const existingChart = echarts.getInstanceByDom(chartDom)
  if (existingChart) {
    existingChart.dispose()
  }

  const myChart = echarts.init(chartDom)

  // 模拟流量数据
  const generateData = () => {
    const data = []
    const now = new Date()
    for (let i = 23; i >= 0; i--) {
      const time = new Date(now.getTime() - i * 3600000)
      const timeStr = `${time.getHours()}:00`
      const inTraffic = Math.floor(Math.random() * 200) + 100
      const outTraffic = Math.floor(Math.random() * 100) + 50
      data.push([timeStr, inTraffic, outTraffic])
    }
    return data
  }

  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      },
    },
    legend: {
      data: ['入站流量', '出站流量'],
      textStyle: {
        fontSize: 12,
      },
      top: 10,
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: generateData().map((item) => item[0]),
      axisLabel: {
        fontSize: 10,
        rotate: 45,
      },
    },
    yAxis: {
      type: 'value',
      name: '流量(MB)',
      nameTextStyle: {
        fontSize: 10,
      },
      axisLabel: {
        fontSize: 10,
      },
    },
    series: [
      {
        name: '入站流量',
        type: 'line',
        data: generateData().map((item) => item[1]),
        smooth: true,
        lineStyle: {
          color: '#409eff',
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(64, 158, 255, 0.3)',
            },
            {
              offset: 1,
              color: 'rgba(64, 158, 255, 0.1)',
            },
          ]),
        },
      },
      {
        name: '出站流量',
        type: 'line',
        data: generateData().map((item) => item[2]),
        smooth: true,
        lineStyle: {
          color: '#67c23a',
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(103, 194, 58, 0.3)',
            },
            {
              offset: 1,
              color: 'rgba(103, 194, 58, 0.1)',
            },
          ]),
        },
      },
    ],
  }

  myChart.setOption(option)

  // 窗口大小改变时，图表自适应
  window.addEventListener('resize', () => {
    myChart.resize()
  })
}

// 初始化磁盘IO图表
const initDiskioChart = () => {
  const chartDom = document.getElementById('diskio-chart')
  if (!chartDom) return

  // 检查是否已存在图表实例，如果存在则销毁
  const existingChart = echarts.getInstanceByDom(chartDom)
  if (existingChart) {
    existingChart.dispose()
  }

  const myChart = echarts.init(chartDom)

  // 模拟磁盘IO数据
  const generateData = () => {
    const data = []
    const now = new Date()
    for (let i = 23; i >= 0; i--) {
      const time = new Date(now.getTime() - i * 3600000)
      const timeStr = `${time.getHours()}:00`
      const read = Math.floor(Math.random() * 150) + 50
      const write = Math.floor(Math.random() * 100) + 30
      data.push([timeStr, read, write])
    }
    return data
  }

  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      },
    },
    legend: {
      data: ['读取', '写入'],
      textStyle: {
        fontSize: 12,
      },
      top: 10,
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: generateData().map((item) => item[0]),
      axisLabel: {
        fontSize: 10,
        rotate: 45,
      },
    },
    yAxis: {
      type: 'value',
      name: 'IO(MB/s)',
      nameTextStyle: {
        fontSize: 10,
      },
      axisLabel: {
        fontSize: 10,
      },
    },
    series: [
      {
        name: '读取',
        type: 'line',
        data: generateData().map((item) => item[1]),
        smooth: true,
        lineStyle: {
          color: '#e6a23c',
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(230, 162, 60, 0.3)',
            },
            {
              offset: 1,
              color: 'rgba(230, 162, 60, 0.1)',
            },
          ]),
        },
      },
      {
        name: '写入',
        type: 'line',
        data: generateData().map((item) => item[2]),
        smooth: true,
        lineStyle: {
          color: '#f56c6c',
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(245, 108, 108, 0.3)',
            },
            {
              offset: 1,
              color: 'rgba(245, 108, 108, 0.1)',
            },
          ]),
        },
      },
    ],
  }

  myChart.setOption(option)

  // 窗口大小改变时，图表自适应
  window.addEventListener('resize', () => {
    myChart.resize()
  })
}

onMounted(() => {
  // 页面挂载时初始化流量图表
  initTrafficChart()
})
</script>

<style scoped lang="scss">
.page-header {
  padding: 24px 32px;
  background-color: #ffffff;
  border-bottom: 1px solid #ebeef5;
  // margin-bottom: 12px;
}

.page-title {
  font-size: 24px;
  font-weight: 700;
  color: #303133;
  margin: 0 0 4px 0;
}

.page-subtitle {
  font-size: 14px;
  color: #909399;
  margin: 0;
}

/* 响应式设计调整 */
@media (max-width: 768px) {
  .page-header {
    padding: 16px 20px;
  }
}

.switch-page-container {
  // padding: 20px;
  height: 100%;
  background-color: #fafafa;
  width: 100%;
  display: flex;
  flex-direction: column;
}

h2 {
  color: #303133;
  margin-bottom: 16px;
}

.status-card {
  background-color: #ffffff;
  border-radius: 28px;
  padding: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.04);
  margin: 20px 20px;
}

.content {
  overflow: auto;
}

.status-card-title {
  color: #303133;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
}

.status-list {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: space-evenly;
}

.status-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 100px;
}

.status-label {
  color: #909399;
  font-size: 12px;
  margin-bottom: 12px;
}

.status-circle-container {
  margin-bottom: 12px;
  position: relative;
}

.status-circle {
  transition: all 0.3s ease;
}

.status-value {
  color: #909399;
  font-size: 12px;
  text-align: center;
}

/* 概览卡片样式 */
.overview-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.settings-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px;
  border-radius: 8px;
  transition: background-color 0.3s ease;
}

.settings-button:hover {
  background-color: #f5f7fa;
}

.overview-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: space-evenly;
}

.overview-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 200px;
  padding: 20px 10px;
  border: 1px solid #e4e7ed;
  border-radius: 20px;
  background-color: #ffffff;
  transition: all 0.3s ease;
}

.overview-item:hover {
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.08);
  cursor: pointer;
}

.overview-label {
  color: #909399;
  font-size: 14px;
  margin-bottom: 8px;
}

.overview-value {
  font-size: 20px;
  font-weight: bold;
}

.overview-value-blue {
  color: #409eff;
}

.overview-value-green {
  color: #67c23a;
}

.overview-value-orange {
  color: #e6a23c;
}

.overview-value-red {
  color: #f56c6c;
}

.overview-value-placeholder {
  color: #909399;
  font-size: 12px;
  font-weight: normal;
  text-align: center;
  line-height: 1.4;
}

/* 第三个和第四个卡片样式 */
.cards-row {
  display: flex;
  gap: 20px;
  margin: 20px;
}

.software-card,
.monitor-card {
  flex: 1;
  margin: 0;
}

/* 软件卡片样式 */
.software-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.software-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  background-color: #f8f9fa;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.software-item:hover {
  background-color: #e9ecef;
  transform: translateY(-2px);
}

.software-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
  color: white;
  font-size: 20px;
}

.software-icon-blue {
  background-color: #409eff;
}

.software-icon-green {
  background-color: #67c23a;
}

.software-icon-orange {
  background-color: #e6a23c;
}

.software-icon-purple {
  background-color: #909399;
}

.software-name {
  color: #303133;
  font-size: 14px;
  font-weight: 500;
}

/* 监控卡片样式 */
.monitor-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.monitor-tab {
  padding: 8px 16px;
  border: 1px solid #e4e7ed;
  background-color: #ffffff;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
  color: #606266;
}

.monitor-tab:hover {
  color: #409eff;
  border-color: #c6e2ff;
}

.monitor-tab.active {
  color: #ffffff;
  background-color: #409eff;
  border-color: #409eff;
}

.monitor-chart-container {
  height: 200px;
}

.chart-container {
  width: 100%;
  height: 100%;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .status-list {
    gap: 16px;
  }

  .status-item {
    min-width: 80px;
  }

  .status-circle-container svg {
    width: 60px;
    height: 60px;
  }

  .status-circle circle {
    r: 25;
  }

  .status-circle text {
    font-size: 10px;
  }

  .overview-list {
    gap: 12px;
  }

  .overview-item {
    width: 100px;
    padding: 15px 8px;
  }

  .overview-value {
    font-size: 16px;
  }

  .overview-value-placeholder {
    font-size: 10px;
  }

  /* 响应式卡片行 */
  .cards-row {
    flex-direction: column;
  }

  .software-list {
    grid-template-columns: repeat(2, 1fr);
  }

  .software-icon {
    width: 40px;
    height: 40px;
    font-size: 18px;
  }

  .monitor-chart-container {
    height: 180px;
  }
}
</style>
