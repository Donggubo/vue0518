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
        <comment :id="id"></comment>
    </div>
</template>
<script>
    //引入Tost
    import { Toast } from 'mint-ui';
    import jquery from "jquery/dist/jquery";
    //导入评论子组件
    import comment from "../subcomponents/Comment.vue";
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
                        if(parseInt(this.id )=== 15 ){
                            var arr = jquery.parseHTML(this.newsInfo.content);
                            arr[3].getElementsByTagName("img")[0].setAttribute("src","http://pic32.nipic.com/20130823/13339320_183302468194_2.jpg");
                            arr[9].getElementsByTagName("img")[0].setAttribute("src","http://pic15.nipic.com/20110628/1369025_192645024000_2.jpg");
                            arr[11].getElementsByTagName("img")[0].setAttribute("src","http://pic37.nipic.com/20140113/8800276_184927469000_2.png");
                            arr[13].getElementsByTagName("img")[0].setAttribute("src","http://k.zol-img.com.cn/sjbbs/7692/a7691515_s.jpg");
                            arr[15].getElementsByTagName("img")[0].setAttribute("src","http://pic53.nipic.com/file/20141115/9448607_175255450000_2.jpg");
                            arr[17].getElementsByTagName("img")[0].setAttribute("src","http://pic35.nipic.com/20131115/13972544_160943053001_2.jpg");
                            arr[19].getElementsByTagName("img")[0].setAttribute("src","http://pic37.nipic.com/20140110/17563091_221827492154_2.jpg");
                            arr[21].getElementsByTagName("img")[0].setAttribute("src","http://img3.redocn.com/tupian/20150312/haixinghezhenzhubeikeshiliangbeijing_3937174.jpg");
                            arr[23].getElementsByTagName("img")[0].setAttribute("src","http://pic1.nipic.com/2009-02-17/200921701719614_2.jpg");
                            arr[25].getElementsByTagName("img")[0].setAttribute("src","http://pic24.nipic.com/20120922/10898738_143746326185_2.jpg");
                            var strContent = "";
                            for(var i=1; i<=29;i++){
                                if(i%2 !== 0){
                                    strContent+= arr[i].outerHTML;
                                }else{
                                    strContent+= arr[i].nodeValue;
                                }
                            }
                            this.newsInfo.content = strContent;
                        }
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