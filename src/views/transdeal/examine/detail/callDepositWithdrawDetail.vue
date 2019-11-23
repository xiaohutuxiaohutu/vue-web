<template>
  <div class="formEmbedTable">
    <div class="tableData p20">
      <table>
        <tr>
          <td>通知存款户名：</td>
          <td>{{list.callDetailList[0].accName}}</td>
          <td>通知收款户名：</td>
          <td>{{list.callDetailList[0].recAccName}}</td>
        </tr>
        <tr>
          <td>通知存款账号：</td>
          <td>{{list.callDetailList[0].accNo}}</td>
          <td>通知收款账号：</td>
          <td>{{list.callDetailList[0].recAcc}}</td>
        </tr>
        <tr>
          <td>通知存款种类：</td>
          <td>{{$tools.dict.callType(list.callDetailList[0].accTp)}}</td>
          <td>币种：</td>
          <td>人民币</td>
        </tr>
        <tr>
          <td>通知存款本金：</td>
          <td>{{$tools.utils.toDecimalString(accBalance,true,2)}}</td>
          <td>参考利率：</td>
          <td>{{list.callDetailList[0].interestRate}}</td>
        </tr>
        <tr>
          <td>通知方式：</td>
          <td v-if="list.callDetailList[0].withType==1">全部支取</td>
          <td v-if="list.callDetailList[0].withType==2">部分支取</td>
          <td>起息日：</td>
          <td>{{$tools.utils.formatDate(list.callDetailList[0].valDt,{"symbol":"YYYY-MM-DD"})}}</td>
        </tr>
        <tr>
          <td>转出本金：</td>
          <td>{{$tools.utils.toDecimalString(list.callDetailList[0].transAmount,true,2)}}</td>
          <td>预约号：</td>
          <td>{{list.callDetailList[0].orderNo}}</td>
        </tr>
        <tr>
          <td>金额大写：</td>
          <td>{{$tools.utils.toChinese(list.callDetailList[0].transAmount)}}</td>
          <td></td>
          <td></td>
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
      <!--拒绝弹窗-->
      <div class="btnArea mt20 tacc" v-if="rejectdialogVisible">
        <el-button type="primary" @click="onSubmit">确认</el-button>
        <el-button @click="rejectdialogVisible=false">取消</el-button>
      </div>
      <!--拒绝end弹窗-->
    </div>
  </div>
</template>


<script>
export default {
  name: 'callDepositWithdrawDetail',
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
      accBalance: '',  //通知存款本金
      signData: '',  //签名要素
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
      let form = _this.list.callDetailList[0]
      let loginStorge = _this.$tools.storage.get("user", "save")
      let currentTime = _this.$tools.utils.formatDate(new Date(), { "removeFormat": true })
      let cstNo = loginStorge.cstNo
      let eCIFID = loginStorge.eCIFID
      let newDate = [
        { key: 'cstNo', value: cstNo },
        { key: 'eCIFID', value: eCIFID },
        { key: 'flowNo', value: form.flowNo },
        { key: 'accNo', value: form.accNo },
        { key: 'accName', value: form.accName },
        { key: 'recAcc', value: form.recAcc },
        { key: 'recAccName', value: form.recAccName },
        { key: 'accTp', value: form.accTp },
        { key: 'transAmount', value: form.transAmount },
        { key: 'withType', value: form.withType }
      ]
      let siDate = JSON.stringify(newDate);
      let certNo = loginStorge.serialNo
      let ukeyNo = loginStorge.uKeySn
      let siAmt = form.transAmount
      let siAccountNo = form.accNo
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
      body.transFlowNoList = [{ "transFlowNo": form.flowNo }]
      body.bsnCode = form.bsnCode
      body.cstNo = _this.loginStorage.cstNo
      body.hostNo = _this.loginStorage.hostNo
      body.eCIFID = _this.loginStorage.eCIFID
      body.authFlag = authFlag
      body.rejReason = _this.form.rejReason
      body.signedData = _this.signData
      body.timeStamps = _this.timeStamps
      //签名验签字段 start
      body.flowNo = form.flowNo
      body.accNo = form.accNo
      body.accName = form.accName
      body.recAcc = form.recAcc
      body.recAccName = form.recAccName
      body.accTp = form.accTp
      body.transAmount = form.transAmount
      body.withType = form.withType
      //签名验签字段 end
      _this.$tools.request(_this, "CB030205.do", body).then(
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
    _this.getTimeStamps('CB030205')
    let body = {}
    body.accNo = _this.list.callDetailList[0].accNo
    body.depNo = _this.list.callDetailList[0].depNo
    body.chooseFlag = '0'  //查询余额标识
    _this.$tools.request(_this, "CB000001.do", body).then(
      data => {
        _this.accBalance = data.body.totalAvlBal
      })
  },
}
</script>