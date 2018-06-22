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
            :remote-method="remoteMethod"
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
                    <el-table-column prop="cooler_off_flag" label="状态" width="100" sortable></el-table-column>
                    <el-table-column prop="cooler_voltage" label="电压" width="100" sortable></el-table-column>
                    <!-- <el-table-column prop="zone_status" label="机组状态" width="150"></el-table-column> -->
                    <el-table-column prop="cooler_rpm" label="发动机转速" width="100"></el-table-column>
                    <el-table-column prop="ambient_temp" label="环境" width="100" sortable></el-table-column>
                    <el-table-column prop="re_air_temp" label="回风" width="100" sortable></el-table-column>
                    <el-table-column prop="out_air_temp" label="送风" width="84"></el-table-column>
                    <el-table-column prop="cooler_set_temp" label="设定温度" width="75"></el-table-column>
                    <el-table-column prop="oil_temp" label="盘发器盘管温度" width="150" sortable></el-table-column>
                    <el-table-column prop="zone_alarm_code" label="告警吗" width="80"></el-table-column>
                    <el-table-column prop="zone_status" label="主机状态" width="90"></el-table-column>
                    <el-table-column prop="zone_status" label="运行状态" width="180"></el-table-column>
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
          value: ''            
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
              } else {
                if (item[key] == "-999") {
                  item[key] = "-";
                }
              } 
            });
            
            /**
             * 添加地址信息
             */

            return item;
          });
          this.items = result;
          this.tableData3 = result;
          console.log(this.items)
          
          var cooler_voltage=[];
          var ambient_temp=[];
          var re_air_temp=[];
          var out_air_temp=[];
          var cooler_set_temp=[];
          var oil_temp=[];
          var insert_time=[];
          for(var i=0;i<this.items.length;i++){
          cooler_voltage[i]=this.items[i].cooler_voltage/100;
          ambient_temp[i]=this.items[i].ambient_temp/10;
           re_air_temp[i]=this.items[i].re_air_temp/10;
           out_air_temp[i]=this.items[i].out_air_temp/10;
           cooler_set_temp[i]=this.items[i].cooler_set_temp/10;
           oil_temp[i]=this.items[i].oil_temp/10;
           insert_time[i]=this.items[i].insert_time;
           //{{time|formatDate}}
            // console.log(re_air_temp)
            console.log(insert_time)
           
          };
          

        });
    },
    drawLine(){
      
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({
            title: { text: '传感器温湿度' },
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
                name: '电压',
              },
              {
                name: '环境',
              },
              {
                name: '回风',
              },
              {
                name: '送风',
              },
              {
                name: '设定温度',
              },
              {
                name: '蒸发器盘管温度',
              }
              ]
            },
            xAxis: {
              type:'category',
              boundaryGap:false,
              data:this.insert_time
            },
            yAxis: {},
            series: [{
                name: '电压',
                type: 'line',
                lineStyle:{
                  nomal:{
                    width:2
                  }
                },
                data: this.cooler_voltage
            },
            {
                name: '环境',
                type: 'line',
                data: this.ambient_temp
            },
            {
                name: '回风',
                type: 'line',
                data: this.re_air_temp
            },
            {
                name: '送风',
                type: 'line',
                data: this.out_air_temp
            },
            {
                name: '设定温度',
                type: 'line',
                data: this.cooler_set_temp
            },
            {
                name: '蒸发器盘管温度',
                type: 'line',
                data: this.oil_temp
            }
            ]
        });
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
     filters: {
        formatDate(time) {
            var date = new Date(time);
            return formatDate(date, 'yyyy-MM-dd hh:mm');
        }
    }

}
</script>

<style scoped>
</style>