<template>
    <div>
        <div style="display: flex;justify-content: space-between;">
            <div class="crumbs" style="width:100px;" >
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item> 集装箱列表</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div>
                <el-select
                    v-model="value"
                    multiple
                    filterable
                    remote
                    @change="test(value)"
                    reserve-keyword
                    placeholder="请输入设备关键词"
                    :remote-method="remoteMethod"
                    :loading="loading" style="margin-top:-5px;margin-left:-80%;height: 32px;overflow:hidden;">
                        <el-option
                        v-for="item in options"
                        :key="item.name"
                        :label="item.name"
                        :value="item.name">
                    </el-option>
                </el-select>
            </div>
            <div class="he" style="width:700px;height:30px;display: flex;justify-content: space-between;margin-right:2%;">
                <div class="box" >全部集装箱&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{items.length}}&nbsp;&nbsp;个</div>
                <div class="box">在线</div>
                <div class="box">离线</div>
                <div class="box">报警</div>
            </div> 
        </div>
        <div class="tab" style="display: flex;justify-content: space-between;width:100%;">
            <template>
                <el-table :data="tableData3" border  style="width:35%;margin-top:20px;border:1px solid rgb(180, 173, 173);font-size:10px;" class="el" height="68vh"  :default-sort = "{prop: 'date', order: 'descending'}">
                    <el-table-column fixed prop="name" label="箱体编号" width="100" sortable></el-table-column>
                    <el-table-column prop="ambient_temp" label="箱内温度°C" width="98" sortable></el-table-column>
                    <!-- <el-table-column prop="gps_humi" label="箱内湿度%" width="110" sortable></el-table-column> -->
                    <el-table-column prop="zone_status" label="机组状态" width="120"></el-table-column>
                    <el-table-column prop="cooler_set_temp" label="设定温度°C" width="80"></el-table-column>
                    <!-- <el-table-column prop="re_air_temp" label="回风温度°C" width="110" sortable></el-table-column>
                    <el-table-column prop="out_air_temp" label="出风温度°C" width="110" sortable></el-table-column> -->
                    <el-table-column prop="ambient_temp" label="环境温度°C" width="84"></el-table-column>
                    <el-table-column prop="insert_time" label="更新时间" ></el-table-column>
                </el-table>
            </template>
           <div id="dituContent"></div>
        </div>
        <div class="grid">
            <template >
                <el-table :data="tableData3" border style="width:100%;margin-top:20px;text-color:#000;border:1px solid rgb(180, 173, 173);"  height="9vh"  :default-sort = "{prop: 'date', order: 'descending'}">
                    <el-table-column fixed prop="name" label="箱体编号" width="105" sortable ></el-table-column>
                    <el-table-column prop="ambient_temp" label="箱内温度°C" width="108" sortable></el-table-column>
                    <el-table-column prop="gps_humi" label="箱内湿度%" width="108" sortable></el-table-column>
                    <!-- <el-table-column prop="zone_status" label="机组状态" width="150"></el-table-column> -->
                    <el-table-column prop="cooler_set_temp" label="设定温度°C" width="84"></el-table-column>
                    <el-table-column prop="re_air_temp" label="回风温度°C" width="108" sortable></el-table-column>
                    <el-table-column prop="out_air_temp" label="出风温度°C" width="108" sortable></el-table-column>
                    <el-table-column prop="ambient_temp" label="环境温度°C" width="84"></el-table-column>
                    <el-table-column prop="cooler_voltage" label="冷机电压" width="75"></el-table-column>
                    <el-table-column prop="gps_voltage" label="副电压" width="82" sortable></el-table-column>
                    <el-table-column prop="current" label="机组电流" width="70"></el-table-column>
                    <el-table-column prop="water_temp" label="机组水温°C" width="84"></el-table-column>
                    <el-table-column prop="suction_press" label="吸气压力" width="70"></el-table-column>
                    <el-table-column prop="discharge_press" label="排气压力" width="70"></el-table-column>
                    <el-table-column prop="insert_time" label="更新时间" width="100" sortable></el-table-column>
                    <el-table-column prop="insert_time" label="地址"></el-table-column>
                </el-table>
            </template>
        </div>
    </div>
</template>


