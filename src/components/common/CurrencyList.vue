<template>
  <div class="currency-list-container">
    <!-- 固定的加号按钮 -->
    <button class="add-currency-btn" @click="addCurrency">
      <el-icon><Plus /></el-icon>
    </button>

    <!-- 横向滚动的货币列表 -->
    <div class="currency-list-wrapper">
      <Swiper
        ref="currencySwiperRef"
        :slidesPerView="'auto'"
        :spaceBetween="12"
        :scrollbar="{ hide: false }"
        :modules="[Scrollbar]"
        class="currency-swiper"
      >
        <SwiperSlide v-for="currency in currencies" :key="currency.id" class="swiper-slide">
          <div
            class="currency-card"
            :class="{ active: selectedCurrency === currency.id }"
            @click="selectCurrency(currency.id)"
          >
            <!-- 货币图标 -->
            <div class="currency-icon">
              <el-image
                :src="currency.icon"
                :alt="currency.name"
                :placeholder="'加载中...'"
                fit="cover"
              >
                <template #error>
                  <el-icon class="image-error-icon"><PictureRounded /></el-icon>
                </template>
              </el-image>
            </div>

            <!-- 货币信息 -->
            <div class="currency-info">
              <div class="currency-amount">
                <span class="amount">{{ currency.amount }}</span>
                <span class="unit">{{ currency.unit }}</span>
              </div>
              <div
                class="currency-change"
                :class="{ positive: currency.isPositive, negative: !currency.isPositive }"
              >
                {{ currency.change }}
                <!-- MicroEchart,与增幅处于同一行，修改其大小不改其宽高比，使得MicroEchart能融洽的融入-->
                <MicroEchart
                  :data="generateChartData(currency.change, currency.isPositive)"
                  :color="currency.isPositive ? '#f56c6c' : '#67c23a'"
                  style="width: 50px; height: 16px; margin-left: 6px"
                />
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Plus, PictureRounded } from '@element-plus/icons-vue'
import { ElMessage, ElImage } from 'element-plus'
// 导入Swiper相关组件
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/scrollbar'
import { Scrollbar } from 'swiper/modules'
// 导入MicroEchart组件
import MicroEchart from '../charts/MicroChart.vue'

// 声明Swiper可能触发的事件，避免Vue警告
const emit = defineEmits([
  '_freeModeStaticRelease',
  'freeModeStaticRelease',
  'touchStart',
  'touchMove',
  'touchEnd',
  'slideChangeTransitionStart',
  'slideChangeTransitionEnd',
])

// 定义货币类型
interface Currency {
  id: string
  name: string
  unit: string
  amount: string
  change: string
  isPositive: boolean
  icon: string
}

// 货币数据
const currencies: Currency[] = [
  {
    id: 'btc',
    name: '比特币',
    unit: 'BTC',
    amount: '32.234',
    change: '-39.60%',
    isPositive: false,
    icon: 'https://ts1.tc.mm.bing.net/th/id/OIP-C.KbnfuLZD0JFaGcntvJJwEAHaHa?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3',
  },
  {
    id: 'eth',
    name: '以太坊',
    unit: 'ETH',
    amount: '156.789',
    change: '+2.30%',
    isPositive: true,
    icon: 'https://logowik.com/content/uploads/images/ethereum-eth7803.logowik.com.webp',
  },
  {
    id: 'usdt',
    name: '泰达币',
    unit: 'USDT',
    amount: '10000.00',
    change: '+0.10%',
    isPositive: true,
    icon: 'https://ts2.tc.mm.bing.net/th/id/OIP-C.6ooMqpI_dz_7KGo6LSwJKwHaHa?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3',
  },
  {
    id: 'sol',
    name: '索拉纳',
    unit: 'SOL',
    amount: '245.67',
    change: '-5.20%',
    isPositive: false,
    icon: 'https://ts1.tc.mm.bing.net/th/id/OIP-C.k8GCuX2vRi0IPbzBxhMo7AHaHa?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3',
  },
  {
    id: 'doge',
    name: '狗狗币',
    unit: 'DOGE',
    amount: '12345.67',
    change: '+12.50%',
    isPositive: true,
    icon: 'https://ts2.tc.mm.bing.net/th/id/OIP-C.PsoEskqVHz25fkl2adZn1QAAAA?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3',
  },
]

