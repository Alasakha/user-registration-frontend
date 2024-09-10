<!-- src/App.vue -->
<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from './stores/auth';
import axios from 'axios';

const authStore = useAuthStore();
const router = useRouter();
onMounted(async () => {
  if (authStore.isAuthenticated()) {
    try {
      const response = await axios.get('http://localhost:8080/user/info', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      authStore.setUser(response.data);
    } catch (error) {
      console.error('Error fetching user info on page load:', error);
      authStore.logout(); // 如果token失效，清除登录状态并跳转到登录页面
    }
  }
});
</script>

<template>
  <div id="app">
    
    <router-view></router-view>
    </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}


</style>
