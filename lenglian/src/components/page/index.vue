<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item> 集装箱</el-breadcrumb-item>
                <!-- <el-breadcrumb-item>报警历史记录 </el-breadcrumb-item> -->
            </el-breadcrumb>
            <div >
                <el-select
                    v-model="value"
                    multiple
                    filterable
                    remote
                    @change="test(value)"
                    reserve-keyword
                    placeholder="请输入设备关键词"
                    :remote-method="remoteMethod"
                    :loading="loading" style="float:right;margin-right:60px;margin-top:-20px;">
                    <el-option
                    v-for="item in options"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name" >
                    </el-option>
                </el-select>
                
            </div>
            
        </div>
        <div class="tab">
            <div class="grid">
                <template >
                    <el-table :data="tableData3" border style="width:50%;margin-top:20px;float:left;" height="55vh" class="el" :default-sort = "{prop: 'date', order: 'descending'}">
                        <el-table-column fixed prop="name" label="箱体编号" width="95" sortable></el-table-column>
                        <el-table-column prop="name" label="箱内温度°C" width="72" sortable></el-table-column>
                        <el-table-column prop="name" label="箱内湿度%" width="72" sortable></el-table-column>
                        <el-table-column prop="name" label="机组状态" width="50"></el-table-column>
                        <el-table-column prop="name" label="设定温度°C" width="60"></el-table-column>
                        <el-table-column prop="name" label="回风温度°C" width="72" sortable></el-table-column>
                        <el-table-column prop="name" label="出风温度°C" width="72" sortable></el-table-column>
                        <el-table-column prop="name" label="环境温度°C" width="70"></el-table-column>
                        <el-table-column prop="name" label="冷机电压" width="50"></el-table-column>
                        <el-table-column prop="name" label="副电压" width="58" sortable></el-table-column>
                        <el-table-column prop="name" label="机组电流" width="50"></el-table-column>
                        <el-table-column prop="name" label="冷机电压" width="50"></el-table-column>
                        <el-table-column prop="name" label="机组水温°C" width="70"></el-table-column>
                        <el-table-column prop="name" label="吸气压力" width="50"></el-table-column>
                        <el-table-column prop="name" label="排气压力" width="50"></el-table-column>
                        <el-table-column prop="name" label="更新时间" width="100" sortable></el-table-column>
                    </el-table>
                </template>
            </div>
           <div id="dituContent"></div>
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
            tableData3:[]
            
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
    //这几个地方加this
      initMap () {
        this.createMap() ; //创建地图 
        this.setMapEvent();//设置地图事件
        this.addMapControl();//向地图添加控件
        // this.addMarker();//向地图中添加marker
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
    
      //搜索框
      getstates() {
        
        this.$axios.post('/api/d/container_list_json',this.qs.stringify({})).then((data) =>{
           console.log(data)
            this.items=data.data.result;
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
        // var that = this;
        // this.ajax.post(" /d/container_latest_json", {}).then(function(data) {
        // var ser = data.data.data;
        // // console.log(ser);
        // var names = [];
        // for (var key in ser) {
        //     var name = ser[key].itemList;
        //     // console.log(ser);
        //     for (var vice in name) {
        //     names.push(name[vice].name);
        //     // console.log(name)
        //     }
        // }
        // that.names = names;
        // // console.log(names);
        // });
      }
     
}
</script>

<style>

.tab{
    height:700px;
    background-color: #fff;
    border-radius: 6px; 
}
.grid{
    margin-left:20px;
}
#dituContent{
  float: left;
  height:55vh;
  margin-top:20px;
  margin-left:30px;
  border:1px solid transparent;
  border-radius: 6px;
  /* position: relative; */
  width:45%;
  
}
</style>
