<template>
    <div class="mui-numbox" data-numbox-min='1'><!--data-numbox-max = '9'被mui(".mui-numbox").numbox().setOption('max',newVal)代替-->
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" value="1" @change="countChanged" ref="numberbox"/>
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
</template>
<script>
    // 导入mui组件
    import mui from "../../lib/mui/js/mui.js"
    export default {
        // 接收来自父组件的最大库存
         props: ["max"],
        // 初始化
        mounted() {
            mui(".mui-numbox").numbox()
        },
        methods: {
            countChanged(){
                this.$emit("getcount", parseInt(this.$refs.numberbox.value));
            }
        },
        // 监听父组件传递的库存情况
        watch: {
            max: function (newVal, oldVal) {
                // console.log("==="+newVal);
                mui(".mui-numbox").numbox().setOption('max',newVal)
            }
        }
    }
</script>
<style></style>