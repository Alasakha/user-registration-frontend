<template>
  <el-row class="tac">
    <el-col>
      <h3 class="mb-2" style="margin-left: 60px;">炊大王</h3>
      <el-menu
        router
        :default-active="$route.path"
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="el-menu-vertical-demo"
        text-color="#fff"
        @open="handleOpen"
        @close="handleClose"
      >
        <!-- 动态生成菜单项 -->
        <template v-for="(item, index) in menuItems">
          <el-sub-menu
            v-if="item.children && item.children.length > 0"
            :key="'submenu-' + index"
            :index="item.path"
          >
            <template #title>
              <el-icon>
                <component :is="getIconComponent(item.icon)" />
              </el-icon>
              <span>{{ item.label }}</span>
            </template>
            <!-- 二级菜单项 -->
            <el-menu-item
              v-for="(child, childIndex) in item.children"
              :key="'submenu-item-' + childIndex"
              :index="child.path"
            >
              <el-icon>
                <component :is="getIconComponent(child.icon)" />
              </el-icon>
              <span>{{ child.label }}</span>
            </el-menu-item>
          </el-sub-menu>
          <el-menu-item
            v-else
            :key="'menu-item-' + index"
            :index="item.path"
          >
            <el-icon>
              <component :is="getIconComponent(item.icon)" />
            </el-icon>
            <span>{{ item.label }}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { getmenu } from '../api/menu';
import { Setting, Location } from '@element-plus/icons-vue';

const menuItems = ref([]);

// 映射图标函数
const getIconComponent = (iconName: string) => {
  const icons: { [key: string]: any } = {
    setting: Setting,
    location: Location,
  };
  return icons[iconName] || Setting;
};

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};

onMounted(() => {
  getmenu()
    .then(response => {
      console.log(response);
      menuItems.value = response.data;
      console.log(menuItems);
    });
});
</script>

<style>
/* 自定义样式（如果需要） */
</style>
