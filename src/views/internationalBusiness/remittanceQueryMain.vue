<template>
  <ynet-content id="templateName" class="main-content" :headerInformation="true" :headerMenu="true">
    <!--面包屑-->
    <ynet-breadcrumb></ynet-breadcrumb>
    <!--面包屑--end-->
    <!--功能区-->
    <div class="functionalArea">
      <!--<div class="contentTab">
        <a href="#/internationalBusiness/remittanceManagementMain">行内汇款</a>
        <a href="#/internationalBusiness/remittanceManagementMain@outLineRemittance">行外汇款</a>
        <a href="#/internationalBusiness/remittanceManagementMain@remittanceQuery" class="current">汇款查询</a>
      </div>-->
      <div class="p20">
        <remitQuery></remitQuery>
      </div>
    </div>
    <!--功能区--end-->
  </ynet-content>
</template>

<script>
import remitQuery from './components/remitQuery'
export default {
  name:'remittanceQueryMain',
  components: {
    remitQuery
  },
  data() {
    return {
      form: {
          chineseName:''
      },
      rules: {
        chineseName: [
          {trigger: 'blur', validator:this.chineseValidator}
        ]
      }
    }
  },
  methods: {

  },
  mounted(){ 
  }
}
</script>
