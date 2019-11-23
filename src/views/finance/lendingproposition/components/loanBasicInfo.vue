<template>
    <div class="templateStep1 loanBasicinfo">
        <div class="twoForm tableForm mt20">
            <h3>企业基本信息</h3>
            <el-form :model="form" :rules="rules1">
                <el-form-item label="企业名称:">
                    <span>{{form.lapCstName}}</span>
                </el-form-item>
                <el-form-item label="组织机构代码:">
                    <span class="ml5">{{form.lapOrgacode}}</span>
                </el-form-item>
                <el-form-item label="实际经营地址:">
                    <span class="ml5">{{form.lapBusAddress}}</span>
                </el-form-item>
                <!--<el-form-item label="所属行业:" class="fullLine">
                                                                                                            <span class="ml5">{{form.lapTrade}}</span>
                                                                                                        </el-form-item>-->
                <el-form-item label="法定代表人姓名:">
                    <span class="ml5">{{form.lapLegalName}}</span>
                </el-form-item>
                <el-form-item label="法定代表人证件类型:" class="fullLine">
                    <span class="ml5">{{this.$tools.dict.certTypeDict(form.lapLegalCertType)}}</span>
                </el-form-item>
                <el-form-item label="法定代表人证件号码:">
                    <span class="ml5">{{form.lapLegalCertNo}}</span>
                </el-form-item>

            </el-form>
        </div>
        <div class="twoForm tableForm mt20">
            <h3>贷款基本信息</h3>
            <el-form ref="form" :model="form" :rules="rules1">
                <el-form-item label="联系人姓名:" prop="lapLinkName">
                    <el-input v-model="form.lapLinkName"></el-input>
                </el-form-item>
                <el-form-item label="联系人手机号:" prop="lapLinkPhone">
                    <el-input v-model="form.lapLinkPhone"></el-input>
                </el-form-item>
                <el-form-item label="上年度营销收入:" prop="lapSaleYear">
                    <ynet-currency-input placeholder="请输入上年度营销收入" v-model="form.lapSaleYear" :showChinese="false"></ynet-currency-input>万元
                </el-form-item>
                <el-form-item label="年底净利润:" prop="lapProfitYear">
                    <el-select v-model="form.lapProfitYear" placeholder="请选择">
                        <el-option label="500万以下" value="500万以下"></el-option>
                        <el-option label="500万-1000万" value="500万-1000万"></el-option>
                        <el-option label="1000万-2000万" value="1000万-2000万"></el-option>
                        <el-option label="2000万-3000万" value="2000万-3000万"></el-option>
                        <el-option label="3000万以上" value="3000万以上"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="申请贷款金额:" prop="lapAmount">
                    <ynet-currency-input placeholder="请输入申请贷款金额" v-model="form.lapAmount" :showChinese="false"></ynet-currency-input>元
                </el-form-item>
                <el-form-item label="申请贷款期限:" prop="lapLoanDate">
                    <el-select v-model="form.lapLoanDate" placeholder="请选择">
                        <el-option label="6个月以内（含）" value="6个月以内（含）"></el-option>
                        <el-option label="6个月-1年（含）" value="6个月-1年（含）"></el-option>
                        <el-option label="1-3年（含）" value="1-3年（含）"></el-option>
                        <el-option label="3-5年（含）" value="3-5年（含）"></el-option>
                        <el-option label="5年以上" value="5年以上"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="贷款用途:" prop="lapLoanUserd">
                    <el-select v-model="form.lapLoanUserd" placeholder="请选择">
                        <el-option label="经营周转" value="经营周转"></el-option>
                        <el-option label="技术改造" value="技术改造"></el-option>
                        <el-option label="购置厂房" value="购置厂房"></el-option>
                        <el-option label="新项目投资" value="新项目投资"></el-option>
                        <el-option label="开设营业网点" value="开设营业网点"></el-option>
                        <el-option label="其他" value="其他"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="可提供担保方式:" prop="lapAssureMeans">
                    <el-select v-model="form.lapAssureMeans" placeholder="请选择">
                        <el-option label="抵押" value="抵押"></el-option>
                        <el-option label="质押" value="质押"></el-option>
                        <el-option label="保证" value="保证"></el-option>
                        <el-option label="无担保" value="无担保"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="币种:" prop="lapCurrency">
                    <el-select v-model="form.lapCurrency" style="width:200px" placeholder="请选择">
                        <el-option v-for="item in $tools.dict.currTypeList" :key="item.key" :label="item.currType" :value="item.key"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="授信申报所在行:">
                    <el-select v-model="form.branchItem" placeholder="请选择">
                        <el-option v-for="item in branchInfoList" :key="item.brhId" :label="item.brhName" :value="item.brhId+'-'+item.brhName"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div class="btnArea mt20 tac">
                <el-button type="primary" @click="submitForm()">提交结果</el-button>
                <el-button @click="resetForm()">重置</el-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'loanBasicInfo',
    components: {

    },
    data() {
        return {
            trades: '',
            type: '',
            form: {
                lapCstName: this.$tools.storage.get("user", "save").cstCN,
                lapOrgacode: this.$tools.storage.get("user", "save").cstCertNo,
                lapBusAddress: this.$tools.storage.get("user", "save").cstAddress,
                lapTrade: '',
                lapLegalName: this.$tools.storage.get("user", "save").legalName,
                lapLegalCertType: this.$tools.storage.get("user", "save").legalCertType,
                lapLegalCertNo: this.$tools.storage.get("user", "save").legalCertNo,
                bsnCode: 'CB0601',
                cstNo: this.$tools.storage.get("user", "save").cstNo,
                lapLinkName: '',
                lapLinkPhone: '',
                lapSaleYear: '',
                lapProfitYear: '',
                lapAmount: '',
                lapLoanDate: '',
                lapLoanUserd: '',
                lapAssureMeans: '',
                lapCurrency: '',
                branchItem: '',
                lapApplyBranch: '',
                lapApplyBranchName: ''
            },
            rules1: {
                lapLoanDate: [
                    { message: '请选择贷款期限', trigger: 'change', required: true }
                ],
                lapAmount: [
                    { message: '请输入贷款金额', trigger: 'blur', required: true }
                ],
                trades: [
                    { message: '请选择行业', trigger: 'change', required: true }
                ],
                lapAssureMeans: [
                    { message: '请选择担保方式', trigger: 'change', required: true }
                ],
                lapProfitYear: [
                    { message: '请选择年底净利润', trigger: 'change', required: true }
                ],
                lapLinkName: [
                    { message: '联系人姓名不能为空', trigger: 'blur', required: true },
                    { validator: this.$tools.validator.isCnEngNum, trigger: 'blur', },
                ],
                lapLinkPhone: [
                    { required: true, message: '请输入手机号码', trigger: 'blur' },
                    { min: 11, max: 11, message: '长度在11个字符', trigger: 'blur' },
                    { validator: this.validatorNumber, trigger: 'blur' }
                ],
                lapSaleYear: [
                    { message: '请输入上年度营销收入', trigger: 'blur', required: true }
                ],
                lapCurrency: [
                    { message: '请选择币种', trigger: 'change', required: true }
                ],
                lapLoanUserd: [
                    { message: '请选择贷款用途', trigger: 'change', required: true }
                ],
            },
            branchInfoList: []
        }
    },
    props: {
        formData: { type: Object, default: {} },
    },
    methods: {
        submitForm() {
            let _this = this
            _this.$refs['form'].validate((valid) => {
                if (valid) {
                    let _branchItem = _this.form.branchItem
                    _this.form.lapApplyBranch = _branchItem.split('-')[0]
                    _this.form.lapApplyBranchName = _branchItem.split('-')[1]
                    console.log(_this.form, '_this.form')
                    _this.$emit("changeStep", "1", $.extend({}, _this.form))
                } else {
                    console.log('error submit!!')
                    return false
                }
            });
        },
        resetForm() {
            let _this = this
            _this.$refs['form'].resetFields()
            _this.form.lapLoanUserd = ''
        },
        validatorNumber(rule, value, callback) {
            let _this = this
            if (!_this.$tools.validator.isNumber(value)) return callback("请输入数字")
            if (!_this.$tools.validator.isPhone(value)) return callback("请输入正确格式手机号码")
            callback()
        },
        getCstInfo() {
            let _this = this
            let body = {}
            body.hostNo = this.$tools.storage.get("user", "save").hostNo,
                _this.$tools.request(this, "CB000018.do", body).then(data => {
                    let _form = data.body
                    _this.form.lapBusAddress = _form.addrInfoArray[0].cstAddr01
                    _this.form.lapCstName = _form.cstBscInfoArray[0] ? form.cstBscInfoArray[0].namecn : this.$tools.storage.get("user", "save").cstCN
                    _this.form.lapOrgacode = _form.idenInfoArray[0].idenNo
                    _this.form.lapLegalName = _form.contactsInfoArray[0].coName
                    _this.form.lapLegalCertType = _form.contactsInfoArray[0].coCertType
                    _this.form.lapLegalCertNo = _form.contactsInfoArray[0].coCertNo
                    _this.form.lapTrade = _form.cstBscInfoArray[0] ? form.cstBscInfoArray[0].trade : ''
                })
        },
        getbranchInfoList() {
            //查询所有机构
            this.$tools.request(this, "CB000111.do").then(data => {
                this.branchInfoList = data.body.branchInfoList
                // let _branchInfoList = data.body.branchInfoList
                // let _tableData = []
                // for (let i = 0; i < _branchInfoList.length; i++) {
                //     if (_branchInfoList[i].brhLevel == "1") {
                //         _tableData.push(_branchInfoList[i])
                //     }
                // }
                // //console.log(_tableData)
                // for (let j = 0; j < _tableData.length; j++) {
                //     let brhId = _tableData[j].brhId
                //     let childrens = []
                //     for (let k = 0; k < _branchInfoList.length; k++) {
                //         if (brhId == _branchInfoList[k].brhParentId) {
                //             childrens.push(_branchInfoList[k])
                //             _tableData[j].childrens = childrens
                //         }
                //     }
                // }
                // for (let l = 0; l < _tableData.length; l++) {
                //     for (let x = 0; x < _tableData[l].childrens.length; x++) {
                //         let brhId1 = _tableData[l].childrens[x].brhId
                //         let childrens1 = []
                //         for (let y = 0; y < _branchInfoList.length; y++) {
                //             if (brhId1 == _branchInfoList[y].brhParentId) {
                //                 childrens1.push(_branchInfoList[y])
                //                 _tableData[l].childrens[x].childrens = childrens1
                //             }
                //         }
                //     }
                // }
                // this.branchInfoList = _tableData
                // this.branchTableVisible = true
            })
        }
    },
    mounted() {
        this.getCstInfo()
        this.getbranchInfoList()
        if (this.formData.lapCstName && !this.formData.clear) {
            this.form = this.formData
        }
        if (this.formData.clear) {
            this.form = {
                lapCstName: this.$tools.storage.get("user", "save").cstCN,
                lapOrgacode: this.$tools.storage.get("user", "save").cstCertNo,
                lapBusAddress: this.$tools.storage.get("user", "save").cstAddress,
                lapTrade: '',
                lapLegalName: this.$tools.storage.get("user", "save").legalName,
                lapLegalCertType: this.$tools.storage.get("user", "save").legalCertType,
                lapLegalCertNo: this.$tools.storage.get("user", "save").legalCertNo,
                bsnCode: 'CB0601',
                cstNo: this.$tools.storage.get("user", "save").cstNo,
                lapLinkName: '',
                lapLinkPhone: '',
                lapSaleYear: '',
                lapProfitYear: '',
                lapAmount: '',
                lapLoanDate: '',
                lapLoanUserd: '',
                lapAssureMeans: '',
                lapCurrency: '',
                lapApplyBranch: '',
                lapApplyBranch1: '',
            }
        }
    }
}
</script>
<style>
.loanBasicinfo .el-select {
    display: inline;
}
</style>

