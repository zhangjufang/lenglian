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
      methods: {  
      },
}

</script>

<style scoped>


</style>
