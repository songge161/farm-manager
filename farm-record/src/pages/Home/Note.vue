<script setup lang="ts">
const noteList = [
  {
    id: 1,
    image: "https://img.freepik.com/free-photo/rice-field_1150-6044.jpg",
    title: "水稻播种",
    operator: "张农户",
    time: "2024-01-15 08:30",
  },
  {
    id: 2,
    image: "https://img.freepik.com/free-photo/vegetable-garden_1150-6010.jpg",
    title: "蔬菜浇水",
    operator: "李农户",
    time: "2024-01-15 09:30",
  },
  {
    id: 3,
    image: "https://img.freepik.com/free-photo/corn-field_1150-6012.jpg",
    title: "玉米施肥",
    operator: "王农户",
    time: "2024-01-15 10:15",
  },
  {
    id: 4,
    image: "https://img.freepik.com/free-photo/fruit-trees_1150-6020.jpg",
    title: "果树修剪",
    operator: "赵农户",
    time: "2024-01-15 11:00",
  },
  {
    id: 5,
    image: "https://img.freepik.com/free-photo/greenhouse_1150-6030.jpg",
    title: "大棚温控",
    operator: "刘农户",
    time: "2024-01-15 13:30",
  },
  {
    id: 6,
    image:
      "https://img.freepik.com/free-photo/pesticide-spraying_1150-6050.jpg",
    title: "病虫害防治",
    operator: "陈农户",
    time: "2024-01-15 14:45",
  },
  {
    id: 7,
    image: "https://img.freepik.com/free-photo/harvesting_1150-6060.jpg",
    title: "小麦收割",
    operator: "孙农户",
    time: "2024-01-15 15:20",
  },
  {
    id: 8,
    image: "https://img.freepik.com/free-photo/soil-preparation_1150-6070.jpg",
    title: "土地整理",
    operator: "周农户",
    time: "2024-01-15 16:00",
  },
  {
    id: 9,
    image: "https://img.freepik.com/free-photo/irrigation-system_1150-6080.jpg",
    title: "灌溉系统检查",
    operator: "吴农户",
    time: "2024-01-15 16:45",
  },
];
</script>

<template>
  <div class="note-container">
    <div class="note-grid">
      <div v-for="item in noteList" :key="item.id" class="note-card">
        <div class="card-image">
          <image :src="item.image" :alt="item.title" mode="aspectFill"></image>
        </div>
        <div class="card-content">
          <h3 class="title">{{ item.title }}</h3>
          <div class="info">
            <text class="operator">操作人：{{ item.operator }}</text>
            <text class="time">{{ item.time }}</text>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.note-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20rpx;
}

.note-card {
  background: #ffffff;
  border-radius: 24rpx;
  overflow: hidden;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.1);

  .card-image {
    height: 250rpx;

    image {
      width: 100%;
      height: 100%;
    }
  }

  .card-content {
    padding: 24rpx;

    .title {
      font-size: 32rpx;
      font-weight: bold;
      color: #333;
      margin-bottom: 16rpx;
    }

    .info {
      display: flex;
      flex-direction: column;
      gap: 8rpx;
      font-size: 24rpx;

      .operator {
        color: #2c8a3d;
      }

      .time {
        color: #999;
      }
    }
  }
}
</style>
