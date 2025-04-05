<script setup lang="ts">
import { ref } from "vue";
import Page1 from "./Page1/index.vue";
import Page2 from "./Page2/index.vue";
const items = ["我的记录", "区块记录"];
const current = ref(0);

const onClickItem = (e: { currentIndex: number }) => {
  if (current.value !== e.currentIndex) {
    current.value = e.currentIndex;
  }
};
</script>

<template>
  <view class="tabContainer">
    <uni-segmented-control
      :current="current"
      :values="items"
      @clickItem="onClickItem"
      styleType="text"
      activeColor="#4cd964"
    ></uni-segmented-control>
    <view class="content">
      <view v-show="current === 0">
        <Page1 />
      </view>
      <view v-show="current === 1">
        <Page2 />
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.tabContainer {
  display: flex;
  flex-direction: column;
}
</style>
