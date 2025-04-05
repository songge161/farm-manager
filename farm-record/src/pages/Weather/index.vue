<template>
  <view class="weather-container">
    <view class="search-bar">
      <input v-model="city" placeholder="请输入城市名" />
      <!-- <button @click="getWeather">查询</button> -->
    </view>

    <view v-if="weatherData" class="weather-info">
      <text class="city">{{ weatherData.location.name }}</text>
      <text class="text">{{ weatherData.now.text }}</text>
      <text class="temperature">{{ weatherData.now.temperature }}°C</text>
      <text class="humidity">湿度: {{ weatherData.now.humidity }}%</text>
      <text class="wind">风力: {{ weatherData.now.wind_class }}级</text>
    </view>

    <view v-else class="placeholder">
      <text>请输入城市名查询天气</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onMounted } from 'vue'

const API_KEY = "S9vsQyNoexWUItyi5"
const API_URL = "https://api.seniverse.com/v3/weather/now.json" // 使用V3 DEMO API 先跑通

const city = ref('北京') // 默认城市
const weatherData = ref<any>(null)

// const getWeather = async () => {
//   try {
//     const res = await uni.request({
//       url: API_URL,
//       method: 'GET',
//       data: {
//         key: API_KEY,
//         location: city.value,
//         language: 'zh-Hans',
//         unit: 'c'
//       }
//     })
//     console.log(res);
    
//     if (res.statusCode === 200 && res.data.results) {
//       weatherData.value = res.data.results[0]
//     } else {
//       uni.showToast({ title: '获取天气失败', icon: 'none' })
//     }
//   } catch (err) {
//     console.error(err)
//     uni.showToast({ title: '请求错误', icon: 'none' })
//   }
// }

onMounted(() => {
  // getWeather()
})
</script>

<style scoped lang="scss">
.weather-container {
  padding: 40rpx;

  .search-bar {
    display: flex;
    gap: 20rpx;
    margin-bottom: 30rpx;

    input {
      flex: 1;
      border: 1rpx solid #ccc;
      border-radius: 8rpx;
      padding: 20rpx;
    }

    button {
      background-color: #007aff;
      color: white;
      border: none;
      border-radius: 8rpx;
      padding: 20rpx 30rpx;
    }
  }

  .weather-info {
    display: flex;
    flex-direction: column;
    gap: 10rpx;

    .city {
      font-size: 36rpx;
      font-weight: bold;
    }

    .text {
      font-size: 32rpx;
      color: #666;
    }

    .temperature {
      font-size: 60rpx;
      color: #ff9800;
    }

    .humidity,
    .wind {
      font-size: 28rpx;
      color: #999;
    }
  }

  .placeholder {
    text-align: center;
    color: #aaa;
    font-size: 28rpx;
    margin-top: 100rpx;
  }
}
</style>
