<template>
    <el-dialog title="收款人账号" :visible.sync="dialogShow" :before-close="beforeClose" :close-on-click-modal="false" :close-on-press-escape="false">
        <div>
            <!-- 查询输入框 -->
            <el-form label-width="140px">
                <el-form-item label="请输入查询条件：">
                    <el-input placeholder="" v-model="form.cpInput"></el-input>
                </el-form-item>
            </el-form>
            <!-- 查询输入框end -->
            <el-form>
                <el-form-item class="btnArea mt20 tac">
                    <el-button type="primary" @click="search(1)">查询</el-button>
                </el-form-item>
            </el-form>
            <el-form>
                <el-table class="tableData" :data="tableData" border style="width: 100%" highlight-current-row>
                    <el-table-column type="index" width="55">
                        <template scope="scope">
                            <el-radio class="radio" v-model="currentRow" :label="scope.row">&nbsp;</el-radio>
                        </template>
                    </el-table-column>
                    <el-table-column prop="acctNo" label="收款人账号">
                    </el-table-column>
                    <el-table-column prop="remitType" label="汇款人类型">
                        <template scope="scope">
                            <span>{{$tools.dict.remitType(scope.row.remitType)}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="acctNmAndAddr" label="收款人名称及地址">
                    </el-table-column>
                    <el-table-column prop="country" label="收款人常驻国">
                    </el-table-column>
                </el-table>
            </el-form>
        </div>
        <!--分页-->
        <div class="pagination tar mt20">
            <el-pagination 
                @current-change="handleCurrentChange" 
                :current-page="form.currentPage" 
                :page-size="form.turnPageShowNum" 
                layout="total, prev, pager, next, jumper" 
                :total="Number(turnPageTotalNum)">
            </el-pagination>
        </div>
        <!--分页--END-->
        <div slot="footer" class="el-dialog__footer btnArea">
            <el-button type="primary" @click="selectRow(currentRow)">确定</el-button>
            <el-button @click="selectRow({})">关闭</el-button>
        </div>
    </el-dialog>
</template>
<script>
export default {
    name: 'selectAccount',
    components: {
    },
    props:{
        remitType:{type:String}
    },
    data() {
        return {
            dialogShow:true,
            turnPageTotalNum: 0,
            tableData: [],
            currentRow: {},
            form: {
                remitType: "",
                cpInput: "",
                turnPageShowNum: 10,
                currentPage: 1,
            },
        }
    },
    methods: {
        search(changePage) {
            let _this = this
            if(changePage){
                _this.form.currentPage = changePage
            }else{
                _this.form.currentPage = 1
            }
            _this.$tools.request(this, "CB05060106.do", _this.form).then(
                data => {
                    if(data.body.errorCode=='0'){
                        _this.tableData = data.body.commonPayeeList
                        _this.turnPageTotalNum = data.body.turnPageTotalNum
                    }else{
                        _this.alert(data.body.errorMsg,"温馨提示")
                    }
                }
            )
        },
        selectRow(val) {
            let _this = this
            _this.$emit("selectAccount1",val)
            _this.$emit("saveAccountBak")
            _this.form.cpInput = ''
            _this.search()
        },
        handleCurrentChange(val) {
            let _this = this
            _this.search(val)
        },
        beforeClose(){
            let _this = this
            _this.selectRow()
        }
    },
    created() {
        let _this = this
        _this.form.remitType = _this.remitType
        _this.search()
    }

}
</script>