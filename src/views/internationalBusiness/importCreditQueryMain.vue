<template>
  <ynet-content id="templateName" class="main-content" :headerInformation="true" :headerMenu="true">
    <!--面包屑-->
    <ynet-breadcrumb></ynet-breadcrumb>
    <!--面包屑--end-->
    <!--功能区-->
    <div class="functionalArea">
      <div class="p20">
        <importCreditQuery></importCreditQuery>
      </div>
    </div>
    <!--功能区--end-->
  </ynet-content>
</template>

<script>
import importCreditQuery from './components/importCreditQuery'
export default {
  name:'importCreditQueryMain',
  components: {
    importCreditQuery
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