// 当前选中的货币
const selectedCurrency = ref<string>('btc')

// 选择货币
const selectCurrency = (currencyId: string) => {
  selectedCurrency.value = currencyId
  const selected = currencies.find((c) => c.id === currencyId)
  if (selected) {
    ElMessage.info(`已选择${selected.name}`)
  }
}

// 添加货币
const addCurrency = () => {
  ElMessage.info('添加新货币')
}

// 获取Swiper组件的引用
const currencySwiperRef = ref<any>(null)

// 生成图表数据
const generateChartData = (change: string, isPositive: boolean) => {
  // 从change字符串中提取数值（去掉%和符号）
  const changeValue = parseFloat(change.replace(/[%+\-]/g, ''))
  const baseValue = 100
  const dataPoints = 20
  const data = []

  // 根据涨跌趋势生成数据
  const trend = isPositive ? 1 : -1
  const volatility = changeValue / 100 // 波动幅度

  for (let i = 0; i < dataPoints; i++) {
    // 添加随机波动，但整体呈现趋势
    const randomFactor = (Math.random() - 0.5) * 0.1
    const trendFactor = (i / dataPoints) * volatility * trend
    const value = baseValue + (trendFactor + randomFactor) * baseValue
    data.push(Math.round(value * 100) / 100)
  }

  return data
}
</script>

<style scoped>
/* 货币列表容器 */
.currency-list-container {
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 64px;
  position: relative;
}

/* 加号按钮样式 */
.add-currency-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border: none;
  background-color: #1890ff;
  color: white;
  border-radius: 50%;
  cursor: pointer;
  font-size: 20px;
  box-shadow: 0 2px 8px rgba(24, 144, 255, 0.3);
  margin-right: 16px;
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.add-currency-btn:hover {
  background-color: #40a9ff;
  box-shadow: 0 4px 12px rgba(24, 144, 255, 0.4);
}

/* 货币列表滚动容器 */
.currency-list-wrapper {
  flex: 1;
  padding: 8px 16px; /* 增加左右内边距，为阴影效果留出空间 */
  overflow: hidden; /* 隐藏溢出，让Swiper处理滚动 */
}

/* Swiper容器样式 */
.currency-swiper {
  width: 100%;
  height: 100%;
  overflow: visible; /* 允许内容溢出，显示阴影 */
}

/* 隐藏Swiper横向滚动条 */
:deep(.swiper-scrollbar) {
  display: none;
}

/* Swiper滑动项样式 */
.swiper-slide {
  width: auto; /* 自适应内容宽度 */
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px 0; /* 增加上下内边距，为阴影留出空间 */
}

/* 货币卡片样式 */
.currency-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  background-color: white;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  flex-shrink: 0;
  min-width: 180px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

/* 选中状态的货币卡片 */
.currency-card.active {
  background-color: #000000;
  box-shadow: none;
}

.currency-card:hover:not(.active) {
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transform: translateY(-1px);
}

/* 货币图标 */
.currency-icon {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  overflow: hidden;
  background-color: #f5f7fa;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

/* 确保el-image中的内容居中显示 */
.currency-icon .el-image {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 错误状态的图片图标样式 */
.image-error-icon {
  color: #c0c4cc;
  font-size: 24px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.currency-icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* 货币信息 */
.currency-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

/* 货币数量 */
.currency-amount {
  display: flex;
  align-items: baseline;
  gap: 4px;
}

.currency-amount .amount {
  font-size: 16px;
  font-weight: bold;
  color: #303133;
  user-select: none; /* 禁止选中 */
}

.currency-card.active .currency-amount .amount {
  color: white;
}

.currency-amount .unit {
  font-size: 14px;
  color: #909399;
  user-select: none; /* 禁止选中 */
}

.currency-card.active .currency-amount .unit {
  color: rgba(255, 255, 255, 0.8);
}

/* 货币涨跌幅 */
.currency-change {
  font-size: 14px;
  font-weight: 500;
  user-select: none; /* 禁止选中 */
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
}

/* 上涨为红色（中国股市习惯）*/
.currency-change.positive {
  color: #f56c6c;
}

.currency-card.active .currency-change.positive {
  color: #f56c6c;
}

/* 下跌为绿色（中国股市习惯）*/
.currency-change.negative {
  color: #67c23a;
}

.currency-card.active .currency-change.negative {
  color: #67c23a;
}
</style>
