<template>
  <div class="hello">
     <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item> 冷箱</el-breadcrumb-item>
                <el-breadcrumb-item>集装箱列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
       
    <div class="tab">
      <div>
        <el-select v-model="value4" filterable placeholder="请输入关键字" style="margin-top:10px;margin-left:10px;">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-button type="primary" style="margin-left:10px;">修改</el-button>
      </div>
      <template >
        <el-table :data="tableData" border style="width: 96%;margin-top:10px;margin-left:10px;font-size:14px;" height="500" class="el" :default-sort = "{prop: 'date', order: 'descending'}">
          <el-table-column type="selection" width="45"></el-table-column>
          <el-table-column prop="date" label="名称" width="150" ></el-table-column>
          <el-table-column prop="name" label="分组" width="130" ></el-table-column>
          <el-table-column prop="name" label="DTU类别" width="130" ></el-table-column>
          <el-table-column prop="name" label="DTU编码" width="130"></el-table-column>
          <el-table-column prop="name" label="冷机类型" width="130"></el-table-column>
          <el-table-column prop="name" label="冷机编码" width="130" ></el-table-column>
          <el-table-column prop="name" label="温度传感器" width="130" ></el-table-column>
          <el-table-column prop="name" label="湿度传感器" width="130"></el-table-column>
          <el-table-column prop="name" label="门开关" width="130"></el-table-column>
          <el-table-column prop="name" label="新风系统" width="130" ></el-table-column>
        </el-table>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      tableData:[{
        data:'CICU8119522',
        name:'auto',
      }]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.lead{
  font-size: 20px;
  margin-bottom: 10px;
}
.tab{
  width: 100%;
  height:75vh;
  background-color: #fff;
  border-radius: 6px; 
  position:absolute;
}
</style>
