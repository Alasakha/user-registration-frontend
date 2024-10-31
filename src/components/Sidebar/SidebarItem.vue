<template>
  <div>
    <div class="menu-item" @click="handleClick">
      <span>{{ menu.name }}</span>
    </div>
    <div v-if="isOpen && menu.children" class="submenu">
      <SidebarItem
        v-for="child in menu.children"
        :key="child.id"
        :menu="child"
      />
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  menu: {
    type: Object,
    required: true
  }
})

const { menu } = props // 解构 props 以便直接使用 menu
const isOpen = ref(false)
const router = useRouter()

// 处理子菜单展开/收起
const toggleSubmenu = () => {
  isOpen.value = !isOpen.value
}

// 处理点击事件
const handleClick = () => {
  if (menu.children && menu.children.length > 0) {
    toggleSubmenu() // 展开或收起子菜单
  } else if (menu.path) {
    router.push(menu.path).catch(err => {
      if (err.name !== 'NavigationDuplicated') {
        console.error('路由跳转错误:', err)
      }
    })
  }
}
</script>

<style scoped>
.menu-item {
  padding: 10px;
  cursor: pointer; /* 鼠标指针样式 */
}
.submenu {
  padding-left: 20px;
  background-color: #444;
}
</style>


<style scoped>
.menu-item {
  padding: 10px;
}
.submenu {
  padding-left: 20px;
  background-color: #444;
}
</style>
