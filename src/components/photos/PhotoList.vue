<template>
    <div>
        <!--顶部滑动条-->
        <div id="slider" class="mui-slider">
            <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <a :class="['mui-control-item',item.id === 0? 'mui-active': '']" v-for="item in cates" :key="item.id" href="#" @click="getImgListById(item.id)">
                        {{item.title}}
                    </a>
                </div>
            </div>
        </div>
        <!--图片列表 使用懒加载-->
        <ul class="photo-list">
            <router-link tag="li" v-for="item in list" :key="item.id" :to="'/home/photoinfo/'+item.id">
                <img v-lazy="item.img_url">
                <!--图片的文字区-->
                <div class="info">
                    <h1 class="info-title">{{item.title}}</h1>
                    <div class="info-body">{{item.zhaiyao}}</div>
                </div>
            </router-link>
        </ul>
    </div>
</template>
<script>
    //引入Tost
    import { Toast } from 'mint-ui';
    // 导入mui组件
    import mui from "../../lib/mui/js/mui.min.js";
    export default {
        data(){
            return {
                cates:[],//图片分类的数组
                list: [] //图片列表的数组
            }
        },
        created(){
            this.getImgCategory();// 图片分类
            this.getImgListById(0);//图片列表，默认全部
        },
        mounted(){
            // 全部dom元素渲染成功后执行的方法--处理样式时一般在mounted中使用
            mui('.mui-scroll-wrapper').scroll({
                deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            });
        },
        methods: {
            // 获取图片分类数据
            getImgCategory(){
                this.$http.get("api/getimgcategory").then(result => {
                    if(result.body.status === 0){
                        // 按照文档添加"全部"
                        result.body.message.unshift({title: "全部", id: 0});
                        this.cates = result.body.message;
                    }else{
                        Toast('图片分类获取失败');
                    }
                });
            },
            // 获取图片列表数据
            getImgListById(cateId){
                this.$http.get("api/getimages/"+cateId).then(result => {
                    if(result.body.status === 0){
                        this.list = result.body.message;
                    }else{
                        Toast('图片列表获取失败');
                    }
                });
            }
        }
    }
</script>
<style lang="scss" scoped>
    *{
        touch-action: pan-y;
    }
    /*设置图片懒加载样式*/
    .photo-list{
        list-style: none;
        margin: 0;
        padding: 5px;
        padding-bottom: 0;
        li{
            background-color: #cccccc;
            text-align: center;
            margin-bottom: 5px;// 每个图片之间的间距
            box-shadow: 0 0 9px #cccccc;// 盒子阴影
            position: relative;
            img{
                width: 100%;
                vertical-align: middle;
            }
            /*图片懒加载样式*/
            img[lazy=loading] {
                width: 40px;
                height: 300px;
                margin: auto;
            }
        }
        /*设置图片上字体样式*/
        .info{
            color: white;
            text-align: left;
            position: absolute;
            bottom: 0;//绝对定位和相对定位后将绝对定位的bottom设置为0
            background-color: rgba(0, 0, 0, 0.4);// 背景的透明度
            max-height: 84px;
            .info-title{
                font-size: 14px;
            }
            .info-body{
                font-size: 12px;
            }
        }
    }

</style>