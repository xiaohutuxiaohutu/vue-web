<template>
  <ynet-content id="templateName" class="main-content" :headerInformation="true" :headerMenu="true">
    <!--面包屑-->
    <ynet-breadcrumb></ynet-breadcrumb>
    <!--面包屑--end-->
    <!--功能区-->
    <div class="functionalArea">
      <!--div class="contentTab">
        <a href="#/internationalBusiness/exportCollectionMain">出口托收</a>
        <a href="#/internationalBusiness/exportCollectionMain@exportCollectionQuery" class="current">出口托收查询</a>
      </div-->
      <div class="p20">
        <exportCollectionQuery></exportCollectionQuery>
      </div>
    </div>
    <!--功能区--end-->
  </ynet-content>
</template>

<script>
import exportCollectionQuery from './components/exportCollectionQuery'
export default {
  name:'exportCollectionQueryMain',
  components: {
    exportCollectionQuery
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
