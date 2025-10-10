<template>
  <div class="settings-page-container">
    <!-- 页面头部，样式参考MenuPage -->
    <div class="menu-header">
      <!-- 左侧标题区域 -->
      <div class="header-title-container">
        <h1 class="main-title">系统设置</h1>
        <p class="sub-title">管理您的账户和系统配置（由于该页面无UI设计图，所以UI较为随意）</p>
      </div>

      <!-- 右侧设置标签页 -->
      <div class="setting-tabs">
        <button
          v-for="tab in settingTabs"
          :key="tab.id"
          :class="['setting-tab', { active: activeTab === tab.id }]"
          @click="activeTab = tab.id"
        >
          {{ tab.name }}
        </button>
      </div>
    </div>

    <!-- 页面内容区域 -->
    <div class="settings-content">
      <!-- 账户设置 -->
      <div v-if="activeTab === 'account'" class="setting-section">
        <h2 class="section-title">账户设置</h2>

        <!-- 个人信息修改卡片 -->
        <div class="setting-card">
          <h3 class="card-title">个人信息修改</h3>
          <div class="form-group">
            <label class="form-label">用户名</label>
            <input
              type="text"
              class="form-input"
              v-model="userInfo.username"
              placeholder="请输入用户名"
            />
          </div>
          <div class="form-group">
            <label class="form-label">邮箱</label>
            <input
              type="email"
              class="form-input"
              v-model="userInfo.email"
              placeholder="请输入邮箱"
            />
          </div>
          <div class="form-group">
            <label class="form-label">手机号码</label>
            <input
              type="tel"
              class="form-input"
              v-model="userInfo.phone"
              placeholder="请输入手机号码"
            />
          </div>
          <div class="form-actions">
            <button class="btn-primary" @click="saveUserInfo">保存更改</button>
            <button class="btn-default" @click="cancelEdit">取消</button>
          </div>
        </div>

        <!-- 密码修改卡片 -->
        <div class="setting-card">
          <h3 class="card-title">密码修改</h3>
          <div class="form-group">
            <label class="form-label">当前密码</label>
            <input
              type="password"
              class="form-input"
              v-model="passwordInfo.currentPassword"
              placeholder="请输入当前密码"
            />
          </div>
          <div class="form-group">
            <label class="form-label">新密码</label>
            <input
              type="password"
              class="form-input"
              v-model="passwordInfo.newPassword"
              placeholder="请输入新密码"
            />
          </div>
          <div class="form-group">
            <label class="form-label">确认新密码</label>
            <input
              type="password"
              class="form-input"
              v-model="passwordInfo.confirmPassword"
              placeholder="请再次输入新密码"
            />
          </div>
          <div class="form-actions">
            <button class="btn-primary" @click="changePassword">修改密码</button>
            <button class="btn-default" @click="resetPasswordForm">重置</button>
          </div>
        </div>
      </div>

      <!-- 安全设置 -->
      <div v-else-if="activeTab === 'security'" class="setting-section">
        <h2 class="section-title">安全设置</h2>

        <!-- 两步验证卡片 -->
        <div class="setting-card">
          <h3 class="card-title">两步验证</h3>
          <div class="security-option">
            <span class="option-text">登录时需要两步验证</span>
            <el-switch
              v-model="securitySettings.twoFactorEnabled"
              @change="toggleTwoFactor"
            ></el-switch>
          </div>
          <div v-if="securitySettings.twoFactorEnabled" class="two-factor-details">
            <p class="info-text">请使用您的手机验证应用扫描下方二维码，并输入验证码完成设置。</p>
            <div class="qrcode-container">
              <div class="qrcode-placeholder">二维码图片</div>
            </div>
            <div class="form-group">
              <label class="form-label">验证码</label>
              <input
                type="text"
                class="form-input"
                v-model="securitySettings.verificationCode"
                placeholder="请输入6位验证码"
              />
            </div>
            <button class="btn-primary" @click="verifyTwoFactor">验证并启用</button>
          </div>
        </div>

        <!-- API密钥管理卡片 -->
        <div class="setting-card">
          <h3 class="card-title">API密钥管理</h3>
          <div class="api-key-list">
            <div v-if="apiKeys.length === 0" class="empty-state">
              <p>暂无API密钥，点击下方按钮创建新密钥。</p>
            </div>
            <div v-else v-for="key in apiKeys" :key="key.id" class="api-key-item">
              <div class="key-info">
                <span class="key-name">{{ key.name }}</span>
                <span class="key-date">{{ key.createdAt }}</span>
              </div>
              <div class="key-actions">
                <button class="btn-small" @click="showApiKey(key.id)">查看</button>
                <button class="btn-small btn-danger" @click="deleteApiKey(key.id)">删除</button>
              </div>
            </div>
          </div>
          <button class="btn-primary mt-4" @click="createNewApiKey">创建新API密钥</button>
        </div>
      </div>

      <!-- 通知设置 -->
      <div v-else-if="activeTab === 'notification'" class="setting-section">
        <h2 class="section-title">通知设置</h2>

        <!-- 邮件通知卡片 -->
        <div class="setting-card">
          <h3 class="card-title">邮件通知</h3>
          <div class="notification-option">
            <span class="option-text">接收交易确认邮件</span>
            <el-switch v-model="notificationSettings.email.transactionConfirmations"></el-switch>
          </div>
          <div class="notification-option">
            <span class="option-text">接收价格提醒邮件</span>
            <el-switch v-model="notificationSettings.email.priceAlerts"></el-switch>
          </div>
          <div class="notification-option">
            <span class="option-text">接收系统公告邮件</span>
            <el-switch v-model="notificationSettings.email.systemAnnouncements"></el-switch>
          </div>
        </div>

        <!-- 短信通知卡片 -->
        <div class="setting-card">
          <h3 class="card-title">短信通知</h3>
          <div class="notification-option">
            <span class="option-text">接收交易确认短信</span>
            <el-switch v-model="notificationSettings.sms.transactionConfirmations"></el-switch>
          </div>
          <div class="notification-option">
            <span class="option-text">接收异常登录提醒短信</span>
            <el-switch v-model="notificationSettings.sms.unusualLogin"></el-switch>
          </div>
          <div class="notification-option">
            <span class="option-text">接收提现提醒短信</span>
            <el-switch v-model="notificationSettings.sms.withdrawalAlerts"></el-switch>
          </div>
        </div>
      </div>

      <!-- 显示设置 -->
      <div v-else-if="activeTab === 'display'" class="setting-section">
        <h2 class="section-title">显示设置</h2>

        <!-- 主题切换卡片 -->
        <div class="setting-card">
          <h3 class="card-title">主题切换</h3>
          <div class="theme-options">
            <div
              class="theme-option"
              :class="{ active: displaySettings.theme === 'light' }"
              @click="setTheme('light')"
            >
              <div class="theme-preview light-theme"></div>
              <span class="theme-name">浅色主题</span>
            </div>
            <div
              class="theme-option"
              :class="{ active: displaySettings.theme === 'dark' }"
              @click="setTheme('dark')"
            >
              <div class="theme-preview dark-theme"></div>
              <span class="theme-name">深色主题</span>
            </div>
            <div
              class="theme-option"
              :class="{ active: displaySettings.theme === 'auto' }"
              @click="setTheme('auto')"
            >
              <div class="theme-preview auto-theme"></div>
              <span class="theme-name">自动切换</span>
            </div>
          </div>
        </div>

        <!-- 字体大小调整卡片 -->
        <div class="setting-card">
          <h3 class="card-title">字体大小调整</h3>
          <div class="font-size-control">
            <span class="size-label small">A</span>
            <input
              type="range"
              class="size-slider"
              v-model="displaySettings.fontSize"
              min="12"
              max="20"
              step="1"
            />
            <span class="size-label large">A</span>
          </div>
          <p class="preview-text" :style="{ fontSize: displaySettings.fontSize + 'px' }">
            {{ previewText }}
          </p>
        </div>
      </div>

      <!-- 交易设置 -->
      <div v-else-if="activeTab === 'trading'" class="setting-section">
        <h2 class="section-title">交易设置</h2>

        <!-- 默认交易数量卡片 -->
        <div class="setting-card">
          <h3 class="card-title">默认交易数量</h3>
          <div class="default-amount-options">
            <button
              v-for="amount in defaultAmounts"
              :key="amount"
              :class="['amount-button', { active: tradingSettings.defaultAmount === amount }]"
              @click="setDefaultAmount(amount)"
            >
              {{ amount }}%
            </button>
          </div>
          <p class="info-text">设置默认交易百分比，将在创建新交易时自动填充。</p>
        </div>

        <!-- 手续费设置卡片 -->
        <div class="setting-card">
          <h3 class="card-title">手续费设置</h3>
          <div class="fee-option">
            <span class="option-text">使用快速交易（更高手续费）</span>
            <el-switch v-model="tradingSettings.fastTrade"></el-switch>
          </div>
          <div class="fee-info">
            <p>标准手续费率: <span class="fee-rate">0.1%</span></p>
            <p>快速交易手续费率: <span class="fee-rate fast">0.2%</span></p>
          </div>
          <p class="info-text">快速交易可提高交易优先处理速度，适用于市场波动较大的情况。</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElSwitch } from 'element-plus'

