<template>
<el-row :gutter="20">
        <!-- 左列部分 -->
    <el-col :span="4"  style="background-color: white;">
        <div class="grid-content ep-bg-purple">
                <div class="el-col-leftbox" >
                        <el-input
                        v-model="inputValue"
                        style="width: 240px"
                        placeholder="Please Input"
                        :prefix-icon="Search"
                        />

                        <el-tree
                          ref="treeRef"
                          style="max-width: 600px"
                          class="filter-tree"
                          :data="departmentData"
                          default-expand-all
                          :filter-node-method="filterNode"
                          @node-click="handleNodeClick"
                        />
                </div>
               
        </div>
</el-col>
        <!-- 右列部分 -->
    <el-col :span="20" >
        <div class="grid-content ep-bg-purple" >
          
            <div class="right_content_box" >
                <SearchComponent @search="handleSearch" />

                <CommonTable
                :tableData="filteredTableData"
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
                        <el-table-column prop="username" label="用户" width="90"></el-table-column>
                        <el-table-column prop="department" label="部门" width="80"></el-table-column>
                        <el-table-column prop="position" label="岗位" width="130"></el-table-column>
                        <el-table-column prop="email" label="邮箱" width="200"></el-table-column>
                        <el-table-column prop="created_at" label="创建时间" width="200">
                          <template #default="{ row }">
                            <span>{{ formatDate(row.created_at) }}</span>
                          </template>
                        </el-table-column>
                        <el-table-column prop="role" label="用户权限" width="100"></el-table-column>
                        <el-table-column label="操作" width="100">
                                <template #default="{ row }">
                                <el-button @click="handleEdit(row)" type="primary">编辑</el-button>
                                </template>
                        </el-table-column>
                </template>

                </CommonTable>
            </div>
               
    
 


                
        </div>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { ref ,computed, onMounted} from 'vue'
import { Search } from '@element-plus/icons-vue'
import CommonTable from '../../components/Table.vue';
import { getrole,getdepart } from '../../api/user';
import {  watch } from 'vue'
import { ElTree } from 'element-plus'
import SearchComponent from '../../components/Search.vue'
const tableData = ref([]);
const departmentData= ref([])
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
    console.log(tableData.value);
    total.value = response.total;
    currentPage.value = page;
  } catch (error) {
    console.error('获取数据失败', error);
  }
};

const mapDepartmentData = (data) => {
  return data.map(item => ({
    id: item.ID,
    label: item.Name,
    children: item.Children ? mapDepartmentData(item.Children) : []
  }));
};

const getdepartment = async () => {
  try {
    const response = await getdepart();
    departmentData.value = mapDepartmentData(response.data);
    console.log(departmentData.value);
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

onMounted(()=>{
  fetchTableData();
getdepartment()
})


const selectedDepartmentId = ref()
// 处理树节点点击事件
const handleNodeClick = (node: any) => {
  console.log("node:",node);
  
  selectedDepartmentId.value = node.label;
  console.log("selectedDepartmentId:",selectedDepartmentId.value);
  
};



const filterNode = (value: string, data: Tree) => {
  if (!value) return true
  return data.label.includes(value)
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
};
// 根据选中的部门ID和搜索条件筛选表格数据
const filteredTableData = computed(() => {
  let filteredData = tableData.value;

  // 如果有选中的部门，先根据部门筛选
  if (selectedDepartmentId.value) {
    filteredData = filteredData.filter(item => item.department === selectedDepartmentId.value);
  }

  // 如果有搜索条件，再根据用户名进一步筛选
  if (searchQuery.value) {
    filteredData = filteredData.filter(item => 
      item.username.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }
  
  // 更新 total 值
  total.value = filteredData.length;

  return filteredData;
});

const searchQuery = ref('')
// 监听来自搜索组件的搜索事件
const handleSearch = (query) => {
  searchQuery.value = query;
  
  // 如果搜索条件为空字符串，恢复到默认数据集
  if (query === '') {
    fetchTableData();  // 重新获取完整的表格数据
  } else {
    // 进行搜索过滤
    filteredTableData.value = tableData.value.filter(item => 
      item.username.toLowerCase().includes(query.toLowerCase())
    );
  }
}



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