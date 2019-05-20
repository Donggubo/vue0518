// 1.引入vuerouter
import VueRouter from "vue-router";
// 导入自定义路由组件
import HomeContainer from "./components/tabbar/HomeContainer.vue";
import MemberContainer from "./components/tabbar/MemberContainer.vue";
import CartContainer from "./components/tabbar/CartContainer.vue";
import SearchContainer from "./components/tabbar/SearchContainer.vue";
import NewsListContainer from "./components/news/NewsList.vue";
import NewsInfoContainer from "./components/news/NewsInfo.vue";
// 2.创建路由对象
var router = new VueRouter({
    // 配置路由
    routes: [
        {path: "/", redirect: "/home"},
        {path: "/home", component: HomeContainer},
        {path: "/member", component: MemberContainer},
        {path: "/cart", component: CartContainer},
        {path: "/search", component: SearchContainer},
        {path: "/home/newslist", component: NewsListContainer},
        {path: "/newslist/newsinfo/:id", component: NewsInfoContainer},
    ],
    linkActiveClass: "mui-active",
    linkExactActiveClass: ""
});
// 导出
export default router;