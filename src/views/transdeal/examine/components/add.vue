<template>
  <div class="cstmnagerAdd">
      <h3 class="functionalAreaTitle">审批模板设置</h3>
        <el-form ref="form" :model="form" class="formEmbedTable"> 
           <table>
             <tr>
                <td>模板名称：</td>
                <td>
                  <el-form-item  prop="input1">
                    <el-input v-model="form.input1" placeholder="请输入账号"></el-input>
                  </el-form-item>
                </td>
                <td>模板类型：</td>
                <td>
                  <el-form-item>
                    <el-checkbox-group v-model="form.type">
                      <el-checkbox label="有金额式" name="type"></el-checkbox>
                      <el-checkbox label="无金额式" name="type"></el-checkbox>
                    </el-checkbox-group>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>审批级别</td>
                <td>
                  <el-form-item>
                    <el-select v-model="form.region">
                      <el-option label="一级" value="shanghai"></el-option>
                      <el-option label="二级" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                </td>
              </tr>
           </table>
        </el-form>

      <h3 class="functionalAreaTitle">全部跨度之间</h3>
      <div>
        <table class="lh30 distance">
          <tr class="tac">
            <td width="240" class="cstbdl cstbdt">全部区间</td>
            <td width="120" class="cstbdl cstbdt">一级</td>
            <td width="120" class="cstbdl cstbdt">二级</td>
            <td width="120" class="cstbdl cstbdt">三级</td>
            <td width="120" class="cstbdl cstbdt">四级</td>
            <td width="120" class="cstbdl cstbdt">五级</td>
            <td width="120" class="cstbdl cstbdt">操作</td>
          </tr>
          <tr class="tac">
            <td width="240" class="money cstbdl cstbdt"><el-input></el-input> < 金额</td>
            <td width="100" class="level cstbdl cstbdt"><el-input></el-input></td>
            <td width="100" class="level cstbdl cstbdt"><el-input></el-input></td>
            <td width="100" class="level cstbdl cstbdt"><el-input></el-input></td>
            <td width="100" class="level cstbdl cstbdt"><el-input></el-input></td>
            <td width="100" class="level cstbdl cstbdt"><el-input></el-input></td>
            <td width="100" class="cBlue cstbdl cstbdt" style="cursor:pointer;">增加</td>
          </tr>
        </table>
      </div>
      </el-form>
     <div class="btnArea mt40 tac mb20">
        <el-button type="primary"  @click="rejectdialogVisible=true">修改</el-button>
        <el-button>返回</el-button>
    </div>
  </div>

  </div>
</template>

<script>

  export default {
    name:'add',
    components:{
      
    },
    data() {
      return {
          tableData:[
           {
               date:'一站式转账',
               total:20,
               code:12345
           }
       ],
       form: {
          name:'',
          name2:'',
          input1:'',
          input2:'',
          resource:[],
          file:'',
          region:'',
          type:[]
      },
      }
    },
    methods: {
     
     
    }
  }
</script>

<style lang="scss">
  .cstmnagerAdd .money .el-input{width:70%}

  .cstmnagerAdd .level .el-input{width:35%;}
  .cstmnagerAdd .level .el-input__inner{height:95%;}
  .cstbdl{border-left:1px solid #f1f1f1}
  .cstbdt{border-bottom:1px solid #f1f1f1}
</style>



