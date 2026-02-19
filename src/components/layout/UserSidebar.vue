<template>
  <el-aside class="user-sidebar">
    <!-- 第一行:用户基本信息 -->
    <div class="user-info-section">
      <el-avatar
        :src="
          userInfo.avatarUrl ||
          'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
        "
        class="user-avatar"
        v-if="!isLoading"
      >
        {{ userInitial }}
      </el-avatar>
      <el-avatar class="user-avatar" v-else>
        <el-icon><Loading /></el-icon>
      </el-avatar>
      <div class="user-details">
        <div class="user-name">{{ userInfo.full_name || userInfo.username || '用户' }}</div>
        <div class="user-verification">
          <el-icon class="verification-icon">
            <KycVerifiedIcon />
          </el-icon>
          <span>{{ getKycStatusText(userInfo.kyc_status) }}</span>
        </div>
      </div>
      <el-button class="edit-button" circle @click="handleEditButtonClick">
        <el-icon>
          <EditIcon />
        </el-icon>
      </el-button>
    </div>
    
    <div class="search-section">
      <div class="search-input-wrapper">
        <el-input
          v-model="searchQuery"
          placeholder="搜索虚拟币"
          class="search-input"
          :suffix-icon="Search"
        />
      </div>
    </div>
    
    <div class="fund-overview-section">
      <!-- 标题行 -->
      <div class="fund-overview-header">
        <h3 class="fund-overview-title">资金概述</h3>
        <el-button class="fund-menu-button" circle @click="handleFundMenuClick">
          <el-icon>
            <FundMenuIcon />
          </el-icon>
        </el-button>
      </div>
      <!-- 资金数量显示 -->
      <div class="fund-amount-section">
        <div class="fund-amount">¥34,230.56</div>
      </div>
    </div>
    
    <!-- 资产配置饼状图组件 -->
    <PortfolioPieChart />
    
    <!-- 最后一块区域:更新记录 -->
    <div class="updates-section">
      <!-- 标题行 -->
      <div class="updates-header">
        <h3 class="updates-title">更新</h3>
        <el-button
          :icon="Setting"
          class="updates-config-button"
          circle
          @click="handleUpdatesConfigClick"
        >
        </el-button>
      </div>
      <!-- 更新记录列表 -->
      <div class="updates-list">
        <!-- 第一条记录 -->
        <div class="update-item">
          <div class="update-time">7月4日 21:10</div>
          <div class="update-content">服务器将进行例行维护，预计维护时间大约为：2小时。</div>
        </div>
        <!-- 第二条记录 -->
        <div class="update-item">
          <div class="update-time">7月2日 15:30</div>
          <div class="update-content">系统已完成最新版本升级，新增了资产分析功能。</div>
        </div>
        <!-- 第三条记录 -->
        <div class="update-item">
          <div class="update-time">6月30日 10:15</div>
          <div class="update-content">修复了数据显示异常的问题，提高了系统稳定性。</div>
        </div>
      </div>
    </div>
  </el-aside>
</template>

<script setup lang="ts">
import { Search, Setting, Loading } from '@element-plus/icons-vue'
import PortfolioPieChart from '@/components/charts/PortfolioPieChart.vue'
import KycVerifiedIcon from '@/components/common/KycVerifiedIcon.vue'
import EditIcon from '@/components/common/EditIcon.vue'
import FundMenuIcon from '@/components/common/FundMenuIcon.vue'
import { useGlobalUserInfo } from '@/stores/globalUserStore'
import { useFundManagement } from '@/composables/useFundManagement'
import { useUserInfo } from '@/composables/useUserInfo'

// 使用全局用户状态
const { 
  userInfo, 
  isLoading, 
  userInitial 
} = useGlobalUserInfo()

// 保留原来的其他函数
const { getKycStatusText, handleEditButtonClick } = useUserInfo()

const { 
  searchQuery, 
  handleFundMenuClick, 
  handleUpdatesConfigClick 
} = useFundManagement()
</script>

<style scoped lang="scss">
@use '../pages/dashboard/dashboard-content.scss';
</style>