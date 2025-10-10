<template>
  <div class="statistics-page-container">
    <div class="page-header">
      <h1 class="page-title">数据统计</h1>
      <p class="page-subtitle">
        虚拟货币市场数据分析与可视化（由于该页面无UI设计图，所以UI较为随意）
      </p>
    </div>

    <!-- 图表网格布局 -->
    <div class="chart-grid-container">
      <ChartGrid />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import ChartGrid from '../layout/ChartGrid.vue'

onMounted(() => {
  // 页面挂载时的逻辑
})

onUnmounted(() => {
  // 页面卸载时的逻辑
})
</script>

<style scoped lang="scss">
.chart-grid-container {
  overflow: auto;
  width: 100%;
  height: 100%;
}
.statistics-page-container {
  padding: 0;
  height: 100vh;
  background-color: #fafafa;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
}

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
</style>
