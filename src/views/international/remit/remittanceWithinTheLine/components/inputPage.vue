<template>
    <div class="inputPage" v-if="!(dialogVisible||dialogVisible1)">
        <!--4格布局table-->
        <div class="fourForm tableForm mt20">
            <h3>汇款信息</h3>
            <el-form ref="form1" :model="form1" :rules="rules1">
                <el-row>
                    <el-form-item label="汇款人称及地址：" prop="nameAndAddress" class="fullLine">
                        <el-radio-group v-model="form1.nameAndAddress">
                            <el-radio :label="1">
                                中文名称：
                                <el-input v-model="form1.cName" size="5"></el-input>
                                中文地址：
                                <el-input v-model="form1.cAddress" size="5"></el-input>
                            </el-radio>
                            <br>
                            <el-radio :label="2">
                                英文名称：
                                <el-input v-model="form1.eName" size="5"></el-input>
                                英文地址：
                                <el-input v-model="form1.eAddress" size="5"></el-input>
                            </el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item label="收款人常驻国家（地区）名称及代码：" prop="areaCode">
                        <el-input v-model="form1.areaCode" size="small"></el-input>
                        <a @click="selectCountry">选择</a>
                    </el-form-item>
                    <el-form-item label="汇款币种：" prop="currency">
                        <el-select v-model="form1.currency" placeholder="请选择币种">
                            <el-option value="USD美元"></el-option>
                        </el-select>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item label="汇款金额：" prop="amount">
                        <ynet-currency-input ref="amount" v-model="form1.amount" @currency-blur="currentBlur" :showChinese="false"></ynet-currency-input>
                    </el-form-item>
                    <el-form-item label="大写金额：">
                        {{$tools.utils.toChinese($tools.utils.currencyFormat(form1.amount))}}
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item label="现汇金额：" prop="cashAmount">
                        <ynet-currency-input ref="cashAmount" v-model="form1.cashAmount" @currency-blur="currentBlur" :showChinese="false" :disabled="cashAmountFlag"></ynet-currency-input>{{form1.currency}}
                        <!--<el-input  v-model="form.cashAmount" :disabled="cashAmountFlag"></el-input>{{form.currency}}-->
                    </el-form-item>
                    <el-form-item label="现汇账号：" prop="cashAccount">
                        <el-select v-model="form1.cashAccount" placeholder="请选择账号">
                            <el-option v-for="itemCash in optionsCash" :label="itemCash.accNo+itemCash.accName" :value="itemCash.amount" :key="itemCash.amount"></el-option>
                        </el-select>
                        {{form1.cashAccount}}
                    </el-form-item>
                </el-row>
                <el-row>

                    <el-form-item label="购汇金额：" prop="exchangeAmount">
                        <ynet-currency-input ref="exchangeAmount" v-model="form1.exchangeAmount" @currency-blur="currentBlur" :showChinese="false" :disabled="exchangeAmountFlag"></ynet-currency-input>{{form1.currency}}
                        <!--<el-input  v-model="form.exchangeAmount" :disabled="exchangeAmountFlag"></el-input>{{form.currency}}-->
                    </el-form-item>
                    <el-form-item label="购汇账号：" prop="exchangeAccount">
                        <el-select v-model="form1.exchangeAccount" placeholder="请选择账号" :disabled="exchangeAccountFlag">
                            <!--<el-option label="账号1" value="z1"></el-option>
                                                                                                                                        <el-option label="账号2" value="z2"></el-option>-->
                            <el-option v-for="itemExchange in optionsExchange" :label="itemExchange.accNo+itemExchange.accName" :value="itemExchange.amount" :key="itemExchange.amount"></el-option>
                        </el-select>
                        {{form1.exchangeAccount}}
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item label="其他金额：" prop="otherAmount">
                        <ynet-currency-input ref="otherAmount" v-model="form1.otherAmount" @currency-blur="currentBlur" :showChinese="false" :disabled="otherAmountFlag"></ynet-currency-input>{{form1.currency}}
                        <!--<el-input  v-model="form.otherAmount" :disabled="otherAmountFlag"></el-input>{{form.currency}}-->
                    </el-form-item>
                    <el-form-item label="其他账号：" prop="otherAccount">
                        <el-select v-model="form1.otherAccount" placeholder="请选择账号" :disabled="otherAccountFlag">
                            <el-option v-for="itemOther in optionsOther" :label="itemOther.accNo+itemOther.accName" :value="itemOther.amount" :key="itemOther.amount"></el-option>
                        </el-select>
                        {{form1.otherAccount}}
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item label="国内外费用承担方式：" prop="type" class="fullLine">
                        <el-select v-model="form1.type" placeholder="请选择方式">
                            <el-option label="测试1" value="z1"></el-option>
                            <el-option label="测试2" value="z2"></el-option>
                        </el-select>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item label="合同号：" prop="contractNo">
                        <el-input v-model="form1.contractNo" size="small"></el-input>
                    </el-form-item>
                    <el-form-item label="发票号：" prop="invoiceNo">
                        <el-input v-model="form1.invoiceNo" size="small"></el-input>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item label="款项性质：" prop="natureOfMoney">
                        <el-select v-model="form1.natureOfMoney" placeholder="请选择账号">
                            <el-option label="账号1" value="z1"></el-option>
                            <el-option label="账号2" value="z2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="付汇性质：" prop="propertiesOfRemittance">
                        <el-select v-model="form1.propertiesOfRemittance" placeholder="请选择账号">
                            <el-option label="账号1" value="z1"></el-option>
                            <el-option label="账号2" value="z2"></el-option>
                        </el-select>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item label="本笔款项是否为保税货物项下付款：" prop="flag">
                        <el-select v-model="form1.flag" placeholder="请选择">
                            <el-option label="是" value="true"></el-option>
                            <el-option label="否" value="false"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="外汇局批号件/备案表号/业务编号：" prop="serviceNo">
                        <el-input v-model="form1.serviceNo" size="small"></el-input>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item label="交易编码1：" prop="code1">
                        <el-input v-model="form1.code1" size="small"></el-input>
                        <a @click="selectCode">选择</a>
                    </el-form-item>
                    <el-form-item label="相应金额：" prop="money1">
                        <el-input v-model="form1.money1" size="small"></el-input>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item label="交易附言1：" prop="postscript1" class="fullLine">
                        <el-input v-model="form1.postscript1" size="small"></el-input>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item label="交易编码2：" prop="code2">
                        <el-input v-model="form1.code2" size="small"></el-input>
                        <a @click="selectCode">选择</a>
                    </el-form-item>
                    <el-form-item label="相应金额：" prop="money2">
                        <el-input v-model="form1.money2" size="small"></el-input>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item label="交易附言2：" prop="postscript2" class="fullLine">
                        <el-input v-model="form1.postscript2" size="small"></el-input>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item label="汇款附言：" prop="text" class="fullLine">
                        <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="form1.text"></el-input>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item label="汇款备注：" prop="ps" class="fullLine">
                        <el-input type="textarea" :rows="2" placeholder="该栏为业务标注信息，不会发送给对方客户" v-model="form1.ps"></el-input>
                    </el-form-item>
                </el-row>
            </el-form>
        </div>
        <!--4格布局table--end-->
        <!--4格布局table-->
        <div class="fourForm tableForm mt20">
            <h3>收款人信息</h3>
            <el-form ref="form2" :model="form2" :rules="rules2">
                <el-row>
                    <el-form-item label="收款人账号：" prop="account1" class="fullLine">
                        <el-input v-model="form2.account1" size="small"></el-input>
                    </el-form-item>

                </el-row>
                <el-row>
                    <el-form-item label="收款人名称及地址：" prop="nameAndAddress1" class="fullLine">
                        <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="form2.nameAndAddress1"></el-input>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item label="保存收款人：" class="fullLine">
                        <el-checkbox v-model="form2.checked"></el-checkbox>
                    </el-form-item>
                </el-row>
            </el-form>
        </div>
        <!--4格布局table--end-->
        <!--4格布局table-->
        <div class="fourForm tableForm mt20">
            <h3>增加附件(附件：JPG格式图片，最佳不要超过800KB)</h3>
            <el-form ref="form3" :model="form3" :rules="rules3">
                <el-row>
                    <el-form-item label="添加附件" class="fullLine">
                        <el-upload class="upload-demo" ref="upload" action="https://127.0.0.1/8080/soa_businessService/src/images/" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList" :auto-upload="false">
                            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                        </el-upload>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="form3.text">
                    </el-input>
                </el-row>
            </el-form>
            <!-- 按钮 -->
            <div class="btnArea mt20 tac">
                <el-button type="primary" @click="nextStep()">下一步</el-button>
                <el-button @click="resetForm()">重置</el-button>
            </div>
            <!-- 按钮end -->
        </div>
        <!--4格布局table--end-->
        </el-form>
        <!--温馨提示-->
        <ynet-warm-tips :items="warmTips"></ynet-warm-tips>
        <!--温馨提示--end-->
    </div>
    </div>
    <!-- 选择国家 -->
    <div v-else-if="dialogVisible">
        <el-dialog title="选择国家" :visible.sync="dialogVisible" size="large">
            <SelectCountry @selectCountry1="selectCountry1"></SelectCountry>
            <span slot="footer" class="ghb-integration-dialog-footer">
                <el-button @click="dialogVisible=false">关闭</el-button>
            </span>
        </el-dialog>
    </div>
    <!-- 选择国家end -->
    <!-- 交易编码 -->
    <div v-else-if="dialogVisible1">
        <el-dialog title="交易编码" :visible.sync="dialogVisible1" size="large">
            <SelectCode @selectCode1="selectCode1"></SelectCode>
            <span slot="footer" class="ghb-integration-dialog-footer">
                <el-button @click="dialogVisible1=false">关闭</el-button>
            </span>
        </el-dialog>
    </div>
    <!-- 交易编码end -->
