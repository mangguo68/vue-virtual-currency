<template>
  <div>
    <el-row class="p-3 pt-0 pb-0">
      <el-col :span="8" class="p-3"
        ><div class="rounded-3xl p-3 card-container">
          <AspectRatioContainer :content-width="765" :content-height="540">
            <BarPolarChart />
          </AspectRatioContainer>
        </div>
      </el-col>
      <el-col :span="8" class="p-3"
        ><div class="rounded-3xl p-3 card-container">
          <AspectRatioContainer :content-width="765" :content-height="540">
            <Candlestick2015Chart />
          </AspectRatioContainer>
        </div>
      </el-col>
      <el-col :span="8" class="p-3"
        ><div class="rounded-3xl p-3 card-container">
          <AspectRatioContainer :content-width="765" :content-height="540">
            <CandlestickBrushChart />
          </AspectRatioContainer>
        </div>
      </el-col>
    </el-row>
    <el-row class="p-3 pt-0 pb-0">
      <el-col :span="8" class="p-3"
        ><div class="rounded-3xl p-3 card-container">
          <AspectRatioContainer :content-width="765" :content-height="540">
            <CandlestickChart />
          </AspectRatioContainer>
        </div>
      </el-col>
      <el-col :span="8" class="p-3"
        ><div class="rounded-3xl p-3 card-container">
          <AspectRatioContainer :content-width="765" :content-height="540">
            <DatasetLinkChart />
          </AspectRatioContainer>
        </div>
      </el-col>
      <el-col :span="8" class="p-3"
        ><div class="rounded-3xl p-3 card-container">
          <AspectRatioContainer :content-width="765" :content-height="540">
            <RadarMultipleChart />
          </AspectRatioContainer>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import BarPolarChart from '../charts/BarPolarChart.vue'
import Candlestick2015Chart from '../charts/Candlestick2015Chart.vue'
import CandlestickBrushChart from '../charts/CandlestickBrushChart.vue'
import CandlestickChart from '../charts/CandlestickChart.vue'
import DatasetLinkChart from '../charts/DatasetLinkChart.vue'
import RadarMultipleChart from '../charts/RadarMultipleChart.vue'
import AspectRatioContainer from './AspectRatioContainer.vue'
</script>

<style scoped>
.card-container {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.04);
  background-color: #fff;
}
</style>
