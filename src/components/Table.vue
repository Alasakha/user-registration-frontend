<!-- components/CommonTable.vue -->
<template>
        <div>
          <el-table
            :data="tableData"
            :loading="loading"
            border
            stripe
            @sort-change="handleSortChange"
            @selection-change="handleSelectionChange">
            
            <!-- 配置列，通过slots自定义列内容 -->
            <slot name="columns" :tableData="tableData"></slot>
      
          </el-table>
      
          <!-- 分页 -->
          <el-pagination
            v-if="pagination"
            background
            layout="total, prev, pager, next"
            :total="total"
            :page-size="pageSize"
            :current-page="currentPage"
            @current-change="handlePageChange"
            :disabled = "loading">
            
          </el-pagination>
        </div>
      </template>
      
      <script setup>
    import { ref, defineEmits } from 'vue';
      
      const props = defineProps({
        tableData: {
          type: Array,
          default: () => []
        },
        loading: {
          type: Boolean,
          default: false
        },
        pagination: {
          type: Boolean,
          default: true
        },
        total: {
          type: Number,
          default: 0
        },
        pageSize: {
          type: Number,
          default: 10
        },
        currentPage: {
          type: Number,
          default: 1
        }
      });
      
      // 向父组件传递事件
      const emit = defineEmits([ 'sort-change', 'selection-change','fetchData']);
      
      // 分页处理
      const handlePageChange = (page) => {
        // emit('update:currentPage', page);
        emit('fetchData', page); // 传递页码
      };
      
      // 排序处理
      const handleSortChange = (sort) => {
        emit('sort-change', sort);
      };
      
      // 选择行处理
      const handleSelectionChange = (selection) => {
        emit('selection-change', selection);
      };
      </script>
      