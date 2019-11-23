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
          <td>收款人：</td>
          <td>
            <el-form-item  prop="draweeName">
              <el-input v-model="form.draweeName" placeholder="收款人"></el-input>
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
          <td>托收日期范围：</td>
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
        <el-table-column label="托收日期" prop="openDate">
          <template  scope="scope">
            <span v-if="scope.row.status!='90'">----</span>
            <span v-if="scope.row.status=='90'">{{$tools.utils.formatDate(scope.row.openDate,{"symbol":"YYYY-MM-DD"})}}</span>
          </template>
        </el-table-column>
        <el-table-column label="付款账号" prop="payAccNo">
          <template  scope="scope">{{scope.row.payAccNo}}</template>
        </el-table-column>
        <el-table-column label="金额"  prop="amt">
          <template  scope="scope">
            {{$tools.utils.currencyFormat(scope.row.amt)}}
          </template>
        </el-table-column>
        <el-table-column label="币种" prop="CRY">
          <template  scope="scope">{{$tools.dict.CRYTrans(scope.row.CRY)}}</template>
        </el-table-column>
        <el-table-column label="申请日期">
          <template  scope="scope">{{$tools.utils.formatDate(scope.row.createDate,{"symbol":"YYYY-MM-DD"})}}</template>
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
    <el-dialog :visible.sync="dialogTableVisible" :close-on-click-modal="false" :close-on-press-escape="false">
      <div class="exportCollectionStep exportCollectionStep2 printArea">
      <!--table布局-->
      <div class="exportCollectionTable">
        <h3 class="tac">APPLICATION FOR DOCUMENTARY COLLECTION</h3>
        <div class="fix mt20">
          <span class="fl">To：<span class="cRed">CHONG HING BANK LIMITED, ________________Branch</span></span>
          <span class="fr">Date:{{$tools.utils.formatDate(new Date(),{"symbol":"YYYY-MM-DD"})}}</span>
        </div>
        <table class="mt20" style="word-break: break-all;">
          <tr>
            <td width="60%" height="120" style="border:0;">
              <p class="mt20">We present the enclosed draft(s)/documents for your disposal in accordance with the following instructions. </p>
              <p class="mt20">This collection is subject to URC522.</p>
            </td>
            <td colspan="2">
              <p>Collecting Bank (SWIFT & Full name & address)</p>
              <p>{{popTableData.swiftCode}}</p>
              <p>{{popTableData.cbBank}}</p>
              <p>{{popTableData.cbAddr}}</p>
            </td>
          </tr>
          <tr>
            <td height="100">
              <p>Drawer(Full name & address)</p>
              <p>{{popTableData.drawerName}}</p>
              <p>{{popTableData.drawerAddr}}</p>
            </td>
            <td colspan="2">
              <p>Tenor</p>
              <p>{{popTableData.tenor}}</p>
            </td>
          </tr>
          <tr>
            <td height="100">
              <p>Drawee(Full name & address)</p>
              <p>{{popTableData.draweeName}}</p>
              <p>{{popTableData.draweeAddr}}</p>
            </td>
            <td>
              <p>Draft/Inv no.</p>
              <p>{{popTableData.draftNo}}</p>
              <p>{{popTableData.invNo}}</p>
            </td>
            <td>
              <p>Currency and Amount</p>
              <p>{{$tools.dict.CRYTrans(popTableData.CRY)}}</p>
              <p>{{popTableData.amt}}</p>
            </td>
          </tr>
          <tr>
            <td height="100" colspan="3">
              <p>Brief Goods Description</p>
              <p>{{popTableData.goodsDesc}}</p>
            </td>
          </tr>
        </table>
        <h3 class="mt20">DOCUMENTS</h3>
        <table class="textCenter mt20 tac"  style="word-break: break-all;">
          <tr>
            <th>
              <p>DRAFT</p>
            </th>
            <th>
              <p>INV.</p>
            </th>
            <th>
              <p>PACKING LIST</p>
            </th>
            <th>
              <p>WEIGHT LIST</p>
            </th>
            <th>
              <p>B/L</p>
            </th>
            <th>
              <p>AWB</p>
            </th>
            <th>
              <p>ORIGIN CERT.</p>
            </th>
            <th>
              <p>INS. POL.</p>
            </th>
            <th height="30">
              <p>CERT.</p>
            </th>
            <th v-if="popTableData.otherInput1!=''">
              <p>{{popTableData.otherInput1}}</p>
            </th>
            <th v-if="popTableData.otherInput2!=''">
              <p>{{popTableData.otherInput2}}</p>
            </th>
          </tr>
          <tr>
            <td height="30">{{popTableData.orglDraft}}</td>
            <td>{{popTableData.orglInvNo}}</td>
            <td>{{popTableData.orglPacking}}</td>
            <td>{{popTableData.orglWeight}}</td>
            <td>{{popTableData.orglBl}}</td>
            <td>{{popTableData.orglAwb}}</td>
            <td>{{popTableData.orglOrigin}}</td>
            <td>{{popTableData.orglIns}}</td>
            <td>{{popTableData.orglCert}}</td>
            <td  v-if="popTableData.otherInput1!=''">{{popTableData.orglOther1}}</td>
            <td  v-if="popTableData.otherInput2!=''">{{popTableData.orglOther2}}</td>
          </tr>
        </table>
        <!--新增条款-->
        <table style="word-break: break-all;">
          <tr>
            <td>
              <p>Special Instructions (See box marked 'X'): </p>
              <p class="positionLeft">
                <span class="checkBox" :class="{'el-icon-check':popTableData.Inst1=='1'}"></span>
                <em>Please deliver documents against 
                  <span class="checkBox ml5" :class="{'el-icon-check':popTableData.transType=='a'}"></span> payment at sight 
                  <span class="checkBox ml5" :class="{'el-icon-check':popTableData.transType=='b'}"></span> payment <span class="underline" v-if="popTableData.transType=='b'"> {{popTableData.payDay2}} </span><span v-if="popTableData.transType!='b'"> ________ </span><span>after sight</span>
                  <span class="checkBox ml5" :class="{'el-icon-check':popTableData.transType=='c'}"></span> acceptance at <span class="underline" v-if="popTableData.transType=='c'"> {{popTableData.payDay3}} </span><span v-if="popTableData.transType!='c'"> ________ </span>
                </em>
              </p>
              <p class="positionLeft">
                <span class="checkBox" :class="{'el-icon-check':popTableData.Inst2=='1'}"></span>
                <em>All your charges are to be borne by <span class="checkBox ml5" :class="{'el-icon-check':popTableData.payType=='a'}"></span> the drawee <span class="checkBox ml5" :class="{'el-icon-check':popTableData.payType=='b'}"></span> us.</em>
              </p>
              <p class="positionLeft">
                <span class="checkBox" :class="{'el-icon-check':popTableData.Inst3=='1'}"></span>
                <em>Acceptance/payment may wait until arrival of carrying vessel.</em>
              </p>
              <p class="positionLeft">
                <span class="checkBox" :class="{'el-icon-check':popTableData.Inst4=='1'}"></span>
                <em>In case of a time bill, please advise us of acceptance giving maturity date.</em>
              </p>
              <p class="positionLeft">
                <span class="checkBox" :class="{'el-icon-check':popTableData.Inst5=='1'}"></span>
                <em>In case of dishonour, do not protest but advise us the reasons of non-payment/non-acceptance.</em>
              </p>
              <p class="positionLeft">
                <span class="checkBox" :class="{'el-icon-check':popTableData.Inst6=='1'}"></span>
                <em>Please instruct the Collecting Bank to release the documents only upon receipt of all their banking charges.</em>
              </p>
              <p class="positionLeft">
                <span class="checkBox" :class="{'el-icon-check':popTableData.Inst7=='1'}"></span>
                <em>Full responsibility is on our part in respect of your appointment of the Collecting Bank chosen by us.</em>
              </p>
              <p class="positionLeft">
                <span class="checkBox" :class="{'el-icon-check':popTableData.otherInst=='1'}"></span>
                <em>Other instructions: 
                  <span class="underline" v-if="popTableData.otherInstInput!=''"> {{popTableData.otherInstInput}} </span><span v-if="popTableData.otherInstInput==''"> ________ </span>
                </em>
              </p>
            </td>
          </tr>
        </table>
        <table>
          <tr class="bgWhite">
            <td  class="tableEvenText">
              <p class="mb10"><span>Disposal of proceeds upon collection</span></p>
              <p class="mb10"><span>Credit to our current account No.</span>&nbsp;&nbsp;<span class="underline">{{popTableData.payAccNo}}</span></p>
            </td>
          </tr>
        </table>
        <table class="textCenter tac">
          <tr class="bgWhite">
            <td style="border:0px;">联系人：<span class="underline">{{popTableData.linkMan}}</span></td>
            <td style="border:0px;">电话：<span class="underline">{{popTableData.linkPhone}}</span></td>
            <td style="border:0px;">传真：<span class="underline">{{popTableData.linkFax}}</span></td>
          </tr>
        </table>
        <!--打印显示区-->
        <div class="importCreditOpenPrintContent lh25 pageBreakAfter" style="margin-top:-1px;" v-if="isPrint">
          <table>
            <tr>
              <td colspan="5" width="46%" class="pNone borderLeft borderRight">
                <p class="bankUse">For Bank Use：</p>
              </td>
              <td colspan="3">
                <p>Applicant’s Company chop：</p>
                <p>Legal representative or</p>
                <p>Authorized signatory(ies)：</p>
              </td>
            </tr>
            <tr>
              <td class="borderLeft">Process on</td>
              <td width="6%">Prepare</td>
              <td width="6%">Check</td>
              <td width="6%">Approve</td>
              <td width="6%" class="borderRight"></td>
              <td width="24%"></td>
              <td width="24%">Fax</td>
              <td rowspan="2">s.v.</td>
            </tr>
            <tr>
              <td class="borderLeft borderBottom"></td>
              <td class="borderBottom"></td>
              <td class="borderBottom"></td>
              <td class="borderBottom"></td>
              <td class="borderRight borderBottom"></td>
              <td>Contact person</td>
              <td>Tel.</td>
            </tr>
          </table>
        </div>
        <div class="TermsAndConditions mt20" v-if="isPrint">
          <h3 class="tac">Terms and Conditions</h3>
          <ul>
            <li v-for="(value,index) in conditionsList"><span>{{Number(index+1)}}.</span>{{value}}</li>
          </ul>
        </div>
        <!--打印显示区--end-->
        <table>
          <tr v-if="popTableData.status=='90'">
            <td>业务编号：</td>
            <td>{{popTableData.busCode}}</td>
            <td>托收日期：</td>
            <td>{{$tools.utils.formatDate(popTableData.openDate,{"symbol":"YYYY-MM-DD"})}}</td>
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
      <!--table布局--> 
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
          draweeName:'',
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
      //       return time.getTime() > Date.now() || time.getTime() < Date.now() - 3600 * 1000 * 24 * 365;
      //     }
      // },
      // pickerOptions1: {
      //     disabledDate(time) {
      //       return time.getTime() > Date.now() || time.getTime() < Date.now() - 3600 * 1000 * 24 * 365;
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
          //{trigger: 'change', validator:this.dateCompare,compareList:['startDateObj','endDateObj'],vm:this,formName:'form'}
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
      CRYOptions:[
        {value: '',label: '-----请选择-----'},
        {value: 'CNY',label: 'CNY人民币'},
        {value: 'HKD',label: 'HKD港元'},
        {value: 'USD',label: 'USD美元'},
        {value: 'EUR',label: 'EUR欧元'},
        {value: 'GBP',label: 'GBP英镑'},
        {value: 'JPY',label: 'JPY日元'},
        {value: 'SGD',label: 'SGD新加坡币'}
      ]
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
      _this.$tools.request(this,"CB050503.do",_this.form).then(data => {
          let errorCode = data.body.errorCode
          let errorMsg = data.body.errorMsg
          if (errorCode == '' || errorCode == null || errorCode == '0') {
              _this.form.turnPageTotalNum=Number(data.body.turnPageTotalNum)
              _this.tableData=data.body.exportCollectionList
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
    // dateCompare(rule, value, callback){
    //     let _form=rule.vm[rule.formName]
    //     let value1 = _form[rule.compareList[0]]
    //     let value2 = _form[rule.compareList[1]]
    //     let compareValue1 = this.$tools.utils.formatDate(value1)
    //     let compareValue2 = this.$tools.utils.formatDate(value2)
    //     console.log("时间跨度小于3个月:"+this.$tools.utils.compareDate(compareValue1,compareValue2,3))
    //     if(!this.$tools.utils.compareDate(compareValue1,compareValue2,3)){
    //       callback("查询时间跨度不能超过3个月")
    //     }else{
    //       callback()
    //     }
    // },
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
          let collectionTitleList = [{ sequenceNo: '网银流水号', busCode: '业务编号', openDate: '托收日期', payAccNo: '付款账号', amt: '金额', createDate: '币种', dueDate: '申请日期', status: '状态' }]
          let collectionDownLoadList = []
          for (let item of _this.tableData) {
            collectionDownLoadList.push({ 'sequenceNo': item.sequenceNo, 'busCode': item.busCode, 'openDate': this.$tools.utils.formatDate(item.openDate,{"symbol":"YYYY-MM-DD"}), 
            'payAccNo': item.payAccNo, 'amt': this.$tools.utils.currencyFormat(item.amt), 'CRY': this.$tools.dict.CRYTrans(item.CRY),
            'createDate': this.$tools.utils.formatDate(item.createDate,{"symbol":"YYYY-MM-DD"}),'status': this.$tools.dict.statusTrans(item.status)})
          }
          let body = []
          body.collectionTitleList = collectionTitleList
          body.collectionDownLoadList = collectionDownLoadList
          //let url = "/coporbank/CB050507.do"
          let url = "/api/CB050507.do"
          let form = $("<form></form>").attr("action", url).attr("method", "post")
          for (let i in collectionTitleList) {
            form.append($("<input></input>").attr("type", "hidden").attr("name", "collectionTitleList[" + i + '][sequenceNo]').attr("value", collectionTitleList[i].sequenceNo))
            form.append($("<input></input>").attr("type", "hidden").attr("name", "collectionTitleList[" + i + '][busCode]').attr("value", collectionTitleList[i].busCode))
            form.append($("<input></input>").attr("type", "hidden").attr("name", "collectionTitleList[" + i + '][openDate]').attr("value", collectionTitleList[i].openDate))
            form.append($("<input></input>").attr("type", "hidden").attr("name", "collectionTitleList[" + i + '][payAccNo]').attr("value", collectionTitleList[i].payAccNo))
            form.append($("<input></input>").attr("type", "hidden").attr("name", "collectionTitleList[" + i + '][amt]').attr("value", collectionTitleList[i].amt))
            form.append($("<input></input>").attr("type", "hidden").attr("name", "collectionTitleList[" + i + '][CRY]').attr("value", collectionTitleList[i].CRY))
            form.append($("<input></input>").attr("type", "hidden").attr("name", "collectionTitleList[" + i + '][createDate]').attr("value", collectionTitleList[i].createDate))
            form.append($("<input></input>").attr("type", "hidden").attr("name", "collectionTitleList[" + i + '][status]').attr("value", collectionTitleList[i].status))
          }
          for (let i in collectionDownLoadList) {
            form.append($("<input></input>").attr("type", "hidden").attr("name", "collectionDownLoadList[" + i + '][sequenceNo]').attr("value", collectionDownLoadList[i].sequenceNo))
            form.append($("<input></input>").attr("type", "hidden").attr("name", "collectionDownLoadList[" + i + '][busCode]').attr("value", collectionDownLoadList[i].busCode))
            form.append($("<input></input>").attr("type", "hidden").attr("name", "collectionDownLoadList[" + i + '][openDate]').attr("value", collectionDownLoadList[i].openDate))
            form.append($("<input></input>").attr("type", "hidden").attr("name", "collectionDownLoadList[" + i + '][payAccNo]').attr("value", collectionDownLoadList[i].payAccNo))
            form.append($("<input></input>").attr("type", "hidden").attr("name", "collectionDownLoadList[" + i + '][amt]').attr("value", collectionDownLoadList[i].amt))
              form.append($("<input></input>").attr("type", "hidden").attr("name", "collectionDownLoadList[" + i + '][CRY]').attr("value", collectionDownLoadList[i].CRY))
            form.append($("<input></input>").attr("type", "hidden").attr("name", "collectionDownLoadList[" + i + '][createDate]').attr("value", collectionDownLoadList[i].createDate))
            form.append($("<input></input>").attr("type", "hidden").attr("name", "collectionDownLoadList[" + i + '][status]').attr("value", collectionDownLoadList[i].status))
          }
          form.append($("<input></input>").attr("type", "hidden").attr("name", "bsnCode").attr("value", "CB050503"))
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
<style  lang="scss">
.exportCollectionStep2 p{margin-bottom:10px;}
.checkBox{border:1px solid #000; display:inline-block; width:14px; height:14px; vertical-align:middle; margin-right:2px;font-size: 12px;line-height: 16px;}
.positionLeft{padding-left:20px; position:relative;}
.positionLeft > .checkBox{position: absolute; left: 0px; top:4px;}
.underline{text-decoration:underline;}
</style>