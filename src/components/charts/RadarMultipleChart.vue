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
    title: {
      text: "Multiple Radar",
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      left: "center",
      data: [
        "A Software",
        "A Phone",
        "Another Phone",
        "Precipitation",
        "Evaporation",
      ],
    },
    radar: [
      {
        indicator: [
          { name: "Brand", max: 100 },
          { name: "Content", max: 100 },
          { name: "Usability", max: 100 },
          { name: "Function", max: 100 },
        ],
        center: ["25%", "40%"],
        radius: 80,
      },
      {
        indicator: [
          { name: "Look", max: 100 },
          { name: "Photo", max: 100 },
          { name: "System", max: 100 },
          { name: "Performance", max: 100 },
          { name: "Screen", max: 100 },
        ],
        radius: 80,
        center: ["50%", "60%"],
      },
      {
        indicator: (function () {
          var res = [];
          for (var i = 1; i <= 12; i++) {
            res.push({ name: i + "月", max: 100 });
          }
          return res;
        })(),
        center: ["75%", "40%"],
        radius: 80,
      },
    ],
    series: [
      {
        type: "radar",
        tooltip: {
          trigger: "item",
        },
        areaStyle: {},
        data: [
          {
            value: [60, 73, 85, 40],
            name: "A Software",
          },
        ],
      },
      {
        type: "radar",
        radarIndex: 1,
        areaStyle: {},
        data: [
          {
            value: [85, 90, 90, 95, 95],
            name: "A Phone",
          },
          {
            value: [95, 80, 95, 90, 93],
            name: "Another Phone",
          },
        ],
      },
      {
        type: "radar",
        radarIndex: 2,
        areaStyle: {},
        data: [
          {
            name: "Precipitation",
            value: [
              2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 75.6, 82.2, 48.7, 18.8, 6.0, 2.3,
            ],
          },
          {
            name: "Evaporation",
            value: [
              2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 35.6, 62.2, 32.6, 20.0, 6.4, 3.3,
            ],
          },
        ],
      },
    ],
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
