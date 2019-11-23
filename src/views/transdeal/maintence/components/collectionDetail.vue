<template>
<el-form class="printArea">
  <div class="exportCollectionStep exportCollectionStep2">
      <!--table布局-->
      <div class="exportCollectionTable">
        <h3 class="tac">APPLICATION FOR DOCUMENTARY COLLECTION</h3>
        <div class="fix mt20">
          <span class="fl">To：<span class="cRed">CHONG HING BANK LIMITED, ________________Branch</span></span>
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
              <p>{{detailMsg.exportCollectionList[0].swiftCode}}</p>
              <p>{{detailMsg.exportCollectionList[0].cbBank}}</p>
              <p>{{detailMsg.exportCollectionList[0].cbAddr}}</p>
            </td>
          </tr>
          <tr>
            <td height="100">
              <p>Drawer(Full name & address)</p>
              <p>{{detailMsg.exportCollectionList[0].drawerName}}</p>
              <p>{{detailMsg.exportCollectionList[0].drawerAddr}}</p>
            </td>
            <td colspan="2">
              <p>Tenor</p>
              <p>{{detailMsg.exportCollectionList[0].tenor}}</p>
            </td>
          </tr>
          <tr>
            <td height="100">
              <p>Drawee(Full name & address)</p>
              <p>{{detailMsg.exportCollectionList[0].draweeName}}</p>
              <p>{{detailMsg.exportCollectionList[0].draweeAddr}}</p>
            </td>
            <td>
              <p>Draft/Inv no.</p>
              <p>{{detailMsg.exportCollectionList[0].draftNo}}</p>
              <p>{{detailMsg.exportCollectionList[0].invNo}}</p>
            </td>
            <td>
              <p>Currency and Amount</p>
              <p>{{$tools.dict.CRYTrans(detailMsg.exportCollectionList[0].CRY)}}</p>
              <p>{{detailMsg.exportCollectionList[0].amt}}</p>
            </td>
          </tr>
          <tr>
            <td height="200" colspan="3">
              <p>Brief Goods Description</p>
              <p>{{detailMsg.exportCollectionList[0].goodsDesc}}</p>
            </td>
          </tr>
        </table>
        <h3 class="mt20">DOCUMENTS</h3>
        <table class="textCenter mt20 tac"  style="word-break: break-all;">
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
            <th v-if="detailMsg.exportCollectionList[0].otherInput1!=''">
              <p>{{detailMsg.exportCollectionList[0].otherInput1}}</p>
            </th>
            <th v-if="detailMsg.exportCollectionList[0].otherInput2!=''">
              <p>{{detailMsg.exportCollectionList[0].otherInput2}}</p>
            </th>
          </tr>
          <tr>
            <td height="30">{{detailMsg.exportCollectionList[0].orglDraft}}</td>
            <td>{{detailMsg.exportCollectionList[0].orglInvNo}}</td>
            <td>{{detailMsg.exportCollectionList[0].orglPacking}}</td>
            <td>{{detailMsg.exportCollectionList[0].orglWeight}}</td>
            <td>{{detailMsg.exportCollectionList[0].orglBl}}</td>
            <td>{{detailMsg.exportCollectionList[0].orglAwb}}</td>
            <td>{{detailMsg.exportCollectionList[0].orglOrigin}}</td>
            <td>{{detailMsg.exportCollectionList[0].orglIns}}</td>
            <td>{{detailMsg.exportCollectionList[0].orglCert}}</td>
            <td  v-if="detailMsg.exportCollectionList[0].otherInput1!=''">{{detailMsg.exportCollectionList[0].orglOther1}}</td>
            <td  v-if="detailMsg.exportCollectionList[0].otherInput2!=''">{{detailMsg.exportCollectionList[0].orglOther2}}</td>
          </tr>
        </table>
        <!--新增条款-->
        <table style="word-break: break-all;">
          <tr>
            <td>
              <p>Special Instructions (See box marked 'X'): </p>
              <p class="positionLeft">
                <span class="checkBox" :class="{'el-icon-check':detailMsg.exportCollectionList[0].Inst1=='1'}"></span>
                <em>Please deliver documents against 
                  <span class="checkBox ml5" :class="{'el-icon-check':detailMsg.exportCollectionList[0].transType=='a'}"></span> payment at sight 
                  <span class="checkBox ml5" :class="{'el-icon-check':detailMsg.exportCollectionList[0].transType=='b'}"></span> payment <span class="underline" v-if="detailMsg.exportCollectionList[0].transType=='b'"> {{detailMsg.exportCollectionList[0].payDay2}} </span><span v-if="detailMsg.exportCollectionList[0].transType!='b'"> ________ </span><span>after sight</span>
                  <span class="checkBox ml5" :class="{'el-icon-check':detailMsg.exportCollectionList[0].transType=='c'}"></span> acceptance at <span class="underline" v-if="detailMsg.exportCollectionList[0].transType=='c'"> {{detailMsg.exportCollectionList[0].payDay3}} </span><span v-if="detailMsg.exportCollectionList[0].transType!='c'"> ________ </span>
                </em>
              </p>
              <p class="positionLeft">
                <span class="checkBox" :class="{'el-icon-check':detailMsg.exportCollectionList[0].Inst2=='1'}"></span>
                <em>All your charges are to be borne by <span class="checkBox ml5" :class="{'el-icon-check':detailMsg.exportCollectionList[0].payType=='a'}"></span> the drawee <span class="checkBox ml5" :class="{'el-icon-check':detailMsg.exportCollectionList[0].payType=='b'}"></span> us.</em>
              </p>
              <p class="positionLeft">
                <span class="checkBox" :class="{'el-icon-check':detailMsg.exportCollectionList[0].Inst3=='1'}"></span>
                <em>Acceptance/payment may wait until arrival of carrying vessel.</em>
              </p>
              <p class="positionLeft">
                <span class="checkBox" :class="{'el-icon-check':detailMsg.exportCollectionList[0].Inst4=='1'}"></span>
                <em>In case of a time bill, please advise us of acceptance giving maturity date.</em>
              </p>
              <p class="positionLeft">
                <span class="checkBox" :class="{'el-icon-check':detailMsg.exportCollectionList[0].Inst5=='1'}"></span>
                <em>In case of dishonour, do not protest but advise us the reasons of non-payment/non-acceptance.</em>
              </p>
              <p class="positionLeft">
                <span class="checkBox" :class="{'el-icon-check':detailMsg.exportCollectionList[0].Inst6=='1'}"></span>
                <em>Please instruct the Collecting Bank to release the documents only upon receipt of all their banking charges.</em>
              </p>
              <p class="positionLeft">
                <span class="checkBox" :class="{'el-icon-check':detailMsg.exportCollectionList[0].Inst7=='1'}"></span>
                <em>Full responsibility is on our part in respect of your appointment of the Collecting Bank chosen by us.</em>
              </p>
              <p class="positionLeft">
                <span class="checkBox" :class="{'el-icon-check':detailMsg.exportCollectionList[0].otherInst=='1'}"></span>
                <em>Other instructions: 
                  <span class="underline" v-if="detailMsg.exportCollectionList[0].otherInstInput!=''"> {{detailMsg.exportCollectionList[0].otherInstInput}} </span><span v-if="detailMsg.exportCollectionList[0].otherInstInput==''"> ________ </span>
                </em>
              </p>
            </td>
          </tr>
        </table>
        <table>
          <tr class="bgWhite">
            <td  class="tableEvenText">
              <p class="mb10"><span>Disposal of proceeds upon collection</span></p>
              <p class="mb10"><span>Credit to our current account No.</span>&nbsp;&nbsp;<span class="underline">{{detailMsg.exportCollectionList[0].payAccNo}}</span></p>
            </td>
          </tr>
        </table>
        <table class="textCenter tac">
          <tr class="bgWhite">
            <td style="border:0px;">联系人：<span class="underline">{{detailMsg.exportCollectionList[0].linkMan}}</span></td>
            <td style="border:0px;">电话：<span class="underline">{{detailMsg.exportCollectionList[0].linkPhone}}</span></td>
            <td style="border:0px;">传真：<span class="underline">{{detailMsg.exportCollectionList[0].linkFax}}</span></td>
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
        <div class="TermsAndConditions mt20" v-if="isPrint">
          <h3 class="tac">Terms and Conditions</h3>
          <ul>
            <li v-for="(value,index) in conditionsList"><span>{{Number(index+1)}}.</span>{{value}}</li>
          </ul>
        </div>
        <!--打印显示区--end-->
        <table class="textCenter tac" style="word-break: break-all;">
          <tr v-if="detailMsg.exportCollectionList[0].status=='90'">
            <td>业务编号：</td>
            <td>{{detailMsg.exportCollectionList[0].busCode}}</td>
            <td>托收日期：</td>
            <td>{{$tools.utils.formatDate(detailMsg.exportCollectionList[0].openDate,{"symbol":"YYYY-MM-DD"})}}</td>
          </tr>
          <tr>
            <td>操作员姓名：</td>
            <td>{{detailMsg.exportCollectionList[0].oprName}}</td>
            <td>状态：</td>
            <td colspan="3">{{$tools.dict.statusTrans(detailMsg.exportCollectionList[0].status)}}</td>
          </tr>
        </table>
      </div>
      <!--table布局--> 
  </div>
