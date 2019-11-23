<template>
  <ynet-content id="menuMap" class="main-content" :headerInformation="true" :headerMenu="true">
    <ynet-tree></ynet-tree>
    <div class="mt20">
        <el-button @click="back">返回</el-button>
    </div>
  </ynet-content>
</template>


<script>

  //import NProgress from 'nprogress'
  export default {
    name:'menuMap',
    components:{
    },
    data() {
      return {

      };
    },
    methods: {
      back(){
        let _this =this
        _this.$router.push({path:'/my/myMain'})
      }
    }
  }
</script>
<style>
#menuMap .menuTreeIcon{background:#F8F8F8}
</style>
