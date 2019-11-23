<template>
<el-dialog title="常用受益人" :visible.sync="dialogShow" :before-close="beforeClose" :close-on-click-modal="false" :close-on-press-escape="false">
    <div>
        <el-form label-width="140px">
            <el-form-item label="请输入查询条件：">
                <el-input style="width:480px" placeholder="输入受益人姓名模糊查询" v-model="form.beneficiaryName"></el-input>
            </el-form-item>
        </el-form>
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
                <el-table-column prop="beneficiaryName" label="受益人姓名"></el-table-column>
                <el-table-column prop="beneficiaryAddress" label="受益人地址"></el-table-column>
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
            :total="Number(turnPageTotalNum)"
        >
        </el-pagination>
    </div>
    <!--分页--END-->
    <div class="btnArea mt20 tac">
        <el-button type="primary" @click="selectRow(currentRow)">确定</el-button>
        <el-button @click="selectRow({})">关闭</el-button>
    </div>
</el-dialog>
</template>
<script>
    export default {
        name:'selectBeneficiary',
        components:{
        },
        data(){
            return{
                dialogShow:true,
                turnPageTotalNum:0,
                tableData:[],
                currentRow: {},
                form: {
                    beneficiaryName:"",
                    turnPageShowNum:5,
                    currentPage:1,
                },
            }
        },
        methods:{
            search(changePage){
                let _this = this
                if(changePage){
                    _this.form.currentPage = changePage
                }else{
                    _this.form.currentPage = 1
                }
                _this.$tools.request(this,"CB05060202.do",_this.form).then(
                    data =>{
                        if(data.body.errorCode=='0'){
                            _this.tableData = data.body.beneficiaryList
                            _this.turnPageTotalNum = data.body.turnPageTotalNum
                        }else{
                            _this.alert(data.body.errorMsg,"温馨提示")
                        }
                    }
                )
            },
            selectRow(val) {
                let _this = this
                _this.$emit("selectBeneficiary",val)
                _this.form.beneficiaryName = ''
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
        created(){
            this.search()
        }
        
    }
</script>