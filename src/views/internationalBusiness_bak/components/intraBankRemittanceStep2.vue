<template>
<div class="intraBankRemittanceStep2">
  <div class="Frame_sqs" id="Frame_sqs">
      <div class="Frame_font">第一联 <span style="padding-top:30px; display:inline-block">银行留存联</span></div>
      <div class="logo"><img src="../../../images/common/logo_jn.jpg" /></div>
      <!--第一块-->
      <div class="table_1 MT15">
          <div class="to FL">
                <ul>
                    <li><b>致：</b></li>
                    <li><b>TO：</b></li>
                </ul>
          </div>
          <div class="date FR">
                <ul>
                    <li><b>日期</b></li>
                    <li><b>Date</b> <span class="bottom_line">&nbsp;</span></li>
                </ul>
          </div>
          <div class="table_1_foot">
                <div class="P5 border-right FL">
                  <input type="checkbox" class="checkbox" /> 电汇 T/T
                  <input type="checkbox" class="checkbox ML10" /> 票汇 D/D
                  <input type="checkbox" class="checkbox ML10" /> 信汇 M/T
                </div>
        <div class="P5 FL">
                  <span>发电等级/Priority</span>
          <input type="checkbox" class="checkbox ML10" /> 普通 Normal
                  <input type="checkbox" class="checkbox ML10" /> 加急 Urgent
                </div>
                <div class="ClearBoth"></div>
          </div>
      </div>
      <!--第一块--END------->
      <!--第二块-->
      <div class="table_2">
          <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                      <td width="30%">申报号码 Report No.</td>
                      <td colspan="3">
                          <input type="text" class="input_no" />
                          <input type="text" class="input_no" />
                          <input type="text" class="input_no" />
                          <input type="text" class="input_no" />
                          <input type="text" class="input_no" />
                          <input type="text" class="input_no" />
                        
                          <input type="text" class="input_no ML20" />
                          <input type="text" class="input_no" />
                          <input type="text" class="input_no" />
                          <input type="text" class="input_no" />
                          
                          <input type="text" class="input_no ML20" />
                          <input type="text" class="input_no" />
                        
                          <input type="text" class="input_no ML20" />
                          <input type="text" class="input_no" />
                          <input type="text" class="input_no" />
                          <input type="text" class="input_no" />
                          <input type="text" class="input_no" />
                          <input type="text" class="input_no" />
                          
                          <input type="text" class="input_no ML20" />
                          <input type="text" class="input_no" />
                          <input type="text" class="input_no" />
                          <input type="text" class="input_no" />
                      </td>
                  </tr>
                  <tr>
                      <td class="T_cnter">
                          <div class="No">20</div>
                          银行业务编号<br />Bank Transac Ref.No.
                    </td>
                      <td width="23%">&nbsp;</td>
                      <td class="T_cnter">收电行/付款行<br />Receiver/Drawn On</td>
                      <td width="23%">&nbsp;</td>
                  </tr>
          </table>
      </div>
      <!---------第二块--END------->
      <!--第三块-->
      <div class="table_2">
          <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                      <td  width="30%" colspan="2" class="T_cnter">
                          <div class="No">32A</div>
                          汇款币种及金额<br />Currency & Interbank Settlement Amount
                      </td>
                      <td width="23%">&nbsp;</td>
                      <td class="T_cnter">金额大写<br />Amount In Words</td>
                      <td width="23%">&nbsp;</td>
                  </tr>
                  <tr>
                      <td rowspan="3" class="T_cnter">其<br /><br />中</td>
                      <td>现汇金额 Amount In FX</td>
                      <td>&nbsp;</td>
                      <td class="T_cnter">账号 Account No./Credit Card No.</td>
                      <td>&nbsp;</td>
                  </tr>
                  <tr>
                      <td>购汇金额 Amount of Purchase</td>
                      <td>&nbsp;</td>
                      <td class="T_cnter">账号 Account No./Credit Card No.</td>
                      <td>&nbsp;</td>
                  </tr>
                  <tr>
                      <td>其它金额 Amount of Others</td>
                      <td>&nbsp;</td>
                      <td class="T_cnter">账号 Account No./Credit Card No.</td>
                      <td>&nbsp;</td>
                  </tr>
          </table>
      </div>
      <!---------第三块--END-------> 
      <!--第四块-->
      <div class="table_2">
          <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                      <td  width="30%" class="T_cnter">
                          <div class="No">50a</div>
                          汇款人名称及地址<br />Remitter's Name & Address
                      </td>
                      <td>&nbsp;</td>
                  </tr>
                  <tr>
                      <td colspan="2" class="td_table">
                        <table width="100%">
                            <tr>
                                <td rowspan="2" class="border_right" width="52%" >
                                    <input type="checkbox" class="checkbox" /> 对公 组织机构代码 Unit Code
                                    <input type="text" class="input_no" />
                                    <input type="text" class="input_no" />
                                    <input type="text" class="input_no" />
                                    <input type="text" class="input_no" />
                                    <input type="text" class="input_no" />
                                    <input type="text" class="input_no" />
                                    <input type="text" class="input_no" />
                                    <input type="text" class="input_no" />
                                    ——
                                    <input type="text" class="input_no" />
                              </td>
                              <td rowspan="2" class="border_right T_cnter"><input type="checkbox" class="checkbox" /> 对私</td>
                              <td class="border_bottom">个人身份证件号码 Individual ID No.</td>
                            </tr>
                            <tr>
                              <td><input type="checkbox" class="checkbox" />
                                    中国居民个人
                                    Resident Individual
                                    <br />
                                    <input type="checkbox" class="checkbox" />
                                    中国非居民个人
                                    Non-Resident Individual
                                </td>
                            </tr>  
                          </table>
                      </td>
                  </tr>
          </table>
      </div>
      <!---------第四块--END------->
      <!--第五块-->
      <div class="table_2">
          <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                      <td  width="30%" rowspan="2" class="T_cnter">
                          <div class="No">54/56a</div>
                          收款银行之代理行<br />名称及地址<br />
                          Correspondent of Beneficiary's<br />
                          Bank Name & Address
                      </td>
                      <td colspan="2" class=" border_bottom_dashed">&nbsp;</td>
                  </tr>
                  <tr>
                    <td colspan="2" class="border_top_dashed">&nbsp;</td>
                  </tr>
                  <tr>
                      <td  width="30%" rowspan="3" class="T_cnter">
                          <div class="No">57a</div>
                          收款人开户银行<br />名称及地址<br />
                          Beneficiary's Bank Name<br />
                          & Address
                      </td>
                      <td colspan="2">收款人开户银行在其代理行账号 Bene's Bank A/C No.</td>
                  </tr>
                  <tr>
                    <td colspan="2" class="border_bottom_dashed">&nbsp;</td>
                  </tr>
                  <tr>
                    <td colspan="2" class="border_top_dashed">&nbsp;</td>
                  </tr>
                  <tr>
                      <td  width="30%" rowspan="3" class="T_cnter">
                          <div class="No">59a</div>
                          收款人名称<br />及地址<br />
                          Beneficiary's Name<br />
                          & Address
                      </td>
                      <td colspan="2">收款人账号 Bene's A/C No.</td>
                  </tr>
                  <tr>
                    <td colspan="2" class="border_bottom_dashed">&nbsp;</td>
                  </tr>
                  <tr>
                    <td colspan="2" class="border_top_dashed">&nbsp;</td>
                  </tr>
                  <tr>
                      <td  width="30%" rowspan="2" class="T_cnter">
                          <div class="No">70</div>
                          汇款附言<br />
                          Remittance Information
                      </td>
                      <td>只限140个字位 Not Exceeding 140 Characters</td>
                      <td rowspan="2" width="30%">
                          <div class="No">71A</div>
                          <div class="T_cnter">国内外费用承担</div>
                          <div class="T_cnter">All bank's Charges If Any To Be Bome By</div>
                          <input type="checkbox" class="checkbox" /> 全额到账 NODEDUCT
                          <input type="checkbox" class="checkbox" /> 汇款人 OUR
                          <input type="checkbox" class="checkbox" /> 收款人 BEN
                          <input type="checkbox" class="checkbox" /> 共同 SHA
                      </td>
                  </tr>
                  <tr>
                    <td>&nbsp;</td>
                  </tr>
            </table>
      </div>
      <!---------第五块--END------->
      <!--第六块-->
      <div class="table_2">
          <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                      <td colspan="2">
                          <div class="FL">收款人常驻国家（地区）名称及代码 Resident Country/Region Name&Code</div>
                          <div class="FR">
                              <input type="text" class="input_no" />
                              <input type="text" class="input_no" />
                              <input type="text" class="input_no" />
                          </div>
                      </td>
                  </tr>
                  <tr> 
                      <td width="30%">
                          本笔款项是否为保税货物项下付款
                      </td>
                    <td><span class="ML20">是 <input type="checkbox" class="checkbox" /></span>
                          <span class="ML20">否 <input type="checkbox" class="checkbox" /></span>
                    </td>
                  </tr>
                  <tr>
                      <td colspan="2">
                          本笔款项请选择：
                        <span><input type="checkbox" class="checkbox" /> 预付款 Advance Payment</span>
                        <span class="ML20"><input type="checkbox" class="checkbox" /> 货到付款 Payment Against Delivery</span>
                        <span class="ML20"><input type="checkbox" class="checkbox" /> 退款 Refund</span>
                        <span class="ML20"><input type="checkbox" class="checkbox" /> 其它 Others</span>
                      </td>
                  </tr>
                  <tr> 
                    <td>
                          付款性质
                    </td>
                      <td><span>保税区 <input type="checkbox" class="checkbox" /></span>
                        <span class="ML10">出口加工区 <input type="checkbox" class="checkbox" /></span>
                        <span class="ML10">钻石交易所 <input type="checkbox" class="checkbox" /></span>
                        <span class="ML10">其它特殊经济区域 <input type="checkbox" class="checkbox" /></span>
                        <span class="ML10">深加工结转 <input type="checkbox" class="checkbox" /></span>
                        <span class="ML10">其它 <input type="checkbox" class="checkbox" /></span>
                      </td>
                  </tr>
                  <tr>
                      <td class="td_table"  colspan="2">
                          <table width="100%">
                                <tr>
                                    <td rowspan="2" class="border_right T_cnter" width="15%">交易编码<br />BOP Transac Code</td>
                                    <td class="border_right border_bottom" width="18%">
                                        <input type="text" class="input_no" />
                                        <input type="text" class="input_no" />
                                        <input type="text" class="input_no" />
                                        <input type="text" class="input_no" />
                                        <input type="text" class="input_no" />
                                        <input type="text" class="input_no" />
                                    </td>
                                    <td rowspan="2" class="border_right T_cnter" width="15%">相应币种及金额<br />Currency & Amount</td>
                                    <td class="border_right border_bottom">&nbsp;</td>
                                    <td class="border_right border_bottom T_cnter" width="8%">合同号</td>
                                    <td class="border_bottom">&nbsp;</td>
                                </tr>
                                <tr>
                                  <td class="border_right">
                                      <input type="text" class="input_no" />
                                        <input type="text" class="input_no" />
                                        <input type="text" class="input_no" />
                                        <input type="text" class="input_no" />
                                        <input type="text" class="input_no" />
                                        <input type="text" class="input_no" />
                                  </td>
                                  <td class="border_right">&nbsp;</td>
                                  <td class="border_right T_cnter" width="8%">发票号</td>
                                  <td>&nbsp;</td>
                                </tr>
                          </table>
                      </td>
                  </tr>
                  <tr> 
                      <td width="30%">
                          外汇局批号件/备案表号/业务编号
                      </td>
                    <td>&nbsp;</td>
                  </tr>
          </table>
      </div>
      <!---------第六块--END------->
      <!--第七块-->
      <div class="table_2">
          <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                      <td width="30%" colspan="2" class="T_cnter">银行专用栏<br />For Bank Use Only</td>
                      <td width="35%" colspan="2" class="T_cnter"> 申请人签章<br />Applicant's Signature</td>
                      <td colspan="2" class="T_cnter">银行签章<br />Bank's Signature</td>
                  </tr>
                  <tr>
                      <td class="T_cnter" width="14%">购汇汇率<br />Rate</td>
                      <td>&nbsp;</td>
                      <td colspan="2" rowspan="6" valign="top">
                          <div style="height:220px;">
                              <p>请按照贵行背页所列条款代办以上汇款并进行申报</p>
                              <p>Please Effect The Upwards Remittance,Subject To The Conditions Overleaf:</p>
                          </div>
                          申请人姓名<br />
                          Name Of Applicant<br />
                          电话<br />
                          Phone No.
                      </td>
                      <td colspan="2" rowspan="6">
                          <div style="height:220px;"></div>
                          标准人签字<br />
                          Authorized Person<br />
                          日期<br />
                          Date
                      </td>
                  </tr>
                  <tr>
                    <td class="T_cnter">等值人民币<br />RMB Equivalent</td>
                    <td>&nbsp;</td>
                  </tr>
                  <tr>
                    <td class="T_cnter">手续费<br />Commission</td>
                    <td>&nbsp;</td>
                  </tr>
                  <tr>
                    <td class="T_cnter">电报费<br />Cable Charges</td>
                    <td>&nbsp;</td>
                  </tr>
                  <tr>
                    <td class="T_cnter">合计<br />Total Charges</td>
                    <td>&nbsp;</td>
                  </tr>
                  <tr>
                    <td class="T_cnter">支付费用方式<br />In Payment of the Remittance</td>
                    <td>
                        <input type="checkbox" class="checkbox" /> 现金 By Cash<br />
                        <input type="checkbox" class="checkbox" /> 支票 By Check<br />
                        <input type="checkbox" class="checkbox" /> 账户from Account
                    </td>
                  </tr>
                  <tr>
                      <td class="T_cnter">核印 Sig.Ver</td>
                      <td>&nbsp;</td>
                      <td class="T_cnter" width="15%">经办 Maker</td>
                      <td>&nbsp;</td>
                      <td class="T_cnter" width="15%">复核 Ckernel</td>
                      <td>&nbsp;</td>
                  </tr>
            </table>      
      </div>
      <!--第七块--END-->                                   
  </div>
  <div class="btnArea mt20 tac">
        <el-button type="primary" @click="submitForm()">提交</el-button>
        <el-button @click="preStep()">上一步</el-button>
      </div>
