<!-- Dialog.vue -->
<template>
        <el-dialog :model-value="isOpen" @close="closeDialog" :title="title" width="40%">
                <div v-if="selectedRow">
                        <div class="search_box">
                            <div class="block">
                                <span>上级部门</span>
                                <el-cascader v-model="SelectedDepatment" :options=" departmentData"  style="width: 500px;"></el-cascader>
                            </div>
                            <div class="block">
                                <span>部门名称</span>
                                <el-input v-model="input" style="width: 240px" placeholder="Please input" />
                            </div>
                        </div>
                <p><strong>ID:</strong> {{ selectedRow.ID }}</p>
                <p><strong>年龄:</strong> {{ selectedRow.Name }}</p>
                </div>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="upload">Cancel</el-button>
              <el-button type="primary" @click="closeDialog">Confirm</el-button>
            </span>
          </template>
        </el-dialog>
      </template>
      
<script setup>
import { defineProps, defineEmits,onMounted,ref} from 'vue';
import { getdepart } from '../api/user';
const departmentData = ref([])
const SelectedDepatment = ref()
const input = ref('')
      const props = defineProps({
        isOpen: Boolean,
        title: String,
        selectedRow : Object
      });
      
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
const formatDepartmentData = (data) => {
  // 根据实际需要处理数据的格式
  return data.map(item => ({
    label: item.Name,
    value: item.Name,
    children: item.Children ? formatDepartmentData(item.Children) : [],
  }));
};


const emit = defineEmits(['update:isOpen']);

const closeDialog = () => {
  emit('update:isOpen', false);
};
 const upload = () =>{
        console.log(SelectedDepatment.value);
        
 }
onMounted(()=>{
  getdepartment()
})
</script>
      
      <style scoped lang="scss">
      .dialog-footer {
        text-align: right;
      }
      .block{
        display:flex;
        justify-content: start;
        align-items: center;
        width: 600px;
        height: 80px;
        span{
                width: 70px;
                font-family: '微软雅黑';
                font-size: 14px;
        }
}
.search_box{
display: flex;
align-items: center;
flex-wrap: wrap;
justify-content: center;

}
</style>
      