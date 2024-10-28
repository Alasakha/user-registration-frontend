<template>
        <div>
          <h1>管理页面</h1>
          <!-- 在 manage 页面内嵌 <router-view> 用于显示子路由 -->
          <transition name="fade">
            <router-view v-slot="{ Component }">
              <component :is="Component" :key="$route.fullPath" />
            </router-view>
          </transition>
        </div>
      </template>


<style>
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
}</style>