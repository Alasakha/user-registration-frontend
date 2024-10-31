<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <Asidebar></Asidebar>
      </el-aside>
      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <Header></Header>
        </el-header>
        <Tagbar></Tagbar>

        <el-main style="background-color: rgb(248, 248, 248);">
          <!-- 使用 router-view 来渲染路由组件 -->
          <router-view></router-view>
        </el-main>
        <el-footer>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>


<script setup>
import Asidebar from '../components/Sidebar/Sidebar.vue'
import Header from '../components/Header.vue'
import { useAuthStore } from '../stores/auth';
import Tagbar from '../components/Tagbar.vue'

const authStore = useAuthStore();

// 定义登出处理函数
function handleLogout() {
  authStore.logout();
}
</script>

<style scoped lang="scss">



.el-container {
  height: 100vh;
}

.el-aside {
  background-color: #545c64;
}

.el-header {
  height: 30px;
  display: flex;
  align-items: center;
  background-color: #c8c9cc;
}

/* 菜单的淡入淡出效果 */
.fade-enter-active, .fade-leave-active {
  transition-property: opacity, margin;
  transition-duration: 0.3s;
}
.fade-enter-active {
  transition-delay: 0.15s;
}
.fade-enter, .fade-leave-active {
  opacity: 0;
  margin-left: 50px;
}
</style>
