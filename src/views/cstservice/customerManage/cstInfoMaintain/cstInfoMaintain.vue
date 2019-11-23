<template>
    <div class="main-content">
        <!--面包屑-->
        <ynet-breadcrumb></ynet-breadcrumb>
        <!--面包屑--end-->
        <ynet-content id="customInfo" :headerInformation="true" :headerMenu="true" class="functionalArea">
            <h3 class="functionalAreaTitle">企业基本信息维护</h3>
            <div class="p20">
                <div class="fourForm tableForm" v-show="stepIndex==0">
                    <el-form :model="tableData" ref="tableData" class="formEmbedTable">
                        <table>
                            <caption>企业基本信息</caption>
                            <!--<tr>
                                                                                                <td>核心客户号：</td>
                                                                                                <td>
                                                                                                    <el-form-item>
                                                                                                        {{ tableData.hostNo }}
                                                                                                    </el-form-item>
                                                                                                </td>
                                                                                                <td>网银客户号：</td>
                                                                                                <td>
                                                                                                    <el-form-item>
                                                                                                        {{ tableData.cstNo}}
                                                                                                    </el-form-item>
                                                                                                </td>
                                                                                            </tr>-->
                            <tr>
                                <td>企业名称：</td>
                                <td>
                                    {{ tableData.namecn }}
                                </td>
                                <td>法人姓名：</td>
                                <td>
                                    {{tableData.legal }}
                                </td>
                            </tr>
                            <tr>
                                <td>企业证件类型：</td>
                                <td>
                                    {{ $tools.dict.certTypeDict(tableData.certType)}}
                                </td>
                                <td>企业证件号码：</td>
                                <td>
                                    {{tableData.certNo }}
                                </td>
                            </tr>
                            <!--<tr>
                                            <td>企业英文名称：</td>
                                            <td>
                                                <el-form-item>
                                                    {{ tableData.nameen }}
                                                </el-form-item>
                                            </td>
                                            <td>英文地址：</td>
                                            <td>
                                                <el-form-item>
                                                    {{tableData.addressEn}}
                                                </el-form-item>
                                            </td>
                                        </tr>-->
                            <tr>
                                <td>通信地址：</td>
                                <td>
                                    {{tableData.address}}
                                </td>
                                <td>邮编：</td>
                                <td>
                                    {{tableData.zipcode}}
                                </td>
                            </tr>
                            <tr>
                                <td>企业联系电话：</td>
                                <td>
                                    {{tableData.phone}}
                                </td>
                                <td>企业电子邮箱：</td>
                                <td>
                                    {{tableData.email}}
                                </td>
                            </tr>
                            <tr>
                                <td>经办人：</td>
                                <td>
                                    {{tableData.coname}}
                                </td>
                                <td>经办人电话：</td>
                                <td>
                                    {{tableData.coPhone}}
                                </td>
                            </tr>
                            <tr>
                                <td>客户经理:</td>
                                <td>
                                    {{tableData.mName}}
                                </td>
                                <td>客户经理电话：</td>
                                <td>
                                    {{tableData.mMobile}}
                                </td>
                            </tr>
                            <!--<tr>
                                            <td>推荐人工号：</td>
                                            <td>
                                                <el-form-item>
                                                    {{ tableData.refereeCode}}
                                                </el-form-item>
                                            </td>
                                            <td>推荐人姓名：</td>
                                            <td>
                                                <el-form-item>
                                                    {{ tableData.refereeName }}
                                                </el-form-item>
                                            </td>
                                        </tr>-->
                            <tr>
                                <td>企业归属网点号：</td>
                                <td>
                                    {{ tableData.openBranchNo }}
                                </td>
                                <td>业务归属网点名称：</td>
                                <td>
                                    {{ tableData.openBranchName }}
                                </td>
                            </tr>
                        </table>
                    </el-form>
                    <div class="btnArea mt20 tac">
                        <el-button type="primary" @click="toEdit()">修改</el-button>
                        <el-button type="primary" @click="$router.push('/my/myMain')">返回</el-button>
                    </div>
                </div>

                <div class="fourForm tableForm" v-show="stepIndex==1">
                    <el-form :model="form" ref="form" class="formEmbedTable" :rules="rules">
                        <table>
                            <caption>企业基本信息</caption>
                            <!--<tr>
                                        <td>核心客户号：</td>
                                        <td>
                                            <el-form-item>
                                                {{ form.hostNo }}
                                            </el-form-item>
                                        </td>
                                        <td>网银客户号：</td>
                                        <td>
                                            <el-form-item>
                                                {{ form.cstNo}}
                                            </el-form-item>
                                        </td>
                                    </tr>-->
                            <tr>
                                <td>企业名称：</td>
                                <td>
                                    {{ form.namecn }}
                                </td>
                                <td>法人姓名：</td>
                                <td>
                                    {{form.legal }}
                                </td>
                            </tr>
                            <tr>
                                <td>企业证件类型：</td>
                                <td>
                                    {{ $tools.dict.certTypeDict(form.certType)}}
                                </td>
                                <td>企业证件号码：</td>
                                <td>
                                    {{form.certNo }}
                                </td>
                            </tr>
                            <!--<tr>
                                        <td>企业英文名称：</td>
                                        <td>
                                            <el-form-item>
                                                {{ form.nameen }}
                                            </el-form-item>
                                        </td>
                                        <td>英文地址：</td>
                                        <td>
                                            <el-form-item>
                                                {{form.addressEn}}
                                            </el-form-item>
                                        </td>
                                    </tr>-->
                            <tr>
                                <td>通信地址：</td>
                                <td>
                                    <el-form-item prop="address">
                                        <el-input v-model="form.userAddress"></el-input>
                                    </el-form-item>
                                </td>
                                <td>邮编：</td>
                                <td>
                                    <el-form-item ref="zipcode" prop="zipcode">
                                        <el-input v-model="form.userZipCode"></el-input>
                                    </el-form-item>
                                </td>
                            </tr>
                            <tr>
                                <td>企业联系电话：</td>
                                <td>
                                    {{form.phone}}
                                </td>
                                <td>企业电子邮箱：</td>
                                <td>
                                    {{form.email}}
                                </td>
                            </tr>
                            <tr>
                                <td>经办人：</td>
                                <td>
                                    {{form.coname}}
                                </td>
                                <td>经办人电话：</td>
                                <td>
                                    {{form.coPhone}}
                                </td>
                            </tr>
                            <tr>
                                <td>客户经理:</td>
                                <td>
                                    {{form.mName}}
                                </td>
                                <td>客户经理电话：</td>
                                <td>
                                    {{form.mMobile}}
                                </td>
                            </tr>
                            <tr>
                                <td>企业归属网点号：</td>
                                <td>
                                    {{ form.openBranchNo }}
                                </td>
                                <td>业务归属网点名称：</td>
                                <td>
                                    {{ form.openBranchName }}
                                </td>
                            </tr>
                        </table>
                    </el-form>
                    <div class="btnArea mt20 tac">
                        <el-button type="primary" @click="uKeySubmit()">确定</el-button>
                        <el-button type="primary" @click="stepIndex=0">返回</el-button>
                    </div>
                </div>
                <!-- 溫馨提示 -->
                <ynet-warm-tips :items="warmTips"></ynet-warm-tips>
                <!-- 溫馨提示end -->
            </div>

        </ynet-content>
    </div>
