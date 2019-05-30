<template>
    <div class="shopcar-container">
        <div class="goods-list">
            <!--商品列表区域-->
            <div class="mui-card" v-for="(item, index) in goodslist" :key="item.id">
                <div class="mui-card-content">
                    <div class="mui-card-content-inner">
                        <mt-switch v-model="$store.getters.getGoodsSelected[item.id]" @change="selectedChanged(item.id, $store.getters.getGoodsSelected[item.id])"></mt-switch>
                        <img :src="item.thumb_path" alt="">
                        <div class="info">
                            <h1>{{item.title}}</h1>
                            <p>
                                <span class="price">￥{{item.sell_price}}</span>
                                <shopcarnumberbox :initcount="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"></shopcarnumberbox>
                                <a href="#" @click.prevent="removeFromGoodsList(item.id, index)">删除</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <!--结算区域-->
            <div class="mui-card">
                <div class="mui-card-content">
                    <div class="mui-card-content-inner">
                        <div class="left">
                            <p>总结（不含运费）</p>
                            <p>已勾选商品<span>{{$store.getters.getGoodsCountAndPrice.count}}</span>件，总价：<span>￥{{$store.getters.getGoodsCountAndPrice.price}}元</span></p>
                        </div>
                        <mt-button type="danger">去结算</mt-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    // 引入组件
    import shopcarnumberbox from "../subcomponents/ShopcarNumberBox.vue";
    export default {
        data(){
            return {
                goodslist: []
            }
        },
        created(){
            this.getGoodsList();
        },
        methods: {
            getGoodsList(){
                // 获取购物车的所有商品id
                var idArr = [];
                this.$store.state.cart.forEach(item => idArr.push(item.id));
                // 如果购物车中没有商品数据则直接返回
                if(idArr.length <= 0){
                    return;
                }
                // 请求商品列表
                this.$http.get("api/goods/getshopcarlist/" + idArr.join(",")).then(result => {
                    if(result.body.status === 0){
                        this.goodslist = result.body.message;
                        // console.log(this.goodslist);
                    }
                });
            },
            // 从goodslist中删除商品
            removeFromGoodsList(id, index){
                this.goodslist.splice(index, 1);// 删除goodslist中的数据
                this.$store.commit("removeFromCart", id);// 从store中删除商品数据
            },
            // 商品的选中状态
            selectedChanged(id, val){
                // console.log(id+"----"+val);
                this.$store.commit("updateSelected", {id: id, selected: val})
            }
        },
        components: {
            shopcarnumberbox: shopcarnumberbox// 挂载组件
        }
    }
</script>
<style lang="scss" scoped>
    .shopcar-container {
        background-color: #eeeeee;
        overflow: hidden;
        .goods-list{
            .mui-card-content-inner{
                display: flex;
                justify-content: space-between;
            }
            img{
                width: 60px;
                height: 60px;
            }
            h1{
                font-size: 13px;
            }
            .info{
                .price{
                    color: red;
                    font-weight: bold;
                }
                p{
                    margin-top: 20px;
                }
                width: 250px;
                height: 86px;
            }
            .left{
                align-items: center;
                p{
                    span{
                        color: red;
                        font-weight: bold;
                    }
                }
            }
        }
    }
</style>