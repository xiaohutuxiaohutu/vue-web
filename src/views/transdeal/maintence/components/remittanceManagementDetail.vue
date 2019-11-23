<template>
    <div class="remittanceManagementDetail">
      <div class="printArea">
        <div v-if="formData.countryCode=='CHN'" class="Frame_sqs" :class="{'printIn':printType==''?true:(printType=='TD'?true:false)}" id="Frame_sqs">
            <div class="Frame_font">第一联
                <span style="padding-top:30px; display:inline-block">银行留存联</span>
            </div>
            <!--<div class="logo"><img src="../../../images/common/logo_jn.jpg" /></div>-->
            <!--第一块-->
            <div class="tac"><p style="font-size:18px;font-weight:bold;">境&nbsp&nbsp&nbsp &nbsp&nbsp内&nbsp&nbsp&nbsp&nbsp &nbsp汇&nbsp&nbsp&nbsp&nbsp&nbsp 款&nbsp&nbsp&nbsp&nbsp&nbsp 申&nbsp&nbsp&nbsp&nbsp&nbsp 请&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp 书<br><span style="font-size:14px;border-bottom:2px solid #000;">APPLICATION FOR FUNDS TRANSFERS(DOMSTIC)</span></p></div>
            <div class="table_1 mt5">
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
                            <span>&nbsp;&nbsp;{{$tools.utils.formatDate(formData.transTime,{"symbol":"YYYY-MM-DD"})}}</span>
                        </li>
                    </ul>
                </div>
                <div class="table_1_foot">
                    <div class="P5 border-right FL" style="line-height:30px;width:270px;">
                        <input type="checkbox" disabled class="checkbox" :checked="true"/> 电汇 T/T
                        <input type="checkbox" disabled class="checkbox ML10" /> 票汇 D/D
                        <input type="checkbox" disabled class="checkbox ML10" /> 信汇 M/T
                    </div>
                    <div class="P5 FL" style="line-height:30px;padding:0 3px;">
                        <span >发电等级/Priority</span>
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
                        <td width="23%">{{formData.CRY+" "+$tools.utils.toDecimalString(formData.transAmount,true,2)}}</td>
                        <td class="T_cnter">金额大写<br />Amount In Words</td>
                        <td width="23%">{{$tools.utils.toChinese(formData.transAmount)}}</td>
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
                            <div v-if="chineseRadio">
                                {{formData.chName+" - "+formData.chAddr}}
                            </div>
                            <div v-if="!chineseRadio">
                                {{formData.enName+" - "+formData.enAddr}}
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
                                    <td rowspan="2" class="border_right T_cnter"  width="8%"><input type="checkbox" disabled class="checkbox" /> 对私</td>
                                    <td class="border_bottom">个人身份证件号码 Individual ID No.</td>
                                </tr>
                                <tr>
                                    <td style="padding-top:0px;padding-bottom:0px;"><input type="checkbox" disabled class="checkbox" /> 中国居民个人 Resident Individual
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
                        <td colspan="2" class="border_bottom_dashed" height="8px;">{{formData.depositOfBankName}}</td>
                    </tr>
                    <tr>
                        <td colspan="2" class="border_top_dashed" height="8px;">{{formData.depositOfBankAddress}}</td>
                    </tr>
                    <tr>
                        <td width="25.2%" rowspan="3" class="T_cnter">
                            <div class="No">59a</div>
                            收款人名称及地址<br /> Beneficiary's Name & Address
                        </td>
                        <td colspan="2">收款人账号 Bene's A/C No.{{formData.recAccount}}</td>
                    </tr>
                    <tr>
                        <td colspan="2" class="border_bottom_dashed" height="8px;">{{formData.recName}}</td>
                    </tr>
                    <tr>
                        <td colspan="2" class="border_top_dashed" height="8px;">{{formData.region}}</td>
                    </tr>
                    <tr>
                        <td width="25.2%" rowspan="2" class="T_cnter">
                            <div class="No">70</div>
                            汇款附言<br /> Remittance Information
                        </td>
                        <td height="18px;">只限140个字位 Not Exceeding 140 Characters</td>
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
                        <td style="font-size:12px;height:84px;">{{formData.remitPostscript}}</td>
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
                                {{formData.countryName}}
                                <input type="text" disabled class="input_no" v-model="input1" />
                                <input type="text" disabled class="input_no" v-model="input2" />
                                <input type="text" disabled class="input_no" v-model="input3" />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td width="30%">
                            本笔款项是否为保税货物项下付款
                        </td>
                        <td>
                            <span class="ML20">是 <input type="checkbox" disabled class="checkbox" :checked="isChecked4" /></span>
                            <span class="ML20">否 <input type="checkbox" disabled class="checkbox" :checked="isChecked5" /></span>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            本笔款项请选择：
                            <span><input type="checkbox" disabled class="checkbox" :checked="isChecked6" /> 预付款 Advance Payment</span>
                            <span class="ML5"><input type="checkbox" disabled class="checkbox" :checked="isChecked7" /> 货到付款 Payment Against Delivery</span>
                            <span class="ML5"><input type="checkbox" disabled class="checkbox" :checked="isChecked8" /> 退款 Refund</span>
                            <span class="ML5"><input type="checkbox" disabled class="checkbox" :checked="isChecked9" /> 其他 Others</span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            付汇性质
                        </td>
                        <td>
                            <span>保税区 <input type="checkbox" disabled class="checkbox" :checked="isChecked10" /></span>
                            <span class="ML5">出口加工区 <input type="checkbox" disabled class="checkbox" :checked="isChecked11" /></span>
                            <span class="ML5">钻石交易所 <input type="checkbox" disabled class="checkbox" :checked="isChecked12" /></span>
                            <span class="ML5">其他特殊经济区域 <input type="checkbox" disabled class="checkbox" :checked="isChecked13" /></span>
                            <span class="ML5">深加工结转 <input type="checkbox" disabled class="checkbox" :checked="isChecked14" /></span>
                            <span class="ML5">其他 <input type="checkbox" disabled class="checkbox" :checked="isChecked15" /></span>
                        </td>
                    </tr>
                    <tr>
                        <td class="td_table" colspan="2">
                            <table width="100%">
                                <tr>
                                    <td rowspan="2" class="border_right T_cnter" width="14%">交易编码<br />BOP Transac Code</td>
                                    <td class="border_right border_bottom" width="18%">
                                        <input type="text" disabled class="input_no" v-model="input4" />
                                        <input type="text" disabled class="input_no" v-model="input5" />
                                        <input type="text" disabled class="input_no" v-model="input6" />
                                        <input type="text" disabled class="input_no" v-model="input7" />
                                        <input type="text" disabled class="input_no" v-model="input8" />
                                        <input type="text" disabled class="input_no" v-model="input9" />
                                    </td>
                                    <td rowspan="2" class="border_right T_cnter" width="20%">相应币种及金额<br />Currency & Amount</td>
                                    <td class="border_right border_bottom"><div v-if="input4!=''">{{formData.CRY+" "+$tools.utils.toDecimalString(formData.transaction1,true,2)}}</div></td>
                                    <td class="border_right border_bottom T_cnter" width="8%">合同号</td>
                                    <td class="border_bottom">{{formData.contra}}</td>
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
                                    <td class="border_right">
                                        <div v-if="input10!=''">{{formData.CRY+" "+$tools.utils.toDecimalString(formData.transaction2,true,2)}}</div>
                                    </td>
                                    <td class="border_right T_cnter" width="8%">发票号</td>
                                    <td>{{formData.invNo}}</td>
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
                            外汇局批号件/备案表号/业务编号
                        </td>
                        <td>{{formData.setltBsnCode}}</td>
                    </tr>
                </table>
            </div>
            <!---------第六块--END------->
            <!--第七块-->
            <div class="table_2">
                <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                        <td width="35%" colspan="2" class="T_cnter">银行专用栏<br />For Bank Use Only</td>
                        <td width="32%" colspan="2" class="T_cnter"> 申请人签章<br />Applicant's Signature</td>
                        <td colspan="2" class="T_cnter">银行签章<br />Bank's Signature</td>
                    </tr>
                    <tr>
                        <td class="T_cnter" width="17%" style="padding-top:0px;padding-bottom:0px;">购汇汇率<br />Rate</td>
                        <td>&nbsp;</td>
                        <td colspan="2" rowspan="6" valign="top">
                            <div style="height:200px;">
                                <p>请按照贵行背页所列条款代办以上汇款并进行申报</p>
                                <p>Please Effect The Upwards Remittance,Subject To The Conditions Overleaf:</p>
                            </div>
                            申请人姓名<br /> Name Of Applicant<br /> 电话
                            <br /> Phone No.
                        </td>
                        <td colspan="2" rowspan="6">
                            <div style="height:200px;"></div>
                            标准人签字<br /> Authorized Person<br /> 日期
                            <br /> Date
                        </td>
                    </tr>
                    <tr>
                        <td class="T_cnter" style="padding-top:0px;padding-bottom:0px;">等值人民币<br />RMB Equivalent</td>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td class="T_cnter" style="padding-top:0px;padding-bottom:0px;">手续费<br />Commission</td>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td class="T_cnter" style="padding-top:0px;padding-bottom:0px;">电报费<br />Cable Charges</td>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td class="T_cnter" style="padding-top:0px;padding-bottom:0px;">合计<br />Total Charges</td>
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
                        <td class="T_cnter" width="12%">经办 Maker</td>
                        <td>{{oprName}}</td>
                        <td class="T_cnter" width="13%">复核 Ckernel</td>
                        <td>{{authName}}</td>
                    </tr>
                </table>
            </div>
            <!--第七块--END-->
            <div class="table_2" v-if="!isPrint">
                <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                        <td class="tar" width="20%">附加附件：</td>
                        <td>
                            {{formData.newFileName}}
                        </td>
                    </tr>
                </table>
            </div>
	        <div class="tac mt5" style="line-height:12px;">
                <p>填&nbsp&nbsp写&nbsp&nbsp前&nbsp&nbsp请&nbsp&nbsp仔&nbsp&nbsp细&nbsp&nbsp阅&nbsp&nbsp读&nbsp&nbsp各&nbsp&nbsp联&nbsp&nbsp背&nbsp&nbsp面&nbsp&nbsp条&nbsp&nbsp款&nbsp&nbsp及&nbsp&nbsp填&nbsp&nbsp报&nbsp&nbsp说&nbsp&nbsp明</br> <span style="font-size:12px;">Please read the conditions and instructions overleaf before filling in this application</span></p>
            </div>
        </div>
        <div v-if="formData.countryCode!='CHN'" class="intraBankRemittanceStep2" :class="{'printIn':printType==''?true:(printType=='TD'?true:false)}">
            <div class="Frame_sqs" id="Frame_sqs">
                <div class="Frame_font">第一联
                    <span style="padding-top:30px; display:inline-block">银行留存联</span>
                </div>
                <!--<div class="logo"><img src="../../../images/common/logo_jn.jpg" /></div>-->
                <!--第一块-->
                <div class="tac"><p style="font-size:18px;font-weight:bold;">境&nbsp&nbsp&nbsp &nbsp&nbsp外&nbsp&nbsp&nbsp&nbsp &nbsp汇&nbsp&nbsp&nbsp&nbsp&nbsp 款&nbsp&nbsp&nbsp&nbsp&nbsp 申&nbsp&nbsp&nbsp&nbsp&nbsp 请&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp 书<br><span style="font-size:14px;border-bottom:2px solid #000;">APPLICATION FOR FUNDS TRANSFERS(DOMSTIC)</span></p></div>
                <div class="table_1 mt5">
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
                                <span>&nbsp;&nbsp;{{$tools.utils.formatDate(formData.transTime,{"symbol":"YYYY-MM-DD"})}}</span>
                            </li>
                        </ul>
                    </div>
                    <div class="table_1_foot">
                        <div class="P5 border-right FL" style="line-height:30px;width:270px;">
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
                            <td width="23%">{{formData.CRY+" "+$tools.utils.toDecimalString(formData.transAmount,true,2)}}</td>
                            <td class="T_cnter">金额大写<br />Amount In Words</td>
                            <td width="23%">{{$tools.utils.toChinese(formData.transAmount)}}</td>
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
                                <div v-if="chineseRadio">
                                    {{formData.chName+" - "+formData.chAddr}}
                                </div>
                                <div v-if="!chineseRadio">
                                    {{formData.enName+" - "+formData.enAddr}}
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
                                收款人名称及地址<br /> Beneficiary's Name<br /> & Address
                            </td>
                            <td colspan="2">收款人账号 Bene's A/C No.{{formData.recAccount}}</td>
                        </tr>
                        <tr>
                            <td colspan="2" class="border_bottom_dashed">{{formData.recName}}</td>
                        </tr>
                        <tr>
                            <td colspan="2" class="border_top_dashed">{{formData.region}}</td>
                        </tr>
                        <tr>
                            <td width="25.2%" rowspan="2" class="T_cnter">
                                <div class="No">70</div>
                                汇款附言<br /> Remittance Information
                            </td>
                            <td height="18px;">只限140个字位 Not Exceeding 140 Characters</td>
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
                            <td style="font-size:12px;height:84px;">{{formData.remitPostscript}}</td>
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
                            <td width="35%" colspan="2" class="T_cnter">银行专用栏<br />For Bank Use Only</td>
                            <td width="32%" colspan="2" class="T_cnter"> 申请人签章<br />Applicant's Signature</td>
                            <td colspan="2" class="T_cnter">银行签章<br />Bank's Signature</td>
                        </tr>
                        <tr>
                            <td class="T_cnter" width="17%">购汇汇率<br />Rate</td>
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
                            <td class="T_cnter" width="12%">经办 Maker</td>
                            <td>{{oprName}}</td>
                            <td class="T_cnter" width="13%">复核 Ckernel</td>
                            <td>{{authName}}</td>
                        </tr>
                    </table>
                </div>
                <!--第七块--END-->
                <div class="table_2" v-if="!isPrint">
                    <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                            <td class="tar" width="20%">附加附件：</td>
                            <td>
                                {{formData.newFileName}}
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="tac mt5" style="line-height:12px;">
                    <p >填&nbsp&nbsp写&nbsp&nbsp前&nbsp&nbsp请&nbsp&nbsp仔&nbsp&nbsp细&nbsp&nbsp阅&nbsp&nbsp读&nbsp&nbsp各&nbsp&nbsp联&nbsp&nbsp背&nbsp&nbsp面&nbsp&nbsp条&nbsp&nbsp款&nbsp&nbsp及&nbsp&nbsp填&nbsp&nbsp报&nbsp&nbsp说&nbsp&nbsp明</br> <span style="font-size:12px;">Please read the conditions and instructions overleaf before filling in this application</span></p>
                </div>
            </div>
        </div>
        <div class="printNoPage"><inTemplatePrint v-if="formData.countryCode=='CHN'" :isVisiable="isPrint" :list="list" :oprName="oprName" :authName="authName" :class="{'printIn':printType==''?false:(printType=='TD'?false:true),'printNo':printType==''?true:(printType=='TD'?true:false)}"></inTemplatePrint></div>
        <div class="printNoPage"><outTemplatePrint v-if="formData.countryCode!='CHN'" :isVisiable="isPrint" :list="list" :oprName="oprName" :authName="authName" :class="{'printIn':printType==''?false:(printType=='TD'?false:true),'printNo':printType==''?true:(printType=='TD'?true:false)}"></outTemplatePrint></div>
      </div>
    </div>
