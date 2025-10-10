<template>
  <div>
    <div class="chart-container" ref="chartDom"></div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { onMounted, onUnmounted, ref } from "vue";

type EChartsOption = echarts.EChartsOption;
const chartDom = ref(null)!;
let myChart: any = null;

onMounted(() => {
  myChart = echarts.init(chartDom.value, null, {
    renderer: "svg",
  });

  var option: EChartsOption;

  option = {
    title: [
      {
        text: "Tangential Polar Bar Label Position (middle)",
      },
    ],
    polar: {
      radius: [30, "80%"],
    },
    angleAxis: {
      max: 4,
      startAngle: 75,
    },
    radiusAxis: {
      type: "category",
      data: ["a", "b", "c", "d"],
    },
    tooltip: {},
    series: {
      type: "bar",
      data: [2, 1.2, 2.4, 3.6],
      coordinateSystem: "polar",
      label: {
        show: true,
        position: "middle", // or 'start', 'insideStart', 'end', 'insideEnd'
        formatter: "{b}: {c}",
      },
    },
  };

  option && myChart.setOption(option);

  window.addEventListener("resize", myChart.resize as any);
});

onUnmounted(() => {
  window.removeEventListener("resize", myChart.resize as any);
  // 销毁图表实例
  myChart.dispose();
});
</script>

<style scoped lang="scss">
.chart-container {
  // background-color: antiquewhite;
  width: 425px * 1.8;
  height: 300px * 1.8;
  // transform: scale(0.7);
  transform-origin: 0 0;
}
</style>
