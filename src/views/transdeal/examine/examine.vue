<template>
  <ynet-content id="templateName" class="main-content" :headerInformation="true" :headerMenu="true">
    <!--面包屑-->
    <ynet-breadcrumb></ynet-breadcrumb>
    <!--面包屑--end-->
    <!--功能区-->
    <div class="functionalArea">
      <h3 class="functionalAreaTitle">交易审核列表</h3>
      <div class="p20">
        <stayCheckTable1 v-if="indexStep=='1'" @changeStep="changeStep"></stayCheckTable1>   
        <stayCheckTable2 v-if="indexStep=='2'" @changeStep="changeStep" @list="list" :formdata="formdata" :code="code"></stayCheckTable2>
        <stayCheckTable3 v-if="indexStep=='3'" @changeStep="changeStep"></stayCheckTable3>
        <stayCheckTable4 v-if="indexStep=='4'" @changeStep="changeStep" :formdata="formdata" :table="table" :code="code"></stayCheckTable4>
      </div>
    </div>
    <!--功能区--end-->
  </ynet-content>
</template>
<script>
import stayCheckTable1 from './components/stayCheckTable1'
import stayCheckTable2 from './components/stayCheckTable2'
import stayCheckTable3 from './components/stayCheckTable3'
import stayCheckTable4 from './components/stayCheckTable4'
export default {
  name:'examine',
  components: {
    stayCheckTable1,
    stayCheckTable2,
    stayCheckTable3,
    stayCheckTable4

  },
  data() {
    return {
        currentItemIndex: 0,
        form: {},
        indexStep:1,
        formdata:{},
        code:'',
        table: []
    }
  },
  methods: {
    changeStep(val){
        let _this = this
        _this.indexStep=val[0]
        if(val[1]){
          _this.formdata = val[1]
        }
        if(val[2]){
          _this.code = val[2]
        }
      },
    list(val){
      this.table = val
    }
  },
  mounted(){ 
    
  }
}
</script>