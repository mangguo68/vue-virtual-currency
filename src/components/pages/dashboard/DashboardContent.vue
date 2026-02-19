<template>
  <el-container>
    <!-- 头部 -->
    <el-header class="!h-fit header-content">
      <HeaderFirstRow />
      <!-- 第二行内容：货币列表 -->
      <CurrencyList />
    </el-header>
    <!-- 主内容区域 -->
    <el-main>
      <!-- 收益模块容器 - 使用el-row和el-col布局 -->
      <el-row>
        <!-- 第一行：收益表现和收益分解 -->
        <el-col class="p-3" :xs="24" :sm="24" :md="24" :lg="16" :xl="16">
          <PerformanceChart />
        </el-col>
        <el-col class="p-3" :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
          <ProfitBreakdown />
        </el-col>
      </el-row>
      <el-row>
        <!-- 第二行：投资组合和走势预测 -->
        <el-col class="p-3" :xs="24" :sm="24" :md="24" :lg="16" :xl="16">
          <InvestmentPortfolio />
        </el-col>
        <el-col class="p-3" :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
          <TrendPrediction />
        </el-col>
      </el-row>
    </el-main>
  </el-container>
  <!-- 右侧边栏 -->
  <UserSidebar />
</template>

<script setup lang="ts">
import CurrencyList from '@/components/common/CurrencyList.vue'
import { onMounted } from 'vue'
import PerformanceChart from '@/components/charts/PerformanceChart.vue'
import ProfitBreakdown from '@/components/common/ProfitBreakdown.vue'
import InvestmentPortfolio from '@/components/common/InvestmentPortfolio.vue'
import TrendPrediction from '@/components/charts/TrendPrediction.vue'
import UserSidebar from '@/components/layout/UserSidebar.vue'
import HeaderFirstRow from '@/components/layout/HeaderFirstRow.vue'
import { useGlobalUserInfo } from '@/stores/globalUserStore'
import { useUserInfo } from '@/composables/useUserInfo'

// 使用全局用户状态
const { 
  userInfo, 
  isLoading, 
  errorMessage, 
  greeting, 
  userInitial, 
  fetchUserInfo 
} = useGlobalUserInfo()

// 保留原来的其他函数
const { getKycStatusText, handleEditButtonClick } = useUserInfo()

// 组件挂载时获取用户信息
onMounted(() => {
  console.log('🎯 DashboardContent onMounted 被调用')
  console.log('📍 准备调用 fetchUserInfo')
  fetchUserInfo()
  console.log('📍 fetchUserInfo 调用完成')
})
</script>

<style scoped lang="scss">
@use './dashboard-content.scss';
</style>
