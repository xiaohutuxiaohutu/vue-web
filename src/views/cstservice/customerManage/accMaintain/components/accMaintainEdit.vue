<template>
    <div id="accountInfoEdit">
        <el-form ref="form" :model="form" class="formEmbedTable p20" :rules="rules">
            <table>
                <caption>修改账户信息</caption>
                <tr>
                    <td>账号:</td>
                    <td>
                        <el-form-item prop="accNo">
                            {{form.accNo}}
                        </el-form-item>
                    </td>
                    <td>户名:</td>
                    <td>
                        <el-form-item prop="accName">
                            {{form.accName}}
                        </el-form-item>
                    </td>
                </tr>
                <tr>
                    <td>账户类型:</td>
                    <td>
                        <el-form-item prop="accType">
                            {{this.$tools.dict.accTypeDict(form.coreType)}}
                        </el-form-item>
                    </td>
                    <td>币种:</td>
                    <td>
                        <el-form-item prop="currType">
                            {{this.$tools.dict.currTypeDict(form.currType)}}
                        </el-form-item>
                    </td>
                </tr>
                <tr>
                    <td>开通渠道:</td>
                    <td>
                        <el-form-item>
                            <el-checkbox-group v-model="checkList1">
                                <el-checkbox label="CCB" disabled>网银</el-checkbox>
                                <el-checkbox label="CLB" disabled v-if="$tools.storage.get('user','save').cstChannelNo.substring(1,2)==1">银企直连</el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                    </td>
                    <td>账户权限:</td>
                    <td>
                        <el-form-item>
                            <el-checkbox-group v-model="checkList2">
                                <el-checkbox label="0" disabled>查询</el-checkbox>
                                <el-checkbox label="1" v-if="this.$tools.dict.transAbleDict(form.coreType)=='Y' && checkList2.length>1">动账</el-checkbox>
                                <!--<el-checkbox label="1" disabled>动账</el-checkbox>-->
                            </el-checkbox-group>
                        </el-form-item>
                    </td>
                </tr>
                <tr>
                    <td>核心开户日期:</td>
                    <td>
                        <el-form-item prop="openDate">
                            {{this.$tools.utils.formatDateSymbol(form.openDate)}}
                        </el-form-item>
                    </td>
                    <td>别名：</td>
                    <td>
                        <el-form-item prop="accAlias">
                            <el-input placeholder="请输入别名" v-model="form.accAlias"></el-input>
                        </el-form-item>
                    </td>
                </tr>
                <tr v-if="checkList2.length>1&&this.$tools.dict.transAbleDict(form.coreType)=='Y'">
                    <td>单笔限额:</td>
                    <td>
                        <el-form-item prop="limitSingle">
                            <ynet-currency-input placeholder="请输入单笔限额" v-model="form.limitSingle" :showChinese="false"></ynet-currency-input>
                        </el-form-item>
                    </td>
                    <td>日累计限额:</td>
                    <td>
                        <el-form-item prop="limitDay">
                            <ynet-currency-input placeholder="请输入日累计限额" v-model="form.limitDay" :showChinese="false"></ynet-currency-input>
                        </el-form-item>
                    </td>
                </tr>
                <tr v-if="checkList2.length>1&&this.$tools.dict.transAbleDict(form.coreType)=='Y'">
                    <td>日累计笔数:</td>
                    <td>
                        <el-form-item prop="limitDayNum">
                            <el-input placeholder="请输入日累计笔数" v-model="form.limitDayNum"></el-input>
                        </el-form-item>
                    </td>
                    <td>年累计限额:</td>
                    <td>
                        <el-form-item prop="limitYear">
                            <ynet-currency-input placeholder="请输入年累计限额" v-model="form.limitYear" :showChinese="false"></ynet-currency-input>
                        </el-form-item>
                    </td>
                </tr>
                <tr>
                    <td>账户属性:</td>
                    <td v-if="showAttr">
                        {{form.accAttrName}}
                    </td>
                    <td v-if="form.accType==3&&form.nrdaType=='T'">保证金存入类型:</td>
                    <td v-if="form.accType==3&&form.nrdaType=='T'">{{$tools.dict.boundTypeDict(form.boundType)}}</td>

                </tr>
            </table>
            <div class="btnArea mt20 tac">
                <el-button type="primary" @click="preStep()">上一步</el-button>
                <el-button type="primary" @click="uKeySubmit()">提交</el-button>
            </div>
        </el-form>
    </div>
