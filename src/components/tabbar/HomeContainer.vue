<template>
    <div>
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="item in lunbotuList" :key="item.id">
                <img :src="item.img" alt="">
            </mt-swipe-item>
        </mt-swipe>
        <!--9宫格-->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/newslist">
                <img src="../../images/menu1.png" alt="">
                <div class="mui-media-body">新闻资讯</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/photos">
                <img src="../../images/menu2.png" alt="">
                <div class="mui-media-body">图片分享</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/goodslist">
                <img src="../../images/menu3.png" alt="">
                <div class="mui-media-body">商品购买</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../images/menu4.png" alt="">
                <div class="mui-media-body">留言反馈</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../images/menu5.png" alt="">
                <div class="mui-media-body">视频专区</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../images/menu6.png" alt="">
                <div class="mui-media-body">联系我们</div></a></li>
        </ul>
    </div>
</template>
<script>
    //引入Tost
    import { Toast } from 'mint-ui';
    // 使用vue-resouce发起请求
    export default {
        data(){
            return {
                lunbotuList: null
            }
        },
        created() {
            this.getLunbotu();
        },
        methods: {
            getLunbotu(){
                this.$http.get("api/getlunbo").then(function(result){
                    if(result.status === 200){
                        this.lunbotuList = result.body.message;
                    }else{
                        Toast('加载失败');
                    }
                });
            }
        }
    }
</script>
<style lang="scss" scoped>
    .mint-swipe{
        .mint-swipe-item{
            &:nth-child(1){
                background-color: lightpink;
            }
            &:nth-child(2){
                background-color: chartreuse;
            }
            &:nth-child(3){
                background-color: cyan;
            }
        }
        height: 200px;
        img{
            width: 100%;
            height: 100%;
        }
    }
    /*设置9宫格的样式*/
    .mui-grid-view.mui-grid-9{
        background-color: #ffffff;
        img{
            width: 60px;
        }
        .mui-media-body{
            font-size: 12px;
        }
    }
    .mui-grid-view.mui-grid-9 .mui-table-view-cell{
        border: none;
    }
</style>