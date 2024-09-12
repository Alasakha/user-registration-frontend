// src/stores/tabsStore.js
import { defineStore } from 'pinia'

export const useTabsStore = defineStore('tabs', {
  state: () => ({
    openTabs: [],  // 存储所有打开的标签页
    activeIndex: '' // 存储当前激活的标签页的路由地址
  }),
  actions: {
    addTab(tab) {
      const exists = this.openTabs.find(t => t.route === tab.route);
      if (!exists) {
        this.openTabs.push(tab);
        console.log('tabs.js里的openTabs:',this.openTabs);
        
      }
    },
    removeTab(route) {
      this.openTabs = this.openTabs.filter(t => t.route !== route);
      if (this.activeIndex === route && this.openTabs.length > 0) {
        this.activeIndex = this.openTabs[this.openTabs.length - 1].route;
      }
    },
    setActiveIndex(route) {
      // console.log(route);
      
      this.activeIndex = route;
    }
  }
});