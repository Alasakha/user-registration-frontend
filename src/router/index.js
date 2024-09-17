// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

import { useAuthStore } from '../stores/auth';


// router/index.js
const routes = [
  {
    path: '/',
    component: () => import('../views/Layout.vue'),
    // 重定向到仪表盘页面
    children: [
      {
        path: 'manage',
        componet:()=>import('../views/Manage.vue'),
        children: [
          {
            path:'register',
            component: () => import('../views/Register.vue'),
          },
          {
            path:'userrole',
            component: () => import('../views/UserRole.vue'),
          },
          {
            path:'positions',
            component: () => import('../views/Positions/Positions.vue'),
          }
        ]
      },

    ],
  },
  {
    path: '/login',
    component: () => import('../views/Login.vue'),
  },
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
      next('/');
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