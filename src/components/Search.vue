<template>
        <div class="search_box">
            <div class="block">
                <span>用户名</span>
                <el-input
                v-model="searchQuery"
                placeholder="搜索..."
                clearable
                @click="handleSearch"
                >
                </el-input>
            </div>
            <el-button type="primary" @click="handleSearch" style="margin-left: 30px;"> <el-icon style="margin-right: 4px;"><Search /></el-icon>搜索</el-button>
            <el-button @click="handleClear"><el-icon><Refresh /></el-icon>重置</el-button>
            <el-button type="success"><el-icon><Upload /></el-icon>新增用户</el-button>
        </div>
        

 
                
      </template>
      
      <script setup>
      import { ref, defineEmits } from 'vue'
      
      const searchQuery = ref('')
      const emit = defineEmits(['search'])
      
      // 触发搜索
      const handleSearch = () => {
        emit('search', searchQuery.value) // 触发父组件的搜索事件
      }

      
      // 清空搜索
      const handleClear = () => {
        searchQuery.value = ''
        emit('search', '')  // 触发父组件的搜索事件，传递空字符串
      }
      </script>


<style lang="scss" scoped>
.block{
        display:flex;
        justify-content: center;
        align-items: center;
        width: 300px;
        height: 80px;
        span{
                width: 60px;
                font-family: '微软雅黑';
                font-size: 14px;
        }
}
.search_box{
display: flex;
align-items: center;
}
</style>