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
        <el-select
          v-model="value"
          
          filterable
          remote
          @change="test(value)"
          reserve-keyword
          placeholder="请输入设备关键词"
          :remote-method="remoteMethod"
          :loading="loading" style="margin-left:20px;margin-top:5px;height: 32px;">
              <el-option
              v-for="item in options"
              :key="item.name"
              :label="item.name"
              :value="item.name">
          </el-option>
      </el-select>
       <p style="float:right;margin-right:100px;margin-top:10px;position:relative;">共{{items.length}}条信息</p>
      </div>
      <template >
        <el-table :data="tableData3" border style="width: 96%;margin-top:10px;margin-left:10px;font-size:14px;" height="75vh" class="form" :default-sort = "{prop: 'date', order: 'descending'}">
          <el-table-column type="selection" width="45"></el-table-column>
          <el-table-column prop="flag_stop" label="状态" width="60"></el-table-column>
          <el-table-column prop="name" label="名称" width="150" ></el-table-column>
          <el-table-column prop="box_category" label="DTU类别" width="180" ></el-table-column>
          <el-table-column prop="box_id" label="DTU编码" width="180"></el-table-column>
          <el-table-column prop="ibox_version" label="冷机版本" width="130"></el-table-column>
          <el-table-column prop="cooler_code" label="冷机编码" width="130" ></el-table-column>
          <el-table-column prop="clientName" label="客户"></el-table-column>
          
        </el-table>
      </template>
    </div>
  </div>
</template>

<script>
import BMap from '../common/BMap';
    export default {
        data() {
            return {
            options: [],
            value: [],
            list: [],
            loading: false, 
            items:[],
            tableData3:[],
            points:[],
            states:[],
            map:null,
           
        }
    },
   mounted () {
        this.getstates();
      this.list = this.states.map(item => {
        return { value: item, label: item};
      });
    },
    methods: {
        test(value){
            this.tableData3 = this.items.filter((item)=>{
                return value.indexOf(item.name)>-1;
            });
        },
      //搜索框
      getstates() {
        this.$axios.post('/api/d/container_list_json',this.qs.stringify({}))
        .then(data => {
          // console.log(data.data.result);
          var result = data.data.result.map((item,i) => {
            /**
             * 各种-999转换为-
             */
            Object.keys(item).forEach(key => {
              if (key == "flag_stop") {
                //机组状态值处理
                if (item[key] == "0") {
                  item[key] = "启用";
                }if(item[key] == "1"){
                item[key] = "停用";
              } 
              }if(key == "box_category"){
                 if (item[key] == "1") {
                  item[key] = "接主机可控制";
                }if(item[key] == "2"){
                item[key] = "接主机不控制";
              }if(item[key] == "3"){
                item[key] = "不接主机";
              } 
              }
            });
           
             
            return item;
            
          });
        
          this.items = result;
          this.tableData3 = result;
          
        });
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
  height:85vh;
  background-color: #fff;
  border-radius: 6px; 
  position:absolute;
}

</style>
