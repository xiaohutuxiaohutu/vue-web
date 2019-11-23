<template>
  <ynet-content id="MyMain" class="main-content" :headerInformation="true" :headerMenu="true">
    <div class="fix" v-if="myMain">
      <MyGraphical class="fl"></MyGraphical>
      <MyInformation class="fr" @announment="announment"></MyInformation>
    </div>
    <div class="fix mt30" v-if="myMain">
      <MyReminder class="fl"></MyReminder>
      <MyCardRecord class="fr"></MyCardRecord>
    </div>
    <notice v-if="!myMain"  @announment="announment"></notice>
  </ynet-content>
</template>


<script>
  import MyGraphical from './components/MyGraphical';
  import MyInformation from './components/MyInformation';
  import MyReminder from './components/MyReminder';
  import MyCardRecord from './components/MyCardRecord';
  //import shortCutMenu from './components/shortCutMenu';
  import notice from './components/notice';

  //import NProgress from 'nprogress'
  export default {
    name:'MyMain',
    components:{
      MyGraphical,
      MyInformation,
      MyCardRecord,
      MyReminder,
      //shortCutMenu,
      notice
    },
    data() {
      return {
       // menuTree:[],//从缓存中获取操作员的菜单信息树
       myMain: true
      };
    },
    methods: {
     announment(val){
        this.myMain = val
      }
    }
  }
</script>
<style>


</style>
