/*
 * @Author: liu jinwei kk2324982471@163.com
 * @Date: 2023-04-06 11:13:32
 * @LastEditors: liu jinwei kk2324982471@163.com
 * @LastEditTime: 2023-04-14 19:27:26
 * @FilePath: \doc_query_vue\src\api\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 引入axios
import axios from 'axios';
// 全局配置
// axios.defaults.baseURL = 'http://localhost:8088',
axios.defaults.headers = {
    'Content-Type': 'application/json'
  }
//默认超时时间 15秒
axios.defaults.timeout = 15000;
// axios.defaults.baseURL = ""

// 添加请求拦截器
// axios.interceptors.request.use(
//     (config) =>{
//       let accesstoken = localStorage.getItem('accesstoken')
//       if(accesstoken){
//           config.headers['accesstoken'] = accesstoken
//       }
//       return config;
//     },
//     (error) =>{
//       return Promise.reject(error);
//     }
//   );

  // 添加响应拦截器
// axios.interceptors.response.use(
//     (response) => {
//       //获取状态码
//       const status = response.data.code || response.status;
//       //如果是401则跳转到登录页面
//       if (status === 401) router.push({ path: "/" });
//       return response;
//     },
//     (error) => {
//       // 对响应错误做点什么
//       return Promise.reject(error);
//     }
//   );
  
export default axios;


