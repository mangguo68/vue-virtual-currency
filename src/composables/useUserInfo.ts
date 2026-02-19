import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { getUserInfo } from '@/api/user'

// 用户信息接口定义
export interface UserInfo {
  user_id: number
  username: string
  email: string
  phone: string
  full_name: string
  id_card_number: string
  date_of_birth: string
  country: string
  registration_date: string
  last_login: string | null
  account_status: string
  kyc_status: string
  security_level: string
  avatarUrl?: string | null
  balance?: number
}

// KYC状态映射
const KYC_STATUS_MAP: Record<string, string> = {
  verified: '个人认证',
  pending: '审核中',
  rejected: '认证失败',
  not_started: '未认证',
}

export function useUserInfo() {
  // 用户信息状态
  const userInfo = ref<UserInfo>({
    user_id: 0,
    username: '',
    email: '',
    phone: '',
    full_name: '',
    id_card_number: '',
    date_of_birth: '',
    country: '',
    registration_date: '',
    last_login: null,
    account_status: '',
    kyc_status: 'not_started',
    security_level: 'medium',
  })

  // 加载状态
  const isLoading = ref(false)
  const errorMessage = ref('')

  // 计算打招呼语
  const greeting = computed(() => {
    const hour = new Date().getHours()
    let greetingText = '您好'

    if (hour < 12) {
      greetingText = '早上好'
    } else if (hour < 18) {
      greetingText = '下午好'
    } else {
      greetingText = '晚上好'
    }

    const name = userInfo.value.full_name || userInfo.value.username || '用户'
    return `${greetingText}，${name}`
  })

  // 计算用户姓名首字母
  const userInitial = computed(() => {
    const name = userInfo.value.full_name || userInfo.value.username || '用户'
    return name.charAt(0).toUpperCase()
  })

  // 获取KYC状态文本
  const getKycStatusText = (status: string): string => {
    return KYC_STATUS_MAP[status] || '未认证'
  }

  // 获取用户信息
  const fetchUserInfo = async () => {
    try {
      isLoading.value = true
      errorMessage.value = ''

      // 调用用户API函数
      const response = await getUserInfo(1)

      // 处理响应
      if (response.code === 200 && response.data) {
        // 更新用户信息
        userInfo.value = response.data
      } else {
        throw new Error(response.message)
      }
    } catch (error: any) {
      errorMessage.value = '获取用户信息失败: ' + error.message
      // 使用模拟数据作为备选
      userInfo.value = getMockUserInfo()
    } finally {
      isLoading.value = false
      console.log('🏁 结束获取用户信息:', userInfo.value)
    }
  }

  // 获取模拟用户信息
  const getMockUserInfo = (): UserInfo => ({
    user_id: 1,
    username: 'zhangwei',
    email: 'zhangwei@email.com',
    phone: '13800138001',
    full_name: '张伟',
    id_card_number: '110101199001011234',
    date_of_birth: '1990-01-01',
    country: '中国',
    registration_date: '2025-09-25T20:08:58',
    last_login: null,
    account_status: 'active',
    kyc_status: 'not_started',
    security_level: 'medium',
    avatarUrl: null,
  })

  // 处理头像编辑按钮点击事件
  const handleEditButtonClick = () => {
    ElMessage({
      message: '打开用户信息编辑页面',
      type: 'info',
    })
  }

  return {
    // 状态
    userInfo,
    isLoading,
    errorMessage,
    // 计算属性
    greeting,
    userInitial,
    // 方法
    getKycStatusText,
    fetchUserInfo,
    handleEditButtonClick,
  }
}
