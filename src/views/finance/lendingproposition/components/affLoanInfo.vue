<template>
  <div class="importCreditOpen">
    <el-form ref="form" :model="formData" class="formEmbedTable">
      <table>
        <caption>企业基本资料</caption>
        <tr>
          <td>企业名称:</td>
          <td>
            <el-form-item>
              {{formData.lapCstName}}
            </el-form-item>
          </td>
          <td>法人代表姓名:</td>
          <td>
            <el-form-item>
              {{formData.lapLegalName}}
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>组织机构代码:</td>
          <td>
            <el-form-item>
              {{formData.lapOrgacode}}
            </el-form-item>
          </td>
          <td>法人代表证件类型:</td>
          <td>
            <el-form-item>
              {{this.$tools.dict.certTypeDict(formData.lapLegalCertType)}}
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>实际经营地址:</td>
          <td>
            <el-form-item>
              {{formData.lapBusAddress}}
            </el-form-item>
          </td>
          <td>法人代表证件号码:</td>
          <td>
            <el-form-item>
              {{formData.lapLegalCertNo}}
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>上年度营销收入:</td>
          <td>
            <el-form-item>
              {{formData.lapSaleYear}}万元
            </el-form-item>
          </td>
          <td>年底净利润:</td>
          <td>
            <el-form-item>
              {{formData.lapProfitYear}}
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>联系人姓名:</td>
          <td>
            <el-form-item>
              {{formData.lapLinkName}}
            </el-form-item>
          </td>
          <td>联系人手机号:</td>
          <td colspan="3">
            <el-form-item>
              {{formData.lapLinkPhone}}
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>授信申请所在行:</td>
          <td colspan="3">
            <el-form-item>
              {{formData.lapApplyBranchName}}
            </el-form-item>
          </td>
        </tr>
      </table>
    </el-form>
    <el-form ref="form" :model="formData" class="formEmbedTable mt20">
      <table>
        <caption>贷款基本资料</caption>
        <tr>
          <td>申请贷款期限:</td>
          <td>
            <el-form-item>
              {{formData.lapLoanDate}}
            </el-form-item>
          </td>
          <td>贷款用途:</td>
          <td>
            <el-form-item>
              {{formData.lapLoanUserd}}
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>申请贷款金额:</td>
          <td>
            <el-form-item>
              {{formData.lapAmount}}
            </el-form-item>
          </td>
          <td>可提供担保方式:</td>
          <td>
            <el-form-item>
              {{formData.lapAssureMeans}}
            </el-form-item>
          </td>
        </tr>
      </table>
    </el-form>
    <div class="btnArea mt20 tac">
      <el-button type="primary" @click="uKeySubmit()">提交</el-button>
      <el-button @click="preStep()">上一步</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'affLoanInfo',
  components: {
  },
  data() {
    return {
    }
  },
  props: {
    formData: { type: Object, default: {} },
  },
  methods: {
    uKeySubmit() {
      let _this = this
      let userStorge = _this.$tools.storage.get("user", "save")
      let cstNo = userStorge.cstNo
      let userNo = userStorge.eCIFID
      let newDate = [{ key: 'cstNo', value: cstNo },
      { key: 'userNo', value: userNo },
      { key: 'lapLinkName', value: _this.formData.lapLinkName },
      { key: 'lapLinkPhone', value: _this.formData.lapLinkPhone },
      { key: 'lapAmount', value: _this.formData.lapAmount },
      { key: 'lapLoanDate', value: _this.formData.lapLoanDate },
      { key: 'lapLoanUserd', value: _this.formData.lapLoanUserd }]
      let siDate = JSON.stringify(newDate);
      let certNo = userStorge.serialNo
      let ukeyNo = userStorge.uKeySn
      let siAmt = _this.formData.lapAmount
      let siAccountNo = _this.formData.lapLoanDate
      let arrAcc = ["贷款期限:", siAccountNo]
      let arrAmt = ["贷款金额:", siAmt]
      let keyFlag = _this.$ukey
      if (keyFlag == true || keyFlag == 'true') {
        let flag = getSignData(arrAcc, arrAmt, siDate, certNo, ukeyNo)
        if (flag == false || flag == 'false') {
          return
        }
        let signData = document.getElementById("signData").value.toString()
        _this.formData.signedData = signData
      }
      _this.submitForm()
    },
    preStep() {
      let _this = this
      _this.$emit("changeStep", "0", _this.formData)
    },
    submitForm() {
      let _this = this
      let tradeCode = { tradeCode: 'CB060101' };
      _this.$tools.request(this, "CB000028Action.do", tradeCode).then(data => {
        let _timeStamps = data.body.timeStamps
        let body = $.extend({}, _this.formData)
        body.timeStamps = _timeStamps
        _this.$tools.request(this, "CB060101.do", body).then(data => {
          if (data.body.errorCode == '0') {
            _this.$emit("changeStep", "2", data)
          } else {
            _this.$alert(data.body.errorMsg, '温馨提示', {
              confirmButtonText: '确定',
              callback: action => {
                _this.$emit("changeStep", "0", _this.formData)
              }
            });
          }
        })
      })
    },
  },
  mounted() {

  }
}
</script>
