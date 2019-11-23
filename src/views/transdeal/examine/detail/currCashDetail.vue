<template>
  <div class="formEmbedTable">
    <div class="tableData p20">
      <table>
        <tr>
          <td>付款账户：</td>
          <td>
            {{list.depositCashList[0].payAcc}}
          </td>
          <td>交易金额：</td>
          <td>
            {{$tools.utils.toDecimalString(list.depositCashList[0].amt,true,2)}}
          </td>
        </tr>
        <tr>
          <td>付款账户名称：</td>
          <td>
            {{list.depositCashList[0].payAccName}}
          </td>
          <td>状态：</td>
          <td>
            {{$tools.dict.statusTrans(list.depositCashList[0].stt)}}
          </td>
        </tr>
        <tr>
          <td>币种：</td>
          <td>
            {{$tools.dict.currTypeDict(list.depositCashList[0].currency)}}
          </td>
          <td>制单人：</td>
          <td>
            {{list.depositCashList[0].userName}}
          </td>
        </tr>
        <tr>
          <td>提交时间：</td>
          <td>
            {{list.depositCashList[0].submitTime}}
          </td>
          <td>保证金类型</td>
          <td>
            {{list.depositCashList[0].rcvAccTypeName}}
          </td>
        </tr>
        <tr>
          <td>保证金账号：</td>
          <td>
            {{list.depositCashList[0].rcvAcc}}
          </td>
          <td>备注：</td>
          <td>
            {{list.depositCashList[0].remark}}
          </td>
        </tr>
        <tr>
          <td>网银流水号：</td>
          <td>
            {{list.depositCashList[0].flowNo}}
          </td>
          <td>保证金账户名称：</td>
          <td>
            {{list.depositCashList[0].rcvAccName}}
          </td>
        </tr>
        <tr>
          <td>交易类型：</td>
          <td>
            {{$tools.dict.funTransType(list.depositCashList[0].bsnCode)}}
          </td>
          <td>用途：</td>
          <td>
            {{list.depositCashList[0].purpose}}
          </td>
        </tr>
        <tr v-if="list.depositCashList[0].depTerm">
          <td>存期：</td>
          <td>
            <span v-if="list.depositCashList[0].depTerm+list.depositCashList[0].depTermTp=='3M'">三个月</span>
            <span v-if="list.depositCashList[0].depTerm+list.depositCashList[0].depTermTp=='6M'">半年</span>
            <span v-if="list.depositCashList[0].depTerm+list.depositCashList[0].depTermTp=='1Y'">一年</span>
            <span v-if="list.depositCashList[0].depTerm+list.depositCashList[0].depTermTp=='2Y'">两年</span>
            <span v-if="list.depositCashList[0].depTerm+list.depositCashList[0].depTermTp=='3Y'">三年</span>
            <span v-if="list.depositCashList[0].depTerm+list.depositCashList[0].depTermTp=='5Y'">五年</span>
          </td>
          <td>利率：</td>
          <td>
            {{list.depositCashList[0].rate}}
          </td>
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
      <div class="btnArea mt20 tacc" v-if="!rejectdialogVisible">
        <el-button type="primary" @click="allSubmit(0)">同意</el-button>
        <el-button type="primary" @click="rejectdialogVisible=true">拒绝</el-button>
        <el-button @click="close()">关闭</el-button>
      </div>
      <div class="btnArea mt20 tacc" v-if="rejectdialogVisible">
        <el-button type="primary" @click="onSubmit">确认</el-button>
        <el-button @click="rejectdialogVisible=false">取消</el-button>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: 'currCashDetail',
  props: {
    list: {
      type: Object
    }
  },
  data() {
    return {
      rejectdialogVisible: false,
      timeStamps: '',
      form: {
        authflag: '0',
        rejReason: '',
      },
      rules: {
        rejReason: [
          { required: true, message: '请输入拒绝原因', trigger: 'blur' },
          { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    let _this = this
    _this.getTimeStamps('CB03030303')
  },
  methods: {
    close(body) {
      if (body === null || body === undefined || body === '') {
        this.$emit("close")
      } else {
        this.$emit("close", [body])
      }
    },
    onSubmit() {
      let _this = this
      _this.$refs['form'].validate((valid) => {
        if (valid) {
          _this.rejectdialogVisible = false
          _this.form.authFlag = '1'
          _this.allSubmit(_this.form.authFlag)

        }
      })
    },
    allSubmit(authFlag) {
      let _this = this

      let userStorge = _this.$tools.storage.get("user", "save")
      let cstNo = userStorge.cstNo
      let userNo = userStorge.eCIFID
      let newDate = [{ key: 'cstNo', value: cstNo },
      { key: 'userNo', value: userNo },
      { key: 'transFlowNo', value: _this.list.depositCashList[0].flowNo }]
      let siDate = JSON.stringify(newDate);
      let certNo = userStorge.serialNo
      let ukeyNo = userStorge.uKeySn
      let siAmt = _this.list.depositCashList[0].amt
      let siAccountNo = _this.list.depositCashList[0].payAcc
      let arrAcc = ["付款账号:", siAccountNo]
      let arrAmt = ["交易金额:", siAmt]
      let keyFlag = _this.$ukey
      let _signData = ''
      if (keyFlag == true || keyFlag == 'true') {
        let flag = getSignData(arrAcc, arrAmt, siDate, certNo, ukeyNo)
        if (flag == false || flag == 'false') {
          //this.$alert('UKey签名失败,请重新再试', '温馨提示')
          return
        }
        let signData = document.getElementById("signData").value.toString()
        _signData = signData
      }


      if (authFlag == '0') {
        _this.form.rejReason = ''
      }
      let body = {}
      body.timeStamps = _this.timeStamps
      body.transFlowNoList = [{ 'transFlowNo': _this.list.depositCashList[0].flowNo }]
      body.transFlowNo = _this.list.depositCashList[0].flowNo
      body.bsnCode = _this.list.depositCashList[0].bsnCode
      body.authFlag = authFlag
      body.rejReason = _this.form.rejReason
      body.signedData = _signData
      _this.$tools.request(_this, "CB03030303.do", body).then(
        data => {
          if (data.body.errorCode == '0') {
            _this.$emit("close", [4, data.body])
          } else {
            this.$alert(data.body.errorMsg, '温馨提示', {
              confirmButtonText: '确定',
              callback: action => {
                _this.getTimeStamps('CB03030303')
              }
            });
          }
        })

    },
    getTimeStamps(val) { //获取防重复提交timeStamps
      let _this = this
      _this.$tools.request(_this, "CB000028Action.do", { tradeCode: val }).then(data => {
        _this.timeStamps = data.body.timeStamps
      })
    },
  }
}
</script>