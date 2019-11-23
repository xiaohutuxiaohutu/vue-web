<template>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="data"
        label="申请时间"
        width="300">
      </el-table-column>
      <el-table-column
        prop="name"
        label="账户类型"
        width="300">
      </el-table-column>
      <el-table-column
        prop="money"
        label="金额">
      </el-table-column>
      <el-table-column
        prop="type"
        label="申请状态">
      </el-table-column>
      <el-table-column
        prop="handle"
        label="操作">
            <template scope="scope">
                <div v-if="flag=='1'">
                    <el-button type="text" size="small" @click="handle">查看</el-button>
                    <el-button type="text" size="small">修改</el-button>
                    <el-button type="text" size="small">取消</el-button>
                </div>
                <div v-if="flag=='2'">
                    <el-button type="text" size="small" @click="handle">查看</el-button>
                </div>
            </template>
      </el-table-column>
    </el-table>
</template>

<script>
export default {
  name:'accTable',
  components: {
      
  },
  data() {
    return{
        tableData:[
            {
                data:"2017-9-11",
                name:"定期保证金账户",
                money:"100000",
                type:"已提交",
            }
        ],
        flag:'1',
        dialogVisible: false,
    }
  },
  methods: {
    handle(){
        this.$emit("next",true)
    },
    
  },
  mounted(){ 
    
  }
}
</script>
<style>
  .input{
      width:600px;
  }
</style>