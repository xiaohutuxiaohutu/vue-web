<template>
  <ynet-content id="templateName" class="main-content printArea" :headerInformation="true" :headerMenu="true">
    <!--面包屑-->
    <ynet-breadcrumb></ynet-breadcrumb>
    <!--面包屑--end-->
    <div class="functionalArea">
      <h3 class="functionalAreaTitle">操作员维护</h3>
      <operMaintain v-if="stepIndex=='0'" @changeStep="changeStep"></operMaintain>
      <detail v-if="stepIndex=='1'" @changeStep="changeStep" :formData="formData"></detail>
      <!--<add v-if="stepIndex=='2'" @changeStep="changeStep"></add>-->
      <update v-if="stepIndex=='3'" @changeStep="changeStep" :formData="formData"></update>
      <result v-if="stepIndex=='4'" @changeStep="changeStep" :resultData="formData"></result>
    </div>
  </ynet-content>
</template>

<script>
import operMaintain from './components/operMaintain'
import detail from './components/detail'
import add from './components/add'
import update from './components/update'
import result from './components/result1'

export default {
  name: 'operMaintainMain',
  components: {
    operMaintain,
    detail,
    add,
    update,
    result
  },
  data() {
    return {
      stepIndex: 0,
      formData: {}
    }
  },
  methods: {
    changeStep(index, formData) {
      let _this = this
      _this.stepIndex = Number(index)
      if (formData) _this.formData = formData
      _this.$tools.scrollTop()
    }
  },
  mounted() {

  }
}
</script>
