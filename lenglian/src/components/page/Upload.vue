<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item> 行程</el-breadcrumb-item>
                <el-breadcrumb-item>添加行程 </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
    </div>
</template>

<script>
    import VueCropper  from 'vue-cropperjs';
    export default {
        data: function(){
            return {
                defaultSrc: './static/img/img.jpg',
                fileList: [],
                imgSrc: '',
                cropImg: '',
                dialogVisible: false,
            }
        },
        components: {
           
        },
        methods:{
            
        },
        created(){
           
        }
    }
</script>

<style scoped>

</style>