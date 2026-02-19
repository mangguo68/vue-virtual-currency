import { ref } from 'vue'
import { ElMessage } from 'element-plus'

export function useFundManagement() {
  // 搜索框数据
  const searchQuery = ref('')

  // 处理资金菜单按钮点击事件
  const handleFundMenuClick = () => {
    ElMessage({
      message: '打开资金管理菜单',
      type: 'success',
    })
  }

  // 处理更新配置按钮点击事件
  const handleUpdatesConfigClick = () => {
    ElMessage({
      message: '打开更新通知配置',
      type: 'warning',
    })
  }

  return {
    // 状态
    searchQuery,
    // 方法
    handleFundMenuClick,
    handleUpdatesConfigClick,
  }
}