<template>
  <ynet-content id="templateName" class="main-content" :headerInformation="true" :headerMenu="true">
    <!--面包屑-->
    <ynet-breadcrumb></ynet-breadcrumb>
    <!--面包屑--end-->
    <!--功能区-->
    <div class="functionalArea">
      <!--<div class="contentTab">
        <a href="#/internationalBusiness/commonCounterpartyMain">常用交易对手</a>
        <a href="#/internationalBusiness/commonCounterpartyMain@beneficiaryMain" class="current">信用证受益人</a>
      </div>-->
      <div class="p20">
        <beneficiaryList v-if="stepIndex=='0'" @changePage="changePage"></beneficiaryList>
        <addBeneficiary v-if="stepIndex=='1'" @changePage="changePage" :formData="formData"></addBeneficiary>
      </div>
    </div>
    <!--功能区--end-->
  </ynet-content>
</template>

<script>
import beneficiaryList from './components/beneficiaryList'
import addBeneficiary from './components/addBeneficiary'
export default {
    name: 'beneficiaryMain',
    components: {
        beneficiaryList,
        addBeneficiary
    },
    data() {
        return {
            stepIndex: 0,
            formData: {}
        }
    },
    methods: {
        changePage(index, formData) {
            let _this = this
            _this.stepIndex = Number(index)
            _this.formData = formData
            _this.$tools.scrollTop()
        }
    },
    mounted() {
    }
}
</script>
