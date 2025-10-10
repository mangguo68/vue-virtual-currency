<template>
  <div class="common-layout">
    <el-container>
      <!-- 左侧边栏 -->
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
              <svg
                id="组_596"
                data-name="组 596"
                xmlns="http://www.w3.org/2000/svg"
                width="20.232"
                height="20.233"
                viewBox="0 0 20.232 20.233"
              >
                <path
                  id="路径_6"
                  data-name="路径 6"
                  d="M64.791,4.092a2.041,2.041,0,0,0-2.039-2.04H57.906a2.042,2.042,0,0,0-2.04,2.04V8.938a2.042,2.042,0,0,0,2.04,2.04h4.845a2.041,2.041,0,0,0,2.039-2.04ZM63.4,8.938a.654.654,0,0,1-.652.652H57.906a.653.653,0,0,1-.652-.652V4.092a.652.652,0,0,1,.652-.652h4.845a.653.653,0,0,1,.652.652Z"
                  transform="translate(-55.866 -2.052)"
                />
                <path
                  id="路径_7"
                  data-name="路径 7"
                  d="M67.853,20.926H72.7a2.043,2.043,0,0,0,2.04-2.04V14.039A2.043,2.043,0,0,0,72.7,12H67.853a2.043,2.043,0,0,0-2.04,2.04v4.847A2.043,2.043,0,0,0,67.853,20.926ZM67.2,14.039a.653.653,0,0,1,.652-.651H72.7a.652.652,0,0,1,.652.651v4.847a.652.652,0,0,1-.652.651H67.853a.653.653,0,0,1-.652-.651Z"
                  transform="translate(-54.507 -0.693)"
                />
                <path
                  id="路径_8"
                  data-name="路径 8"
                  d="M74.739,4.092a2.042,2.042,0,0,0-2.04-2.04H67.853a2.042,2.042,0,0,0-2.04,2.04V8.938a2.042,2.042,0,0,0,2.04,2.04H72.7a2.042,2.042,0,0,0,2.04-2.04ZM73.351,8.938a.653.653,0,0,1-.652.652H67.853a.654.654,0,0,1-.652-.652V4.092a.653.653,0,0,1,.652-.652H72.7a.652.652,0,0,1,.652.652Z"
                  transform="translate(-54.507 -2.052)"
                />
                <path
                  id="路径_9"
                  data-name="路径 9"
                  d="M57.906,20.926h4.845a2.042,2.042,0,0,0,2.039-2.04V14.039A2.042,2.042,0,0,0,62.752,12H57.906a2.043,2.043,0,0,0-2.04,2.04v4.847A2.043,2.043,0,0,0,57.906,20.926Zm-.652-6.887a.652.652,0,0,1,.652-.651h4.845a.653.653,0,0,1,.652.651v4.847a.653.653,0,0,1-.652.651H57.906a.652.652,0,0,1-.652-.651Z"
                  transform="translate(-55.866 -0.693)"
                />
              </svg>
            </el-icon>
            <span>菜单</span>
          </el-menu-item>

          <!-- 数据统计按钮 -->
          <el-menu-item index="/statistics">
            <el-icon><DataAnalysis /></el-icon>
            <span>数据统计</span>
          </el-menu-item>

          <!-- 服务器图标按钮 -->
          <el-menu-item index="/switch">
            <el-icon>
              <svg
                id="组_598"
                data-name="组 598"
                xmlns="http://www.w3.org/2000/svg"
                width="22.375"
                height="22.376"
                viewBox="0 0 22.375 22.376"
              >
                <path
                  id="路径_10"
                  data-name="路径 10"
                  d="M-45.367-1.581a.8.8,0,0,0-.8.8V.953a.8.8,0,0,0,.8.8.8.8,0,0,0,.8-.8V-.777A.8.8,0,0,0-45.367-1.581Z"
                  transform="translate(50.929 5.043)"
                />
                <path
                  id="路径_11"
                  data-name="路径 11"
                  d="M-42.944-1.581a.8.8,0,0,0-.8.8V.953a.8.8,0,0,0,.8.8.8.8,0,0,0,.8-.8V-.777A.8.8,0,0,0-42.944-1.581Z"
                  transform="translate(51.535 5.043)"
                />
                <path
                  id="路径_12"
                  data-name="路径 12"
                  d="M-35.192-.653a.8.8,0,0,0-.567-.236h-1.3a.8.8,0,0,0-.8.8.8.8,0,0,0,.8.8h1.3a.8.8,0,0,0,.8-.8A.8.8,0,0,0-35.192-.653Z"
                  transform="translate(53.006 5.216)"
                />
                <path
                  id="路径_13"
                  data-name="路径 13"
                  d="M-37.862,9.605a.807.807,0,0,0,.8.8h1.3a.8.8,0,0,0,.8-.8.8.8,0,0,0-.235-.567A.8.8,0,0,0-35.76,8.8h-1.3A.8.8,0,0,0-37.862,9.605Z"
                  transform="translate(53.006 7.64)"
                />
                <path
                  id="路径_14"
                  data-name="路径 14"
                  d="M-27.6-.085a4.272,4.272,0,0,0-4.265-4.266H-45.712A4.271,4.271,0,0,0-49.977-.085v1.73a4.269,4.269,0,0,0,4.265,4.264h13.845A4.269,4.269,0,0,0-27.6,1.645Zm-1.606,1.73A2.66,2.66,0,0,1-31.867,4.3H-45.712a2.66,2.66,0,0,1-2.659-2.657V-.085a2.661,2.661,0,0,1,2.659-2.659h13.845A2.661,2.661,0,0,1-29.208-.085Z"
                  transform="translate(49.977 4.351)"
                />
                <path
                  id="路径_15"
                  data-name="路径 15"
                  d="M-42.944,8.111a.8.8,0,0,0-.8.8v1.732a.8.8,0,0,0,.8.8.8.8,0,0,0,.8-.8V8.915A.8.8,0,0,0-42.944,8.111Z"
                  transform="translate(51.535 7.466)"
                />
                <path
                  id="路径_16"
                  data-name="路径 16"
                  d="M-45.367,8.111a.8.8,0,0,0-.8.8v1.732a.794.794,0,0,0,.235.568.8.8,0,0,0,.567.235.8.8,0,0,0,.8-.8V8.915A.8.8,0,0,0-45.367,8.111Z"
                  transform="translate(50.929 7.466)"
                />
                <path
                  id="路径_17"
                  data-name="路径 17"
                  d="M-45.712,15.6h13.845A4.269,4.269,0,0,0-27.6,11.338V9.607a4.27,4.27,0,0,0-4.265-4.265H-45.712a4.27,4.27,0,0,0-4.265,4.265v1.731A4.269,4.269,0,0,0-45.712,15.6Zm-2.659-5.995a2.661,2.661,0,0,1,2.659-2.659h13.845a2.661,2.661,0,0,1,2.659,2.659v1.731A2.66,2.66,0,0,1-31.867,14H-45.712a2.66,2.66,0,0,1-2.659-2.657Z"
                  transform="translate(49.977 6.774)"
                />
              </svg>
            </el-icon>
            <span>开关</span>
          </el-menu-item>

          <!-- 设置图标按钮 -->
          <el-menu-item index="/settings">
            <el-icon><Setting /></el-icon>
            <span>设置</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <!-- 主内容区域 -->
      <el-container>
        <RouterView />
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { House, DataAnalysis, Setting } from '@element-plus/icons-vue'
import { RouterView } from 'vue-router'
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

<style scoped lang="scss">
@use './home.scss';
</style>
