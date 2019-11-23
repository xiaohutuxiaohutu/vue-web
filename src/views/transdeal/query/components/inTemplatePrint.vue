<template>
    <div class="intraBankRemittanceStep2">
        <div class="inTemplatePrint printArea" id="inTemplatePrint">
            <!--<div class="logo"><img src="../../../images/common/logo_jn.jpg" /></div>-->
            <!--第一块-->
            <div class="table_1">
                <div class="date FR" style="margin-right:50px;">
                    <ul>
                        <li>
                            <!--<b>日期</b>-->
                        </li>
                        <li>
                            <!--<b>Date</b>-->
                            <!--<span class="bottom_line">&nbsp;</span>-->
                            <span>&nbsp;&nbsp;{{$tools.utils.formatDate(formData.transTime,{"symbol":"YYYY-MM-DD"})}}</span>
                        </li>
                    </ul>
                </div>
                <div class="table_1_foot" style="width:560px;">
                    <div class="P5 border-right FL" style="line-height:35px;width:270px;height:35px;">
                      <span class="checkBox1" style="margin-left:5px;vertical-align:middle;" :class="{'el-icon-check':true}"></span>
                      <span class="checkBox1" style="margin-left:66px;vertical-align:middle;"></span>
                      <span class="checkBox1" style="margin-left:68px;vertical-align:middle;"></span>
                    </div>
                    <div class="P5 FL" style="line-height:35px;padding:0 3px;height:35px;">
                        <span class="checkBox1" style="margin-left:74px;vertical-align:middle;"></span>
                        <span class="checkBox1" style="margin-left:84px;vertical-align:middle;"></span>
                    </div>
                    <div class="ClearBoth"></div>
                </div>
            </div>
            <!--第一块--END------->
            <!--第二块-->
            <div class="table_2 secondT"> 
                <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                        <td width="24.1%" height="27px;"></td>
                        <td colspan="3" >
                            <span class="checkBox2" style="margin-left:24px;"></span>
                            <span class="checkBox2"></span>
                            <span class="checkBox2"></span>
                            <span class="checkBox2"></span>
                            <span class="checkBox2"></span>
                            <span class="checkBox2"></span>

                            <span class="checkBox2" style="margin-left:38px;"></span>
                            <span class="checkBox2"></span>
                            <span class="checkBox2"></span>
                            <span class="checkBox2"></span>

                            <span class="checkBox2" style="margin-left:39px;"></span>
                            <span class="checkBox2"></span>

                            <span class="checkBox2" style="margin-left:42px;"></span>
                            <span class="checkBox2"></span>
                            <span class="checkBox2"></span>
                            <span class="checkBox2"></span>
                            <span class="checkBox2"></span>
                            <span class="checkBox2"></span>

                            <span class="checkBox2" style="margin-left:40px;"></span>
                            <span class="checkBox2"></span>
                            <span class="checkBox2"></span>
                            <span class="checkBox2"></span>
                        </td>
                    </tr>
                    <tr>
                        <td class="T_cnter" height="30px;">
                        </td>
                        <td width="21.4%">&nbsp;</td>
                        <td class="T_cnter"></td>
                        <td width="33.1%">{{formData.payBank}}</td>
                    </tr>
                </table>
            </div>
            <!---------第二块--END------->
            <!--第三块-->
            <div class="table_2">
                <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                        <td width="28%" colspan="2" class="T_cnter">
                        </td>
                        <td width="22%">{{formData.CRY+" "+$tools.utils.toDecimalString(formData.transAmount,true,2)}}</td>
                        <td class="T_cnter" height="40px;"></td>
                        <td width="32%">{{$tools.utils.toChinese(formData.transAmount)}}</td>
                    </tr>
                    <tr style="height:18.5px;">
                        <td rowspan="3" class="T_cnter"></td>
                        <td></td>
                        <td v-if="formData.cashAmount==''"></td>
                        <td v-if="formData.cashAmount!=''" height="18.5px;">{{formData.CRY+" "+$tools.utils.toDecimalString(formData.cashAmount,true,2)}}</td>
                        <td class="T_cnter"></td>
                        <td>{{formData.spotExAcc}}</td>
                    </tr>
                    <tr style="height:18.5px;">
                        <td></td>
                        <td v-if="formData.exchangeAmount==''"></td>
                        <td v-if="formData.exchangeAmount!=''" height="18.5px;">{{formData.CRY+" "+$tools.utils.toDecimalString(formData.exchangeAmount,true,2)}}</td>
                        <td class="T_cnter"></td>
                        <td>{{formData.purchasedExAcc}}</td>
                    </tr>
                    <tr  style="height:30px;">
                        <td width="170px;"></td>
                        <td v-if="formData.otherAmount==''"></td>
                        <td v-if="formData.otherAmount!=''" height="30px;">{{formData.CRY+" "+$tools.utils.toDecimalString(formData.otherAmount,true,2)}}</td>
                        <td class="T_cnter"></td>
                        <td>{{formData.otherAcc}}</td>
                    </tr>
                </table>
            </div>
            <!---------第三块--END------->
            <!--第四块-->
            <div class="table_2">
                <table width="100%" cellpadding="0" cellspacing="0">
                    <tr style="line-height:40px;height:40px;">
                        <td width="28%" class="T_cnter">
                            <div class="No"></div>
                        </td>
                        <td >
                            <div v-if="chineseRadio">
                                {{formData.chName+" - "+formData.chAddr}}
                            </div>
                            <div v-if="!chineseRadio">
                                {{formData.enName+" - "+formData.enAddr}}
                            </div>
                        </td>
                    </tr>
                    <tr  style="height:45px;">
                        <td colspan="2" class="td_table">
                            <table width="100%">
                                <tr>
                                    <td rowspan="2" class="border_right" width="46%" height="19px;">
                                        <span class="checkBox1 " style="margin-left:5px;width:13px;height:13px;" :class="{'el-icon-check':true}"></span>
                                        <span class="checkBox1 " style="margin-left:179px;">{{input16}}</span>
                                        <span class="checkBox1" style="margin-left:2px;">{{input17}}</span>
                                        <span class="checkBox1" style="margin-left:4px;">{{input18}}</span>
                                        <span class="checkBox1" style="margin-left:4px;">{{input19}}</span>
                                        <span class="checkBox1" style="margin-left:4px;">{{input20}}</span>
                                        <span class="checkBox1" style="margin-left:4px;">{{input21}}</span>
                                        <span class="checkBox1" style="margin-left:4px;">{{input22}}</span>
                                        <span class="checkBox1" style="margin-left:4px;">{{input23}}</span>
                                        <span class="checkBox1" style="margin-left:20px;">{{input24}}</span>
                                    </td>
                                    <td rowspan="2" class="border_right T_cnter" width="6.5%"><span class="checkBox2 tac"></span></td>
                                    <td class="border_bottom"></td>
                                </tr>
                                <tr>
                                    <td style="padding:0px;height:16px;"><span class="checkBox2 tac" style="margin-left:5px;"></span>
                                        <span class="checkBox2 tac" style="margin-left:176px;"></span>
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
                        <td width="22%" rowspan="2" class="T_cnter" >
                        </td>
                        <td colspan="2" style="line-height:30px;height:30px;">{{formData.agncBankName}}</td>
                    </tr>
                    <tr>
                        <td colspan="2"  style="line-height:24px;height:30px;">{{formData.agncBankAddress}}</td>
                    </tr>
                    <tr>
                        <td width="22%" rowspan="3" class="T_cnter">
                        </td>
                        <td colspan="2" style="height:12px;padding-top:2px;"><span style="padding-left:520px;">{{formData.depositOfAgncBankAccoun}}</span></td>
                    </tr>
                    <tr>
                        <td colspan="2" style="height:12px;padding-top:2px;line-height:12px;">{{formData.depositOfBankName}}</td>
                    </tr>
                    <tr>
                        <td colspan="2" class="border_top_dashed" style="height:15px;padding-top:2px;line-height:15px;">{{formData.depositOfBankAddress}}</td>
                    </tr>
                    <tr>
                        <td width="22%" rowspan="3" class="T_cnter" height="50px;">                        
                        </td>
                        <td colspan="2" style="padding-top:2px;line-height:15px;height:15px;"><span style="margin-left:280px;">{{formData.recAccount}}</span></td>
                    </tr>
                    <tr>
                        <td colspan="2"  style="padding-top:0px;height:9px;">{{formData.recName}}</td>
                    </tr>
                    <tr>
                        <td colspan="2" style="padding-top:0px;height:10px;">{{formData.region}}</td>
                    </tr>
                    <tr>
                        <td width="22%" rowspan="2" class="T_cnter" height="63px;">
                        </td>
                        <td height="14px;"></td>
                        <td rowspan="2" width="30%" style="padding:25px 0px 0px 2px;">
                            <span class="checkBox1" style="margin-left:7px;vertical-align:middle;" :class="{'el-icon-check':isChecked1}"></span>
                            <span class="checkBox1" style="margin-left:75px;vertical-align:middle;" :class="{'el-icon-check':isChecked2}"></span>
                            <span class="checkBox1" style="margin-left:70px;vertical-align:middle;" :class="{'el-icon-check':isChecked3}"></span>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:0px;height:60px;font-size:12px;">{{formData.remitPostscript}}</td>
                    </tr>
                </table>
            </div>
            <!---------第五块--END------->
            <!--第六块-->
            <div class="table_2">
                <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                        <td colspan="2" style="padding-right:51px;padding-top:0px;">
                            <div class="FL"></div>
                            <div class="FR" style="line-height:13px;">
                                {{formData.countryName}}
                                <span class="checkBox2">{{input1}}</span>
                                <span class="checkBox2">{{input2}}</span>
                                <span class="checkBox2">{{input3}}</span>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2" style="padding:2px 0px;">
                            <span class="checkBox1" style="margin-left:290px;" :class="{'el-icon-check':isChecked4}"></span>
                            <span class="checkBox1" style="margin-left:130px;" :class="{'el-icon-check':isChecked5}"></span>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2" height="20px;">
                            <span style="margin-left:120px;" class="checkBox1" :class="{'el-icon-check':isChecked6}"></span>
                            <span  style="margin-left:185px;" class="checkBox1" :class="{'el-icon-check':isChecked7}"></span>
                            <span  style="margin-left:200px;" class="checkBox1" :class="{'el-icon-check':isChecked8}"></span>
                            <span style="margin-left:105px;" class="checkBox1" :class="{'el-icon-check':isChecked9}"></span>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <span style="margin-left:122px;" class="checkBox1" :class="{'el-icon-check':isChecked10}"></span>
                            <span style="margin-left:115px;" class="checkBox1" :class="{'el-icon-check':isChecked11}"></span>
                            <span style="margin-left:94px;" class="checkBox1" :class="{'el-icon-check':isChecked12}"></span>
                            <span style="margin-left:138px;" class="checkBox1" :class="{'el-icon-check':isChecked13}"></span>
                            <span style="margin-left:95px;" class="checkBox1" :class="{'el-icon-check':isChecked14}"></span>
                            <span style="margin-left:64px;"class="checkBox1" :class="{'el-icon-check':isChecked15}"></span>
                        </td>
                    </tr>
                    <tr>
                        <td class="td_table" colspan="2" >
                            <table width="100%">
                                <tr>
                                    <td class="border_right border_bottom" width="25%" style="padding-top:13px;" >
                                        <span style="margin-left:80px;" class="checkBox2">{{input4}}</span>
                                        <span class="checkBox2">{{input5}}</span>
                                        <span class="checkBox2">{{input6}}</span>
                                        <span class="checkBox2">{{input7}}</span>
                                        <span class="checkBox2">{{input8}}</span>
                                        <span class="checkBox2">{{input9}}</span>
                                    </td>
                                    <td rowspan="2" class="border_right T_cnter" width="13%"></td>
                                    <td class="border_right border_bottom" width="15%"><div v-if="input4!=''">{{formData.CRY+" "+$tools.utils.toDecimalString(formData.transaction1,true,2)}}</div></td>
                                    <td class="border_right border_bottom T_cnter" width="11%"></td>
                                    <td class="border_bottom">{{formData.contra}}</td>
                                </tr>
                                <tr>
                                    <td class="border_right">
                                        <span style="margin-left:80px;" class="checkBox2">{{input10}}</span>
                                        <span class="checkBox2">{{input11}}</span>
                                        <span class="checkBox2">{{input12}}</span>
                                        <span class="checkBox2">{{input13}}</span>
                                        <span class="checkBox2">{{input14}}</span>
                                        <span class="checkBox2">{{input15}}</span>
                                    </td>
                                    <td class="border_right">
                                        <div v-if="input10!=''">{{formData.CRY+" "+$tools.utils.toDecimalString(formData.transaction2,true,2)}}</div>
                                    </td>
                                    <td class="border_right T_cnter" width="11%"></td>
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
                        <td width="25%">
                        </td>
                        <td height="16px;">{{formData.setltBsnCode}}</td>
                    </tr>
                </table>
            </div>
            <!---------第六块--END------->
            <!--第七块-->
            <div class="table_2" style="margin-top:290px;">
                <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                        <td class="T_cnter" height="34px;" style="width:20%;"></td>
                        <td>&nbsp;</td>
                        <td class="T_cnter" width="13%"></td>
                        <td>{{oprName}}</td>
                        <td class="T_cnter" width="18%"></td>
                        <td>{{authName}}</td>
                    </tr>
                </table>
            </div>
            <!--第七块--END-->
        </div>
    </div>
