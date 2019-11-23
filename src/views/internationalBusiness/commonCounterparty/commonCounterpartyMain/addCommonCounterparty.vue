<template>
  <ynet-content id="addCommonCounterparty" class="main-content printArea" :headerInformation="true" :headerMenu="true">
    <!--面包屑-->
    <ynet-breadcrumb></ynet-breadcrumb>
    <!--面包屑--end-->
    <!--功能区-->
    <div class="functionalArea">
      <div class="p20">
      <addCounterparty></addCounterparty>
      </div>
    </div>
    <!--功能区--end-->
  </ynet-content>
</template>

<script>
import addCounterparty from './components/addCounterparty'

export default {
  name:'addCommonCounterparty',
  components: {
    addCounterparty
   
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
