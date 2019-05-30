<template>
    <div class="mui-numbox" data-numbox-min='1' data-numbox-max="9" style="height: 25px">
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" :value="initcount" @change="countChanged" ref="numberbox" readonly/>
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
</template>
<script>
    // 导入mui组件
    import mui from "../../lib/mui/js/mui.js"
    export default {
        // 初始化
        mounted() {
            mui(".mui-numbox").numbox()
        },
        methods: {
            // 当数量变化时调用$store中的updateGoodsInfo方法并将商品id和最新值传递过去
            countChanged(){
                // console.log(this.$refs.numberbox.value);
                this.$store.commit("updateGoodsInfo", {
                    id: this.goodsid,
                    count: this.$refs.numberbox.value
                })
            }
        },
        props: ["initcount", "goodsid"]
    }
</script>
<style></style>