</template>

<script>
export default {
    name: 'customInfo',
    components: {
    },
    data() {
        return {
        warmTips:[
          '1.管理员可以修改通信地址、邮编。',
          '2.企业信息修改暂不支持特殊字符，若您录入特殊字符，系统会提示您重新录入。',
        ],
            stepIndex: 0,
            tableData: {},//初始化数据
            form: {},//修改数据
            signData: '',
            rules: {
                address: [
                    // { required: true, message: '请输入通信地址', trigger: 'blur' },
                ],
                zipcode: [
                    // { required: true, message: '请输入邮编', trigger: 'blur' },
                    { validator: this.$tools.validator.isZipCode, trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        toEdit() {
            let _this = this
            _this.form = $.extend({}, _this.tableData)
            _this.form.userZipCode = _this.tableData.zipcode
            _this.form.userAddress = _this.tableData.address
            _this.stepIndex = 1
        },
        uKeySubmit() {
            let _this = this
            let userStorge = _this.$tools.storage.get("user", "save")
            let cstNo = userStorge.cstNo
            let userNo = userStorge.eCIFID
            let newDate = [{ key: 'cstNo', value: cstNo },
            { key: 'userNo', value: userNo },]
            let siDate = JSON.stringify(newDate);
            let certNo = userStorge.serialNo
            let ukeyNo = userStorge.uKeySn
            let arrAcc = ["操作类型:", "企业信息维护"]
            let arrAmt = ["企业名称:", userStorge.cstCN]
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
            _this.submitForm()
        },
        submitForm() {
            let _this = this
            _this.$refs.form.validate((valid) => {
                if (valid) {
                    let body = {}
                    body.signedData = _this.signData
                    body.userZipCode = _this.form.userZipCode
                    body.userAddress = _this.form.userAddress
                    this.$tools.request(this, "CB08080102.do", body).then(data => {
                        if (data.body.errorCode == 0) {
                            _this.$alert('修改成功', '温馨提示', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    _this.initData()
                                    _this.stepIndex = 0
                                }
                            });
                        } else {
                            _this.$alert(data.body.errorMsg, '温馨提示', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    _this.initData()
                                    _this.stepIndex = 0
                                }
                            });
                        }
                    })
                }
            })
        },
        initData() {
            let _this = this
            let body = {}
            this.$tools.request(this, "CB08080101.do", body).then(data => {
                _this.tableData = data.body.queryCstInfoList[0]
                _this.tableData.namecn = this.$tools.validator.unescapeHTML(_this.tableData.namecn)
                _this.tableData.address = this.$tools.validator.unescapeHTML(_this.tableData.address)
            })
        },
    },
    mounted() {
        let _this = this
        _this.initData()
    }
}
</script>