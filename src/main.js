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
/*// 按需导入组件
import { Header, Swipe, SwipeItem, Button, Lazyload  } from 'mint-ui';
// 注册header组件
Vue.component(Header.name, Header);
// 注册轮播图组件
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
// 注册发表评论按钮组件
Vue.component(Button.name, Button);
// 注册图片的懒加载组件day9-07
Vue.use(Lazyload);*/
// 完全导入mint-ui组件，实现懒加载day9-08
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI);
// 引入VueResource并注册
import VueResouce from "vue-resource";
Vue.use(VueResouce);
// 导入并注册缩略图组件day9-10
import VuePreview from 'vue2-preview'
Vue.use(VuePreview);
// 设置请求的根路径
Vue.http.options.root = 'http://www.liulongbin.top:3005';
// 导入日期格式化工具moment.js
import moment from "moment/moment.js";
// 定义日期过滤器
Vue.filter("dateFormat", function (dateStr, patern="YYYY-MM-DD HH:mm:ss") {
    return moment(dateStr).format(patern);
});
// 设置全局vue-resource的emulateJSON用于post请求
Vue.http.options.emulateJSON = true;
// 全局组件
var vm = new Vue({
    el: "#app",
    data: {},
    methods: {},
    render: c => c(app),// 渲染app组件
    router//挂载router
});
