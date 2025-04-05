<script setup lang="ts">
import { ref } from "vue";
// import { apiCreateRecord, apiCreateMethod } from "../../apis/apis.js";
import { onLoad, onShow } from "@dcloudio/uni-app";

// 表单数据
const formData = ref({
  // Record 字段
  block: "",
  batch: "",
  area: "",
  crop: "",
  newRecordDate: new Date().toISOString().split('T')[0], // 默认今天
  
  // Method 字段
  methodTitle: "",
  methodTime: new Date().toISOString().slice(0, 16), // 带时间的日期
  methodDetail: "",
  methodWeather: "晴",
  methodTemperature: "",
  methodOperator: "",
  methodImages: [] as string[]
});

// 图片上传
const uploadImage = () => {
  uni.chooseImage({
    count: 9,
    sizeType: ['original', 'compressed'],
    sourceType: ['album', 'camera'],
    success: (res) => {
      formData.value.methodImages = Array.isArray(res.tempFilePaths) ? res.tempFilePaths : [res.tempFilePaths];
    }
  });
};

// 提交表单
const submitForm = async () => {
//   try {
//     // 1. 创建 Record
//     const recordRes = await apiCreateRecord({
//       block: formData.value.block,
//       batch: formData.value.batch,
//       area: formData.value.area,
//       crop: formData.value.crop,
//       newRecordDate: formData.value.newRecordDate,
//       state: true
//     });
    
//     if (!recordRes.success) {
//       uni.showToast({ title: '创建记录失败', icon: 'none' });
//       return;
//     }
    
//     const recordId = recordRes.data.id;
    
//     // 2. 创建关联的 Method
//     const methodRes = await apiCreateMethod({
//       title: formData.value.methodTitle,
//       time: formData.value.methodTime,
//       detail: formData.value.methodDetail,
//       weather: formData.value.methodWeather,
//       temperature: formData.value.methodTemperature,
//       operator: formData.value.methodOperator,
//       images: formData.value.methodImages,
//       rid: recordId, // 关联到新创建的 record
//       state: true
//     });
    
//     if (methodRes.success) {
//       uni.showToast({ title: '创建成功' });
//       setTimeout(() => {
//         uni.navigateBack(); // 返回上一页
//       }, 1500);
//     } else {
//       uni.showToast({ title: '创建方法失败', icon: 'none' });
//     }
//   } catch (error) {
//     console.error('提交失败:', error);
//     uni.showToast({ title: '提交失败', icon: 'none' });
//   }
};

// 验证表单
const validateForm = () => {
  if (!formData.value.block) {
    uni.showToast({ title: '请填写区块', icon: 'none' });
    return false;
  }
  if (!formData.value.methodTitle) {
    uni.showToast({ title: '请填写操作标题', icon: 'none' });
    return false;
  }
  return true;
};

// 提交处理
const handleSubmit = () => {
  if (validateForm()) {
    uni.showLoading({ title: '提交中...' });
    submitForm();
  }
};
</script>

<template>
  <view class="form-container">
    <uni-forms>
      <!-- Record 信息 -->
      <uni-section title="基础信息" type="line">
        <uni-forms-item label="区块" required>
          <uni-easyinput v-model="formData.block" placeholder="请输入区块" />
        </uni-forms-item>
        
        <uni-forms-item label="批次">
          <uni-easyinput v-model="formData.batch" placeholder="请输入批次" />
        </uni-forms-item>
        
        <uni-forms-item label="面积" required>
          <uni-easyinput 
            v-model="formData.area" 
            placeholder="请输入面积" 
            type="number" 
          />
          <text class="unit">亩</text>
        </uni-forms-item>
        
        <uni-forms-item label="作物" required>
          <uni-easyinput v-model="formData.crop" placeholder="请输入作物" />
        </uni-forms-item>
        
        <uni-forms-item label="记录日期">
          <uni-datetime-picker 
            v-model="formData.newRecordDate" 
            type="date" 
          />
        </uni-forms-item>
      </uni-section>
      
      <!-- Method 信息 -->
      <uni-section title="操作记录" type="line">
        <uni-forms-item label="操作标题" required>
          <uni-easyinput 
            v-model="formData.methodTitle" 
            placeholder="如: 播种、施肥等" 
          />
        </uni-forms-item>
        
        <uni-forms-item label="操作时间">
          <uni-datetime-picker 
            v-model="formData.methodTime" 
            type="datetime" 
          />
        </uni-forms-item>
        
        <uni-forms-item label="天气">
          <uni-data-select
            v-model="formData.methodWeather"
            :localdata="[
              { value: '晴', text: '晴' },
              { value: '多云', text: '多云' },
              { value: '阴', text: '阴' },
              { value: '雨', text: '雨' },
              { value: '雪', text: '雪' }
            ]"
          />
        </uni-forms-item>
        
        <uni-forms-item label="温度(℃)">
          <uni-easyinput 
            v-model="formData.methodTemperature" 
            placeholder="请输入温度" 
            type="number" 
          />
        </uni-forms-item>
        
        <uni-forms-item label="操作内容" required>
          <uni-easyinput 
            v-model="formData.methodDetail" 
            placeholder="详细描述操作内容" 
            type="textarea" 
          />
        </uni-forms-item>
        
        <uni-forms-item label="记录员">
          <uni-easyinput 
            v-model="formData.methodOperator" 
            placeholder="请输入记录员姓名" 
          />
        </uni-forms-item>
        
        <uni-forms-item label="现场照片">
          <view class="image-uploader">
            <view 
              v-for="(img, index) in formData.methodImages" 
              :key="index" 
              class="image-preview"
            >
              <image :src="img" mode="aspectFill" />
              <uni-icons 
                type="close" 
                @click="formData.methodImages.splice(index, 1)" 
              />
            </view>
            <view 
              v-if="formData.methodImages.length < 9" 
              class="upload-btn" 
              @click="uploadImage"
            >
              <uni-icons type="plusempty" size="24" />
              <text>添加照片</text>
            </view>
          </view>
        </uni-forms-item>
      </uni-section>
      
      <view class="form-actions">
        <button type="primary" @click="handleSubmit">提交记录</button>
      </view>
    </uni-forms>
  </view>
</template>

<style scoped lang="scss">
.form-container {
  padding: 30rpx;
  
  .unit {
    margin-left: 10rpx;
    color: #999;
    font-size: 28rpx;
  }
  
  .image-uploader {
    display: flex;
    flex-wrap: wrap;
    gap: 20rpx;
    
    .image-preview {
      position: relative;
      width: 160rpx;
      height: 160rpx;
      border-radius: 8rpx;
      overflow: hidden;
      
      image {
        width: 100%;
        height: 100%;
      }
      
      .uni-icons {
        position: absolute;
        top: 0;
        right: 0;
        background: rgba(0, 0, 0, 0.5);
        color: white;
        padding: 6rpx;
        border-radius: 0 0 0 8rpx;
      }
    }
    
    .upload-btn {
      width: 160rpx;
      height: 160rpx;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border: 1px dashed #ddd;
      border-radius: 8rpx;
      color: #999;
      
      text {
        font-size: 24rpx;
        margin-top: 10rpx;
      }
    }
  }
  
  .form-actions {
    margin-top: 40rpx;
    
    button {
      width: 100%;
    }
  }
}
</style>