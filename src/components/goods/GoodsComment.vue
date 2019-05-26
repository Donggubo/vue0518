<template>
    <div>
        <comments :id="id"></comments>
    </div>
</template>
<script>
    import comments from "../subcomponents/Comment.vue"
    export default {
        data(){
            return {
                id: this.$route.params.id
            }
        },
        components: {
            comments
        }
    }
</script>
<style></style>