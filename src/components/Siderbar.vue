<template>
        <el-row class="tac">
          <el-col >
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
      
      <el-menu-item index="/home">
          <el-icon><setting /></el-icon>
          <span>首页</span>
        </el-menu-item>
       

        <el-sub-menu index="1">
          <template #title>
            <el-icon><location /></el-icon>
            <span>管理</span>
          </template>
          <el-menu-item-group title="Group One">
            <el-menu-item index="/home/register">注册账号</el-menu-item>
            <el-menu-item index="1-2">取消登录</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="Group Two">
            <el-menu-item index="1-3">item three</el-menu-item>
          </el-menu-item-group>
          <el-sub-menu index="1-4">
            <template #title>item four</template>
            <el-menu-item index="1-4-1">item one</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
        <el-menu-item index="2">
          <el-icon><icon-menu /></el-icon>
          <span>Navigator Two</span>
        </el-menu-item>
        <el-menu-item index="3" disabled>
          <el-icon><document /></el-icon>
          <span>Navigator Three</span>
        </el-menu-item>

      </el-menu>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>


