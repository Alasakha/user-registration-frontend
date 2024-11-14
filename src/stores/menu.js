// stores/auth.js
import { defineStore } from 'pinia';
import { ref  ,watch} from 'vue';
import { useRouter } from 'vue-router';
import { getMenu } from '../api/menu';
export const useMenuStore = defineStore('menu', () => {
        const menuData = ref([]);  // 响应式菜单数据
        const response = getMenu()
        menuData.value = response.data
        console.log(menuData)

        const setMenuData = (data) => {
          menuData.value = data;
        };
      
        
        return { menuData, setMenuData };       
});
