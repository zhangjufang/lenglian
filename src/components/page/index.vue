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
                    :loading="loading" style="margin-top:-10px;margin-left:-140%;">
                        <el-option
                        v-for="item in options"
                        :key="item.name"
                        :label="item.name"
                        :value="item.name">
                    </el-option>
                </el-select>
            </div>
            <div class="he" style="width:460px;height:30px;display: flex;justify-content: space-between;margin-right:2%;">
                <div class="box" >全部集装箱</div>
                <div class="box">在线</div>
                <div class="box">离线</div>
                <div class="box">报警</div>
            </div> 
        </div>
        <div class="tab" style="display: flex;justify-content: space-between;width:100%;">
            <template>
                <el-table :data="tableData3" border  style="width:35%;margin-top:20px;border:1px solid rgb(180, 173, 173);" class="el" height="55vh"  :default-sort = "{prop: 'date', order: 'descending'}">
                    <el-table-column fixed prop="name" label="箱体编号" width="105" sortable></el-table-column>
                    <el-table-column prop="ambient_temp" label="箱内温度°C" width="108" sortable></el-table-column>
                    <!-- <el-table-column prop="gps_humi" label="箱内湿度%" width="110" sortable></el-table-column> -->
                    <el-table-column prop="zone_status" label="机组状态" width="120"></el-table-column>
                    <el-table-column prop="cooler_set_temp" label="设定温度°C" width="84"></el-table-column>
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
                <el-table :data="tableData3" border style="width:100%;margin-top:20px;text-color:#000;border:1px solid rgb(180, 173, 173);"  height="20vh"  :default-sort = "{prop: 'date', order: 'descending'}">
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
            points:[]
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
      initMap () {
        this.createMap() ; //创建地图 
        this.setMapEvent();//设置地图事件
        this.addMapControl();//向地图添加控件
        this.addMarker();//向地图中添加marker
      },
      createMap(){
        var map = new BMap.Map("dituContent");//在百度地图容器中创建一个地图
        var point = new BMap.Point(108.957388,34.368249);//定义一个中心点坐标
        map.centerAndZoom(point,5);//设定地图的中心点和坐标并将地图显示在地图容器中
        window.map = map;//将map变量存储在全局
      },
      setMapEvent(){
        map.enableDragging();//启用地图拖拽事件，默认启用(可不写)
        map.enableScrollWheelZoom();//启用地图滚轮放大缩小
        map.enableDoubleClickZoom();//启用鼠标双击放大，默认启用(可不写)
        map.enableKeyboard();//启用键盘上下左右键移动地图
      },
      addMapControl(){
        //向地图中添加缩放控件
        var ctrl_nav = new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_LEFT,type:BMAP_NAVIGATION_CONTROL_LARGE});
        map.addControl(ctrl_nav);
        //向地图中添加缩略图控件
        var ctrl_ove = new BMap.OverviewMapControl({anchor:BMAP_ANCHOR_BOTTOM_RIGHT,isOpen:1});
        map.addControl(ctrl_ove);
        //向地图中添加比例尺控件
        var ctrl_sca = new BMap.ScaleControl({anchor:BMAP_ANCHOR_BOTTOM_LEFT});
        map.addControl(ctrl_sca);
      },
      //添加标注
        addMarker(){
            map.clearOverlays();
            var point=this;
            var pointX=point.split(',');
        　　 var marker = new BMap.Marker(new BMap.Point(pointX[longitude],pointX[latitude])); // 创建标注
        　　 map.addOverlay(marker); // 将标注添加到地图中
            var infoWindow = new BMap.InfoWindow("欢迎光临"); // 创建信息窗口对象
            marker.addEventListener("click", function(){ this.openInfoWindow(infoWindow);})
        },
      //搜索框
      getstates() {
        this.$axios.post('/api/d/container_list_json',this.qs.stringify({})).then((data) =>{
           console.log(data)
            this.items=data.data.result;
        });
      }, 
      //设备列表
      getlist() {
        this.$axios.post('/api/d/container_latest_json',this.qs.stringify({})).then((data) =>{
           console.log(data)
            this.items=data.data.result;
            this.tableData3=data.data.result;
            
        });
      }, 
      remoteMethod(query) {
        console.log("query===",query,this.items);
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
    padding:5px 0;
}
.el th{
    background:none !important;
    color:black;
}
.el-table .cell{
    line-height: 18px; 
}
.box{
    width:100px;
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
  height:55vh;
  margin-top:20px;
  margin-left:30px;
  border:1px solid transparent;
  border-radius: 3px;
  width:53%;
  border:1px solid rgb(180, 173, 173);
}
</style>
