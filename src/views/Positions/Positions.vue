<template >

 <el-table
      :data="departmentData"
      style="width: 100%; margin-bottom: 20px"
      row-key="Name"
      border
      default-expand-all
    >
      <el-table-column prop="Name" label="Name"  width="150"/>
      <el-table-column prop="CreateAt" label="创建时间" sortable :formatter="formatCreateAt" ></el-table-column>
      <el-table-column prop="SortOrder" label="SortOrder" sortable  />
      <el-table-column prop="Status" label="Status">
      <template v-slot="scope">
        <el-tag :type="getTagType(scope.row.Status)">
          {{ scope.row.Status }}
        </el-tag>
      </template>
    </el-table-column>
    <el-table-column fixed="right" label="Operations" min-width="120">
      <template #default="scope">
        <el-button link type="primary" size="small" @click="openDialog(scope.row)">增加</el-button>
        <el-button link type="primary" size="small">修改</el-button>
        <el-button link type="primary" size="small">删除</el-button>
      </template>
    </el-table-column>

    </el-table>
    
  
  <Dialog
  v-model:isOpen="isDialogOpen" 
  title="增加部门数据"
  :selectedRow="rowvalue"
  :departmentData="departmentData">
    <p>This is custom content inside the dialog.</p>
  </Dialog>

</template>


<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getdepart } from '../../api/user';
import Dialog from '../../components/DialogForm.vue';
const departmentData = ref([]);



const getdepartment = async () => {
  try {
    const response = await getdepart();
    departmentData.value = formatDepartmentData(response.data);
    console.log(departmentData.value);
  } catch (error) {
    console.error('获取数据失败', error);
  }
};

// 格式化部门数据以适应树形结构
const formatDepartmentData = (data: any[]) => {
  // 根据实际需要处理数据的格式
  return data.map(item => ({
    ID: item.ID,
    Name: item.Name,
    CreateAt: item.CreatedAt, 
    SortOrder: item.SortOrder,
    Status: item.Status,
    children: item.Children ? formatDepartmentData(item.Children) : [],
  }));
};
//判断标签颜色
const getTagType = (status) => {
  if (status === 'enabled') {
    return 'success';
  } else if (status === 'disabled') {
    return 'info';
  } 
};

onMounted(() => {
  getdepartment();
});

const isDialogOpen = ref(false); // 管理对话框的显示状态
const rowvalue =ref()
const SelectedDepatment = ref()
const openDialog = (value) => {
  console.log(value);
  SelectedDepatment.value = [value.ID, value.Name];  // 假设 CompanyID 和 ParentID 是层级
  console.log('SelectedDepatment:',SelectedDepatment.value);
  
  rowvalue.value = value
  isDialogOpen.value = true; // 打开对话框
};

// 格式化日期的函数
const formatDate = (dateString: string): string => {
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

// 格式化列数据的函数
const formatCreateAt = (row: any, column: any, cellValue: string) => {
  return formatDate(cellValue);
};
</script>


<style scoped lang="scss">


</style>
        