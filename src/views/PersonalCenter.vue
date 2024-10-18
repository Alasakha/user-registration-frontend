<template>
<div class="personal">
        <!-- 个人信息框 -->
     <div class="personal_infomration_box">
        <div class="personal_information_title" >
                <text style="margin-left: 10px" class="personalInfo">个人信息</text>
        </div>
        <el-divider />

        <div class="infomation_card">
                <el-row>
                <el-col :span="4"><div class="avatar" />
                <el-image style="width: 100px; height: 100px" :src="url" :fit="fit" />
                </el-col>
                
                <el-col :span="20"><div class="user_Info" />
                        <div class="introduce">个人介绍部分。。。。。。。。。。。  </div>
                        <el-row style="font-size: 14px">
                                <el-col :span="12"><div class="grid-content ep-bg-purple" />昵称：</el-col>
                                <el-col :span="12"><div class="grid-content ep-bg-purple-light" />身份：</el-col>
                        </el-row>
                        <el-row style="font-size: 14px">
                                <el-col :span="12"><div class="grid-content ep-bg-purple" />登录ip：</el-col>
                                <el-col :span="12"><div class="grid-content ep-bg-purple-light" />登录时间：</el-col>
                        </el-row>      
                </el-col>
                
                </el-row>
        </div>
     </div> 
     <!-- 通知信息框  -->
     <el-card style="max-width: 1580px; width:500px; margin-left:20px">
    <template #header>
      <div class="card-header">
        <span>Card name</span>
      </div>
    </template>
    <p v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</p>
  </el-card>
</div>

</template>



<script setup>
const url =
  'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
</script>


<style lang="scss">
.personal{
height:100vh;
display: flex;
        .personal_infomration_box{
        width: 60%;
        background-color: aqua;
        height:200px;
        border-radius: 5px;
                .personal_information_title{
                height: 50px;
                display: flex;
                align-items: center;
                }
                .el-divider--horizontal{
                margin: 2px;
                }
                .infomation_card{
                height: 135px;
                padding: 15px;
                }
        }
 .introduce{
   display: flex;
   align-items: center;  
   height: 80px;     
 }       
.notice_box{
height: 200px;
background-color: antiquewhite;
width:40%;
margin-left: 20px;

} 
.el-card__header{
height: 52px;
}
}
</style>