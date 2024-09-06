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
        <el-menu-item
          v-for="(item, index) in menuItems"
          :key="index"
          :index="item.path"
        >
          <el-icon>
            <component :is="getIconComponent(item.icon)" />
          </el-icon>
          <span>{{ item.label }}</span>
        </el-menu-item>
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
    })
   
});
</script>