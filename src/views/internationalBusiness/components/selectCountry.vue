<template>
<el-dialog title="选择国家" :visible.sync="dialogShow" :before-close="beforeClose" :close-on-click-modal="false" :close-on-press-escape="false">
    <div>
        <!-- 查询输入框 -->
        <el-form label-width="140px">
            <el-form-item label="请输入查询条件：">
                <el-input v-model="form.queryAccount" placeholder="按国家编号、国家名称模糊查询"></el-input>
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
                <el-table-column prop="countryCode" label="国家编号"></el-table-column>
                <el-table-column prop="countryName" label="国家名称"></el-table-column>
                <!--<el-table-column prop="safeNumber" label="外管局编号"></el-table-column>
                <el-table-column prop="englishName" label="英文全称"></el-table-column>-->
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
        name:'selectCountry',
        components:{
        },
        data(){
            return{
                dialogShow:true,
                turnPageTotalNum:0,
                tableData:[],
                currentRow: {},
                form: {
                    queryAccount:"",
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
                _this.$tools.request(this,"CB050102.do",_this.form).then(
                    data =>{
                        if(data.body.errorCode=='0'){
                            _this.tableData = data.body.countryList
                            _this.turnPageTotalNum = data.body.turnPageTotalNum
                        }else{
                            _this.alert(data.body.errorMsg,"温馨提示")
                        }
                    }
                )
            },
            selectRow(val) {
                let _this = this
                _this.$emit("selectCountry1",val)
                _this.form.queryAccount = ''
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