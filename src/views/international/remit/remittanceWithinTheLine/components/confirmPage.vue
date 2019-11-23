<template>
    <el-form>
        <div class="main-container container-border">
            <div class="tableData p20">
                <table>
                    <tr>
                        <th>汇款人名称及地址：</th>
                        <td v-if="form.nameAndAddress==1" colspan="3">中文名称：{{form.cName}} 中文地址：{{form.cAddress}}</td>
                        <td v-if="form.nameAndAddress==2" colspan="3">英文名称：{{form.eName}} 英文地址：{{form.eAddress}}</td>
                    </tr>
                    <tr>
                        <th>收款人常驻国家（地区）名称及代码：</th>
                        <td>{{form.areaCode}}</td>
                        <th>汇款币种：</th>
                        <td>{{form.currency}}</td>
                    </tr>
                    <tr>
                        <th>汇款金额：</th>
                        <td>{{form.account}}</td>
                        <th>大写金额：</th>
                        <td>{{$tools.utils.toChinese($tools.utils.currencyFormat(form.account))}}</td>
                    </tr>
                    <tr>
                        <th>现汇金额：</th>
                        <td>{{form.cashAmount}}</td>
                        <th>现汇账号：</th>
                        <td>{{form.cashAccount}}</td>
                    </tr>
                    <tr>
                        <th>购汇金额：</th>
                        <td>{{form.exchangeAmount}}</td>
                        <th>购汇账号：</th>
                        <td>{{form.foreignCurrencyAccount}}</td>
                    </tr>
                    <tr>
                        <th>其他金额：</th>
                        <td>{{form.otherAmount}}</td>
                        <th>其他账号：</th>
                        <td>{{form.otherAccount}}</td>
                    </tr>
                    <tr>
                        <th>国内外费用承担方式：</th>
                        <td>{{form.type}}</td>
                    </tr>
                    <tr>
                        <th>合同号：</th>
                        <td>{{form.contractNo}}</td>
                        <th>发票号：</th>
                        <td>{{form.invoiceNo}}</td>
                    </tr>
                     <tr>
                        <th>款项性质：</th>
                        <td>{{form.natureOfMoney}}</td>
                        <th>付汇性质：</th>
                        <td>{{form.propertiesOfRemittance}}</td>
                    </tr>
                    <tr>
                        <th>本笔款项是否为保税货物项下付款：</th>
                        <td>{{form.flag}}</td>
                        <th>外汇局批号件/备案表号/业务编号：</th>
                        <td>{{form.serviceNo}}</td>
                    </tr>
                    <tr>
                        <th>交易编码1：</th>
                        <td>{{form.code1}}</td>
                        <th>相应金额：</th>
                        <td>{{form.money1}}</td>
                    </tr>
                    <tr>
                        <th>交易附言1：</th>
                        <td>{{form.postscript1}}</td>
                    </tr>
                    <tr>
                        <th>交易编码2：</th>
                        <td>{{form.code2}}</td>
                        <th>相应金额：</th>
                        <td>{{form.money2}}</td>
                    </tr>
                    <tr>
                        <th>交易附言2：</th>
                        <td>{{form.postscript2}}</td>
                    </tr>
                    <tr>
                        <th>汇款附言：</th>
                        <td colspan="3">{{form.text}}</td>
                    </tr>
                    <tr>
                        <th>汇款备注：</th>
                        <td colspan="3">{{form.text}}</td>
                    </tr>
                    <tr>
                        <th>收款人账号：</th>
                        <td colspan="3">{{form.account1}}</td>
                    </tr>
                    <tr>
                        <th>收款人名称及地址：</th>
                        <td colspan="3">{{form.nameAndAddress1}}</td>
                    </tr>
                </table>
            </div>
            <el-form-item class="tac formBtnArea">
                <el-button type="primary" @click="previousStep">上一步</el-button>
                <el-button type="primary" @click="nextStep">下一步</el-button>
            </el-form-item>
        </div>
    </el-form>
</template>
<script>
    export default{
        name:'confirmPage',
        components:{

        },
        props:{
            form:Object
        },
        data(){
            return{
            }
        },
        methods:{
            nextStep(){
                let _this = this
                _this.$emit("step",2)
            },
            previousStep(){
                let _this = this
                _this.$emit("step",0)
            }
        },
        mounted(){
            let _this = this

            _this.$tools.storage.set("bbb", this.form)
        }
    }
</script>