// api/user.js
import request from '../utils/requset'; // 引入封装好的 axios 实例

// 封装登录接口
export function login(data) {
    return request({
        url: '/login',        // API 路径
        method: 'post',       // 请求方式
        data                  // 请求体，传递表单数据
    });
}