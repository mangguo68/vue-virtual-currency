<template>
  <div class="common-layout">
    <el-container>
      <!-- 左侧边栏 -->
      <Sidebar />
      <!-- 主内容区域 -->
      <el-container>
        <RouterView />
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import Sidebar from '../Sidebar.vue'
</script>

<style scoped lang="scss">
/* 主布局样式 */
.common-layout {
  height: 100vh;
  margin: 0;
  padding: 0;
  position: relative;

  .el-container {
    height: 100vh;
    margin: 0;
    padding: 0;
  }
}
</style>
