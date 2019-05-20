<template>
    <div class="newsinfo-container">
        <h3 class="title">{{newsInfo.title}}</h3>
        <p class="subtitle">
            <span>发表时间：{{newsInfo.add_time | dateFormat}}</span>
            <span>点击次数：{{newsInfo.click}}次</span>
        </p>
        <hr>
        <!--新闻详情-->
        <div class="content" v-html="newsInfo.content"></div>
        <comment :id="this.id"></comment>
    </div>
</template>
<script>
    //引入Tost
    import { Toast } from 'mint-ui';
    import jquery from "jquery/dist/jquery";
    //导入评论子组件
    import comment from "../subcomponent/Comment.vue";
    export default {
        data(){
            return {
                id: this.$route.params.id,
                newsInfo: {}
            }
        },
        created(){
            this.getNewsInfo();
        },
        methods:{
            getNewsInfo(){
                this.$http.get("api/getnew/" + this.id).then(function(result){
                    if(result.status === 200){
                        this.newsInfo = result.body.message[0];
                        // console.log(this.newsInfo.content);
                        var arr = jquery.parseHTML(this.newsInfo.content);
                        // arr[3].getElementsByTagName("img")[0].setAttribute("src","https://dwz.cn/4OSRnLsB");
                        // arr[9].getElementsByTagName("img")[0].setAttribute("src","https://dwz.cn/5zNqeS7k");
                        // arr[11].getElementsByTagName("img")[0].setAttribute("src","https://dwz.cn/4OSRnLsB");
                        // arr[13].getElementsByTagName("img")[0].setAttribute("src","https://dwz.cn/4OSRnLsB");
                        // arr[15].getElementsByTagName("img")[0].setAttribute("src","https://dwz.cn/4OSRnLsB");
                        // arr[17].getElementsByTagName("img")[0].setAttribute("src","https://dwz.cn/4OSRnLsB");
                        // arr[19].getElementsByTagName("img")[0].setAttribute("src","https://dwz.cn/4OSRnLsB");
                        // arr[21].getElementsByTagName("img")[0].setAttribute("src","https://dwz.cn/4OSRnLsB");
                        // arr[23].getElementsByTagName("img")[0].setAttribute("src","https://dwz.cn/4OSRnLsB");
                        // arr[25].getElementsByTagName("img")[0].setAttribute("src","https://dwz.cn/4OSRnLsB");
                        // console.log(arr[25].toString());
                        // console.log(arr[26].toString());
                        arr.forEach(v=>{
                            //console.log(v);
                        })
                    }else{
                        Toast('新闻详情获取失败');
                    }
                });
            }
        },
        components: {
            comment
        }
    }
</script>
<style lang="scss">
    .newsinfo-container{
        padding: 0 4px;
        .title{
            font-size: 16px;
            color: red;
            text-align: center;
            margin: 15px;
        }
        .subtitle{
            font-size: 13px;
            display: flex;
            justify-content: space-between;
            color: #226aff;
        }
        .content{
            img{
                width: 100%;
            }
        }
    }
</style>