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
import { ref, onMounted } from 'vue'
import SidebarItem from './SidebarItem.vue'
import { getMenu } from '../../api/menu'

const menuData = ref([])

const fetchMenuData = async () => {
  try {
    const response = await getMenu()
    console.log('菜单数据:', response.data); // 调试输出
    menuData.value = response.data;
  } catch (error) {
    console.error('获取菜单数据失败:', error)
  }
}

onMounted(fetchMenuData)
</script>

<style scoped>
.sidebar {
  width: 200px;
  background-color: #333;
  color: #fff;
}
</style>