<script>
    export default {
        data() {
            return {
            options: [],
            value: [],
            list: [],
            loading: false, 
            items:[],
            tableData3:[],
            points:[
                // {"longitude":116,"latitude":40,"id":50,"name":"p1"},  
                // {"longitude":117,"latitude":31,"id":2,"name":"p2"},  
                // {"longitude":116,"latitude":34,"id":3,"name":"p3"} 
            ]
            // markerArr:[]
            // nameArray :[],
            // labelArray : [],
            // contentArray:[],
            // infoWindowArray:[],
            // markerArray:[],
            // index_lnglat:{},
            // longitudeArray:[],
            // latitudeArray:[],
            // timeArray:[],
            // gpsTimeArray:[],
            // speedArray:[],
            // gpsTemp1:[],
            // gpsTemp2:[],
            // gpsTemp3:[],
            // gpsTemp4:[],
            // coolerStatus:[],
            // doorStatus:[],
        }
    },
   mounted () {
      this.initMap()
      this.list = this.states.map(item => {
        return { value: item, label: item };
      });
    },
    methods: {
        test(value){
            this.tableData3 = this.items.filter((item)=>{
                return value.indexOf(item.name)>-1;
            });
        },
      //搜索框
      getstates() {
        this.$axios.post('/api/d/container_list_json',this.qs.stringify({})).then((data) =>{
        //    console.log(data)
            this.items=data.data.result;
        });
      }, 
      //设备列表
      getlist() {
        this.$axios.post('/api/d/container_latest_json',this.qs.stringify({})).then((data) =>{
        //    console.log(data)
            this.items=data.data.result;
            this.tableData3=data.data.result;
            this.points=data.data.result;
            console.log(this.points)
        });
      }, 
      //创建地图
        initMap() {  
            var map = new BMap.Map("dituContent"); // 创建Map实例  
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
        },
    addMarker(points){  // 创建图标对象        
        for(var i = 0;i <points.length;i++){  
            var point = new BMap.Point(points[i].longitude,points[i].latitude);      
            var  marker = new BMap.Marker(point);     
            map.addOverlay(marker);   
            //给标注点添加点击事件。使用立即执行函数和闭包  
            // (function() {  
            //     var thePoint = points[i];  
            //     marker.addEventListener("click",function(){  
            //         makeInfoWindow(this,thePoint);  
            //     });  
            // })();  
            }
     },
    //    makeInfoWindow(thisMaker,point){  
    //         var Content =  
    //         '<ul style="margin:0 0 5px 0;padding:0.2em 0">'  
    //         +'<li style="line-height: 26px;font-size: 15px;">'  
    //         +'<span style="width: 50px;display: inline-block;">id：</span>' + point.id + '</li>'  
    //         +'<li style="line-height: 26px;font-size: 15px;">'  
    //         +'<span style="width: 50px;display: inline-block;">名称：</span>' + point.name + '</li>'    
    //         var infoWindow = new BMap.InfoWindow(Content);  // 创建信息窗口对象  
    //         thisMaker.openInfoWindow(infoWindow);  
    //     },
      remoteMethod(query) {
        // console.log("query===",query,this.items);
        if (query !== '') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.options = this.items.filter(item => {
              return item.name.toLowerCase()
                .indexOf(query.toLowerCase()) > -1;
            });
          }, 200);
        } else {
          this.options = [];
        }
      }
    },
    created: function(){
        this.getstates()
        this.getlist()
      }
}
</script>

<style>
.el-table th{
    background:rgb(31, 75, 116) !important;
    color:#fff;
    padding:0px 0;
}
.el th{
    background:none !important;
    color:black;
}
.el-table .cell{
    line-height: 14px; 
}
.box{
    width:160px;
    height: 35px;
    line-height: 35px;
    margin-left: -20px;
    margin-top:-10px;
    border: 2px solid #005fc6;
    background-color: #ffffff;
    border-radius: 5px;
    font-size: 14px;
    padding-left: 10px;
    color:#005fc6;
}
.box:nth-child(2){
    color:#fff;
    background-color: rgb(66, 167, 66);
    border: 2px solid  rgb(66, 167, 66);
}
.box:nth-child(3){
    color:#fff;
    background-color: rgb(180, 173, 173);
    border: 2px solid  rgb(180, 173, 173);
}
.box:nth-child(4){
    color:#fff;
    background-color: rgb(245, 108, 108);
    border: 2px solid  rgb(245, 108, 108);
}
.tab{
    border-top:2px solid rgb(180, 173, 173);
}
#dituContent{
  float: left;
  height:68vh;
  margin-top:20px;
  margin-left:30px;
  border:1px solid transparent;
  border-radius: 3px;
  width:53%;
  border:1px solid rgb(180, 173, 173);
}
</style>
