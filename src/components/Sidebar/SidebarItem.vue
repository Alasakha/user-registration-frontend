<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-vertical-demo"
    background-color="#333"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <el-menu-item
      v-if="!menu.children || menu.children.length === 0"
      :index="menu.path"
      @click="handleClick"
    >
      <span>{{ menu.name }}</span>
    </el-menu-item>

    <el-submenu v-else :index="menu.path">
      <template #title>
        <span>{{ menu.name }}</span>
      </template>
      <SidebarItem
        v-for="child in menu.children"
        :key="child.id"
        :menu="child"
      />
    </el-submenu>
  </el-menu>
</template>

<script setup>
import { defineProps, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useTabsStore } from '../../stores/tabs' // 引入 tabsStore
import SidebarItem from './SidebarItem.vue' // 假设 SidebarItem 是递归组件

const tabsStore = useTabsStore() // 初始化标签页存储
const router = useRouter()
const props = defineProps({
  menu: {
    type: Object,
    required: true
  }
})

const { menu } = props // 解构 props 以便直接使用 menu
const activeIndex = ref('') // 记录当前激活的菜单路径

// 处理点击事件
const handleClick = () => {
  if (!menu.children || menu.children.length === 0) {
    // 没有子菜单时，添加标签页并跳转

    // 1. 添加标签页
    tabsStore.addTab({ name: menu.name, route: menu.path })

    // 2. 设置当前激活标签页
    tabsStore.setActiveIndex(menu.path)
    activeIndex.value = menu.path

    // 3. 跳转到指定路径
    router.push(menu.path).catch(err => {
      if (err.name !== 'NavigationDuplicated') {
        console.error('路由跳转错误:', err)
      }
    })
  }
}
</script>

<style scoped>
.el-menu {
  width: 100%;
}
.el-menu-item {
  padding: 10px;
  cursor: pointer;
}
</style>
