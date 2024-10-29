import { createRouter, createWebHistory } from 'vue-router'
import { getMenu } from '../api/menu' // 引入封装好的 getMenu 请求方法

// 静态基础路由
const routes = [
  { path: '/',name:'home', redirect: '/home' },
  { path: '/login', component: () => import('../views/Login.vue') },
  { 
    path: '/home', 
    component: () => import('../views/home.vue'), 
    children: [] // 空的子路由，稍后添加动态路由
  }
]

// 动态导入 views 目录下所有的 .vue 文件
const routeComponents = import.meta.glob('../views/**/*.vue')

// 递归函数：将菜单树转换为路由数组
function generateRoutes(menuTree) {
const routes = []
menuTree.forEach(menu => {
    const route = {
        path: menu.path,
        name: menu.name,
        component: menu.children && menu.children.length > 0
            ? () => import('../views/home.vue') // 作为一个容器组件，展开子菜单
            : routeComponents[`../views${menu.path}.vue`] || routeComponents['../views/NotFound.vue']
    }
    if (menu.children && menu.children.length > 0) {
        route.children = generateRoutes(menu.children) // 递归处理子菜单
    }
    routes.push(route)
})
return routes
}

// 获取菜单数据后，生成动态路由
function setupDynamicRoutes(menuData) {
const dynamicRoutes = generateRoutes(menuData);

// 将动态路由添加到 '/home' 下
dynamicRoutes.forEach(route => {
    router.addRoute('home', route); // 通过指定父级 `home`，让所有动态路由都在 Layout 组件内
});
}

// 创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes
})

// 使用封装的 getMenu 方法获取菜单数据并设置动态路由
getMenu()
  .then(response => {
      console.log(response)
      setupDynamicRoutes(response.data) // 假设 getMenu 返回的数据在 response.data 中
  })
  .catch(error => {
      console.error('获取菜单数据失败:', error)
  })

export default router