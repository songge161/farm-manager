<script setup lang="ts">
import { ref, computed } from "vue";

const adminName = ref("张三");
const selectedBlock = ref("A-1号地块");
const blockList = ref([
  { id: 1, name: "A-1号地块" },
  { id: 2, name: "A-2号地块" },
  { id: 3, name: "B-1号地块" },
]);

// 格式化日期
const formattedDate = computed(() => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const weekDays = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
  const weekDay = weekDays[date.getDay()];
  return `${year}年${month}月${day}日 ${weekDay}`;
});

const weather = ref({
  temperature: "26℃",
  icon: "☀️",
  description: "晴天",
});

const handleBlockChange = (e: any) => {
  selectedBlock.value = blockList.value[e.detail.value].name;
};
</script>

<template>
  <view  class="HeaderContainer">
    <view class="header-top">
      <view class="left-content" >
        <view class="welcome">
          <text class="greeting">您好，</text>
          <text class="admin-name">{{ adminName }}</text>
        </view>
        <view class="sub-info">
          <text class="date-info">{{ formattedDate }}</text>
          <view class="weather-info">
            <text class="weather-icon">{{ weather.icon }}</text>
            <text class="temperature">{{ weather.temperature }}</text>
            <text class="description">{{ weather.description }}</text>
          </view>
        </view>
      </view>
    </view>

    <view class="block-selector">
      <text class="label">当前地块</text>
      <picker
        mode="selector"
        :range="blockList"
        range-key="name"
        @change="handleBlockChange"
        class="picker"
      >
        <view class="picker-value">
          <text>{{ selectedBlock }}</text>
          <view class="picker-right">
            <text class="arrow">›</text>
          </view>
        </view>
      </picker>
    </view>
  </view>
</template>

<style scoped lang="scss">
.HeaderContainer {
  display: flex;
  flex-direction: column;
  height: auto;
  width: 100vw;
  background: linear-gradient(to top, #6dc030 0%, #5db524 100%);
  color: #fff;
  padding: 40rpx 30rpx;
  box-sizing: border-box;
  position: relative;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 40rpx;
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0),
      rgba(0, 0, 0, 0.05)
    );
  }

  .header-top {
    margin-bottom: 40rpx;

    .left-content {
      .welcome {
        margin-bottom: 16rpx;
        font-size: 36rpx;

        .greeting {
          font-weight: 300;
        }

        .admin-name {
          font-weight: 600;
        }
      }

      .sub-info {
        display: flex;
        align-items: center;
        font-size: 26rpx;
        opacity: 0.9;

        .date-info {
          margin-right: 20rpx;
        }

        .weather-info {
          display: flex;
          align-items: center;

          .weather-icon {
            font-size: 32rpx;
            margin-right: 8rpx;
          }

          .temperature {
            margin-right: 8rpx;
          }

          .description {
            font-size: 24rpx;
          }
        }
      }
    }
  }

  .block-selector {
    display: flex;
    align-items: center;
    background: rgba(255, 255, 255, 0.15);
    padding: 24rpx;
    border-radius: 16rpx;
    backdrop-filter: blur(10px);

    .label {
      font-size: 28rpx;
      margin-right: 20rpx;
    }

    .picker {
      flex: 1;

      .picker-value {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 32rpx;
        font-weight: 500;

        .picker-right {
          display: flex;
          align-items: center;

          .block-area {
            font-size: 24rpx;
            opacity: 0.8;
            margin-right: 12rpx;
          }

          .arrow {
            font-size: 40rpx;
            transform: rotate(90deg);
          }
        }
      }
    }
  }
}
</style>
