<template>
  <div class="menu-page-container">
    <!-- 页面头部 -->
    <div class="menu-header">
      <!-- 左侧标题区域 -->
      <div class="header-title-container">
        <h1 class="main-title">工具菜单</h1>
        <p class="sub-title">虚拟货币系统工具集（由于该页面无UI设计图，所以UI较为随意）</p>
      </div>

      <!-- 右侧工具栏 -->
      <div class="tool-tabs">
        <button
          v-for="tab in toolTabs"
          :key="tab.id"
          :class="['tool-tab', { active: activeTab === tab.id }]"
          @click="activeTab = tab.id"
        >
          {{ tab.name }}
        </button>
      </div>
    </div>

    <!-- 页面内容区域 -->
    <div class="menu-content">
      <!-- 使用Element Plus的Row和Col实现响应式网格布局 -->
      <ElRow :gutter="24">
        <ElCol
          v-for="tool in filteredToolsComputed()"
          :key="tool.id"
          :xs="24"
          :sm="12"
          :md="8"
          class="mb-4"
        >
          <!-- 工具卡片 -->
          <div class="tool-card">
            <!-- 图标区域 -->
            <div class="tool-icon-container" :style="{ backgroundColor: tool.iconBgColor }">
              <div class="tool-icon" :style="{ color: tool.iconColor }" v-html="tool.iconSvg"></div>
            </div>

            <!-- 工具信息 -->
            <div class="tool-info">
              <h3 class="tool-name">{{ tool.name }}</h3>
              <p class="tool-description">{{ tool.description }}</p>
            </div>

            <!-- 使用按钮 -->
            <div class="tool-action">
              <button
                class="use-button"
                :style="{ backgroundColor: tool.iconBgColor }"
                @click="handleUseClick(tool)"
              >
                立即使用
              </button>
            </div>
          </div>
        </ElCol>
      </ElRow>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElRow, ElCol, ElMessage } from 'element-plus'

// 定义工具栏标签数据
interface ToolTab {
  id: string
  name: string
}

const toolTabs: ToolTab[] = [
  { id: 'all', name: '全部工具' },
  { id: 'trading', name: '交易工具' },
  { id: 'analysis', name: '分析工具' },
  { id: 'assets', name: '资产管理' },
  { id: 'settings', name: '系统设置' },
]

// 定义工具项数据结构
interface ToolItem {
  id: string
  name: string
  description: string
  category: string
  iconBgColor: string
  iconColor: string
  iconSvg: string
}

const handleUseClick = (tool: ToolItem) => {
  ElMessage({
    message: `${tool.name}开发中...`,
    type: 'info',
  })
}

// 工具项示例数据
const toolItems: ToolItem[] = [
  {
    id: 'market-scanner',
    name: '市场扫描器',
    description: '实时监控市场动态，发现潜在交易机会',
    category: 'analysis',
    iconBgColor: '#409eff',
    iconColor: '#ffffff',
    iconSvg: `<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M21 3H3v18h18V3z"></path><path d="M9 3v18"></path><path d="M3 9h18"></path></svg>`,
  },
  {
    id: 'trading-bot',
    name: '智能交易机器人',
    description: '根据预设策略自动执行交易操作',
    category: 'trading',
    iconBgColor: '#67c23a',
    iconColor: '#ffffff',
    iconSvg: `<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>`,
  },
  {
    id: 'portfolio-tracker',
    name: '资产组合跟踪器',
    description: '全面监控和分析您的数字资产投资组合',
    category: 'assets',
    iconBgColor: '#e6a23c',
    iconColor: '#ffffff',
    iconSvg: `<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`,
  },
  {
    id: 'risk-analyzer',
    name: '风险分析工具',
    description: '评估投资风险，提供风险管理建议',
    category: 'analysis',
    iconBgColor: '#f56c6c',
    iconColor: '#ffffff',
    iconSvg: `<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="20" x2="12" y2="10"></line><line x1="18" y1="20" x2="18" y2="4"></line><line x1="6" y1="20" x2="6" y2="16"></line></svg>`,
  },
  {
    id: 'price-alert',
    name: '价格提醒设置',
    description: '设置价格阈值，接收即时提醒通知',
    category: 'trading',
    iconBgColor: '#909399',
    iconColor: '#ffffff',
    iconSvg: `<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>`,
  },
  {
    id: 'api-settings',
    name: 'API密钥管理',
    description: '管理交易所API密钥，实现自动交易',
    category: 'settings',
    iconBgColor: '#c0c4cc',
    iconColor: '#ffffff',
    iconSvg: `<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>`,
  },
]

