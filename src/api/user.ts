// 用户相关API函数
import type { UserInfo } from '@/composables/useUserInfo'

// 模拟用户数据
const mockUsers: Record<number, UserInfo> = {
  1: {
    user_id: 1,
    username: 'zhangwei',
    email: 'zhangwei@email.com',
    phone: '13800138001',
    full_name: '张伟',
    id_card_number: '110101199001011234',
    date_of_birth: '1990-01-01',
    country: '中国',
    registration_date: '2025-09-25T20:08:58',
    last_login: '2026-02-13T15:30:45',
    account_status: 'active',
    kyc_status: 'verified',
    security_level: 'high',
    avatarUrl: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
    balance: 34230.56,
  },
  2: {
    user_id: 2,
    username: 'lisi',
    email: 'lisi@email.com',
    phone: '13800138002',
    full_name: '李四',
    id_card_number: '110101199001011235',
    date_of_birth: '1992-05-15',
    country: '中国',
    registration_date: '2025-10-01T10:20:30',
    last_login: '2026-02-13T14:15:20',
    account_status: 'active',
    kyc_status: 'pending',
    security_level: 'medium',
    avatarUrl: '/avatars/lisi.jpg',
    balance: 15680.23,
  },
  3: {
    user_id: 3,
    username: 'wangwu',
    email: 'wangwu@email.com',
    phone: '13800138003',
    full_name: '王五',
    id_card_number: '110101199001011236',
    date_of_birth: '1988-12-03',
    country: '中国',
    registration_date: '2025-10-10T08:45:12',
    last_login: '2026-02-12T09:30:15',
    account_status: 'active',
    kyc_status: 'not_started',
    security_level: 'low',
    avatarUrl: '/avatars/wangwu.jpg',
    balance: 8920.75,
  },
}

// API响应类型
interface ApiResponse<T> {
  code: number
  message: string
  data: T
}

// 获取用户信息
export async function getUserInfo(userId: number = 1): Promise<ApiResponse<UserInfo>> {
  console.log(`📡 调用 getUserInfo API, userId: ${userId}`)
  
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 500))
  
  // 检查用户是否存在
  if (mockUsers[userId]) {
    console.log(`✅ 找到用户: ${mockUsers[userId].full_name}`)
    return {
      code: 200,
      message: 'success',
      data: mockUsers[userId]
    }
  } else {
    console.log(`❌ 用户不存在: ${userId}`)
    return {
      code: 404,
      message: '用户不存在',
      data: undefined as any
    }
  }
}

// 获取用户列表
export async function getUserList(): Promise<ApiResponse<UserInfo[]>> {
  console.log('📡 调用 getUserList API')
  
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 300))
  
  const userList = Object.values(mockUsers)
  console.log(`✅ 获取到 ${userList.length} 个用户`)
  
  return {
    code: 200,
    message: 'success',
    data: userList
  }
}

// 用户登录
export async function userLogin(username: string, password: string): Promise<ApiResponse<{user: UserInfo, token: string}>> {
  console.log(`📡 调用 userLogin API, username: ${username}`)
  
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 800))
  
  // 简单的验证逻辑
  if (username === 'zhangwei' && password === '123456') {
    const user = mockUsers[1]
    const token = `mock-jwt-token-${Date.now()}`
    
    console.log(`✅ 登录成功: ${user.full_name}`)
    
    return {
      code: 200,
      message: '登录成功',
      data: {
        user,
        token
      }
    }
  } else {
    console.log('❌ 登录失败: 用户名或密码错误')
    return {
      code: 401,
      message: '用户名或密码错误',
      data: undefined as any
    }
  }
}

// 更新用户信息
export async function updateUserInfo(userId: number, updates: Partial<UserInfo>): Promise<ApiResponse<UserInfo>> {
  console.log(`📡 调用 updateUserInfo API, userId: ${userId}`)
  
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 600))
  
  if (mockUsers[userId]) {
    // 更新用户信息
    mockUsers[userId] = { ...mockUsers[userId], ...updates }
    
    console.log(`✅ 用户信息更新成功: ${mockUsers[userId].full_name}`)
    
    return {
      code: 200,
      message: '更新成功',
      data: mockUsers[userId]
    }
  } else {
    console.log(`❌ 用户不存在: ${userId}`)
    return {
      code: 404,
      message: '用户不存在',
      data: undefined as any
    }
  }
}