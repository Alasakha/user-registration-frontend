<!-- src/views/Login.vue -->
<template>
  <div class="login_bac_color">
      <div class="login_content_box">
        
          <div class="login_left_content_box" >
              <div class="login_left_title">欢迎来到炊大皇</div>
          </div>
          
          <div class="login_right_content_box">
            <div class="login_right_title">USER LOGIN</div>

            <div class="login_box">
              <el-form :model="form" :rules="rules" ref="formRef" label-width="100px">
                      <el-form-item label="用户名" prop="username" style="font-family: 'Microsoft YaHei';">
                          <el-input v-model="form.username"  class="login_username"/>
                      </el-form-item>
                      <el-form-item label="密码" prop="password">
                          <el-input v-model="form.password" type="password" />
                      </el-form-item>
                      <el-form-item>
                          <el-button type="primary" @click="onSubmit" style="background-color: aqua;">登录</el-button>
                      </el-form-item>
                </el-form>  
            </div>
           
          </div>
          
      </div>

  </div>
      </template>
      
      <script setup>
      import { ref } from 'vue';
      import { ElMessage } from 'element-plus';
      import { useRouter } from 'vue-router';
      import { useAuthStore } from '../stores/auth';
      import { login } from '../api/user';
      import axios from 'axios';

      
      const form = ref({
        username: '',
        password: ''
      });
      
      const rules = ref({
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 15, message: '用户名长度应在 3 到 15 个字符之间', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '密码长度不能少于 6 个字符', trigger: 'blur' }
        ]
      });
      
      const formRef = ref(null);
      const router = useRouter();
      const authStore = useAuthStore();
      const { setUser } = authStore;
      const isSubmitting = ref(false);
      
      const onSubmit = async () => {
        if (isSubmitting.value) return;
        isSubmitting.value = true;
      
        try {
          const valid = await formRef.value.validate();
          if (valid) {
            try {
              const response = await login(form.value);
              console.log('Login response:', response);
      
              // 从响应中获取 Token
              const token = response.token;
              authStore.setToken(token);
      
              // 获取用户信息
              const userInfoResponse = await axios.get('http://localhost:8080/user/info', {
                headers: {
                  'Authorization': `Bearer ${token}`
                }
              });
      
              setUser(userInfoResponse.data);
              console.log('User info:', userInfoResponse.data);
      
              // 跳转到首页
              router.push('/');
            } catch (error) {
              // 这里不需要显示错误提示，错误会由拦截器处理
              console.error('Error during login or fetching user info:', error);
              // 只处理需要前端显示的特定情况，例如表单错误
              if (error.response && error.response.status === 400) {
                ElMessage.error('表单输入有误');
              }
            }
          } else {
            ElMessage.error('表单验证失败，请检查输入内容');
          }
        } catch (validationError) {
          console.error('Form validation error:', validationError);
          ElMessage.error('表单验证失败，请检查输入内容');
        } finally {
          isSubmitting.value = false;
        }
      };
      </script>
      
      
<style scoped lang="scss">
      // 颜色变量
$primary-color: rgb(38, 19, 180);
$secondary-color: pink;
$box-border-color: rgb(107, 93, 230);
$title-color: white;
$right-title-color: rgb(119, 103, 237);

// 混合器 - 用于背景样式
@mixin background-gradient($start-color, $end-color) {
  background: linear-gradient(to bottom right, $start-color, 70%, $end-color);
}

// 混合器 - 用于居中对齐
@mixin center-content {
  display: flex;
  align-items: center;
  justify-content: center;
}

.login_bac_color {
  @include background-gradient($primary-color, $secondary-color);
  min-height: 100vh;
  @include center-content;
}

.login_content_box {
  display: flex;
  width: 80%;
  height: 650px;
  border: 1px solid $box-border-color;
  background-color: #fff;
  box-shadow: 4px 4px 8px 4px rgba(0.1, 0.1, 0.1, 0.1);
}

.login_left_content_box {
  background-image: url('https://bpic.588ku.com/back_origin_min_pic/19/12/05/1c774d47510ba115cd535e6db41c64be.jpg!/fw/750/quality/99/unsharp/true/compress/true');
  background-size: cover;
  background-position: center;
  background-repeat: repeat;
  width: 60%;
  opacity: 0.7;
  @include center-content;

  .login_left_title {
    font-family: 'Microsoft YaHei';
    color: $title-color;
    font-size: 60px;
    margin-top: 100px;
    letter-spacing: 10px;
  }
}

.login_right_content_box {
  display: flex;
  flex-direction: column;
  width: 40%;
  justify-content: center;

  .login_right_title {
    @include center-content;
    color: $right-title-color;
    width: 100%;
    margin-bottom: 30px;
    font-size: 25px;
  }
}

:deep(.el-form-item__error){
  color:red;
}
:deep(.el-input){
  border-radius: 10px;
  --el-input-focus-border-color: #7d51ff;
  --el-input-border-color:rgb(233, 231, 255);
  background-color: rgb(233, 231, 255);
  border-radius:40px;
  width: 370px;
}
:deep(.el-input__wrapper){
  background-color: rgb(233, 231, 255);
}
:deep(.el-input__inner){
  border-radius:40px;
  background-color: rgb(233, 231, 255);
}
:deep(.el-button--primary){
  @include background-gradient($primary-color, $secondary-color);
  --el-button-border-color:none;
  .el-button{
    border-radius: 20px;
  }
}
</style>