<template>
  <div class="formEmbedTable">
    <div class="tableData p20">
      <table>
        <tr>
          <td>付款账号：</td>
          <td>{{list.termDetailList[0].payAcc}}</td>
        </tr>
        <tr>
          <td>付款账户名：</td>
          <td>{{list.termDetailList[0].payAccName}}</td>
        </tr>
        <tr>
          <td>定期存款账号：</td>
          <td>{{list.termDetailList[0].accNo}}</td>
        </tr>
        <tr>
          <td>定期存款户名：</td>
          <td>{{list.termDetailList[0].accName}}</td>
        </tr>
        <tr>
          <td>存期：</td>
          <td>{{$tools.dict.getDepTerm(list.termDetailList[0].depTerm+'-'+list.termDetailList[0].depTermTp)}}</td>
        </tr>
        <tr>
          <td>利率：</td>
          <td>{{list.termDetailList[0].interestRate}}</td>
        </tr>
        <tr>
          <td>转入金额：</td>
          <td>{{$tools.utils.toDecimalString(list.termDetailList[0].transAmount,true,2)}}</td>
        </tr>
        <tr>
          <td>大写：</td>
          <td>{{$tools.utils.toChinese(list.termDetailList[0].transAmount)}}</td>
        </tr>
        <tr>
          <td>到期约转方式：</td>
          <td v-if="list.termDetailList[0].autoTransDepIndex=='O'">本息转存定期</td>
          <td v-if="list.termDetailList[0].autoTransDepIndex=='W'">本金转存定期</td>
        </tr>
        <tr>
          <td>备注：</td>
          <td>{{list.termDetailList[0].transDesc}}</td>
        </tr>
        <tr v-if="rejectdialogVisible">
          <td>拒绝原因：</td>
          <td colspan="3">
            <el-form ref="form" :model="form" :rules="rules" class="formEmbedTable">
              <el-form-item prop="rejReason">
                <el-input type="textarea" v-model="form.rejReason"></el-input>
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
      <!--拒绝-->
      <div class="btnArea mt20 tacc" v-if="rejectdialogVisible">
        <el-button type="primary" @click="onSubmit">确认</el-button>
        <el-button @click="rejectdialogVisible=false">取消</el-button>
      </div>
      <!--拒绝end-->
    </div>
  </div>
</template>


<script>
export default {
  name: 'termDepositInDetail',
  props: {
    list: {
      type: Object
    }
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
      signData: '', //签名要素
      timeStamps: ''  //时间戳
    }
  },
  methods: {
    onSubmit() {
      let _this = this
      _this.$refs.form.validate((valid) => {
        if (valid) {
          _this.rejectdialogVisible = false
          _this.authFlag = '1'
          _this.allSubmit(_this.authFlag)
        }
      })
    },
    allSubmit(authFlag) {
      let _this = this
      //ukey start
      let confirmMsg = _this.list.termDetailList[0]
      let loginStorge = _this.$tools.storage.get("user", "save")
      let currentTime = _this.$tools.utils.formatDate(new Date(), { "removeFormat": true })
      let cstNo = loginStorge.cstNo
      let eCIFID = loginStorge.eCIFID
      let newDate = [
        { key: 'cstNo', value: cstNo },
        { key: 'eCIFID', value: eCIFID },
        { key: 'flowNo', value: confirmMsg.flowNo },
        { key: 'payAcc', value: confirmMsg.payAcc },
        { key: 'payAccName', value: confirmMsg.payAccName },
        { key: 'accNo', value: confirmMsg.accNo },
        { key: 'accName', value: confirmMsg.accName },
        { key: 'depTerm', value: confirmMsg.depTerm },
        { key: 'depTermTp', value: confirmMsg.depTermTp },
        { key: 'transAmount', value: confirmMsg.transAmount },
        { key: 'autoTransDepIndex', value: confirmMsg.autoTransDepIndex }
      ]
      let siDate = JSON.stringify(newDate);
      let certNo = loginStorge.serialNo
      let ukeyNo = loginStorge.uKeySn
      let siAmt = confirmMsg.transAmount
      let siAccountNo = confirmMsg.payAcc
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
        _this.signData = signData
      }
      //ukey end
      if (authFlag == '0') {
        _this.form.rejReason = ''
      }
      let body = {}
      body.transFlowNoList = [{ "transFlowNo": confirmMsg.flowNo }]
      body.bsnCode = confirmMsg.bsnCode
      body.cstNo = _this.loginStorage.cstNo
      body.hostNo = _this.loginStorage.hostNo
      body.eCIFID = _this.loginStorage.eCIFID
      body.authFlag = authFlag
      body.rejReason = _this.form.rejReason
      body.signedData = _this.signData
      body.timeStamps = _this.timeStamps
      //签名验签字段 start
      body.flowNo = confirmMsg.flowNo
      body.payAcc = confirmMsg.payAcc
      body.payAccName = confirmMsg.payAccName
      body.accNo = confirmMsg.accNo
      body.accName = confirmMsg.accName
      body.depTerm = confirmMsg.depTerm
      body.depTermTp = confirmMsg.depTermTp
      body.transAmount = confirmMsg.transAmount
      body.autoTransDepIndex = confirmMsg.autoTransDepIndex
      //签名验签字段 end
      _this.$tools.request(_this, "CB030103.do", body).then(
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
    _this.getTimeStamps('CB030103')
  },
}
</script>