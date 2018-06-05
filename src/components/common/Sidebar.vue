<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="rgb(0,52,102)"
            text-color="#fff" active-text-color="#20a0ff" unique-opened router>
            <template v-for="item in items" >
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                        </template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">
                            {{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
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
                items: [
                    {
                        icon: 'el-icon-menu',
                        index: 'index',
                        title: '首页'
                    },
                    {
                        icon: 'el-icon-rank',
                        index: 'chest',
                        title: '冷箱',
                        subs:[
                            {
                                index: 'list',
                                title: '列表'
                            },
                            {
                                index: 'group',
                                title: '分组'
                            },
                        ]
                    },
                    {
                        icon: 'el-icon-location',
                        index: 'location',
                        title: '定位',
                        subs: [
                            {
                                index: 'location',
                                title: '定位'
                            },
                            {
                                index: 'chest',
                                title: '轨迹'
                            },
                            // {
                            //     index: 'trace',
                            //     title: '追踪'
                            // },
                            // {
                            //     index: 'upload',
                            //     title: '文件上传'
                            // }
                        ]
                    },
                    {
                        icon: 'el-icon-view',
                        index: 'tabs',
                        title: '监控',
                        subs:[
                            {
                                index: 'Tabs',
                                title: '箱体'
                            },
                            {
                                index: 'refirgerator',
                                title: '冷机'
                            },
                            {
                                index: 'door',
                                title: '箱门'
                            },
                            {
                                index: 'trend',
                                title: '新风'
                            },
                            {
                                index: 'duration',
                                title: '时长'
                            },
                        ]

                    },
                    {
                        icon: 'el-icon-sort',
                        index: '3',
                        title: '报警',
                        subs: [
                            {
                                index: 'form',
                                title: '实时'
                            },
                            {
                                index: 'editor',
                                title: '历史'
                            },
                            {
                                index: 'markdown',
                                title: '设置'
                            },
                            // {
                            //     index: 'upload',
                            //     title: '文件上传'
                            // }
                        ]
                    },
                    {
                        icon: 'el-icon-setting',
                        index: 'charts',
                        title: '行程',
                        subs: [
                            {
                                index: 'charts',
                                title: '行程'
                            },
                            {
                                index: 'DragList',
                                title: '详细'
                            },
                            {
                                index: 'upload',
                                title: '添加'
                            },
                            
                        ]
                    },
                    {
                        icon: 'el-icon-warning',
                        index: 'drag',
                        title: '日志',
                        subs: [
                            {
                                index: 'user',
                                title: '用户'
                            },
                            {
                                index: 'control',
                                title: '控制'
                            }
                        ]
                    },
                    // {
                    //     icon: 'el-icon-warning',
                    //     index: 'permission',
                    //     title: '权限测试'
                    // },
                    // {
                    //     icon: 'el-icon-error',
                    //     index: '404',
                    //     title: '404页面'
                    // }
                ]
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
