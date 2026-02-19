// 全局用户状态管理
import { ref, computed } from 'vue'
import type { UserInfo } from '@/composables/useUserInfo'
import { getUserInfo } from '@/api/user'

// 创建全局响应式状态
const globalUserInfo = ref<UserInfo>({
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

const isLoading = ref(false)
const errorMessage = ref('')

// 计算属性
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

  const name = globalUserInfo.value.full_name || globalUserInfo.value.username || '用户'
  return `${greetingText}，${name}`
})

const userInitial = computed(() => {
  const name = globalUserInfo.value.full_name || globalUserInfo.value.username || '用户'
  return name.charAt(0).toUpperCase()
})

// 获取用户信息
const fetchGlobalUserInfo = async () => {
  try {
    isLoading.value = true
    errorMessage.value = ''

    const response = await getUserInfo(1)

    if (response.code === 200 && response.data) {
      globalUserInfo.value = response.data
    } else {
      throw new Error(response.message)
    }
  } catch (error: any) {
    errorMessage.value = '获取用户信息失败: ' + error.message
    // 使用模拟数据作为备选
    globalUserInfo.value = {
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
      kyc_status: 'verified',
      security_level: 'high',
      avatarUrl: '/avatars/zhangwei.jpg',
      balance: 34230.56
    }
  } finally {
    isLoading.value = false
  }
}

// 导出全局状态和方法
export function useGlobalUserInfo() {
  return {
    // 状态
    userInfo: globalUserInfo,
    isLoading,
    errorMessage,
    // 计算属性
    greeting,
    userInitial,
    // 方法
    fetchUserInfo: fetchGlobalUserInfo
  }
}