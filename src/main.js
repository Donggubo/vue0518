console.log("ok");
// 导入Vue核心包
import Vue from "vue";
// 导入app组件
import app from "./App.vue";
// 按需引入header
import { Header } from 'mint-ui';
Vue.component(Header.name, Header);
// 引入mui的tabbar样式
import './lib/mui/css/mui.css'
// 全局组件
var vm = new Vue({
    el: "#app",
    data: {},
    methods: {},
    render: c => c(app),// 渲染app组件
});