</template>

<script>
// import outLineRemittanceDetail from './outLineRemittanceDetail'
import inTemplatePrint from '../../query/components/inTemplatePrint'
import outTemplatePrint from '../../query/components/outTemplatePrint'
export default {
    name: 'remittanceManagementDetail',
    components: {
        // outLineRemittanceDetail
        inTemplatePrint,
        outTemplatePrint
    },
    props: {
        list: {type: Object, default:{}},
        isPrint: {type: Boolean, default:false},
        oprName: {type: String, default:''},
        authName: {type: String, default:''},
        printType: {type: String, default:''}
    },
    data() {
        return {
            formData:{},
            chineseRadio:true,
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
        }
    },
    watch:{
        printType(newValue,oldValue){
            // console.log(this.printType)
        }
    },
    methods: {
    },
    mounted() {
        let _this = this
        _this.formData = $.extend({},_this.formData,_this.list.remitInfoList[0])
        _this.formData.CRY = _this.formData.currencyType
        if(_this.formData.chName!='' && _this.formData.chAddr!='') _this.chineseRadio = true
        else if(_this.formData.enName!='' && _this.formData.enAddr!='') _this.chineseRadio = false
        _this.formData.remitPostscript = _this.$tools.validator.unescapeHTML(_this.formData.remitPostscript)
        _this.formData.rmk = _this.$tools.validator.unescapeHTML(_this.formData.rmk)
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
    padding:  4px 5px;
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
.printNo{display:none;}
.printIn{display:inline-block;}
.printNoPage{width:0px;height:0px}
@media print{
  .printNo{display:inline-block;}
  .printIn{display:none;}
  .Frame_sqs td{padding:3px 5px!important;}
}
</style>