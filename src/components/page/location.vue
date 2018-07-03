<template>
    <div>
        <div >
            <div class="crumbs" style="width:50px;" >
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item> 位置</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="maptool" style="folat:left;margin-top:-40px;margin-left:10%;">
                <el-date-picker
                    v-model="value4"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
                <el-select
                    v-model="value"
                    filterable
                    remote
                    clearable
                    @change="test(value)"
                    reserve-keyword
                    placeholder="请输入设备关键词"
                    :remote-method="remoteMethod"
                    :loading="loading" style="margin-left:30px;height: 32px;">
                        <el-option
                        v-for="item in options"
                        :key="item.name"
                        :label="item.name"
                        :value="item.name">
                    </el-option>
                </el-select>
                <button type="submit" class="btn" id="containerLoader"
                style="margin-left:25px;border:1px solid #ccc;width:50px;height:30px;background-color: #fff;border-radius: 3px;">查轨迹</button>
            </div>
        </div> 
        <BMap class="map" @returnMap="receiveMap"></BMap>
        
          <div class="icon">
            <div class="rights" v-if="show" >
                <el-select
                    v-model="value"
                    filterable
                    remote
                    clearable
                    @change="test(value)"
                    reserve-keyword
                    placeholder="请输入设备关键词"
                    :remote-method="remoteMethod"
                    :loading="loading" style="margin-left:10px;margin-top: 10px;">
                        <el-option
                        v-for="item in options"
                        :key="item.name"
                        :label="item.name"
                        :value="item.name">
                    </el-option>
                </el-select>
             
                  <p style="margin-left:20px;margin-top:10px;"> 所有设备({{items.length}})</p>
                  <div class="list-right" v-for="item in tableData3" :key="item.value" :value="item.value">
                    <img src="../images/car.png" alt="">  
                    <div class="list" style="font-size:13px;float:left;margin-left:18%;"  :click="xiangqinga">{{item.name}}</div>
                   
                  </div>
            </div>
            <div class="rights2" v-show="xiangqing">
                <div style="margin-top:20px;margin-left:20px"> <b>详情:</b> </div>
                <img src="../images/jzx.png" alt="" style="width:48%;margin-left:20px;">
                <span style=" float:left;margin-top:-100px;margin-left:60%;"> <b>集装箱名字</b> </span>
                <div style="margin-left:40px;margin-top:20px;">当前状态：</div>
                <div style="margin-left:40px;margin-top:20px;">开门次数：</div>
                <ul class="inbox" >
                  <li style="margin-top:10px;margin-left:15px;"><b>箱东：</b>经理</li>
                  <li style="margin-top:10px;margin-left:15px;"><b>联系方式：</b>11122223636</li>
                  <li style="margin-top:10px;margin-left:15px;margin-bottom:10px;"><b>当前位置：</b>bnbbjhhkljkuugjkjkjkjiuiou</li>
                </ul>
                <div style="display: flex;justify-content: space-between;">
                  <div style="width:150px;height:120px;border-right:1px solid #000;margin-top:20px;">
                    <b style="font-size:20px;margin-left:30px;">箱内温度</b><br>
                    <b style="font-size:50px;margin-left:30px;padding-top:20px;display:block;">16°C</b>
                  </div>
                  <div style="width:150px;height:120px;margin-top:20px;">
                    <b style="font-size:20px;margin-left:30px;">箱外温度</b>
                    <b style="font-size:50px;margin-left:30px;padding-top:20px;display:block;">28°C</b>
                  </div>
                </div>
                <div><img src="" alt=""></div>
                
            </div>
            <div class="change"><img src="../images/btn.png" alt="" v-on:click="show = !show" ></div>
        </div>
        <!-- <div class="bom" style="background-color: rgb(0, 95, 198);height:35px;">
            <span><img src="" alt="">全部</span>
            <span><img src="" alt="">空载</span>
            <span><img src="" alt="">重载</span>
            <span><img src="" alt="">报警</span>
            <span><img src="" alt="">未初始化</span>
            <span>
                <el-select v-model="value4" filterable  placeholder="请输入关键字" style="height:20px;margin-left:10px;" size="small">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </span>
            
        </div> -->
        <div class="tab-bot">
            <template >
                <el-table  border  height="10vh"  :default-sort = "{prop: 'date', order: 'descending'}"  :data="tableData3"> 
                    <el-table-column  type="index" label="序号" width="50"></el-table-column>
                    <el-table-column prop="name" label="箱号" ></el-table-column>
                    <el-table-column prop="insert_time" label="定位时间"></el-table-column>
                    <el-table-column prop="gps_time" label="数据接收时间"></el-table-column>
                    <!-- <el-table-column prop="name" label="定位状态" width="120"></el-table-column> -->
                    <!-- <el-table-column prop="name" label="空重载状态" width="120" ></el-table-column> -->
                    <el-table-column prop="gps_oil_level" label="gps油位"></el-table-column>
                    <!-- <el-table-column prop="name" label="箱外温度(℃)" width="100"></el-table-column> -->
                    <!-- <el-table-column prop="name" label="开关门次数" width="100"></el-table-column> -->
                    <!-- <el-table-column prop="name" label="电量(%)" width="100" ></el-table-column> -->
                    <el-table-column prop="address" label="当前位置"></el-table-column>
                   <!-- <el-table-column  fixed="right" label="查看详情" width="120">
                        <template slot-scope="scope">
                            <el-button type="primary" size="small">详情</el-button>
                        </template>
                    </el-table-column> -->
                </el-table>
            </template>
        </div>
    </div>
