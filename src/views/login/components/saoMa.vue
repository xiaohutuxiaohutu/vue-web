<template>
    <div class="saoMa">
      <div class="saoMa-content" style="overflow:hidden;">
        <div class="main-container">
          <div class="header-logo"><img src="../../../images/common/logo.png" /></div>
        </div>
      </div>
      <div class="downL">
         <p><a href="/corpbank/static/androidDownload/chbank.apk" class="cOrange">安卓手机端</a></p>
         <p><a href="/corpbank/static/androidDownload/chbank.apk" class="cOrange">ios手机端</a></p>
      </div>
    </div>
</template>

<script>
  import ghbIcon from '@src/components/icon'  //icon
  export default {
    name:'saoMa',
    components:{
      ghbIcon
    },
    data () {
      return {
         
      };
    },// data
    methods: {
    //  back(){
    //    let _this=this
    //    _this.$emit("back")
    //  }
    }// methods
  }

</script>
<style>
.saoMa{
  width:100%;
  min-width: 1400px;
  background-color: #ffffff;
  height:720px;
}
.saoMa .saoMa-content{
  width: 100%;
  height: 9rem;
}
.saoMa .header-logo{float:right !important;}
.downL{width:50%;min-width:700px;margin: 0 auto;}
.downL p{border:1px solid #828282;border-radius:20px;text-align:center;margin:30px 30px;height:5rem;line-height:5rem;}
.downL p a{font-size:2rem;}
</style>

