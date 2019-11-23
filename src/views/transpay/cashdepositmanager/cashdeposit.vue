<template>
  <ynet-content :headerInformation="true" :headerMenu="true">
    <div class="mt20">
      <el-steps :space="100" :active="1" finish-status="success">
        <el-step title="录入信息"></el-step>
        <el-step title="确认信息"></el-step>
        <el-step title="查看结果"></el-step>
      </el-steps>
      <inputCashInfo></inputCashInfo>
      <el-button>重置</el-button>
      <el-button type="primary" @click="handleclick">下一步</el-button>
    </div>
  </ynet-content> 
</template>

<script>
import InputCashInfo from './components/inputCashInfo'
export default {
  name:'CashDepositDepositMain',
  components: {
      InputCashInfo,
  },
  data() {
    return{
      
    }
  },
  methods: {
    handleclick(){}
  },
  mounted(){ 
    
  }
}
</script>
<style>
  
</style>