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

// 动态传递分页参数的 getrole 函数
export function getrole(page, pageSize) {
    return request({
        url: '/manage/userrole',
        method: 'get',
        params: {
            page: page,       // 当前页
            pageSize: pageSize // 每页显示的条数
        }
    });
}

export function getdepart() {
    return request({
        url: '/manage/userrole/departments',
        method: 'get',
    });
}

export function getposition(){
    return request({
        url: '/manage/positions',
        method: 'get'
    })
}