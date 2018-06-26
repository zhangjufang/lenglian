<template>
  <div class="table">
     <div class="crumbs" style="display:float;">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item> 监控</el-breadcrumb-item>
            <el-breadcrumb-item>箱体 </el-breadcrumb-item>
        </el-breadcrumb>
        <div style="height: 32px;float：left;margin-left:20px;">
            <el-select
            v-model="value"
            filterable
            remote
            @change="test(value)"
            reserve-keyword
            placeholder="请输入设备关键词"
            :loading="loading" >
            <el-option
            v-for="item in options"
            :key="item.name"
            :label="item.name"
            :value="item.name">
            </el-option>    
        </el-select>
        <div style="float:left;margin-left:10%;">
          <span class="demonstration">起止时间：</span>
          <el-date-picker
            v-model="value"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期" style="">
          </el-date-picker>
        </div>
          <button type="submit" class="btn" id="containerLoader"
            style="margin-left:20px;border:1px solid #ccc;width:50px;height:30px;background-color: #fff;border-radius: 3px;">查询</button>
      </div>
    </div>

		<div id="myChart" :style="{width: '95%', height: '350px'}"></div>
    <div class="grid">
            <template >
                <el-table :data="tableData3" border style="width:90%;margin-left:30px;text-color:#000;border:1px solid rgb(180, 173, 173);font-size:12px;"  height="50vh"  :default-sort = "{prop: 'date', order: 'descending'}">
                    <el-table-column fixed prop="name" label="箱体编号" width="120" sortable ></el-table-column>
                    <el-table-column prop="gps_humi" label="湿度" width="90" sortable></el-table-column>
                    <el-table-column prop="gps_temp1" label="温度1" width="75"></el-table-column>
                    <el-table-column prop="gps_temp2" label="温度2" width="75"></el-table-column>
                    <el-table-column prop="gps_temp3" label="温度3" width="75"></el-table-column>
                    <el-table-column prop="gps_oil_level" label="油位%" width="75"></el-table-column>
                    <el-table-column prop="reserve5" label="CO2 ppm" width="80"></el-table-column>
                    <el-table-column prop="cooler_voltage" label="电压" width="90" sortable></el-table-column>
                    <!-- <el-table-column prop="zone_status" label="机组状态" width="150"></el-table-column> -->
                    <el-table-column prop="speed" label="速度 km/h" width="100"></el-table-column>
                    <el-table-column prop="reserve6" label="方向" width="100" sortable></el-table-column>
                    <el-table-column prop="re_air_temp" label="回风温度" width="100" sortable></el-table-column>
                    <el-table-column prop="out_air_temp" label="送风温度" width="84"></el-table-column>
                    <!-- <el-table-column prop="cooler_set_temp" label="设定温度" width="75"></el-table-column> -->
                    <!-- <el-table-column prop="oil_temp" label="盘发器盘管温度" width="150" sortable></el-table-column> -->
                    <!-- <el-table-column prop="zone_alarm_code" label="告警吗" width="80"></el-table-column> -->
                    <!-- <el-table-column prop="zone_status" label="主机状态" width="90"></el-table-column> -->
                    <el-table-column prop="zone_status" label="冷机状态" width="180"></el-table-column>
                    <el-table-column prop="insert_time" label="时间" ></el-table-column>
                </el-table>
            </template>
        </div>   
  </div>
	
</template>

