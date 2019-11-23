<template>
  <ynet-content id="templateName" class="main-content" :headerInformation="true" :headerMenu="true">
    <!--面包屑-->
    <ynet-breadcrumb></ynet-breadcrumb>
    <!--面包屑--end-->
    <!--功能区-->
    <div class="functionalArea">
      <!--<div class="contentTab">
        <a href="#/internationalBusiness/commonCounterpartyMain" class="current">常用交易对手</a>
        <a href="#/internationalBusiness/commonCounterpartyMain@beneficiaryMain">信用证受益人</a>
      </div>-->
      <div class="p20">
        <commonCounterpartyQuery v-if="stepIndex=='0'" @changePage="changePage"></commonCounterpartyQuery>
        <commonCounterpartyAdd v-if="stepIndex=='1'" @changePage="changePage" :formData="formData"></commonCounterpartyAdd>
      </div>
    </div>
    <!--功能区--end-->
  </ynet-content>
</template>

<script>
import commonCounterpartyQuery from './components/commonCounterpartyQuery'
import commonCounterpartyAdd from './components/commonCounterpartyAdd'
export default {
  name:'commonCounterpartyMain',
  components: {
    commonCounterpartyQuery,
    commonCounterpartyAdd
  },
  data() {
    return {
      stepIndex:0,
      formData:{}
    }
  },
  methods: {
    changePage(index,formData){
      let _this=this
      _this.stepIndex=Number(index)
      if(formData) _this.formData=formData
      _this.$tools.scrollTop()
    }

  },
  mounted(){ 
  }
}
</script>
