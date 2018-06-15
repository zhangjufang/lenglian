<template>
    <div id="mapbox">

    </div>
</template>

<script>
    export default {
        data() {
            return {
                
            }
        },
        mounted(){
            var map = new BMap.Map("mapbox"); // 创建Map实例  
            // this.map = map;
            var point = new BMap.Point(96.404, 35.917); //地图中心点
            map.centerAndZoom(point, 5); // 初始化地图,设置中心点坐标和地图级别。  
            map.enableScrollWheelZoom(true); //启用滚轮放大缩小  
            var marker = new BMap.Marker(point);//创建标注
            // map.addOverlay(marker);//方法addOverlay() 向地图中添加覆盖物
            map.addControl(new BMap.OverviewMapControl({isOpen:true,anchor:BMAP_ANCHOR_BOTTOM_RIGHT}));
            //向地图中添加缩放控件  
            var ctrlNav = new window.BMap.NavigationControl({  
                anchor: BMAP_ANCHOR_TOP_LEFT,  
                type: BMAP_NAVIGATION_CONTROL_LARGE  
            });  
            map.addControl(ctrlNav);  
            //向地图中添加缩略图控件  
            var ctrlOve = new window.BMap.OverviewMapControl({  
                anchor: BMAP_ANCHOR_BOTTOM_RIGHT,  
                isOpen: 1  
            });  
            map.addControl(ctrlOve);  
            //向地图中添加比例尺控件  
            var ctrlSca = new window.BMap.ScaleControl({  
                anchor: BMAP_ANCHOR_BOTTOM_LEFT  
            }); 
            this.$emit('returnMap',map);
        },
        methods: {
            
        },
        computed: {
           
        },
        watch:{
            
        },
        created(){
            
        }
    }
</script>


<style>
</style>