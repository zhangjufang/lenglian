
<template>
    <div>
        <div style="display: flex;justify-content: space-between;">
            <div class="crumbs" style="width:100px;" >
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item> {{$t('index.list')}}</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div>
                <el-select
                    v-model="value"
                    filterable
                    remote
                    clearable
                    @change="test(value)"
                    reserve-keyword
                    placeholder="请输入设备关键词"
                    :remote-method="remoteMethod"
                    :loading="loading" style="margin-top:-5px;margin-left:-60%;height: 32px;">
                        <el-option
                        v-for="item in options"
                        :key="item.name"
                        :label="item.name"
                        :value="item.name">
                    </el-option>
                </el-select>
            </div>
            <div class="he" style="width:600px;height:30px;display: flex;justify-content: space-between;margin-right:2%;">
                <div class="box" >{{$t('index.full')}}：{{items.length}}个</div>
                <div class="box">{{$t('index.on')}}: {{onlineSize}}个</div>
                <div class="box">{{$t('index.off')}}: {{offlineSize}}个</div>
                <div class="box">{{$t('index.alarm')}}: 0 个</div>
            </div> 
        </div>
        <div class="tab" style="display: flex;justify-content: space-between;width:100%;">
            <template>
                <el-table :data="tableData3" border  style="width:35%;margin-top:20px;border:1px solid rgb(180, 173, 173);font-size:10px;" 
                class="el" height="68vh"  @row-click="openalert" :default-sort = "{prop: 'date', order: 'descending'}">
                    <el-table-column fixed prop="name" :label="$t('index.full')"  width="100" sortable></el-table-column>
                    <el-table-column prop="ambient_temp" label="箱内温度°C" width="110" sortable></el-table-column>
                    <el-table-column prop="gps_humi" label="箱内湿度%" width="110" sortable></el-table-column>
                    <el-table-column prop="zone_status" label="机组状态" width="75"></el-table-column>
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
                <el-table :data="tableData3" border style="width:100%;margin-top:20px;text-color:#000;border:1px solid rgb(180, 173, 173);" class="table2"  height="11vh"  :default-sort = "{prop: 'date', order: 'descending'}">
                    <el-table-column fixed prop="name" label="箱体编号" width="110" sortable ></el-table-column>
                    <!-- <el-table-column prop="ambient_temp" label="箱内温度°C" width="120" sortable></el-table-column> -->
                    <el-table-column prop="gps_humi" label="箱内湿度%" width="108" sortable></el-table-column>
                    <!-- <el-table-column prop="zone_status" label="机组状态" width="150"></el-table-column> -->
                    <el-table-column prop="cooler_set_temp" label="设定温度°C" width="90"></el-table-column>
                    <el-table-column prop="re_air_temp" label="回风温度°C" width="110" sortable></el-table-column>
                    <el-table-column prop="out_air_temp" label="出风温度°C" width="110" sortable></el-table-column>
                    <el-table-column prop="ambient_temp" label="环境温度°C" width="90"></el-table-column>
                    <el-table-column prop="cooler_voltage" label="冷机电压" width="75"></el-table-column>
                    <el-table-column prop="gps_voltage" label="副电压" width="85" sortable></el-table-column>
                    <el-table-column prop="current" label="机组电流" width="75"></el-table-column>
                    <el-table-column prop="water_temp" label="机组水温°C" width="88"></el-table-column>
                    <el-table-column prop="suction_press" label="吸气压力" width="75"></el-table-column>
                    <el-table-column prop="discharge_press" label="排气压力" width="75"></el-table-column>
                    <el-table-column prop="insert_time" label="更新时间" width="145"  sortable></el-table-column>
                    <el-table-column prop="address" label="地址"></el-table-column>
                </el-table>
            </template>
        </div>
        <div class="alert-tab"  v-show="look" ref="main">
          <div style=" z-index:999;margin-left:50px;margin-top:20px;">
            <span>箱体编号：</span><span>DTU编号：</span>
            <el-button style="float:right;margin-right:20px;padding:5px 6px;" @click="togglePanel">关闭</el-button>
          </div>
            <div class="tittl" style="font-size:18px;">
                <div style="width：10%；border-right：1px solid rgb(83, 163, 233);"><p @click="servicePro">冷机</p></div>
                <p @click="tencent">传感器</p>
                <p @click="zizhi">控制</p>
            </div>
            <div class="lengji" v-show="servicePro1">
                    <div class="lengji1" >
                        <span>冷机通讯：{{detail.address}}</span> <br>
                        <span>冷机电压（V）：</span><br>
                        <span>环境温度(°C)：</span> <br> 
                        <span>环境温度(°C)：</span> <br>
                        <span>环境温度(°C)：</span> <br>
                        <span>出风温度(°C)：</span> <br>
                        <span>蒸发器盘管温度(°C):</span> <br>
                    </div>
                     <div class="lengji1" >
                        <span>状态信息有效：</span> <br>
                        <span>软件版本：</span> <br>
                        <span>备电运行时间(h)：</span> <br>
                        <span>总工作时间(h)：</span> <br>
                        <span>引擎工作时间(h)：</span> <br>
                        <span>告警码：</span> <br>
                    </div>
             
            </div>
              <div class="lengji" v-show="tencent1">
                <div class="lengji1" >
                        <span>湿度(%)：</span> <br>
                        <span>温度1(°C)：</span><br>
                        <span>温度2(°C)：</span> <br> 
                        <span>温度3(°C)：</span> <br>
                        <span>平均温度(°C)：</span> <br>
                        <span>CO2(ppm)：</span> <br>
                        <span>蒸发器盘管温度(°C):</span> <br>
                    </div>
                     <div class="lengji1" >
                        <span>电压(V)：</span> <br>
                        <span>油位(%)：</span> <br>
                        <span>速度(Km/h)：</span> <br>
                        <span>方向(度)：</span> <br>
                        <span>经纬度：</span> <br>
                        <span>门状态：</span> <br>
                    </div>
             
            
            </div>
            <div class="kongzhi" v-show="zizhi1">
                <div class="kongzhi">
                  <b  style="float:left;">机组开关:</b>
                  <span style="margin-left:70px;">
                    <el-button type="primary">开启机组</el-button>
                    <el-button type="danger">关闭机组</el-button>
                  </span>
                  <span style="margin-left:20px;margin-top:10px;">最近一次操作：      时间：</span>
                </div>
                <div class="kongzhi1">
                  <b  style="float:left;">设置温度(°C)：</b>
                  <span style="margin-left:30px;">
                  <el-input v-model="input" style="width:120px" placeholder="请输入内容"></el-input>
                    <el-button type="primary">设置</el-button>
                  </span>
                  <span style="margin-left:20px;margin-top:10px;">最近一次操作：      时间：</span>
                </div>
                <div class="kongzhi1">
                  <b  style="float:left;">清除报警：</b>
                  <span style="margin-left:60px;">
                  
                    <el-button type="primary">清除报警</el-button>
                  </span>
                  <span style="margin-left:20px;margin-top:10px;">最近一次操作：清除报警      时间：</span>
                </div>
                <div class="kongzhi1">
                  <b  style="float:left;">除霜：</b>
                  <span style="margin-left:93px;">
                  
                    <el-button type="primary">初始化除霜</el-button>
                  </span>
                </div>
                <div class="kongzhi1">
                  <b  style="float:left;">工作模式：</b>
                  <span style="margin-left:60px;">
                  <el-button >连续模式</el-button>
                    <el-button type="primary">循环模式</el-button>
                  </span>
                  <div style="margin-left:140px;margin-top:10px;">最近一次操作：设置cs模式为      时间：</div>
                </div>
                <div class="kongzhi1">
                  <b  style="float:left;">新风门开关：</b>
                  <span style="margin-left:45px;">
                  <el-select v-model="value1" placeholder="请选择" style="width:120px;z-index:999999">
                      <el-option
                        v-for="index in option"
                        :key="index.value1"
                        :label="index.label"
                        :value="index.value">
                      </el-option>
                    </el-select>

                    <el-button type="primary">设置新风</el-button>
                     <el-button type="danger">关闭新风</el-button>
                  </span>
                  <div  style="margin-left:140px;margin-top:10px;">最近一次操作：     时间：</div>
                </div>
          </div>
    </div>
  </div>
