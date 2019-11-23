<template>
  <ynet-content id="templateName" class="main-content printArea" :headerInformation="true" :headerMenu="true">
    <!--面包屑-->
    <ynet-breadcrumb></ynet-breadcrumb>
    <!--面包屑--end-->
    <!--功能区-->
    <div class="functionalArea">
      <h3 class="functionalAreaTitle">逾期状况查询</h3>
      <div class="p20">
        <overdue></overdue>
      </div>
    </div>
    <!--功能区--end-->
  </ynet-content>
</template>

<script>
import overdue from './components/overdue'
export default {
  name:'historyRepayQueryMain',
  components: {
    overdue
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
