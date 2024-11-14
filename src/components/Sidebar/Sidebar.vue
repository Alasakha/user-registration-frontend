<template>
  <div class="sidebar">
    <SidebarItem
      v-for="menu in menuData"
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

// 定义响应式的菜单数据
const menuData = ref([]);
// 获取菜单数据
const fetchMenuData = async () => {
  try {
    const response = await getMenu();  // 发起 API 请求
    menuStore.setMenuData(response.data);  // 更新 Pinia 中的菜单数据
    menuData.value = menuStore.menuData
  } catch (error) {
    console.error('获取菜单数据失败:', error);
  }
};

// 在组件挂载时调用获取菜单数据的函数
onMounted(() => {
  fetchMenuData();  // 获取菜单数据
});

watch(() => menuStore.menuData, (newData) => {
  // 数据变化时可以做一些处理，确保界面更新
  fetchMenuData()
});
</script>

<style scoped>
.sidebar {
  width: 200px;
  background-color: #333;
  color: #fff;
}
</style>
