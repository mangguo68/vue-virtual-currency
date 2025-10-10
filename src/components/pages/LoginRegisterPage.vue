<template>
  <div class="login-register-container">
    <div class="auth-card">
      <div class="auth-header">
        <h2 class="auth-title">{{ isLogin ? '登录' : '注册' }}</h2>
        <p class="auth-subtitle">
          {{ isLogin ? '欢迎回来，请登录您的账户' : '创建新账户，开始您的虚拟货币之旅' }}
        </p>
      </div>

      <!-- 登录表单 -->
      <el-form
        v-if="isLogin"
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginRules"
        class="auth-form"
        label-position="top"
        size="large"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="请输入用户名"
            class="custom-input"
            :prefix-icon="User"
          />
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input
            v-model="loginForm.password"
            placeholder="请输入密码"
            type="password"
            class="custom-input"
            :prefix-icon="Lock"
          />
        </el-form-item>

        <div class="form-options">
          <el-checkbox v-model="loginForm.remember">记住我</el-checkbox>
          <el-link type="primary">忘记密码？</el-link>
        </div>

        <!-- 错误消息显示 -->
        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>

        <el-form-item>
          <el-button
            type="primary"
            @click="handleLogin"
            class="custom-button primary-button !rounded-xl w-full"
            :loading="loading"
          >
            登录
          </el-button>
        </el-form-item>
      </el-form>

      <!-- 注册表单 -->
      <el-form
        v-else
        ref="registerFormRef"
        :model="registerForm"
        :rules="registerRules"
        class="auth-form"
        label-position="top"
        size="large"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="registerForm.username"
            placeholder="请输入用户名（3-20个字符）"
            class="custom-input"
            :prefix-icon="User"
            maxlength="20"
          />
        </el-form-item>

        <el-form-item label="邮箱" prop="email">
          <el-input
            v-model="registerForm.email"
            placeholder="请输入邮箱地址"
            type="email"
            class="custom-input"
            :prefix-icon="CreditCard"
          />
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input
            v-model="registerForm.password"
            placeholder="请设置密码（至少8个字符）"
            type="password"
            class="custom-input"
            :prefix-icon="Lock"
          />
        </el-form-item>

        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input
            v-model="registerForm.confirmPassword"
            placeholder="请再次输入密码"
            type="password"
            class="custom-input"
            :prefix-icon="Lock"
          />
        </el-form-item>

        <el-form-item prop="agreeTerms" class="agree-terms">
          <el-checkbox v-model="registerForm.agreeTerms">
            我已阅读并同意 <el-link type="primary">服务条款</el-link> 和
            <el-link type="primary">隐私政策</el-link>
          </el-checkbox>
        </el-form-item>

        <!-- 错误消息显示 -->
        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>

        <el-form-item>
          <el-button
            type="primary"
            @click="handleRegister"
            class="custom-button primary-button !rounded-xl w-full"
            :loading="loading"
          >
            {{ loading ? '注册中...' : '注册' }}
          </el-button>
        </el-form-item>
      </el-form>

      <div class="auth-switch">
        <span>
          {{ isLogin ? '还没有账户？' : '已有账户？' }}
          <el-link type="primary" @click="toggleAuthMode">
            {{ isLogin ? '立即注册' : '立即登录' }}
          </el-link>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { User, Lock, CreditCard } from '@element-plus/icons-vue'
import { ElMessage, type ElForm } from 'element-plus'

const props = withDefaults(
  defineProps<{
    isLogin?: boolean
  }>(),
  {
    isLogin: true,
  },
)

const router = useRouter()
const isLogin = ref<boolean>(props.isLogin)
const loading = ref(false)
const errorMessage = ref('')

// 检查用户是否已登录，如已登录则自动跳转到首页
const checkLoginStatus = () => {
  // 检查localStorage和sessionStorage中是否有token
  const token = localStorage.getItem('token') || sessionStorage.getItem('token')

  // 如果存在token，则认为用户已登录，直接跳转到首页
  if (token) {
    router.push('/')
  }
}

// 组件挂载时检查登录状态
checkLoginStatus()

// 登录表单数据
const loginForm = reactive({
  username: '',
  password: '',
  remember: false,
})

// 注册表单数据
const registerForm = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  agreeTerms: false,
})

// 登录表单引用
const loginFormRef = ref<InstanceType<typeof ElForm>>()
// 注册表单引用
const registerFormRef = ref<InstanceType<typeof ElForm>>()

// 登录表单校验规则
const loginRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '用户名长度在 3 到 20 个字符', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度至少 6 个字符', trigger: 'blur' },
  ],
}

