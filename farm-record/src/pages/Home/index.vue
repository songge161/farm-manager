<script setup lang="ts">
import Header from "./Header.vue";
import Card from "./Card.vue";
import Notice from "./Notice.vue";
import Note from "./Note.vue";

import { onLoad, onShow ,onHide} from "@dcloudio/uni-app";
import { ref ,computed} from "vue";
import { useAppStore } from '@/stores/appStore'
const appStore = useAppStore()
const iflog =computed(()=>appStore.isLoggedIn) 
// const checkLogin = () => {
//   // 检查登录状态的逻辑

//   // 这里可以根据实际情况进行修改，比如检查本地存储的登录状态
//   const isLoggedIn = uni.getStorageSync('isLoggedIn') || false;
//   if (isLoggedIn) {
//     iflog.value = true;
//   } else {
//     iflog.value = false;
//   }
// };

const goLogin = () => {
  uni.setStorageSync('isLoggedIn', true) // 假设登录成功
  appStore.setLogin(true)
  //页面刷新
  uni.reLaunch({
    url: '/pages/Home/index', // 替换为你的登录页面路径 
  })

};

onLoad(() => {

});
onShow(() => {
  //重新设置iflog
  console.log("HOME onShow");

  console.log("home" + iflog.value);

});
onHide(() => {
  console.log("HOME onHide");
  
})
</script>

<template>

  <view class="header-container" v-if="!iflog">
    <view class="greeting">您好，欢迎使用农事记录小程序</view>
    <view class="tips">登录后可查看地块、天气和操作记录</view>
    <button class="login-btn" @click="goLogin">立即登录</button>
  </view>

  <view class="indexContainer">
   
    <Header v-if="iflog" />
    <view class="main">
      <view class="title">常用工具</view>
      <Card :iflog="iflog"></Card>
      <view class="title">通知</view>
      <Notice :iflog="iflog" />

      <view class="title">操作记录</view>
      <view v-if="iflog">
        <Note />
      </view>

    </view>
  </view>
</template>

<style scoped lang="scss">
.header-container {
  background-color: #5db524;
  color: #fff;
  padding: 40rpx 30rpx;
  border-bottom-left-radius: 20rpx;
  border-bottom-right-radius: 20rpx;



  .greeting {
    font-size: 32rpx;
    font-weight: bold;
    margin-bottom: 10rpx;
  }

  .tips {
    font-size: 26rpx;
    color: #eaffea;
    margin-bottom: 30rpx;
  }

  .login-btn {
    background-color: #ffffff;
    color: #5db524;
    padding: 16rpx 30rpx;
    border-radius: 40rpx;
    font-size: 28rpx;
    font-weight: 600;
    border: none;
  }
}

.indexContainer {
  display: flex;
  flex-direction: column;

  .main {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 30rpx;

    .title {
      position: relative;
      padding-left: 10px;
      font-size: 15px;
      font-weight: 900;

      &::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        width: 3px;
        height: 15px;
        background-color: #5db524;
      }
    }
  }
}
</style>
