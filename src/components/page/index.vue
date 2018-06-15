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

                    filterable
                    remote
                    @change="test(value)"
                    reserve-keyword
                    placeholder="请输入设备关键词"
                    :remote-method="remoteMethod"
                    :loading="loading" style="margin-top:-5px;margin-left:-80%;height: 32px;">
                        <el-option
                        v-for="item in options"
                        :key="item.name"
                        :label="item.name"
                        :value="item.name">
                    </el-option>
                </el-select>
            </div>
            <div class="he" style="width:600px;height:30px;display: flex;justify-content: space-between;margin-right:2%;">
                <div class="box" >全部集装箱:&nbsp;&nbsp;&nbsp;&nbsp;{{items.length}}个</div>
                <div class="box">在线:</div>
                <div class="box">离线:</div>
                <div class="box">报警:</div>
            </div> 
        </div>
        <div class="tab" style="display: flex;justify-content: space-between;width:100%;">
            <template>
                <el-table :data="tableData3" border  style="width:35%;margin-top:20px;border:1px solid rgb(180, 173, 173);font-size:10px;" class="el" height="68vh"  :default-sort = "{prop: 'date', order: 'descending'}">
                    <el-table-column fixed prop="name" label="箱体编号" width="100" sortable></el-table-column>
                    <el-table-column prop="ambient_temp" label="箱内温度°C" width="108" sortable></el-table-column>
                    <el-table-column prop="gps_humi" label="箱内湿度%" width="110" sortable></el-table-column>
                    <el-table-column prop="zone_status" label="机组状态" width="120"></el-table-column>
                    <el-table-column prop="cooler_voltage" label="冷机电压" width="75"></el-table-column>
                    <!-- <el-table-column prop="cooler_set_temp" label="设定温度°C" width="100"></el-table-column> -->

                    <!-- <el-table-column prop="re_air_temp" label="回风温度°C" width="110" sortable></el-table-column>
                    <el-table-column prop="out_air_temp" label="出风温度°C" width="110" sortable></el-table-column> -->
                    <!-- <el-table-column prop="ambient_temp" label="环境温度°C" width="84"></el-table-column> -->
                    <el-table-column prop="insert_time" label="更新时间" ></el-table-column>
                </el-table>
            </template>
           <BMap class="mapstyle" @returnMap="receiveMap"></BMap>
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
import BMap from '../common/BMap';
    export default {
        data() {
            return {
            options: [],
            value: [],
            list: [],
            loading: false, 
            items:[],
            tableData3:[],
            points:[],
            states:[],
            map:null,
        }
    },
   mounted () {
        this.getstates();
        // this.infoWindow();
        this.getlist();
        this.list = this.states.map(item => {
        return { value: item, label: item};
      });
    },
    methods: {
        receiveMap(map){
            this.map = map;
        },
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
            this.items=data.data.result;
            this.tableData3=data.data.result;
            this.addMarker(data.data.result);
        
            // var conNum_total = 0;
            // var conNum_online = 0;
            // var conNum_offline = 0;
            // var conNum_alarm = 0;
            // var nowTime = new Date().getTime();
            // nowTime = nowTime/1000 - 1200;
            // for(var i = 0;i<this.items.length;i++ ){
            //     conNum_total++;
            //     if(this.items[i].insert_time > nowTime){
            //         conNum_online ++;
            //     }else{
            //         conNum_offline++;
            //     }
            // }
        });
      }, 
    addMarker(points){  // 创建图标对象     
    // console.log(BMap,BMap.point);   
        for(var i = 0;i <points.length;i++){  
            var point = new window.BMap.Point(points[i].longitude,points[i].latitude);      
            var  marker = new window.BMap.Marker(point);    
            this.map.addOverlay(marker);
             var opts = {    
                width : 50,     // 信息窗口宽度    
                height: 280,     // 信息窗口高度    
                }  ;
             var sContent ='<h3>'+points[i].name+'</h3>' ;
                sContent+='</br>定位地址：';
                sContent+='</br>定位时间：'+points[i].insert_time;
                sContent+='</br>速    度：'+points[i].speed+'Km/h';
                sContent+='</br>方    向：';
                sContent+='</br>箱内温度：'+points[i].ambient_temp+'°C';
                sContent+='</br>设定温度：'+points[i].cooler_set_temp+'°C';
                sContent+='</br>出风温度：'+points[i].out_air_temp+'°C';
                sContent+='</br>机组模式：'+points[i].zone_status
                sContent+='</br>报警代码：'+points[i].zone_alarm_code;
                sContent+='</br>数据时间：'+points[i].gps_time;
                var infoWindow = new window.BMap.InfoWindow(sContent,opts); 
            marker.addEventListener("click", function(e){  
                //获取点的信息
                this.map.openInfoWindow(infoWindow,point); //开启信息窗口
            });
            i++;
        }
     },
    
        
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
        
      },
      components:{
          BMap
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
    width:130px;
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
.mapstyle{
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