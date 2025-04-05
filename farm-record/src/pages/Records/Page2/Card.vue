<script setup lang="ts">
import { ref } from "vue";
import { apiGetRecord, apiGetMethod, apiQuick } from "../../../apis/apis.js";
import { onLoad, onLaunch, onShow, onHide, onReachBottom } from "@dcloudio/uni-app";
import { useRecordStore } from "@/stores/recordStore";
const store = useRecordStore();
console.log(store)
let methods = ref();
let records = ref();
let combine = ref<any[]>([]);
let user = ref()
let methodCount = ref();
let recordCount = ref();
let combineCount = ref();

//获取数组长度
const getArrayLength = (arr: Array<any>) => {
  return arr.length;
};
const queryParamsRecord = {

}
const queryParamsMethod = {

}
const queryParamsCombine = {
  page: 1,
  pageSize: 2,
}
const getRecordList = async () => {
  let res;
  res = await apiGetRecord(queryParamsRecord);
  records.value = res.data.rows;
  recordCount.value = res.data.count
}
const getMethodList = async () => {
  let res;
  res = await apiGetMethod(queryParamsMethod);
  methods.value = res.data.rows;
  methodCount.value = res.data.count

}
const getCombineList = async () => {

  let res;
  res = await apiQuick("combine", queryParamsCombine);
  console.log(res.data);
  try {
    // combine.value = res.data.rows;
    // combineCount.value = res.data.count
    if (res.data.rows && getArrayLength(res.data.rows) > 0) {
      // 将新数据追加到 combine 中
      combine.value = [...combine.value, ...res.data.rows];
      combineCount.value = res.data.count;
      console.log("combine");
      console.log(combine.value);

    } else {
      uni.showToast({ title: "没有更多数据了1", icon: "none" });
      // 这里可以选择停止加载更多数据的操作，或者给出提示
    }


  } catch (error: any) {
    if (error.errCode === 404) {
      uni.showToast({ title: "没有更多数据了2", icon: "none" });


    } else {
      uni.showToast({ title: "请求失败，请稍后再试", icon: "none" });
    }
  }
}
const getUserList = async () => {
  let res;
  res = await apiQuick("user", queryParamsCombine);
  user.value = res.data.rows;

}

//触底加载更多
onReachBottom(async () => {

  console.log("onReachBottom");
  if (combineCount.value && combineCount.value <= queryParamsCombine.page * queryParamsCombine.pageSize) {
    uni.showToast({ title: "没有更多数据了", icon: "none" });
    return; // 如果没有更多数据，直接返回
  }
  queryParamsCombine.page += 1; // 增加页码
  await getCombineList(); // 获取下一页数据
});


