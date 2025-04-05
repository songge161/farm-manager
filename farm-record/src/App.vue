<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
import { ref } from "vue";
import { useAppStore } from '@/stores/appStore'
const appStore = useAppStore()
async function getWxCode() {
  try {
    const res = await uni.login({
      provider: 'weixin'
    });
    if (res.code) {
      return res.code; // 这个code要传给后端
    } else {
      throw new Error('登录失败');
    }
  } catch (error) {
    console.error('获取code失败:', error);
    uni.showToast({ title: '登录失败', icon: 'none' });
    return null;
  }
}
onLaunch(() => {
  console.log("App Launch");
  const store = useAppStore()
  const loginFlag = uni.getStorageSync('isLoggedIn') || false
  store.setLogin(loginFlag)

  getWxCode().then(code => {
    if (code) {
      // 这里可以将code发送到后端进行登录验证
      console.log('获取的code:', code);
     
    }
  });

});
onShow(() => {
  console.log("App Show");
});
onHide(() => {
  console.log("App Hide");
});
</script>
<style></style>
