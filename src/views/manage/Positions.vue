<template>
  <el-table
    :data="departmentData"
    style="width: 100%; margin-bottom: 20px"
    row-key="Name"
    border
    default-expand-all
  >
    <el-table-column prop="Name" label="Name" width="150" />
    <el-table-column prop="CreateAt" label="创建时间" sortable :formatter="formatCreateAt"></el-table-column>
    <el-table-column prop="SortOrder" label="SortOrder" sortable />
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
        <el-button link type="primary" size="small" @click="confirmDelete(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

  <Dialog v-model:isOpen="isDialogOpen" title="增加部门数据" :selectedRow="rowvalue" :departmentData="departmentData">
    <p>This is custom content inside the dialog.</p>
  </Dialog>

  <el-dialog v-model="isDeleteOpen" title="提示" width="500" :before-close="handleClose">
    <span>是否删除此部门</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="handleDelete">确定</el-button>
        <el-button @click="isDeleteOpen = false">取消</el-button>
      </div>
    </template>
  </el-dialog>
</template>



<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getdepart } from '../../api/user';
import Dialog from '../../components/DialogForm.vue';
import { deleteDepartment } from '../../api/department';
import { ElMessage } from 'element-plus';

const departmentData = ref([]);
const isDeleteOpen = ref(false);
const isDialogOpen = ref(false);
const rowvalue = ref(null);
const selectedDepartment = ref(null);

// 获取部门数据
const getdepartment = async () => {
  try {
    const response = await getdepart();
    departmentData.value = formatDepartmentData(response.data);
  } catch (error) {
    console.error('获取数据失败', error);
  }
};

// 格式化部门数据以适应树形结构
const formatDepartmentData = (data) => {
  return data.map(item => ({
    ID: item.ID,
    Name: item.Name,
    CreateAt: item.CreatedAt,
    SortOrder: item.SortOrder,
    Status: item.Status,
    children: item.Children ? formatDepartmentData(item.Children) : [],
  }));
};

// 格式化日期
const formatDate = (dateString) => {
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

const formatCreateAt = (row, column, cellValue) => {
  return formatDate(cellValue);
};

// 判断标签颜色
const getTagType = (status) => {
  if (status === 'enabled') {
    return 'success';
  } else if (status === 'disabled') {
    return 'info';
  }
};

// 打开增加对话框
const openDialog = (value) => {
  selectedDepartment.value = [value.ID, value.Name];
  rowvalue.value = value;
  isDialogOpen.value = true;
};

// 删除确认框
const confirmDelete = (row) => {
  console.log(row);
  
  selectedDepartment.value = row; // 记录当前要删除的行
  isDeleteOpen.value = true; // 打开删除确认对话框
};

// 确认删除
const handleDelete = async () => {
  try {
    await deleteDepartment(selectedDepartment.value.ID); // 调用删除接口
    ElMessage.success('删除成功');
    // 从前端表格中移除该项
    await getdepartment()
    isDeleteOpen.value = false; // 关闭对话框
  } catch (error) {
    ElMessage.error('删除失败');
    console.error("Error deleting department:", error);
  }
};

onMounted(() => {
  getdepartment()
});

const handleClose = (done: () => void) => {
  ElMessageBox.confirm('Are you sure to close this dialog?')
    .then(() => {
      done()
    })
    .catch(() => {
      // catch error
    })}
</script>



<style scoped lang="scss">


</style>
        