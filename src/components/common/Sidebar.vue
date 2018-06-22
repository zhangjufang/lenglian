<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="rgb(0,52,102)"
            text-color="#fff" active-text-color="#20a0ff"  unique-opened router>
            <el-menu-item index="index">
               <i class="el-icon-menu"></i>
                <span slot="title">{{$t('Sidebar.home')}}</span>
            </el-menu-item>
            <el-submenu>
                <template slot="title">
                   <i class="el-icon-rank"></i>
                    <span slot="title">{{$t('Sidebar.frige')}}</span>
                </template>
                <el-menu-item index="list">{{$t('Sidebar.list')}}</el-menu-item>
                <el-menu-item index="group">{{$t('Sidebar.group')}}</el-menu-item>
            </el-submenu>
            <el-menu-item index="location">
                <i class="el-icon-location"></i>
                <span slot="title">{{$t('Sidebar.location')}}</span>
            </el-menu-item>
            <el-submenu>
                <template slot="title">
                   <i class="el-icon-view"></i>
                    <span slot="title">{{$t('Sidebar.moni')}}</span>
                </template>
                <el-menu-item index="Tabs">{{$t('Sidebar.box')}}</el-menu-item>
                <el-menu-item index="refirgerator">{{$t('Sidebar.refrigerator')}}</el-menu-item>
                <el-menu-item index="door">{{$t('Sidebar.door')}}</el-menu-item>
                <el-menu-item index="trend">{{$t('Sidebar.trend')}}</el-menu-item>
                <el-menu-item index="duration">{{$t('Sidebar.duration')}}</el-menu-item>

            </el-submenu>
           <el-menu-item index="form">
               <i class="el-icon-warning"></i>
                <span slot="title">{{$t('Sidebar.alarm')}}</span>
            </el-menu-item>
            <el-submenu >
                <template slot="title">
                   <i class="el-icon-sort"></i>
                    <span slot="title">{{$t('Sidebar.travel')}}</span>
                </template>
                <el-menu-item index="charts">{{$t('Sidebar.travel')}}</el-menu-item>
                <el-menu-item index="DragList">{{$t('Sidebar.detail')}}</el-menu-item>
                <el-menu-item index="upload">{{$t('Sidebar.add')}}</el-menu-item>
            </el-submenu>
            <el-submenu >
                <template slot="title">
                   <i class="el-icon-setting"></i>
                    <span slot="title">{{$t('Sidebar.log')}}</span>
                </template>
                <el-menu-item index="user">{{$t('Sidebar.user')}}</el-menu-item>
                <el-menu-item index="control">{{$t('Sidebar.control')}}</el-menu-item>
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
    width: 160px;
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
