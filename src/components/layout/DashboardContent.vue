<template>
  <el-container>
    <!-- 头部 -->
    <el-header class="!h-fit header-content">
      <!-- 第一行内容：标题和时间选择器 -->
      <div class="header-first-row">
        <!-- 左侧标题区域 -->
        <div class="header-title">
          <div class="main-title">{{ greeting }}</div>
          <div class="sub-title-wrapper">
            <Marquee text="欢迎来到虚拟币交易系统! 今日涨幅2.3%" :min-width="0" />
          </div>
        </div>

        <!-- 右侧时间选择器区域 -->
        <TimeSelector
          default-time="day"
          @time-change="handleTimeChange"
          @calendar-open="handleCalendarOpen"
        />
      </div>

      <!-- 第二行内容：货币列表 -->
      <CurrencyList />
    </el-header>
    <!-- 主内容区域 -->
    <el-main>
      <!-- 收益模块容器 - 使用el-row和el-col布局 -->
      <el-row>
        <!-- 第一行：收益表现和收益分解 -->
        <el-col class="p-3" :xs="24" :sm="24" :md="24" :lg="16" :xl="16">
          <PerformanceChart />
        </el-col>
        <el-col class="p-3" :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
          <ProfitBreakdown />
        </el-col>
      </el-row>
      <el-row>
        <!-- 第二行：投资组合和走势预测 -->
        <el-col class="p-3" :xs="24" :sm="24" :md="24" :lg="16" :xl="16">
          <InvestmentPortfolio />
        </el-col>
        <el-col class="p-3" :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
          <TrendPrediction />
        </el-col>
      </el-row>
    </el-main>
  </el-container>
  <!-- 右侧边栏 -->
  <el-aside class="user-sidebar">
    <!-- 第一行:用户基本信息 -->
    <div class="user-info-section">
      <el-avatar
        :src="
          userInfo.avatarUrl ||
          'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
        "
        class="user-avatar"
        v-if="!isLoading"
      >
        {{ userInitial }}
      </el-avatar>
      <el-avatar class="user-avatar" v-else>
        <el-icon><Loading /></el-icon>
      </el-avatar>
      <div class="user-details">
        <div class="user-name">{{ userInfo.full_name || userInfo.username || '用户' }}</div>
        <div class="user-verification">
          <el-icon class="verification-icon">
            <svg
              id="组_608"
              data-name="组 608"
              xmlns="http://www.w3.org/2000/svg"
              width="14.834"
              height="14.833"
              viewBox="0 0 14.834 14.833"
            >
              <path
                id="路径_27"
                data-name="路径 27"
                d="M6.184,16.139h2l1.417,1.417a1.291,1.291,0,0,0,1.823,0l1.417-1.417H14.85a1.29,1.29,0,0,0,1.288-1.289V12.846l1.418-1.418a1.29,1.29,0,0,0,0-1.823L16.138,8.189v-2a1.291,1.291,0,0,0-1.288-1.29H12.845L11.428,3.477a1.288,1.288,0,0,0-1.823,0L8.188,4.894h-2a1.291,1.291,0,0,0-1.289,1.29v2L3.477,9.6a1.288,1.288,0,0,0,0,1.822l1.418,1.418V14.85A1.291,1.291,0,0,0,6.184,16.139ZM4.232,10.672a.218.218,0,0,1-.064-.156.221.221,0,0,1,.064-.155L5.807,8.788a.531.531,0,0,0,.156-.378V6.184a.221.221,0,0,1,.222-.22H8.409a.538.538,0,0,0,.377-.157l1.574-1.574a.224.224,0,0,1,.312,0l1.574,1.574a.538.538,0,0,0,.378.157H14.85a.221.221,0,0,1,.221.22V8.409a.534.534,0,0,0,.157.378L16.8,10.362a.22.22,0,0,1,0,.311l-1.574,1.574a.538.538,0,0,0-.157.378v2.227a.221.221,0,0,1-.221.22H12.624a.538.538,0,0,0-.378.157L10.672,16.8a.218.218,0,0,1-.156.066.223.223,0,0,1-.157-.066L8.787,15.227a.538.538,0,0,0-.377-.157H6.184a.221.221,0,0,1-.222-.22V12.624a.525.525,0,0,0-.156-.377Z"
                transform="translate(-3.1 -3.1)"
                fill="#57b4ea"
              />
              <path
                id="路径_28"
                data-name="路径 28"
                d="M10.982,13.778h.035a.528.528,0,0,0,.368-.2L14.121,10.2a.534.534,0,0,0-.079-.751.547.547,0,0,0-.392-.118.53.53,0,0,0-.359.195l-2.375,2.931L9.538,11.167a.523.523,0,0,0-.364-.146H9.158a.535.535,0,0,0-.519.55.528.528,0,0,0,.168.372l1.8,1.689a.529.529,0,0,0,.365.145v.083Z"
                transform="translate(-4.023 -4.139)"
                fill="#57b4ea"
              />
            </svg>
          </el-icon>
          <span>{{ getKycStatusText(userInfo.kyc_status) }}</span>
        </div>
      </div>
      <el-button class="edit-button" circle @click="handleEditButtonClick">
        <el-icon>
          <svg
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            width="16.000000"
            height="16.000000"
            fill="none"
          >
            <rect id="Edit 1" width="16.000000" height="16.000000" x="0.000000" y="0.000000" />
            <path
              id="矢量 1"
              d="M12.3864 15.0169L3.75221 15.0169C2.26223 15.0169 1.05004 13.8047 1.05004 12.3147L1.05004 3.70766C1.05004 2.21768 2.26223 1.00549 3.75221 1.00549L8.70885 1.00549C8.92961 1.00549 9.10858 1.18446 9.10858 1.40522C9.10858 1.62598 8.92961 1.80495 8.70885 1.80495L3.75221 1.80495C2.70305 1.80495 1.8495 2.6585 1.8495 3.70766L1.8495 12.3147C1.8495 13.3639 2.70305 14.2174 3.75221 14.2174L12.3864 14.2174C13.4355 14.2174 14.2891 13.3639 14.2891 12.3147L14.2891 7.80547C14.2891 7.58471 14.468 7.40575 14.6888 7.40575C14.9096 7.40575 15.0885 7.58471 15.0885 7.80547L15.0885 12.3147C15.0885 13.8047 13.8763 15.0169 12.3864 15.0169Z"
              fill="rgb(179,179,179)"
              fill-rule="nonzero"
            />
            <path
              id="矢量 2"
              d="M7.5097 11.5678L5.1143 11.5789C4.89354 11.5789 4.71457 11.4 4.71457 11.1792L4.71457 8.75103C4.71457 8.6983 4.72461 8.64756 4.74468 8.59881C4.76476 8.55005 4.79337 8.50696 4.83051 8.46953L12.6972 0.538919C12.8501 0.384704 13.0982 0.380866 13.2559 0.530237L15.6193 2.85132C15.6385 2.86954 15.6558 2.88948 15.671 2.91113C15.6863 2.93279 15.6993 2.95573 15.71 2.97997C15.7207 3.00421 15.7289 3.02926 15.7347 3.05513C15.7404 3.081 15.7435 3.10719 15.744 3.13368C15.7446 3.16017 15.7425 3.18645 15.7378 3.21253C15.733 3.23861 15.7258 3.26396 15.7161 3.2886C15.7063 3.31324 15.6942 3.33668 15.6798 3.35891C15.6654 3.38115 15.649 3.40175 15.6304 3.42071L7.79576 11.4473C7.75814 11.4858 7.71452 11.5155 7.6649 11.5364C7.61528 11.5573 7.56354 11.5678 7.5097 11.5678L7.5097 11.5678ZM5.51404 10.7795L7.3413 10.7683L14.7749 3.15264L12.9897 1.37926L5.51404 8.91564L5.51404 10.7795Z"
              fill="rgb(179,179,179)"
              fill-rule="nonzero"
            />
          </svg>
        </el-icon>
      </el-button>
    </div>
    <div class="search-section">
      <div class="search-input-wrapper">
        <el-input
          v-model="searchQuery"
          placeholder="搜索虚拟币"
          class="search-input"
          :suffix-icon="Search"
        />
      </div>
    </div>
    <div class="fund-overview-section">
      <!-- 标题行 -->
      <div class="fund-overview-header">
        <h3 class="fund-overview-title">资金概述</h3>
        <el-button class="fund-menu-button" circle @click="handleFundMenuClick">
          <el-icon>
            <svg
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              width="16.000000"
              height="16.000000"
              fill="none"
            >
              <rect id="菜单 1" width="16.000000" height="16.000000" x="0.000000" y="0.000000" />
              <path
                id="矢量 3"
                d="M5.97343 2.5875L3.39531 2.5875C2.65312 2.5875 2.05156 3.1875 2.05156 3.93125L2.05156 6.50938C2.05156 7.25156 2.65156 7.85313 3.39531 7.85313L5.97343 7.85313C6.71562 7.85313 7.325 7.25313 7.31718 6.50938L7.31718 3.93125C7.31718 3.1875 6.71562 2.5875 5.97343 2.5875ZM6.65 6.50938C6.65 6.68438 6.58281 6.85156 6.45781 6.97656C6.33281 7.10938 6.15781 7.17656 5.97343 7.17656L3.39531 7.17656C3.02031 7.17656 2.72031 6.87656 2.72031 6.50156L2.72031 3.92188C2.72031 3.54688 3.02031 3.24688 3.39531 3.24688L5.97343 3.24688L5.97343 3.25469C6.34843 3.25469 6.64844 3.55469 6.64844 3.92969L6.64844 6.50938L6.65 6.50938ZM5.97343 8.71094L3.39531 8.71094C2.65312 8.71094 2.05156 9.31094 2.05156 10.0547L2.05156 12.6328C2.05156 13.375 2.65156 13.9766 3.39531 13.9766L5.97343 13.9766C6.71562 13.9766 7.325 13.3766 7.31718 12.6328L7.31718 10.0547C7.31718 9.31094 6.71562 8.71094 5.97343 8.71094ZM6.65 12.6328C6.65 12.8078 6.58281 12.975 6.45781 13.1C6.33281 13.2328 6.15781 13.3 5.97343 13.3L3.39531 13.3C3.02031 13.3 2.72031 13 2.72031 12.625L2.72031 10.0547C2.72031 9.67969 3.02031 9.37969 3.39531 9.37969L5.97343 9.37969C6.34843 9.37969 6.64844 9.67969 6.64844 10.0547L6.64844 12.6328L6.65 12.6328ZM13.6156 4.27344L11.7969 2.45469C11.5469 2.20469 11.2047 2.0625 10.8453 2.0625C10.4859 2.0625 10.1453 2.20469 9.89375 2.45469L8.07656 4.27344C7.55156 4.79844 7.55156 5.65 8.07656 6.175L9.89531 7.99375C10.1453 8.24375 10.4875 8.38594 10.8469 8.38594C11.2062 8.38594 11.5469 8.25313 11.7984 7.99375L13.6172 6.175C14.1406 5.65 14.1406 4.79844 13.6156 4.27344L13.6156 4.27344ZM13.1406 5.7L11.3219 7.51875C11.2047 7.64375 11.0375 7.71094 10.8469 7.71094C10.6641 7.71094 10.4969 7.63594 10.3719 7.51094L8.55156 5.69063C8.42656 5.56563 8.35156 5.39062 8.35156 5.21563C8.35156 5.03281 8.41875 4.86563 8.55156 4.74063L10.3703 2.92188C10.4953 2.80469 10.6703 2.72969 10.8453 2.72969C11.0281 2.72969 11.1953 2.80469 11.3203 2.92969L13.1406 4.74844C13.2656 4.87344 13.3406 5.04844 13.3406 5.22344C13.3406 5.40781 13.2734 5.575 13.1406 5.7ZM12.1312 8.71094L9.55312 8.71094C8.81094 8.71094 8.20937 9.31094 8.20937 10.0547L8.20937 12.6328C8.20937 13.375 8.80937 13.9766 9.55312 13.9766L12.1312 13.9766C12.8734 13.9766 13.4828 13.3766 13.475 12.6328L13.475 10.0547C13.4734 9.31094 12.8734 8.71094 12.1312 8.71094ZM12.8062 12.6328C12.8062 12.8078 12.7391 12.975 12.6141 13.1C12.4891 13.2328 12.3141 13.3 12.1297 13.3L9.55156 13.3C9.17656 13.3 8.87656 13 8.87656 12.625L8.87656 10.0547C8.87656 9.67969 9.17656 9.37969 9.55156 9.37969L12.1297 9.37969C12.5047 9.37969 12.8047 9.67969 12.8047 10.0547L12.8047 12.6328L12.8062 12.6328Z"
                fill="rgb(173,173,173)"
                fill-rule="nonzero"
              />
            </svg>
          </el-icon>
        </el-button>
      </div>
      <!-- 资金数量显示 -->
      <div class="fund-amount-section">
        <div class="fund-amount">¥34,230.56</div>
      </div>
    </div>
    <!-- 资产配置饼状图组件 -->
    <PortfolioPieChart />
    <!-- 最后一块区域:更新记录 -->
    <div class="updates-section">
      <!-- 标题行 -->
      <div class="updates-header">
        <h3 class="updates-title">更新</h3>
        <el-button
          :icon="Setting"
          class="updates-config-button"
          circle
          @click="handleUpdatesConfigClick"
        >
        </el-button>
      </div>
      <!-- 更新记录列表 -->
      <div class="updates-list">
        <!-- 第一条记录 -->
        <div class="update-item">
          <div class="update-time">7月4日 21:10</div>
          <div class="update-content">服务器将进行例行维护，预计维护时间大约为：2小时。</div>
        </div>
        <!-- 第二条记录 -->
        <div class="update-item">
          <div class="update-time">7月2日 15:30</div>
          <div class="update-content">系统已完成最新版本升级，新增了资产分析功能。</div>
        </div>
        <!-- 第三条记录 -->
        <div class="update-item">
          <div class="update-time">6月30日 10:15</div>
          <div class="update-content">修复了数据显示异常的问题，提高了系统稳定性。</div>
        </div>
      </div>
    </div>
  </el-aside>
