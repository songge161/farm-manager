<script setup lang="ts">
import { ref, onMounted } from "vue";
import { onLoad ,onShow,onReady} from "@dcloudio/uni-app";
import { apiGetMethod } from "../../apis/apis.js";
//获取数组长度的函数,
const getArrayLength = (array: any[]) => {

    return array

 
};

// 方法详情数据
const method = ref();

const pageParams = ref();

// 预览图片
const previewImage = (current: string) => {
  uni.previewImage({
    current,
    urls: method.value.images
  });
};
//获取小程序页面参数


// 加载方法详情
const loadMethodDetail = async (id: number) => {
    let res 
    res= await apiGetMethod({id});
    method.value = res.data.rows[0];

};

onLoad((options) => {
  if (options?.id) { 
    console.log("load!!!");
    pageParams.value = options;
  } else {
    uni.showToast({ title: '无效的操作ID', icon: 'none' });
    setTimeout(() => uni.navigateBack(), 1500);
  }
  
});
onShow(async() => {
    if(!method.value){
        await loadMethodDetail(Number(pageParams.value.id)); 
    }
    console.log("show!!!");
    console.log(method.value);
    
});

</script>

<template>
  
  <view class="method-detail-container">
    
    <!-- 加载状态 -->
    <uni-load-more v-if="!method" status="loading" />
    <!-- 详情内容 -->
    <view v-else class="detail-content">
      <!-- 头部信息 -->
      <view class="header">
        <text class="title">{{ method.title }}</text>
        <view class="meta">
          <text class="time">{{ new Date(method.time).toLocaleString() }}</text>
          <text class="weather">{{ method.weather }} · {{ method.temperature }}</text>
        </view>
      </view>
      
      <!-- 操作阶段 -->
      <view v-if="method.phase" class="section">
        <view class="section-title">
          <uni-icons type="flag" size="16" color="#666" />
          <text>操作阶段</text>
        </view>
        <text class="section-content">{{ method.phase }}</text>
      </view>
      
      <!-- 清理方法 -->
      <view v-if="method.clean_method" class="section">
        <view class="section-title">
          <uni-icons type="settings" size="16" color="#666" />
          <text>清理方法</text>
        </view>
        <text class="section-content">{{ method.clean_method }}</text>
      </view>
      
      <!-- 操作详情 -->
      <view class="section">
        <view class="section-title">
          <uni-icons type="info" size="16" color="#666" />
          <text>操作内容</text>
        </view>
        <text class="section-content">{{ method.detail }}</text>
      </view>
      
      <!-- 额外信息 -->
      <view v-if="method.extra" class="section">
        <view class="section-title">
          <uni-icons type="paperclip" size="16" color="#666" />
          <text>额外信息</text>
        </view>
        <text class="section-content">{{ method.extra }}</text>
      </view>
      
      <!-- 图片展示 -->
      <view v-if="true" class="section">
        <view class="section-title">
          <uni-icons type="image" size="16" color="#666" />
          <text>现场照片</text>
        </view>
        <scroll-view scroll-x class="image-scroll">
          <view 
            v-for="(img, index) in method.images" 
            :key="index" 
            class="image-item"
            @click="previewImage(img)"
          >
            <image :src="img" mode="aspectFill" class="image" />
          </view>
        </scroll-view>
      </view>
      
      <!-- 记录员信息 -->
      <view class="operator">
        <uni-icons type="person" size="16" color="#666" />
        <text>记录员: {{ method.operator }}</text>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.method-detail-container {
  padding: 30rpx;
  
  .detail-content {
    .header {
      margin-bottom: 40rpx;
      padding-bottom: 20rpx;
      border-bottom: 1rpx solid #f0f0f0;
      
      .title {
        display: block;
        font-size: 40rpx;
        font-weight: bold;
        color: #333;
        margin-bottom: 15rpx;
      }
      
      .meta {
        display: flex;
        justify-content: space-between;
        font-size: 28rpx;
        color: #666;
      }
    }
    
    .section {
      margin-bottom: 30rpx;
      
      .section-title {
        display: flex;
        align-items: center;
        margin-bottom: 15rpx;
        font-size: 32rpx;
        color: #333;
        
        text {
          margin-left: 10rpx;
        }
      }
      
      .section-content {
        display: block;
        font-size: 28rpx;
        color: #666;
        line-height: 1.6;
        padding-left: 26rpx;
      }
    }
    
    .image-scroll {
      white-space: nowrap;
      width: 100%;
      margin-top: 15rpx;
      
      .image-item {
        display: inline-block;
        width: 200rpx;
        height: 200rpx;
        margin-right: 20rpx;
        border-radius: 8rpx;
        overflow: hidden;
        
        .image {
          width: 100%;
          height: 100%;
        }
      }
    }
    
    .operator {
      display: flex;
      align-items: center;
      margin-top: 40rpx;
      padding-top: 20rpx;
      border-top: 1rpx solid #f0f0f0;
      font-size: 28rpx;
      color: #666;
      
      text {
        margin-left: 10rpx;
      }
    }
  }
}
</style>