</div>
</template>

<script>
export default {
  name:'intraBankRemittanceStep1',
  components: {
  },
  data() {
    return {

    }
  },
  props:{
    formData:{type:Object,default:{}},
  },
  methods: {
    preStep(){
      let _this=this
      _this.$emit("changeStep","0")
    },
    submitForm() {
      let _this=this
      _this.$tools.request(this,"MyTransaction.do",_this.formData).then(data => {
        _this.$emit("changeStep","2",data)
      })
    }
  },
  mounted(){ 
  }
}
</script>
<style  lang="scss">

.Frame_sqs .T_cnter{text-align:center;}
.Frame_sqs .T_right{text-align:right;}
.Frame_sqs .FL { float:left; }
.Frame_sqs .FR { float:right; }
.Frame_sqs .ClearBoth { clear:both; font-size:0px; height:0px; overflow:hidden; }
.Frame_sqs .MT15{margin-top:15px;}
.Frame_sqs .ML10{margin-left:10px;}
.Frame_sqs .ML20{margin-left:20px;}
.Frame_sqs .Frame_sqs .P5{padding:5px 10px;}
.Frame_sqs .checkbox{width:14px; height:14px; vertical-align:middle;}
.Frame_sqs{width:820px; margin-left:30px; padding-top:40px; position:relative;}
.Frame_sqs .Frame_font{position:absolute; right:-25px; margin-top:500px; font-size:14px; width:14px; line-height:22px; font-weight:bold;}
.Frame_sqs .table_1{line-height:20px; position:relative; height:80px;}
.Frame_sqs .date .bottom_line{border-bottom:1px solid #000; width:140px; display:inline-block;}
.Frame_sqs .table_1_foot{border:2px solid #000; position:absolute; right:0px; bottom:0px;}
.Frame_sqs .border-right{border-right:2px solid #000;}
.Frame_sqs table{border:2px solid #000; line-height:18px;}
.Frame_sqs td{padding:5px; border:1px solid #000; position:relative;}
.Frame_sqs .table_2{margin-top:-2px;}
.Frame_sqs .No{position:absolute; top:-1px; left:-1px; border:1px solid #000; padding:2px 5px;}
.Frame_sqs .input_no{border:1px solid #000; width:16px; height:16px; line-height:16px; text-align:center;}
.Frame_sqs .td_table{padding:0px;}
.Frame_sqs .td_table table{ border:0px;}
.Frame_sqs .td_table table td{border:0px;}
.Frame_sqs .td_table table td.border_right{border-right:1px solid #000;}
.Frame_sqs .td_table table td.border_bottom{border-bottom:1px solid #000;}
.Frame_sqs td.border_bottom_dashed{border-bottom:1px dashed #000;}
.Frame_sqs td.border_top_dashed{border-top:1px dashed #000;}
</style>