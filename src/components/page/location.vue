<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item> 位置</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="mapToolDiv" style="margin-left:15%;margin-top:-40px;">
        <form class="form-inline"  onsubmit="return false;">
            <div class="form-group" style="padding: 0;margin:0">
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
                    @change="test(value)"
                    reserve-keyword
                    placeholder="请输入设备关键词"
                    :remote-method="remoteMethod"
                    :loading="loading" style="margin-left:20px;height: 32px;">
                        <el-option
                        v-for="item in options"
                        :key="item.name"
                        :label="item.name"
                        :value="item.name">
                    </el-option>
                </el-select>
            <button type="submit" class="btn" id="containerLoader" style="margin-left:20px;border:1px solid #ccc;">查轨迹</button>
            </div>
        </form>
	</div>
         <BMap class="ditu" @returnMap="receiveMap"></BMap>
        <div class="icon">
            <div class="rights" v-if="show">
                <el-select  clearable placeholder="请输入关键字" style="margin-top:10px;margin-left:10px;">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
                <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" style="margin-top:10px;"></el-tree>
            </div>
            <div class="change"><img src="../images/btn.png" alt="" v-on:click="show = !show" ></div>
        </div>
        <div class="bottom-tab">
            <span><img src="" alt="">全部</span>
            <span><img src="" alt="">空载</span>
            <span><img src="" alt="">重载</span>
            <span><img src="" alt="">报警</span>
            <span><img src="" alt="">未初始化</span>
            <!-- <span>
                <el-select v-model="value4" filterable  placeholder="请输入关键字" style="height:20px;margin-left:10px;" size="small">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </span> -->
            
        </div>
        <!-- <div class="tab-bot">
            <template >
                <el-table  border  height="100"  :default-sort = "{prop: 'date', order: 'descending'}"  :data="tableData3"> 
                    
                    <el-table-column  type="index" label="序号" width="50" ></el-table-column>
                    <el-table-column prop="name" label="箱号" width="100" ></el-table-column>
                    <el-table-column prop="name" label="定位时间" width="120" ></el-table-column>
                    <el-table-column prop="name" label="数据接收时间" width="120"></el-table-column>
                    <el-table-column prop="name" label="定位状态" width="120"></el-table-column>
                    <el-table-column prop="name" label="空重载状态" width="120" ></el-table-column>
                    <el-table-column prop="name" label="箱内温度(℃)" width="100" ></el-table-column>
                    <el-table-column prop="name" label="箱外温度(℃)" width="100"></el-table-column>
                    <el-table-column prop="name" label="开关门次数" width="100"></el-table-column>
                    <el-table-column prop="name" label="电量(%)" width="100" ></el-table-column>
                    <el-table-column prop="name" label="当前位置" width="200" ></el-table-column>
                   <el-table-column  fixed="right" label="查看详情" width="120">
                        <template slot-scope="scope">
                            <el-button type="primary" size="small">详情</el-button>
                        </template>
                    </el-table-column>

                </el-table>
            </template>
        </div> -->
    </div>
</template>

<script>
import BMap from '../common/BMap';
    export default {
        data() {
            return {
                map:null,
                value4: [new Date(2018, 5, 1, 10, 10), new Date(2018, 5,4, 10, 10)],
                options: [],
                value: [],
                list: [],
                loading: false,
                states: [],
                tableData3:[],
                points:[],
                show:true,
                move:false,
                items:[],
                data: 
                    [{
                    label: '设备',
                    children: [{
                        label: 'xx',
                        children: [{
                        label: 'xx设备'
                        }]
                    }]
                    }],
                    defaultProps: {
                    children: 'children',
                    label: 'label'
                    },
                    value5: '',
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
    handleNodeClick(data) {
                console.log(data);
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

<style scoped>
.table{
    width:100%;
    height:75vh;
    position: relative;
    /* margin-top:10px; */
}
.lead{
    font-size: 20px;
    margin-bottom: 10px;
}
.mapToolDiv{
  float: left;
  
}
.btn{
  width:50px;
  height:30px;
  background-color: #fff;
  border-radius: 3px;
}
.ditu{
    height:80vh;
    width:100%;
    
}
.icon {
    width:22%;
    margin-top:-80vh;
    margin-right: 1.3%;
    position: relative;
    float: right;
    display:inline;
}
.rights{
    width:90%;
    height:80vh;
    background-color:#fff;
    float:right;
}
.change{
    float: right;
    margin-top: 35%;
}
.icon img{
    margin-right:17.5%;
    
}
.bottom-tab{
    width:100%;
    height: 35px;
    background-color: rgb(0, 95, 198);
}
.bottom-tab span{
    color:#fff;
    height: 35px;
    margin-left: 20px;
    line-height: 35px;
    
}
</style>
