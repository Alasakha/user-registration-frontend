import { defineStore } from 'pinia';
import { reactive, ref,nextTick } from 'vue';
import { getMenu } from '../api/menu';

export const useMenuStore = defineStore('menu', () => {
  const menuData = reactive([]); // 使用 ref([]) 定义响应式菜单数据

  // 获取菜单数据
  const fetchMenuData = async () => {
    try {
      const response = await getMenu(); // 异步获取菜单数据
       // 确保响应数据更新
    menuData.splice(0, menuData.length, ...response.data);
    await nextTick();  // 等待视图更新完成
      console.log('menuData updated:', menuData.value); // 打印确认
    } catch (error) {
      console.error('获取菜单数据失败:', error);
    }
  };

  // 手动设置菜单数据
  const setMenuData = (data) => {
    menuData.value = data; // 替换菜单数据
  };

  return { menuData, setMenuData, fetchMenuData };
});