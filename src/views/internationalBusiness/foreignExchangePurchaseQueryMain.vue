<template>
  <ynet-content id="templateName" class="main-content" :headerInformation="true" :headerMenu="true">
    <!--面包屑-->
    <ynet-breadcrumb></ynet-breadcrumb>
    <!--面包屑--end-->
    <!--功能区-->
    <div class="functionalArea">
      <!--<div class="contentTab">
        <a href="#/internationalBusiness/foreignExchangePurchaseMain">结购汇业务</a>
        <a href="#/internationalBusiness/remittanceManagementMain@foreignExchangePurchaseQuery" class="current">结购汇查询</a>
      </div>-->
      <div class="p20">
        <foreignExchangePurchaseQuery></foreignExchangePurchaseQuery>
      </div>
    </div>
    <!--功能区--end-->
  </ynet-content>
</template>

<script>
import foreignExchangePurchaseQuery from './components/foreignExchangePurchaseQuery'
export default {
  name:'foreignExchangePurchaseQueryMain',
  components: {
    foreignExchangePurchaseQuery
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
