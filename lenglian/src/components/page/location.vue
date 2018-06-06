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
          <label for="startTime">起止时间：</label>
            <el-date-picker  v-model="value5"  type="datetimerange"  range-separator="至"  start-placeholder="开始日期" end-placeholder="结束日期" align="right">
            </el-date-picker>
            <el-select v-model="value4"  filterable  placeholder="请选择或者输入编号" style="margin-left:20px;">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          <button type="submit" class="btn" id="containerLoader" style="margin-left:20px;border:1px solid #ccc;">查轨迹</button>
        </div>
      </form>
		</div>
        <div id="ditu"></div>
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
            <span>
                <el-select v-model="value4" filterable  placeholder="请输入关键字" style="height:20px;margin-left:10px;" size="small">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </span>
            
        </div>
        <div class="tab-bot">
            <template >
                <el-table  border  height="100" class="el" > 
                    <!-- :default-sort = "{prop: 'date', order: 'descending'}"  :data="tableData"-->
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
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                value4:'',
                options: [{
                  value: '选项1',
                  label: '黄金糕'
                }, {
                  value: '选项2',
                  label: '双皮奶'
                }, {
                  value: '选项3',
                  label: '蚵仔煎'
                }, {
                  value: '选项4',
                  label: '龙须面'
                }, {
                  value: '选项5',
                  label: '北京烤鸭'
                }],
                value: '',        
              
                show:true,
                move:false,
                data: 
                    [{
                    label: 'xx公司',
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
            created() {
            // this.getData();
            },
            methods: {    
            //这几个地方加this
                initMap () {
                    this.createMap() ; //创建地图 
                    this.setMapEvent();//设置地图事件
                    this.addMapControl();//向地图添加控件
                    this.addMarker();//向地图中添加marker
                },
                createMap(){
                    var map = new BMap.Map("ditu");//在百度地图容器中创建一个地图
                    var point = new BMap.Point(96.404, 35.917);//定义一个中心点坐标
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
                addMarker(){


                },
                handleNodeClick(data) {
                console.log(data);
                }
                    },
                mounted () {
                this.initMap()
                },
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
#ditu{
    height:100%;
    width:100%;
    
}
.icon {
    width:22%;
    margin-top:-75.2vh;
    margin-right: 1.3%;
    position: relative;
    float: right;
    display:inline;
}
.rights{
    width:90%;
    height:75vh;
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
