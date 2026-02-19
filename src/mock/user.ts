import Mock from 'mockjs'

// 用户信息模拟数据
const userInfoData = {
  code: 200,
  message: 'success',
  data: {
    code: 200,
    message: '获取用户信息成功',
    data: {
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
      avatar_url: '/avatars/zhangwei.jpg',
      balance: 34230.56,
      created_at: '2025-09-25T20:08:58',
      updated_at: '2026-02-13T15:30:45'
    }
  }
}

// 模拟多个用户数据
const usersData = [
  {
    user_id: 1,
    username: 'zhangwei',
    full_name: '张伟',
    email: 'zhangwei@email.com',
    kyc_status: 'verified',
    avatar_url: '/avatars/zhangwei.jpg',
    balance: 34230.56
  },
  {
    user_id: 2,
    username: 'lisi',
    full_name: '李四',
    email: 'lisi@email.com',
    kyc_status: 'pending',
    avatar_url: '/avatars/lisi.jpg',
    balance: 15680.23
  },
  {
    user_id: 3,
    username: 'wangwu',
    full_name: '王五',
    email: 'wangwu@email.com',
    kyc_status: 'not_started',
    avatar_url: '/avatars/wangwu.jpg',
    balance: 8920.75
  }
]

// Mock 用户信息接口
Mock.mock(/\/user\/uid\/\d+/, 'get', (options: any) => {
  console.log('🎯 Mock API 被调用:', options.url)
  console.log('📥 请求选项:', options)
  
  // 从URL中提取用户ID
  const urlParts = options.url.split('/')
  const userId = parseInt(urlParts[urlParts.length - 1])
  
  console.log('🔢 提取的用户ID:', userId)
  
  // 模拟网络延迟
  return new Promise((resolve) => {
    setTimeout(() => {
      if (userId === 1) {
        resolve(userInfoData)
      } else if (userId >= 2 && userId <= 3) {
        // 返回其他用户的信息
        const userData = { ...userInfoData }
        userData.data.data = {
          ...userData.data.data,
          ...usersData.find(user => user.user_id === userId)
        }
        resolve(userData)
      } else {
        // 用户不存在的情况
        resolve({
          code: 200,
          message: 'success',
          data: {
            code: 404,
            message: '用户不存在',
            data: null
          }
        })
      }
    }, 500) // 500ms 模拟延迟
  })
})

// Mock 用户列表接口
Mock.mock('/user/list', 'get', () => {
  console.log('Mock 用户列表 API 被调用')
  
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        code: 200,
        message: 'success',
        data: {
          code: 200,
          message: '获取用户列表成功',
          data: usersData
        }
      })
    }, 300)
  })
})

// Mock 用户登录接口
Mock.mock('/auth/login', 'post', (options: any) => {
  console.log('Mock 登录 API 被调用:', options.body)
  
  const { username, password } = JSON.parse(options.body)
  
  return new Promise((resolve) => {
    setTimeout(() => {
      // 简单的用户名密码验证
      if (username === 'zhangwei' && password === '123456') {
        resolve({
          code: 200,
          message: '登录成功',
          data: {
            code: 200,
            message: '登录成功',
            data: {
              user_id: 1,
              username: 'zhangwei',
              full_name: '张伟',
              token: 'mock-jwt-token-' + Date.now(),
              expires_in: 3600
            }
          }
        })
      } else {
        resolve({
          code: 200,
          message: 'success',
          data: {
            code: 401,
            message: '用户名或密码错误',
            data: null
          }
        })
      }
    }, 800)
  })
})

export default Mock