// 注册表单校验规则
const registerRules: any = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '用户名长度在 3 到 20 个字符', trigger: 'blur' },
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入有效的邮箱地址', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 8, message: '密码长度至少 8 个字符', trigger: 'blur' },
  ],
  confirmPassword: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    {
      validator: (rule: any, value: string, callback: Function) => {
        if (value !== registerForm.password) {
          callback(new Error('两次输入的密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur',
    },
  ],
  agreeTerms: [
    { required: true, message: '请阅读并同意服务条款和隐私政策', trigger: 'change' },
    {
      validator: (rule: any, value: boolean, callback: Function) => {
        if (!value) {
          callback(new Error('请阅读并同意服务条款和隐私政策'))
        } else {
          callback()
        }
      },
      trigger: 'change',
    },
  ],
}

// 切换登录/注册模式
const toggleAuthMode = () => {
  isLogin.value = !isLogin.value
  errorMessage.value = '' // 清空错误信息
}

// 处理登录
const handleLogin = async () => {
  try {
    loading.value = true
    errorMessage.value = ''

    // 验证表单
    await loginFormRef.value?.validate()

    // 创建FormData
    const formData = new FormData()
    formData.append('loginName', loginForm.username)
    formData.append('password', loginForm.password)

    // 发送登录请求
    const response = await axios.post('http://localhost:9999/user/login', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    // 处理响应
    const data = response.data
    if (data.code === 200 && data.data && data.data.code === 200) {
      // 登录成功
      ElMessage.success('登录成功')
      // 只有当用户勾选记住我时才保存token和用户信息
      if (loginForm.remember) {
        localStorage.setItem('token', data.data.token)
        localStorage.setItem('userInfo', JSON.stringify(data.data.userInfo))
      } else {
        // 否则可以考虑使用sessionStorage或者不存储
        sessionStorage.setItem('token', data.data.token)
        sessionStorage.setItem('userInfo', JSON.stringify(data.data.userInfo))
      }
      // 跳转到首页或其他页面
      router.push('/')
    } else if (data.code === 200 && data.data && data.data.code === 401) {
      // 用户名或密码错误
      errorMessage.value = data.data.message || '用户名或密码错误'
      ElMessage.error(errorMessage.value)
    } else {
      // 其他错误
      errorMessage.value = data.message || '登录失败'
      ElMessage.error(errorMessage.value)
    }
  } catch (error: any) {
    // 捕获验证错误和网络错误
    if (error.name === 'Error' && !error.message.includes('Failed to validate')) {
      errorMessage.value = '网络错误，请稍后重试'
    }
    console.error('Login error:', error)
  } finally {
    loading.value = false
  }
}

// 处理注册
const handleRegister = async () => {
  try {
    await registerFormRef.value?.validate()
    loading.value = true
    errorMessage.value = ''

    // 创建FormData
    const form = new FormData()
    form.append('username', registerForm.username)
    form.append('password', registerForm.password)
    form.append('email', registerForm.email)

    // 发送注册请求
    const response = await axios.request({
      method: 'POST',
      url: 'http://localhost:9999/user/register',
      headers: {
        'content-type': 'multipart/form-data',
      },
      data: form,
    })

    // 处理响应
    if (response.data.code === 200 && response.data.data.code === 200) {
      console.log('注册成功:', response.data.data)
      ElMessage.success('注册成功！')
      // 注册成功后切换到登录模式
      isLogin.value = true
      // 可以自动填充用户名
      loginForm.username = registerForm.username
      // 清空注册表单
      registerFormRef.value?.resetFields()
    } else {
      // 处理业务逻辑错误
      ElMessage.error(response.data.data?.message || '注册失败，请稍后重试')
    }
  } catch (error: any) {
    // 表单校验失败或网络错误
    if (error.response) {
      console.error('注册请求错误:', error)
      if (error.response?.data?.code === 400) {
        ElMessage.error(error.response.data.message || '注册失败')
      } else {
        ElMessage.error('网络错误，请检查连接后重试')
      }
    }
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-register-container {
  background-image: url('@/assets/images/【哲风壁纸】咖啡屋-咖啡屋绿植.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  width: 100%;
  box-sizing: border-box;
}

.auth-card {
  background-color: #ffffff;
  border-radius: 28px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 40px;
  width: 100%;
  max-width: 450px;
  transition: transform 0.3s ease;
}

.auth-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.15);
}

.auth-header {
  text-align: center;
  margin-bottom: 30px;
}

.auth-title {
  font-size: 28px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 10px;
}

.auth-subtitle {
  font-size: 16px;
  color: #6b7280;
  line-height: 1.5;
}

.auth-form {
  width: 100%;
}

/* 调整输入框圆角大小 */
:deep(.el-input__wrapper) {
  border-radius: 10px;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.agree-terms {
  margin-bottom: 20px;
}

.error-message {
  color: #ef4444;
  font-size: 14px;
  margin-top: 8px;
  margin-bottom: 16px;
  padding: 8px 12px;
  background-color: #fee2e2;
  border-radius: 6px;
  border-left: 4px solid #ef4444;
}

.auth-switch {
  text-align: center;
  margin-top: 24px;
  font-size: 14px;
  color: #6b7280;
}

@media (max-width: 768px) {
  .auth-card {
    padding: 28px 24px;
    margin: 10px;
  }

  .auth-title {
    font-size: 24px;
  }

  .auth-subtitle {
    font-size: 14px;
  }
}
</style>
