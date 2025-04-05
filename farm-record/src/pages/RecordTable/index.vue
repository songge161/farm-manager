<script setup lang="ts">
import { ref, onMounted } from "vue";
import { apiGetRecord } from "@/apis/apis.js";
import { onLoad, onShow } from "@dcloudio/uni-app";

// 表单数据
const formData = ref({
  recordId: null as number | null,  // 选择的Record ID
  title: "",
  time: new Date().toISOString().slice(0, 16), // 带时间的日期
  detail: "",
  weather: "晴",
  temperature: "",
  operator: "",
  images: [] as string[]
});

// 记录列表
const records = ref<Array<{
  id: number;
  block: string;
  batch: string;
  area: string;
  crop: string;
}>>([]);

// 加载记录列表
const loadRecords = async () => {
  try {
    const res = await apiGetRecord({ 
      state: true,
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      order: [['newRecordDate', 'DESC']]
    });
    records.value = res.data.rows;
  } catch (error) {
    console.error('加载记录失败:', error);
    uni.showToast({ title: '加载记录失败', icon: 'none' });
  }
};

// 图片上传
const uploadImage = () => {
  uni.chooseImage({
    count: 9,
    sizeType: ['original', 'compressed'],
    sourceType: ['album', 'camera'],
    success: (res) => {
      formData.value.images = [...formData.value.images, ...res.tempFilePaths];
    }
  });
};

// 移除图片
const removeImage = (index: number) => {
  formData.value.images.splice(index, 1);
};

// 提交表单
// const submitForm = async () => {
//   if (!validateForm()) return;
  
//   try {
//     uni.showLoading({ title: '提交中...' });
    
//     const res = await apiCreateMethod({
//       title: formData.value.title,
//       time: formData.value.time,
//       detail: formData.value.detail,
//       weather: formData.value.weather,
//       temperature: formData.value.temperature,
//       operator: formData.value.operator,
//       images: formData.value.images,
//       rid: formData.value.recordId, // 关联到选择的record
//       state: true
//     });
    
//     if (res.success) {
//       uni.showToast({ title: '操作记录添加成功' });
//       setTimeout(() => {
//         uni.navigateBack(); // 返回上一页
//       }, 1500);
//     } else {
//       uni.showToast({ title: '提交失败: ' + res.message, icon: 'none' });
//     }
//   } catch (error) {
//     console.error('提交失败:', error);
//     uni.showToast({ title: '提交失败', icon: 'none' });
//   } finally {
//     uni.hideLoading();
//   }
// };

// 验证表单
const validateForm = () => {
  if (!formData.value.recordId) {
    uni.showToast({ title: '请选择记录', icon: 'none' });
    return false;
  }
  if (!formData.value.title) {
    uni.showToast({ title: '请填写操作标题', icon: 'none' });
    return false;
  }
  if (!formData.value.detail) {
    uni.showToast({ title: '请填写操作内容', icon: 'none' });
    return false;
  }
  return true;
};

onMounted(() => {
  loadRecords();
});
</script>

<template>
  <view class="form-container">
    <uni-forms>
      <!-- 选择记录 -->
      <uni-section title="选择记录" type="line">
        <uni-forms-item label="选择记录" required>
          <uni-data-select
            v-model="formData.recordId"
            :localdata="records.map(r => ({
              value: r.id,
              text: `${r.block}-${r.batch} (${r.crop}, ${r.area}亩)`
            }))"
            placeholder="请选择要添加操作的记录"
          />
        </uni-forms-item>
      </uni-section>
      
      <!-- 操作信息 -->
      <uni-section title="操作信息" type="line">
        <uni-forms-item label="操作标题" required>
          <uni-easyinput 
            v-model="formData.title" 
            placeholder="如: 播种、施肥、灌溉等" 
          />
        </uni-forms-item>
        
        <uni-forms-item label="操作时间">
          <uni-datetime-picker 
            v-model="formData.time" 
            type="datetime" 
          />
        </uni-forms-item>
        
        <uni-forms-item label="天气">
          <uni-data-select
            v-model="formData.weather"
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
            v-model="formData.temperature" 
            placeholder="请输入温度" 
            type="number" 
          />
        </uni-forms-item>
        
        <uni-forms-item label="操作内容" required>
          <uni-easyinput 
            v-model="formData.detail" 
            placeholder="详细描述操作内容" 
            type="textarea" 
          />
        </uni-forms-item>
        
        <uni-forms-item label="记录员">
          <uni-easyinput 
            v-model="formData.operator" 
            placeholder="请输入记录员姓名" 
          />
        </uni-forms-item>
        
        <uni-forms-item label="现场照片">
          <view class="image-uploader">
            <view 
              v-for="(img, index) in formData.images" 
              :key="index" 
              class="image-preview"
            >
              <image :src="img" mode="aspectFill" @click="previewImage(img, formData.images)" />
              <uni-icons 
                type="close" 
                @click="removeImage(index)" 
              />
            </view>
            <view 
              v-if="formData.images.length < 9" 
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
        <button type="primary" @click="submitForm">提交操作记录</button>
      </view>
    </uni-forms>
  </view>
</template>

<style scoped lang="scss">
.form-container {
  padding: 30rpx;
  
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