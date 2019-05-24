<template>
    <div class="goods-list">
        <div class="goods-item">
            <img src="http://demo.dtcms.net/upload/201504/18/thumb_201504181230434303.jpg" alt="">
            <h1 class="title">小米(Mi)小米Note 16G双网通版</h1>
            <div class="info">
                <p class="price">
                    <span class="now">￥2199</span>
                    <span class="old">￥2399</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩60件</span>
                </p>
            </div>
        </div>
        <div class="goods-item">
            <img src="http://demo.dtcms.net/upload/201504/18/thumb_201504181230434303.jpg" alt="">
            <h1 class="title">小米(Mi)小米Note 16G双网通版</h1>
            <div class="info">
                <p class="price">
                    <span class="now">￥2199</span>
                    <span class="old">￥2399</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩60件</span>
                </p>
            </div>
        </div>
        <div class="goods-item">
            <img src="http://demo.dtcms.net/upload/201504/18/thumb_201504181230434303.jpg" alt="">
            <h1 class="title">小米(Mi)小米Note 16G双网通版</h1>
            <div class="info">
                <p class="price">
                    <span class="now">￥2199</span>
                    <span class="old">￥2399</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩60件</span>
                </p>
            </div>
        </div>
    </div>
</template>
<script></script>
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
