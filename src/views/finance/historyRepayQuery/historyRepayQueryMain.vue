<template>
  <ynet-content id="historyRepayQueryMain" class="main-content" :headerInformation="true" :headerMenu="true">
    <!--面包屑-->  
    <ynet-breadcrumb></ynet-breadcrumb>
    <!--面包屑--end-->
    <!--功能区-->
    <div class="functionalArea">
      <h3 class="functionalAreaTitle">历史还款信息查询</h3>
      <div class="p20">
        <historyRepay></historyRepay>
      </div>
    </div>
    <!--功能区--end-->
  </ynet-content>
</template>

<script>
import historyRepay from "./components/historyRepay";
export default {
  name:'historyRepayQueryMain',
  components: {
    historyRepay
  },
  data() {
    return {
        
    }
  },
  methods: {
    
  },
  mounted(){ 
    
  }
}
</script>
