<template>
  <div class="importCreditOpenPrint mt20 printArea">
      <div class="importCreditOpenPrintHead fix">
        <h3 style="text-align:center">SCHEDULE 1 - APPLICATION FOR DOCUMENTARY CREDIT AMENDMENT</h3>
        <div class="fl mt20" style="width:70%">
          <p class="fs18 pl30 mt10">CHONG HING BANK LIMITED, <span class="underline"> ________ </span> Branch</p>
        </div>
        <div class="fr mt10 importCreditOpenPrintContent" style="width:54%">
          <p>Date of amendment: <span class="underline">{{this.$tools.utils.formatDate(new Date(),{"today":true})}}</span></p>
        </div>
      </div>
      <div class="importCreditOpenPrintContent mt5 lh25">
        <table>
          <!--<tr>
            <td style="border:none">
            </td>
            <td colspan="2" height="80">
              <p>Amendment to our documentary credit (the “DC”) number:</p>
              <p>{{formData.LCNO}}</p>
            </td>
          </tr>-->
          <tr>
            <td width="46%" height="100">
              <p>Applicant:</p>
              <p>{{formData.appName}}</p>
              <p>{{formData.appAddr}}</p>
            </td>
            <td colspan="2">
              <p>Advising Bank:</p>
              <p>{{formData.advisingBank}}</p>
            </td>
          </tr>
          <tr>
            <td height="100">
              <p>Beneficiary: </p>
              <p>{{formData.beneficiary}}</p>
              <p>{{formData.beneficiaryAddr}}</p>
            </td>
            <td colspan="2">
              <p>Original DC Amount:</p>
              <p>{{formData.AMTFigures}}</p>
            </td>
          </tr>
          <tr>
            <td colspan="3">
              <p>Please amend the DC as follows:</p>
              <p>
                <span class="underline">{{formData.amendMsg}}</span>
              </p>
            </td>
          </tr>
          <tr>
            <td>
              <p>Increase amount by:</p>
              <p>
                <span class="underline">{{formData.amendIncreaseAmount}}</span>
              </p>
            </td>
            <td>
              <p>Decrease amount by:</p>
              <p>
                <span class="underline">{{formData.amendDecreaseAmount}}</span>
              </p>
            </td>
            <td>
              <p>DC amount after amendment:</p>
              <p>
                <span class="underline">{{formData.amendAfterAmount}}</span>
              </p>
            </td>
          </tr>
          <tr>
            <td>
              <p>New shipment date:</p>
              <p>
                <span class="underline">{{this.$tools.utils.formatDate(formData.shipDate,{"symbol":"YYYY-MM-DD"})}}</span>
              </p>
            </td>
            <td>
              <p>New expiry date:</p>
              <p>
                <span class="underline">{{this.$tools.utils.formatDate(formData.expDt,{"symbol":"YYYY-MM-DD"})}}</span>
              </p>
            </td>
            <td></td>
          </tr>
          <tr>
            <td colspan="3">
              <p>Others:</p>
              <p>
                <span class="underline">{{formData.otherMsg}}</span>
              </p>
            </td>
          </tr>
        </table>
      </div>
      <!--打印显示区-->
      <div class="importCreditOpenPrintContent lh25" style="margin-top:-1px;" v-if="isPrint">
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
  </div>
</template>

<script>
export default {
  name:'importCreditOpenStep2',
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
.importCreditOpenPrint{letter-spacing:-1px;}
// .importCreditOpenPrintHead h3{border-bottom: 2px solid #000}
// .importCreditOpenPrintHead .DCNumbe{border: 2px solid #000; height: 80px;}
// .importCreditOpenPrintHead .bankUse{height:40PX; line-height:60px; background:#000; text-align: center; color: #fff;}
.importCreditOpenPrintContent table{width:100%;}
.importCreditOpenPrintContent td{ border:1px solid #000; padding:5px; vertical-align:top}
.checkBox{border:1px solid #000; display:inline-block; width:14px; height:14px; vertical-align:middle; margin-right:2px;font-size: 12px;line-height: 16px;}
.positionLeft{padding-left:20px; position:relative;}
.positionLeft > .checkBox{position: absolute; left: 0px; top:4px;}
.importCreditOpenPrint .pNone{padding:0px;}
.importCreditOpenPrint .pNone .bankUse{height:40PX;  background:#000;color: #fff;}
.importCreditOpenPrint .borderLeft{border-left: 3px solid #000}
.importCreditOpenPrint .borderRight{border-right: 3px solid #000}
.importCreditOpenPrint .borderBottom{border-bottom: 3px solid #000}
.TermsAndConditions li{ position:relative; padding-left:20px; margin-top:20px;}
.TermsAndConditions li span{position: absolute; left:0px;top:1px;}
</style>