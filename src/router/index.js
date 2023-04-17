/*
 * @Author: liu jinwei kk2324982471@163.com
 * @Date: 2023-04-06 10:35:17
 * @LastEditors: liu jinwei kk2324982471@163.com
 * @LastEditTime: 2023-04-06 11:11:29
 * @FilePath: \doc_query_vue\src\router\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 1.引入创建路由需要的组件
import { createRouter, createWebHistory} from 'vue-router'

// 2.配置系统所有路由页面
const routes = [
  {
    path: "/", //项目启动后，可通过 http://localhost:3000/ 直接访问到该页面
    name: "index",
    component: () => import("../pages/index.vue"),
    children:[
      // {
      //   path: 'doc_query',
      //   component: () => import("../pages/doc_query/index.vue")
      // }
    ]
  },
  {
    path:'/doc_query',
    component:()=>import('../pages/doc_query/index.vue')
  }
];
// 3.创建路由实例
const router = createRouter({
    history: createWebHistory(), //使用history模式，hash模式使用 createWebHashHistory() 方法
    routes
  })

// 4.声明,为路由提供外部引用的入口
export default router
