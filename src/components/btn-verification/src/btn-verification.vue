<template>
  <span class="btnVerification">
    <el-button v-if="!countDown" type="primary" @click="getVerification">{{btnText}}</el-button>
    <!--<span v-if="countDown" class="countDown">（序号{{verificationNO}}）{{second}}s</span>-->
    <span v-if="countDown" class="countDown">{{second}}s</span>
  </span>
</template>
<script>
export default {
  name: 'btn-verification',
  componentName: 'btn-verification',
  data() {
    return {
      countDown: false,
      second: 60,
      btnText: "获取验证码",
      verificationNO: "25",
      defaultConfig: {
        url: "CB100001.do",
        params: {}
      }
    }
  },
  props: {
    config: { type: Object },
    value: {},
    mobileNo:{type:String}
  },
  methods: {
    getVerification() {
      let _this = this
      if('FGPWD' == _this.defaultConfig.params.tempType){
        _this.defaultConfig.url = "CB100003.do"
        _this.defaultConfig.params.mobileNo = _this.mobileNo 
      }
     // alert(_this.defaultConfig.params.mobileNo)
      _this.$tools.request(_this, _this.defaultConfig.url, _this.defaultConfig.params).then(
        data => {
          if (data.body.errorCode == '0') {
            _this.countDown = true
            let logoutTimmer = setInterval(function() {
              if (_this.second <= 1) {
                clearInterval(logoutTimmer)
                _this.countDown = false
                _this.second = 90
                _this.btnText = "再次获取验证码"
              } else {
                _this.second -= 1;
              }
            }, 1000)
            _this.verificationNO = data.body.randomNo
          } else {
            // _this.countDown = false
            // _this.second = 90
            // _this.btnText = "获取验证码失败"
          }
          _this.$emit('click', data)
        })
      // }
    }
  },
  created() {
    let _this = this
    $.extend(_this.defaultConfig, _this.config)
  },
  mounted() {
  }
}
</script>
<style  lang="scss">
@import '../../../styles/vars.scss';
.countDown {
  background: #d5d5d5;
  color: #fff;
  width: 120px;
  height: 40px;
  line-height: 40px;
  padding: 0px;
  display: inline-block;
  vertical-align: middle;
  text-align: center;
}

.btnVerification .el-button {
  width: 120px;
  padding: 0px;
  height: 40px;
  line-height: 40px;
  border: 0;
}
</style>
