// api/user.js
import request from '../utils/requset'; // 引入封装好的 axios 实例

// export const getmenu = () => {
//         return request.get('/menu')
//           .then(response => {
//             return response;  // 确保返回数据正确
//           })
//           .catch(error => {
//             if (error.response) {
//               // 服务器响应了错误状态
//               console.error('Response error:', error.response.data);
//             } else if (error.request) {
//               // 请求发出但没有收到响应
//               console.error('No response received:', error.request);
//             } else {
//               // 其他错误
//               console.error('Request error:', error.message);
//             }
//             throw error;
//           });
//       };


export const getMenu = () => {
  return request.get('/manage/getmenu')
   .then (response =>{
     return response;
   })
   .catch(error => {
    if (error.response) {
      // 服务器响应了错误状态
      console.error('Response error:', error.response.data);
    } else if (error.request) {
      // 请求发出但没有收到响应
      console.error('No response received:', error.request);
    } else {
      // 其他错误
      console.error('Request error:', error.message);
    }
    throw error;
  });
}
>>>>>>> 777e49888e687797fb65bfc3f1cbcfac9c88bd66
