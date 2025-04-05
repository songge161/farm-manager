<script setup lang="ts">
import { ref } from "vue";
import Time from "./Time.vue";
import Card from "./Card.vue";

const selectedDate = ref([new Date().getFullYear(), new Date().getMonth() + 1]);
const recordCount = ref(3);
</script>

<template>
  <view class="indexContainer">
    <view class="content">
      <Time v-model:date="selectedDate" :record-count="recordCount" />
      <Card />
    </view>
  </view>
</template>

<style scoped lang="scss">
.indexContainer {
  display: flex;
  width: 100%;
  min-height: 100vh;
  background-color: #f5f5f5;

  .content {
    width: 100%;
  }
}
</style>
