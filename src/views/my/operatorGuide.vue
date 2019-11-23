<template>
  <div>
    <!--ynet-content :headerMenu="false"></ynet-content--><!--可以利用content里的setHeaderMenu改变headerMenu的值-->
     <div class="wrapper"></div>
     <div class="guideBox" v-if="guideCheck" >
        <img :src="imageAddress" alt="">
        <div class="guideNumBox">
            <p v-for="(i,index) in list"><span class="guideNum" @click="goStepByIndex(i)" :class="{'clickguideNum':i==ind}"> {{index+1}}</span><i class="el-icon-arrow-right"></i></p>
            <p><span class="guideNum" style="width:90px;background-color:#f18e00;color:#fff;border-radius:2px;" @click="start">开始体验</span></p>
       </div>
  </div>
 </div>
  
</template>


<script>

  //import NProgress from 'nprogress'
  export default {
    name:'operGuide',
    components:{
    },
    data() {
      return {
        guideCheck:true,
        imageAddress:'',
        headerMenu:false,
        list:['01','02','03','04','05','06','07'],
        ind:'01',

      }
    },
    methods: {
      check(){
        let _this = this
        _this.guideCheck = true
      },
      start(){
        let _this = this
        _this.guideCheck = false
        _this.$store.commit('HEADERMENU',true)
        _this.$router.push({ path: '/my/myMain' })
      },
      goStepByIndex(index){
        let _this = this
        _this.ind = index
        _this.imageAddress = require('../../images/managerGuide/'+index+'.png')
      }
    },
   mounted(){
     let _this = this
     _this.$store.commit('HEADERMENU',false)
     _this.goStepByIndex('01')
   }
  }
</script>
<style>
.guideBox{position:relative;z-index:5000;}
.guideBox .guideNum{width:40px;height:40px;color:#000;line-height:40px;text-align:center;margin:0 10px;display:inline-block;cursor:pointer;background:#fff;font-size:16px;}
.guideNumBox{position:absolute;top:900px;left:500px;}
.guideBox .guideNum:hover{background:#ee6b00;color:#fff;}
.guideBox img{margin:0 auto;display:block;}
.guideBox p{display:inline-block;}
.guideBox .last_P{background:#efefef;cursor:pointer;color:#000;width:30px;height:30px;}
.guideBox .el-icon-arrow-right{color:#fff;font-size:20px;font-weight:bold;}
.wrapper{position: fixed;left: 0;top: 0;width: 100%;height: 100%;opacity: .6;background: #1b1917;z-index:4000;}
.guideBox .clickguideNum{width:40px;height:40px;line-height:40px;text-align:center;margin:0 10px;display:inline-block;cursor:pointer;font-size:16px;background:#ee6b00;color:#fff;}
</style>