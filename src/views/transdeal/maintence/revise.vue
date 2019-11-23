<template>
  <ynet-content id="templateName" class="main-content" :headerInformation="true" :headerMenu="true">
       <div  class="functionalArea">
         <h3 class="functionalAreaTitle">交易修改</h3>
            <el-form  ref="form" :model="form" :rules="rules" class="formEmbedTable">
              <div class="tableData p20">
                <table>
                  <tr>
                    <td>网银流水号：</td>
                    <td>
                      <el-form-item  prop="input1">
                       
                      </el-form-item>
                    </td>
                    <td>交易状态：</td>
                    <td>
                      <el-form-item>
                     
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td>交易类型：</td>
                    <td>
                      <el-form-item  prop="input1">
                     
                      </el-form-item>
                    </td>
                    <td>预约时间：</td>
                    <td>
                      <el-form-item>
                         <el-input v-model="form.input1" placeholder="请输入账号"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td>提交人：</td>
                    <td>
                      <el-form-item  prop="input1">
                        <el-input v-model="form.input1" placeholder="请输入账号"></el-input>
                      </el-form-item>
                    </td>
                    <td>提交时间：</td>
                    <td>
                      <el-form-item>
                        <el-input v-model="form.input1" placeholder="请输入账号"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td>付款账户名：</td>
                    <td>
                      <el-form-item  prop="input1">
                        <el-input v-model="form.input1" placeholder="请输入账号"></el-input>
                      </el-form-item>
                    </td>
                    <td>收款人账户：</td>
                    <td>
                      <el-form-item>
                        <el-input v-model="form.input1" placeholder="请输入账号"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td>付款账号：</td>
                    <td>
                      <el-form-item  prop="input1">
                         <el-input v-model="form.input1" placeholder="请输入账号"></el-input>
                      </el-form-item>
                    </td>
                    <td>收款账号：</td>
                    <td>
                      <el-form-item>
                        <el-input v-model="form.input1" placeholder="请输入账号"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td>付款账号：</td>
                    <td>
                      <el-form-item  prop="input1">
                           <el-input v-model="form.input1" placeholder="请输入账号"></el-input>
                      </el-form-item>
                    </td>
                    <td>交易币种：</td>
                    <td>
                      <el-form-item>
                         <el-input v-model="form.input1" placeholder="请输入账号"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td>收款账号开户行：</td>
                    <td>
                      <el-form-item  prop="input1">
                           <el-input v-model="form.input1" placeholder="请输入账号"></el-input>
                      </el-form-item>
                    </td>
                    <td>转账金额：</td>
                    <td>
                      <el-form-item  prop="input1">
                          <el-input v-model="form.input1" placeholder="请输入账号"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td>大写金额：</td>
                    <td>
                      <el-form-item  prop="input1">
                           <el-input v-model="form.input1" placeholder="请输入账号"></el-input>
                      </el-form-item>
                    </td>
                    <td>手续费：</td>
                    <td>
                      <el-form-item  prop="input1">
                           <el-input v-model="form.input1" placeholder="请输入账号"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td>大写金额：</td>
                    <td>
                      <el-form-item  prop="input1">
                          <el-input v-model="form.input1" placeholder="请输入账号"></el-input>
                      </el-form-item>
                    </td>
                    <td>金额大写：</td>
                    <td>
                      <el-form-item  prop="input1">
                           <el-input v-model="form.input1" placeholder="请输入账号"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td>付款用途：</td>
                    <td>
                      <el-form-item  prop="input1">
                           <el-input v-model="form.input1" placeholder="请输入账号"></el-input>
                      </el-form-item>
                    </td>
                    <td>预约处理日期：</td>
                    <td>
                      <el-form-item  prop="input1">
                          <el-input v-model="form.input1" placeholder="请输入账号"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                </table>
              </div>
            </el-form>
            <div class="btnArea mtb20 tac">
              <el-button type="primary" @click="submitForm()">确认</el-button>
              <el-button>返回</el-button>
            </div>
        </div>
  </ynet-content>
</template>


<script>
export default {

  props: {
    detailMsg:{
      type: Object
    }
  },
  data(){
    return {
     form: {
          name:'',
          name2:'',
          input1:'',
          input2:'',
          resource:[],
          file:''
      },
    }
  }
}
</script>