</template>

<script>
export default {
    name: 'inTemplatePrint',
    components: {
    },
    props: {
        list: {type: Object, default:{}},
        isVisiable: {type: Boolean, default:true},
        oprName: {type:String, default:''},
        authName: {type:String, default:''}
    },
    data() {
        return {
            formData:{},
            chineseRadio: true,
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
.inTemplatePrint{color:green;}
.inTemplatePrint .T_cnter {
    text-align: center;
}
.inTemplatePrint .secondT{margin-top:32px;}

.inTemplatePrint .T_right {
    text-align: right;
}

.inTemplatePrint .FL {
    float: left;
}

.inTemplatePrint .FR {
    float: right;
}

.inTemplatePrint .ClearBoth {
    clear: both;
    font-size: 0px;
    height: 0px;
    overflow: hidden;
}

.inTemplatePrint .MT15 {
    margin-top: 15px;
}
.inTemplatePrint .ML5 {
    margin-left: 5px;
}

.inTemplatePrint .ML10 {
    margin-left: 10px;
}

.inTemplatePrint .ML20 {
    margin-left: 20px;
}

.inTemplatePrint .inTemplatePrint .P5 {
    padding: 5px 10px;
}

.inTemplatePrint .checkbox2 {
    width: 13px;
    height: 13px;
    vertical-align: middle;
}

.inTemplatePrint {
    width: 907px;
    margin-left:15px;
}

.inTemplatePrint .Frame_font {
    position: absolute;
    right: -25px;
    margin-top: 500px;
    font-size: 14px;
    width: 14px;
    line-height: 22px;
    font-weight: bold;
}

.inTemplatePrint .table_1 {
    line-height: 20px;
    position: relative;
    height: 80px;
    padding-top:36px;
    box-sizing: border-box;
    margin-top:74px;
    font-size:12px;
}

.inTemplatePrint .date .bottom_line {
    border-bottom: 1px solid #000;
    width: 140px;
    display: inline-block;
}

.inTemplatePrint .table_1_foot {
    position: absolute;
    right: -2px;
    bottom: -31px;
}

.inTemplatePrint table {
    margin-top:-1px;
    line-height: 16px;
}

.inTemplatePrint td {
    padding:  6px 5px 2px 5px;
    position: relative;
}

.inTemplatePrint .table_2 {
    margin-left:33px;
}

.inTemplatePrint .No {
    position: absolute;
    top: -1px;
    left: -1px;
    border: 0px solid #000;
    padding: 2px 5px;
}

.inTemplatePrint .input_no {
    border: 1px solid #000;
    width: 15px;
    height: 15px;
    line-height: 34px;
    text-align: center;
}
.inTemplatePrint .input_no1 {
    width: 13px;
    height: 13px;
    line-height: 20px;
    text-align: center;
}

.inTemplatePrint .td_table {
    padding: 0px;
}

.inTemplatePrint .td_table table {
    border: 0px;
}

.inTemplatePrint .td_table table td {
    border: 0px;
}


.inTemplatePrint .checkBox2{display:inline-block; width:15px; height:15px;line-height:15px;padding:0px 1px;text-align:center;}
.inTemplatePrint .checkBox1{display:inline-block; width:12px; height:12px;line-height:12px;text-align:center;}
.printIn{display:block;}
.PrintNo{display:none;}
@media print{
    .inTemplatePrint .table_2{margin-left:16px;}
    .inTemplatePrint .table_1{margin-top:50px;}
}


</style>