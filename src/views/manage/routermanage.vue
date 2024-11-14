<template>
      <el-table :data="menuData" style="width: 100%" 
      row-key="ID"
      border
      default-expand-all>

          <el-table-column property="name" label="Name" min-width="120" />

          <el-table-column property="path" label="路径地址" min-width="120"/>

          <el-table-column property="sort_order" label="排行" min-width="80"/>

          <el-table-column property="status" label="开关" min-width="80"/>

          <el-table-column fixed="right" label="操作" min-width="120">
            <template #default="scope">
              <el-button link type="primary" size="small" @click="handleClickAdd">
                新增
              </el-button>
              <el-button link type="primary" size="small">修改</el-button>
              <el-button link type="primary" size="small" @click="handleDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>


<!-- //增加菜单对话框 -->
<el-dialog
    v-model="dialogAddVisible"
    title="新增菜单"
    width="800"
    :before-close="handleClose"
  >
    
  <div class="add_menu_box">
    <div class="block">
      <span class="title">上级目录</span>
      <el-cascader v-model="MenuValue" :options="menuData"  :props="props1" />
  </div>
    

    <div class="block">
      <span class="title">菜单类型</span>
    <el-radio-group v-model="newMenuData.type">
      <el-radio value=0 size="large">菜单</el-radio>
      <el-radio value=1 size="large">目录</el-radio>
      <el-radio value=2 size="large">按钮</el-radio>
    </el-radio-group>
  </div>

  <el-row :gutter="20">
    <el-col :span="12"><div class="grid-content ep-bg-purple" />
      <div class="block">
        <span class="title">菜单名称</span>
        <el-input v-model="newMenuData.name" style="width: 240px" placeholder="Please input" />
      </div>
  </el-col>
    <el-col :span="12" ><div class="grid-content ep-bg-purple" />
      <div class="block">
        <span class="title">接口规则</span>
        <el-input v-model="input" style="width: 240px" placeholder="Please input" />
      </div>
    </el-col>
  </el-row>

  <el-row :gutter="20">
    <el-col :span="12"><div class="grid-content ep-bg-purple" />
      <div class="block">
        <span class="title">路由路径</span>
        <el-input v-model="newMenuData.path" style="width: 240px" placeholder="Please input" />
      </div>
  </el-col>
    <el-col :span="12" ><div class="grid-content ep-bg-purple" />
      <!-- <div class="block">
        <span class="title">接口规则</span>
        <el-input v-model="input" style="width: 240px" placeholder="Please input" />
      </div> -->
    </el-col>
  </el-row>
  </div>

  



    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogAddVisible = false">取消</el-button>
        <el-button type="primary" @click="addNewMenu">
          新增
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>


<script lang="ts" setup>
import { computed, onMounted , ref ,watch} from 'vue';
import axios from 'axios';
import { ElTable } from 'element-plus'
import { getMenu ,PostMenu ,DeletMenu } from '../../api/menu';
import { ElMessageBox } from 'element-plus'

import { useMenuStore } from '../../stores/menu';
const menuStore = useMenuStore();
const updateMenu = (newMenuData) => {
  menuStore.setMenuData(newMenuData);  // 更新全局菜单数据
};


const menuData =ref()
const dialogAddVisible = ref(false)
const input = ref('')
const props1 = {
  checkStrictly: true,
}
const MenuValue = ref('')

const newMenuData = ref({
  name: '', 
  path: '', 
  sort_order: 0, 
  status: 1,
  parent_id:null,
  type: 0,
});

interface User {
  date: string
  name: string
  address: string
}

onMounted(() => {
  getMenuInfo()
})

const getMenuInfo = async () => {
  try {
    const response = await getMenu();
    updateMenu(response.data)
    // 将实际菜单数据格式化
    const formattedMenuData = formatMenuData(response.data);

    // 包裹顶层节点
    menuData.value = [
      {
        name:'顶级菜单',
        value: 'null',
        label: "顶层菜单",
        children: formattedMenuData,
        type:1,
      },
    ];

    console.log("menuData.value:", menuData.value);
  } catch (error) {
    console.error('获取菜单数据失败:', error);
  }
};

// 增加菜单函数
const addNewMenu = async () => {
  try {
    const selectedMenuID = MapParentid.value
    const newMenu = {
      name: newMenuData.value.name,
      path: newMenuData.value.path,
      sort_order: newMenuData.value.sort_order,
      status: newMenuData.value.status,
      parent_id: selectedMenuID ? selectedMenuID : null,
      type: Number(newMenuData.value.type),
    };
    console.log('newMenu:',newMenu)
    await PostMenu(newMenu);
    dialogAddVisible.value = false;
    await getMenuInfo(); // 刷新菜单列表
  } catch (error) {
    console.error('添加菜单失败:', error);
  }
};

//点击增加按钮
const handleClickAdd = () =>{
  dialogAddVisible.value = true
}

//删除对话框
const handleClose = (done: () => void) => {
  ElMessageBox.confirm('Are you sure to close this dialog?')
    .then(() => {
      done()
    })
    .catch(() => {
      // catch error
    })
}

// 数组映射
const formatMenuData = (data: any[]) => {
   // 检查 data 是否是数组
   if (!Array.isArray(data)) {
    console.error('Data is not an array or is undefined:', data);
    return [];
  }
  // 根据实际需要处理数据的格式
  return data.map(item => ({
    ID: item.id,
    name: item.name,
    value: item.id,
    label: item.name,
    CreateAt: item.CreatedAt, 
    sort_order: item.sort_order,
    status: item.status,
    path: item.path,
    children: item.children ? formatMenuData(item.children) : [],
  }));
};

// 删除菜单
const handleDelete = async (menu) => {
  try {
    // 调用删除菜单的 API
    const response = await DeletMenu(menu.ID);
    
    // 删除成功后，直接从菜单列表中移除该项
   // 获取初始菜单列表
   getMenuInfo();

    // 提示用户删除成功
  } catch (error) {
    console.error('删除菜单失败:', error);
  }
};

watch(MenuValue, (newValue, oldValue) => {
  // 当 source 发生变化时，执行这个回调
  console.log('newValue:', newValue);
  console.log('oldValue:', oldValue);
});

const MapParentid = computed(() => {
  if (MenuValue.value.length > 1) {
    // 获取级联选择器选中的最后一个菜单项
    console.log('Menuvalue.length:',MenuValue.value.length)
    return MenuValue.value[MenuValue.value.length - 1]; // 最后一个级联选中的项
  }
  return null; // 如果没有选中任何数据，返回 null
});
</script>

<style scoped lang="scss">
.add_menu_box{
  height: 500px;
}

.block{
  display: flex;
  // justify-content:;
  align-items: center;
  height:60px;
  .el-input{
    height:35px;
    margin-left: 10px;
    
  }
  .title{
    width: 80px;
    font-size: 15px;
  }
}
.el-cascader .el-input{
  width:300px;
}
</style>