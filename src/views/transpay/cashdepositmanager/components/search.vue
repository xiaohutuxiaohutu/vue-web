<template>
  <div>
    <el-form label-width="400px">
        <el-form-item label="账户类型">
            <el-select v-model="region" placeholder="请选择">
            </el-select>
        </el-form-item>
        <el-form-item label="转入金额">
            <el-date-picker
                v-model="value7"
                type="daterange"
                align="right"
                placeholder="选择日期范围"
                :picker-options="pickerOptions2">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="金额大写">
            <span></span>
        </el-form-item>
        <el-form-item>
            <el-button>重置</el-button>
            <el-button type="primary">查询</el-button>
        </el-form-item>        
    </el-form>
  </div>
  
</template>

<script>

export default {
  name:'InputCashInfo',
  components: {
      
  },
  data() {
    return{
         pickerOptions2: {
          shortcuts: [{
            text: '当天',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              picker.$emit('pick', [start, end]);
            }
          },{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          },{
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        value7:'',
        region:''
    }
  },
  methods:{
    
  },
  mounted(){ 
    
  }
}
</script>
<style>
  .input{
      width:600px;
  }
</style>