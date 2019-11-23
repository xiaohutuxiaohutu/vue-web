<template>
  <div class="exportCollectionStep exportCollectionStep2 printArea">
    <!--table布局-->
    <div class="exportCollectionTable">
      <h3 class="tac">APPLICATION FOR DOCUMENTARY COLLECTION</h3>
      <div class="fix mt20">
        <span class="fl">To：
          <span class="cRed">CHONG HING BANK LIMITED, ________________Branch</span>
        </span>
        <span class="fr">Date:{{$tools.utils.formatDate(new Date(),{"symbol":"YYYY-MM-DD"})}}</span>
      </div>
      <table class="mt20" style="word-break: break-all;">
        <tr>
          <td width="60%" height="120" style="border:0;">
            <p class="mt20">We present the enclosed draft(s)/documents for your disposal in accordance with the following instructions. </p>
            <p class="mt20">This collection is subject to URC522.</p>
          </td>
          <td colspan="2">
            <p>Collecting Bank (SWIFT & Full name & address)</p>
            <p>{{list.exportCollectionList[0].swiftCode}}</p>
            <p>{{list.exportCollectionList[0].cbBank}}</p>
            <p>{{list.exportCollectionList[0].cbAddr}}</p>
          </td>
        </tr>
        <tr>
          <td height="100">
            <p>Drawer(Full name & address)</p>
            <p>{{list.exportCollectionList[0].drawerName}}</p>
            <p>{{list.exportCollectionList[0].drawerAddr}}</p>
          </td>
          <td colspan="2">
            <p>Tenor</p>
            <p>{{list.exportCollectionList[0].tenor}}</p>
          </td>
        </tr>
        <tr>
          <td height="100">
            <p>Drawee(Full name & address)</p>
            <p>{{list.exportCollectionList[0].draweeName}}</p>
            <p>{{list.exportCollectionList[0].draweeAddr}}</p>
          </td>
          <td>
            <p>Draft/Inv no.</p>
            <p>{{list.exportCollectionList[0].draftNo}}</p>
            <p>{{list.exportCollectionList[0].invNo}}</p>
          </td>
          <td>
            <p>Currency and Amount</p>
            <p>{{$tools.dict.CRYTrans(list.exportCollectionList[0].CRY)}}</p>
            <p>{{list.exportCollectionList[0].amt}}</p>
          </td>
        </tr>
        <tr>
          <td height="200" colspan="3">
            <p>Brief Goods Description</p>
            <p>{{list.exportCollectionList[0].goodsDesc}}</p>
          </td>
        </tr>
      </table>
      <h3 class="mt20">DOCUMENTS</h3>
      <table class="textCenter mt20 tac" style="word-break: break-all;">
        <tr>
          <th>
            <p>DRAFT</p>
          </th>
          <th>
            <p>INV.</p>
          </th>
          <th>
            <p>PACKING LIST</p>
          </th>
          <th>
            <p>WEIGHT LIST</p>
          </th>
          <th>
            <p>B/L</p>
          </th>
          <th>
            <p>AWB</p>
          </th>
          <th>
            <p>ORIGIN CERT.</p>
          </th>
          <th>
            <p>INS. POL.</p>
          </th>
          <th height="30">
            <p>CERT.</p>
          </th>
          <th v-if="list.exportCollectionList[0].otherInput1!=''">
            <p>{{list.exportCollectionList[0].otherInput1}}</p>
          </th>
          <th v-if="list.exportCollectionList[0].otherInput2!=''">
            <p>{{list.exportCollectionList[0].otherInput2}}</p>
          </th>
        </tr>
        <tr>
          <td height="30">{{list.exportCollectionList[0].orglDraft}}</td>
          <td>{{list.exportCollectionList[0].orglInvNo}}</td>
          <td>{{list.exportCollectionList[0].orglPacking}}</td>
          <td>{{list.exportCollectionList[0].orglWeight}}</td>
          <td>{{list.exportCollectionList[0].orglBl}}</td>
          <td>{{list.exportCollectionList[0].orglAwb}}</td>
          <td>{{list.exportCollectionList[0].orglOrigin}}</td>
          <td>{{list.exportCollectionList[0].orglIns}}</td>
          <td>{{list.exportCollectionList[0].orglCert}}</td>
          <td v-if="list.exportCollectionList[0].otherInput1!=''">{{list.exportCollectionList[0].orglOther1}}</td>
          <td v-if="list.exportCollectionList[0].otherInput2!=''">{{list.exportCollectionList[0].orglOther2}}</td>
        </tr>
      </table>
      <!--新增条款-->
      <table style="word-break: break-all;">
        <tr>
          <td>
            <p>Special Instructions (See box marked '√'): </p>
            <p class="positionLeft">
              <span class="checkBox" :class="{'el-icon-check':list.exportCollectionList[0].Inst1=='1'}"></span>
              <em>Please deliver documents against
                <span class="checkBox ml5" :class="{'el-icon-check':list.exportCollectionList[0].transType=='a'}"></span> payment at sight
                <span class="checkBox ml5" :class="{'el-icon-check':list.exportCollectionList[0].transType=='b'}"></span> payment
                <span class="underline" v-if="list.exportCollectionList[0].transType=='b'"> {{list.exportCollectionList[0].payDay2}} </span>
                <span v-if="list.exportCollectionList[0].transType!='b'"> ________ </span>
                <span>after sight</span>
                <span class="checkBox ml5" :class="{'el-icon-check':list.exportCollectionList[0].transType=='c'}"></span> acceptance at
                <span class="underline" v-if="list.exportCollectionList[0].transType=='c'"> {{list.exportCollectionList[0].payDay3}} </span>
                <span v-if="list.exportCollectionList[0].transType!='c'"> ________ </span>
              </em>
            </p>
            <p class="positionLeft">
              <span class="checkBox" :class="{'el-icon-check':list.exportCollectionList[0].Inst2=='1'}"></span>
              <em>All your charges are to be borne by
                <span class="checkBox ml5" :class="{'el-icon-check':list.exportCollectionList[0].payType=='a'}"></span> the drawee
                <span class="checkBox ml5" :class="{'el-icon-check':list.exportCollectionList[0].payType=='b'}"></span> us.</em>
            </p>
            <p class="positionLeft">
              <span class="checkBox" :class="{'el-icon-check':list.exportCollectionList[0].Inst3=='1'}"></span>
              <em>Acceptance/payment may wait until arrival of carrying vessel.</em>
            </p>
            <p class="positionLeft">
              <span class="checkBox" :class="{'el-icon-check':list.exportCollectionList[0].Inst4=='1'}"></span>
              <em>In case of a time bill, please advise us of acceptance giving maturity date.</em>
            </p>
            <p class="positionLeft">
              <span class="checkBox" :class="{'el-icon-check':list.exportCollectionList[0].Inst5=='1'}"></span>
              <em>In case of dishonour, do not protest but advise us the reasons of non-payment/non-acceptance.</em>
            </p>
            <p class="positionLeft">
              <span class="checkBox" :class="{'el-icon-check':list.exportCollectionList[0].Inst6=='1'}"></span>
              <em>Please instruct the Collecting Bank to release the documents only upon receipt of all their banking charges.</em>
            </p>
            <p class="positionLeft">
              <span class="checkBox" :class="{'el-icon-check':list.exportCollectionList[0].Inst7=='1'}"></span>
              <em>Full responsibility is on our part in respect of your appointment of the Collecting Bank chosen by us.</em>
            </p>
            <p class="positionLeft">
              <span class="checkBox" :class="{'el-icon-check':list.exportCollectionList[0].otherInst=='1'}"></span>
              <em>Other instructions:
                <span v-if="list.exportCollectionList[0].otherInstInput!=''"> {{list.exportCollectionList[0].otherInstInput}} </span>
                <span v-if="list.exportCollectionList[0].otherInstInput==''"> ________ </span>
              </em>
            </p>
          </td>
        </tr>
      </table>
      <table>
        <tr class="bgWhite">
          <td class="tableEvenText">
            <p class="mb10">
              <span>Disposal of proceeds upon collection</span>
            </p>
            <p class="mb10">
              <span>Credit to our current account No.</span>&nbsp;&nbsp;
              <span>{{list.exportCollectionList[0].payAccNo}}</span>
            </p>
          </td>
        </tr>
      </table>
      <table class="textCenter tac">
        <tr class="bgWhite">
          <td style="border:0px;">联系人：
            <span>{{list.exportCollectionList[0].linkMan}}</span>
          </td>
          <td style="border:0px;">电话：
            <span>{{list.exportCollectionList[0].linkPhone}}</span>
          </td>
          <td style="border:0px;">传真：
            <span>{{list.exportCollectionList[0].linkFax}}</span>
          </td>
        </tr>
      </table>
      <!--打印显示区-->
      <div class="importCreditOpenPrintContent lh25 pageBreakAfter" style="margin-top:-1px;" v-if="isPrint">
        <table>
          <tr>
            <td colspan="5" width="46%" class="pNone borderLeft borderRight">
              <p class="bankUse">For Bank Use：</p>
            </td>
            <td colspan="3">
              <p>Applicant’s Company chop：</p>
              <p>Legal representative or</p>
              <p>Authorized signatory(ies)：</p>
            </td>
          </tr>
          <tr>
            <td class="borderLeft">Process on</td>
            <td width="6%">Prepare</td>
            <td width="6%">Check</td>
            <td width="6%">Approve</td>
            <td width="6%" class="borderRight"></td>
            <td width="24%"></td>
            <td width="24%">Fax</td>
            <td rowspan="2">s.v.</td>
          </tr>
          <tr>
            <td class="borderLeft borderBottom"></td>
            <td class="borderBottom"></td>
            <td class="borderBottom"></td>
            <td class="borderBottom"></td>
            <td class="borderRight borderBottom"></td>
            <td>Contact person</td>
            <td>Tel.</td>
          </tr>
        </table>
      </div>

      <!--打印显示区--end-->
      <el-form class="formEmbedTable">
        <div class="tableData p20">
          <table>
            <tr v-if="list.exportCollectionList[0].status=='90'">
              <td>业务编号：</td>
              <td>{{list.exportCollectionList[0].busCode}}</td>
              <td>托收日期：</td>
              <td>{{$tools.utils.formatDate(list.exportCollectionList[0].openDate,{"symbol":"YYYY-MM-DD"})}}</td>
            </tr>
            <tr>
              <td>操作员姓名：</td>
              <td>{{list.exportCollectionList[0].oprName}}</td>
              <td>状态：</td>
              <td colspan="3">{{$tools.dict.statusTrans(list.exportCollectionList[0].status)}}</td>
            </tr>
          </table>
        </div>
      </el-form>
    </div>
    <!--table布局-->
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
  name: 'collectionDetail',
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
        { key: 'draweeName', value: _this.list.exportCollectionList[0].draweeName },//付
        { key: 'drawerName', value: _this.list.exportCollectionList[0].drawerName },//收
        { key: 'payAccNo', value: _this.list.exportCollectionList[0].payAccNo },
        { key: 'amt', value: _this.list.exportCollectionList[0].amt },
        { key: 'CRY', value: _this.list.exportCollectionList[0].CRY }
      ]
      let siDate = JSON.stringify(newDate);
      let certNo = loginStorge.serialNo
      let ukeyNo = loginStorge.uKeySn
      let siAmt = _this.list.exportCollectionList[0].amt
      let siAccountNo = _this.list.exportCollectionList[0].payAccNo
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
        _this.signedData = signData
      }
      //ukey end
      _this.$tools.request(this, "CB000028Action.do", { tradeCode: 'CB050502' }).then(data => {
        if (authFlag == '0') {
          _this.form.rejReason = ''
        }
        let body = {}
        body.transFlowNoList = [{ "transFlowNo": _this.list.exportCollectionList[0].sequenceNo }]
        body.bsnCode = _this.list.exportCollectionList[0].bsnCode
        body.cstNo = this.$tools.storage.get("user", "save").cstNo,
          body.eCIFID = this.$tools.storage.get("user", "save").eCIFID,
          body.authFlag = authFlag
        body.rejReason = _this.form.rejReason
        body.signedData = _this.signedData
        body.timeStamps = data.body.timeStamps

        //签名验签字段 start
        body.draweeName = _this.list.exportCollectionList[0].draweeName
        body.drawerName = _this.list.exportCollectionList[0].drawerName
        body.payAccNo = _this.list.exportCollectionList[0].payAccNo
        body.amt = _this.list.exportCollectionList[0].amt
        body.CRY = _this.list.exportCollectionList[0].CRY
        //签名验签字段 end

        _this.$tools.request(_this, "CB050502.do", body).then(
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