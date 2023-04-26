/*
 * @Author: liu jinwei kk2324982471@163.com
 * @Date: 2023-04-06 10:29:42
 * @LastEditors: liu jinwei kk2324982471@163.com
 * @LastEditTime: 2023-04-26 16:46:53
 * @FilePath: \doc_query_vue\src\main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { createApp } from "vue";
import App from "./App.vue";

// 1.引入路由
import router from "./router/index";
// 引入element
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "./assets/icon/iconfont.css";
const app = createApp(App);
// 2.装载路由
app.use(router);
app.use(ElementPlus);
app.mount("#app");