// 当前选中的标签
const activeTab = ref('all')

// 根据当前选中的标签过滤工具项
const filteredTools = ref(toolItems)

// 监听标签变化，更新过滤后的工具列表
activeTab.value = 'all' // 重置为默认值
activeTab.value = activeTab.value // 触发响应式更新

// 过滤工具项的计算属性
const filteredToolsComputed = () => {
  if (activeTab.value === 'all') {
    return toolItems
  }
  return toolItems.filter((item) => item.category === activeTab.value)
}
</script>

<style scoped lang="scss">
// 确保在Element Plus容器中正确显示
:deep(.el-container) {
  height: 100%;
}

:deep(.el-main) {
  padding: 0 !important;
  height: 100%;
  overflow: hidden;
}

// 确保组件能完全填充容器
.menu-page-container {
  padding: 0;
  height: 100vh; // 使用视口高度确保完全填充
  min-height: 100%;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  margin: 0;
  width: 100%;
  box-sizing: border-box;
}

// 页面头部样式
.menu-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 32px;
  border-bottom: 1px solid #ebeef5;
  background-color: #ffffff;
  flex-shrink: 0;
}

// 左侧标题区域样式
.header-title-container {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.main-title {
  font-size: 24px;
  font-weight: 700;
  color: #303133;
  margin: 0;
}

.sub-title {
  font-size: 14px;
  color: #909399;
  margin: 0;
}

// 右侧工具栏样式
.tool-tabs {
  display: flex;
  gap: 8px;
}

.tool-tab {
  padding: 8px 16px;
  border-radius: 8px;
  border: none;
  background-color: #f5f7fa;
  color: #606266;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  outline: none;
  font-weight: 500;
  &:hover {
    background-color: #e4e7ed;
  }
  &.active {
    background-color: #409eff;
    color: #ffffff;
    &:hover {
      background-color: #66b1ff;
    }
  }
}

// 页面内容区域样式
.menu-content {
  flex: 1;
  padding: 24px 32px;
  overflow-y: auto;
  min-height: 0; // 修复flex子元素溢出问题
  background-color: #fafafa;
}

// 工具卡片样式
.tool-card {
  background-color: #ffffff;
  border-radius: 28px; // 圆角稍大
  padding: 24px;
  height: 100%;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  position: relative;
  transition: all 0.3s ease;
  &:hover {
    box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.12);
    transform: translateY(-2px);
  }

  // 图标容器样式
  .tool-icon-container {
    position: absolute;
    top: 24px;
    left: 24px;
    width: 48px;
    height: 48px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
  }

  // 图标样式
  .tool-icon {
    width: 24px;
    height: 24px;
  }

  // 工具信息区域样式
  .tool-info {
    margin-top: 8px; // 减少顶部边距
    margin-left: 80px; // 为左侧图标留出足够空间
    flex: 1;

    // 工具名称样式
    .tool-name {
      font-size: 18px;
      font-weight: 700; // 黑色加粗
      color: #303133;
      margin: 0 0 8px 0;
    }

    // 工具描述样式
    .tool-description {
      font-size: 14px;
      color: #606266; // 深灰色字体
      line-height: 1.6;
      margin: 0;
    }
  }

  // 工具操作区域样式
  .tool-action {
    margin-top: 24px;
    display: flex;
    justify-content: flex-end;

    // 使用按钮样式
    .use-button {
      padding: 8px 16px;
      border: none;
      border-radius: 8px;
      color: #ffffff;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
      outline: none;
      &:hover {
        opacity: 0.9;
        transform: scale(1.05);
      }
      &:active {
        transform: scale(0.98);
      }
    }
  }
}

// 确保根元素也有正确的高度设置
* {
  box-sizing: border-box;
}
</style>
