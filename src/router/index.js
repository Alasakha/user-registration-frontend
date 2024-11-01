
// import { createRouter, createWebHistory } from 'vue-router'
// import { getMenu } from '../api/menu'

// // 静态基础路由
// const routes = [
//   { path: '/', redirect: '/home' },
//   { path: '/login', component: () => import('../views/Login.vue') },
//   { 
//     path: '/home', 
//      name: 'home',
//     component: () => import('../views/home.vue'), 
//     children: [] // 空的子路由，稍后添加动态路由
//   }
// ]

// // 动态导入 views 目录下所有的 .vue 文件
// const routeComponents = import.meta.glob('../views/**/*.vue')


// // 递归函数：将菜单树转换为路由数组
// function generateRoutes(menuTree) {
//   const routes =[]
//   menuTree.forEach(menu => {
//     const route = {
//       path: menu.path,
//       name: menu.name,
//       component: menu.children && menu.children.length > 0
//           ? () => import('../views/home.vue') // 作为一个容器组件，展开子菜单
//           : routeComponents[`../views${menu.path}.vue`] || routeComponents['../views/NotFound.vue']
//     }
//     console.log('当前路由列表:', router.getRoutes());
//     // 递归处理子菜单
//     if (menu.children && menu.children.length > 0) {
//       route.children = generateRoutes(menu.children);
//     }
//     routes.push(route);
//   });
//   console.log('routes:',routes)
//   return routes;
// }


// // 检查路由是否已存在
// function routeExists(path) {
//   console.log('router:', router.getRoutes());
//   console.log('path:', path);
//   console.log('routes',routes)
//   // 检查静态路由
//   const staticExists = routes.some(route => route.path === path);
//   console.log('staticExists:', staticExists);

//   // 检查动态路由
//   const dynamicExists = router.getRoutes().some(route => {
//     return route.path === path || (route.children && route.children.some(child => child.path === path));
//   });
//   console.log('dynamicExists:', dynamicExists);
  
//   return staticExists || dynamicExists;
// }

// // 获取菜单数据后，生成动态路由
// function setupDynamicRoutes(menuData) {
//   console.log('menuData:', menuData);
//   const dynamicRoutes = generateRoutes(menuData);
  
//   console.log('生成的动态路由:', dynamicRoutes); // 打印生成的动态路由

//   dynamicRoutes.forEach(route => {
//     // 添加父路由
//     if (!routeExists(route.path)) {
//       console.log(`添加路由: ${route.path}`);
//       router.addRoute('home', route); // 使用 'home' 作为父路由

//       // 添加子路由
//       if (route.children) {
//         route.children.forEach(child => {
//           if (!routeExists(child.path)) {
//             console.log(`添加子路由: ${child.path}`);
//             router.addRoute(route.name, child); // 将子路由添加为 home 的子路由

//           } else {
//             console.log(`子路由已存在: ${child.path}`);
//           }
//         });
//       }
//     } else {
//       console.log(`路由已存在: ${route.path}`);
//     }
//   });

//   // 打印所有当前路由
//   console.log('当前路由列表:', router.getRoutes());
//   // 直接打印 home 路由的 children
//   const homeRoute = router.getRoutes().find(r => r.name === 'home');
//   console.log('home下的子路由:', homeRoute.children);
// }




// // 使用封装的 getMenu 方法获取菜单数据并设置动态路由
// getMenu()
//   .then(response => {
//     setupDynamicRoutes(response.data) // 假设 getMenu 返回的数据在 response.data 中
//   })
//   .catch(error => {
//     console.error('获取菜单数据失败:', error)
//   })


//   // 创建路由实例
// const router = createRouter({
//   history: createWebHistory(),
//   routes
// })
// console.log('routes:',routes)
import { createRouter, createWebHistory,createMemoryHistory } from 'vue-router'
import { getMenu } from '../api/menu'
import NotFound from '../views/NotFound.vue'

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/login', component: () => import('../views/Login.vue') },
  { 
    path: '/home', 
    name: 'home',
    component: () => import('../views/home.vue'), 
    children: [] 
  },

]

let menuLoaded = false

function flattenMenu(menuTree) {
  let flatMenu = []
  menuTree.forEach(menuItem => {
    flatMenu.push({
      name: menuItem.name,
      path: menuItem.path,
      component: menuItem.children && menuItem.children.length > 0
        ? () => import('../views/home.vue') 
        : () => import(`../views${menuItem.path}.vue`).catch(() => NotFound)
    })
    if (menuItem.children) {
      flatMenu = flatMenu.concat(flattenMenu(menuItem.children))
    }
  })
  return flatMenu
}

function loadMenu() {
  return getMenu().then(response => {
    const flatMenu = flattenMenu(response.data)
    const homeRoute = routes.find(route => route.path === '/home')
    if (homeRoute) {
      homeRoute.children.push(...flatMenu)
    }
    menuLoaded = true // 标记菜单加载完成
  })
}


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

history: createMemoryHistory(),
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




// router.beforeEach((to, from, next) => {
//   if (!menuLoaded) {
//     loadMenu().then(() => next(to.fullPath)) // 菜单加载完成后重新导航
//     console.log(routes);
//   } else {
//     next()
//   }
// })


export default router