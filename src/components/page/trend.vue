<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="rgb(0,52,102)"
            text-color="#fff" active-text-color="#20a0ff"  unique-opened router>
            <el-menu-item index="/index">
               <i class="el-icon-menu"></i>
                <span slot="title">首页</span>
            </el-menu-item>
            <el-submenu index="2">
                <template slot="title">
                   <i class="el-icon-rank"></i>
                    <span slot="title">冷箱</span>
                </template>
                <el-menu-item index="/chest">列表</el-menu-item>
                <el-menu-item index="/group">分组</el-menu-item>
            </el-submenu>
            <el-menu-item index="/location">
                <i class="el-icon-location"></i>
                <span slot="title">定位</span>
            </el-menu-item>
            <el-submenu >
                <template slot="title">
                   <i class="el-icon-view"></i>
                    <span slot="title">监控</span>
                </template>
                <el-menu-item index="Tabs">箱体</el-menu-item>
                <el-menu-item index="/refirgerator">冷机</el-menu-item>
                <el-menu-item index="/door">箱门</el-menu-item>
                <el-menu-item index="/trend">新风</el-menu-item>
                <el-menu-item index="/duration">时长</el-menu-item>
            </el-submenu>
           <el-submenu index="5">
                <template slot="title">
                   <i class="el-icon-warning"></i>
                    <span slot="title">报警</span>
                </template>
                <el-menu-item index="/form">实时</el-menu-item>
                <el-menu-item index="/editor">历史</el-menu-item>
                <el-menu-item index="/markdown">设置</el-menu-item>
            </el-submenu>
            <el-submenu index="5">
                <template slot="title">
                   <i class="el-icon-sort"></i>
                    <span slot="title">行程</span>
                </template>
                <el-menu-item index="charts">行程</el-menu-item>
                <el-menu-item index="DragList">详细</el-menu-item>
                <el-menu-item index="upload">添加</el-menu-item>
            </el-submenu>
            <el-submenu index="5">
                <template slot="title">
                   <i class="el-icon-setting"></i>
                    <span slot="title">日志</span>
                </template>
                <el-menu-item index="user">用户</el-menu-item>
                <el-menu-item index="control">控制</el-menu-item>
            </el-submenu>
            <div class="collapse-btn" @click="collapseChage">
                <i class="el-icon-d-arrow-right"></i>
            </div>
        </el-menu>
    </div>
    
</template>

<script>
    import bus from '../common/bus';
    export default {
        data() {
            return {
                collapse: false,
                
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        },
        created(){
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })
        },
        methods:{
             // 侧边栏折叠
            collapseChage(){
                this.collapse = !this.collapse;
                bus.$emit('collapse', this.collapse);
            },
        }
    }
</script>

<style scoped>

.sidebar{
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom:0;
}
.sidebar-el-menu:not(.el-menu--collapse){
    width: 150px;
}
.sidebar > ul {
    height:100%;
}
.collapse-btn{
    float: left;
    padding: 0 21px;
    cursor: pointer;
    line-height: 70px;
    color:rgb(144, 147, 153);
}
</style>