</template>
<script>
export default {
    name: 'accountInfoEdit',
    components: {
    },
    props: {
        stepData: {
            type: Object
        }
    },
    data() {
        return {
            showAttr: false,
            form: {},
            checkList1: [],
            checkList2: [],
            bankLimit: {},
            signData: '',
            rules: {
                limitSingle: [
                    { required: true, message: '请输入', trigger: 'blur' },
                    { validator: this.$tools.validator.isNum, trigger: 'blur' },
                    { validator: this.limitSingleValidator, trigger: 'blur' }
                ],
                limitDay: [
                    { required: true, message: '请输入', trigger: 'blur' },
                    { validator: this.$tools.validator.isNum, trigger: 'blur' },
                    { validator: this.limitDayValidator, trigger: 'blur' },
                    { validator: this.$tools.validator.compareNum, trigger: 'blur', vm: this, formName: 'form', mix: 'limitSingle', message: '日累计限额不能小于单笔限额' }
                ],
                limitDayNum: [
                    { required: true, message: '请输入', trigger: 'blur' },
                    { validator: this.$tools.validator.isInt, trigger: 'blur' },
                    { validator: this.limitDayNumValidator, trigger: 'blur' },
                ],
                limitYear: [
                    { required: true, message: '请输入', trigger: 'blur' },
                    { validator: this.$tools.validator.isNum, trigger: 'blur' },
                    { validator: this.limitYearValidator, trigger: 'blur' },
                    { validator: this.$tools.validator.compareNum, trigger: 'blur', vm: this, formName: 'form', mix: 'limitDay', message: '年累计限额不能小于日累计限额' }
                ],
                boundType: [
                    { required: true, message: '请选择保证金存入类型', trigger: 'change' }
                ],
                accAlias: [
                    { validator: this.$tools.validator.isCnEngNum, trigger: 'blur' },
                ]
            },
            authRules: {
                authUserNo: [
                    { required: true, message: '请输入', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        limitSingleValidator(rule, value, callback) {
            let _this = this
            if (Number(_this.bankLimit.bankLimitSingle) < Number(value)) {
                callback("不能超过银行限额")
            }
            callback()
        },
        limitDayValidator(rule, value, callback) {
            let _this = this
            if (Number(_this.bankLimit.bankLimitDay) < Number(value)) {
                callback("不能超过银行限额")
            }
            callback()
        },
        limitDayNumValidator(rule, value, callback) {
            let _this = this
            if (Number(_this.bankLimit.bankLimitDayNum) < Number(value)) {
                callback("不能超过银行限额")
            }
            callback()
        },
        limitYearValidator(rule, value, callback) {
            let _this = this
            if (Number(_this.bankLimit.bankLimitYear) < Number(value)) {
                callback("不能超过银行限额")
            }
            callback()
        },
        preStep() {
            let _this = this
            _this.$emit("changeStep", "1")
        },
        uKeySubmit() {
            let _this = this
            let userStorge = _this.$tools.storage.get("user", "save")
            let cstNo = userStorge.cstNo
            let userNo = userStorge.eCIFID
            let newDate = [
                { key: 'cstNo', value: cstNo },
                { key: 'userNo', value: userNo },
                { key: 'accNo', value: _this.form.accNo },
            ]
            let siDate = JSON.stringify(newDate);
            let certNo = userStorge.serialNo
            let ukeyNo = userStorge.uKeySn
            let arrAcc = ["操作类型:", "账户维护"]
            let arrAmt = ["账号:", _this.form.accNo]
            let keyFlag = _this.$ukey
            if (keyFlag == true || keyFlag == 'true') {
                let flag = getSignData(arrAcc, arrAmt, siDate, certNo, ukeyNo)
                if (flag == false || flag == 'false') {
                    return
                }
                let signData = document.getElementById("signData").value.toString()
                _this.signData = signData
            }
            _this.updateAccInfo()
        },
        updateAccInfo() {
            let _this = this
            _this.$refs['form'].validate((valid) => {
                if (valid) {
                    if (_this.checkList1.length == 2) {
                        if (_this.checkList2.length == 2) {
                            _this.form.accRight = '11122'
                        } else { _this.form.accRight = '00022' }
                    } else {
                        if (_this.checkList1[0] == 'CCB') {
                            if (_this.checkList2.length == 2) {
                                _this.form.accRight = '11222'
                            } else { _this.form.accRight = '00222' }
                        } else {
                            if (_this.checkList2.length == 2) {
                                _this.form.accRight = '22122'
                            } else { _this.form.accRight = '22022' }
                        }
                    }
                    let _accInfoList = []
                    _accInfoList.push(_this.form)
                    let body = $.extend({}, { 'accInfoList': _accInfoList })
                    body.signedData = _this.signData
                    body.operateFlag = '1'
                    body.accNo = _this.form.accNo
                    body.accAlias = _this.form.accAlias
                    body.setLimit = _this.checkList2.length
                    if (_this.form.coreType == '280') {
                        body.setLimit = 1
                    }
                    _this.$tools.request(this, "CB080802.do", body).then(
                        data => {
                            if (data.body.errorCode == 0) {
                                this.$alert('修改成功', '温馨提示', {
                                    confirmButtonText: '确定',
                                    callback: action => {
                                        _this.$emit("changeStep", "1")
                                    }
                                });
                            } else {
                                this.$alert(data.body.errorMsg, '温馨提示', {
                                    confirmButtonText: '确定',
                                    callback: action => {
                                        _this.$emit("changeStep", "1")
                                    }
                                });
                            }
                        })
                } else {
                    return false
                }
            });
        },
    },
    created() {
        let _this = this
        _this.form = $.extend({}, _this.stepData, _this.form)
        if (_this.form.accRight.substring(0, 1) == 0) {
            if (_this.form.accRight.substring(2, 3) != 2) {
                _this.checkList1 = ['CCB', 'CLB']
                _this.checkList2 = ['0']
            } else {
                _this.checkList1 = ['CCB']
                _this.checkList2 = ['0']
            }
        } else if (_this.form.accRight.substring(0, 1) == 1) {
            if (_this.form.accRight.substring(2, 3) != 2) {
                _this.checkList1 = ['CCB', 'CLB']
                _this.checkList2 = ['0', '1']
            } else {
                _this.checkList1 = ['CCB']
                _this.checkList2 = ['0', '1']
            }
        } else {
            if (_this.form.accRight.substring(2, 3) == 0) {
                _this.checkList1 = ['CLB']
                _this.checkList2 = ['0']
            } else if (_this.form.accRight.substring(2, 3) == 1) {
                _this.checkList1 = ['CLB']
                _this.checkList2 = ['0', '1']
            } else {
                _this.checkList1 = []
                _this.checkList2 = []
            }
        }
        _this.form.pubToPri = '0'
        _this.$tools.request(this, "CB08080203.do", { 'currType': _this.form.currType }).then(data => {
            _this.bankLimit.bankCstLimitSingle = data.body.bankCstLimitSingle
            _this.bankLimit.bankLimitDay = data.body.bankLimitDay
            _this.bankLimit.bankLimitDayNum = data.body.bankLimitDayNum
            _this.bankLimit.bankLimitSingle = data.body.bankLimitSingle
            _this.bankLimit.bankLimitSingleLand = data.body.bankLimitSingleLand
            _this.bankLimit.bankLimitYear = data.body.bankLimitYear
        })
        _this.$tools.request(this, "CB08080204.do", { 'accAttr': _this.form.accAttr }).then(data => {
            if (data.body.accAttrInfoList.length > 0) {
                _this.form.accAttrName = data.body.accAttrInfoList[0].accAttrName
            }
            _this.showAttr = true
        })
    }
}

</script>