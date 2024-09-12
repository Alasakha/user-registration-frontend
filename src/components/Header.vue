<template>
        <div class="toolbar" >
          <span >用户名: {{ userInfo?.username}}</span>
          <el-dropdown>
            <el-icon style="margin-right: 8px; margin-top: 1px"><setting /></el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click='handleLogout'>取消登录</el-dropdown-item>
                <el-dropdown-item>添加</el-dropdown-item>
                <el-dropdown-item>删除</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
<div class="tag_box">


</div>
  </template>
      
<script setup>
import { computed ,ref} from 'vue'
import { useAuthStore } from '../stores/auth'
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router'
const authStore = useAuthStore()
const {userInfo} = storeToRefs(authStore)
const router = useRouter()

// 定义登出处理函数
function handleLogout() {
  authStore.logout();
}



</script>


<style>

</style>