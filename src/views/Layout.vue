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
        <el-main>
          <!-- 使用 v-slot 来获取路由组件 -->
          <router-view v-slot="{ Component }">
            <!-- 将动态路由组件包裹在 <transition> 中 -->
            <transition name="fade">
              <component :is="Component" :key="$route.fullPath" />
            </transition>
          </router-view>
          main
        </el-main>
        <el-footer>
          <button @click="handleLogout">Logout</button>
        </el-footer>
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
