<template>
  <div>
    <!--进度条-->
    <ynet-progress-bar class="mt10" :items="stepText" :itemIndex="stepIndex"></ynet-progress-bar>
    <!--进度条--end-->
    <div class="p20">
      <update1 v-if="stepIndex=='0'" @changeStep="changeStep" :formData="stepData"></update1>
      <update2 v-if="stepIndex=='1'" @changeStep="changeStep" :formData="stepData"></update2>
      <update3 v-if="stepIndex=='2'" @changeStep="changeStep" :formData="stepData"></update3>
      <result v-if="stepIndex=='3'" @changeStep="changeStep" :resultData="stepData"></result>
    </div>
  </div>
</template>

<script>
import update1 from './update1'
import update2 from './update2'
import update3 from './update3'
import result from './result'

export default {
  name: 'updateOper',
  components: {
    update1,
    update2,
    update3,
    result
  },
  props: {
    formData: { type: Object, default: {} },
  },
  data() {
    return {
      stepText: ["基本信息", "可操作账户", "菜单权限", "提交结果"],
      stepIndex: 0,
      stepData:{}
    }
  },
  methods: {
    changeStep(index, formData) {
      let _this = this
      if (Number(index) == 99) {
        _this.$emit("changeStep", "0")
      } else {
        _this.stepIndex = Number(index)
        if (formData) _this.stepData = formData
        _this.$tools.scrollTop()
      }
    }
  },
  created() {
    let _this = this
    _this.stepData = $.extend({},_this.formData)
  }
}
</script>
