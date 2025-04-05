<script lang="ts" setup>
import { ref } from 'vue';

const remindList = ref([
    {
        id: '1',
        block: '区块1',
        time: '2025-03-30 07:37:51',
        content: '区块1的作物需要浇水了'
    },
    {
        id: '2',
        block: '区块2',
        time: '2025-03-31 08:15:00',
        content: '区块2的作物需要施肥'
    }
]);

// 当前选中的删除项
const currentDeleteId = ref<string>('');
const currentDeleteIndex = ref<number>(-1);
const popup = ref<any>(null);

// 格式化时间
const formatTime = (timeStr: string) => {
    return timeStr.slice(0, -3);
};

// 点击删除按钮
const handleDelete = (id: string, index: number) => {
    currentDeleteId.value = id;
    currentDeleteIndex.value = index;
    popup.value.open();
};

// 确认删除
const confirmDelete = async () => {
    if (currentDeleteIndex.value >= 0) {
        // 这里实际应该调用 apiDeleteRemind(currentDeleteId.value)
        remindList.value.splice(currentDeleteIndex.value, 1);
        uni.showToast({
            title: '删除成功',
            icon: 'success'
        });
    }
    popup.value.close();
};

</script>
<template>
    <view class="remind-container">

        <!-- 提醒列表 -->
        <view class="remind-list">
            <view v-for="(item, index) in remindList" :key="item.id" class="remind-item">
                <view class="item-main" >
                    <view class="item-header">
                        <text class="block">{{ item.block }}</text>
                        <text class="time">{{ formatTime(item.time) }}</text>
                    </view>
                    <view class="item-content">
                        <text>{{ item.content }}</text>
                    </view>
                </view>

                <!-- 删除按钮 -->
                <view class="delete-btn" @click.stop="handleDelete(item.id, index)">
                    <uni-icons type="trash" size="20" color="#ff4d4f"></uni-icons>
                </view>
            </view>
        </view>

        <!-- 删除确认弹窗 -->
        <uni-popup ref="popup" type="dialog">
            <uni-popup-dialog type="warn" title="确认删除" content="确定要删除这条提醒吗？"
                @confirm="confirmDelete"></uni-popup-dialog>
        </uni-popup>
    </view>
</template>


<style scoped>
/* 容器样式 */
.remind-container {
    padding: 20rpx;
    background-color: #f5f5f5;
    min-height: 100vh;
}

/* 标题样式 */
.header {
    padding: 20rpx 0;
    text-align: center;
}


/* 提醒列表样式 */
.remind-list {
    margin-top: 20rpx;
}

.remind-item {
    background-color: #fff;
    border-radius: 12rpx;
    padding: 24rpx;
    margin-bottom: 20rpx;
    box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
}

.item-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 16rpx;
}

.block {
    font-size: 32rpx;
    font-weight: bold;
    color: #4a8cff;
}

.time {
    font-size: 26rpx;
    color: #999;
}

.item-content {
    font-size: 28rpx;
    color: #666;
    line-height: 1.6;
}

.remind-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    border-radius: 12rpx;
    padding: 24rpx;
    margin-bottom: 20rpx;
    box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
}

.item-main {
    flex: 1;
}

.delete-btn {
    width: 80rpx;
    height: 80rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 20rpx;
    border-radius: 50%;
    background-color: #fff2f0;
}
</style>