// 定义设置标签数据
interface SettingTab {
  id: string
  name: string
}

const settingTabs: SettingTab[] = [
  { id: 'account', name: '账户设置' },
  { id: 'security', name: '安全设置' },
  { id: 'notification', name: '通知设置' },
  { id: 'display', name: '显示设置' },
  { id: 'trading', name: '交易设置' },
]

// 当前选中的标签
const activeTab = ref('account')

// 账户信息数据
const userInfo = reactive({
  username: 'demoUser',
  email: 'demo@example.com',
  phone: '13800138000',
})

// 密码修改数据
const passwordInfo = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
})

// 安全设置数据
const securitySettings = reactive({
  twoFactorEnabled: false,
  verificationCode: '',
})

// API密钥数据
interface ApiKey {
  id: string
  name: string
  createdAt: string
}

const apiKeys = ref<ApiKey[]>([
  {
    id: '1',
    name: '交易机器人',
    createdAt: '2023-09-15',
  },
])

// 通知设置数据
const notificationSettings = reactive({
  email: {
    transactionConfirmations: true,
    priceAlerts: false,
    systemAnnouncements: true,
  },
  sms: {
    transactionConfirmations: false,
    unusualLogin: true,
    withdrawalAlerts: true,
  },
})

// 显示设置数据
const displaySettings = reactive({
  theme: 'light', // light, dark, auto
  fontSize: 16,
})

