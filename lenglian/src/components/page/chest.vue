<template>
  <div class="table">
     <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item> 定位</el-breadcrumb-item>
                <el-breadcrumb-item>运行轨迹 </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
    <div class="mapToolDiv" style="margin-left:18%;margin-top:-40px;">
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
  </div>
</template>

<script>
export default {
    data() {
            return {
                value5: '',
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
                value: ''            
              }
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
  margin-bottom: -10px;
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
  /* border:1px solid rgb(0,52,102); */
}

</style>
