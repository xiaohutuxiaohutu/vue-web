<template>
  <ynet-content id="templateName" class="main-content" :headerInformation="true" :headerMenu="true">
    <!--面包屑-->
    <ynet-breadcrumb></ynet-breadcrumb>
    <!--面包屑--end-->
    <!--功能区-->
    <div class="functionalArea">
      <div class="contentTab">
        <a href="javascript:;" class="current">信用证开立</a>
        <a href="javascript:;">信用证修改</a>
        <a href="javascript:;">信用证查询</a>
      </div>
      <div class="p20">
        <div class="tableData printArea">
            <el-table :data="tableData" stripe @select="select">
              <el-table-column label="日期" type="selection" :selectable="isChoose"></el-table-column>
              <el-table-column label="日期" width="180">
                <template  scope="scope">
                  <span class="cOrange">{{scope.row.date}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="姓名" width="180"></el-table-column>
              <el-table-column prop="address" label="余额">
                <template  scope="scope">
                   {{$tools.utils.currencyFormat(scope.row.monney)}}
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template  scope="scope">
                  <a class="cOrange">回单</a>
                </template>
              </el-table-column>
            </el-table>
        </div>
        <div class="btnArea mt20 tac">
          <el-button type="primary" @click="$tools.print()">打印本页</el-button>
          <el-button >打印全部</el-button>
        </div>
        <!--4格布局table-->
        <div class="fourForm tableForm mt20">
          <h3>付款人信息</h3>
          <el-form ref="form" :model="form" :rules="rules">
            <el-row>
              <el-form-item label="证件类型" prop="name" class="fullLine">
                <el-select v-model="form.name" placeholder="请选择证件类型">
                  <el-option label="身份证" value="身份证"></el-option>
                  <el-option label="军官证" value="军官证"></el-option>
                </el-select>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="输入1"  prop="name2">
                <el-input v-model="form.input1" placeholder="请输入账号"></el-input>
              </el-form-item>
              <el-form-item label="输入2">
                <el-input v-model="form.input2" placeholder="请输入账号"></el-input>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="一行数据添加class=fullLine" class="fullLine">
                <el-radio-group v-model="form.resource">
                  <el-radio label="线上品牌商赞助"></el-radio>
                  <el-radio label="线下场地免费">
                    <el-form-item prop="name2" ref="formName2">
                      <el-input v-model="form.name2" placeholder="请输入账号" :disabled="formName2Disabled"></el-input>
                    </el-form-item>
                    <el-form-item  prop="star">
                      <el-date-picker type="date" placeholder="开始日期" :disabled="formName2Disabled" v-model="form.star"></el-date-picker>
                    </el-form-item>
                  </el-radio>
                  <el-radio label="线上品牌商赞助2"></el-radio>
                  <el-radio label="线上品牌商赞助3"></el-radio>
                  <el-radio label="线上品牌商赞助4"></el-radio>
                </el-radio-group>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="一行数据添加class=fullLine" class="fullLine">
                <el-input type="textarea"></el-input>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="一行数据添加class=fullLine" class="fullLine">
                <el-form-item>
                  <el-input placeholder="请输入账号"></el-input> %more or
                </el-form-item>
                <el-form-item>
                  <el-input placeholder="请输入账号"></el-input> %less
                </el-form-item>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="一行数据添加class=fullLine" class="fullLine">
                <el-input placeholder="请输入账号"></el-input>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="一行数据添加class=fullLine" class="fullLine">
                <el-input placeholder="请输入账号"></el-input>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="一行数据添加class=fullLine" class="fullLine">
                <el-input placeholder="请输入账号"></el-input>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="一行数据添加class=fullLine" class="fullLine">
                <el-input placeholder="请输入账号"></el-input>
              </el-form-item>
            </el-row>
          </el-form>
          <div class="btnArea mt20 tac">
            <el-button type="primary" @click="submitForm()">提交结果</el-button>
            <el-button type="primary" @click="$tools.print()">打印</el-button>
            <el-button @click="resetForm()">重置</el-button>
          </div>
        </div>
        <!--4格布局table--end-->
      </div>
      <ynet-warm-tips :items="warmTips"></ynet-warm-tips>
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
      tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          monney: '123.12'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          monney: '100.00'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          monney: '1000.12'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          monney: '10000000.00'
      }],
      warmTips:[
          '1.在线注册网上银行时使用的客户信息、证件类型和证件号码必须与该账号的户名、证件类型和证件号码一致。',
          '2.已经在线注册了网上银行或在柜台开通网上银行的客户无需再次注册，只需要网上银行或移步柜台办理账号追加业务即可。'
      ],
      form: {
          name:'',
          name2:'',
          input1:'',
          input2:'',
          resource:[],
          file:''
      },
      rules: {
        input1: [
          {required: true,trigger: 'blur',message:'请输入',}
        ],
        file: [
          {trigger: 'blur', validator:this.fileValidator}
        ],
        name2: [
          {trigger: 'blur', validator:this.nonempty}
        ],
        star:[
          { required: true, type:"date", message:'请输入起始日期', trigger: 'change' }
        ]
      },
      formName2Disabled:true, 
    }
  },
  methods: {
    isChoose(row,index){
      return true
    },
    select(selection, row){
       console.log(selection)
        console.log(row)
    }
  },
  mounted(){ 
  }
}
</script>
