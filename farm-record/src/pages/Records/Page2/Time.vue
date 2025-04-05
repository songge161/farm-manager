<script setup lang="ts">
import { ref } from "vue";

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth() + 1;
const selectedDate = ref([currentYear, currentMonth]);

const years = Array.from({ length: 10 }, (_, i) => {
  const year = new Date().getFullYear() - i;
  return {
    text: `${year}年`,
    value: year,
    children: Array.from({ length: 12 }, (_, j) => ({
      text: `${j + 1}月`,
      value: j + 1,
    })),
  };
});

const emit = defineEmits(["update:date"]);

const handleDateChange = (e: any) => {
  if (e.detail.value.length === 2) {
    selectedDate.value = e.detail.value;
    emit("update:date", e.detail.value);
  }
  console.log("Selected date:", selectedDate.value);
  
};

// 添加记录数量属性
const props = defineProps({
  recordCount: {
    type: Number,
    default: 0,
  },
});
</script>

<template>
  <view class="header">
    <uni-data-picker
      class="date-picker"
      v-model="selectedDate"
      :localdata="years"
      :clear-icon="false"
      popup-title="选择年月"
      @change="handleDateChange"
    />
    <view class="record-count">共{{ recordCount }}条记录</view>
  </view>
</template>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx 30rpx;
  background-color: #ffffff;
  border-radius: 12rpx;

  .date-picker {
    flex: 1;
  }

  .record-count {
    margin-left: 30rpx;
    color: #666666;
    font-size: 28rpx;
  }
}
</style>
