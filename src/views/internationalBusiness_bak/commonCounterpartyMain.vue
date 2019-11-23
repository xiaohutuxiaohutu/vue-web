<template>
  <ynet-content id="templateName" class="main-content" :headerInformation="true" :headerMenu="true">
    <!--面包屑-->
    <ynet-breadcrumb></ynet-breadcrumb>
    <!--面包屑--end-->
    <!--功能区-->
    <div class="functionalArea">
      <div class="contentTab">
        <a href="#/internationalBusiness/remittanceManagementMain" class="current">常用交易对手</a>
        <a href="#/internationalBusiness/remittanceManagementMain@outLineRemittance">信用证受益人</a>
      </div>
      <div class="p20">
        <commonCounterpartyQuery></commonCounterpartyQuery>
      </div>
    </div>
    <!--功能区--end-->
  </ynet-content>
</template>

<script>
import commonCounterpartyQuery from './components/commonCounterpartyQuery'
export default {
  name:'commonCounterpartyMain',
  components: {
    commonCounterpartyQuery
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
