<script setup lang="ts">
import { ref } from "vue";
   import { onLoad } from "@dcloudio/uni-app";
  //获取props
const props = defineProps({
    iflog: {
      type: Boolean,
      default: false,
    },
  });
  console.log(props.iflog);
  //弹出提示框
const showToast = (message: string) => {
    uni.showToast({
      title: message,
      icon: "none",
    });
  };
  const cards = [
  {
    src:"Create",
    title: "创建作物",
    desc: "为该地块创建一个新的作物记录",
    icon: "plusempty",
    bgColor: "#07c160",
  },
  {
    src:"RecordTable",
    title: "作物记录",
    desc: "选择已记录下的作物进行记录",
    icon: "calendar",
    bgColor: "#2979ff",
  },
  {
    src:"Weather",
    title: "当地气候",
    desc: "实时天气信息",
    icon: "location",
    bgColor: "#ff9800",
  },
  {
    src:"Remind",
    title: "记录提醒",
    desc: "即使提醒对地块进行记录操作",
    icon: "notification",
    bgColor: "#f44336",
  },
];

const goToPage = (src:string) => {
  console.log(123);
  console.log(src);
  
  console.log(`/pages/`+src+`/index`);
  uni.navigateTo({
    url: `/pages/`+src+`/index`,
   
  });
};
</script>

<template>
  <view class="CardContainer" >
    <view
      v-for="card in cards" @click="iflog?goToPage(card.src):showToast('请先登录')"
      :key="card.title"
      class="card"
      :style="{ backgroundColor: card.bgColor }"
    >
      <view class="left">
        <view class="title">{{ card.title }}</view>
        <view class="desc">{{ card.desc }}</view>
      </view>
      <view class="right">
        <view class="icon">
          <uni-icons :type="card.icon" size="20" color="white"></uni-icons>
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.CardContainer {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 20rpx;
  .card {
    display: flex;
    gap: 30rpx;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 4px;
    padding: 30rpx;
    border-radius: 20rpx;
    .left {
      display: flex;
      flex-direction: column;
      gap: 15rpx;
      .title {
        font-size: 30rpx;
        color: white;
      }
      .desc {
        font-size: 20rpx;
        line-height: 1.5;
        color: rgba(255, 255, 255, 0.8);
      }
    }
    .right {
      .icon {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(255, 255, 255, 0.2);
        border-radius: 50%;
        padding: 10px;
        aspect-ratio: 1;
      }
    }
  }
}
</style>
