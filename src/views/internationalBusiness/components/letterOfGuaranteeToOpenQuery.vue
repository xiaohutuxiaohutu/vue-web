<template>
<div class="Query">
    <!--table布局-->
    <el-form ref="form" :model="form" :rules="rules" class="formEmbedTable">
      <table>
        <caption>填写查询信息</caption>
        <tr>
          <td>业务编号：</td>
          <td>
            <el-form-item  prop="busCode">
              <el-input v-model="form.busCode" placeholder="业务编号"></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>受益人：</td>
          <td>
            <el-form-item  prop="befName">
              <el-input v-model="form.befName" placeholder="受益人"></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>保函种类：</td>
          <td>
            <el-form-item  prop="gntType">
              <el-select placeholder="保函种类" clearable v-model="form.gntType">
                <el-option v-for="item in gntTypeOptions" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>币种：</td>
          <td>
            <el-form-item  prop="CRY">
              <el-select placeholder="币种" clearable v-model="form.CRY">
                <el-option v-for="item in CRYOptions" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>金额范围：</td>
          <td>
            <el-form-item  prop="amtMin">
              <ynet-currency-input v-model="form.amtMin" name="amtMin" placeholder="最小金额" :showChinese="false"></ynet-currency-input>
            </el-form-item>
            <span>至</span>
            <el-form-item  prop="amtMax">
               <ynet-currency-input v-model="form.amtMax" name="amtMax" placeholder="最大金额" :showChinese="false"></ynet-currency-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>开立日期范围：</td>
          <td>
            <el-form-item  prop="startDateObj1">
              <el-date-picker v-model="form.startDateObj1" @change="form.startDate1=$tools.utils.formatDate(form.startDateObj1)" type="date" placeholder="开始日期"></el-date-picker>
            </el-form-item>
            <span>至</span>
            <el-form-item  prop="endDateObj1">
              <el-date-picker v-model="form.endDateObj1" @change="form.endDate1=$tools.utils.formatDate(form.endDateObj1)" type="date" placeholder="结束日期"></el-date-picker>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>申请日期范围：</td>
          <td>
            <el-form-item  prop="startDateObj">
              <el-date-picker v-model="form.startDateObj"  @change="form.startDate=$tools.utils.formatDate(form.startDateObj)" type="date" placeholder="开始日期"></el-date-picker>
            </el-form-item>
            <span>至</span>
            <el-form-item  prop="endDateObj">
              <el-date-picker v-model="form.endDateObj"  @change="form.endDate=$tools.utils.formatDate(form.endDateObj)" type="date" placeholder="结束日期"></el-date-picker>
            </el-form-item>
          </td>
        </tr>
      </table>
    </el-form>
    <!--table布局--END-->
    <div class="btnArea mt20 tac">
      <el-button type="primary" @click="submitForm()">查询</el-button>
      <el-button @click="resetForm()">重置</el-button>
    </div>
    <!--查询表格-->
    <div class="tableData mt20 printArea">
      <el-table :data="tableData" stripe @select="select">
        <el-table-column type="selection"></el-table-column>
        <el-table-column label="网银流水号" prop="sequenceNo">
          <template  scope="scope">
            <a class="cBlue" @click="popWindow(scope.$index)">{{scope.row.sequenceNo}}</a>
          </template>
        </el-table-column>
        <el-table-column label="业务编号" prop="busCode">
          <template  scope="scope">
            <span v-if="scope.row.status!='90'">----</span>
            <span v-if="scope.row.status=='90'">{{scope.row.busCode}}</span>
          </template>
        </el-table-column>
        <el-table-column label="开立日期" prop="openDate">
          <template  scope="scope">
            <span v-if="scope.row.status!='90'">----</span>
            <span v-if="scope.row.status=='90'">{{$tools.utils.formatDate(scope.row.openDate,{"symbol":"YYYY-MM-DD"})}}</span>
          </template>
        </el-table-column>
        <el-table-column label="金额" prop="gntAmt">
          <template  scope="scope">
            {{$tools.utils.currencyFormat(scope.row.gntAmt)}}
          </template>
        </el-table-column>
        <el-table-column label="保函种类" prop="gntType">
          <template  scope="scope">{{$tools.dict.gntTypeTrans(scope.row.gntType)}}</template>
        </el-table-column>
        <el-table-column label="申请日期" prop="createDate">
          <template  scope="scope">
            {{$tools.utils.formatDate(scope.row.createDate,{"symbol":"YYYY-MM-DD"})}}
          </template>
        </el-table-column>
        <el-table-column label="到期日期" prop="dueDate">
          <template  scope="scope">
            {{$tools.utils.formatDate(scope.row.dueDate,{"symbol":"YYYY-MM-DD"})}}
          </template>
        </el-table-column>
        <el-table-column label="币种" prop="CRY">
          <template  scope="scope">{{$tools.dict.CRYTrans(scope.row.CRY)}}</template>
        </el-table-column>
        <el-table-column label="状态" prop="status">
          <template  scope="scope">{{$tools.dict.statusTrans(scope.row.status)}}</template>
        </el-table-column>
      </el-table>
    </div>
    <!--查询表格--END-->
    <!--分页-->
    <div class="pagination tar mt20">
      <el-pagination 
        @current-change="handleCurrentChange"
        :current-page="form.currentPage"
        :page-size="form.turnPageShowNum"
        layout="total, prev, pager, next, jumper"
        :total="form.turnPageTotalNum"
      >
      </el-pagination>
    </div>
    <!--分页--END-->
    <div class="btnArea mt20 tac">
        <el-button type="primary" @click="$tools.print()">打印</el-button>
        <el-button @click="downLoadExcel()">下载</el-button>
    </div>
    <!--弹窗-->
    <el-dialog title="详情" :visible.sync="dialogTableVisible" :close-on-click-modal="false" :close-on-press-escape="false">
      <div class="formEmbedTable">
        <table>
          <tr>
            <td>网银流水号：</td>
            <td>{{popTableData.sequenceNo}}</td>
            <td>申请时间：</td>
            <td>{{$tools.utils.formatDate(popTableData.createDate,{"symbol":"YYYY-MM-DD"})}}</td>
          </tr>
          <tr v-if="popTableData.status=='90'">
            <td>业务编号：</td>
            <td>{{popTableData.busCode}}</td>
            <td>开立日期：</td>
            <td>{{$tools.utils.formatDate(popTableData.openDate,{"symbol":"YYYY-MM-DD"})}}</td>
          </tr>
          <tr>
            <td>保函种类：</td>
            <td>{{$tools.dict.gntTypeTrans(popTableData.gntType)}}</td>
            <td>开立方式：</td>
            <td>{{$tools.dict.ESTBDTrans(popTableData.ESTBD)}}</td>
          </tr>
          <tr>
            <td>保函币种：</td>
            <td>{{$tools.dict.CRYTrans(popTableData.CRY)}}</td>
            <td>保函金额：</td>
            <td>{{$tools.utils.currencyFormat(popTableData.gntAmt)}}</td>
          </tr>
          <tr>
            <td>保函生效日：</td>
            <td>{{$tools.utils.formatDate(popTableData.valueDate,{"symbol":"YYYY-MM-DD"})}}</td>
            <td>保函到期日：</td>
            <td>{{$tools.utils.formatDate(popTableData.dueDate,{"symbol":"YYYY-MM-DD"})}}</td>
          </tr>
          <tr>
            <td>申请人客户号：</td>
            <td>{{popTableData.cstNo}}</td>
            <td>申请人客户名称：</td>
            <td>{{popTableData.cstName}}</td>
          </tr>
          <tr>
            <td>申请人地址：</td>
            <td colspan="3">{{popTableData.appAddr}}</td>
          </tr>
          <tr>
            <td>被担保人姓名：</td>
            <td>{{popTableData.wrntName}}</td>
            <td>被担保人地址：</td>
            <td>{{popTableData.wrntAddr}}</td>
          </tr>
          <tr>
            <td>受益人姓名：</td>
            <td>{{popTableData.befName}}</td>
            <td>受益人地址：</td>
            <td>{{popTableData.befAddr}}</td>
          </tr>
          <tr>
            <td>合同编号：</td>
            <td>{{popTableData.contraNo}}</td>
            <td>合同币种：</td>
            <td>{{$tools.dict.CRYTrans(popTableData.contraCRY)}}</td>
          </tr>
          <tr>
            <td>合同金额：</td>
            <td>{{$tools.utils.currencyFormat(popTableData.contraAmt)}}</td>
            <td>保函模板：</td>
            <td>{{$tools.dict.gntTemplateTrans(popTableData.gntTemplate)}}</td>
          </tr>
          <tr v-if="popTableData.gntTemplate=='1'">
            <td>申请人模板文件：</td>
            <td colspan="3">{{popTableData.newFileName}}</td>
          </tr>
          <tr>
            <td>备注：</td>
            <td>{{popTableData.comments}}</td>
            <td>扣费账号：</td>
            <td>{{popTableData.wthdAccNo}}</td>
          </tr>
          <tr>
            <td>状态：</td>
            <td colspan="3">{{$tools.dict.statusTrans(popTableData.status)}}</td>
          </tr>
          <tr v-if="false">
            <td>拒绝原因：</td>
            <td colspan="3">{{popTableData.rejReason}}</td>
          </tr>
        </table>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">返回</el-button>
      </div>
    </el-dialog>
    <!--弹窗--END-->
