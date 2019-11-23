<template>
  <div class="main-content">
    <!--面包屑-->
    <ynet-breadcrumb></ynet-breadcrumb>
    <!--面包屑--end-->
    <ynet-content id="serviceQuery" :headerInformation="true" :headerMenu="true" class="functionalArea">
      <h3 class="functionalAreaTitle">网银服务费查询</h3>
      <!--网银服务费table-->
      <div class="twoForm tableForm p20">
        <h3>网银服务费</h3>
        <el-form :model="form">
          <el-form-item label="费用种类：">
            {{form.billItemName?form.billItemName:'注册客户年服务费'}}
          </el-form-item>
          <el-form-item label="收费标准：">
            {{$tools.utils.currencyFormat(form.feeWithoutDiscount)}}
          </el-form-item>
          <el-form-item label="客户优惠率：">
            {{(form.discount)*100}}%
          </el-form-item>
          <el-form-item label="实际收费：">
            {{$tools.utils.currencyFormat(form.feeWithDiscount)}}
          </el-form-item>
          <el-form-item label="下一扣费日：">
            {{$tools.utils.formatDateSymbol(form.nextFeeDate)}}
          </el-form-item>
        </el-form>
        <div class="btnArea mt20 tac">
          <el-button type="primary" @click="$router.push('/my/myMain')">返回</el-button>
        </div>
      </div>
      <!--网银服务费table--end-->

    </ynet-content>
  </div>
</template>
  
<script>

export default {
  name: 'serviceQuery',
  components: {},
  data() {
    return {
      form: {
        billItemName: '',
        feeWithoutDiscount: 0,
        discount: 0,
        feeWithDiscount: 0,
        nextFeeDate: 0
      }
    };
  },
  methods: {
    getServiceBill() {
      let _this = this
      let body = {}
      _this.$tools.request(this, "CB080501.do", body).then(
        data => {
          _this.form.billItemName = data.body.billItemName
          _this.form.feeWithoutDiscount = data.body.feeWithoutDiscount
          _this.form.discount = data.body.discount
          _this.form.feeWithDiscount = data.body.feeWithDiscount
          _this.form.nextFeeDate = data.body.nextFeeDate
        })
    },
  },
  mounted() {
    let _this = this
    _this.getServiceBill()
  }
}
</script>
