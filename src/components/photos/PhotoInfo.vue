<template>
    <div class="photoinfo-container">
        <h3>{{photoinfo.title}}</h3>
        <p class="subtitle">
            <span>发表时间：{{photoinfo.add_time | dateFormat}}</span>
            <span>点击：{{photoinfo.click}}次</span>
        </p>
        <hr>
        <!-- 缩略图区域 -->
        <div>
            <vue-preview
                    :list="list"
                    :thumbImageStyle="{width: '80px', height: '80px', margin: '10px', boxShadow: '0 0 8px #999'}"
                    :previewBoxStyle="{border: '1px solid #eee'}"
                    :tapToClose="true"
                    @close="closeHandler"
                    @destroy="destroyHandler"
            />
        </div>
        <!--内容区域-->
        <div class="content" v-html="photoinfo.content">
        </div>
        <!--评论子组件-->
        <comment :id="id"></comment><!--父组件给子组件传值-->
    </div>
</template>
<script>
    //导入评论子组件
    import comment from "../subcomponents/Comment.vue";
    //引入Tost
    import { Toast } from 'mint-ui';
    export default{
        data(){
            return {
                id: this.$route.params.id,// 从地址栏获取参数id
                photoinfo: {},//图片信息对象
                list:[]//缩略图数组
            }
        },
        created(){
            this.getPhotoInfo();
            this.getThumImages();
        },
        methods:{
            getPhotoInfo(){
                this.$http.get("api/getimageInfo/"+this.id).then(result => {
                    if(result.body.status === 0){
                        this.photoinfo = result.body.message[0];
                    }else{
                        Toast('加载失败');
                    }
                });
            },
            // 请求缩略图的方法
            getThumImages(){
                this.$http.get("api/getthumimages/"+this.id).then(result => {
                    if(result.body.status === 0){
                        result.body.message.forEach(item => {
                            item.w=600;
                            item.h=400;
                        });
                        console.log(result.body.message);
                        this.list = result.body.message;
                    }else{
                        Toast('加载失败');
                    }
                });
            },
            // 缩略图方法
            // 即将关闭的时候，调用这个处理函数
            closeHandler() {
                console.log('closeHandler')
            },
            // 完全关闭之后，调用这个函数清理资源
            destroyHandler() {
                console.log('destroyHandler')
            }
        },
        components: {
            comment
        }
    }
</script>
<style lang="scss" scoped>
    .photoinfo-container{
        padding: 5px;
        h3{
            color: #26A2FF;
            font-size: 15px;
            text-align: center;
            margin: 15px 0;
        }
        .subtitle{
            display: flex;
            justify-content: space-between;
        }
        .content{
            font-size: 13px;
            line-height: 30px;
        }
    }
</style>