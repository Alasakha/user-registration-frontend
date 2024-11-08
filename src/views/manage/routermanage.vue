<template>
        <el-table :data="menuData" style="width: 100%" 
        row-key="id"
      border
      default-expand-all>

          <el-table-column property="name" label="Name" width="120" />

          <el-table-column property="path" label="路径地址" />
        </el-table>
</template>


<script lang="ts" setup>
import { onMounted , ref} from 'vue';
import axios from 'axios';
import { ElTable } from 'element-plus'
import { getMenu } from '../../api/menu';

const menuData =ref()

interface User {
  date: string
  name: string
  address: string
}

onMounted(() => {
  getMenuInfo()
})

const getMenuInfo = async() => {
  try {
    const response = await getMenu();
    menuData.value = response.data; // 确保 `response.data` 格式符合 `MenuData[]`
    console.log("menuData.value:", menuData.value);
  } catch (error) {
    console.error('获取菜单数据失败:', error);
  }
};



</script>