// api/user.js
import request from '../utils/requset'; // 引入封装好的 axios 实例



// 创建部门的函数
export const createDepartment = async (departmentData) => {
    try {
        const response = await request.post('/manage/createdepart', departmentData);
        return response.data;  // 返回响应数据
    } catch (error) {
        console.error('创建部门失败:', error);
        throw error;  // 重新抛出错误以供上层处理
    }}

    export const deleteDepartment = (id) => {
        return request({
            url: `/manage/deltedepart/${id}`,
            method: 'delete',
        })
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error("Error deleting department:", error);
            throw error;
        });
    };