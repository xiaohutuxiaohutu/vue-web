<template>
  <ynet-content id="templateName" class="main-content printArea" :headerInformation="true" :headerMenu="true">
    <!--面包屑-->
    <ynet-breadcrumb></ynet-breadcrumb>
    <!--面包屑--end-->
    <!--功能区-->
    <div class="functionalArea">
      <div class="contentTab">
        <a href="javascript:;" class="current">信用证开立</a>
        <a href="javascript:;">信用证修改</a>
        <a href="javascript:;">信用证查询</a>
      </div>
      <div class="p20">
        <importCreditMainOpen></importCreditMainOpen>
      </div>
    </div>
    <!--功能区--end-->
  </ynet-content>
</template>

<script>
import importCreditMainOpen from './components/importCreditMainOpen'
export default {
  name:'templateName',
  components: {
    importCreditMainOpen,
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