// 预览文本
const previewText = '这是字体大小预览文本'

// 交易设置数据
const tradingSettings = reactive({
  defaultAmount: 50, // 百分比
  fastTrade: false,
})

// 默认交易百分比选项
const defaultAmounts = [10, 25, 50, 75, 100]

// 账户设置相关方法
const saveUserInfo = () => {
  // 实现保存用户信息的逻辑
  console.log('保存用户信息:', userInfo)
}

const cancelEdit = () => {
  // 实现取消编辑的逻辑
  console.log('取消编辑')
}

const changePassword = () => {
  // 实现修改密码的逻辑
  console.log('修改密码:', passwordInfo)
}

const resetPasswordForm = () => {
  // 实现重置密码表单的逻辑
  passwordInfo.currentPassword = ''
  passwordInfo.newPassword = ''
  passwordInfo.confirmPassword = ''
}

// 安全设置相关方法
const toggleTwoFactor = () => {
  // 实现切换两步验证的逻辑
  console.log('切换两步验证:', securitySettings.twoFactorEnabled)
}

const verifyTwoFactor = () => {
  // 实现验证两步验证的逻辑
  console.log('验证两步验证:', securitySettings.verificationCode)
}

const showApiKey = (id: string) => {
  // 实现显示API密钥的逻辑
  console.log('显示API密钥:', id)
}

