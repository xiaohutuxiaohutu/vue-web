<template>
  <div>
        <h3 class="functionalAreaTitle">审批模板列表</h3>
        <div class="p20">   
          <div class="tableData">
            <el-table :data="tableData">
               <el-table-column
                type="selection"
                width="55">
              </el-table-column>
              <el-table-column label="审批模板">
                <template  scope="scope">
                  <el-button type="text" @click="handleClick(scope.row)">{{scope.row.date}}</el-button>
                </template>
              </el-table-column>
              <el-table-column prop="total" label="审批类型"></el-table-column>
              <el-table-column prop="total" label="审批级别"></el-table-column>  
            </el-table>
          </div>
          <div class="btnArea mt20 tac">
            <el-button type="primary">新增</el-button>
            <el-button type="primary">修改</el-button>
            <el-button @click="dialogVisible=true">删除</el-button>
        </div>
      </div>
       <!--删除弹窗-->
    <el-dialog :visible.sync="dialogVisible" v-if="dialogVisible" class="tac" size=tiny>
      <span style="font-size:16px;">您确认要删除一站式转模板？</span>
      <div slot="footer" class="dialog-footer btnArea tac">
          <el-button @click="dialogVisible=false">确认</el-button>
          <el-button @click="dialogVisible=false">关闭</el-button>
      </div>
    </el-dialog>
    <!--删除弹窗end-->

  </div>
</template>

<script>

  export default {
    name:'cstmanager',
    components:{
      
    },
    data() {
      return {
        dialogVisible:false,
          tableData:[
           {
               date:'一站式转账',
               total:'有金额式',
               code:'一级'
           },
            {
               date:'通知存款',
               total:'有金额式',
               code:'二级'
           }
       ]
      };
    },
    methods: {
     
     
    }
  }
</script>

<style>
  
</style>



