// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import ItemOne from '../views/Register.vue'
import { useAuthStore } from '../stores/auth';


const routes = [
  { path: '/', redirect: '/home' },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true },
    children: [
      {
        path: 'register', // 子路由路径，相对于 /home
        name: 'Register',
        component: Register,
      },
]
    }
];


const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  try {
    const token = authStore.token;  // 从 store 中获取 token
    const isAuthenticated = token ? true : false;  // 根据是否有 token 判断用户是否已登录

    // 如果已经登录且试图访问登录页面，则重定向到 /home
    if (isAuthenticated && to.path === '/login') {
      next('/home');
    } 

    // 如果目标路由需要身份验证且用户未登录，则重定向到 /login
    else if (to.meta.requiresAuth && !isAuthenticated) {
      next('/login');
    } 
    // 如果已登录或者不需要身份验证，继续导航
    else {
      next();
    }
  } catch (error) {
    console.error('Authentication check failed', error);
    next('/login');
  }
});
export default router