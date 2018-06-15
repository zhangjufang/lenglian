<template>
  <div class="table">
     <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item> 监控</el-breadcrumb-item>
                <el-breadcrumb-item>箱体 </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
    <el-select v-model="value4" filterable placeholder="请选择">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
      </el-option>
    </el-select>
		<div id="myChart" :style="{width: '90%', height: '350px'}"></div>   
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
          }],
          value: ''            
        }
      },
      mounted() {
				this.drawLine();
			},
  methods: {
    drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({
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
                  start: 65,
                  end: 85
              },
              {
                  type: 'slider',
                  realtime: true,
                  start: 65,
                  end: 85,
                  buttom: 5
              }
          ],
            legend:{
              data:[{
                name: '销量',
              },
              {
                name: '产量',
              }
              ]
            },
            xAxis: {
                data: ["1","2","3","4","5","6"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'line',
                data: [1,2,3,4,5,] 
            },
            {
                name: '产量',
                type: 'line',
                data: [5,4,3,2,1] 
            }
            ]
        });
    }
  
  }
}
</script>

<style scoped>
</style>