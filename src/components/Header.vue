<template>
        <div class="toolbar" >
          <span >用户名: {{ userInfo?.username}}</span>
          <el-dropdown>
            <el-icon style="margin-right: 8px; margin-top: 1px"><setting /></el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click='handleLogout'>取消登录</el-dropdown-item>
                <el-dropdown-item @click="handleCommand('/userinfo')">个人中心</el-dropdown-item>
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
import { useTabsStore } from '../stores/tabs';
const authStore = useAuthStore()
const {userInfo} = storeToRefs(authStore)
const router = useRouter()


// 定义登出处理函数
function handleLogout() {
  authStore.logout();
}

// 处理路由跳转和标签页管理
function handleCommand(path) {
  // 路由跳转
  router.push(path);

  // 添加标签页
  tabsStore.addTab({ route: path, name: path });
  tabsStore.setActiveIndex(path);

  // 保存到 localStorage
  localStorage.setItem('tabs', JSON.stringify(tabsStore.openTabs));
  localStorage.setItem('activeIndex', path);
}
</script>


<style>

</style>