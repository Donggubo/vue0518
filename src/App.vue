<template>
    <div class="app-container">
        <!--标题-->
        <mt-header fixed title="vue项目">
            <router-link to="#" slot="left">
                <mt-button :icon="icon" @click="back">{{flag}}</mt-button>
            </router-link>
        </mt-header>
        <!--添加动画效果-->
        <transition>
            <router-view></router-view>
        </transition>
        <!--tabbar-->
        <nav class="mui-bar mui-bar-tab">
            <router-link class="mui-tab-item-llb" to="/home">
                <span class="mui-icon mui-icon-home"></span>
                <span class="mui-tab-label">首页</span>
            </router-link>
            <router-link class="mui-tab-item-llb" to="/member">
                <span class="mui-icon mui-icon-contact"></span>
                <span class="mui-tab-label">会员</span>
            </router-link>
            <router-link class="mui-tab-item-llb" to="/cart">
                <span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge" id="badge">{{$store.getters.getAllCount}}</span></span>
                <span class="mui-tab-label">购物车</span>
            </router-link>
            <router-link class="mui-tab-item-llb" to="/search">
                <span class="mui-icon mui-icon-search"></span>
                <span class="mui-tab-label">搜索</span>
            </router-link>
        </nav>
    </div>
</template>
<script>
    /*返回按钮的添加*/
    export default{
        data(){
            return {
                flag: "",
                icon: ""
            }
        },
        updated(){
            this.getStat();
        },
        methods: {
            getStat(){
                this.flag = this.$route.path === "/home" ? "":"返回",
                this.icon = this.$route.path === "/home" ? "":"back"
            },
            back(){
                this.$router.go(-1);
            }
        }
    }
</script>
<style lang="scss" scoped>
    .app-container{
        .mint-header{
            z-index: 99;
            font-size: 20px;
        }
        padding-top: 40px;
        padding-bottom: 50px;
        overflow-x: hidden;
        background-color: #ffffff;
    }
    /*动画效果*/
    .v-enter{
        opacity: 0;
        transform: translateX(100%);
    }
    .v-leave-to{
        opacity: 0;
        transform: translateX(-100%);
        position: absolute;
    }
    .v-enter-active,
    .v-leave-active{
        transition: all 1s ease;
    }
    // 该类名，解决 tabbar 点击无法切换的问题
    .mui-bar-tab .mui-tab-item-llb.mui-active {
        color: #007aff;
    }

    .mui-bar-tab .mui-tab-item-llb {
        display: table-cell;
        overflow: hidden;
        width: 1%;
        height: 50px;
        text-align: center;
        vertical-align: middle;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: #929292;
    }

    .mui-bar-tab .mui-tab-item-llb .mui-icon {
        top: 3px;
        width: 24px;
        height: 24px;
        padding-top: 0;
        padding-bottom: 0;
    }

    .mui-bar-tab .mui-tab-item-llb .mui-icon~.mui-tab-label {
        font-size: 11px;
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>