</template>
<script>
import Panel from '@src/components/panel'
import Global from '@src/components/global'   //温馨提示和进度条的文字说明
import SelectCountry from '../components/selectCountry' //国家选择组建
import SelectCode from '../components/selectCode' //国家选择组建
export default {
    name: 'inputPage',
    components: {
        Panel,
        SelectCountry,
        SelectCode
    },
    data() {
        return {
            Global,
            dialogVisible: false,
            dialogVisible1: false,
            cashAmountFlag: true,
            exchangeAmountFlag: true,
            exchangeAccountFlag: true,
            otherAmountFlag: true,
            otherAccountFlag: true,
            warmTips: [
                '1.带“*”的输入项为必输项；',
                '2.如有任何疑问，请随时拨打客服电话与我们联系。'],
            form1: {
                nameAndAddress: 1,
                cName: "",
                cAddress: "",
                eName: "",
                eAddress: "",
                areaCode: "",
                currency: "USD美元",
                amount: '',
                cashAmount: '',
                cashAccount: '',
                exchangeAmount: '',
                exchangeAccount: "",
                otherAmount: '',
                otherAccount: "",
                type: "",
                contractNo: "",
                invoiceNo: "",
                natureOfMoney: "",
                propertiesOfRemittance: "",
                flag: "",
                serviceNo: "",
                code1: "",
                money1: "",
                postscript1: "",
                code2: "",
                money2: "",
                postscript2: "",
                text: "",
                ps: "",
            },
            form2: {
                account1: "",
                nameAndAddress1: "",
                checked: "",
            },
            form3: {
                text: "",
            },
            optionsCash: [],
            optionsExchange: [],
            optionsOther: [],
            itemCash: {},
            itemExchange: {},
            itemOther: {},
            // form1:{},
            fileList: [],
            rules1: {
                areaCode: [
                    { required: true, message: '请输入收款人常驻国家（地区）名称及代码', trigger: 'blur' }
                ],
                currency: [
                    { required: true, message: '汇款币种', trigger: 'change' }
                ],
                amount: [
                    { required: true, validator: this.validatorAmount, trigger: 'blur' }
                ],
                cashAmount: [
                    { validator: this.validatorCashAmount, trigger: 'blur' }
                ],
                cashAccount: [
                    { validator: this.validatorCashAccount, trigger: 'change' }
                ],
                exchangeAmount: [
                    { validator: this.validatorExchangeAmount, trigger: 'blur' }
                ],
                exchangeAccount: [
                    { validator: this.validatorExchangeAccount, trigger: 'change' }
                ],
                otherAmount: [
                    { validator: this.validatorOtherAmount, trigger: 'change' }
                ],
                otherAccount: [
                    { validator: this.validatorOtherAccount, trigger: 'change' }
                ],
                type: [
                    { required: true, message: '请选择', trigger: 'blur' }
                ],
                natureOfMoney: [
                    { required: true, message: '请选择', trigger: 'change' }
                ],
                propertiesOfRemittance: [
                    { required: true, message: '请选择', trigger: 'change' }
                ],
                flag: [
                    { required: true, message: '请选择', trigger: 'change' }
                ],
                text: [
                    { required: true, message: '请录入附言', trigger: 'blur' }
                ],
            },
            rules2: {
                account1: [
                    { required: true, message: '请录入收款人账评选sondxi号', trigger: 'blur' }
                ],
                nameAndAddress1: [
                    { required: true, message: '收款人名称及地址', trigger: 'blur' }
                ],
            },
            rules3: {

            },
            form1Validate: false,
            form2Validate: false
        }
    },
    methods: {
        nextStep() {
            let _this = this
            _this.$refs['form1'].validate((valid) => {
                if (valid) {
                    _this.form1Validate = true
                } else {
                    console.log('1 error submit!!')
                    return false
                }
            });
            _this.$refs['form2'].validate((valid) => {
                if (valid) {
                    if (_this.form1Validate) _this.form2Validate = true
                } else {
                    console.log('2 error submit!!')
                    return false
                }
            });
            _this.$refs['form3'].validate((valid) => {
                if (valid) {
                    if (_this.form1Validate) 
                    if (_this.form2Validate) _this.$emit("changeStep", "1", $.extend({}, _this.form1, _this.form2,_this.form3))
                } else {
                    console.log('error submit!!')
                    return false
                }
            });
        },
        resetForm() {
            let _this = this
            _this.$refs['form'].resetFields();
            _this.cashAmountFlag = true
            _this.exchangeAccountFlag = true
            _this.exchangeAmountFlag = true
            _this.otherAccountFlag = true
            _this.otherAmountFlag = true
        },
        currentBlur(val) {   //金额控件失焦事件
            console.log(val)
        },
        submitUpload() {
            this.$refs.upload.submit();
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        selectCountry() {
            let _this = this
            _this.dialogVisible = true

        },
        selectCountry1(val) {
            let _this = this
            if (val != null) {
                _this.form1.areaCode = val.countryName

            }
        },
        selectCode() {
            let _this = this
            _this.dialogVisible1 = true
        },
        selectCode1() {
            let _this = this
            if (val != null) {


            }
        },
        validatorAmount(rule, value, callback) {

        },
        validatorCashAccount(rule, value, callback) {

        },
        validatorCashAmount(rule, value, callback) {

        },
        validatorExchangeAccount(rule, value, callback) {

        },
        validatorExchangeAmount(rule, value, callback) {

        },
        validatorOtherAccount(rule, value, callback) {

        },
        validatorOtherAmount(rule, value, callback) {

        },
    },
    mounted() {
        let _this = this
        _this.$tools.storage.set("account",{
    "body":[{
        
            "accNo": 101,
            "accName":"zhanghao1",
            "amount":100
        },{
        
            "accNo": 102,
            "accName":"zhanghao2",
            "amount":200
        }
        
    ]
})
        // _this.$tools.request(_this, "searchMoney.do").then(
        //     data => {
        //         //if(data.body.account)
        //         _this.optionsCash = sessionStorage.storageaccount
        //     }
        // )
        _this.optionsCash = _this.$tools.storage.get("account").body
    }
}
</script>