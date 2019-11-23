<template>
    <div class="intraBankRemittanceStep2">
        <outLineRemittanceDetail :list="list"></outLineRemittanceDetail>
        <div class="tableData p20">
            <table v-if="rejectdialogVisible">
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
                <el-button type="primary" @click="onSubmit">确认</el-button>
                <el-button @click="rejectdialogVisible=false">取消</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import outLineRemittanceDetail from '../../maintence/components/outLineRemittanceDetail'
export default {
    name: 'outLineRemittanceDetail1',
    components: {
        outLineRemittanceDetail,
    },
    props: {
        list: { type: Object, default: {} },
    },
    data() {
        return {
            formData: {},
            loginStorage: this.$tools.storage.get("user", "save"),
            rejectdialogVisible: false,
            form: {
                rejReason: ''
            },
            authFlag: '',
            rules: {
                rejReason: [
                    { required: true, message: '请输入拒绝原因', trigger: 'blur' },
                    { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
                ]
            },
            signData: '',  //签名要素
            timeStamps: '',  //时间戳
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
            input16: '',
            input17: '',
            input18: '',
            input19: '',
            input20: '',
            input21: '',
            input22: '',
            input23: '',
            input24: '',
            //组织机构代码end
        }
    },
    methods: {
        onSubmit(authFlag) {
            let _this = this
            _this.$refs.form.validate((valid) => {
                if (valid) {
                    _this.rejectdialogVisible = false
                    _this.allSubmit('1')
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
                { key: 'flowNo', value: _this.formData.flowNo },
                { key: 'payAccountShow', value: _this.formData.payAccountShow },
                { key: 'recAccount', value: _this.formData.recAccount },
                { key: 'recName', value: _this.formData.recName },
                { key: 'transAmount', value: _this.formData.transAmount },
                { key: 'currencyType', value: _this.formData.currencyType }
            ]
            let siDate = JSON.stringify(newDate);
            let certNo = loginStorge.serialNo
            let ukeyNo = loginStorge.uKeySn
            let siAmt = _this.formData.transAmount
            let siAccountNo = _this.formData.payAccountShow
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
                _this.signData = signData
            }
            //ukey end
            if (authFlag == '0') {
                _this.rejReason = ''
            }
            let body = {}
            body.transFlowNoList = [{ "transFlowNo": _this.formData.flowNo }]
            body.bsnCode = _this.formData.bsnCode
            body.cstNo = _this.loginStorage.cstNo
            body.hostNo = _this.loginStorage.hostNo
            body.eCIFID = _this.loginStorage.userNo
            body.authFlag = authFlag
            body.rejReason = _this.form.rejReason
            body.signedData = _this.signData
            body.timeStamps = _this.timeStamps
            //签名验签字段 start
            body.flowNo = _this.formData.flowNo
            body.payAccountShow = _this.formData.payAccountShow
            body.recAccount = _this.formData.recAccount
            body.recName = _this.formData.recName
            body.transAmount = _this.formData.transAmount
            body.currencyType = _this.formData.currencyType
            //签名验签字段 end
            _this.$tools.request(_this, "CB050109.do", body).then(
                data => {
                    let errorCode = data.body.errorCode
                    if (errorCode == '0') {
                        _this.$emit("close", [4, data.body])
                    } else {
                        this.$alert(data.body.errorMsg, '提示', {
                            confirmButtonText: '确定'
                        });
                    }
                })
        },
        close(body) {
            if (body === null || body === undefined || body === '') {
                this.$emit("close")
            } else {
                this.$emit("close", [body])
            }
        },
        getTimeStamps(tradeCode) {
            let _this = this
            let code = { "tradeCode": tradeCode }
            _this.$tools.request(this, "CB000028Action.do", code).then(data => {
                _this.timeStamps = data.body.timeStamps
            })
        }
    },
    mounted() {
        let _this = this
        _this.getTimeStamps('CB050109')
        _this.formData = $.extend({}, _this.formData, _this.list.remitInfoList[0])
        // _this.formData.CRY = _this.formData.currencyType
        // //校验国内外费用承担
        // if (_this.formData.undertakingWay == "0") {
        //     _this.isChecked1 = true
        // } else if (_this.formData.undertakingWay == "1") {
        //     _this.isChecked2 = true
        // } else if (_this.formData.undertakingWay == "2") {
        //     _this.isChecked3 = true
        // }
        // //拆分常驻国家代码
        // _this.input1 = _this.formData.countryCode.substring(0, 1)
        // _this.input2 = _this.formData.countryCode.substring(1, 2)
        // _this.input3 = _this.formData.countryCode.substring(2, 3)
        // //校验本笔款项是否为保税货物项下付款
        // if (_this.formData.flag == "0") {
        //     _this.isChecked4 = true
        // } else if (_this.formData.flag == "1") {
        //     _this.isChecked5 = true
        // }
        // //校验本笔款项
        // if (_this.formData.natureOfMoney == "0") {
        //     _this.isChecked6 = true
        // } else if (_this.formData.natureOfMoney == "1") {
        //     _this.isChecked7 = true
        // } else if (_this.formData.natureOfMoney == "2") {
        //     _this.isChecked8 = true
        // } else if (_this.formData.natureOfMoney == "3") {
        //     _this.isChecked9 = true
        // }
        // //校验付款性质
        // if (_this.formData.natureOfPayment == "0") {
        //     _this.isChecked10 = true
        // } else if (_this.formData.natureOfPayment == "1") {
        //     _this.isChecked11 = true
        // } else if (_this.formData.natureOfPayment == "2") {
        //     _this.isChecked12 = true
        // } else if (_this.formData.natureOfPayment == "3") {
        //     _this.isChecked13 = true
        // } else if (_this.formData.natureOfPayment == "4") {
        //     _this.isChecked14 = true
        // } else if (_this.formData.natureOfPayment == "5") {
        //     _this.isChecked15 = true
        // }
        // //拆分交易编码1
        // _this.input4 = _this.formData.tranCode1.substring(0, 1)
        // _this.input5 = _this.formData.tranCode1.substring(1, 2)
        // _this.input6 = _this.formData.tranCode1.substring(2, 3)
        // _this.input7 = _this.formData.tranCode1.substring(3, 4)
        // _this.input8 = _this.formData.tranCode1.substring(4, 5)
        // _this.input9 = _this.formData.tranCode1.substring(5, 6)
        // //拆分交易编码2
        // _this.input10 = _this.formData.tranCode2.substring(0, 1)
        // _this.input11 = _this.formData.tranCode2.substring(1, 2)
        // _this.input12 = _this.formData.tranCode2.substring(2, 3)
        // _this.input13 = _this.formData.tranCode2.substring(3, 4)
        // _this.input14 = _this.formData.tranCode2.substring(4, 5)
        // _this.input15 = _this.formData.tranCode2.substring(5, 6)
        // //拆分组织机构代码
        // let _cstCertNo = _this.formData.unitCode
        // _this.input16 = _cstCertNo.substring(0, 1)
        // _this.input17 = _cstCertNo.substring(1, 2)
        // _this.input18 = _cstCertNo.substring(2, 3)
        // _this.input19 = _cstCertNo.substring(3, 4)
        // _this.input20 = _cstCertNo.substring(4, 5)
        // _this.input21 = _cstCertNo.substring(5, 6)
        // _this.input22 = _cstCertNo.substring(6, 7)
        // _this.input23 = _cstCertNo.substring(7, 8)
        // _this.input24 = _cstCertNo.substring(8, 9)
    }
}
</script>