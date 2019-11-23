<template>
<el-dialog title="选择开户银行" :visible.sync="dialogShow" :before-close="beforeClose" width="1100px" height="1100px" :close-on-click-modal="false" :close-on-press-escape="false">
    <div>
        <el-form label-width="140px">
            <el-form-item label="请输入查询条件：">
                <el-input placeholder="按swiftCode、总行swiftCode、地址、国别、英文名称模糊查询" v-model="form.searchInfo"></el-input>
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
                <el-table-column label="序号" width="70">
                    <template scope="scope">
                        {{scope.$index+1 + ((Number(form.currentPage)-1)*Number(form.turnPageShowNum))}}
                    </template>
                </el-table-column>
                <el-table-column prop="bankNo" label="银行简码"></el-table-column>
                <el-table-column prop="hostSwift" label="总行swiftCode" width="120"></el-table-column>
                <el-table-column prop="swiftNo" label="swiftCode"></el-table-column>
                <el-table-column prop="bankName" label="英文名称"></el-table-column>
                <el-table-column prop="addre1" label="地址1"></el-table-column>
                <el-table-column prop="addre2" label="地址2"></el-table-column>
                <el-table-column prop="addre3" label="地址3"></el-table-column>
                <el-table-column prop="addre4" label="地址4"></el-table-column>
                <el-table-column prop="country" label="国别" width="70"></el-table-column>
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
        name: 'selectSwift',
        components:{
        },
        data(){
            return{
                dialogShow:true,
                turnPageTotalNum:'',
                tableData:[],
                currentRow: {},
                form: {
                    searchInfo:"",
                    turnPageShowNum:10,
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
                _this.$tools.request(this,"CB000017.do",_this.form).then(
                    data =>{
                        if(data.body.errorCode=='0'){
                            _this.tableData = data.body.swiftList
                            _this.turnPageTotalNum = data.body.turnPageTotalNum
                        }else{
                            _this.alert(data.body.errorMsg,"温馨提示")
                        }
                    }
                )
            },
            selectRow(val) {
                let _this = this
                _this.$emit("selectSwift",val)
                _this.form.searchInfo = ''
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
            let _this = this
            _this.search()
        }
        
    }
</script>