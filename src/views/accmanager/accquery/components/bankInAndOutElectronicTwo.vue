<template>
    <div class="intraBankRemittanceStep2">
        <div v-if="formData.countryCode!='CHN'" class="Frame_sqs Frame_sign printArea" id="Frame_sqs">
            <div class="Frame_font">第一联
                <span style="padding-top:30px; display:inline-block">银行留存联</span>
            </div>
            <!--<div class="logo"><img src="../../../images/common/logo_jn.jpg" /></div>-->
            <!--第一块-->
            <div class="tac"><p style="font-size:18px;font-weight:bold;">境&nbsp&nbsp&nbsp &nbsp&nbsp外&nbsp&nbsp&nbsp&nbsp &nbsp汇&nbsp&nbsp&nbsp&nbsp&nbsp 款&nbsp&nbsp&nbsp&nbsp&nbsp 申&nbsp&nbsp&nbsp&nbsp&nbsp 请&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp 书<br><span style="font-size:14px;border-bottom:2px solid #000;">APPLICATION FOR FUNDS TRANSFERS(DOMSTIC)</span></p></div>
            <div class="table_1 MT15">
                <div class="to FL">
                    <ul>
                        <li>
                            <b>致：</b>
                        </li>
                        <li>
                            <b>TO：</b>
                        </li>
                    </ul>
                </div>
                <div class="date FR">
                    <ul>
                        <li>
                            <b>日期</b>
                        </li> 
                        <li>
                            <b>Date</b>
                            <!--<span class="bottom_line">&nbsp;</span>-->
                            <span>&nbsp;&nbsp;{{formData.tranTime}}</span>
                        </li>
                    </ul>
                </div>
                <div class="table_1_foot">
                    <div class="P5 border-right FL"  style="line-height:30px;width:270px;">
                        <input type="checkbox" disabled class="checkbox" :checked="true"/> 电汇 T/T
                        <input type="checkbox" disabled class="checkbox ML10" /> 票汇 D/D
                        <input type="checkbox" disabled class="checkbox ML10" /> 信汇 M/T
                    </div>
                    <div class="P5 FL" style="line-height:30px;padding:0 3px;">
                        <span>发电等级/Priority</span>
                        <input type="checkbox" disabled class="checkbox ML10" /> 普通 Normal
                        <input type="checkbox" disabled class="checkbox ML10" /> 加急 Urgent
                    </div>
                    <div class="ClearBoth"></div>
                </div>
            </div>
            <!--第一块--END------->
            <!--第二块-->
            <div class="table_2">
                <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                        <td width="25.9%">申报号码 Report No.</td>
                        <td colspan="3">
                            <input type="text" disabled class="input_no" />
                            <input type="text" disabled class="input_no" />
                            <input type="text" disabled class="input_no" />
                            <input type="text" disabled class="input_no" />
                            <input type="text" disabled class="input_no" />
                            <input type="text" disabled class="input_no" />

                            <input type="text" disabled class="input_no ml25" />
                            <input type="text" disabled class="input_no" />
                            <input type="text" disabled class="input_no" />
                            <input type="text" disabled class="input_no" />

                            <input type="text" disabled class="input_no ml25" />
                            <input type="text" disabled class="input_no" />

                            <input type="text" disabled class="input_no ml25" />
                            <input type="text" disabled class="input_no" />
                            <input type="text" disabled class="input_no" />
                            <input type="text" disabled class="input_no" />
                            <input type="text" disabled class="input_no" />
                            <input type="text" disabled class="input_no" />

                            <input type="text" disabled class="input_no ml25" />
                            <input type="text" disabled class="input_no" />
                            <input type="text" disabled class="input_no" />
                            <input type="text" disabled class="input_no" />
                        </td>
                    </tr>
                    <tr>
                        <td class="T_cnter">
                            <div class="No">20</div>
                            银行业务编号<br />Bank Transac Ref.No.
                        </td>
                        <td width="23%">&nbsp;</td>
                        <td class="T_cnter">收电行/付款行<br />Receiver/Drawn On</td>
                        <td width="23%">{{formData.payBank}}</td>
                    </tr>
                </table>
            </div>
            <!---------第二块--END------->
            <!--第三块-->
            <div class="table_2">
                <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                        <td width="26%" colspan="2" class="T_cnter">
                            <div class="No">32A</div>
                            汇款币种及金额<br />Currency & Interbank Settlement Amount
                        </td>
                        <td width="23%">{{formData.CRY+" "+$tools.utils.toDecimalString(formData.tranMoney,true,2)}}</td>
                        <td class="T_cnter">金额大写<br />Amount In Words</td>
                        <td width="23%">{{$tools.utils.toChinese(formData.tranMoney)}}</td>
                    </tr>
                    <tr>
                        <td rowspan="3" class="T_cnter">其<br /><br />中</td>
                        <td>现汇金额 Amount In FX</td>
                        <td v-if="formData.cashAmount==''"></td>
                        <td v-if="formData.cashAmount!=''">{{formData.CRY+" "+$tools.utils.toDecimalString(formData.cashAmount,true,2)}}</td>
                        <td class="T_cnter">账号 Account No./Credit Card No.</td>
                        <td>{{formData.spotExAcc}}</td>
                    </tr>
                    <tr>
                        <td>购汇金额 Amount of Purchase</td>
                        <td v-if="formData.exchangeAmount==''"></td>
                        <td v-if="formData.exchangeAmount!=''">{{formData.CRY+" "+$tools.utils.toDecimalString(formData.exchangeAmount,true,2)}}</td>
                        <td class="T_cnter">账号 Account No./Credit Card No.</td>
                        <td>{{formData.purchasedExAcc}}</td>
                    </tr>
                    <tr>
                        <td>其他金额 Amount of Others</td>
                        <td v-if="formData.otherAmount==''"></td>
                        <td v-if="formData.otherAmount!=''">{{formData.CRY+" "+$tools.utils.toDecimalString(formData.otherAmount,true,2)}}</td>
                        <td class="T_cnter">账号 Account No./Credit Card No.</td>
                        <td>{{formData.otherAcc}}</td>
                    </tr>
                </table>
            </div>
            <!---------第三块--END------->
            <!--第四块-->
            <div class="table_2">
                <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                        <td width="25.9%" class="T_cnter">
                            <div class="No">50a</div>
                            汇款人名称及地址<br />Remitter's Name & Address
                        </td>
                        <td>
                            <div v-if="(formData.chineseRadio)">
                                {{formData.chName+"-"+formData.chAddr}}
                            </div>
                            <div v-if="(formData.engRadio)">
                                {{formData.enName+"-"+formData.enAddr}}
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2" class="td_table">
                            <table width="100%">
                                <tr>
                                    <td rowspan="2" class="border_right" width="53%">
                                        <input type="checkbox" disabled class="checkbox" :checked="true"/> 对公 组织机构代码 Unit Code
                                        <input type="text" disabled class="input_no" v-model="input16"/>
                                        <input type="text" disabled class="input_no" v-model="input17"/>
                                        <input type="text" disabled class="input_no" v-model="input18"/>
                                        <input type="text" disabled class="input_no" v-model="input19"/>
                                        <input type="text" disabled class="input_no" v-model="input20"/>
                                        <input type="text" disabled class="input_no" v-model="input21"/>
                                        <input type="text" disabled class="input_no" v-model="input22"/>
                                        <input type="text" disabled class="input_no" v-model="input23"/> —
                                        <input type="text" disabled class="input_no" v-model="input24"/>
                                    </td>
                                    <td rowspan="2" class="border_right T_cnter" width="8%"><input type="checkbox" disabled class="checkbox" /> 对私</td>
                                    <td class="border_bottom">个人身份证件号码 Individual ID No.</td>
                                </tr>
                                <tr>
                                    <td><input type="checkbox" disabled class="checkbox" /> 中国居民个人 Resident Individual
                                        <br />
                                        <input type="checkbox" disabled class="checkbox" /> 中国非居民个人 Non-Resident Individual
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </div>
            <!---------第四块--END------->
            <!--第五块-->
            <div class="table_2" style="word-break:break-all;">
                <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                        <td width="25.9%" rowspan="2" class="T_cnter">
                            <div class="No">54/56a</div>
                            收款银行之代理行<br />名称及地址<br /> Correspondent of Beneficiary's<br /> Bank Name & Address
                        </td>
                        <td colspan="2" class=" border_bottom_dashed">{{formData.agncBankName}}</td>
                    </tr>
                    <tr>
                        <td colspan="2" class="border_top_dashed">{{formData.agncBankAddress}}</td>
                    </tr>
                    <tr>
                        <td width="25.2%" rowspan="3" class="T_cnter">
                            <div class="No">57a</div>
                            收款人开户银行<br />名称及地址<br /> Beneficiary's Bank Name<br /> & Address
                        </td>
                        <td colspan="2">收款人开户银行在其代理行账号 Bene's Bank A/C No.{{formData.depositOfAgncBankAccoun}}</td>
                    </tr>
                    <tr>
                        <td colspan="2" class="border_bottom_dashed">{{formData.depositOfBankName}}</td>
                    </tr>
                    <tr>
                        <td colspan="2" class="border_top_dashed">{{formData.depositOfBankAddress}}</td>
                    </tr>
                    <tr>
                        <td width="25.2%" rowspan="3" class="T_cnter">
                            <div class="No">59a</div>
                            收款人名称<br />及地址<br /> Beneficiary's Name<br /> & Address
                        </td>
                        <td colspan="2">收款人账号 Bene's A/C No.{{formData.receiveAcco}}</td>
                    </tr>
                    <tr>
                        <td colspan="2" class="border_bottom_dashed">{{formData.receiveAccoName}}</td>
                    </tr>
                    <tr>
                        <td colspan="2" class="border_top_dashed">{{formData.region}}</td>
                    </tr>
                    <tr>
                        <td width="25.2%" rowspan="2" class="T_cnter">
                            <div class="No">70</div>
                            汇款附言<br /> Remittance Information
                        </td>
                        <td>只限140个字位 Not Exceeding 140 Characters</td>
                        <td rowspan="2" width="39%">
                            <div class="No">71A</div>
                            <div class="T_cnter">国内外费用承担</div>
                            <div class="T_cnter">All bank's Charges If Any To Be Bome By</div>
                            <input type="checkbox" disabled class="checkbox" :checked="isChecked1" /> 汇款人 OUR
                            <input type="checkbox" disabled class="checkbox" :checked="isChecked2" /> 收款人 BEN
                            <input type="checkbox" disabled class="checkbox" :checked="isChecked3" /> 共同 SHA
                        </td>
                    </tr>
                    <tr>
                        <td>{{formData.remitPostscript}}</td>
                    </tr>
                </table>
            </div>
            <!---------第五块--END------->
            <!--第六块-->
            <div class="table_2">
                <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                        <td>
                            <div class="FL">收款人常驻国家（地区）名称及代码 Resident Country/Region Name&Code</div>
                            <div class="FR">
                                {{formData.countryName}}
                                <input type="text" disabled class="input_no" v-model="input1" />
                                <input type="text" disabled class="input_no" v-model="input2" />
                                <input type="text" disabled class="input_no" v-model="input3" />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            本笔款项请选择：
                            <span><input type="checkbox" disabled class="checkbox" :checked="isChecked6" /> 预付款 Advance Payment</span>
                            <span class="ML20"><input disabled type="checkbox" class="checkbox" :checked="isChecked7" /> 货到付款 Payment Against Delivery</span>
                            <span class="ML20"><input disabled type="checkbox" class="checkbox" :checked="isChecked8" /> 退款 Refund</span>
                            <span class="ML20"><input disabled type="checkbox" class="checkbox" :checked="isChecked9" /> 其他 Others</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="td_table">
                            <table width="100%">
                                <tr>
                                    <td rowspan="2" class="border_right T_cnter" width="15%">交易编码<br />BOP Transac Code</td>
                                    <td class="border_right border_bottom" width="18%">
                                        <input type="text" disabled class="input_no" v-model="input4" />
                                        <input type="text" disabled class="input_no" v-model="input5" />
                                        <input type="text" disabled class="input_no" v-model="input6" />
                                        <input type="text" disabled class="input_no" v-model="input7" />
                                        <input type="text" disabled class="input_no" v-model="input8" />
                                        <input type="text" disabled class="input_no" v-model="input9" />
                                    </td>
                                    <td rowspan="2" class="border_right T_cnter" width="15%">相应币种及金额<br />Currency & Amount</td>
                                    <td class="border_right border_bottom" width="15%"><div v-if="input4!=''">{{formData.CRY+" "+$tools.utils.toDecimalString(formData.transaction1,true,2)}}</div></td>
                                    <td rowspan="2" class="border_right T_cnter" width="8%">交易附言<br />Transac. Remark</td>
                                    <td class="border_bottom">{{formData.postscript1}}</td>
                                </tr>
                                <tr>
                                    <td class="border_right">
                                        <input type="text" disabled class="input_no" v-model="input10" />
                                        <input type="text" disabled class="input_no" v-model="input11" />
                                        <input type="text" disabled class="input_no" v-model="input12" />
                                        <input type="text" disabled class="input_no" v-model="input13" />
                                        <input type="text" disabled class="input_no" v-model="input14" />
                                        <input type="text" disabled class="input_no" v-model="input15" />
                                    </td>
                                    <td class="border_right"><div v-if="input10!=''">{{formData.CRY+" "+$tools.utils.toDecimalString(formData.transaction2,true,2)}}</div></td>
                                    <td>{{formData.postscript2}}</td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </div>
            <div class="table_2">
                <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                        <td width="30%">
                            本笔款项是否为保税货物项下付款
                        </td>
                        <td width="15%">
                            <span class="ML10">是 <input type="checkbox" disabled class="checkbox" :checked="isChecked4" /></span>
                            <span class="ML10">否 <input type="checkbox" disabled class="checkbox" :checked="isChecked5" /></span>
                        </td>
                        <td>合同号</td>
                        <td>{{formData.contra}}</td>
                        <td>发票号</span></td>
                        <td>{{formData.invNo}}</td>
                    </tr>
                    <tr>
                        <td width="30%">
                            外汇局批号件/备案表号/业务编号
                        </td>
                        <td colspan="5">{{formData.setltBsnCode}}</td>
                    </tr>
                </table>
            </div>
            <!---------第六块--END------->
            <!--第七块-->
            <div class="table_2">
                <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                        <td width="40%" colspan="2" class="T_cnter">银行专用栏<br />For Bank Use Only</td>
                        <td width="35%" colspan="2" class="T_cnter"> 申请人签章<br />Applicant's Signature</td>
                        <td colspan="2" class="T_cnter">银行签章<br />Bank's Signature</td>
                    </tr>
                    <tr>
                        <td class="T_cnter" width="20%">购汇汇率<br />Rate</td>
                        <td>&nbsp;</td>
                        <td colspan="2" rowspan="6" valign="top">
                            <div style="height:220px;">
                                <p>请按照贵行背页所列条款代办以上汇款并进行申报</p>
                                <p>Please Effect The Upwards Remittance,Subject To The Conditions Overleaf:</p>
                            </div>
                            申请人姓名<br /> Name Of Applicant<br /> 电话
                            <br /> Phone No.
                        </td>
                        <td colspan="2" rowspan="6">
                            <div style="height:220px;"></div>
                            标准人签字<br /> Authorized Person<br /> 日期
                            <br /> Date
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
                            <input type="checkbox" disabled class="checkbox" /> 现金 By Cash<br />
                            <input type="checkbox" disabled class="checkbox" /> 支票 By Check<br />
                            <input type="checkbox" disabled class="checkbox" /> 账户from Account
                        </td>
                    </tr>
                    <tr>
                        <td class="T_cnter">核印 Sig.Ver</td>
                        <td>&nbsp;</td>
                        <td class="T_cnter" width="15%">经办 Maker</td>
                        <td>{{oprName}}</td>
                        <td class="T_cnter" width="15%">复核 Ckernel</td>
                        <td>{{authName}}</td>
                    </tr>
                </table>
            </div>
            <span v-if='sealType=="1"'>
                <img src="../../../../images/receipt/sealImage-gz.png" alt="" class="Frame_sqs_Img"> 
            </span>
            <span v-if='sealType=="2"'>
                <img src="../../../../images/receipt/sealImage-sz.png" alt="" class="Frame_sqs_Img"> 
            </span>
            <span v-if='sealType=="3"'>
                <img src="../../../../images/receipt/sealImage-st.png" alt="" class="Frame_sqs_Img"> 
            </span>
            <!--第七块--END-->
        </div>
        <div class="btnArea mt20 tac">
                  <el-button type="primary" @click="printer">打印</el-button> 
                  <el-button type="primary" @click="printOutElectronic">下载</el-button>
         </div>
        <bankInAndOutElectronicOne v-if="formData.countryCode=='CHN'" :PrintListShowOne="PrintListShowOne"></bankInAndOutElectronicOne>
            
    </div>
