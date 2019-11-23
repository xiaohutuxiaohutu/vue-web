<template>
  <div class="fourForm tableForm mt20">
    <h3>定期存款存入信息</h3>
    <el-form>
      <el-row>
        <el-form-item label="付款账号：" class="fullLine">
          {{confirmMsg.payAcc}}
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="付款账号名称：" class="fullLine">
          {{confirmMsg.payAccName}}
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="存期：" class="fullLine">
          <span v-if="confirmMsg.depTerm=='3M'">三个月</span>
          <span v-if="confirmMsg.depTerm=='6M'">半年</span>
          <span v-if="confirmMsg.depTerm=='1Y'">一年</span>
          <span v-if="confirmMsg.depTerm=='2Y'">两年</span>
          <span v-if="confirmMsg.depTerm=='3Y'">三年</span>
          <span v-if="confirmMsg.depTerm=='5Y'">五年</span>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="利率：" class="fullLine">
          {{confirmMsg.rate}}
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="转入金额：" class="fullLine">
          {{$tools.utils.toDecimalString(confirmMsg.amt,true,2)}}
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="大写：" class="fullLine">
          {{$tools.utils.toChinese(confirmMsg.amt)}}
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="保证金账号：" class="fullLine">
          {{confirmMsg.rcvAcc}}
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="保证金账号名称：" class="fullLine">
          {{confirmMsg.rcvAccName}}
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="账号类型：" class="fullLine">
          {{confirmMsg.rcvAccTypeName}}
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="付款凭证用途：" class="fullLine">
          {{confirmMsg.purpose}}
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="备注：" class="fullLine">
          {{confirmMsg.remark}}
        </el-form-item>
      </el-row>
    </el-form>
    <div class="btnArea mt20 tac">
      <el-button type="primary" @click="uKeySubmit">确定</el-button>
      <el-button @click="preStep">返回</el-button>
    </div>
  </div>
</template>


<script>
export default {
  name: 'termconfirmPage',
  props: {
    confirmMsg: {
      type: Object
    }
  },
  data() {
    return {
    }
  },
  mounted() {
    let _this = this
    _this.getTimeStamps('CB03030101')
  },
  methods: {
    getTimeStamps(val) { //获取防重复提交timeStamps
      let _this = this
      _this.$tools.request(_this, "CB000028Action.do", { tradeCode: val }).then(data => {
        _this.confirmMsg.timeStamps = data.body.timeStamps
      })
    },
    uKeySubmit() {
      let _this = this
      let userStorge = _this.$tools.storage.get("user", "save")
      let cstNo = userStorge.cstNo
      let userNo = userStorge.eCIFID
      let newDate = [{ key: 'cstNo', value: cstNo },
      { key: 'userNo', value: userNo },
      { key: 'payAcc', value: _this.confirmMsg.payAcc },
      { key: 'depTerm', value: _this.confirmMsg.depTerm.substring(0, 1) },
      { key: 'depTermTp', value: _this.confirmMsg.depTerm.substring(1, 2) },
      { key: 'rcvAcc', value: _this.confirmMsg.rcvAcc },
      { key: 'rcvAccType', value: _this.confirmMsg.rcvAccType },
      { key: 'amt', value: _this.confirmMsg.amt }]
      let siDate = JSON.stringify(newDate);
      let certNo = userStorge.serialNo
      let ukeyNo = userStorge.uKeySn
      let siAmt = _this.confirmMsg.amt
      let siAccountNo = _this.confirmMsg.payAcc
      let arrAcc = ["付款账号:", siAccountNo]
      let arrAmt = ["交易金额:", siAmt]
      let keyFlag = _this.$ukey
      if (keyFlag == true || keyFlag == 'true') {
        let flag = getSignData(arrAcc, arrAmt, siDate, certNo, ukeyNo)
        if (flag == false || flag == 'false') {
          //this.$alert('UKey签名失败,请重新再试', '温馨提示')
          return
        }
        let signData = document.getElementById("signData").value.toString()
        _this.confirmMsg.signedData = signData
      }
      _this.nextStep()
    },
    nextStep() {
      let _this = this
      let body = $.extend({}, _this.confirmMsg)
      body.depTermTp = _this.confirmMsg.depTerm.substring(1, 2)
      body.depTerm = _this.confirmMsg.depTerm.substring(0, 1)
      _this.$tools.request(_this, "CB03030101.do", body).then(
        data => {
          if (data.body.errorCode == '0') {
            _this.$emit("goStepPage", [2, data.body])
          } else {
            _this.$alert(data.body.errorMsg, '温馨提示', {
              confirmButtonText: '确定',
              callback: action => {
                _this.getTimeStamps('CB03030101')
              }
            });
          }
        })
    },
    preStep() {
      let _this = this
      _this.confirmMsg.balanceIndex = 0
      _this.$emit("goStepPage", [0, _this.confirmMsg])
    }
  }
}
</script>