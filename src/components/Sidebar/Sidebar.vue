<template>
  <div class="sidebar">
    <SidebarItem
      v-for="menu in menuStore.menuData"
      :key="menu.id"
      :menu="menu"
    />
  </div>
</template>

<script setup>
import { ref, onMounted,watch } from 'vue'
import SidebarItem from './SidebarItem.vue'
import { useMenuStore } from '../../stores/menu';
import { getMenu } from '../../api/menu';

// 获取 Pinia store
const menuStore = useMenuStore();

// 在组件挂载时调用获取菜单数据的函数
onMounted(async () => {
  await menuStore.fetchMenuData();  // 确保异步请求完成
});


</script>

<style scoped>
.sidebar {
  width: 200px;
  background-color: #333;
  color: #fff;
}
</style>
