<template>
  <!-- 第一行内容：标题和时间选择器 -->
  <div class="header-first-row">
    <!-- 左侧标题区域 -->
    <div class="header-title">
      <div class="main-title">{{ greeting }}</div>
      <div class="sub-title-wrapper">
        <Marquee text="欢迎来到虚拟币交易系统! 今日涨幅2.3%" :min-width="0" />
    </div>
    </div>

    <!-- 右侧时间选择器区域 -->
    <TimeSelector
      default-time="day"
      @time-change="handleTimeChange"
      @calendar-open="handleCalendarOpen"
    />
  </div>
</template>

<script setup lang="ts">
import Marquee from '@/components/common/Marquee.vue'
import TimeSelector from '@/components/common/TimeSelector.vue'
import { useGlobalUserInfo } from '@/stores/globalUserStore'
import { useTimeSelector } from '@/composables/useTimeSelector'
import { onMounted, watch } from 'vue'

// 使用全局用户状态
const { greeting, userInfo, fetchUserInfo } = useGlobalUserInfo()
const { handleTimeChange, handleCalendarOpen } = useTimeSelector()

// 组件挂载
onMounted(() => {
  // 注意：不在这里调用 fetchUserInfo，避免重复调用
  // 用户信息应该在父组件 DashboardContent.vue 中统一获取
})
</script>

<style scoped lang="scss">
@use '../pages/dashboard/dashboard-content.scss';
</style>