</template>

<script>
import bankInAndOutElectronicOne from './bankInAndOutElectronicOne'
export default {
    name: 'bankInAndOutElectronicTwo',
    components: {
        bankInAndOutElectronicOne
    },
    props: {
        PrintListShowOne: {type: Array, default:{}},
        payOpenBankNo: {type: String, default:'0'},
    },
    data() {
        return {
            formData:{},
            sealType:'',
            // 国内外费用承担start
            isChecked1: false,
            isChecked2: false,
            isChecked3: false,
            // 国内外费用承担end
            //收款人常驻国家代码start
            input1: '',
            input2: '',
            input3: '',
            //收款人常驻国家代码end
            //本笔款项是否为报税货物项下付款start
            isChecked4: false,
            isChecked5: false,
            //本笔款项是否为报税货物项下付款end
            //本笔款项start
            isChecked6: false,
            isChecked7: false,
            isChecked8: false,
            isChecked9: false,
            //本笔款项end
            //付款性质satart
            isChecked10: false,
            isChecked11: false,
            isChecked12: false,
            isChecked13: false,
            isChecked14: false,
            isChecked15: false,
            //付款性质end
            //交易编码1start
            input4: '',
            input5: '',
            input6: '',
            input7: '',
            input8: '',
            input9: '',
            //交易编码1end
            //交易编码2start
            input10: '',
            input11: '',
            input12: '',
            input13: '',
            input14: '',
            input15: '',
            //交易编码2end
            //组织机构代码start
            input16:'',
            input17:'',
            input18:'',
            input19:'',
            input20:'',
            input21:'',
            input22:'',
            input23:'',
            input24:'',
            //组织机构代码end
            authInfoHistoryList: [],
            imAuthInfoList: [],
            imAuthHistoryList: [],
            oprName: '',  //经办员
            authName: '',  //授权员
            tempValue:{chineseRadio:'', engRadio:''},
        }
    },
    methods: {
        printer(){
            let _this = this
            _this.$tools.print()
            _this.addPrintNum()
        },
        addPrintNum(){
            let _this=this
            let flowListTemp = []
            
            let temp = {}
            temp.flowNo = _this.formData.bankFlowNo
            console.log("temp.flowNo",temp.flowNo)
            flowListTemp.push(temp)

            let formData1 = {}
            formData1.transType = 'O'
            console.log("formData1.transType",formData1.transType)
            formData1.flowNoList = flowListTemp
            console.log("formData1.flowNoList",formData1.flowNoList)
            _this.$tools.request(_this, "CB01010407.do", formData1).then(
                data => {
                    if('0' == data.body.errorCode){
                    console.log("下载次数加1")
                    }else{
                    
                    }
                }
            )
        },
        printOutElectronic(){
            let _this = this
            let fieldBeanList3 = []
            let tempDate = {}
            tempDate.Date = _this.formData.tranTime
            tempDate.TransacNo = ''  
            tempDate.payBank = _this.formData.payBank
            tempDate.currencyType = _this.formData.CRY
            tempDate.tranMoney = _this.$tools.utils.toDecimalString(_this.formData.tranMoney,true,2)
            tempDate.AmountUpper = _this.$tools.utils.toChinese(_this.formData.tranMoney)
            tempDate.CheckNumber = ''
            if(_this.formData.cashAmount!=''){
                 tempDate.cashAmount = _this.formData.CRY+" "+ _this.$tools.utils.toDecimalString(_this.formData.cashAmount,true,2)
            }
            if(_this.formData.exchangeAmount!=''){
                tempDate.exchangeAmount = _this.formData.CRY+" "+  _this.$tools.utils.toDecimalString(_this.formData.exchangeAmount,true,2) 
            }
            if(_this.formData.otherAmount!=''){
                tempDate.otherAmount = _this.formData.CRY+" "+ _this.$tools.utils.toDecimalString(_this.formData.otherAmount,true,2) 
            }
            tempDate.spotExAcc = _this.formData.spotExAcc
            tempDate.purchasedExAcc = _this.formData.purchasedExAcc
            tempDate.otherAcc = _this.formData.otherAcc
            if(_this.formData.chineseRadio){
                tempDate.chName = _this.formData.chName
                tempDate.chAddr = _this.formData.chAddr
            }else{
                tempDate.chName = ''
                tempDate.chAddr = ''
            }
            if(_this.formData.engRadio){
                tempDate.enName = _this.formData.enName
                tempDate.enAddr = _this.formData.enAddr
            }else{
                tempDate.enName = ''
                tempDate.enAddr = ''
            }
            // tempDate.chName = _this.formData.chName
            // tempDate.chAddr = _this.formData.chAddr
            // tempDate.enName = _this.formData.enName
            // tempDate.enAddr = _this.formData.enAddr
            tempDate.agncBankName = _this.formData.agncBankName
            tempDate.agncBankAddress = _this.formData.agncBankAddress
            tempDate.depositOfAgncBankAccoun = _this.formData.depositOfAgncBankAccoun
            tempDate.depositOfBankName = _this.formData.depositOfBankName
            tempDate.depositOfBankAddress = _this.formData.depositOfBankAddress
            tempDate.receiveAcco = _this.formData.receiveAcco
            tempDate.receiveAccoName = _this.formData.receiveAccoName
            tempDate.region = _this.formData.region
            tempDate.remitPostscript = _this.formData.remitPostscript
            tempDate.countryName = _this.formData.countryName
            if(_this.input4!=''){
                tempDate.transaction1 = _this.formData.CRY+" "+ _this.$tools.utils.toDecimalString(_this.formData.transaction1,true,2)
            }
            tempDate.postscript1 = _this.formData.postscript1
            if(_this.input10!=''){
                tempDate.transaction2 = _this.formData.CRY+" "+ _this.$tools.utils.toDecimalString(_this.formData.transaction2,true,2)
            }
            tempDate.postscript2 = _this.formData.postscript2
            tempDate.contra = _this.formData.contra
            tempDate.invNo = _this.formData.invNo
            tempDate.setltBsnCode = _this.formData.setltBsnCode
            tempDate.Rate = ''  
            tempDate.RMBAmount = ''
            tempDate.Number = ''
            tempDate.Commission = ''  
            tempDate.CableCharges = ''
            tempDate.TotalCharges = ''
            tempDate.ApplicantName = ''
            tempDate.PhoneNo = ''
            tempDate.AuthorName = ''
            tempDate.AuthorizedDate = ''
            tempDate.VerifySign = ''
            tempDate.Maker = _this.oprName
            tempDate.Checker = _this.authName
            tempDate.input1 = ''
            tempDate.input2 = ''
            tempDate.input3 = ''
            tempDate.input4 = ''
            tempDate.input5 = ''
            tempDate.input6 = ''
            tempDate.input7 = ''
            tempDate.input8 = ''
            tempDate.input9 = ''
            tempDate.input10 = ''
            tempDate.input11 = ''
            tempDate.input12 = ''
            tempDate.input13 = ''
            tempDate.input14 = ''
            tempDate.input15 = ''
            tempDate.input16 = ''
            tempDate.input17 = ''
            tempDate.input18 = ''
            tempDate.input19 = ''
            tempDate.input20 = ''
            tempDate.input22 = ''

            tempDate.input23 = _this.formData.unitCode.substring(0, 1)
            tempDate.input24 = _this.formData.unitCode.substring(1, 2)
            tempDate.input25 = _this.formData.unitCode.substring(2, 3)
            tempDate.input26 = _this.formData.unitCode.substring(3, 4)
            tempDate.input27 = _this.formData.unitCode.substring(4, 5)
            tempDate.input28 = _this.formData.unitCode.substring(5, 6)
            tempDate.input29 = _this.formData.unitCode.substring(6, 7)
            tempDate.input30 = _this.formData.unitCode.substring(7, 8)
            tempDate.input31 = _this.formData.unitCode.substring(8, 9)

            tempDate.input32 = _this.formData.countryCode.substring(0, 1)
            tempDate.input33 = _this.formData.countryCode.substring(1, 2)
            tempDate.input34 = _this.formData.countryCode.substring(2, 3)

            tempDate.input35 = _this.formData.tranCode1.substring(0, 1)
            tempDate.input36 = _this.formData.tranCode1.substring(1, 2)
            tempDate.input37 = _this.formData.tranCode1.substring(2, 3)
            tempDate.input38 = _this.formData.tranCode1.substring(3, 4)
            tempDate.input39 = _this.formData.tranCode1.substring(4, 5)
            tempDate.input40 = _this.formData.tranCode1.substring(5, 6)

            tempDate.input41 = _this.formData.tranCode2.substring(0, 1)
            tempDate.input42 = _this.formData.tranCode2.substring(1, 2)
            tempDate.input43 = _this.formData.tranCode2.substring(2, 3)
            tempDate.input44 = _this.formData.tranCode2.substring(3, 4)
            tempDate.input45 = _this.formData.tranCode2.substring(4, 5)
            tempDate.input46 = _this.formData.tranCode2.substring(5, 6)

            tempDate.Box1 = 'T'
            tempDate.Box2 = '2'
            tempDate.Box3 = '3'
            tempDate.Box4 = '4'
            tempDate.Box5 = '5'
            tempDate.Box6 = 'Public'
            tempDate.Box7 = '7'
            tempDate.Box8 = '8'
            tempDate.Box9 = '9'

            if (_this.formData.undertakingWay == "0") {
                tempDate.Box10 = 'OUR'
                tempDate.Box11 = '11'
                tempDate.Box12 = '12'
            } else if (_this.formData.undertakingWay == "1") {
                tempDate.Box10 = '10'
                tempDate.Box11 = 'BEN'
                tempDate.Box12 = '12'
            } else if (_this.formData.undertakingWay == "2") {
                tempDate.Box10 = '10'
                tempDate.Box11 = '11'
                tempDate.Box12 = 'SHA'
            }

            if (_this.formData.flag == "0") {
                tempDate.Box13 = 'True'
                tempDate.Box14 = '14'
            } else if (_this.formData.flag == "1") {
                tempDate.Box13 = '13'
                tempDate.Box14 = 'False'
            }

            if (_this.formData.natureOfMoney == "0") {
                tempDate.Box15 = 'Advance'
                tempDate.Box16 = '16'
                tempDate.Box17 = '17'
                tempDate.Box18 = '18'
            } else if (_this.formData.natureOfMoney == "1") {
                tempDate.Box15 = '15'
                tempDate.Box16 = 'Delivery'
                tempDate.Box17 = '17'
                tempDate.Box18 = '18'
            } else if (_this.formData.natureOfMoney == "2") {
                tempDate.Box15 = '15'
                tempDate.Box16 = '16'
                tempDate.Box17 = 'Refund'
                tempDate.Box18 = '18'
            } else if (_this.formData.natureOfMoney == "3") {
                tempDate.Box15 = '15'
                tempDate.Box16 = '16'
                tempDate.Box17 = '17'
                tempDate.Box18 = 'Others'
            }

            tempDate.Box25 = '25'
            tempDate.Box26 = '26'
            tempDate.Box27 = '27'

            fieldBeanList3.push(tempDate)

            let _list = _this.$tools.storage.get("user","save")
            let _operAccInfoList = _list.operAccInfoList
            let _openBankNo = ''
            for(let i=0;i<_operAccInfoList.length;i++){
                if (_this.payOpenBankNo == _operAccInfoList[i].accNo) {
                    _openBankNo = _operAccInfoList[i].openBankNo
                    break
                }
            }
            console.log("_openBankNo",_openBankNo)
            // let url = "/api/CB01010410.do"
            let url = "/corpbank/CB01010410.do"
            let form = $("<form></form>").attr("action",url).attr("method","post")
            // let form = $("<form></form>").attr("action",url).attr("method","post").attr("enctype","multipart/form-data")
            // let form = $("<form></form>").attr("action",url).attr("method","post").attr("enctype","application/x-www-form-urlencoded")
            form.append($("<input></input>").attr("type","hidden").attr("name","versionNo").attr("value",'0.1'))
            form.append($("<input></input>").attr("type","hidden").attr("name","openBankNo").attr("value",_openBankNo))
            for(let i = 0;i<fieldBeanList3.length;i++){
                form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList3["+i+"]"+"[Date]").attr("value",fieldBeanList3[i].Date))
                form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList3["+i+"]"+"[TransacNo]").attr("value",fieldBeanList3[i].TransacNo))
                form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList3["+i+"]"+"[payBank]").attr("value",fieldBeanList3[i].payBank))
                form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList3["+i+"]"+"[currencyType]").attr("value",fieldBeanList3[i].currencyType))
                form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList3["+i+"]"+"[tranMoney]").attr("value",fieldBeanList3[i].tranMoney))
                form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList3["+i+"]"+"[AmountUpper]").attr("value",fieldBeanList3[i].AmountUpper))
                form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList3["+i+"]"+"[CheckNumber]").attr("value",fieldBeanList3[i].CheckNumber))
                form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList3["+i+"]"+"[cashAmount]").attr("value",fieldBeanList3[i].cashAmount))
                form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList3["+i+"]"+"[exchangeAmount]").attr("value",fieldBeanList3[i].exchangeAmount))
                form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList3["+i+"]"+"[otherAmount]").attr("value",fieldBeanList3[i].otherAmount))
                form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList3["+i+"]"+"[spotExAcc]").attr("value",fieldBeanList3[i].spotExAcc))
                form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList3["+i+"]"+"[purchasedExAcc]").attr("value",fieldBeanList3[i].purchasedExAcc))
                form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList3["+i+"]"+"[otherAcc]").attr("value",fieldBeanList3[i].otherAcc))
                form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList3["+i+"]"+"[chName]").attr("value",fieldBeanList3[i].chName))
                form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList3["+i+"]"+"[chAddr]").attr("value",fieldBeanList3[i].chAddr))
                form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList3["+i+"]"+"[enName]").attr("value",fieldBeanList3[i].enName))
                form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList3["+i+"]"+"[enAddr]").attr("value",fieldBeanList3[i].enAddr))
                form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList3["+i+"]"+"[agncBankName]").attr("value",fieldBeanList3[i].agncBankName))
                form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList3["+i+"]"+"[agncBankAddress]").attr("value",fieldBeanList3[i].agncBankAddress))
                form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList3["+i+"]"+"[depositOfAgncBankAccoun]").attr("value",fieldBeanList3[i].depositOfAgncBankAccoun))
                form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList3["+i+"]"+"[depositOfBankName]").attr("value",fieldBeanList3[i].depositOfBankName))
                form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList3["+i+"]"+"[depositOfBankAddress]").attr("value",fieldBeanList3[i].depositOfBankAddress))
                form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList3["+i+"]"+"[receiveAcco]").attr("value",fieldBeanList3[i].receiveAcco))
                form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList3["+i+"]"+"[receiveAccoName]").attr("value",fieldBeanList3[i].receiveAccoName))
                form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList3["+i+"]"+"[region]").attr("value",fieldBeanList3[i].region))
                form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList3["+i+"]"+"[remitPostscript]").attr("value",fieldBeanList3[i].remitPostscript))
                form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList3["+i+"]"+"[countryName]").attr("value",fieldBeanList3[i].countryName))
                form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList3["+i+"]"+"[transaction1]").attr("value",fieldBeanList3[i].transaction1))
                form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList3["+i+"]"+"[postscript1]").attr("value",fieldBeanList3[i].postscript1))
                form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList3["+i+"]"+"[transaction2]").attr("value",fieldBeanList3[i].transaction2))
                form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList3["+i+"]"+"[postscript2]").attr("value",fieldBeanList3[i].postscript2))
                form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList3["+i+"]"+"[contra]").attr("value",fieldBeanList3[i].contra))
                form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList3["+i+"]"+"[invNo]").attr("value",fieldBeanList3[i].invNo))
                form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList3["+i+"]"+"[setltBsnCode]").attr("value",fieldBeanList3[i].setltBsnCode))
                form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList3["+i+"]"+"[Rate]").attr("value",fieldBeanList3[i].Rate))
                form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList3["+i+"]"+"[RMBAmount]").attr("value",fieldBeanList3[i].RMBAmount))
                form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList3["+i+"]"+"[Number]").attr("value",fieldBeanList3[i].Number))
                form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList3["+i+"]"+"[Commission]").attr("value",fieldBeanList3[i].Commission))
                form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList3["+i+"]"+"[CableCharges]").attr("value",fieldBeanList3[i].CableCharges))
                form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList3["+i+"]"+"[TotalCharges]").attr("value",fieldBeanList3[i].TotalCharges))
                form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList3["+i+"]"+"[ApplicantName]").attr("value",fieldBeanList3[i].ApplicantName))
                form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList3["+i+"]"+"[PhoneNo]").attr("value",fieldBeanList3[i].PhoneNo))
                form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList3["+i+"]"+"[AuthorName]").attr("value",fieldBeanList3[i].AuthorName))
                form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList3["+i+"]"+"[AuthorizedDate]").attr("value",fieldBeanList3[i].AuthorizedDate))
                form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList3["+i+"]"+"[VerifySign]").attr("value",fieldBeanList3[i].VerifySign))
                form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList3["+i+"]"+"[Maker]").attr("value",fieldBeanList3[i].Maker))
                form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList3["+i+"]"+"[Checker]").attr("value",fieldBeanList3[i].Checker))
                form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList3["+i+"]"+"[input1]").attr("value",fieldBeanList3[i].input1))
                form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList3["+i+"]"+"[input2]").attr("value",fieldBeanList3[i].input2))
                form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList3["+i+"]"+"[input3]").attr("value",fieldBeanList3[i].input3))
                form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList3["+i+"]"+"[input4]").attr("value",fieldBeanList3[i].input4))
                form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList3["+i+"]"+"[input5]").attr("value",fieldBeanList3[i].input5))
                form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList3["+i+"]"+"[input6]").attr("value",fieldBeanList3[i].input6))
                form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList3["+i+"]"+"[input7]").attr("value",fieldBeanList3[i].input7))
                form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList3["+i+"]"+"[input8]").attr("value",fieldBeanList3[i].input8))
                form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList3["+i+"]"+"[input9]").attr("value",fieldBeanList3[i].input9))
                form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList3["+i+"]"+"[input10]").attr("value",fieldBeanList3[i].input10))
                form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList3["+i+"]"+"[input11]").attr("value",fieldBeanList3[i].input11))
                form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList3["+i+"]"+"[input12]").attr("value",fieldBeanList3[i].input12))
                form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList3["+i+"]"+"[input13]").attr("value",fieldBeanList3[i].input13))
                form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList3["+i+"]"+"[input14]").attr("value",fieldBeanList3[i].input14))
                form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList3["+i+"]"+"[input15]").attr("value",fieldBeanList3[i].input15))
                form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList3["+i+"]"+"[input16]").attr("value",fieldBeanList3[i].input16))
                form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList3["+i+"]"+"[input17]").attr("value",fieldBeanList3[i].input17))
                form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList3["+i+"]"+"[input18]").attr("value",fieldBeanList3[i].input18))
                form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList3["+i+"]"+"[input19]").attr("value",fieldBeanList3[i].input19))
                form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList3["+i+"]"+"[input20]").attr("value",fieldBeanList3[i].input20))
                form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList3["+i+"]"+"[input21]").attr("value",fieldBeanList3[i].input21))
                form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList3["+i+"]"+"[input22]").attr("value",fieldBeanList3[i].input22))
                form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList3["+i+"]"+"[input23]").attr("value",fieldBeanList3[i].input23))
                form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList3["+i+"]"+"[input24]").attr("value",fieldBeanList3[i].input24))
                form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList3["+i+"]"+"[input25]").attr("value",fieldBeanList3[i].input25))
                form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList3["+i+"]"+"[input26]").attr("value",fieldBeanList3[i].input26))
                form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList3["+i+"]"+"[input27]").attr("value",fieldBeanList3[i].input27))
                form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList3["+i+"]"+"[input28]").attr("value",fieldBeanList3[i].input28))
                form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList3["+i+"]"+"[input29]").attr("value",fieldBeanList3[i].input29))
                form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList3["+i+"]"+"[input30]").attr("value",fieldBeanList3[i].input30))
                form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList3["+i+"]"+"[input31]").attr("value",fieldBeanList3[i].input31))
                form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList3["+i+"]"+"[input32]").attr("value",fieldBeanList3[i].input32))
                form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList3["+i+"]"+"[input33]").attr("value",fieldBeanList3[i].input33))
                form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList3["+i+"]"+"[input34]").attr("value",fieldBeanList3[i].input34))
                form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList3["+i+"]"+"[input35]").attr("value",fieldBeanList3[i].input35))
                form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList3["+i+"]"+"[input36]").attr("value",fieldBeanList3[i].input36))
                form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList3["+i+"]"+"[input37]").attr("value",fieldBeanList3[i].input37))
                form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList3["+i+"]"+"[input38]").attr("value",fieldBeanList3[i].input38))
                form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList3["+i+"]"+"[input39]").attr("value",fieldBeanList3[i].input39))
                form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList3["+i+"]"+"[input40]").attr("value",fieldBeanList3[i].input40))
                form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList3["+i+"]"+"[input41]").attr("value",fieldBeanList3[i].input41))
                form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList3["+i+"]"+"[input42]").attr("value",fieldBeanList3[i].input42))
                form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList3["+i+"]"+"[input43]").attr("value",fieldBeanList3[i].input43))
                form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList3["+i+"]"+"[input44]").attr("value",fieldBeanList3[i].input44))
                form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList3["+i+"]"+"[input45]").attr("value",fieldBeanList3[i].input45))
                form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList3["+i+"]"+"[input46]").attr("value",fieldBeanList3[i].input46))
                form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList3["+i+"]"+"[Box1]").attr("value",fieldBeanList3[i].Box1))
                form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList3["+i+"]"+"[Box2]").attr("value",fieldBeanList3[i].Box2))
                form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList3["+i+"]"+"[Box3]").attr("value",fieldBeanList3[i].Box3))
                form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList3["+i+"]"+"[Box4]").attr("value",fieldBeanList3[i].Box4))
                form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList3["+i+"]"+"[Box5]").attr("value",fieldBeanList3[i].Box5))
                form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList3["+i+"]"+"[Box6]").attr("value",fieldBeanList3[i].Box6))
                form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList3["+i+"]"+"[Box7]").attr("value",fieldBeanList3[i].Box7))
                form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList3["+i+"]"+"[Box8]").attr("value",fieldBeanList3[i].Box8))
                form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList3["+i+"]"+"[Box9]").attr("value",fieldBeanList3[i].Box9))
                form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList3["+i+"]"+"[Box10]").attr("value",fieldBeanList3[i].Box10))
                form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList3["+i+"]"+"[Box11]").attr("value",fieldBeanList3[i].Box11))
                form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList3["+i+"]"+"[Box12]").attr("value",fieldBeanList3[i].Box12))
                form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList3["+i+"]"+"[Box13]").attr("value",fieldBeanList3[i].Box13))
                form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList3["+i+"]"+"[Box14]").attr("value",fieldBeanList3[i].Box14))
                form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList3["+i+"]"+"[Box15]").attr("value",fieldBeanList3[i].Box15))
                form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList3["+i+"]"+"[Box16]").attr("value",fieldBeanList3[i].Box16))
                form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList3["+i+"]"+"[Box17]").attr("value",fieldBeanList3[i].Box17))
                form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList3["+i+"]"+"[Box18]").attr("value",fieldBeanList3[i].Box18))
                form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList3["+i+"]"+"[Box25]").attr("value",fieldBeanList3[i].Box25))
                form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList3["+i+"]"+"[Box26]").attr("value",fieldBeanList3[i].Box26))
                form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList3["+i+"]"+"[Box27]").attr("value",fieldBeanList3[i].Box27))
            }

            form.appendTo("body").submit().remove()
            _this.addPrintNum()
            //  _this.logonImageCode=encodeURI(encodeURI("/api/CB01010408.do?versionNo=0.1&fieldBeanList="+fieldBeanList))  //build后
            // _this.$tools.request(_this, "CB01010410.do", queryData).then(
            //     data => {
                
                    
            //     }
            // )
        },
    },
    mounted() {
        let _this = this
        _this.formData = $.extend({},_this.formData,_this.PrintListShowOne[0])
        if(_this.formData.chAddr!="") {
            _this.tempValue.chineseRadio = true
            _this.tempValue.engRadio = false
        }else{
            _this.tempValue.chineseRadio = false
            _this.tempValue.engRadio = true
        }
        _this.formData = $.extend({},_this.formData, _this.tempValue)
        _this.formData.CRY = _this.formData.currencyType
        console.log("_this.formData.currencyType",_this.formData.currencyType)
        console.log("_this.formData.CRY",_this.formData.CRY)
        //校验国内外费用承担
        if (_this.formData.undertakingWay == "0") {
            _this.isChecked1 = true
        } else if (_this.formData.undertakingWay == "1") {
            _this.isChecked2 = true
        } else if (_this.formData.undertakingWay == "2") {
            _this.isChecked3 = true
        }
        //拆分常驻国家代码
        _this.input1 = _this.formData.countryCode.substring(0, 1)
        _this.input2 = _this.formData.countryCode.substring(1, 2)
        _this.input3 = _this.formData.countryCode.substring(2, 3)
        //校验本笔款项是否为保税货物项下付款
        if (_this.formData.flag == "0") {
            _this.isChecked4 = true
        } else if (_this.formData.flag == "1") {
            _this.isChecked5 = true
        }
        //校验本笔款项
        if (_this.formData.natureOfMoney == "0") {
            _this.isChecked6 = true
        } else if (_this.formData.natureOfMoney == "1") {
            _this.isChecked7 = true
        } else if (_this.formData.natureOfMoney == "2") {
            _this.isChecked8 = true
        } else if (_this.formData.natureOfMoney == "3") {
            _this.isChecked9 = true
        }
        //校验付款性质
        if (_this.formData.natureOfPayment == "0") {
            _this.isChecked10 = true
        } else if (_this.formData.natureOfPayment == "1") {
            _this.isChecked11 = true
        } else if (_this.formData.natureOfPayment == "2") {
            _this.isChecked12 = true
        } else if (_this.formData.natureOfPayment == "3") {
            _this.isChecked13 = true
        } else if (_this.formData.natureOfPayment == "4") {
            _this.isChecked14 = true
        } else if (_this.formData.natureOfPayment == "5") {
            _this.isChecked15 = true
        }
        //拆分交易编码1
        _this.input4 = _this.formData.tranCode1.substring(0, 1)
        _this.input5 = _this.formData.tranCode1.substring(1, 2)
        _this.input6 = _this.formData.tranCode1.substring(2, 3)
        _this.input7 = _this.formData.tranCode1.substring(3, 4)
        _this.input8 = _this.formData.tranCode1.substring(4, 5)
        _this.input9 = _this.formData.tranCode1.substring(5, 6)
        //拆分交易编码2
        _this.input10 = _this.formData.tranCode2.substring(0, 1)
        _this.input11 = _this.formData.tranCode2.substring(1, 2)
        _this.input12 = _this.formData.tranCode2.substring(2, 3)
        _this.input13 = _this.formData.tranCode2.substring(3, 4)
        _this.input14 = _this.formData.tranCode2.substring(4, 5)
        _this.input15 = _this.formData.tranCode2.substring(5, 6)
        //拆分组织机构代码
        let _cstCertNo = _this.formData.unitCode
        _this.input16 = _cstCertNo.substring(0, 1)
        _this.input17 = _cstCertNo.substring(1, 2)
        _this.input18 = _cstCertNo.substring(2, 3)
        _this.input19 = _cstCertNo.substring(3, 4)
        _this.input20 = _cstCertNo.substring(4, 5)
        _this.input21 = _cstCertNo.substring(5, 6)
        _this.input22 = _cstCertNo.substring(6, 7)
        _this.input23 = _cstCertNo.substring(7, 8)
        _this.input24 = _cstCertNo.substring(8, 9)
        console.log("行内",_this.formData)
        let _list = _this.$tools.storage.get("user","save")
        let _operAccInfoList = _list.operAccInfoList
        let _openBankNo = ''
        for(let i=0;i<_operAccInfoList.length;i++){
            if (_this.payOpenBankNo == _operAccInfoList[i].accNo) {
                _openBankNo = _operAccInfoList[i].openBankNo
                break
            }
        }

        let queryData3 = {}
        queryData3.openBankNo = _openBankNo
        _this.$tools.request(_this, "CB01010411.do",queryData3).then(
            data => {
                if('0' == data.body.errorCode){
                    _this.sealType = data.body.sealType
                    console.log("_this.sealType",_this.sealType)
                }else{
                }
            }
        )
        let queryData4 = {}
        queryData4.sequenceNo = _this.formData.bankFlowNo
        queryData4.status = '90'
        _this.$tools.request(_this, 'CB000034.do', queryData4).then(
            data => {
            if (data.body.errorCode == '0') {
                _this.authInfoHistoryList = data.body.authInfoHistoryList?data.body.authInfoHistoryList:[]
                _this.imAuthInfoList = data.body.imAuthInfoList?data.body.imAuthInfoList:[]
                _this.imAuthHistoryList = data.body.imAuthHistoryList?data.body.imAuthHistoryList:[]
                if(_this.imAuthInfoList.length>0) _this.oprName = _this.imAuthInfoList[0].authUserName
                if(_this.imAuthHistoryList.length>0) _this.authName = _this.imAuthHistoryList[0].authUserName
            } else {
                
            }

        })
    }
}
</script>
<style  lang="scss">
.Frame_sqs .T_cnter {
    text-align: center;
}

