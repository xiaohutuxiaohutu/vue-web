<template>
  <ynet-content id="templateName" class="main-content printArea" :headerInformation="true" :headerMenu="true">
    <!--面包屑-->
    <ynet-breadcrumb></ynet-breadcrumb>
    <!--面包屑--end-->
    <!--功能区-->
    <ynet-content id="authTempleteMain" :headerInformation="true" :headerMenu="true" class="functionalArea">
      <h3 class="functionalAreaTitle">审批模板维护</h3>
      <div class="p20">
        <authTemplete v-if="stepIndex=='0'" @changeStep="changeStep"></authTemplete>
        <add v-if="stepIndex=='1'" @changeStep="changeStep"></add>
        <update v-if="stepIndex=='2'" @changeStep="changeStep" :tableData="tableData"></update>
        <result v-if="stepIndex=='3'" @changeStep="changeStep" :resultData="tableData"></result>
        <!-- 溫馨提示 -->
        <ynet-warm-tips :items="warmTips"></ynet-warm-tips>
        <!-- 溫馨提示end -->
      </div>
    </ynet-content>
    <!--功能区--end-->
  </ynet-content>
</template>

<script>
import authTemplete from './components/authTemplete'
import add from './components/add'
import update from './components/update'
import result from './components/result'

export default {
  name: 'authTempleteMain',
  components: {
    authTemplete,
    add,
    update,
    result
  },
  data() {
    return {
        warmTips:[
          '1.可新增审批模板，并对现有的审批模板进行维护；',
          '2.企业有两个默认审批模板，默认审批模板不能修改及删除。',
        ],
      stepIndex: 0,
      tableData: {}
    }
  },
  methods: {
    changeStep(index, formData) {
      let _this = this
      _this.stepIndex = Number(index)
      if (formData) _this.tableData = formData
      _this.$tools.scrollTop()
    }
  },
  mounted() {

  }
}
</script>