<script>
import {formatDate} from '../common/date';
export default {
    data() {
      return {
          loading: false,
          tableData3:[],
          value:'',
          options: [],
          value: '',
          cooler_voltage: [],
          ambient_temp:[],
          re_air_temp:[],
          out_air_temp:[],
          cooler_set_temp:[],
          oil_temp:[],
          insert_time:[]        
        }
      },
      mounted() {
        this.drawLine();
        this.getdata();
			},
  methods: {
    getdata(){
      this.$axios.post('/api/d/container_data_json',this.qs.stringify({id:'41803001'}))
      .then(data => {
        //   console.log(data.data.result);
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
              } 
              if (item[key] == "-999"||item[key] == "-99") {
                  item[key] = "-";
                }
              if(key == "cooler_off_flag"){
               
                if (item[key] == "0") {
                  item[key] = "关机";
                }else{
                  item[key] = "正常";
                }
              }if(key == "cooler_voltage"){
                if (item[key] !== "-") {
                 item[key] =  item[key]/100;
                } 
              } 
              if (key == "re_air_temp") {  
                item[key] = item[key]/10;
              }
              if (key == "gps_temp1") {  
                item[key] = item[key]/10;
              }  
              if (key == "gps_temp2") {  
                item[key] = item[key]/10;
              } 
              if (key == "gps_temp3") {  
                item[key] = item[key]/10;
              } 
              if (key == "cooler_set_temp") {  
                item[key] = item[key]/10;
              }
              else{
                return;
              }
            });
            return item;
          });
          
          this.items = result;
          this.tableData3 = result;
          console.log(this.items);


          // for(var i=0;i<this.items.length;i++){
          //   // console.log(this.items[1].insert_time);
          //   this.items[i].insert_time = (function(date){
          //     date = date*1000;
          //     var da = new Date();
          //     da.setTime(date);
          //   return da.getFullYear() + "-" + ((da.getMonth()+1 < 10 ? '0'+(da.getMonth()+1) : da.getMonth()+1)) + "-" 
          //   + da.getDate() + " " + ((da.getHours()< 10 ? '0'+(da.getHours()) : da.getHours()))  + ":" 
          //   + ((da.getMinutes()< 10 ? '0'+(da.getMinutes()) : da.getMinutes()))+ ":" + da.getMinutes() 
              
          //   })(this.items[i].insert_time)
           
          // };
           
          for(let i = 0;i<this.items.length;i++){
            this.gps_humi[i] = result[i].gps_humi;
            this.gps_temp1[i]=this.items[i].gps_temp1;
            this.gps_temp2[i]=this.items[i].gps_temp2;
            this.gps_temp3[i]=this.items[i].gps_temp3;
            this.gps_oil_level[i]=this.items[i].gps_oil_level;
            this.gps_voltage[i]=this.items[i].gps_voltage;
            this.reserve5[i]=this.items[i].reserve5;
            // console.log(this.items[i].out_air_temp);

           this.items[i].insert_time = (function(date){
              date = date*1000;
              var da = new Date();
              da.setTime(date);
              
            return da.getFullYear() + "-" + ((da.getMonth()+1 < 10 ? '0'+(da.getMonth()+1) : da.getMonth()+1)) + "-" 
            + ((da.getDate()< 10 ? '0'+(da.getDate()) : da.getDate()))+ " " + ((da.getHours()< 10 ? '0'+(da.getHours()) : da.getHours()))  + ":" 
            + ((da.getMinutes()< 10 ? '0'+(da.getMinutes()) : da.getMinutes()))+ ":"
             + ((da.getSeconds()< 10 ? '0'+(da.getSeconds()) : da.getSeconds()))
             
            })(this.items[i].insert_time) 
            this.insert_time[i]=this.items[i].insert_time;



            
          };
          
          // console.log(this.insert_time,this.cooler_voltage);
          this.drawLine();
        });
    },
    drawLine(){
        var that = this;
        
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        var options = {
            title: { text: '冷机数据' },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                  type: 'cross'
              },
            },
            toolbox:{
              feature:{
                dataZoom: {
                    yAxisIndex: 'none'
                },
                saveAsImage:{}
              }
            }, 
            dataZoom: [
              {
                  show: true,
                  realtime: true,
                  start: 80,
                  end: 100
              },
              {
                  type: 'slider',
                  realtime: true,
                  start: 50,
                  end: 85,
                  
              }
          ],
            legend:{
              data:[{
                name: '湿度',
              },
              {
                name: '温度1',
              },
              {
                name: '温度2',
              },
              {
                name: '温度3',
              },
              {
                name: '油位',
              },
              {
                name: '电压值',
              },
              {
                name: 'CO2',
              }
              ]
            },
            xAxis: {
              data:that.insert_time.reverse()
            },
            yAxis: {},
            series: [{
                name: '湿度',
                type: 'line',
                lineStyle:{
                  nomal:{
                    width:2
                  }
                },
                data: that.gps_humi
            },
            {
                name: '温度1',
                type: 'line',
                data: that.gps_temp1
            },
            {
                name: '温度2',
                type: 'line',
                data: that.gps_temp2
            },
            {
                name: '温度3',
                type: 'line',
                data: that.gps_temp3
            },
            {
                name: '油位',
                type: 'line',
                data: that.gps_oil_level
            },
            {
                name: '电压值',
                type: 'line',
                data: that.gps_voltage
            },
            {
                name: 'CO2',
                type: 'line',
                data: that.reserve5
            }
            ]
        }
        // console.log('data==' ,options.series[0].data.length);
        // 绘制图表
        myChart.setOption(options);
    }
  
  },
  // remoteMethod(query) {
  //     // console.log("query===",query,this.items);
  //     if (query !== "") {
  //       this.loading = true;
  //       setTimeout(() => {
  //         this.loading = false;
  //         this.options = this.items.filter(item => {
  //           return item.name.toLowerCase().indexOf(query.toLowerCase()) > -1;
  //         });
  //       }, 200);
  //     } else {
  //       this.options = [];
  //     }
  //   },
}
</script>

<style scoped>
</style>