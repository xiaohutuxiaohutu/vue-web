<template>
  <ynet-content id="templateName" class="main-content" :headerInformation="true" :headerMenu="true">
    <!--面包屑-->
    <ynet-breadcrumb></ynet-breadcrumb> 
    <!--面包屑--end-->
    <!--功能区-->
    <div class="functionalArea" v-if="stepIndex==1">
      <h3 class="functionalAreaTitle">贷款申请信息查询</h3>
      <div class="p20">
        <Search @changeStep="changeStep"></Search>
        <TableLoa @CBstep="CBstep" :formData="formData" :subform="subform"></TableLoa>
      </div>
    </div>
    <div class="functionalArea" v-if="stepIndex==2">
      <DetailInfo :detailData="detailData" @returnMain="returnMain"></DetailInfo>
    </div>
    <!--功能区--end-->
  </ynet-content>
</template>

<script>
import Search from './components/search';
import TableLoa from './components/tableLoa';
import DetailInfo from './components/detailInfo';
export default {
  name:'loanQueryMain',
  components: {
    Search,
    TableLoa,
    DetailInfo
  },
  data() {
    return {
        formData:{},
        stepIndex:1,
        detailData:{},
        subform:{}
    }
  },
  methods: {
    CBstep(stepIndex,data){
      let _this = this
      _this.stepIndex=Number(stepIndex)
      _this.detailData = data
    },
    changeStep(index,formData,form){
      let _this=this
      _this.stepIndex=Number(index)
      _this.formData=formData
      _this.subform=form
      // console.log(formData)
    },
    returnMain(stepIndex){
    let _this = this
    _this.stepIndex=Number(stepIndex)
  }
  },
  
  mounted(){ 
    
  }
}
</script>
<style>

</style>