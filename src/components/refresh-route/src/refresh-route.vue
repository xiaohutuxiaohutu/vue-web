<template>
<div class="refreshRoute">
    <p><span class="colorRed">{{second}}</span>秒后跳转页面</p>
    <p><el-button  type="primary" @click="jumpRoute">点击立即跳转</el-button></p>
</div>
</template>

<script>
export default {
  name: 'refresh-route',
  componentName: 'refresh-route',
  props: {
    parentVM: {
      default:""
    },
    countDown: {
      default:3
    },
    parentInit:{
      default:false
    },
    jumpOtherRoute:{
      default:false
    }
  },
  data () {
    return {
      second:0,
      countDownFN:""
    }
  },
  methods:{
    jumpRoute(){
      let _this=this
      clearInterval(_this.countDownFN)
      if(!_this.jumpOtherRoute){
        const Data = _this.parentVM.$options.data.call(_this.parentVM)
        Object.assign(_this.parentVM, Data)
        if(_this.parentInit) _this.parentInit()
      }else{
        _this.$router.push(_this.jumpOtherRoute)
      }
    },
    initCountDown(){
      let _this=this
      _this.second=_this.countDown
      _this.$tools.scrollTop()
      _this.countDownFN=setInterval(function(){
         _this.second--
        if(_this.second==0){
          clearInterval(_this.countDownFN)
          _this.jumpRoute()
        }
      },1000)
    }
  },
  mounted () {
    this.initCountDown()
  }
}
</script>
<style lang="scss">
@import '../../../styles/vars.scss';

</style>
