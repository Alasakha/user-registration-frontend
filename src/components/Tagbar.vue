<template>
        <el-tabs
          v-model="activeTab"
          type="card"
          closable
          @tab-remove="handleTabRemove"
          @tab-click="handleTabClick"
        >
          <el-tab-pane
            v-for="(tab, index) in openTabs"
            :key="tab.route"
            :label="tab.name"
            :name="tab.route"
          />
        </el-tabs>
      </template>
      
      <script lang="ts" setup>
      import { computed, watch ,onMounted} from 'vue';
      import { useRouter } from 'vue-router';
      import { useTabsStore } from '../stores/tabs';
      
      const router = useRouter();
      const tabsStore = useTabsStore();

      onMounted(() => {
        const savedTabs = localStorage.getItem('tabs');
        const savedActiveIndex = localStorage.getItem('activeIndex');

        if (savedTabs) {
          tabsStore.openTabs = JSON.parse(savedTabs);
        }

        if (savedActiveIndex) {
          tabsStore.setActiveIndex(savedActiveIndex);
          router.push(savedActiveIndex); // 路由跳转到最后激活的标签
        }
      });
      
      // 计算属性：获取打开的标签页
      const openTabs = computed(() => tabsStore.openTabs);
      console.log('Tagbar里的openTabs:',openTabs.value);
      // 计算属性：获取当前激活的标签页路由
      const activeTab = computed({
        get() {
          return tabsStore.activeIndex;
        },
        set(value) {
          tabsStore.setActiveIndex(value); // 更新 store 中的 activeIndex
        }
      });
      
      // 处理标签点击事件，实现路由切换
      const handleTabClick = (tab) => {
        console.log('点击当前tab:', tab); // 打印出整个tab对象看看
        const routeName = tab.paneName; // 从 `paneName` 中获取路由地址
        console.log('routeName:',routeName);
        
        if (routeName) {
          tabsStore.setActiveIndex(routeName); // 设置当前激活的标签
          router.push(routeName); // 路由切换
        } else {
          console.error('Tab name is undefined or invalid:', tab);
        }
      };


const handleTabRemove = (targetName) => {
  tabsStore.removeTab(targetName); // 删除标签
  const { openTabs, activeIndex } = tabsStore;
  
  // 确保删除后自动切换到最后一个标签或上一个标签
  if (activeIndex !== targetName) {
    router.push(activeIndex); // 跳转到当前激活的标签
  } else if (openTabs.length > 0) {
    router.push(openTabs[openTabs.length - 1].route); // 跳转到最后一个标签
  } else {
    router.push('/'); // 所有标签被移除后跳转首页
  }
};

      
// 监听路由变化，动态更新当前选中的标签
watch(
  () => router.currentRoute.value.path,
  (newPath) => {
    tabsStore.setActiveIndex(newPath); // 路由变化时更新 activeIndex
  }
);
</script>

<style scoped>
:deep(.el-tabs__header){
  margin-bottom: 0px;
}
</style>
      