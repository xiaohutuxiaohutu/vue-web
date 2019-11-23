<template>
  <ynet-content id="changeCommonCounterparty" class="main-content printArea" :headerInformation="true" :headerMenu="true">
    <!--面包屑-->
    <ynet-breadcrumb></ynet-breadcrumb>
    <!--面包屑--end-->
    <!--功能区-->
    <div class="functionalArea">
      <div class="p20">
      <changeCounterparty></changeCounterparty>
      </div>
    </div>
    <!--功能区--end-->
  </ynet-content>
</template>

<script>
import changeCounterparty from './components/changeCounterparty'

export default {
  name:'changeCommonCounterparty',
  components: {
    changeCounterparty
   
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
