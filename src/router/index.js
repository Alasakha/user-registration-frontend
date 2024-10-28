import { createRouter, createWebHistory } from 'vue-router'
import { getmenu } from '../api/menu' // 引入封装好的 getmenu 请求方法

// 示例基础路由
const routes = [
    { path: '/', redirect: '/home' },
    { path: '/login', component: () => import('../views/Login.vue') },
    { path: '/home', component: () => import('../views/Layout.vue') } // 添加 /home 路由
]

// 递归函数：将菜单树转换为路由数组
function generateRoutes(menuTree) {
    const routes = []
    menuTree.forEach(menu => {
        const route = {
            path: menu.path,
            name: menu.name,
            component: () => import(`../views${menu.path}.vue`) // 假设视图文件路径与菜单路径一致
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
    const dynamicRoutes = generateRoutes(menuData)
    dynamicRoutes.forEach(route => {
        router.addRoute(route) // 将动态路由添加到路由实例中
    })
}

// 创建路由实例
const router = createRouter({
    history: createWebHistory(),
    routes
})

// 使用封装的 getmenu 方法获取菜单数据并设置动态路由
getmenu()
    .then(response => {
        setupDynamicRoutes(response.data) // 假设 getmenu 返回的数据在 response.data 中
    })
    .catch(error => {
        console.error('获取菜单数据失败:', error)
    })

export default router