<!-- src/views/Register.vue -->
<template>
        <el-form :model="form" :rules="rules" ref="formRef" label-width="100px">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="form.username" />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="form.password" type="password" />
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="form.email" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">注册</el-button>
          </el-form-item>
        </el-form>
      </template>
      
      <script setup>
      import { ref } from 'vue'
      import { ElMessage } from 'element-plus'
      import axios from 'axios'
      
      const form = ref({
        username: '',
        password: '',
        email: ''
      })
      
      const rules = ref({
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 15, message: '用户名长度应在 3 到 15 个字符之间', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '密码长度不能少于 6 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入有效的邮箱地址', trigger: ['blur', 'change'] }
        ]
      })
      
      const formRef = ref(null)
      
      const onSubmit = async () => {
        formRef.value.validate(async (valid) => {
          if (valid) {
            try {
              const response = await axios.post('http://localhost:8080/register', form.value)
              ElMessage.success(response.data.message)
            } catch (error) {
              if (error.response) {
                ElMessage.error(error.response.data.error)
              } else {
                ElMessage.error("注册失败")
              }
            }
          } else {
            ElMessage.error('表单验证失败，请检查输入内容')
          }
        })
      }
      </script>
      