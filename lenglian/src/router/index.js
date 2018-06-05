import Vue from 'vue';
import Router from 'vue-router';



Vue.use(Router);
// import baidu_map from '../components/page/baidu_map'
export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/index'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '自述文件' },
            children:[
                {
                    path: '/index',
                    component: resolve => require(['../components/page/index.vue'], resolve),
                    meta: { title: '首页' }
                },
                {
                    path: '/chest',
                    component: resolve => require(['../components/page/chest.vue'], resolve),
                    meta: { title: '轨迹' }
                },
                {
                    path: '/list',
                    component: resolve => require(['../components/page/list.vue'], resolve),
                    meta: { title: '列表' }
                },
                {
                    path: '/group',
                    component: resolve => require(['../components/page/group.vue'], resolve),
                    meta: { title: '分组' }
                },
                {
                    path: '/location',
                    component: resolve => require(['../components/page/location.vue'], resolve),
                    meta: { title: '定位' }
                },
                {
                    path: '/Tabs',
                    component: resolve => require(['../components/page/Tabs.vue'], resolve),
                    meta: { title: '箱体' }
                },
                {
                    path: '/refirgerator',
                    component: resolve => require(['../components/page/refirgerator.vue'], resolve),
                    meta: { title: '冷机' }
                },
                {
                    path: '/door',
                    component: resolve => require(['../components/page/door.vue'], resolve),
                    meta: { title: '箱门' }
                },
                {
                    path: '/trend',
                    component: resolve => require(['../components/page/trend.vue'], resolve),
                    meta: { title: '新风' }
                },
                {
                    path: '/duration',
                    component: resolve => require(['../components/page/duration.vue'], resolve),
                    meta: { title: '时长' }
                },
                {
                    path: '/form',
                    component: resolve => require(['../components/page/BaseForm.vue'], resolve),
                    meta: { title: '实时' }
                },
                {
                    // 富文本编辑器组件
                    path: '/editor',
                    component: resolve => require(['../components/page/VueEditor.vue'], resolve),
                    meta: { title: '历史' }
                },
                {
               
                    path: '/markdown',
                    component: resolve => require(['../components/page/Markdown.vue'], resolve),
                    meta: { title: '设置' }    
                },
                
                {
                  
                    path: '/charts',
                    component: resolve => require(['../components/page/BaseCharts.vue'], resolve),
                    meta: { title: '行程' }
                },
                
                {
                    
                    path: '/DragList',
                    component: resolve => require(['../components/page/DragList.vue'], resolve),
                    meta: { title: '详细' }
                },
                {
                    
                    path: '/upload',
                    component: resolve => require(['../components/page/Upload.vue'], resolve),
                    meta: { title: '添加' }  
                },
                {
                    
                    path: '/user',
                    component: resolve => require(['../components/page/user.vue'], resolve),
                    meta: { title: '用户' }
                },
                {
                    
                    path: '/control',
                    component: resolve => require(['../components/page/control.vue'], resolve),
                    meta: { title: '控制' }
                },
                {
                    // 权限页面
                    path: '/permission',
                    component: resolve => require(['../components/page/Permission.vue'], resolve),
                    meta: { title: '权限测试', permission: true }//权限测试
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            path: '/404',
            component: resolve => require(['../components/page/404.vue'], resolve)
        },
        {
            path: '/403',
            component: resolve => require(['../components/page/403.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        },
        // {//地图的公共部分
        //     path: '/baidu_map',
        //     component: resolve => require(['../components/page/baidu_map.vue'], resolve)
        // }
    ]
})
