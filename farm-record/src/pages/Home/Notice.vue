<script setup lang="ts">
const props = defineProps({
    iflog: {
      type: Boolean,
      default: false,
    },
  });

const mentionList = [
  {
    mid:1,
    uid: 2,
    time: "2023-04-13 ", 
    content:"即将到来的天气将会影响您的地块"
  },
  {
    mid:2,
    uid: 2,
    time: "2023-04-13 ", 
    content:"即将到来的天气将会影响您的地块"
  } 
]
const noticeList ="您有3条提醒，①即将到来的天气将会影响您的地块，②请明天及时进行A2记录操作...";
const getMore = () => {
  uni.showToast({
    title: "点击了查看更多",
    icon: "none",
  });
};
</script>

<template>
  <view class="NoticeContainer">
    <uni-notice-bar 
      v-if="iflog"
      show-get-more
      
      show-icon
      :text="noticeList"
      :scrollable="true"
      :single="true"
      color="#2c5530"
      background-color="#e8f5e9"
      moreColor="#5db524"
      @getmore="getMore"
    />
  </view>
</template>

<style scoped lang="scss">
.NoticeContainer {
  width: 100%;
  height: auto;
  border-radius: 15px;
}
</style>
