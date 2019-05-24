<template>
    <div class="cmt-container">
        <h3>发表评论</h3>
        <hr>
        <textarea placeholder="请输入内容最多120字" maxlength="120" v-model="comment"></textarea>
        <mt-button type="primary" size="large" @click="postComments">发表评论</mt-button>
        <div class="cmt-list">
            <div class="cmt-item" v-for="(item, i) in comments" :key="item.add_time">
                <div class="cmt-title">第{{i+1}}楼&nbsp;&nbsp;用户：{{item.user_name}}&nbsp;&nbsp;发表时间：{{item.add_time | dateFormat}}</div>
                <div class="cmt-body">{{item.content === "undefined" || item.content === "" ? "此用户很懒": item.content}}</div>
            </div>
        </div>
        <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
    </div>
</template>
<script>
    //引入Tost
    import { Toast } from 'mint-ui';
    export default {
        data(){
            return {
                comments:[],
                pageindex: 1,
                comment: ""
            }
        },
        props: ["id"],
        created(){
            this.getComments();
        },
        methods:{
            // 获取评论
            getComments(){
                this.$http.get("api/getcomments/"+this.id+"?pageindex="+this.pageindex).then(result => {
                    if(result.status === 200){
                        // 拼接上一页的评论数据，防止加载更多时覆盖前面的评论
                        this.comments = this.comments.concat(result.body.message);
                    }else{
                        Toast('评论获取失败');
                    }
                });
            },
            // 加载更多
            getMore(){
                this.pageindex++;
                this.getComments();
            },
            // 发表评论
            postComments(){
                if(this.comment.trim().length === 0){
                    return Toast('评论不能为空！');
                }
                this.$http.post("api/postcomment/"+this.$route.params.id, {content: this.comment.trim()}).then(result =>{
                    if(result.body.status === 0){
                        var cmt = {
                            user_name: "匿名用户",
                            add_time: Date.now(),
                            content: this.comment
                        };
                        this.comments.unshift(cmt);
                        this.comment = "";
                        Toast(result.body.message);
                    }
                }, err =>{
                        return Toast('评论失败！');
                });
            }
        }
    }
</script>
<style lang="scss" scoped>
    .cmt-container{
        h3{
            font-size: 18px;
        }
        textarea{
            font-size: 13px;
            height: 85px;
            margin: 0;
        }
        .cmt-list{
            margin: 5px 0;
            .cmt-item{
                font-size: 13px;
                .cmt-title{
                    background-color: #cccccc;
                    line-height: 35px;
                }
                .cmt-body{
                    line-height: 35px;
                    text-indent: 2em;
                }
            }
        }
    }
</style>