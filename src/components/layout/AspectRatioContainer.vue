<template>
  <div class="aspect-container" ref="containerRef">
    <div class="aspect-ratio-holder" :style="{ paddingTop: paddingTop }">
      <div class="content-scaler" ref="contentScalerRef">
        <div
          class="content-area"
          :style="{
            width: contentWidth + 'px',
            height: contentHeight + 'px',
          }"
        >
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from "vue";

// 类型定义
interface Props {
  contentWidth: number;
  contentHeight: number;
}

interface ScaleUpdateEvent {
  scale: number;
  containerWidth: number;
  containerHeight: number;
  ratio: number;
}

interface SimplifiedRatio {
  width: number;
  height: number;
}

// Props 定义
const props = withDefaults(defineProps<Props>(), {
  contentWidth: 1280,
  contentHeight: 720,
});

// 定义 emits
const emit = defineEmits<{
  (e: "scale-update", data: ScaleUpdateEvent): void;
}>();

// 响应式数据
const scale = ref<number>(1);
const containerWidth = ref<number>(0);
const containerHeight = ref<number>(0);
const containerRef = ref<HTMLDivElement | null>(null);
const contentScalerRef = ref<HTMLDivElement | null>(null);

// 计算属性
const ratioValue = computed((): number => {
  if (props.contentHeight === 0) return 16 / 9;
  return props.contentWidth / props.contentHeight;
});

const paddingTop = computed((): string => {
  return (1 / ratioValue.value) * 100 + "%";
});

const calculatedRatio = computed((): string => {
  const simplified = simplifyRatio(props.contentWidth, props.contentHeight);
  return `${simplified.width}:${simplified.height}`;
});

// 方法
const simplifyRatio = (width: number, height: number): SimplifiedRatio => {
  const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);
  const divisor = gcd(width, height);
  return {
    width: width / divisor,
    height: height / divisor,
  };
};

const updateScale = (): void => {
  nextTick(() => {
    if (!containerRef.value || !contentScalerRef.value) return;

    const containerRect = containerRef.value.getBoundingClientRect();
    const containerWidthValue = containerRect.width;
    const containerHeightValue = containerRect.height;

    // 计算缩放比例
    const scaleX = containerWidthValue / props.contentWidth;
    const scaleY = containerHeightValue / props.contentHeight;
    const scaleValue = Math.min(scaleX, scaleY);

    // 应用缩放
    contentScalerRef.value.style.transform = `scale(${scaleValue})`;
    contentScalerRef.value.style.width = props.contentWidth + "px";
    contentScalerRef.value.style.height = props.contentHeight + "px";

    // 更新响应式数据
    scale.value = scaleValue;
    containerWidth.value = Math.round(containerWidthValue);
    containerHeight.value = Math.round(containerHeightValue);

    // 触发事件
    emit("scale-update", {
      scale: scaleValue,
      containerWidth: containerWidth.value,
      containerHeight: containerHeight.value,
      ratio: ratioValue.value,
    });
  });
};

const handleResize = (): void => {
  updateScale();
};

// 生命周期
onMounted(() => {
  updateScale();
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});

// 监听 props 变化
watch(
  () => [props.contentWidth, props.contentHeight],
  () => {
    updateScale();
  }
);

// 暴露给父组件的属性
defineExpose({
  scale,
  containerWidth,
  containerHeight,
  updateScale,
});
</script>

<style scoped>
.aspect-container {
  width: 100%;
  position: relative;
  /* background: #ecf0f1; */
  /* border-radius: 8px; */
  overflow: hidden;
  /* box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1); */
}

.aspect-ratio-holder {
  width: 100%;
  position: relative;
}

.content-scaler {
  position: absolute;
  top: 0;
  left: 0;
  transform-origin: 0 0;
}

.content-area {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* color: white; */
  /* font-size: 18px; */
  /* border: 2px dashed rgba(255, 255, 255, 0.5); */
  box-sizing: border-box;
  /* background: linear-gradient(45deg, #3498db, #9b59b6); */
}
</style>
