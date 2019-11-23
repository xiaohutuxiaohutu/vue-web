<template>
  <div>
    <el-form class="formEmbedTable" ref="form" :model="form" :rules="rules">
      <table>
        <tr>
          <td>网银流水号：</td>
          <td>{{list.guaranteeList[0].sequenceNo}}</td>
          <td>申请时间：</td>
          <td>{{$tools.utils.formatDate(list.guaranteeList[0].createDate,{"symbol":"YYYY-MM-DD"})}}</td>
        </tr>
        <tr>
          <td>保函种类：</td>
          <td>{{$tools.dict.gntTypeTrans(list.guaranteeList[0].gntType)}}</td>
          <td>开立方式：</td>
          <td>{{$tools.dict.ESTBDTrans(list.guaranteeList[0].ESTBD)}}</td>
        </tr>
        <tr>
          <td>保函币种：</td>
          <td>{{$tools.dict.CRYTrans(list.guaranteeList[0].CRY)}}</td>
          <td>保函金额：</td>
          <td>{{$tools.utils.currencyFormat(list.guaranteeList[0].gntAmt)}}</td>
        </tr>
        <tr>
          <td>保函生效日：</td>
          <td>{{$tools.utils.formatDate(list.guaranteeList[0].valueDate,{"symbol":"YYYY-MM-DD"})}}</td>
          <td>保函到期日：</td>
          <td>{{$tools.utils.formatDate(list.guaranteeList[0].dueDate,{"symbol":"YYYY-MM-DD"})}}</td>
        </tr>
        <tr>
          <td>申请人客户号：</td>
          <td>{{list.guaranteeList[0].cstNo}}</td>
          <td>申请人客户名称：</td>
          <td>{{list.guaranteeList[0].cstName}}</td>
        </tr>
        <tr>
          <td>申请人地址：</td>
          <td colspan="3">{{list.guaranteeList[0].appAddr}}</td>
        </tr>
        <tr>
          <td>被担保人姓名：</td>
          <td>{{list.guaranteeList[0].wrntName}}</td>
          <td>被担保人地址：</td>
          <td>{{list.guaranteeList[0].wrntAddr}}</td>
        </tr>
        <tr>
          <td>受益人姓名：</td>
          <td>{{list.guaranteeList[0].befName}}</td>
          <td>受益人地址：</td>
          <td>{{list.guaranteeList[0].befAddr}}</td>
        </tr>
        <tr>
          <td>合同编号：</td>
          <td>{{list.guaranteeList[0].contraNo}}</td>
          <td>合同币种：</td>
          <td>{{$tools.dict.CRYTrans(list.guaranteeList[0].contraCRY)}}</td>
        </tr>
        <tr>
          <td>合同金额：</td>
          <td>{{$tools.utils.currencyFormat(list.guaranteeList[0].contraAmt)}}</td>
          <td>保函模板：</td>
          <td>{{$tools.dict.gntTemplateTrans(list.guaranteeList[0].gntTemplate)}}</td>
        </tr>
        <tr v-if="list.guaranteeList[0].gntTemplate=='1'">
          <td>申请人模板文件：</td>
          <td colspan="3">{{list.guaranteeList[0].newFileName}}</td>
        </tr>
        <tr>
          <td>备注：</td>
          <td>{{list.guaranteeList[0].comments}}</td>
          <td>扣费账号：</td>
          <td>{{list.guaranteeList[0].wthdAccNo}}</td>
        </tr>
        <tr>
          <td>操作员姓名：</td>
          <td>{{list.guaranteeList[0].oprName}}</td>
          <td>状态：</td>
          <td>{{$tools.dict.statusTrans(list.guaranteeList[0].status)}}</td>
        </tr>
      </table>
    </el-form>
    <div class="tableData p20">
      <table class="formEmbedTable" v-if="rejectdialogVisible">
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
        <el-button type="primary" @click="onSubmit('form')">确认</el-button>
        <el-button @click="rejectdialogVisible=false">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'guaranteeDetail',
  components: {

  },
  props: {
    list: {
      type: Object
    }
  },
  data() {
    return {
      rejectdialogVisible: false,
      form: {
        rejReason: '',
      },
      authFlag: '',
      rules: {
        rejReason: [
          { required: true, message: '请输入拒绝原因', trigger: 'blur' },
          { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
        ]
      },
      signedData: '',  //签名要素
    }
  },
  mounted() {
  },
  methods: {
    onSubmit(formName) {
      let _this = this
      _this.$refs[formName].validate((valid) => {
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
      let loginStorge = _this.$tools.storage.get("user", "save")
      let currentTime = _this.$tools.utils.formatDate(new Date(), { "removeFormat": true })
      let cstNo = loginStorge.cstNo
      let eCIFID = loginStorge.eCIFID
      let newDate = [
        { key: 'cstNo', value: cstNo },
        { key: 'eCIFID', value: eCIFID },
        { key: 'befName', value: _this.list.guaranteeList[0].befName },
        { key: 'wthdAccNo', value: _this.list.guaranteeList[0].wthdAccNo },
        { key: 'contraAmt', value: _this.list.guaranteeList[0].contraAmt },
        { key: 'contraCRY', value: _this.list.guaranteeList[0].contraCRY },
        { key: 'gntAmt', value: _this.list.guaranteeList[0].gntAmt },
        { key: 'CRY', value: _this.list.guaranteeList[0].CRY }
      ]
      let siDate = JSON.stringify(newDate)
      let certNo = loginStorge.serialNo
      let ukeyNo = loginStorge.uKeySn
      let siAmt = _this.list.guaranteeList[0].gntAmt
      let siAccountNo = _this.list.guaranteeList[0].wthdAccNo
      let arrAcc = ["扣费账号:", siAccountNo]
      let arrAmt = ["保函金额:", siAmt]
      let keyFlag = _this.$ukey
      if (keyFlag == true || keyFlag == 'true') {
        let flag = getSignData(arrAcc, arrAmt, siDate, certNo, ukeyNo)
        if (flag == false || flag == 'false') {
          //this.$alert('UKey签名失败,请重新再试', '温馨提示')
          return
        }
        let signData = document.getElementById("signData").value.toString()
        _this.signedData = signData
      }
      //ukey end
      _this.$tools.request(this, "CB000028Action.do", { tradeCode: 'CB050402' }).then(data => {
        if (authFlag == '0') {
          _this.form.rejReason = ''
        }
        let body = {}
        body.transFlowNoList = [{ "transFlowNo": _this.list.guaranteeList[0].sequenceNo }]
        body.bsnCode = _this.list.guaranteeList[0].bsnCode
        body.cstNo = this.$tools.storage.get("user", "save").cstNo,
          body.eCIFID = this.$tools.storage.get("user", "save").eCIFID,
          body.authFlag = authFlag
        body.rejReason = _this.form.rejReason
        body.signedData = _this.signedData
        body.timeStamps = data.body.timeStamps

        //签名验签字段 start
        body.befName = _this.list.guaranteeList[0].befName
        body.wthdAccNo = _this.list.guaranteeList[0].wthdAccNo
        body.contraAmt = _this.list.guaranteeList[0].contraAmt
        body.contraCRY = _this.list.guaranteeList[0].contraCRY
        body.gntAmt = _this.list.guaranteeList[0].gntAmt
        body.CRY = _this.list.guaranteeList[0].CRY
        //签名验签字段 end

        _this.$tools.request(_this, "CB050402.do", body).then(
          data => {
            let body = data.body
            _this.close(body)
            let errorCode = body.errorCode
            let errorMsg = body.errorMsg
            if (errorCode == '0') {
              _this.$emit("close", [4, data.body])
            } else {
              this.$alert(errorMsg, '提示', {
                confirmButtonText: '确定'
              });
            }
          })
      })
    },
    close() {
      this.$emit("close")
    },
  }
}
</script>