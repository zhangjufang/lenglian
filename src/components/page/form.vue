<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item> 报警</el-breadcrumb-item>
                <el-breadcrumb-item>报警记录 </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div>
                <div class="sel">
                    <div style="display:inline;"><span @click="real">实时报警</span>
                    <span  style="margin-left:30px;" @click="record">报警记录</span>
                    <span style="margin-left:30px;" @click="set">设置</span></div>
                    <el-select
                    v-model="value"
                    filterable
                    remote
                    clearable
                    @change="test(value)"
                    reserve-keyword  style="margin-left:50px;"
                    placeholder="请输入设备关键词"
                    :remote-method="remoteMethod"
                    :loading="loading">
                        <el-option
                        v-for="item in options"
                        :key="item.name"
                        :label="item.name"
                        :value="item.name">
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
           
            <div class="tabs" v-show="real1">
                <template >
                    <el-table  border style="width: 100%;font-size:14px;" height="500"  :default-sort = "{prop: 'date', order: 'descending'}">
                    <el-table-column fixed prop="date" label="箱体" width="200" ></el-table-column>
                    <el-table-column prop="name" label="编号" width="190" ></el-table-column>
                    <el-table-column prop="name" label="报警提示" width="180" ></el-table-column>
                    <el-table-column prop="name" label="高温报警" width="180"></el-table-column>
                    <el-table-column prop="name" label="低温报警" width="180"></el-table-column>
                    <el-table-column prop="name" label="新风状态" width="180" ></el-table-column>
                    <el-table-column prop="name" label="时间" width="200" ></el-table-column>
                    </el-table>
                </template>
            </div>
            <div class="tabs" v-show="record1">
                <template >
                    <el-table  border style="width: 100%;font-size:14px;" height="500"  :default-sort = "{prop: 'date', order: 'descending'}">
                    <el-table-column fixed prop="date" label="箱体" width="200" ></el-table-column>
                    <el-table-column prop="name" label="编号" width="190" ></el-table-column>
                    <el-table-column prop="name" label="报警类型" width="180" ></el-table-column>
                    <el-table-column prop="name" label="报警数据" width="180"></el-table-column>
                    <el-table-column prop="name" label="接收手机" width="180"></el-table-column>
                    <!-- <el-table-column prop="name" label="新风状态" width="180" ></el-table-column> -->
                    <el-table-column prop="name" label="时间" ></el-table-column>
                    </el-table>
                </template>
            </div>
            <div class="tabs" v-show="set1">
                <template >
                    <el-table  border style="width: 100%;font-size:14px;" height="500"  :default-sort = "{prop: 'date', order: 'descending'}">
                    <el-table-column fixed prop="date" label="箱体" width="200" ></el-table-column>
                    <el-table-column prop="name" label="编号" width="190" ></el-table-column>
                    <el-table-column prop="name" label="启用报警" width="180" ></el-table-column>
                    <el-table-column prop="name" label="温度上限" width="180"></el-table-column>
                    <el-table-column prop="name" label="温度下限" width="180"></el-table-column>
                    <el-table-column prop="name" label="报警间隔（分）" width="180" ></el-table-column>
                    <el-table-column prop="name" label="报警号码" width="200" ></el-table-column>
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
                options: [],
                value: '' ,
                real1:true,
                record1:false,
                set1:false,        
              }
            },
            methods: { 
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
             corol:function(){
                 this.real1=true;
                 this.record1=false;
                 this.set1=false;
             },
             record:function(){
                 this.real1=false;
                 this.record1=true;
                 this.set1=false;
             },
             set:function(){
                 this.real1=false;
                 this.record1=false;
                 this.set1=true;
             }
            },
        
    }
</script>
<style>
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
