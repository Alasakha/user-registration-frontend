<!-- Dialog.vue -->
<template>
        <el-dialog :model-value="isOpen" @close="closeDialog" :title="title" width="40%">
                <div v-if="selectedRow">
                        <div class="search_box">
                            <div class="block">
                                <span>上级部门</span>
                                <el-cascader v-model=" SelectedDepatment" :props="cascaderProps" :options=" departmentData"  style="width: 500px;" 
                                :key="departmentData.length" 
                                clearable></el-cascader>
                            </div>
                            <div class="block">
                                <span>部门名称</span>
                                <el-input v-model="name" style="width: 240px" placeholder="Please input" />
                            </div>
                        </div>
                <p><strong>ID:</strong> {{ selectedRow.ID }}</p>
                <p><strong>年龄:</strong> {{ selectedRow.Name }}</p>
                </div>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="upload">Cancel</el-button>
              <el-button type="primary" @click="CreateDepartmentHandler">Confirm</el-button>
            </span>
          </template> 
        </el-dialog>

      </template>
      
<script setup>
import { defineProps, defineEmits,onMounted,ref,computed} from 'vue';
import { nextTick } from 'vue';
import { getdepart } from '../api/user';
import  {createDepartment}  from '../api/department';
import { cloneDeep } from 'lodash';
import { watch } from 'vue';


const departmentData = ref([])
const SelectedDepatment = ref()
const name = ref('')
const status = ref('enabled');
const cascaderProps = {
  checkStrictly: true,
}
      const props = defineProps({
        isOpen: Boolean,
        title: String,
        selectedRow : Object, // 接收传递过来的选中行数据
        departmentData:Array
      });

  // const LastDepartment = computed(() => {
  // const selectedIds = SelectedDepatment.value.map(depName => {
  // const department = departmentData.value.find(dep => dep.label === depName);
  // return department ? department.id : null;
  // });

  
//   return selectedIds[selectedIds.length - 1]; // 获取最后选中部门的 ID
// });



const findDepartmentByLabel = (departments, label) => {
  for (const department of departments) {
    if (department.label === label) {
      return department;
    }
    if (department.children && department.children.length > 0) {
      const result = findDepartmentByLabel(department.children, label);
      if (result) {
        return result;
      }
    }
  }
  return null;
};


const findCompanyByName = (departments, companyName) => {
  return departments.find(department => department.label === companyName);
};


const CreateDepartmentHandler = async () => {

  if (!SelectedDepatment.value || SelectedDepatment.value.length === 0) {
    console.error('请选择上级部门');
    return;
  } 

const CompanyName = SelectedDepatment.value[0]; // 获取选中的公司名称

const selectedCompany = findCompanyByName(departmentData.value, CompanyName); // 查找公司
const company_id = selectedCompany ? selectedCompany.id : null;

    // 获取最后选中的部门名称
    const selectedDepartmentNames = computed(() =>{
      
    return SelectedDepatment.value[SelectedDepatment.value.length - 1]
  })
  console.log('selectedDepartemnt:',selectedDepartmentNames.value);
  
 // 使用递归查找选中的部门
 const selectedParentDepartment = findDepartmentByLabel(departmentData.value, selectedDepartmentNames.value);
  console.log('selectedParentDepartment:', selectedParentDepartment.id);


  const payload = {
  name: name.value,
  company_id: company_id, // 确保这个值有效
  parent_id: selectedParentDepartment ? selectedParentDepartment.id : null,
  sort_order: 0, // 如果没有特定顺序，可以设置为 0
  };


  try {
    const data = await createDepartment(payload);
    console.log('部门创建成功:', data);
    // 创建成功后刷新部门数据
    await getdepartment(); // 获取最新的部门数据
    console.log('Updated departmentData after creation:', departmentData.value); // 确保数据更新
  // 等待 DOM 完成更新
  await nextTick();
  // 清空已选择的部门层级
  SelectedDepatment.value = [];
  name.value = ''; // 清空输入框
  } catch (error) {
    console.error('创建部门失败:', error);
  }
};

// 获取部门数据
const getdepartment = async () => {
  try {
    const response = await getdepart();
    departmentData.value = cloneDeep(formatDepartmentData(response.data));
    console.log('dapartmentData:',departmentData.value);
    
  } catch (error) {
    console.error('获取数据失败', error);
  }
};

// 格式化部门数据以适应树形结构
const formatDepartmentData = (data) => {
  return data.map(item => ({
    label: item.Name,
    value: item.Name,
    id: item.ID, // 确保每个项都有 ID
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
      