<script setup lang="ts">
import { ref } from "vue";
import { apiGetRecord} from "@/apis/apis.js";
import { onLoad } from "@dcloudio/uni-app";

const formData = ref({
  block: "",
  time: "",
  content: ""
});

// 获取当前用户ID（根据您的实际登录逻辑调整）
const currentUser = ref({
  id: uni.getStorageSync('userId') || null
});

// 验证时间是否为未来时间
const isFutureTime = (timeString: string) => {
  const selectedTime = new Date(timeString).getTime();
  const now = new Date().getTime();
  return selectedTime > now;
};

// 提交表单
const submitForm = async () => {
  if (!formData.value.block) {
    uni.showToast({ title: '请填写区块', icon: 'none' });
    return;
  }
  
  if (!formData.value.time) {
    uni.showToast({ title: '请选择时间', icon: 'none' });
    return;
  }
  
  if (!isFutureTime(formData.value.time)) {
    uni.showToast({ title: '时间必须是将来的时间', icon: 'none' });
    return;
  }
  
  if (!formData.value.content) {
    uni.showToast({ title: '请填写提醒内容', icon: 'none' });
    return;
  }
  
  // try {
  //   uni.showLoading({ title: '提交中...' });
    
  //   const res = await apiCreateRemind({
  //     uid: currentUser.value.id,
  //     block: formData.value.block,
  //     time: formData.value.time,
  //     content: formData.value.content,
  //     // delay 和 state 使用模型默认值
  //   });
    
  //   if (res.success) {
  //     uni.showToast({ title: '提醒创建成功' });
  //     setTimeout(() => {
  //       uni.navigateBack();
  //     }, 1500);
  //   } else {
  //     uni.showToast({ title: '提交失败: ' + res.message, icon: 'none' });
  //   }
  // } catch (error) {
  //   console.error('提交失败:', error);
  //   uni.showToast({ title: '提交失败', icon: 'none' });
  // } finally {
  //   uni.hideLoading();
  // }
};

// 时间选择器变化事件
const handleTimeChange = (e: any) => {
  const selectedTime = new Date(e.detail.value).getTime();
  const now = new Date().getTime();
  
  if (selectedTime <= now) {
    uni.showToast({ title: '请选择将来的时间', icon: 'none' });
    formData.value.time = "";
    
    
  } else {
    formData.value.time = e.detail.value;
    console.log("Selected time:", formData.value.time);
    
  }
};
</script>

<template>
  <view class="form-container">
    <uni-forms>
      <uni-section title="提醒信息" type="line">
        <uni-forms-item label="区块" required>
          <uni-easyinput 
            v-model="formData.block" 
            placeholder="请输入区块名称（如：A区、B区）" 
          />
        </uni-forms-item>
        
        <uni-forms-item label="提醒时间" required>
          <uni-datetime-picker 
            v-model="formData.time" 
            type="datetime" 
            @change="handleTimeChange"
            :start="new Date().toISOString().split('T')[0]"
            placeholder="请选择将来的时间"
          />
        </uni-forms-item>
        
        <uni-forms-item label="提醒内容" required>
          <uni-easyinput 
            v-model="formData.content" 
            placeholder="请输入提醒内容" 
            type="textarea" 
          />
        </uni-forms-item>
      </uni-section>
      
      <view class="form-actions">
        <button type="primary" @click="submitForm">创建提醒</button>
      </view>
    </uni-forms>
  </view>
</template>

<style scoped lang="scss">
.form-container {
  padding: 30rpx;
  
  .form-actions {
    margin-top: 40rpx;
    
    button {
      width: 100%;
    }
  }
}
</style>