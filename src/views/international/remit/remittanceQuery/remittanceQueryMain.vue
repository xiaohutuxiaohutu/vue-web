<template>
    <ynet-content id="remittanceWithinTheLineMain" class="main-content" :headerInformation="true" :headerMenu="true">
        <!--面包屑-->
        <ynet-breadcrumb></ynet-breadcrumb>
        <!--面包屑--end-->
        <!-- 功能区 -->
        <div class="functionalArea">
            <h3 class="functionalAreaTitle">行内汇出汇款</h3>
            <div class="p20">
                <!--2格布局table-->
                <div class="twoForm tableForm mt20">
                    <el-form ref="form1" :model="form1" :rules="rules1">
                        <h3>填写查询信息</h3>
                        <el-form-item label="收款人：" prop="payee">
                            <el-input v-model="form1.payee" size="small"></el-input>
                        </el-form-item>
                        <el-form-item label="收款行：" prop="receivingBank">
                            <el-input v-model="form1.receivingBank" size="small"></el-input>
                        </el-form-item>
                        <el-form-item label="币种：" prop="currency" class="fullLine">
                            <el-select v-model="form1.currency" placeholder="--请选择--">
                                <el-option value="USD美元"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="金额范围：" required>
                            <ynet-currency-input ref="amount1" v-model="form1.amount1" @currency-blur="currentBlur" :showChinese="false"></ynet-currency-input> 至
                            <ynet-currency-input prop="amount2" ref="amount2" v-model="form1.amountRange2" @currency-blur="currentBlur" :showChinese="false"></ynet-currency-input>
                        </el-form-item>
                        <el-form-item label="入帐日期范围" required>
                            <el-form-item prop="star">
                                <el-date-picker type="date" placeholder="开始日期" v-model="form1.starDate"></el-date-picker>
                            </el-form-item>
                            至
                            <el-form-item prop="end">
                                <el-date-picker type="date" placeholder="结束日期" v-model="form1.endDate"></el-date-picker>
                            </el-form-item>
                        </el-form-item>
                        <div class="btnArea mt20 tac">
                            <el-button type="primary" @click="search()">查询</el-button>
                            <el-button @click="resetForm()">重置</el-button>
                        </div>
                    </el-form>
                </div>
                <!--2格布局table--end-->
            </div>
            <!-- 查询结果表 -->
            <div class="p20">
                <div class="tableData">
                    <el-table :data="tableData" stripe>
                        <el-table-column label="业务编号" width="180">
                            <template scope="scope">
                                <a @click="selectNo(scope.row)">
                                    <span class="cOrange">{{scope.row.businessNo}}</span>
                                </a>
                            </template>
                        </el-table-column>
                        <el-table-column label="汇款日期" width="180">
                            <template scope="scope">
                                <span>{{scope.row.remittanceDate}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="汇出币种" width="180">
                            <template scope="scope">
                                <span>{{scope.row.currency}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="汇出金额">
                            <template scope="scope">
                                {{$tools.utils.currencyFormat(scope.row.monney)}}
                            </template>
                        </el-table-column>
                        <el-table-column label="是否代付">
                            <template scope="scope">
                                <span>{{scope.row.flag}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="收款人">
                            <template scope="scope">
                                <span>{{scope.row.payee}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="状态">
                            <template scope="scope">
                                <span>{{scope.row.status}}</span>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            <!-- 查询结果表 --end-->
        </div>
        <!--功能区--end-->
    </ynet-content>
</template>
<script>
export default {
    name: 'remittanceQueryMain',
    components: {

    },
    props: {

    },
    data() {
        return {
            form1: {
                payee: "",
                receivingBank: "",
                currency: "",
                amountRange1: "",
                amountRange2: "",
                starDate: "",
                endDate: "",
            },
            tableData: [
            ],
            tableData1: {
                currentPage: 1,
                turnPageShowNum: 5,
            },
            rules1: {

            },
        }
    },
    methods: {
        currentBlur(val) {   //金额控件失焦事件
            console.log(val)
        },
        search() {
            let _this = this
            let form1 = _this.form1
            _this.tableData1.currentPage = 1
            _this.tableData1.turnPageShowNum = 5
            _this.$tools.request(_this, ".do", form1).then(
                data => {
                    _this.tableData = [{
                payee: "a",
                receivingBank: "qq",
                currency: "CNY",
                amountRange1: "2",
                amountRange2: "3",
                starDate: "20170921",
                endDate: "0170922",
            },{
                payee: "b",
                receivingBank: "qq",
                currency: "CNY",
                amountRange1: "4",
                amountRange2: "5",
                starDate: "20170908",
                endDate: "20170908",
            },]
                }
            )
        },
        resetForm() {
            let _this = this
            _this.$refs['form1'].resetFields();
        },
    },
    mounted() {

    }
}
</script>