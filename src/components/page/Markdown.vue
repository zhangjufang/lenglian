<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item> 报警</el-breadcrumb-item>
                <el-breadcrumb-item>设置 </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="sel">
                编号：
                <el-select v-model="value4" filterable placeholder="请输入编号" >
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select> 
                <el-button style="margin-left:10px;">查询</el-button>
                <el-button type="success" @click="createlist">添加</el-button>
            </div>
            <div class="tabs">
                <!-- 列表 -->
                <template >
                    <el-table  border style="width: 100%;font-size:14px;" height="480" ref="multipleTable" :data="tableData3">
                        <el-table-column type="selection" width="55"></el-table-column>
                        <el-table-column prop="date" label="箱体"  width="150"></el-table-column>
                        <el-table-column prop="name" label="编号" width="180" ></el-table-column>
                        <el-table-column prop="name" label="启用报警" width="200"></el-table-column>
                        <el-table-column prop="name" label="温度上限" width="180"></el-table-column>
                        <el-table-column prop="name" label="温度下限" width="180"></el-table-column>
                        <el-table-column prop="name" label="报警号码" width="200"></el-table-column>
                        <el-table-column  fixed="right" label="操作" width="150">
                            <template slot-scope="scope">
                                <el-button @click="handleClick(scope.row)" type="danger" size="small">删除</el-button>
                                <el-button type="primary" size="small">修改</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
                <!-- 工具条 -->
                <el-col style="margin-top:10px;">
                    <el-button type="danger">批量删除</el-button>
                    <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;margin-right：50px;">
			        </el-pagination>
                </el-col>
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
                value: ''  ,
                multipleTable:[],
                tableData3: [{
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-08',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-06',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-07',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }],       
              }
            },
            methods: {  
                createlst:function(){
                    
                }
            },
        
    }
</script>
<style>
.sel{
    float: left;
    margin-bottom:10px;
    margin-top:-10px;
}
.btn{
  width:50px;
  height:30px;
  background-color: #fff;
  border-radius: 3px;
}
.tabs{
    margin-top: 30px;
    height:70vh;
}
</style>
