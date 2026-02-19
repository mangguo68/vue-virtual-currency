<template>
  <el-aside class="sidebar-container">
    <!-- 侧边栏菜单 -->
    <el-menu
      :default-active="route.path"
      class="el-menu-vertical-demo sidebar-menu"
      :router="true"
      background-color="#ffffff"
      text-color="#909399"
      active-text-color="#303133"
      :default-openeds="['/']"
    >
      <!-- 首页图标按钮 -->
      <el-menu-item index="/">
        <el-icon><House /></el-icon>
        <span>首页</span>
      </el-menu-item>

      <!-- 工具图标按钮 -->
      <el-menu-item index="/menu">
        <el-icon>
          <MenuIcon />
        </el-icon>
        <span>菜单</span>
      </el-menu-item>

      <!-- 数据统计按钮 -->
      <el-menu-item index="/statistics">
        <el-icon><DataAnalysis /></el-icon>
        <span>数据统计</span>
      </el-menu-item>

      <!-- 服务器图标按钮 -->
      <el-menu-item index="/server">
        <el-icon>
          <ServerIcon />
        </el-icon>
        <span>服务器</span>
      </el-menu-item>

      <!-- 设置图标按钮 -->
      <el-menu-item index="/settings">
        <el-icon><Setting /></el-icon>
        <span>设置</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script setup lang="ts">
import { House, DataAnalysis, Setting } from '@element-plus/icons-vue'
import { useRoute } from 'vue-router'
import MenuIcon from '../common/MenuIcon.vue'
import ServerIcon from '../common/ServerIcon.vue'

const route = useRoute()
</script>

<style scoped lang="scss">
/* 左侧边栏样式 */
.sidebar-container {
  width: auto !important;
  padding: 0 20px;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;

  /* 侧边栏样式 */
  .sidebar-menu {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center; /* 垂直居中 */
    height: 100%; /* 占据整个容器高度 */
    padding: 20px 0;
    border-right: none; /* 去掉菜单右侧的边框 */
    width: 60px; /* 固定宽度，足够容纳图标和圆角背景 */
    min-width: 60px;

    /* 菜单项样式 */
    .el-menu-item {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 60px;
      margin: 8px 0;
      border-right: none; /* 去掉菜单项右侧的边框 */
      /* 移除hover效果 */
      background-color: transparent !important;

      /* 确保ElementPlus的hover样式被完全覆盖 */
      &:hover,
      &:hover:not(.is-active) {
        background-color: transparent !important;
        color: #909399 !important;
      }

      /* 图标样式 */
      .el-icon {
        font-size: 24px;
        margin-right: 0;
      }

      /* 隐藏文字 */
      span {
        display: none;
      }

      /* 激活状态样式 */
      &.is-active {
        background-color: transparent !important; /* 移除原来的背景 */
        border-right: none !important; /* 确保没有右侧边框 */

        .el-icon {
          color: #303133;
          background-color: #f5f7fa;
          border-radius: 12px;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }

      /* 移除焦点样式 */
      &:focus,
      &:focus:not(.is-active) {
        background-color: transparent !important;
      }
    }
  }
}

/* 移除ElementPlus默认的滚动条和边框 */
.el-menu,
.el-menu--vertical {
  border-right: none !important;
}
</style>