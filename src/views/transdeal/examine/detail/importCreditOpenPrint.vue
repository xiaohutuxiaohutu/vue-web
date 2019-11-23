<template>
  <div>
    <importCreditOpenPrint :formData="formData" :isPrint="isPrint"></importCreditOpenPrint>
    <div class="tableData p20">
      <table v-if="rejectdialogVisible">
        <tr>
          <td>拒绝原因：</td>
          <td colspan="3">
            <el-form ref="form" :model="form" :rules="rules" class="formEmbedTable">
              <el-form-item prop="rejReason">
                <el-input type="textarea" style="100px;" v-model="form.rejReason"></el-input>
              </el-form-item>
            </el-form>
          </td>
        </tr>
      </table>
      <div class="btnArea mt20 tac" v-if="!rejectdialogVisible">
        <el-button type="primary" @click="allSubmit('0')">同意</el-button>
        <el-button type="primary" @click="rejectdialogVisible=true">拒绝</el-button>
        <el-button @click="close">关闭</el-button>
      </div>
      <div class="btnArea mt20 tac" v-if="rejectdialogVisible">
        <el-button type="primary" @click="onSubmit">确认</el-button>
        <el-button @click="rejectdialogVisible=false">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import importCreditOpenPrint from '../../../internationalBusiness/components/importCreditOpenPrint'
export default {
  name: 'importCreditOpenPrint1',
  components: {
    importCreditOpenPrint
  },
  data() {
    return {
      loginStorage: this.$tools.storage.get("user", "save"),
      rejectdialogVisible: false,
      form: {
        rejReason: ''
      },
      authFlag: '',
      rules: {
        rejReason: [
          { required: true, message: '请输入拒绝原因', trigger: 'blur' },
          { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
        ]
      },
      signData: '',  //签名要素
      timeStamps: ''  //时间戳
    }
  },
  props: {
    formData: { type: Object, default: {} },
    isPrint: { type: Boolean, default: false },
  },
  methods: {
    onSubmit() {
      let _this = this
      _this.$refs.form.validate((valid) => {
        if (valid) {
          _this.rejectdialogVisible = false
          _this.allSubmit('1')
        }
      })
    },
    allSubmit(authFlag) {
      let _this = this
      //ukey start
      let loginStorge = _this.$tools.storage.get("user", "save")
      let currentTime = _this.$tools.utils.formatDate(new Date(), { "removeFormat": true })
      let cstNo = loginStorge.cstNo
      let eCIFID = loginStorge.eCIFID
      let newDate = [
        { key: 'cstNo', value: cstNo },
        { key: 'eCIFID', value: eCIFID },
        { key: 'sequenceNo', value: _this.formData.sequenceNo },
        { key: 'otherInstDebitAccNo1', value: _this.formData.otherInstDebitAccNo1 },
        { key: 'beneficiary', value: _this.formData.beneficiary },
        { key: 'AMTFigures', value: _this.formData.AMTFigures },
        { key: 'CRYFigures', value: _this.formData.CRYFigures }
      ]
      let siDate = JSON.stringify(newDate);
      let certNo = loginStorge.serialNo
      let ukeyNo = loginStorge.uKeySn
      let siAmt = _this.formData.AMTFigures
      let siAccountNo = _this.formData.beneficiary
      let arrAcc = ["受益人姓名:", siAccountNo]
      let arrAmt = ["交易金额:", siAmt]
      let keyFlag = _this.$ukey
      if (keyFlag == true || keyFlag == 'true') {
        let flag = getSignData(arrAcc, arrAmt, siDate, certNo, ukeyNo)
        if (flag == false || flag == 'false') {
          //this.$alert('UKey签名失败,请重新再试', '温馨提示')
          return
        }
        let signData = document.getElementById("signData").value.toString()
        _this.signData = signData
      }
      //ukey end
      if (authFlag == '0') {
        _this.form.rejReason = ''
      }
      let body = {}
      body.transFlowNoList = [{ "transFlowNo": _this.formData.sequenceNo }]
      body.bsnCode = _this.formData.bsnCode
      body.cstNo = _this.loginStorage.cstNo
      body.hostNo = _this.loginStorage.hostNo
      body.eCIFID = _this.loginStorage.eCIFID
      body.authFlag = authFlag
      body.rejReason = _this.form.rejReason
      body.signedData = _this.signData
      body.timeStamps = _this.timeStamps
      //签名验签字段 start
      body.sequenceNo = _this.formData.sequenceNo
      body.otherInstDebitAccNo1 = _this.formData.otherInstDebitAccNo1
      body.beneficiary = _this.formData.beneficiary
      body.AMTFigures = _this.formData.AMTFigures
      body.CRYFigures = _this.formData.CRYFigures
      //签名验签字段 end
      _this.$tools.request(_this, "CB050303.do", body).then(
        data => {
          let errorCode = data.body.errorCode
          if (errorCode == '0') {
            _this.$emit("close", [4, data.body])
          } else {
            this.$alert('授权失败', '提示', {
              confirmButtonText: '确定'
            });
          }
        })
    },
    close() {
      this.$emit("close")
    },
    getTimeStamps(tradeCode) {
      let _this = this
      let code = { "tradeCode": tradeCode }
      _this.$tools.request(this, "CB000028Action.do", code).then(data => {
        _this.timeStamps = data.body.timeStamps
      })
    }
  },
  mounted() {
    let _this = this
    _this.getTimeStamps('CB050303')
  }
}
</script>
<style  lang="scss">

</style>