</template>


<script>
import BMap from "../common/BMap";
import lnglatCon from "../common/lnglat-convertor.js";
export default {
  data() {
    return {
      value4: [new Date(2018, 5, 1, 10, 10), new Date(2018, 5,4, 10, 10)],
      options: [],
      value5:[],
      value: [],
      list: [],
      loading: false,
      items: [],
      tableData3: [],
      points: [],
      states: [],
      map: null,
      markers:[],
      show:true,
      xiangqing:false,
      move:false,
      item:'',
      value:''
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
          //    console.log(data)
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
              }if(key == "speed"){
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
           
            return item;
            
          });
            // console.log('result==',result);
          this.items = result;
          this.tableData3 = result;
          this.addMarker(this.items);
          
          /**
           * //时间戳转化成时间格式
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
            // console.log(this.items[1].gps_time);
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
         }
           
          // var conNum_online = 0;
          // var conNum_offline = 0;
          // var conNum_alarm = 0;
          // var nowTime = new Date().getTime();
          // nowTime = nowTime/1000 - 1200;
          // for(var i = 0;i<this.items.length;i++ ){
          //     if(this.items[i].insert_time > nowTime){
          //         conNum_online ++;
          //     }else{
          //         conNum_offline++;
          //     }
          // }
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
          width: 70, // 信息窗口宽度
          height: 320 // 信息窗口高度
        };
        marker.addEventListener("click", function(e) {
          //获取点的信息
          var p = e.target;
          var lng = p.getPosition().lng;
          var lat = p.getPosition().lat;
          var sContent = "<h3>" + points[i].name + "</h3>";
            sContent +="</br>定位地址：" +points[i].address;
            sContent += "</br>定位时间：" + points[i].insert_time;
            sContent += "</br>速    度：" + points[i].speed + "Km/h";
            sContent += "</br>方    向：" + points[i].reserve6;
            sContent += "</br>箱内温度：" + points[i].ambient_temp + "°C";
            sContent += "</br>设定温度：" + points[i].cooler_set_temp + "°C";
            sContent += "</br>出风温度：" + points[i].out_air_temp + "°C";
            sContent += "</br>机组模式：" + points[i].zone_status;
            sContent += "</br>报警代码：" + points[i].zone_alarm_code;
            sContent += "</br>数据时间：" + points[i].gps_time;
            var infoWindow = new window.BMap.InfoWindow(sContent, opts);
            var point = new window.BMap.Point(lng, lat);
            this.map.openInfoWindow(infoWindow, point); //开启信息窗口
        //   });
        });
        this.markers.push(marker);
      }
    },
    remoteMethod(query) {
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
    xiangqinga(){
      this.xiangqing==true;
      this.show == false;
    }
  },
  created: function() {},
  components: {
    BMap
  }
};
</script>

<style>
.map {
  clear:both;
  height: 73vh;
  border: 1px solid transparent;
  border-radius: 3px;
  /* height:80vh; */
  width:100%;
  /* border: 1px solid rgb(180, 173, 173); */
}
.icon {
    width:22%;
    margin-top:-73.1vh;
    margin-right: 1.3%;
    overflow-y:auto;
    height:73vh;
    position: relative;
    float: right;
    display:inline;
    /* overflow: hidden; */
}
.rights{
    width:90%;
    background:#fff;
    float:right;
    height:100%;
    
    /* z-index:99999; */
    /* position: relative; */
}
.change{
    float: right;
    margin-top: 40%;
}
.icon img{
    margin-right:17.5%;
    
}
.bom span{
    margin-left:20px;
    text-align: middle;
    line-height: 35px;
}
.bottom-tab span{
    color:#fff;
    height: 35px;
    margin-left: 20px;
    line-height: 35px;
    
}
.rights2{
    width:90%;
    background-color:#fff;
    float:right;
    height:100%;
    /* z-index:99999; */
    /* position: relative; */
}
.rights2 ul{
  border:1px solid gray;
  box-shadow: 0 0 10px #333;
  width:80%;
  /* height:100px; */
  margin:0 auto;
  list-style:none;
  margin-top:20px;
  
}

.list-right{
  /* width:100%; */
  /* height:100%; */
  overflow: hidden;
  padding-top:5px;
  background-color: #fff;
}
.list-right img{
  width:25px;
  margin-left: 20px;
  position:absolute;
}
</style>