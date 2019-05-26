<template>
    <div class="goodsdesc-container">
        <div class="title">
            <h1>{{goodsdesc.title}}</h1>
        </div>
        <hr>
        <div class="content" v-html="goodsdesc.content"></div>
    </div>
</template>
<script>
    //引入Tost
    import { Toast } from 'mint-ui';
    export default {
        data(){
            return {
                id: this.$route.params.id,
                goodsdesc: {}
            }
        },
        created(){
            this.getGoodsDesc();
        },
        methods: {
            getGoodsDesc(){
                this.$http.get("api/goods/getdesc/"+this.id).then(result => {
                    if(result.body.status === 0){
                        this.goodsdesc = result.body.message[0];
                    }else{
                        Toast('商品介绍获取失败');
                    }
                });
            }
        }
    }
</script>
<style lang="scss">
    .goodsdesc-container{
        .title{
            h1{
                font-size: 16px;
                color: #226aff;
                text-align: center;
                margin: 15px 0;
            }
        }
        .content{
            padding: 7px;
            font-size: 13px;
            p{
                .gomeImgLoad{
                    width: 100%;
                    height: 100%;
                }
            }
        }

    }
</style>