<template>
  <div class="time-selector">
    <button class="time-btn" :class="{ active: selectedTime === 'day' }" @click="selectTime('day')">
      日
    </button>
    <button
      class="time-btn"
      :class="{ active: selectedTime === 'week' }"
      @click="selectTime('week')"
    >
      周
    </button>
    <button
      class="time-btn"
      :class="{ active: selectedTime === 'month' }"
      @click="selectTime('month')"
    >
      月
    </button>
    <button
      class="time-btn"
      :class="{ active: selectedTime === 'year' }"
      @click="selectTime('year')"
    >
      年
    </button>
    <button class="calendar-btn" @click="openCalendar">
      <el-icon><Calendar /></el-icon>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { Calendar } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

// 定义组件的props
interface TimeSelectorProps {
  defaultTime?: 'day' | 'week' | 'month' | 'year'
}

// 定义组件的emits
interface TimeSelectorEmits {
  (e: 'time-change', time: 'day' | 'week' | 'month' | 'year'): void
  (e: 'calendar-open'): void
}

const props = withDefaults(defineProps<TimeSelectorProps>(), {
  defaultTime: 'day',
})

const emit = defineEmits<TimeSelectorEmits>()

// 时间选择状态管理
const selectedTime = ref<'day' | 'week' | 'month' | 'year'>(props.defaultTime)

// 监听props变化，更新选中状态
watch(
  () => props.defaultTime,
  (newTime) => {
    if (newTime) {
      selectedTime.value = newTime
    }
  },
)

// 选择时间范围的方法
const selectTime = (time: 'day' | 'week' | 'month' | 'year') => {
  selectedTime.value = time

  // 触发时间变化事件
  emit('time-change', time)

  // 显示操作反馈
  switch (time) {
    case 'day':
      ElMessage.info('已选择日视图')
      break
    case 'week':
      ElMessage.info('已选择周视图')
      break
    case 'month':
      ElMessage.info('已选择月视图')
      break
    case 'year':
      ElMessage.info('已选择年视图')
      break
  }
}

// 打开日历的方法
const openCalendar = () => {
  // 触发日历打开事件
  emit('calendar-open')
  ElMessage.info('打开日历选择器')
}
</script>

<style scoped>
/* 时间选择器样式 */
.time-selector {
  display: flex;
  align-items: center;
  gap: 16px;
}

/* 时间按钮样式 */
.time-btn {
  padding: 6px 16px;
  border: none;
  background-color: transparent;
  color: #909399;
  font-size: 14px;
  cursor: pointer;
  border-radius: 10px;
  transition: all 0.3s ease;
}

.time-btn:hover {
  background-color: #f5f7fa;
  color: #303133;
}

.time-btn.active {
  background-color: #f5f7fa;
  color: #303133;
  font-weight: bold;
}

/* 日历按钮样式 */
.calendar-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: none;
  background-color: #f5f7fa;
  color: #303133;
  border-radius: 10px;
  cursor: pointer;
  font-size: 18px;
}

.calendar-btn:hover {
  background-color: #e4e7ed;
}

.calendar-btn .el-icon {
  font-size: 18px;
}
</style>