<template>
  <div class="exportCollectionPrint mt20 printArea">
      <!--table布局-->
      <div class="exportCollectionTable">
        <img src="../../../images/common/chuangxing.png" alt="">
        <h2 class="tac">APPLICATION FOR DOCUMENTARY COLLECTION</h2>
        <div class="fix">
          <span class="fl">To：<span class="cRed" style="font-weight:bold;font-size:17px;">CHONG HING BANK LIMITED, ________________Branch</span></span>
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
              <p>{{formData.swiftCode}}</p>
              <p>{{formData.cbBank}}</p>
              <p>{{formData.cbAddr}}</p>
            </td>
          </tr>
          <tr>
            <td height="100">
              <p>Drawer(Full name & address)</p>
              <p>{{formData.drawerName}}</p>
              <p>{{formData.drawerAddr}}</p>
            </td>
            <td colspan="2">
              <p>Tenor</p>
              <p>{{formData.tenor}}</p>
            </td>
          </tr>
          <tr>
            <td height="100">
              <p>Drawee(Full name & address)</p>
              <p>{{formData.draweeName}}</p>
              <p>{{formData.draweeAddr}}</p>
            </td>
            <td>
              <p>Draft/Inv no.</p>
              <p>{{formData.draftNo}}</p>
              <p>{{formData.invNo}}</p>
            </td>
            <td>
              <p>Currency and Amount</p>
              <p>{{$tools.dict.CRYTrans(formData.CRY)}}</p>
              <p>{{formData.amt}}</p>
            </td>
          </tr>
          <tr>
            <td height="200" colspan="3">
              <p>Brief Goods Description</p>
              <p>{{formData.goodsDesc}}</p>
            </td>
          </tr>
        </table>
        <h2 class="mt20">DOCUMENTS</h2>
        <table class="textCenter mt20 tac page"  style="word-break: break-all;">
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
            <th v-if="formData.otherInput1!=''">
              <p>{{formData.otherInput1}}</p>
            </th>
            <th v-if="formData.otherInput2!=''">
              <p>{{formData.otherInput2}}</p>
            </th>
          </tr>
          <tr>
            <td height="30">{{formData.orglDraft}}</td>
            <td>{{formData.orglInvNo}}</td>
            <td>{{formData.orglPacking}}</td>
            <td>{{formData.orglWeight}}</td>
            <td>{{formData.orglBl}}</td>
            <td>{{formData.orglAwb}}</td>
            <td>{{formData.orglOrigin}}</td>
            <td>{{formData.orglIns}}</td>
            <td>{{formData.orglCert}}</td>
            <td  v-if="formData.otherInput1!=''">{{formData.orglOther1}}</td>
            <td  v-if="formData.otherInput2!=''">{{formData.orglOther2}}</td>
          </tr>
        </table>
        <!--新增条款-->
        <img src="../../../images/common/chuangxing.png" alt="" >
        <table style="word-break: break-all;">
          <tr>
            <td>
              <p>Special Instructions (See box marked '√'): </p>
              <p class="positionLeft">
                <span class="checkBox" :class="{'el-icon-check':formData.Inst1=='1'}"></span>
                <em>Please deliver documents against 
                  <span class="checkBox ml5" :class="{'el-icon-check':formData.transType=='a'}"></span> payment at sight 
                  <span class="checkBox ml5" :class="{'el-icon-check':formData.transType=='b'}"></span> payment <span v-if="formData.transType=='b'"> {{formData.payDay2}} </span><span v-if="formData.transType!='b'"> ________ </span><span>after sight</span>
                  <span class="checkBox ml5" :class="{'el-icon-check':formData.transType=='c'}"></span> acceptance at <span v-if="formData.transType=='c'"> {{formData.payDay3}} </span><span v-if="formData.transType!='c'"> ________ </span>
                </em>
              </p>
              <p class="positionLeft">
                <span class="checkBox" :class="{'el-icon-check':formData.Inst2=='1'}"></span>
                <em>All your charges are to be borne by <span class="checkBox ml5" :class="{'el-icon-check':formData.payType=='a'}"></span> the drawee <span class="checkBox ml5" :class="{'el-icon-check':formData.payType=='b'}"></span> us.</em>
              </p>
              <p class="positionLeft">
                <span class="checkBox" :class="{'el-icon-check':formData.Inst3=='1'}"></span>
                <em>Acceptance/payment may wait until arrival of carrying vessel.</em>
              </p>
              <p class="positionLeft">
                <span class="checkBox" :class="{'el-icon-check':formData.Inst4=='1'}"></span>
                <em>In case of a time bill, please advise us of acceptance giving maturity date.</em>
              </p>
              <p class="positionLeft">
                <span class="checkBox" :class="{'el-icon-check':formData.Inst5=='1'}"></span>
                <em>In case of dishonour, do not protest but advise us the reasons of non-payment/non-acceptance.</em>
              </p>
              <p class="positionLeft">
                <span class="checkBox" :class="{'el-icon-check':formData.Inst6=='1'}"></span>
                <em>Please instruct the Collecting Bank to release the documents only upon receipt of all their banking charges.</em>
              </p>
              <p class="positionLeft">
                <span class="checkBox" :class="{'el-icon-check':formData.Inst7=='1'}"></span>
                <em>Full responsibility is on our part in respect of your appointment of the Collecting Bank chosen by us.</em>
              </p>
              <p class="positionLeft">
                <span class="checkBox" :class="{'el-icon-check':formData.otherInst=='1'}"></span>
                <em>Other instructions: 
                  <span v-if="formData.otherInstInput!=''"> {{formData.otherInstInput}} </span><span v-if="formData.otherInstInput==''"> ________ </span>
                </em>
              </p>
            </td>
          </tr>
        </table>
        <table>
          <tr class="bgWhite">
            <td  class="tableEvenText">
              <p class="mb10"><span>Disposal of proceeds upon collection</span></p>
              <p class="mb10"><span>Credit to our current account No.</span>&nbsp;&nbsp;<span>{{formData.payAccNo}}</span></p>
            </td>
          </tr>
        </table>
        <!--table class="textCenter tac">
          <tr class="bgWhite">
            <td style="border:0px;">联系人：<span>{{formData.linkMan}}</span></td>
            <td style="border:0px;">电话：<span>{{formData.linkPhone}}</span></td>
            <td style="border:0px;">传真：<span>{{formData.linkFax}}</span></td>
          </tr>
        </table-->
        <!--打印显示区-->
        <div class="exportCollectionPrintContent lh25 pageBreakAfter" style="margin-top:60px;" v-if="isPrint">
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
              <td width="24%">Fax  {{formData.linkFax}}</td>
              <td rowspan="2">s.v.</td>
            </tr>
            <tr>
              <td class="borderLeft borderBottom"></td>
              <td class="borderBottom"></td>
              <td class="borderBottom"></td>
              <td class="borderBottom"></td>
              <td class="borderRight borderBottom"></td>
              <td>Contact person  {{formData.linkMan}}</td>
              <td>Tel.  {{formData.linkPhone}}</td>
            </tr>
          </table>
        </div>
        <!--打印显示区--end-->
      </div>
      <!--table布局--> 