</el-form>
</template>

<script>
export default {
  name: 'collectionDetail',
  components:{
  },
  props: {
    detailMsg:{
      type: Object
    }
  },
  data(){
    return {
      bsnCode:'CB050501'
    }
  },
  mounted(){
  },
  methods:{
    change(val){
      let _this = this
      let form = val
      form.oldSqno = val.exportCollectionList[0].sequenceNo
      form.operateFlag = '1'
      console.log(form)
      _this.$router.push({ name:'exportCollectionMain',params:form})
    },
    deleteChange(val){
      //console.log(this.detailMsg)
      let _this = this
      let body = {}
      body.operateFlag = '2'  //交易撤销
      body.oldSqno = val.exportCollectionList[0].sequenceNo
      body.cstNo = _this.$tools.storage.get("user","save").cstNo
      body.eCIFID = _this.$tools.storage.get("user","save").eCIFID
      body.oprNo = _this.$tools.storage.get("user","save").eCIFID
      body.bsnCode = _this.bsnCode
      _this.$confirm('确定撤销该交易？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        _this.$tools.request(_this,"CB050501.do",body).then(
          data =>{
            if(data.body.errorCode=='0'){
              console.log("撤销成功")
              _this.close()
            }
          })
      }).catch(() => {
      });
    },
    close(body){
      if(body===null||body===undefined||body===''){
        this.$emit("close")
      }else{
        this.$emit("close",[body])
      }
    },
  }
}
</script>
<style  lang="scss">
.exportCollectionStep2 p{margin-bottom:10px;}
.checkBox{border:1px solid #000; display:inline-block; width:14px; height:14px; vertical-align:middle; margin-right:2px;font-size: 12px;line-height: 16px;}
.positionLeft{padding-left:20px; position:relative;}
.positionLeft > .checkBox{position: absolute; left: 0px; top:4px;}
.underline{text-decoration:underline;}
</style>