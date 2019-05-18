// 导入Vue核心包
import Vue from "vue";
// 导入app组件
import app from "./App.vue";
// 按需引入header
import { Header } from "mint-ui";
Vue.component(Header.name, Header);
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
import { Swipe, SwipeItem } from 'mint-ui';
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
// 引入VueResource并注册
import VueResouce from "vue-resource";
Vue.use(VueResouce);
// 全局组件
var vm = new Vue({
    el: "#app",
    data: {},
    methods: {},
    render: c => c(app),// 渲染app组件
    router//挂载router
});
