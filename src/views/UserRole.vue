<template>
<el-row :gutter="20">
        <!-- 左列部分 -->
    <el-col :span="4"  style="background-color: white;">
        <div class="grid-content ep-bg-purple">
                <div class="el-col-leftbox">
                        <el-input
                        v-model="inputValue"
                        style="width: 240px"
                        placeholder="Please Input"
                        :prefix-icon="Search"
                        />

                        <el-tree
                        :data="treeData"
                        node-key="id"
                        :props="defaultProps"
                        highlight-current
                        default-expand-all
                        @node-click="handleNodeClick">
                        </el-tree>
                </div>
               
        </div>
</el-col>
        <!-- 右列部分 -->
    <el-col :span="20" >
        <div class="grid-content ep-bg-purple" >
                <CommonTable
                :tableData="tableData"
                :loading="loading"
                :total="total"
                :pageSize="pageSize"
                :currentPage="currentPage"
                @sort-change="handleSortChange"
                @selection-change="handleSelectionChange"
                 @fetchData="fetchTableData"
                >

                <!-- 自定义表格列 -->
                <template #columns="{ tableData }">
                        <el-table-column type="selection" width="55"></el-table-column>

                        <el-table-column prop="id" label="序号" width="120"></el-table-column>
                        <el-table-column prop="username" label="用户" width="80"></el-table-column>
                        <el-table-column prop="email" label="邮箱" width="200"></el-table-column>
                        <el-table-column prop="created_at" label="创建时间" width="400"></el-table-column>
                        <el-table-column prop="role" label="用户权限"></el-table-column>
                        <el-table-column label="操作" width="150">
                                <template #default="{ row }">
                                <el-button @click="handleEdit(row)" type="primary">编辑</el-button>
                                </template>
                        </el-table-column>
                </template>

                </CommonTable>
        </div>
    </el-col>
  </el-row>
</template>

<script setup>
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import CommonTable from '../components/Table.vue';
import { getrole } from '../api/user';


const tableData = ref([]);
const loading = ref(false);
const total = ref(100);
const pageSize = ref(10);
const currentPage = ref(1);
const inputValue = ref('')
// 获取表格数据
const fetchTableData = async (page = 1) => {
  try {
    const response = await getrole(page,pageSize.value);
    tableData.value = response.data;
    total.value = response.total;
    currentPage.value = page;
  } catch (error) {
    console.error('获取数据失败', error);
  }
};

// 排序事件处理
const handleSortChange = (sort) => {
  console.log('排序:', sort);
  fetchTableData();
};

// 行选择事件处理
const handleSelectionChange = (selection) => {
  console.log('选中行:', selection);
};

// 编辑按钮点击事件
const handleEdit = (row) => {
  console.log('编辑:', row);
};

fetchTableData();

const treeData = ref([
  {
    id: 1,
    label: '奇讯科技',
    children: [
      {
        id: 2,
        label: '深圳总公司',
        children: [
          { id: 3, label: '测试部门' }
        ]
      },
      { id: 4, label: '长沙分公司' }
    ]
  }
]);

const defaultProps = ref({
  children: 'children',
  label: 'label'
});

const handleNodeClick = (data) => {
  console.log('节点点击', data);
};
</script>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  border: rgb(228, 231, 237),2px,solid;
  min-height: 36px;
  display: flex;
  justify-content: center;
  background-color: white;
}
.el-col-leftbox{
        padding-top: 30px;
        background-color: white;
}
</style>