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
// 导入vuex并注册 day11
import Vuex from "vuex";
Vue.use(Vuex);
// 读取localStorage中的数据
var cart = JSON.parse(localStorage.getItem("cart") || "[]");
// 创建vuex对象
var store = new Vuex.Store({
    state: {
        cart: cart// 从localStorage中获取的数据赋值给cart
    },
    mutations: {
        addToShopcart(state, goodsInfo){
            // console.log(1);
            var flag = false;
            state.cart.some(item => {
                // 表示购物车已有该类数据
                if(item.id === goodsInfo.id){
                    // console.log(item.id === goodsInfo.id);
                    item.count += parseInt(goodsInfo.count);// 该处的count是自定义的cart对象中的
                    flag = true;
                    return true;
                }
            });
            // 表示购物车没有此项数据
            if(!flag){
                state.cart.push(goodsInfo);
            }
            // 将数据存储到本地
            localStorage.setItem("cart", JSON.stringify(state.cart))
        },
        // 修改购物车中商品数量的值
        updateGoodsInfo(state, goodsInfo){
            state.cart.some(item => {
                if(item.id === goodsInfo.id){
                    item.count = parseInt(goodsInfo.count);
                    return true;
                }
            });
            // 将数据存储到本地
            localStorage.setItem("cart", JSON.stringify(state.cart))
        },
        // 删除商品数据
        removeFromCart(state, id){
            state.cart.some((item, index) => {
                if(item.id === id){
                    state.cart.splice(index, 1);
                    return true;
                }
            });
            // 将数据存储到本地
            localStorage.setItem("cart", JSON.stringify(state.cart))
        },
        // 更新商品的选中状态
        updateSelected(state, info){
            console.log(info);
            state.cart.some(item => {
                if(item.id === info.id){
                    item.selected = info.selected;
                    return true;
                }
            });
            // 将数据存储到本地
            localStorage.setItem("cart", JSON.stringify(state.cart))
        }
    },
    getters: {
        // 用于徽标数量的更新
        getAllCount(state){
            var count = 0;
            state.cart.forEach(item => {
                count += parseInt(item.count);
            });
            return count;
        },
        // 在循环购物车列表时候初始化数量值
        getGoodsCount(state){
            var o = {};
            state.cart.forEach(item => {
                o[item.id] = item.count;
            });
            // console.log(o);
            return o;
        },
        // 获取商品是否被选中的状态
        getGoodsSelected(state){
            // console.log(state);
            var o = {};
            state.cart.forEach(item => {
                o[item.id] = item.selected;
            });
            return o;
        },
        // 商品的总件数和总价格
        getGoodsCountAndPrice(state){
            var o = {
                count: 0,// 商品总件数
                price: 0 // 商品的总价格
            };
            state.cart.forEach(item => {
                if(item.selected){
                    o.count += item.count;
                    o.price += item.price*item.count;
                }
            });
            return o;
        }
    }
});
// 全局组件
var vm = new Vue({
    el: "#app",
    data: {},
    methods: {},
    render: c => c(app),// 渲染app组件
    router, //挂载router
    store // 挂载Vuex实例
});
