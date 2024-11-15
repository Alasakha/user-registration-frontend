import { defineStore } from 'pinia';
import { ref,reactive } from 'vue';
import { getMenu } from '../api/menu';

export const useMenuStore = defineStore('menu', () => {
  const menuData = reactive([]);  // 响应式菜单数据

  // 获取菜单数据
  const fetchMenuData = async () => {
    try {
      const response = await getMenu();  // 异步获取菜单数据
      menuData = response.data;   // 更新菜单数据
      console.log('menuData updated:', menuData);  // 打印确认
    } catch (error) {
      console.error('获取菜单数据失败:', error);
    }
  };

  const setMenuData = (data) => {
    menuData = data;
  };

  // 暴露 menuData 和 fetchMenuData 方法
  return { menuData, setMenuData, fetchMenuData };
});