</template>


<script>
import BMap from "../common/BMap";
import lnglatCon from "../common/lnglat-convertor.js";
export default {
  data() {
    return {
      option: [{
          value: '选项1',
          label: '关闭新风'
        }, {
          value: '选项2',
          label: '20%开启'
        }, {
          value: '选项3',
          label: '40%开启'
        }, {
          value: '选项4',
          label: '60%开启'
        }, {
          value: '选项5',
          label: '80%开启'
        }, {
          value: '选项4',
          label: '100%开启'
        }],
      value1: '',
      options: [],
      value: [],
      list: [],
      loading: false,
      items: [],
      tableData3: [],
      points: [],
      states: [],
      map: null,
      markers:[],
      servicePro1: true,
      tencent1: false,
      zizhi1: false,
      input:'',
      look:false,
      detail:{},
      onlineSize:0,
      offlineSize:0
    };
  },
  mounted() {
    this.getstates();
    // this.infoWindow();
    this.getlist();
    this.list = this.states.map(item => {
      return { value: item, label: item };
    });
  },
  methods: {
    receiveMap(map) {
      this.map = map;
    },
    test(value) {
      this.tableData3 = this.items.filter((item,index) => {
        if(value.indexOf(item.name) > -1){
            // console.log(this.markers,this.markers[index]);
            this.markers[index].V.click();
            return true;
        }else{
            return false;
        }
      });
    },
    //搜索框
    getstates() {
      this.$axios
        .post("/api/d/container_list_json", this.qs.stringify({}))
        .then(data => {
            //  console.log(data)
          this.items = data.data.result;
        });
    },
    //设备列表
    getlist() {
      this.$axios
        .post("/api/d/container_latest_json", this.qs.stringify({}))
        .then(data => {
          // console.log(data.data.result);
          var result = data.data.result.map((item,i) => {
            /**
             * 各种-999转换为-
             */
            Object.keys(item).forEach(key => {
              if (key == "zone_status") {
                //机组状态值处理
                if (item[key] == "0") {
                  item[key] = "不明状态";
                }
              } if(item[key] == "-999"||item[key] == "-99") {
                  item[key] = "-";
              }if(key == "cooler_voltage"){
                if (item[key] !== "-") {
                 item[key] =  item[key]/100;
                } 
              }if(key == "gps_voltage"){
                item[key] =  item[key]/10;
              }if(key == "cooler_set_temp"){
                if (item[key] !== "-") {
                 item[key] =  item[key]/10;
                } 
              }if(key == "out_air_temp"){
                if (item[key] !== "-") {
                 item[key] =  item[key]/10;
                } 
              } if(key == "speed"){
                if (item[key] !== " ") {
                 item[key] = Math.round(item[key]*100)/100;
                } 
              }else{
                return;
              }
            });
            /**
             * 经纬度转换
             */
            var lnglat = lnglatCon.wgs84togcj02(
              parseFloat(item.longitude),
              parseFloat(item.latitude)
            );
            lnglat = lnglatCon.gcj02tobd09(lnglat[0], lnglat[1]);
            item.longitude = lnglat[0];
            item.latitude = lnglat[1];
            /**
             * 添加地址信息
             */
            var point = new window.BMap.Point(item.longitude, item.latitude);
            var gc = new window.BMap.Geocoder();
            gc.getLocation(point, (rs)=>{
              var addComp = rs.addressComponents;
                this.$set(this.tableData3[i],'address',addComp.province + " " + addComp.city + " " + addComp.district +" "+ addComp.street +" "+ addComp.streetNumber);
                // item.address = addComp.province + " " + addComp.city + " " + addComp.district;]
            });
             /**
             * 温度平均值
             */
            // var temp = "gps_temp1"+"gps_temp2"+"gps_temp3";
            // var average = temp/30;
            // this.$set(this.tableData3[i],'average');
            return item;
            
          });
            // console.log('result==',result);
          this.items = result;
          this.tableData3 = result;
          this.addMarker(this.items);
          
          /**
           *  //时间戳转化成时间格式
           */
          for(var i=0;i<this.items.length;i++){
            // console.log(this.items[i].insert_time);
            this.items[i].insert_time = (function(date){
              date = date*1000;
              var da = new Date();
              da.setTime(date);
            return da.getFullYear() + "-" + ((da.getMonth()+1 < 10 ? '0'+(da.getMonth()+1) : da.getMonth()+1)) + "-" 
            + ((da.getDate()< 10 ? '0'+(da.getDate()) : da.getDate()))+ " " + ((da.getHours()< 10 ? '0'+(da.getHours()) : da.getHours()))  + ":" 
            + ((da.getMinutes()< 10 ? '0'+(da.getMinutes()) : da.getMinutes()))+ ":"
            + ((da.getSeconds()< 10 ? '0'+(da.getSeconds()) : da.getSeconds()))       
            })(this.items[i].insert_time)
           this.items[i].gps_time = (function(date){
              date = date*1000;
              var da = new Date();
              da.setTime(date);
           return da.getFullYear() + "-" + ((da.getMonth()+1 < 10 ? '0'+(da.getMonth()+1) : da.getMonth()+1)) + "-" 
            + ((da.getDate()< 10 ? '0'+(da.getDate()) : da.getDate()))+ " " + ((da.getHours()< 10 ? '0'+(da.getHours()) : da.getHours()))  + ":" 
            + ((da.getMinutes()< 10 ? '0'+(da.getMinutes()) : da.getMinutes()))+ ":" 
             + ((da.getSeconds()< 10 ? '0'+(da.getSeconds()) : da.getSeconds()))
            })(this.items[i].gps_time)
          };

        //华氏度转摄氏度 以及平均值
          // for(var o=0;o<this.items.length;o++){
          //   var t1 = this.items[o].gps_temp1;
          //   var t2 = this.items[o].gps_temp2;
          //   var t3 = this.items[o].gps_temp3;
          //   this.items[o].ambient_temp = (function(t){
          //     // if (t=='-') { t=='0'};
          //     if (t1=='-') { t1=='0'};
          //     if (t2=='-') { t2=='0'};
          //     if (t3=='-') { t3=='0'};
          //     t = 't1+t2+t3';
          //   	return parseInt(10*(t- 32)/1.8)/30;
          //   })(this.items[o].ambient_temp)
          //   console.log(this.items[o].ambient_temp)
          // };)
        //   };
          //方向描述
         for(var j = 0 ;j<this.items.length;j++){ 
          // console.log(this.items[j].reserve6)
            this.items[j].reserve6 = (function(angle){
              if(angle < 0){return '-';}
                      var modulo = parseInt(angle/45);
                      var remainder = angle - modulo*45;
                      remainder = parseInt(remainder*10)/10;
                      var direction = '-';
                      switch(modulo){
                        case 0://北偏东
                          direction = remainder > 0 ?'北偏东'+ remainder +'度':'正北';
                          break;
                        case 1://东偏北
                          direction = '东偏北'+ (45 - remainder) +'度';
                          break;
                        case 2://东偏南
                          direction = remainder > 0 ?'东偏南'+ remainder +'度':'正东';
                          break;
                        case 3://南偏东
                          direction = '南偏东'+ (45 - remainder) +'度';
                          break;
                        case 4://南偏西
                          direction = remainder > 0 ?'南偏西'+ remainder +'度':'正南';
                          break;
                        case 5://西偏南
                          direction = '西偏南'+ (45 - remainder) +'度';
                          break;
                        case 6://西偏北
                          direction = remainder > 0 ?'西偏北'+ remainder +'度':'正西';
                          break;
                        case 7://西偏北
                          direction = '西偏北'+ (45 - remainder) +'度';
                          break;
                          
                  }
                return direction;
             
            })(this.items[j].reserve6) 
            // this.reserve6[j]=this.items[j].reserve6;
         }

         //统计在线离线和报警数量
          var conNum_online = 0;
          var conNum_offline = 0;
          var conNum_alarm = 0;
          var nowTime = new Date().getTime();
          nowTime = nowTime/1000 - 1200;
          for(var i = 0;i<this.items.length;i++ ){
             
              if(this.items[i].insert_time > nowTime){
                  conNum_online ++;
              }else{
                  conNum_offline++;
              }
          }
        });
    },
    addMarker(points) {
      // 创建图标对象
      // console.log(BMap,BMap.point);
      for (let i = 0; i < points.length; i++) {
        var point = new window.BMap.Point(
          points[i].longitude,
          points[i].latitude
        );
        var marker = new window.BMap.Marker(point);
        this.map.addOverlay(marker);
        var opts = {
          width: 50, // 信息窗口宽度
          height: 320 // 信息窗口高度
        };
        marker.addEventListener("click", function(e) {
          //获取点的信息
        //   console.log(marker,e.target);
          var p = e.target;
          var lng = p.getPosition().lng;
          var lat = p.getPosition().lat;
        //   var pon = new window.BMap.Point(lng, lat);
        //   var gc = new window.BMap.Geocoder();
        //   gc.getLocation(pon, rs => {
            // var addComp = rs.addressComponents;
            var sContent = "<h3>" + points[i].name + "</h3>";
            // sContent +=
            //   "</br>定位地址：" +
            //   addComp.province +
            //   " " +
            //   addComp.city +
            //   " " +
            //   addComp.district;
            sContent +="</br>定位地址：" +points[i].address;
            sContent += "</br>定位时间：" + points[i].gps_time;
            sContent += "</br>速    度：" + points[i].speed + "Km/h";
            sContent += "</br>方    向："+ points[i].reserve6;
            sContent += "</br>箱内温度：" + points[i].ambient_temp + "°C";
            sContent += "</br>设定温度：" + points[i].cooler_set_temp + "°C";
            sContent += "</br>出风温度：" + points[i].out_air_temp + "°C";
            sContent += "</br>机组模式：" + points[i].zone_status;
            sContent += "</br>报警代码：" + points[i].zone_alarm_code;
            sContent += "</br>数据时间：" + points[i].insert_time;
            var infoWindow = new window.BMap.InfoWindow(sContent, opts);
            var point = new window.BMap.Point(lng, lat);
            this.map.openInfoWindow(infoWindow, point); //开启信息窗口
        //   });
        });
        this.markers.push(marker);
      }
    },
    remoteMethod(query) {
      // console.log("query===",query,this.items);
      if (query !== "") {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.options = this.items.filter(item => {
            return item.name.toLowerCase().indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.options = [];
      }
    },
    servicePro: function() {
            this.servicePro1 = true;
            this.tencent1 = false;
            this.zizhi1 = false;
        },
            tencent: function() {
            this.servicePro1 = false;
            this.tencent1 = true;
            this.zizhi1 = false;
        },
            zizhi: function() {
            this.servicePro1 = false;
            this.tencent1 = false;
            this.zizhi1 = true;
        },
        togglePanel () {
            this.look = false;
        },
        openalert(row){
          this.detail = row;
          this.look = true;
          // alert(e.target);
          // this.highlight();
        },
        getColName(h,data){
          console.log(h,data);
        }
  },
  created: function() {},
  components: {
    BMap
  }
};
</script>

<style>
.table2 th {
  background: rgb(31, 75, 116) ;
  color: #fff;
  padding: 0px 0;
}
.el th{
 background: none !important;
 color:black;
}
.el-table .cell {
  line-height: 14px;
}
.box {
  width: 130px;
  height: 35px;
  line-height: 35px;
  margin-left: -20px;
  margin-top: -10px;
  border: 2px solid #005fc6;
  background-color: #ffffff;
  border-radius: 5px;
  font-size: 14px;
  padding-left: 10px;
  color: #005fc6;
}
.box:nth-child(2) {
  color: #fff;
  background-color: rgb(66, 167, 66);
  border: 2px solid rgb(66, 167, 66);
}
.box:nth-child(3) {
  color: #fff;
  background-color: rgb(180, 173, 173);
  border: 2px solid rgb(180, 173, 173);
}
.box:nth-child(4) {
  color: #fff;
  background-color: rgb(245, 108, 108);
  border: 2px solid rgb(245, 108, 108);
}
.tab {
  border-top: 2px solid rgb(180, 173, 173);
}
.mapstyle {
  float: left;
  height: 68vh;
  margin-top: 20px;
  margin-left: 30px;
  border: 1px solid transparent;
  border-radius: 3px;
  width: 53%;
  border: 1px solid rgb(180, 173, 173);
}
.alert-tab{
  position: fixed;
  z-index:999;
  width:60%;
  border:1px solid gray;
  height:70%;
  margin-top:-40%;
  margin-left:15%;
  background-color:#fff;
  border-radius: 8px;
}
.alert-tab p{
    float:left;
    margin-left:50px;
    margin-top:10px;
    color:rgb(83, 163, 233);
}
.alert-tab p:hover{
    color:black;
}
.lengji{
    display: flex;
    justify-content: space-between;
    margin-top:60px;
}
.lengji span{
    display: flex;
    justify-content: space-between;
    margin-top:12px;
    margin-left:50px;
}
.lengji1 {
    width:400px;
}
.kongzhi{
   margin-top:10%;
   margin-left:30px;
}
.kongzhi1{
  margin-top:10px;
  margin-left:30px;
}
</style>