</div>
</template>

<script>
export default {
  name:'Query',
  components: {
  },
  data() {
    return {
      form: {
          cstNo:this.$tools.storage.get("user","save").cstNo,
          eCIFID:this.$tools.storage.get("user","save").eCIFID,
          busCode:'',
          befName:'',
          gntType:'',
          CRY:'',
          amtMin:'',
          amtMax:'',
          startDate1:'',
          startDateObj1:'',
          endDate1:'',
          endDateObj1:'',
          startDate:'',
          startDateObj:'',
          //startDateObj:new Date(this.getDefaultDate()),
          endDate:'',
          //endDateObj:new Date(),
          endDateObj:'',
          turnPageShowNum:10,
          startPage:0,
          endPage:9,
          currentPage:1,
          turnPageTotalNum:0,
      },
      // pickerOptions0: {
      //     disabledDate(time) {
      //       return time.getTime() > Date.now() || time.getTime() < Date.now() - 3600 * 1000 * 24 * 366;
      //     }
      // },
      // pickerOptions1: {
      //     disabledDate(time) {
      //       return time.getTime() > Date.now() || time.getTime() < Date.now() - 3600 * 1000 * 24 * 366;
      //     }
      // },
      rules: {
        amtMin: [
          {trigger: 'blur', validator:this.$tools.validator.amountCompare,compareList:['amtMin','amtMax'],vm:this,formName:'form'}
        ],
        amtMax: [
          {trigger: 'blur', validator:this.$tools.validator.amountCompare,compareList:['amtMin','amtMax'],vm:this,formName:'form'}
        ],
        startDateObj: [
          {trigger: 'change', validator:this.dateCompareVal,compareList:['startDateObj','endDateObj'],vm:this,formName:'form'},
          //{trigger: 'change', validator:this.$tools.validator.dateCompare,compareList:['startDateObj','endDateObj'],vm:this,formName:'form'},
          //{trigger: 'change', validator:this.dateCompare,compareList:['startDateObj','endDateObj'],vm:this,formName:'form'}
        ],
        endDateObj: [
          {trigger: 'change', validator:this.dateCompareVal,compareList:['startDateObj','endDateObj'],vm:this,formName:'form'},
          //{trigger: 'change', validator:this.$tools.validator.dateCompare,compareList:['startDateObj','endDateObj'],vm:this,formName:'form'},
         // {trigger: 'change', validator:this.dateCompare,compareList:['startDateObj','endDateObj'],vm:this,formName:'form'}
        ],
        startDateObj1: [
          {trigger: 'change', validator:this.dateCompareVal,compareList:['startDateObj1','endDateObj1'],vm:this,formName:'form'},
          //{trigger: 'change', validator:this.dateCompare,compareList:['startDateObj1','endDateObj1'],vm:this,formName:'form'}
        ],
        endDateObj1: [
          {trigger: 'change', validator:this.dateCompareVal,compareList:['startDateObj1','endDateObj1'],vm:this,formName:'form'},
          //{trigger: 'change', validator:this.dateCompare,compareList:['startDateObj1','endDateObj1'],vm:this,formName:'form'}
        ],
      },
      tableData:[],
      dialogTableVisible:false,
      popTableData:{},
      gntTypeOptions:[
        {value: '',label: '-----请选择-----'},
        {value: '01',label: '投标'},
        {value: '02',label: '履约'},
        {value: '03',label: '质量'},
        {value: '04',label: '预留金(滞留金)'},
        {value: '05',label: '备付金'},
        {value: '06',label: '租赁'},
        {value: '07',label: '即期付款'},
        {value: '08',label: '延期付款'},
        {value: '09',label: '诉讼'},
        {value: '10',label: '融资'},
        {value: '11',label: '转开'},
        {value: '12',label: '关税保付'},
        {value: '13',label: '借款'},
        {value: '14',label: '其他非融资性保函'},
        {value: '15',label: '其他融资性保函'},
        {value: '16',label: '预付款保函'},
        {value: '17',label: '其他'}
      ],
      CRYOptions:[
        {value: '',label: '-----请选择-----'},
        {value: 'CNY',label: 'CNY人民币'},
        {value: 'HKD',label: 'HKD港元'},
        {value: 'USD',label: 'USD美元'},
        {value: 'EUR',label: 'EUR欧元'},
        {value: 'GBP',label: 'GBP英镑'},
        {value: 'JPY',label: 'JPY日元'},
        {value: 'SGD',label: 'SGD新加坡币'}
      ],
    }
  },
  methods: {
    submitForm(changePage) {
      let _this=this
      _this.$refs['form'].validate((valid) => {
        if (valid) {
          if(changePage){
            _this.form.currentPage=changePage
            _this.form.startPage=(_this.form.currentPage-1)*_this.form.turnPageShowNum
            _this.form.endPage=_this.form.currentPage*_this.form.turnPageShowNum-1
          }else{
            _this.form.currentPage=1
            _this.form.startPage=0
            _this.form.endPage=9
          }
          _this.requestTableList()
        } else {
          console.log('error submit!!')
          return false
        }
      });
    },
    resetForm() {
      let _this=this
      _this.$refs['form'].resetFields()
    },
    handleCurrentChange(currentPage){
      let _this=this
      _this.submitForm(currentPage)
    },
    requestTableList(){
      let _this=this
      if(_this.form.startDate!='' && _this.form.endDate!=''){
          _this.form.startDate = _this.form.startDate+'000000'
          _this.form.endDate = _this.form.endDate+'235959'
      }
      //console.log(_this.form)
      _this.$tools.request(this,"CB050403.do",_this.form).then(data => {
          let errorCode = data.body.errorCode
          let errorMsg = data.body.errorMsg
          if (errorCode == '' || errorCode == null || errorCode == '0') {
              _this.form.turnPageTotalNum=parseInt(data.body.turnPageTotalNum)
              _this.tableData=data.body.guaranteeList
              //console.log(_this.tableData)
          } else {
              _this.$alert(errorMsg, '温馨提示', {
                  confirmButtonText: '确定'
              })
          }
      })
    },
    popWindow(index){
      let _this=this
      _this.dialogTableVisible=true
      _this.popTableData=_this.tableData[index]
      //console.log(_this.popTableData)
    },
    select(selection, row){
      //console.log(selection)
      //console.log(row)
    },
    //dateCompare(rule, value, callback){
        // let _form=rule.vm[rule.formName]
        // let value1 = _form[rule.compareList[0]]
        // let value2 = _form[rule.compareList[1]]
        // let compareValue1 = this.$tools.utils.formatDate(value1)
        // let compareValue2 = this.$tools.utils.formatDate(value2)
        // console.log("时间跨度小于3个月:"+this.$tools.utils.compareDate(compareValue1,compareValue2,3))
        // if(!this.$tools.utils.compareDate(compareValue1,compareValue2,3)){
        //   callback("查询时间跨度不能超过3个月")
        // }else{
        //   callback()
        // }
    //},
    dateCompareVal(rule, value, callback){
        let _form=rule.vm[rule.formName]
        let compareValue1=_form[rule.compareList[0]]
        let compareValue2=_form[rule.compareList[1]]
        if(!this.isEmpty(compareValue1) && !this.isEmpty(compareValue2)){
            if(compareValue1.getTime()>compareValue2.getTime()){
                callback("起始日期不能大于结束日期")
            }else{
                callback()
            }
        }else{
            if(this.isEmpty(_form[rule.field])){
                for(let index in rule.compareList){
                    if(rule.field != rule.compareList[index]){
                      if (!this.isEmpty(_form[rule.compareList[index]])) {
                            callback("请选择日期")
                      }
                      callback()
                    }
                }
            }
            callback()
        }
    },
    isEmpty(value) {
        if ($.trim(value) == "") return true
        return false
    },
    getDefaultDate(){
      //let currDate = new Date('2012-05-30')     //resultDate='2012-02-29'
      //let currDate = new Date('2017-05-30')     //resultDate='2012-02-28'
      let currDate = new Date()
      let year = currDate.getFullYear()
      let month = currDate.getMonth()+1
      let date  = currDate.getDate()
      //let hms = currDate.getHours()+':'+currDate.getMinutes()+':'+(currDate.getSeconds()<10?'0'+currDate.getSeconds():currDate.getSeconds())
      switch(month){
          case 1:
          case 2:
          case 3:
            month += 9
            year --
            break
          default:
            month -= 3
            break
      }
      month = (month < 10) ? ( '0' + month) : month
      if(month=='02'){
        if((year%4==0&&year%100!=0)||(year%400==0)){   //闰年判断
          if(Number(date)>29){
            date='29'
          }
        } else {    //平年
          if(Number(date)>28){
            date='28'
          }
        }
      }
      let resultDate = year+'-'+month+'-'+date
      return resultDate
    },
    downLoadExcel() {
      let _this = this
      if(_this.tableData.length<=0){
          _this.$alert("暂无数据，不可下载","温馨提示")
      }else{
          //debugger
          let guaranteeTitleList = [{ sequenceNo: '网银流水号', busCode: '业务编号', openDate: '开立日期', gntAmt: '金额', gntType: '保函种类', createDate: '申请日期', dueDate: '到期日期', CRY: '币种', status: '状态' }]
          //console.log(JSON.stringify(guaranteeTitleList))
          let guaranteeDownLoadList = []
          for (let item of _this.tableData) {
            guaranteeDownLoadList.push({ 'sequenceNo': item.sequenceNo, 'busCode': item.busCode, 'openDate': this.$tools.utils.formatDate(item.openDate,{"symbol":"YYYY-MM-DD"}), 'gntAmt': this.$tools.utils.currencyFormat(item.gntAmt), 'gntType': this.$tools.dict.gntTypeTrans(item.gntType), 'createDate': this.$tools.utils.formatDate(item.createDate,{"symbol":"YYYY-MM-DD"}),'dueDate':  this.$tools.utils.formatDate(item.dueDate,{"symbol":"YYYY-MM-DD"}),'CRY': this.$tools.dict.CRYTrans(item.CRY),'status': this.$tools.dict.statusTrans(item.status)})
          }
          //console.log(JSON.stringify(guaranteeDownLoadList))
          let body = []
          body.guaranteeTitleList = guaranteeTitleList
          //console.log(JSON.stringify(body.guaranteeTitleList))
          body.guaranteeDownLoadList = guaranteeDownLoadList
          //console.log(JSON.stringify(body.guaranteeDownLoadList))
          //let url = "/coporbank/CB050407.do"
          let url = "/api/CB050407.do"
          let form = $("<form></form>").attr("action", url).attr("method", "post")
          for (let i in guaranteeTitleList) {
            form.append($("<input></input>").attr("type", "hidden").attr("name", "guaranteeTitleList[" + i + '][sequenceNo]').attr("value", guaranteeTitleList[i].sequenceNo))
            form.append($("<input></input>").attr("type", "hidden").attr("name", "guaranteeTitleList[" + i + '][busCode]').attr("value", guaranteeTitleList[i].busCode))
            form.append($("<input></input>").attr("type", "hidden").attr("name", "guaranteeTitleList[" + i + '][openDate]').attr("value", guaranteeTitleList[i].openDate))
            form.append($("<input></input>").attr("type", "hidden").attr("name", "guaranteeTitleList[" + i + '][gntAmt]').attr("value", guaranteeTitleList[i].gntAmt))
            form.append($("<input></input>").attr("type", "hidden").attr("name", "guaranteeTitleList[" + i + '][gntType]').attr("value", guaranteeTitleList[i].gntType))
            form.append($("<input></input>").attr("type", "hidden").attr("name", "guaranteeTitleList[" + i + '][createDate]').attr("value", guaranteeTitleList[i].createDate))
            form.append($("<input></input>").attr("type", "hidden").attr("name", "guaranteeTitleList[" + i + '][dueDate]').attr("value", guaranteeTitleList[i].dueDate))
            form.append($("<input></input>").attr("type", "hidden").attr("name", "guaranteeTitleList[" + i + '][CRY]').attr("value", guaranteeTitleList[i].CRY))
            form.append($("<input></input>").attr("type", "hidden").attr("name", "guaranteeTitleList[" + i + '][status]').attr("value", guaranteeTitleList[i].status))
          }
          for (let i in guaranteeDownLoadList) {
            form.append($("<input></input>").attr("type", "hidden").attr("name", "guaranteeDownLoadList[" + i + '][sequenceNo]').attr("value", guaranteeDownLoadList[i].sequenceNo))
            form.append($("<input></input>").attr("type", "hidden").attr("name", "guaranteeDownLoadList[" + i + '][busCode]').attr("value", guaranteeDownLoadList[i].busCode))
            form.append($("<input></input>").attr("type", "hidden").attr("name", "guaranteeDownLoadList[" + i + '][openDate]').attr("value", guaranteeDownLoadList[i].openDate))
            form.append($("<input></input>").attr("type", "hidden").attr("name", "guaranteeDownLoadList[" + i + '][gntAmt]').attr("value", guaranteeDownLoadList[i].gntAmt))
            form.append($("<input></input>").attr("type", "hidden").attr("name", "guaranteeDownLoadList[" + i + '][gntType]').attr("value", guaranteeDownLoadList[i].gntType))
            form.append($("<input></input>").attr("type", "hidden").attr("name", "guaranteeDownLoadList[" + i + '][createDate]').attr("value", guaranteeDownLoadList[i].createDate))
            form.append($("<input></input>").attr("type", "hidden").attr("name", "guaranteeDownLoadList[" + i + '][dueDate]').attr("value", guaranteeDownLoadList[i].dueDate))
            form.append($("<input></input>").attr("type", "hidden").attr("name", "guaranteeDownLoadList[" + i + '][CRY]').attr("value", guaranteeDownLoadList[i].CRY))
            form.append($("<input></input>").attr("type", "hidden").attr("name", "guaranteeDownLoadList[" + i + '][status]').attr("value", guaranteeDownLoadList[i].status))
          }
          form.append($("<input></input>").attr("type", "hidden").attr("name", "bsnCode").attr("value", "CB050403"))
          form.append($("<input></input>").attr("type", "hidden").attr("name", "versionNo").attr("value", "1.0"))
          form.append($("<input></input>").attr("type", "hidden").attr("name", "iCIFID").attr("value", _this.$tools.storage.get("user",'save').iCIFID))
          form.appendTo("body").submit().remove()
       }
    },
  },
  mounted(){
  }
}
</script>