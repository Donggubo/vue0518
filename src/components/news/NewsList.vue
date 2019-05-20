<template>
    <div>
        <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media" v-for="item in newsList" :key="item.id">
                <router-link :to="'/newslist/newsinfo/'+item.id">
                    <img class="mui-media-object mui-pull-left" :src="item.img_url">
                    <div class="mui-media-body">
                        <h1>{{item.title}}</h1>
                        <p class='mui-ellipsis'>
                            <span>发表时间：{{item.add_time | dateFormat}}</span>
                            <span>{{item.click}}</span>
                        </p>
                    </div>
                </router-link>
            </li>
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
                newsList: null
            }
        },
        created() {
            this.getNewslist();
        },
        methods: {
            getNewslist(){
                this.$http.get("api/getnewslist").then(function(result){
                    if(result.status === 200){
                        this.newsList = result.body.message;
                        console.log(result);
                    }else{
                        Toast('新闻标题获取失败');
                    }
                });
            }
        }
    }
</script>
<style lang="scss" scoped>
    .mui-table-view{
        li{
            h1{
                font-size: 14px;
            }
            .mui-ellipsis{
                font-size: 12px;
                color: #226aff;
                display: flex;
                justify-content: space-between;
            }
        }
    }
</style>