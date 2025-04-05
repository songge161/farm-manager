import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    isLoggedIn: false,
    userInfo: null
  }),
  actions: {
    setLogin(status: boolean) {
      this.isLoggedIn = status
    },
    setUserInfo(info: any) {
      this.userInfo = info
    }
  }
})