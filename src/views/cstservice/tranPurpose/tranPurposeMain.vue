<template>
  <div class="main-content">
  <!--面包屑-->
    <ynet-breadcrumb></ynet-breadcrumb>
    <!--面包屑--end-->
    <ynet-content id="TranPurposeMain" :headerInformation="true" :headerMenu="true" class="functionalArea">
      <h3 class="functionalAreaTitle">转账用途维护</h3>
      <div class="p20">
        <TranPurpose></TranPurpose>
      </div>
    </ynet-content>
  </div>
</template>
  
<script>
  //import LoginHeader from '@src/views/common/Header';
  import TranPurpose from './components/TranPurpose';
  //import HbFooter from '@src/views/common/Footer';
  
  //import NProgress from 'nprogress'
  export default {
    name:'TranPurposeMain',
    components:{
      TranPurpose
    },
    data() {
      return {
        
      };
    },
    methods: {
      
    }
  }

</script>
