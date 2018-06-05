<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item> 报警</el-breadcrumb-item>
                <el-breadcrumb-item>历史记录 </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="sere">
                <div class="sel">
                    编号：
                    <el-select v-model="value4" filterable placeholder="请选择" >
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select> 
                </div>
                <div class="time">
                    <label for="startTime">起止时间：</label>
                    <el-date-picker  v-model="value5"  type="datetimerange"  range-separator="至"  start-placeholder="开始日期" end-placeholder="结束日期" align="right">
                    </el-date-picker>
                    <button type="submit" class="btn" id="containerLoader" style="margin-left:20px;border:1px solid #ccc;">查询</button>
                </div>
            </div>
           
            <div class="tabs">
                <template >
                    <el-table  border style="width: 100%;font-size:14px;" height="500"  :default-sort = "{prop: 'date', order: 'descending'}">
                    <el-table-column fixed prop="date" label="箱体" width="220" ></el-table-column>
                    <el-table-column prop="name" label="编号" width="200" ></el-table-column>
                    <el-table-column prop="name" label="报警类型" width="250" ></el-table-column>
                    <el-table-column prop="name" label="报警数据" width="250"></el-table-column>
                    <el-table-column prop="name" label="接收手机" width="200"></el-table-column>
                    <el-table-column prop="name" label="时间" width="200" ></el-table-column>
                    </el-table>
                </template>
            </div>
            
        </div>


    </div>
</template>

<script>
    export default {
        data: function(){
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
            methods: {  
            },
        
    }
</script>
<style>
.sere{
    margin-top: -10px;
}
.sel{
    float: left;
    margin-bottom:20px;
}
.time{
    float: right;
    margin-right: 30px;
    margin-bottom:20px;
}
.btn{
  width:50px;
  height:30px;
  background-color: #fff;
  border-radius: 3px;
}
.tabs{
    margin-top: 30px;
}
</style>
