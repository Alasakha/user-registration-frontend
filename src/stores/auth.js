// stores/auth.js
import { defineStore } from 'pinia';
import { ref  ,watch} from 'vue';
import { useRouter } from 'vue-router';

export const useAuthStore = defineStore('auth', () => {
  const token = ref(null);
  const router = useRouter();
  // 将 userInfo 的初始值设为一个空对象
  const userInfo = ref(null)

  // 设置 Token 并存储在 localStorage 中
  function setToken(newToken) {
    token.value = newToken;
    localStorage.setItem('token', newToken);
  }

  // 清除 Token 并重定向到登录页面
  function logout() {
    token.value = null;
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    router.push('/login');
  }

  // 检查是否已登录
  function isAuthenticated() {
    return !!token.value || !!localStorage.getItem('token');
  }

 // 设置用户信息
const setUser = (user) => {
  userInfo.value = user;
  localStorage.setItem('userInfo', JSON.stringify(user));
}
// 在 store 定义中
watch(userInfo, (newVal) => {
  console.log('userInfo 已更新:', newVal);
});


  // 初始化时尝试从 localStorage 中加载 Token
  if (localStorage.getItem('token')) {
    token.value = localStorage.getItem('token');
  }
  // 初始化时尝试从 localStorage 中加载用户信息
if (localStorage.getItem('userInfo')) {
  userInfo.value = JSON.parse(localStorage.getItem('userInfo'));
}

  return { token, setToken, logout, isAuthenticated,userInfo,
    setUser,};
});
