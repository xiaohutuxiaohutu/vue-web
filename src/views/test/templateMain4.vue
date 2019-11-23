<template>
  <ynet-content id="templateName" class="main-content printArea" :headerInformation="true" :headerMenu="true">
    <!--面包屑-->
    <ynet-breadcrumb></ynet-breadcrumb>
    <!--面包屑--end-->
    <!--功能区-->
    <div class="functionalArea">
      <h3 class="functionalAreaTitle">一站式转账</h3>
      <div class="p20">
        <!--审批模版设置-->
        <el-form ref="form" :model="form" :rules="rules" class="formEmbedTable">
          <table>
            <caption>审批模版设置</caption>
            <tr>
              <td><span class="cRed">*</span>模版名称：</td>
              <td>
                <el-form-item>
                  <el-input placeholder="模版名称"></el-input>
                </el-form-item>
              </td>
              <td>模版类型：</td>
              <td>
                <el-form-item>
                  <el-radio-group>
                    <el-radio label="有金额式"></el-radio>
                    <el-radio label="无金额式"></el-radio>
                  </el-radio-group>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td><span class="cRed">*</span>审批级别：</td>
              <td colspan="3">
                <el-form-item>
                  <el-select v-model="form.level" placeholder="请选择审批级别" @change="selectChange">
                    <el-option label="一级" value="1"></el-option>
                    <el-option label="二级" value="2"></el-option>
                    <el-option label="三级" value="3"></el-option>
                    <el-option label="四级" value="4"></el-option>
                    <el-option label="五级" value="5"></el-option>
                  </el-select>
                </el-form-item>
              </td>
            </tr>
          </table>
        </el-form>
        <!--审批模版设置-->
        <!--金额跨度区间-->
        <el-form  ref="form2" :model="form2" class="tableData mt20 amountRangeTable">
          <el-table :data="form2.amountRange" stripe>
            <el-table-column label="金额区间" :width="320" align="left">
              <template  scope="scope">
                <el-form-item
                    :prop="'amountRange.' + scope.$index + '.amount'"
                    :rules="currencyRules(scope.$index)"                
                >
                  <ynet-currency-input class="w100" 
                     v-model="form2.amountRange[scope.$index].amount" 
                     :showChinese="false"
                     :disabled="scope.$index < form2.amountRange.length-1"
                  >
                  </ynet-currency-input>
                </el-form-item>
                < 金额
                <template v-if="scope.$index < form2.amountRange.length-1"><
                <el-form-item>
                  <ynet-currency-input class="w100" 
                      v-model="form2.amountRange[scope.$index+1].amount" 
                      :showChinese="false"
                      :disabled="scope.$index < form2.amountRange.length-1"
                  >
                  </ynet-currency-input>
                </el-form-item>
                </template>
              </template>
            </el-table-column>
            <el-table-column label="一级" v-if="form.level>=1">
              <template  scope="scope">
                <el-form-item 
                    :prop="'amountRange.' + scope.$index + '.levelOne'"
                    :rules="inputRules()"
                >
                  <el-input class="w30" v-model="form2.amountRange[scope.$index].levelOne"></el-input>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="二级" v-if="form.level>=2">
              <template  scope="scope">
                <el-form-item 
                    :prop="'amountRange.' + scope.$index + '.levelTwo'"
                    :rules="inputRules()"
                >
                  <el-input class="w30" v-model="form2.amountRange[scope.$index].levelTwo"></el-input>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="三级" v-if="form.level>=3">
              <template  scope="scope">
                <el-form-item 
                    :prop="'amountRange.' + scope.$index + '.levelThree'"
                    :rules="inputRules()"
                >
                  <el-input class="w30" v-model="form2.amountRange[scope.$index].levelThree"></el-input>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="四级" v-if="form.level>=4">
              <template  scope="scope">
                <el-form-item 
                    :prop="'amountRange.' + scope.$index + '.levelFour'"
                    :rules="inputRules()"
                >
                  <el-input class="w30" v-model="form2.amountRange[scope.$index].levelFour"></el-input>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="五级" v-if="form.level>=5">
              <template  scope="scope">
                <el-form-item 
                    :prop="'amountRange.' + scope.$index + '.levelFive'"
                    :rules="inputRules()"
                >
                  <el-input class="w30" v-model="form2.amountRange[scope.$index].levelFive"></el-input>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template  scope="scope">
                <a @click="addAmountRange" v-if="isShowAdd(scope.$index)">添加</a>
                <a @click="delAmountRange(scope.$index)" v-if="isShowDel(scope.$index)">删除</a>
              </template>
            </el-table-column>
          </el-table>
        </el-form>
        <!--金额跨度区间--END-->
        <a @click="get">获取数据</a>
        <ynet-tree></ynet-tree>
      </div>
    </div>
    <!--功能区--end-->
  </ynet-content>
</template>

<script>

export default {
  name:'templateName',
  components: {

  },
  data() {
    return {
      form:{
        level:'1',
      },
      rules:{

      },
      form2:{
        amountRange:[{
          levelOne:'',
          levelTwo:'',
          levelThree:'',
          levelFour:'',
          levelFive:'',
          amount:''
        }],
      },
      rules2:{

      }
    }
  },
  methods: {
    addAmountRange(){
      let _this=this
      _this.$refs['form2'].validate((valid) => {
        if (valid) {
          _this.form2.amountRange.push({levelOne:'',levelTwo:'',levelThree:'',levelFour:'',levelFive:'',amount:''})
        } else {
          console.log('error submit!!')
          return false
        }
      });
    },
    isShowAdd(index){
      let _this=this
      if(index != _this.form2.amountRange.length-1) return false
      return true
    },
    delAmountRange(index){
      let _this=this
      _this.form2.amountRange.splice(index, 1)
    },
    isShowDel(index){
      let _this=this
      if(index == 0 || index < _this.form2.amountRange.length-1) return false
      return true
    },
    inputRules(){
      return [
          {required: true, message: '请输入', trigger: 'blur' },
          {trigger: 'blur', validator:this.$tools.validator.isInteger},
          {trigger: 'blur', validator:this.$tools.validator.numberRange,rangeVal:[1,9]}
        ]
    },
    currencyRules(index){
      if(index=='0'){
        return [
          {required: true, message: '请输入', trigger: 'blur' },
        ]
      }
      return [
          {required: true, message: '请输入', trigger: 'blur' },
          {trigger: 'blur', validator:this.$tools.validator.amountCompareList,compareIndex:[index-1,index],compareName:'amount',vm:this,formName:"form2",formNode:'amountRange'}
        ]
    },
    selectChange(){
      let _this=this
      _this.form2.amountRange=[{levelOne:'',levelTwo:'',levelThree:'',levelFour:'',levelFive:'',amount:''}]
    },
    get(){
      console.log(this.form2.amountRange)
    }
  },
  mounted(){ 
    
  }
}
</script>
