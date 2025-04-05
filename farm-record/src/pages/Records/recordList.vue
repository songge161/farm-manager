
  <script lang="ts" setup>
  import { ref } from 'vue';
  
      // 模拟数据
      const recordList = ref([
        {
          id: 0,
          batch: "批次0",
          block: "区块0",
          area: "1",
          crop: "作物0",
          createdAt: "2025-03-29T12:58:23.000Z"
        },
        {
          id: 1,
          batch: "批次1",
          block: "区块1",
          area: "2.5",
          crop: "作物1",
          createdAt: "2025-03-30T09:15:00.000Z"
        }
      ]);
  
      const popup = ref<any>(null);
      const deletingId = ref<number | null>(null);
  
      
      // 格式化时间显示，形式为 YYYY-MM-DD HH:mm
     
      const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}`;
      }
      // 显示删除确认
      const showDeleteConfirm = (id: number) => {
        deletingId.value = id;
        popup.value.open();
      };
  
      // 确认删除
      const confirmDelete = () => {
        if (deletingId.value !== null) {
          recordList.value = recordList.value.filter(
            item => item.id !== deletingId.value
          );
          uni.showToast({
            title: '删除成功',
            icon: 'success'
          });
        }
        popup.value.close();
      };
  </script>
  <template>
    <view class="record-container">
      <!-- 标题 -->
    
  
      <!-- 记录列表 -->
      <view class="record-list">
        <view 
          v-for="record in recordList" 
          :key="record.id" 
          class="record-card"
        >
          <view class="card-content">
            <!-- 顶部信息 -->
            <view class="info-row">
              <text class="label">批次：</text>
              <text class="value">{{ record.batch }}</text>
            </view>
            
            <!-- 主体信息 -->
            <view class="info-grid">
              <view class="info-item">
                <text class="label">区块：</text>
                <text class="value">{{ record.block }}</text>
              </view>
              <view class="info-item">
                <text class="label">面积：</text>
                <text class="value">{{ record.area }}亩</text>
              </view>
              <view class="info-item">
                <text class="label">作物：</text>
                <text class="value">{{ record.crop }}</text>
              </view>
              <view class="info-item">
                <text class="label">操作数量:</text>
                <text class="value">{{ 1 }}</text>
              </view>
              <view class="info-item">
                <text class="label">记录时间：</text>
                <text class="value">{{ formatDate(record.createdAt) }}</text>
              </view>
            </view>
          </view>
  
          <!-- 删除按钮 -->
          <view class="delete-btn" @click.stop="showDeleteConfirm(record.id)">
            <uni-icons type="trash" size="18" color="#ff4d4f"></uni-icons>
          </view>
        </view>
      </view>
  
      <!-- 删除确认弹窗 -->
      <uni-popup ref="popup" type="dialog">
        <uni-popup-dialog
          type="warn"
          title="确认删除"
          content="确定要删除这条记录吗？"
          @confirm="confirmDelete"
        ></uni-popup-dialog>
      </uni-popup>
    </view>
  </template>
  
  <style scoped>
  .record-container {
    padding: 20rpx;
    background-color: #f8f8f8;
    min-height: 100vh;
  }
  
  .record-list {
    margin-top: 20rpx;
  }
  
  .record-card {
    display: flex;
    background-color: #fff;
    border-radius: 12rpx;
    padding: 24rpx;
    margin-bottom: 20rpx;
    box-shadow: 0 2rpx 6rpx rgba(0, 0, 0, 0.05);
  }
  
  .card-content {
    flex: 1;
  }
  
  .info-row {
    margin-bottom: 16rpx;
  }
  
  .info-grid {
    display: grid;
    /* grid-template-columns: 1fr 1fr; */
    gap: 12rpx;
  }
  
  .info-item {
    display: flex;
  }
  
  .label {
    color: #666;
    font-size: 28rpx;
  }
  
  .value {
    color: #333;
    font-size: 28rpx;
  }
  
  .delete-btn {
    width: 60rpx;
    height: 60rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 20rpx;
    border-radius: 50%;
    background-color: #fff2f0;
  }
  </style>