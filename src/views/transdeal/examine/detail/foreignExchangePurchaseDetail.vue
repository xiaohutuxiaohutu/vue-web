<template>
    <div class="foreignExchangePurchaseStep">
        <!--table布局-->
        <el-form class="formEmbedTable" ref="form" :model="form" :rules="rules">
            <table>
                <tr>
                    <td>交易类型：</td>
                    <td>{{$tools.dict.transactionType(list.exchangeInfoList[0].type1)}}</td>
                </tr>
                <tr>
                    <td>{{exchangeType(list.exchangeInfoList[0].type1)}}币种：</td>
                    <td v-if="list.exchangeInfoList[0].type1!='1'">{{$tools.dict.CRYTrans(list.exchangeInfoList[0].currency)}}</td>
                    <td v-if="list.exchangeInfoList[0].type1=='1'">{{$tools.dict.CRYTrans(list.exchangeInfoList[0].orignalCurrency)}}</td>
                </tr>
                <tr>
                    <td>转出账号：</td>
                    <td>{{list.exchangeInfoList[0].payAccount}}</td>
                </tr>
                <tr>
                    <td>转入账号：</td>
                    <td>{{list.exchangeInfoList[0].recAccount}}</td>
                </tr>
                <tr>
                    <td>{{exchangeCRY(list.exchangeInfoList[0].type1)}}金额：</td>
                    <td>{{$tools.utils.toDecimalString(list.exchangeInfoList[0].transAmount,true,2)}}</td>
                </tr>
                <tr>
                    <td>{{exchangeCRY1(list.exchangeInfoList[0].type1)}}金额：</td>
                    <td>{{$tools.utils.toDecimalString(list.exchangeInfoList[0].originalAmount,true,2)}}</td>
                </tr>
                <tr>
                    <td>备注：</td>
                    <td>{{list.exchangeInfoList[0].RMK}}</td>
                </tr>

            </table>
        </el-form>
        <!--table布局-->
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
export default {
    name: 'foreignExchangePurchaseDetail',
    props: {
        list: {
            type: Object
        }
    },
    data() {
        return {
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
            timeStamps: ''  //时间戳
        }
    },
    methods: {
        exchangeType(type) {
            switch (type) {
                case '0':
                    return '原币'
                    break;
                case '1':
                    return '购汇'
                    break;
                case '2':
                    return '原币'
                    break;
            }
        },
        exchangeCRY(type) {
            switch (type) {
                case '0':
                    return '原币'
                    break;
                case '1':
                    return '转出'
                    break;
                case '2':
                    return '原币'
                    break;
            }
        },
        exchangeCRY1(type) {
            switch (type) {
                case '0':
                    return '结汇'
                    break;
                case '1':
                    return '购汇'
                    break;
                case '2':
                    return '套汇'
                    break;
            }
        },
        onSubmit() {
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
            let formData = _this.list.exchangeInfoList[0]
            let loginStorge = _this.$tools.storage.get("user", "save")
            let currentTime = _this.$tools.utils.formatDate(new Date(), { "removeFormat": true })
            let cstNo = loginStorge.cstNo
            let eCIFID = loginStorge.eCIFID
            let newDate = [
                { key: 'cstNo', value: cstNo },
                { key: 'eCIFID', value: eCIFID },
                { key: 'flowNo', value: formData.flowNo },
                { key: 'payAccount', value: formData.payAccount },
                { key: 'recAccount', value: formData.recAccount },
                { key: 'transAmount', value: formData.transAmount },
                { key: 'originalAmount', value: formData.originalAmount },
                { key: 'currency', value: formData.currency },
                { key: 'orignalCurrency', value: formData.orignalCurrency }
            ]
            let siDate = JSON.stringify(newDate);
            let certNo = loginStorge.serialNo
            let ukeyNo = loginStorge.uKeySn
            let siAmt = formData.originalAmount
            let siAccountNo = formData.payAccount
            let arrAcc = ["付款账号:", siAccountNo]
            let arrAmtName = _this.exchangeCRY1(formData.type1) + "金额:"
            let arrAmt = [arrAmtName, siAmt]
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
                _this.form.rejReason = ''
            }
            let body = {}
            body.transFlowNoList = [{ "transFlowNo": formData.flowNo }]
            body.bsnCode = formData.bsnCode
            body.cstNo = _this.loginStorage.cstNo
            body.hostNo = _this.loginStorage.hostNo
            body.eCIFID = _this.loginStorage.eCIFID
            body.authFlag = authFlag
            body.rejReason = _this.form.rejReason
            body.signedData = _this.signData
            body.timeStamps = _this.timeStamps
            //签名验签字段 start
            body.flowNo = formData.flowNo
            body.payAccount = formData.payAccount
            body.recAccount = formData.recAccount
            body.transAmount = formData.transAmount
            body.originalAmount = formData.originalAmount
            body.currency = formData.currency
            body.orignalCurrency = formData.orignalCurrency
            //签名验签字段 end
            _this.$tools.request(_this, "CB050111.do", body).then(
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
        close() {
            this.$emit("close")
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
        _this.getTimeStamps('CB050111')
    },
}
</script>