</template>

<script setup lang="ts">
import { Search, Setting, Loading } from '@element-plus/icons-vue'
import Marquee from '@/components/common/Marquee.vue'
import TimeSelector from '@/components/common/TimeSelector.vue'
import CurrencyList from '@/components/common/CurrencyList.vue'
import PortfolioPieChart from '@/components/charts/PortfolioPieChart.vue'
import { ref, onMounted, computed } from 'vue'
import PerformanceChart from '@/components/charts/PerformanceChart.vue'
import ProfitBreakdown from '@/components/common/ProfitBreakdown.vue'
import InvestmentPortfolio from '@/components/common/InvestmentPortfolio.vue'
import TrendPrediction from '@/components/charts/TrendPrediction.vue'
import axios from 'axios'
import { ElMessage } from 'element-plus'

// 用户信息接口定义
interface UserInfo {
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
}

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

// 搜索框数据
const searchQuery = ref('')

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
  const statusMap: Record<string, string> = {
    verified: '个人认证',
    pending: '审核中',
    rejected: '认证失败',
    not_started: '未认证',
  }
  return statusMap[status] || '未认证'
}

// 从后端获取用户信息
const fetchUserInfo = async () => {
  try {
    isLoading.value = true
    errorMessage.value = ''

    // 从localStorage或sessionStorage获取用户ID和token
    const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user')
    let userId = 1 // 默认ID，实际应用中应从存储中获取

    if (storedUser) {
      const userData = JSON.parse(storedUser)
      userId = userData.user_id || 1
    }

    // 设置请求头，包含token
    const headers: Record<string, string> = {
      Accept: '*/*',
      'Content-Type': 'application/json',
    }

    // 尝试获取token
    const token = localStorage.getItem('token') || sessionStorage.getItem('token')
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    // 发送请求
    const response = await axios.get(`http://localhost:9999/user/uid/${userId}`, {
      headers,
    })

    // 处理响应
    if (response.data.code === 200 && response.data.data) {
      // 检查内部data结构
      const innerData = response.data.data
      if (innerData.code === 200 && innerData.data) {
        // 成功获取用户信息，注意avatar_url字段映射
        userInfo.value = {
          ...innerData.data,
          avatarUrl: 'http://localhost:9999' + innerData.data.avatar_url, // 字段映射
        }
      } else if (innerData.code === 404) {
        // 用户不存在
        console.warn('用户不存在:', innerData.message)
        errorMessage.value = '用户不存在'
        // 使用默认用户信息
        userInfo.value = {
          user_id: 0,
          username: '',
          email: '',
          phone: '',
          full_name: '用户',
          id_card_number: '',
          date_of_birth: '',
          country: '',
          registration_date: '',
          last_login: null,
          account_status: '',
          kyc_status: 'not_started',
          security_level: 'medium',
        }
      } else {
        console.warn('获取用户信息失败:', innerData.message)
        // 使用模拟数据作为备选
        userInfo.value = {
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
        }
      }
    } else {
      console.warn('接口返回异常')
      // 使用模拟数据作为备选
      userInfo.value = {
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
      }
    }
  } catch (error) {
    console.error('获取用户信息失败:', error)
    errorMessage.value = '获取用户信息失败'

    // 使用模拟数据作为备选
    userInfo.value = {
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
    }
  } finally {
    isLoading.value = false
  }
}

// 处理时间变化事件
const handleTimeChange = (time: 'day' | 'week' | 'month' | 'year') => {
  // 这里可以根据选择的时间范围执行相应的业务逻辑
  // 例如加载不同时间范围的数据
  console.log(`时间范围已切换为: ${time}`)
  // 这里可以添加额外的业务逻辑处理
}

// 处理日历打开事件
const handleCalendarOpen = () => {
  // 这里可以实现打开日历选择器的额外逻辑
  console.log('日历选择器已打开')
}

// 组件挂载时获取用户信息
onMounted(() => {
  fetchUserInfo()
})

// 处理头像编辑按钮点击事件
const handleEditButtonClick = () => {
  ElMessage({
    message: '打开用户信息编辑页面',
    type: 'info',
  })
}

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
</script>

<style scoped lang="scss">
@use './home.scss';
</style>
