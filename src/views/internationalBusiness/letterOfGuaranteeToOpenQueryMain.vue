<template>
  <ynet-content id="templateName" class="main-content" :headerInformation="true" :headerMenu="true">
    <!--面包屑-->
    <ynet-breadcrumb></ynet-breadcrumb>
    <!--面包屑--end-->
    <!--功能区-->
    <div class="functionalArea">
      <!--div class="contentTab">
        <a href="#/internationalBusiness/letterOfGuaranteeToOpenMain">保函开立</a>
        <a href="#/internationalBusiness/letterOfGuaranteeToOpenMain@letterOfGuaranteeToOpenQuery" class="current">保函开立查询</a>
      </div-->
      <div class="p20">
        <letterOfGuaranteeToOpenQuery></letterOfGuaranteeToOpenQuery>
      </div>
    </div>
    <!--功能区--end-->
  </ynet-content>
</template>

<script>
import letterOfGuaranteeToOpenQuery from './components/letterOfGuaranteeToOpenQuery'
export default {
  name:'letterOfGuaranteeToOpenQueryMain',
  components: {
    letterOfGuaranteeToOpenQuery
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
