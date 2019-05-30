<template>
    <div class="goods-list">
        <!--<router-link class="goods-item" v-for="item in goodslist" :key="item.id" :to="'/home/goodsinfo/'+item.id" tag="div">
            <img :src="item.img_url" alt="">
            <h1 class="title">{{item.title}}</h1>
            <div class="info">
                <p class="price">
                    <span class="now">￥{{item.sell_price}}</span>
                    <span class="old">￥{{item.market_price}}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩{{item.stock_quantity}}件</span>
                </p>
            </div>
        </router-link>-->
        <div class="goods-item" v-for="item in goodslist" :key="item.id" @click="goodsInfo(item.id)">
            <img :src="item.img_url">
            <h1 class="title">{{item.title}}</h1>
            <div class="info">
                <p class="price">
                    <span class="now">￥{{item.sell_price}}</span>
                    <span class="old">￥{{item.market_price}}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩{{item.stock_quantity}}件</span>
                </p>
            </div>
        </div>
        <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
    </div>
</template>
<script>
    //引入Tost
    import { Toast } from 'mint-ui';
    export default {
        // 商品数据，分页相关
        data(){
            return {
                pageIndex: 1,
                goodslist: []
            }
        },
        // 钩子函数打开页面调用方法
        created() {
            this.getGoodsList();
        },
        methods: {
            // 请求商品列表
            getGoodsList(){
                this.$http.get("api/getgoods?pageindex="+this.pageIndex).then(result => {
                    if(result.body.status === 0){
                        this.goodslist = this.goodslist.concat(result.body.message);
                        // console.log(this.goodslist);
                    }else {
                        Toast('商品获取失败');
                    }
                });
            },
            // 获取更多
            getMore(){
                // 页数增加1然后调用商品列表的方法
                this.pageIndex++;
                this.getGoodsList();
            },
            // 使用js的形式进行路由导航
            goodsInfo(id){
                //console.log(this);
                this.$router.push({ name: 'goodsinfo', params: { id }});
            }
        }
    }
</script>
<style lang="scss" scoped>
    .goods-list{
        display: flex;
        flex-wrap: wrap;
        padding: 7px;
        justify-content: space-between;
        .goods-item{
            width: 49%;
            border: 1px solid #cccccc;
            box-shadow: 0 0 8px #cccccc;
            margin: 4px 0;
            padding: 2px;
            display: flex;
            justify-content: space-between;
            flex-direction: column;
            min-height: 293px;
            img{
                width: 100%;
            }
            .title{
                font-size: 14px;
            }
            .info{
                background-color: #eeeeee;
                p{
                    margin: 0;
                    padding: 5px;
                }
                .price{
                    .now{
                        color: red;
                        font-weight: bold;
                        font-size: 16px;
                    }
                    .old{
                        font-size: 12px;
                        text-decoration: line-through;
                        margin-left: 10px;
                    }
                }
                .sell{
                    display: flex;
                    justify-content: space-between;
                    font-size: 13px;
                }
            }
        }
    }
</style>
