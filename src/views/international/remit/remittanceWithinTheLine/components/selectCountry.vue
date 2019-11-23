<template>
    <div>
        <!-- 查询输入框 -->
        <el-form label-width="140px">
            <el-form-item label="请输入查询条件：">
                <el-input v-model="tableData1.queryAccount"></el-input>
            </el-form-item>
        </el-form>
        <!-- 查询输入框end -->
        <el-form>
            <el-form-item class="tac formBtnArea">
                <el-button type="primary" @click="search">查询</el-button>
            </el-form-item>
        </el-form>
        <el-form>
            <el-table class="tableData"
                :data="tableData"
                border
                style="width: 100%"
                highlight-current-row
                @current-change="handleCurrentChange">
                <el-table-column
                    prop="countryCode"
                    label="国家编号"
                    >
                </el-table-column>
                <el-table-column
                    prop="countryName"
                    label="国家名称"
                    >
                </el-table-column>
                <el-table-column
                    prop="safeNumber"
                    label="外管局编号"
                    >
                </el-table-column>
                <el-table-column
                    prop="englishName"
                    label="英文全称"
                    >
                </el-table-column>
            </el-table>
        </el-form>
    </div>

</template>
<script>
import Panel from '@src/components/panel'
    export default{
        name:'selectCountry',
        components:{
            Panel,
        },
        data(){
            return{
                tableData:[
                ],
                currentRow: {},
                tableData1:{
                    currentPage:1,
                    turnPageShowNum:5,
                    queryAccount:"",
                }
            }
        },
        methods:{
            search(){
                let _this = this
                let tableData1 = _this.tableData1
                _this.tableData1.currentPage = 1
                _this.tableData1.turnPageShowNum = 5
                _this.$tools.request(_this,"BUS03002.do",tableData1).then(
                    data =>{
                        _this.tableData = data.body.countryList
                    }
                )
            },
            handleCurrentChange(val) {
                //alert(JSON.stringify(val))
                this.currentRow = val
                this.$emit("selectCountry1",this.currentRow)
            }
        },
        mounted(){
            let _this = this
            let tableData1 = _this.tableData1
            _this.$tools.request(_this,"BUS03002.do",tableData1).then(
                data =>{
                    _this.tableData = data.body.countryList
                }
            )
        }
        
    }
</script>