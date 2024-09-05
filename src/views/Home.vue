<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">    <Asidebar></Asidebar>        </el-aside>
      <el-container>
        <el-header style="text-align: right; font-size: 12px"><Header></Header></el-header>
        <el-main><router-view />main</el-main>
        <el-footer><button @click="handleLogout"></button></el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import Asidebar from '../components/Siderbar.vue'
import Header from '../components/Header.vue'
import { useAuthStore } from '../stores/auth';

const authStore = useAuthStore();

    // 定义登出处理函数
    function handleLogout() {
      authStore.logout();
    }
</script>


<style scoped lang="scss">

.el-container{
  height: 100vh;
}

.el-aside{
  background-color: #545c64;
}

.el-header{
  height: 30px;
  display: flex;
  align-items: center;
  background-color: #c8c9cc;
}
</style>