</div>
</template>

<script>
export default {
  name:'exportCollectionPrint',
  components: {
  },
  data() {
    return {
      
    }
  },
  props:{
    formData:{type:Object,default:{}},
    isPrint:{type:Boolean,default:false},
  },
  methods: {

  },
  mounted(){
  }
}
</script>
<style  lang="scss">
.exportCollectionPrint{letter-spacing:-1px;font-family:Calibri;}
.exportCollectionPrint p{margin-bottom:10px;}
.checkBox{border:1px solid #000; display:inline-block; width:14px; height:14px; vertical-align:middle; margin-right:2px;font-size: 12px;line-height: 16px;}
.positionLeft{padding-left:20px; position:relative;}
.positionLeft > .checkBox{position: absolute; left: 0px; top:4px;}
.underline{text-decoration:underline;}
.exportCollectionPrintContent table{width:100%;border-collapse:collapse;border:1px solid #000;}
.exportCollectionPrintContent td{ border:1px solid #000; padding:2px 5px; vertical-align:top}
.exportCollectionPrint .pNone{padding:0px;}
.exportCollectionPrint .pNone .bankUse{height:40PX;  background:#000;color: #fff;}
.exportCollectionPrint .borderLeft{border-left: 3px solid #000}
.exportCollectionPrint .borderRight{border-right: 3px solid #000}
.exportCollectionPrint .borderBottom{border-bottom: 3px solid #000}
.TermsAndConditions li{ position:relative; padding-left:20px; margin-top:20px;}
.TermsAndConditions li span{position: absolute; left:0px;top:1px;}
.exportCollectionPrint img{display:none;}

.exportCollectionPrint ul{
    text-align: justify;
  }

@media print{
.exportCollectionPrint img{
   display:block;
  
  }
  .page{
     page-break-after:always;
  }
}

</style>