.Frame_sqs .T_right {
    text-align: right;
}

.Frame_sqs .FL {
    float: left;
}

.Frame_sqs .FR {
    float: right;
}

.Frame_sqs .ClearBoth {
    clear: both;
    font-size: 0px;
    height: 0px;
    overflow: hidden;
}

.Frame_sqs .MT15 {
    margin-top: 15px;
}

.Frame_sqs .ML10 {
    margin-left: 10px;
}
.Frame_sqs .ML5 {
    margin-left: 5px;
}

.Frame_sqs .ML20 {
    margin-left: 20px;
}

.Frame_sqs .Frame_sqs .P5 {
    padding: 5px 10px;
}

.Frame_sqs .checkbox {
    width: 14px;
    height: 14px;
    vertical-align: middle;
}

.Frame_sqs {
    width: 880px;
    margin-left: 12px;
    padding-top: 40px;
    position: relative;
}

.Frame_sqs .Frame_font {
    position: absolute;
    right: -25px;
    margin-top: 500px;
    font-size: 14px;
    width: 14px;
    line-height: 22px;
    font-weight: bold;
}

.Frame_sqs .table_1 {
    line-height: 20px;
    position: relative;
    height: 80px;
}

.Frame_sqs .date .bottom_line {
    border-bottom: 1px solid #000;
    width: 140px;
    display: inline-block;
}

