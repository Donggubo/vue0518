// 导入Vue核心包
import Vue from "vue";
// 导入app组件
import app from "./App.vue";
// 引入mui的样式
import "./lib/mui/css/mui.css";
import "./lib/mui/css/icons-extra.css";
// 导入VueRouter
import VueRouter from "vue-router"
// 注册VueRouter
Vue.use(VueRouter);
// 导入自定义router.js模块
import router from "./router"
// 首页轮播图布局
import { Header, Swipe, SwipeItem, Button } from 'mint-ui';
// header
Vue.component(Header.name, Header);
// 轮播图
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
// 发表评论按钮
Vue.component(Button.name, Button);
// 引入VueResource并注册
import VueResouce from "vue-resource";
Vue.use(VueResouce);
// 设置请求的根路径
Vue.http.options.root = 'http://www.liulongbin.top:3005';
// 导入日期格式化工具moment.js
import moment from "moment/moment.js";
// 定义日期过滤器
Vue.filter("dateFormat", function (dateStr, patern="YYYY-MM-DD HH:mm:ss") {
    return moment(dateStr).format(patern);
});
// 全局组件
var vm = new Vue({
    el: "#app",
    data: {},
    methods: {},
    render: c => c(app),// 渲染app组件
    router//挂载router
});
