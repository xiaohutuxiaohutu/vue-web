<template>
  <ynet-content id="templateName" class="main-content" :headerInformation="true" :headerMenu="true">
    <!--面包屑-->
    <ynet-breadcrumb></ynet-breadcrumb>
    <!--面包屑--end-->
    <!--功能区-->
    <div class="functionalArea">
      <div class="contentTab">
        <a href="#/internationalBusiness/remittanceManagementMain">行内汇款</a>
        <a href="#/internationalBusiness/remittanceManagementMain@outLineRemittance">行外汇款</a>
        <a href="#/internationalBusiness/remittanceManagementMain@remittanceEnquiry" class="current">汇款查询</a>
      </div>
      <div class="p20">
        <query></query>
      </div>
    </div>
    <!--功能区--end-->
  </ynet-content>
</template>

<script>
import query from './components/query'
export default {
  name:'remittanceQueryMain',
  components: {
    query
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