.Frame_sqs .table_1_foot {
    border: 2px solid #000;
    position: absolute;
    right: 0px;
    bottom: 0px;
}

.Frame_sqs .border-right {
    border-right: 2px solid #000;
}

.Frame_sqs table {
    border: 2px solid #000;
    line-height: 14px;
}

.Frame_sqs td {
    padding: 4px 5px;
    border: 1px solid #000;
    position: relative;
}

.Frame_sqs .table_2 {
    margin-top: -2px;
}

.Frame_sqs .No {
    position: absolute;
    top: -1px;
    left: -1px;
    border: 1px solid #000;
    padding: 2px 5px;
}

.Frame_sqs .input_no {
    border: 1px solid #000;
    width: 16px;
    height: 16px;
    line-height: 16px;
    text-align: center;
}

.Frame_sqs .td_table {
    padding: 0px;
}

.Frame_sqs .td_table table {
    border: 0px;
}

.Frame_sqs .td_table table td {
    border: 0px;
}

.Frame_sqs .td_table table td.border_right {
    border-right: 1px solid #000;
}

.Frame_sqs .td_table table td.border_bottom {
    border-bottom: 1px solid #000;
}

.Frame_sqs td.border_bottom_dashed {
    border-bottom: 1px dashed #000;
}

.Frame_sqs td.border_top_dashed {
    border-top: 1px dashed #000;
}
.Frame_sign{position:relative;}
.Frame_sign .Frame_sign_Img{position:absolute;bottom:83px;right:51px;}
</style>