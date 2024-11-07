<template>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column label="Date" width="120">
            <template #default="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column property="name" label="Name" width="120" />
          <el-table-column
            property="address"
            label="use show-overflow-tooltip"
            width="240"
            show-overflow-tooltip
          />
          <el-table-column property="address" label="address" />
        </el-table>
      </template>


<script lang="ts" setup>
import axios from 'axios';
import { ElTable } from 'element-plus'
import { getMenu } from '../../api/menu';


interface User {
  date: string
  name: string
  address: string
}

const getMenuInfo = () => ({
    
})
</script>