const goToDetail = (id: number) => {
  uni.navigateTo({
    url: `/pages/Records/detail?id=${id}`, // 跳转到 detail 页面并传递 id 参数
  });
};
const getDay = (day: string) => {
  let date = new Date(day);
  return date.getDate();
}
const getTimes = (days: string): string => {
  let date = new Date(days);
  const year = date.getUTCFullYear(); // 获取年份
  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // 获取月份（补零）
  const day = String(date.getUTCDate()).padStart(2, '0'); // 获取日期（补零）
  const hours = String(date.getUTCHours()).padStart(2, '0'); // 获取小时（补零）
  const minutes = String(date.getUTCMinutes()).padStart(2, '0'); // 获取分钟（补零）
  const seconds = String(date.getUTCSeconds()).padStart(2, '0'); // 获取秒数（补零）
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
const recordMethod = (arr: Array<number>) => {
  let res = []
  for (let i = 0; i < arr.length; i++) {
    methods.value[arr[i]].id = arr[i]
    res.push(methods.value[arr[i]])
  }
  console.log(res);

  return res
}

onLoad(() => {
  console.log("PG1onLoad");

});
onShow(async () => {

  console.log("PG1onShow");
  queryParamsCombine.page = 1; // 重置页码
  combine.value = []; // 清空数据
  await getCombineList();
  if (!records.value) {
    await getRecordList();
  }
  if (!methods.value) {
    await getMethodList();
  }


  if (!user.value) {
    await getUserList();
  }
  console.log(user.value);

  console.log(combine.value);
  console.log(combineCount.value);


  // console.log(methods.value);
  console.log(records.value);
  // console.log(records.value[0].records[0]-1);
  // console.log(methods.value[5].title );


  // console.log(records.value[0].records.slice(1));
  // console.log(recordMethod(records.value[0].records).slice(1));



})


const expandedStates = ref(new Map());

const toggleExpand = (cardId: number) => {
  expandedStates.value.set(cardId, !expandedStates.value.get(cardId));
};

const previewImage = (currentUrl: string, urls: string[]) => {
  uni.previewImage({
    current: currentUrl,
    urls: urls,
  });
};


</script>

<template>
  <view class="CardContainer">
    <view v-for="(record, index) in combine" :key="index" class="card">
      <view class="head">
        <view class="date">

          <text class="day">{{ getDay(record.newRecordDate) }}</text>
          <text class="unit">日</text>
        </view>
        <view class="info-grid">
          <view class="info-item">
            <uni-icons type="location" size="16" color="#666"></uni-icons>
            <text class="label">面积</text>
            <text class="value highlight-green">{{ record.area }}</text>
          </view>
          <view class="info-item">
            <uni-icons type="map" size="16" color="#666"></uni-icons>
            <text class="label">区块</text>
            <text class="value highlight-blue">{{ record.block }}</text>
          </view>
          <view class="info-item">
            <uni-icons type="bars" size="16" color="#666"></uni-icons>
            <text class="label">批次</text>
            <text class="value">{{ record.batch }}</text>
          </view>
          <view class="info-item">
            <uni-icons type="star" size="16" color="#666"></uni-icons>
            <text class="label">作物</text>
            <text class="value highlight-orange">{{ record.crop }}</text>
          </view>
        </view>
      </view>

      <view class="body">
        <view class="item">
          <view class="operation-info">
            <view class="main-info">
              <text class="action-tag">
                {{ record.methods[0].title }}
              </text>
              <text class="time">
                <uni-icons type="clock" size="14" color="#666"></uni-icons>
                {{ getTimes(record.methods[0].time) }}
              </text>
            </view>
            <view class="weather-info">
              <text class="weather">{{ record.methods[0].weather }}</text>
              <text class="temperature">
                {{ record.methods[0].temperature }}
              </text>
            </view>
          </view>

          <view class="details">
            <view class="detail-row">
              <text class="detail-label">操作内容：</text>
              <text class="detail-value">{{ record.methods[0].detail }}</text>
            </view>
          </view>

          <view class="image-grid">
            <image v-for="(img, imgIndex) in record.methods[0].images" :key="imgIndex" :src="img" mode="aspectFill"
              @click="previewImage(img, record.methods[0].images)"></image>
          </view>

          <view class="creator">
            <text class="creator-label">记录员：</text>
            <text class="creator-name">{{ record.methods[0].operator }}</text>
          </view>
            <view class="detail-button" @click="goToDetail(record.methods[0].id)">
              <text class="detail-button-text">查看详情</text>
            </view>
        </view>

        <view class="expand-section" v-if="!expandedStates.get(record.id) && getArrayLength(record.methods) > 1">
          <view class="expand-button" @click="toggleExpand(record.id)">
            <text class="expand-text">还有{{ getArrayLength(record.methods) - 1 }}条操作记录</text>
            <text class="expand-icon">∨</text>
          </view>
        </view>

        <view class="expanded-content" v-if="expandedStates.get(record.id)">
          <view v-for="(method, mIndex) in record.methods.slice(1)" :key="mIndex" class="item">
            <view class="operation-info">
              <view class="main-info">
                <text class="action-type">{{


                  method.title }}</text>
                <text class="time">{{ getTimes(method.time) }}</text>
              </view>
              <view class="weather-info">
                <text class="weather">{{ method.weather }} · {{ method.temperature }}</text>
              </view>
            </view>
            <view class="details">
              <view class="detail-row">
                <text class="detail-label">操作内容：</text>
                <text class="detail-value">{{ method.detail }}</text>
              </view>
            </view>
            <view class="image-grid">
              <image v-for="(img, imgIndex) in method.images" :key="imgIndex" :src="img" mode="aspectFill"
                @click="previewImage(img, method.images)"></image>
            </view>
            <view class="creator">
              <text class="creator-label">记录员：</text>
              <text class="creator-name">{{ method.operator }}</text>
            </view>
            <view class="detail-button" @click="goToDetail(method.id)">
              <text class="detail-button-text">查看详情</text>
            </view>
          </view>

          <!-- 收起按钮 -->
          <view class="expand-button collapse" @click="toggleExpand(record.id)">
            <text class="expand-text">收起</text>
            <text class="expand-icon">∧</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.CardContainer {
  padding: 40rpx 20rpx;
  display: flex;
  flex-direction: column;
  gap: 40rpx;

  .card {
    background-color: #ffffff;
    border-radius: 16rpx;
    box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.08);
    padding: 30rpx;
    border-left: 10rpx solid #4caf50;

    .head {
      display: flex;
      gap: 30rpx;
      padding-bottom: 30rpx;
      border-bottom: 1rpx solid #f0f0f0;

      .date {
        display: flex;
        align-items: baseline;

        .day {
          font-size: 48rpx;
          font-weight: 600;
          color: #333;
        }

        .unit {
          font-size: 24rpx;
          color: #666;
          margin-left: 4rpx;
        }
      }

      .info-grid {
        flex: 1;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 20rpx;

        .info-item {
          display: flex;
          align-items: center;
          gap: 12rpx;
          background-color: #f8f8f8;
          padding: 12rpx 16rpx;
          border-radius: 8rpx;

          .label {
            color: #666;
            font-size: 24rpx;
          }

          .value {
            color: #333;
            font-size: 26rpx;
            font-weight: 500;

            &.highlight-green {
              color: #4caf50;
            }

            &.highlight-blue {
              color: #2196f3;
            }

            &.highlight-orange {
              color: #ff9800;
            }
          }
        }
      }
    }

    .body {
      padding-top: 30rpx;

      .item {
        .operation-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20rpx;

          .main-info {
            display: flex;
            align-items: center;
            gap: 20rpx;

            .action-type {
              font-size: 32rpx;
              font-weight: 600;
              color: #333;
            }

            .time {
              color: #666;
              font-size: 26rpx;
            }
          }

          .weather-info {
            font-size: 26rpx;
            color: #666;
          }
        }

        .details {
          margin-bottom: 20rpx;

          .detail-row {
            display: flex;
            align-items: center;
            gap: 8rpx;

            .detail-label {
              color: #666;
              font-size: 26rpx;
            }

            .detail-value {
              color: #333;
              font-size: 26rpx;
            }
          }
        }

        .image-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16rpx;
          margin-bottom: 20rpx;

          image {
            width: 100%;
            height: 160rpx;
            border-radius: 8rpx;
            object-fit: cover;
            box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease;

            &:active {
              opacity: 0.8;
              transform: scale(0.95);
            }
          }
        }

        .creator {
          display: flex;
          align-items: center;
          gap: 8rpx;

          .creator-label {
            font-size: 24rpx;
            color: #666;
          }

          .creator-name {
            font-size: 24rpx;
            color: #333;
          }
        }

        .detail-button {
          margin-top: 20rpx;
          padding: 12rpx 20rpx;
          background-color: #4caf50;
          border-radius: 8rpx;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;

          &:active {
            background-color: #45a049;
          }

          .detail-button-text {
            font-size: 26rpx;
            color: #fff;
            font-weight: bold;
          }
        }

        &+.item {
          margin-top: 30rpx;
          padding-top: 30rpx;
          border-top: 1rpx solid #f0f0f0;
        }
      }

      .expand-section {
        margin-top: 20rpx;
        border-top: 1rpx dashed #eee;
        padding-top: 20rpx;
      }

      .expand-button {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 16rpx;
        background-color: #f8f8f8;
        border-radius: 8rpx;
        cursor: pointer;
        transition: all 0.3s ease;

        &:active {
          background-color: #f0f0f0;
        }

        &.collapse {
          margin-top: 20rpx;
          background-color: #fff;
          border: 1rpx solid #eee;
        }

        .expand-text {
          font-size: 26rpx;
          color: #666;
          margin-right: 8rpx;
        }

        .expand-icon {
          font-size: 24rpx;
          color: #999;
          transition: transform 0.3s ease;
        }
      }

      .expanded-content {
        animation: slideDown 0.3s ease;

        margin-top: 20rpx;
        padding-top: 20rpx;
        border-top: 1rpx solid #f0f0f0;

        .item:first-child {
          margin-top: 0;
          padding-top: 0;
          border-top: none;
        }
      }
    }
  }
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20rpx);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