const deleteApiKey = (id: string) => {
  // 实现删除API密钥的逻辑
  console.log('删除API密钥:', id)
  apiKeys.value = apiKeys.value.filter((key) => key.id !== id)
}

const createNewApiKey = () => {
  // 实现创建新API密钥的逻辑
  console.log('创建新API密钥')
  const newKey: ApiKey = {
    id: Date.now().toString(),
    name: `API密钥-${new Date().toLocaleDateString()}`,
    createdAt: new Date().toLocaleDateString(),
  }
  apiKeys.value.push(newKey)
}

// 显示设置相关方法
const setTheme = (theme: string) => {
  // 实现设置主题的逻辑
  console.log('设置主题:', theme)
  displaySettings.theme = theme
}

// 交易设置相关方法
const setDefaultAmount = (amount: number) => {
  // 实现设置默认交易数量的逻辑
  console.log('设置默认交易数量:', amount)
  tradingSettings.defaultAmount = amount
}
</script>

<style scoped lang="scss">
// 确保组件能完全填充容器
.settings-page-container {
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

// 头部样式，参考MenuPage
.menu-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 32px;
  border-bottom: 1px solid #ebeef5;
  background-color: #ffffff;
  flex-shrink: 0;
}

.header-title-container {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.main-title {
  color: #303133;
  font-size: 24px;
  font-weight: 700;
  margin: 0;
}

.sub-title {
  color: #909399;
  font-size: 14px;
  margin: 0;
}

// 设置标签样式
.setting-tabs {
  display: flex;
  gap: 8px;
}

.setting-tab {
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

// 设置内容区域样式
.settings-content {
  flex: 1;
  padding: 24px 32px;
  overflow-y: auto;
  min-height: 0; // 修复flex子元素溢出问题
  background-color: #fafafa;
  box-sizing: border-box;
}

.setting-section {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.section-title {
  color: #303133;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 20px;
}

// 设置卡片样式，参考SwitchPage的卡片样式
.setting-card {
  background: #ffffff;
  border-radius: 28px;
  padding: 24px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: box-shadow 0.3s ease;
}

.setting-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}

.card-title {
  color: #303133;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 20px;
}

// 表单样式
.form-group {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  color: #606266;
  font-size: 14px;
  margin-bottom: 8px;
  font-weight: 500;
}

.form-input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #dcdfe6;
  border-radius: 10px;
  font-size: 14px;
  transition: border-color 0.3s ease;
  box-sizing: border-box;
}

.form-input:focus {
  outline: none;
  border-color: #667eea;
}

.form-actions {
  display: flex;
  gap: 12px;
  margin-top: 24px;
}

// 按钮样式
.btn-primary {
  padding: 10px 24px;
  background: #667eea;
  color: #ffffff;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: background 0.3s ease;
}

.btn-primary:hover {
  background: #5a67d8;
}

.btn-default {
  padding: 10px 24px;
  background: #ffffff;
  color: #606266;
  border: 1px solid #dcdfe6;
  border-radius: 10px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
}

.btn-default:hover {
  border-color: #c0c4cc;
}

.btn-small {
  padding: 6px 12px;
  background: #ffffff;
  color: #606266;
  border: 1px solid #dcdfe6;
  border-radius: 7px;
  cursor: pointer;
  font-size: 12px;
  transition: all 0.3s ease;
}

.btn-small:hover {
  border-color: #c0c4cc;
}

.btn-danger {
  color: #f56c6c;
  border-color: #fbc4c4;
}

.btn-danger:hover {
  background: #fef0f0;
}

// 安全设置样式
.security-option {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
}

.security-option:last-child {
  border-bottom: none;
}

.option-text {
  color: #303133;
  font-size: 14px;
}

.two-factor-details {
  margin-top: 20px;
  padding: 16px;
  background: #f5f7fa;
  border-radius: 16px;
}

.info-text {
  color: #606266;
  font-size: 13px;
  line-height: 1.6;
  margin-bottom: 16px;
}

.qrcode-container {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

.qrcode-placeholder {
  width: 160px;
  height: 160px;
  background: #ffffff;
  border: 1px solid #e4e7ed;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #909399;
  font-size: 12px;
}

// API密钥列表样式
.api-key-list {
  margin-bottom: 16px;
}

.empty-state {
  text-align: center;
  padding: 40px 0;
  color: #909399;
}

.api-key-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: #f5f7fa;
  border-radius: 12px;
  margin-bottom: 12px;
}

.key-info {
  flex: 1;
}

.key-name {
  display: block;
  color: #303133;
  font-size: 14px;
  font-weight: 500;
}

.key-date {
  display: block;
  color: #909399;
  font-size: 12px;
  margin-top: 4px;
}

.key-actions {
  display: flex;
  gap: 8px;
}

// 通知设置样式
.notification-option {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #f0f0f0;
}

.notification-option:last-child {
  border-bottom: none;
}

// 显示设置样式
.theme-options {
  display: flex;
  gap: 24px;
  margin-bottom: 20px;
}

.theme-option {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s ease;
}

.theme-option:hover {
  transform: translateY(-2px);
}

.theme-option.active {
  color: #667eea;
}

.theme-preview {
  width: 80px;
  height: 80px;
  border-radius: 12px;
  margin-bottom: 12px;
  border: 2px solid transparent;
  transition: border-color 0.3s ease;
}

.theme-option.active .theme-preview {
  border-color: #667eea;
}

.light-theme {
  background: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.dark-theme {
  background: #1f2937;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.auto-theme {
  background: linear-gradient(135deg, #ffffff 0%, #1f2937 100%);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.theme-name {
  font-size: 14px;
  color: #606266;
}

.font-size-control {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
}

.size-label {
  color: #606266;
}

.size-label.small {
  font-size: 12px;
}

.size-label.large {
  font-size: 20px;
}

.size-slider {
  flex: 1;
  height: 4px;
  border-radius: 2px;
  background: #e4e7ed;
  outline: none;
  appearance: none;
}

.size-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #667eea;
  cursor: pointer;
}

.size-slider::-moz-range-thumb {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #667eea;
  cursor: pointer;
  border: none;
}

.preview-text {
  color: #303133;
  line-height: 1.6;
  padding: 16px;
  background: #f5f7fa;
  border-radius: 12px;
}

// 交易设置样式
.default-amount-options {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.amount-button {
  padding: 8px 16px;
  background: #ffffff;
  color: #606266;
  border: 1px solid #dcdfe6;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
}

.amount-button:hover {
  border-color: #667eea;
  color: #667eea;
}

.amount-button.active {
  background: #667eea;
  color: #ffffff;
  border-color: #667eea;
}

.fee-option {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #f0f0f0;
}

.fee-info {
  margin: 16px 0;
  line-height: 1.8;
}

.fee-rate {
  color: #67c23a;
  font-weight: 500;
}

.fee-rate.fast {
  color: #e6a23c;
}

// 响应式设计
@media (max-width: 768px) {
  .menu-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    padding: 16px;
  }

  .setting-tabs {
    width: 100%;
    overflow-x: auto;
    justify-content: flex-start;
  }

  .main-title {
    font-size: 20px;
  }

  .settings-content {
    padding: 16px;
  }

  .theme-options {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .default-amount-options {
    justify-content: center;
  }

  .api-key-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .key-actions {
    width: 100%;
    justify-content: flex-end;
  }
}
</style>
