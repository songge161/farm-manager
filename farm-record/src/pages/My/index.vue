<template>
    <div class="app-container">
      <header class="header">
        <!-- <h1>uni-app</h1> -->
      </header>
      <section class="user-info">
        <div class="avatar"><image
            src="/src/static/farmer.png"
            mode="scaleToFill"
        /></div>
        <div class="user-details">
          <p class="user-name">张大伯</p>
          <p class="user-id">ID: 888666</p>
        </div>
      </section>
      <section class="menu">
        <div class="menu-item">
          <div class="menu-icon"><uni-icons type="notification-filled" color="#07C160" size="30"></uni-icons></div>
          <div class="menu-content">
            <div class="menu-header">
              <p class="menu-title">我的提醒</p>
              <p class="menu-subtitle">3条 ></p>
            </div>
            <div class="reminders">
              <p>明天上午8点: 水稻施肥提醒</p>
              <p>后天下午2点: 玉米除草提醒</p>
            </div>
          </div>
        </div>
        <div class="menu-item">
          <div class="menu-icon"><uni-icons type="calendar-filled" color="#07C160" size="30"></uni-icons></div>
          <div class="menu-content">
            <div class="menu-header">
              <p class="menu-title">我的记录</p>
              <p class="menu-subtitle">28条 ></p>
            </div>
          </div>
        </div>
        <div class="menu-item">
          <div class="menu-icon"><uni-icons type="info-filled" color="#07C160" size="30"></uni-icons></div>
          <div class="menu-content">
            <p class="menu-title">意见反馈</p>
          </div>
        </div>
      </section>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from "vue";
  
  export default defineComponent({
    name: "UniAppInterface",
  });
  </script>
  
  <style scoped>
  .app-container {
    width: 700rpx;
    margin: 0 auto;
    height: 1200rpx;
    background-color: #f5f5f5;
    border-radius: 12px;
    padding: 25rpx;
    font-family: Arial, sans-serif;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .header {
    text-align: center;
    margin-bottom: 16px;
  }
  
  .user-info {
    display: flex;
    align-items: center;
    background-color: #fff;
    padding: 12px;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    margin-bottom: 16px;
  }
  
  .avatar image{
    width: 48px;
    height: 48px;
    background-color: #ccc;
    border-radius: 50%;
    margin-right: 12px;
  }
  
  .user-details {
    flex-grow: 1;
  }
  
  .user-name {
    font-size: 16px;
    font-weight: bold;
    margin: 0;
  }
  
  .user-id {
    font-size: 14px;
    color: #999;
    margin: 0;
  }
  
  .menu {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  
  .menu-item {
    display: flex;
    align-items: center;
    background-color: #fff;
    padding: 12px;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
  
  .menu-icon {
    font-size: 24px;
    margin-right: 12px;
  }
  
  .menu-content {
    flex-grow: 1;
  }
  
  .menu-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .menu-title {
    font-size: 16px;
    font-weight: bold;
    margin: 0;
  }
  
  .menu-subtitle {
    font-size: 14px;
    color: #999;
    margin: 0;
  }
  
  .reminders {
    margin-top: 8px;
    font-size: 14px;
    color: #666;
  }
  </style>