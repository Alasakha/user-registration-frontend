<template>
  <el-menu
    v-model:active="activeIndex"
    class="el-menu-vertical-demo"
    background-color="#333"
    text-color="#fff"
  >
    <!-- 判断菜单类型 -->
    <el-menu-item
      v-if="menu.type === 0 && (!menu.children || menu.children.length === 0)"
      :index="menu.path"
      @click="handleClick(menu.path)"
    >
      <span>{{ menu.name }}</span>
    </el-menu-item>

    <el-sub-menu
      v-else-if="menu.type === 1 && menu.children && menu.children.length > 0"
      :index="menu.path"
    >
      <template #title>
        <span>{{ menu.name }}</span>
      </template>
      <SidebarItem
        v-for="child in menu.children"
        :key="child.id"
        :menu="child"
      />
    </el-sub-menu>

    <!-- 可选：按钮类型 -->
    <el-menu-item
      v-else-if="menu.type === 3"
      :index="menu.path"
      @click="handleClick(menu.path)"
    >
      <span>{{ menu.name }} (按钮)</span>
    </el-menu-item>
  </el-menu>
</template>

<script setup>
import { defineProps, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useTabsStore } from '../../stores/tabs'; // 引入 tabsStore
import SidebarItem from './SidebarItem.vue'; // 假设 SidebarItem 是递归组件

const tabsStore = useTabsStore(); // 初始化标签页存储
const router = useRouter();
const props = defineProps({
  menu: {
    type: Object,
    required: true
  }
});

const { menu } = props; // 解构 props 以便直接使用 menu
const activeIndex = ref(''); // 记录当前激活的菜单路径

// 处理点击事件
const handleClick = (path) => {
  activeIndex.value = path;  // 更新为当前点击的菜单路径

  if (menu.type !== 3) {  // 如果是菜单项
    tabsStore.addTab({ name: menu.name, route: menu.path });
    tabsStore.setActiveIndex(menu.path);
    router.push(menu.path).catch(err => {
      if (err.name !== 'NavigationDuplicated') {
        console.error('路由跳转错误:', err);
      }
    });
  }
};
</script>

<style scoped>
.el-menu {
  width: 200px; /* 调整菜单的宽度 */
}

.el-menu-item {
  padding: 10px 20px;   
  cursor: pointer;
  border-radius: 4px;
}

.el-sub-menu {
  /* margin-left: 20px; 给子菜单加一些左边距，分开目录和子菜单 */
}

.el-sub-menu .el-menu-item {
  margin-left: 20px;
}

.el-menu-item:hover, .el-sub-menu:hover {
  background-color: #444; /* 鼠标悬停时的背景色 */
}
</style>