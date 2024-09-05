<template>
        <div class="toolbar" >
          <span >用户名: {{ userInfo?.username}}</span>
          <el-dropdown>
            <el-icon style="margin-right: 8px; margin-top: 1px"><setting /></el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>查看</el-dropdown-item>
                <el-dropdown-item>添加</el-dropdown-item>
                <el-dropdown-item>删除</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </template>
      
      <script setup>
      import { computed } from 'vue'
      import { useAuthStore } from '../stores/auth'
      import { storeToRefs } from 'pinia';
      const authStore = useAuthStore()
      const {userInfo} = storeToRefs(authStore)

      
//       // 从 Pinia 获取用户信息
//       const userInfo = computed(() => authStore.userInfo)
//       console.log(userInfo);
      
      console.log('User Info in Header:', userInfo.value);  // 调试输出
      </script>