<template>
    <div class="goodsinfo-container">
        <transition
                v-on:before-enter="beforeEnter"
                v-on:enter="enter"
                v-on:after-enter="afterEnter"
        >
            <div class="ball" v-if="flag" ref="ball"></div>
        </transition>
        <!--轮播图区域-->
        <swiper :lunbotuList="lunbotuList" :isfull="false"></swiper>
        <!--商品购买区域-->
        <div class="mui-card">
            <div class="mui-card-header">{{goodsInfo.title}}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="price">
                        市场价：<del>￥{{goodsInfo.sell_price}}</del>&nbsp;&nbsp;销售价： <span class="now_price">￥{{goodsInfo.market_price}}</span>
                    </p>
                    <p>购买数量： <numberbox @getcount="getSelectedCount" :max="goodsInfo.stock_quantity"></numberbox></p>
                    <p>
                        <mt-button type="primary" size="small">立即购买</mt-button>
                        <mt-button type="danger" size="small" @click="addToCart">加入购物车</mt-button>
                    </p>
                </div>
            </div>
        </div>
        <!--商品参数区域-->
        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号：{{goodsInfo.goods_no}}</p>
                    <p>库存情况：{{goodsInfo.stock_quantity}}</p>
                    <p>上架时间：{{goodsInfo.add_time | dateFormat}}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type="primary" plain size="large" @click="goodsDesc(id)">图文介绍</mt-button>
                <mt-button type="danger" plain size="large" @click="goodsComment(id)">商品评论</mt-button>
            </div>
        </div>
    </div>
</template>
<script>
    // 导入轮播图组件
    import swiper from "../subcomponents/Swiper.vue";
    // 导入数字盒子组件
    import numberbox from "../subcomponents/NumberBox.vue";
    //引入Tost
    import { Toast } from 'mint-ui';
    export default {
        data(){
            return {
                id: this.$route.params.id,
                lunbotuList: [],
                goodsInfo: {},
                flag: false,
                selectedCount: 1// 购买数量
            }
        },
        created() {
            this.getLunbotu();
            this.getGoodsInfo();
        },
        methods: {
            // 获取轮播图
            getLunbotu(){
                this.$http.get("api/getthumimages/"+this.id).then(result => {
                    if(result.body.status === 0 ){
                        // 公共轮播图组件的图片属性是img，获取的数据只有src，因此遍历给其添加img属性
                        result.body.message.forEach(item => {
                            item.img = item.src;
                        });
                        this.lunbotuList = result.body.message;
                    }else{
                        Toast('图片获取失败');
                    }
                });
            },
            // 获取商品详情
            getGoodsInfo(){
                this.$http.get("api/goods/getinfo/"+this.id).then(result => {
                    if(result.body.status === 0){
                        this.goodsInfo = result.body.message[0]
                    }else{
                        Toast('商品信息获取失败');
                    }
                });
            },
            // 图文介绍--编程式导航
            goodsDesc(id){
                this.$router.push({ name: 'goodsdesc', params: { id }});
            },
            // 商品评论--编程式导航
            goodsComment(id){
                this.$router.push({ name: 'goodscomment', params: { id }});
            },
            // 小球动画函数
            addToCart(){
                this.flag = !this.flag;
            },
            beforeEnter(el){
                // 起始位置
                el.style.transform="translate(0, 0)";
            },
            enter(el, done){
                // 获取小球位置
                const ballPosition = this.$refs.ball.getBoundingClientRect();
                // 获取徽标位置
                const badgePosition = document.getElementById("badge").getBoundingClientRect();
                // 计算位置
                var xDist = badgePosition.left - ballPosition.left;
                var yDist = badgePosition.top - ballPosition.top;
                el.offsetWidth;// 动画效果
                // 要到的位置
                el.style.transform=`translate(${xDist}px, ${yDist}px)`;
                // 实现动画
                el.style.transition="all 1s cubic-bezier(.83,.21,.86,.26)";
                done();
            },
            afterEnter(el){
                this.flag = !this.flag;
            },
            // 购买数量
            getSelectedCount(count){
                this.selectedCount = count;
                console.log(this.selectedCount);
            }
        },
        // 注册轮播图组件
        components: {
            swiper,
            numberbox
        }
    }
</script>
<style lang="scss" scoped>
    .goodsinfo-container{
        .ball{
            height: 15px;
            width: 15px;
            border-radius: 50%;
            background-color: red;
            z-index: 99;
            position: absolute;
            top: 379px;
            left: 152px;
        }
        background-color: #eeeeee;
        overflow: auto;
        .now_price{
            font-size: 16px;
            font-weight: bold;
            color: red;
        }
        .mui-card-footer{
            display: block;
        }
        button{
            margin: 15px 0;
        }
    }
</style>
