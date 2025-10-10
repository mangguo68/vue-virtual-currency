<template>
  <div class="portfolio-card">
    <!-- 头部区域 -->
    <div class="portfolio-header">
      <h2 class="portfolio-title">投资组合</h2>
      <el-button class="search-button">
        <el-icon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16.906"
            height="16.467"
            viewBox="0 0 16.906 16.467"
            class="text-black"
          >
            <path
              id="路径_18"
              data-name="路径 18"
              d="M9.842-13.969l-1.95-1.95.075-.1a8.147,8.147,0,0,0,1.653-4.926,8.243,8.243,0,0,0-8.234-8.234,8.243,8.243,0,0,0-8.235,8.234A8.244,8.244,0,0,0,1.386-12.71a8.216,8.216,0,0,0,5.4-2.037l.1-.088L8.8-12.926a.758.758,0,0,0,1.043,0A.739.739,0,0,0,9.842-13.969Zm-8.456-.217a6.765,6.765,0,0,1-6.757-6.758A6.764,6.764,0,0,1,1.386-27.7a6.764,6.764,0,0,1,6.756,6.757A6.765,6.765,0,0,1,1.386-14.186Z"
              transform="translate(6.849 29.177)"
            />
          </svg>
        </el-icon>
      </el-button>
    </div>

    <!-- 表格内容 -->
    <div class="table-container">
      <el-table
        :data="portfolioData"
        style="width: 100%"
        :show-header="true"
        :border="false"
        :stripe="false"
        class="portfolio-table"
      >
        <el-table-column prop="name" label="名称" min-width="0">
          <template #default="{ row }">
            <div class="name-container">
              <el-image :src="row.icon" class="currency-icon" fit="cover">
                <template #error>
                  <div class="icon-placeholder">
                    <i class="fas fa-coins"></i>
                  </div>
                </template>
              </el-image>
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="price" label="价格" min-width="0">
          <template #default="{ row }">
            <span class="price-cell">${{ formatNumber(row.price) }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="average" label="平均" min-width="0">
          <template #default="{ row }">
            <span class="price-cell">${{ formatNumber(row.average) }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="value" label="值" min-width="0">
          <template #default="{ row }">
            <span class="price-cell">${{ formatNumber(row.value) }}</span>
          </template>
        </el-table-column>

        <el-table-column label="1h" min-width="0">
          <template #default>
            <div class="lock-indicator">
              <i class="fas fa-lock"></i>
              <span class="lock-text">锁定</span>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="24h" min-width="0">
          <template #default="{ row }">
            <span :class="getChangeClass(row.change24h)">
              {{ formatPercentage(row.change24h) }}
            </span>
          </template>
        </el-table-column>

        <el-table-column label="1m" min-width="0">
          <template #default="{ row }">
            <span :class="getChangeClass(row.change1m)">
              {{ formatPercentage(row.change1m) }}
            </span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface PortfolioItem {
  name: string
  icon: string
  price: number
  average: number
  value: number
  change24h: number
  change1m: number
}

const portfolioData = ref<PortfolioItem[]>([
  {
    name: 'BTC',
    icon: '',
    price: 43250.32,
    average: 42100.0,
    value: 8650.64,
    change24h: 2.45,
    change1m: -1.23,
  },
  {
    name: 'ETH',
    icon: '',
    price: 2650.18,
    average: 2580.5,
    value: 5300.36,
    change24h: -0.87,
    change1m: 5.67,
  },
  {
    name: 'BNB',
    icon: '',
    price: 315.42,
    average: 310.25,
    value: 630.84,
    change24h: 1.12,
    change1m: -2.34,
  },
])

const getChangeClass = (value: number): string => {
  if (value > 0) {
    return 'positive-change'
  } else if (value < 0) {
    return 'negative-change'
  } else {
    return 'neutral-change'
  }
}

const formatPercentage = (value: number): string => {
  const sign = value >= 0 ? '+' : ''
  return `${sign}${value.toFixed(2)}%`
}

const formatNumber = (value: number): string => {
  return value.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}
</script>

<style scoped>
.portfolio-card {
  width: 100%;
  max-height: 289px;
  background: #ffffff;
  border-radius: 28px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  padding: 25px;
  box-sizing: border-box;
}

:deep(.el-table__inner-wrapper::before) {
  display: none;
}

.portfolio-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.portfolio-title {
  font-size: 18px;
  font-weight: bold;
  color: #1b1b1b;
  margin: 0;
}

.search-button {
  background: transparent;
  border: none;
  /* color: #909399; */
  cursor: pointer;
  padding: 8px;
  border-radius: 6px;
  transition: all 0.3s ease;
  font-size: 18px;
}

.search-button:hover {
  background: #f5f7fa;
  color: #303133;
}

.table-container {
  overflow-x: auto;
}

.portfolio-table {
  width: 100%;
  border-collapse: collapse;
}

/* 移除表格分割线样式 */
.portfolio-table :deep(.el-table__row) {
  border: none !important;
  border-bottom: none !important;
}

.portfolio-table :deep(.el-table__row td) {
  border: none !important;
  border-bottom: none !important;
}

.portfolio-table :deep(.el-table__header-wrapper th) {
  border: none !important;
  border-bottom: none !important;
}

.portfolio-table :deep(.el-table__body-wrapper) {
  border: none !important;
}

.portfolio-table :deep(.el-table__body) {
  border: none !important;
}

.portfolio-table :deep(.el-table__empty-block) {
  border: none !important;
}

.table-header {
  border-bottom: 1px solid #f0f2f5;
}

.table-cell {
  padding: 16px 12px;
  text-align: left;
  font-size: 14px;
}

.table-header .table-cell {
  font-weight: 500;
  color: #909399;
  padding-bottom: 12px;
}

.table-row {
  border-bottom: 1px solid #f5f7fa;
  transition: background-color 0.2s ease;
}

.table-row:hover {
  background-color: #fafbfc;
}

.table-row:last-child {
  border-bottom: none;
}

.name-cell {
  padding-left: 0;
}

.name-container {
  display: flex;
  align-items: center;
  gap: 12px;
}

.currency-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
}

.icon-placeholder {
  width: 32px;
  height: 32px;
  background: #f0f2f5;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #909399;
}

.currency-name {
  font-weight: 500;
  color: #303133;
}

.price-cell {
  font-weight: 500;
  color: #303133;
}

.lock-indicator {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #c0c4cc;
}

.lock-indicator i {
  font-size: 12px;
}

.lock-text {
  font-size: 12px;
  color: #c0c4cc;
}

.positive-change {
  color: #67c23a;
  font-weight: 500;
}

.negative-change {
  color: #f56c6c;
  font-weight: 500;
}

.neutral-change {
  color: #909399;
  font-weight: 500;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .portfolio-card {
    padding: 16px;
  }

  .table-cell {
    padding: 12px 8px;
    font-size: 13px;
  }

  .currency-icon,
  .icon-placeholder {
    width: 28px;
    height: 28px;
  }

  .currency-name {
    font-size: 13px;
  }
}

@media (max-width: 640px) {
  .portfolio-card {
    padding: 12px;
  }

  .portfolio-header {
    margin-bottom: 16px;
  }

  .portfolio-title {
    font-size: 16px;
  }

  .table-cell {
    padding: 10px 6px;
    font-size: 12px;
  }

  .currency-icon,
  .icon-placeholder {
    width: 24px;
    height: 24px;
  }

  .name-container {
    gap: 8px;
  }

  .lock-indicator {
    flex-direction: column;
    gap: 2px;
  }

  .lock-text {
    display: none;
  }
}
</style>