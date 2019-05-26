<template>
    <div>
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="item in lunbotuList" :key="item.id">
                <img :src="item.img" :class="{'full': isfull}">
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>
<script>
    export default {
        props: ["lunbotuList", "isfull"]
    }
</script>
<style lang="scss" scoped>
    /*轮播图样式*/
    .mint-swipe{
        height: 200px;
        text-align: center;
        margin: 10px;
        .mint-swipe-item{
            width: 100%;
            &:nth-child(1){
                 background-color: white;
             }
            &:nth-child(2){
                background-color: white;
             }
            &:nth-child(3){
                 background-color: white;
             }
        }
        img{
            //width: 100%;
            height: 100%;
        }
        .full{
            width: 100%;
        }
    }
</style>