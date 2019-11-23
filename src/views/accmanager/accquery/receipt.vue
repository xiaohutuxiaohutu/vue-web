
<template>
  <ynet-content id="templateName" class="main-content" :headerInformation="true" :headerMenu="true">
    <!--面包屑-->
    <ynet-breadcrumb></ynet-breadcrumb>
    <!--面包屑--end-->  
    <div class="functionalArea">
      <h3 class="functionalAreaTitle">填写查询信息</h3>
      <div class="p20">
        <div class="fourForm tableForm mt20">
            <!--table布局-->
            <el-form ref="form" :model="form" :rules="rules" class="formEmbedTable">
              <table>
                <caption>填写查询信息</caption>
                <tr>
                  <td><span class="cRed">*</span>账号：</td>
                  <td>
                    <el-form-item  prop="accNo" class="fullLine" id='accRecipt'>
                      <el-select v-model="form.accNo" placeholder="请选择">
                          <template v-for="item in accountList">
                            <el-option :label="item.cardNO" :value="item.payAccountNo"></el-option>
                          </template>         
                      </el-select>
                    </el-form-item>
                  </td>
                </tr>
                <tr>
                  <td><span class="cRed">*</span>交易类型：</td>
                  <td>
                    <el-form-item prop="transTypeValue" class="fullLine" id='accRecipt'>
                      <el-select v-model="form.transTypeValue" placeholder="请选择">
                         <template v-for="item in options">
                             <el-option  :label="item.label" :value="item.value"></el-option>    
                         </template>
                        
                      </el-select>
                    </el-form-item>
                  </td>
                </tr>
                <tr>
                  <td><span class="cRed">*</span>记账日期：</td>
                  <td>
                    <div class="inline-block receipt_i">
                    <el-form-item  prop="startDateObj" class="first">
                      <el-date-picker v-model="form.startDateObj" type="date" :editable="false" placeholder="开始日期"></el-date-picker>
                    </el-form-item>
                    <span>至</span>
                    <el-form-item  prop="endDateObj" class="second">
                      <el-date-picker v-model="form.endDateObj" type="date" :editable="false" placeholder="结束日期"></el-date-picker>
                    </el-form-item>
                  </div>
                    <span class="cBlue" style="cursor:pointer" @click='getToday'>当天</span>
                    <span class="cBlue" style="cursor:pointer" @click='getWeek'>最近一周</span>
                    <span class="cBlue" style="cursor:pointer" @click='getMonth'>最近30天</span>
                  </td>
                </tr>
              </table>
            </el-form>
            <!--table布局--END-->
        </div>
        <div class="btnArea mt20 tac">
            <el-button type="primary" @click="query(1)">查询</el-button>
            <el-button @click="resetForm('form')">重置</el-button>
        </div>
          <!--列表table-->
        <div class="tableData mt20">
          <el-table ref=receiptData :data="perTableData" @select="selectCheckBox" @select-all="selectCheckBox">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column  label="网银流水号" prop="bankFlowNo">
               <template scope="scope">
                <span><a class="cOrange" @click="queryDetail(Number(scope.$index))">{{scope.row.bankFlowNo}}</a></span>
              </template>
            </el-table-column>
            <el-table-column  label="金额" prop="tranMoney">
              <template  scope="scope">
                {{$tools.utils.currencyFormat(scope.row.tranMoney)}}
              </template>
            </el-table-column>
            <el-table-column  label="交易时间" prop="tranTime"></el-table-column>
            <el-table-column  label="回单检验码" prop="checkCode"></el-table-column>
            <el-table-column  label="交易类型" prop="transName"></el-table-column>
            <el-table-column  label="付款账号" prop="payAcco"></el-table-column>
            <el-table-column  label="付款账号名称" prop="payAccoName"></el-table-column>
            <el-table-column  label="收款账号" prop="receiveAcco"></el-table-column>
            <el-table-column  label="收款账号名称" prop="receiveAccoName"></el-table-column>
          </el-table>
          <!--分页-->
          <div class="block mt30 tar" v-if="totalsize>pageSize">
              <el-pagination
                @current-change="handleCurrentChange"
                :current-page.sync="currentPageNo"
                :page-size="pageSize"
                layout="prev, pager, next, jumper"
                :total="totalsize">
              </el-pagination>
            </div>
          <!--分页end-->
          <div class="btnArea mt20 tac">
            <el-button type="primary" @click="volumePrint">打印</el-button>
            <el-button type="primary" @click="volumePrint">下载</el-button>
          </div>

          <div class="reminder">
              <b>业务说明：</b>
              <div class="remiContent"> 1、带“*”为输入项为必输项</div>
              <div class="remiContent"> 2、如有疑问，请随时拨打客服电话与我们联系</div>
          </div>
        </div>
        <!--列表table end-->
      </div>
      </div>
    </div>
   
    <!--弹窗-->
    <el-dialog :visible.sync="dialogVisible" v-if="dialogVisible" :close-on-click-modal="false" :close-on-press-escape="false">
      <div slot="footer" class="dialog-footer btnArea">
          <div class="p5">
          <div class="printArea">
              <div v-for="detailData in recordPrintList" class="mt40 iePrint">
                  <div class="tal">
                      <img src="../../../images/common/logo.jpg" alt="">
                  </div>
                  <div class="electronicReceipt pageBreakAfter">
                     <div class="lectronicReceiptTitle">
                        <p class="tac mb20"style="font-size:16px;">创兴银行网上银行电子回单</p>
                        <p class="mb10 mlf10" style="overflow:hidden;">
                          <span class="fl"> 账户所属上级机构：{{parentOpenNode}}</span>
                          <span  class="fr">电子回单号：{{detailData.electronicNum}}</span>
                        </p>
                        <p class="mb10 mlf10" style="overflow:hidden;">
                          <span class="fl"> 账户所属机构：{{_payAccNodeName}}</span>
                          <span  class="fr">校验码：{{detailData.checkCode}}</span>
                        </p>
                      </div>
                      <!--table布局-->
                      <div class="receiptTable1">         
                          <table>
                              <tr>
                                  <td rowspan="3" style="width:20px;padding:0px 5px;"  class="tac">付款人</td>
                                  <td class="tac">户名</td>
                                  <td class="w300 tal">{{detailData.payAccoName}}</td>
                                  <td rowspan="3" style="width:20px;padding:0px 5px;"  class="tac">收款人</td>
                                  <td class="tac">户名</td>
                                  <td class="w300 tal">{{detailData.receiveAccoName}}</td>
                              </tr>
                              <tr>  
                                  <td class="w100 tac">账号</td>
                                  <td  class=" w300 tal">{{detailData.payAcco}}</td>
                                  <td  class="w100 tac">账号</td>            
                                  <td class="w300 tal">{{detailData.receiveAcco}}</td>
                              </tr>
                              <tr>         
                                  <td class="w200 tac">开户银行</td>
                                  <td class="w300 tal">{{detailData.payBankName}}</td>
                                  <td class="w200 tac">开户银行</td>
                                  <td class="w300 tal">{{detailData.receiveBankName}}</td>
                              </tr> 
                              <tr> 
                                  <td colspan="2" class="tac">交易币种</td>       
                                  <td class="w100 tal">{{formatCurrency(detailData.cryType)}}</td>
                                  <td colspan="2" class="tac">钞汇标识</td>
                                  <td class="w300 tal">--</td>
                              </tr>
                              <tr> 
                                  <td colspan="2" class="tac">交易金额</td>       
                                  <td class="w100 tal">{{$tools.utils.currencyFormat(detailData.tranMoney)}}</td>
                                  <td colspan="2" class="tac">手续费</td>       
                                  <td class="w300 tal" v-if="isTransDeal">{{$tools.utils.currencyFormat(detailData.poundage)}}</td>
                                  <td class="w300 tal" v-if="!isTransDeal">0.00</td>
                                  
                              </tr> 
                              <tr>
                                <td colspan="2" class="tac">合计</td>
                                <td colspan="4" class="tal" v-if="isTransDeal">
                                    <span>人民币大写：{{$tools.utils.toChinese(Number(detailData.tranMoney)+Number(detailData.poundage))}}</span>
                                    &nbsp&nbsp&nbsp&nbsp&nbsp
                                    <span v-if="detailData.cryType=='CNY'">￥</span>
                                    <span v-if="detailData.cryType=='HKD'">HK$</span>
                                    <span v-if="detailData.cryType=='USD'">$</span>
                                    <span v-if="detailData.cryType=='EUR'">€</span>
                                    <span v-if="detailData.cryType=='GBP'">£</span>
                                    <span v-if="detailData.cryType=='JPY'">J￥</span>
                                    <span v-if="detailData.cryType=='SGD'">S$</span>
                                    <span>{{$tools.utils.currencyFormat(Number(detailData.tranMoney)+Number(detailData.poundage))}}</span>
                                </td>  
                                <td colspan="4" class="tal" v-if="!isTransDeal">
                                    <span>人民币大写：{{$tools.utils.toChinese(Number(detailData.tranMoney))}}</span>
                                    &nbsp&nbsp&nbsp&nbsp&nbsp
                                    <span v-if="detailData.cryType=='CNY'">￥</span>
                                    <span v-if="detailData.cryType=='HKD'">HK$</span>
                                    <span v-if="detailData.cryType=='USD'">$</span>
                                    <span v-if="detailData.cryType=='EUR'">€</span>
                                    <span v-if="detailData.cryType=='GBP'">£</span>
                                    <span v-if="detailData.cryType=='JPY'">J￥</span>
                                    <span v-if="detailData.cryType=='SGD'">S$</span>
                                    <span>{{$tools.utils.currencyFormat(Number(detailData.tranMoney))}}</span>
                                  </td> 
                              </tr>
                              <tr> 
                                  <td colspan="2" class="tac">网银流水号</td>       
                                  <td class="w100 tal">{{detailData.bankFlowNo}}</td>
                                  <td colspan="2" class="tac">交易类型</td>
                                  <td class="w300 tal">{{detailData.transName}}</td>
                              </tr>
                              <tr> 
                                  <td colspan="2" class="tac">交易时间</td>       
                                  <td class="w100 tal">{{detailData.tranTime}}</td>
                                  <td colspan="2" class="tac">交易状态</td>
                                  <td class="w300 tal">成功</td>
                              </tr>
                              <tr>
                                <td colspan="2" class="tac">用途</td>
                                <td colspan="4" class="tal">{{detailData.tranPurpose}}</td>
                              </tr> 
                              <tr>
                                <td colspan="2" class="tac">附言</td>
                                <td colspan="4" class="tal">{{detailData.postScript}}</td>
                              </tr> 
                              <tr>
                                <td style="height:100px;color:red;" colspan="6" class="tac">重要提示：电子回单仅作记账参考，不作为收款方入账依据和发货依据，请勿重复记账</td>
                              </tr>               
                          </table>           
                          <table>
                          <tr> 
                                  <td class="w100 border_none tac">操作员：</td>       
                                  <td class="w200 border_none tal">{{detailData.operatorName}}</td>
                                  <td class="w200 border_none tac">已打印次数：</td>       
                                  <td class="w100 border_none tal">{{detailData.printNum}}次</td>
                                  <td class="w200 border_none tac">回单生成时间：</td>
                                  <td class="w200 border_none tal">{{detailData.tranTime}}</td>
                          </tr>
                          </table>
                      </div>
                      <span v-if='sealType=="1"'>
                        <img src="../../../images/receipt/sealImage-gz.png" alt="" class="receiptImg"> 
                      </span>
                      <span v-if='sealType=="2"'>
                        <img src="../../../images/receipt/sealImage-sz.png" alt="" class="receiptImg"> 
                      </span>
                      <span v-if='sealType=="3"'>
                        <img src="../../../images/receipt/sealImage-st.png" alt="" class="receiptImg"> 
                      </span>
                          
                   </div>
                   
              
              
              </div>
         </div>
              <div class="btnArea mt20 tac">
                  <el-button type="primary" @click="printer">打印</el-button>
                  <el-button type="primary" @click="printElectronic">下载</el-button>
                  <el-button @click="closeDialog">关闭</el-button>
              </div>
          </div>
      </div>

    </el-dialog>

    <!--弹窗end-->
    </div>
   
    
    <el-dialog  :visible.sync="isVisiable" v-if="formData.countryCode=='CHN'" :close-on-click-modal="false" :close-on-press-escape="false">
       <bankInAndOutElectronicOne v-if="isVisiable && formData.countryCode=='CHN'" :PrintListShowOne="PrintListShowOne" :payOpenBankNo="payOpenBankNo"></bankInAndOutElectronicOne>
    </el-dialog>
    <!--功能区end-->
    <el-dialog  :visible.sync="isVisiable" v-if="formData.countryCode!='CHN'" :close-on-click-modal="false" :close-on-press-escape="false">
       <bankInAndOutElectronicTwo v-if="isVisiable && formData.countryCode!='CHN'" :PrintListShowOne="PrintListShowOne" :payOpenBankNo="payOpenBankNo"></bankInAndOutElectronicTwo>
    </el-dialog>
  </ynet-content>
</template>

<script>
 import bankInAndOutElectronicOne from './components/bankInAndOutElectronicOne';
 import bankInAndOutElectronicTwo from './components/bankInAndOutElectronicTwo';

export default {
  name:'receipt',
  components: {
    bankInAndOutElectronicOne,
    bankInAndOutElectronicTwo
  },
  data() {
    return {
      logonImageCode:'',
      reciptFlag:'',
      dialogVisible:false,
      dialogVisible1:false,
      show:false,
      page_change:false,
      isVisiable:false,
      isTransDeal:false,
      sealType:'',
      payOpenBankNo:'',
      parentOpenNode:'',
      _payAccNodeName:'',
      printData:'',
      recordPrintList:[],
      PrintListShowOne:[],
    //   PrintListShowTwo:[],
      formData:{},
      form: {
        transTypeValue:'',
        accNo: '',
        startDateObj:'',
        endDateObj:'',
      }, //要提交的表单
      accountList:[],
      rules:{
           accNo: [{ required: true, message: '请选择账号', trigger: 'change' }],
           transTypeValue:[{ validator:this.validatorTransTypeValue, trigger: 'change' }],
           startDateObj: [{trigger: 'blur', validator:this.$tools.validator.dateCompare,compareList:['startDateObj','endDateObj'],vm:this,formName:'form'}],
           endDateObj: [{trigger: 'blur', validator:this.$tools.validator.dateCompare,compareList:['startDateObj','endDateObj'],vm:this,formName:'form'}],
        } ,
      pdfImage:'',
      currentPageNo: 1,
      pageSize:10,
      totalsize:0,
      tableData: [],
      perTableData: [],
      detailData:{},
      today:new Date(),
      options: [{value:'CB01010401-S',label:'一站式转账'},
                {value:'CB01010401-B',label:'批量转账'},
                {value:'CB01010406-A',label:'保证金存入'},
                {value:'CB01010402-T',label:'定期存入'},
                {value:'CB01010402-P',label:'定期支取'},
                {value:'CB01010403-J',label:'通知存入'},
                {value:'CB01010403-L',label:'通知支取'},
                {value:'CB01010404-I',label:'行内汇出汇款'},
                {value:'CB01010404-O',label:'行外汇出汇款'},
                {value:'CB01010405-E',label:'结汇'},
                {value:'CB01010405-F',label:'购汇'},
                {value:'CB01010405-C',label:'套汇'},
                {value:'CB01010401-U',label:'上划'},
                {value:'CB01010401-D',label:'下拨'},
                {value:'CB01010401-G',label:'操作子公司账户转账'},
                {value:'CB01010401-H',label:'内部调拨'},
                {value:'CB01010401-K',label:'资金归集'}

                ],
    }
  },
  methods: {
    //获取用户账号
    getCardList(){
      let _this = this
      let _list = _this.$tools.storage.get("user","save")
      let _operAccInfoList = _list.operAccInfoList
  		for(let i=0;i<_operAccInfoList.length;i++){
              let _acno = _operAccInfoList[i].accNo
              let _name = ''
              if('' == _operAccInfoList[i].alias){
                  _name = _operAccInfoList[i].accName
              }else{
                  _name = _operAccInfoList[i].alias
              }
              
              let _currType =  _this.formatCurrency(_operAccInfoList[i].currType)  
              // let _lable = _this.$tools.utils.mask(_acno,{beforeIndex:3,behindIndex:4})
              // let cardNO = _lable+_name
              let cardNO = _acno + '[' + _currType + ']' + '[' + _name + ']'
              // let cardNO = _acno+'-'+_name
              let payAccountNo = _acno
              _this.accountList.push({"payAccountNo":payAccountNo,"cardNO":cardNO})
  		}
    },
    isSign(){
        let _this = this
        let queryData = {}
        queryData.reqTP='E'
        _this.$tools.request(_this,"CB01010412.do",queryData).then(
          data =>{
            if('0' == data.body.errorCode){
              _this.reciptFlag = data.body.reciptFlag//0：签约,1：未签约
              if('0' != _this.reciptFlag) {
                  _this.reciptFlag ='1'
                  _this.$alert('尚未开通电子回单业务', '提示', {
                        confirmButtonText: '确定'
                });
              }
            }else{
              _this.$alert('查询电子回单业务状态失败', '提示', {
                    confirmButtonText: '确定'
              });
            }
          }
        )
      },
    query(page) {
        let _this = this
        if( '0' != _this.reciptFlag){
            return 
        }
        _this.currentPageNo = page
        _this.recordPrintList = []
        if( 'CB01010401' == (_this.form.transTypeValue).split("-")[0]){  // 请求为CB01010401
              _this.isTransDeal = true
              _this.$refs.form.validate((valid)  => {
                  if(valid){
                  let queryData = {}
                  // queryData.accNo = '80190030400301015'
                  queryData.accNo = _this.form.accNo
                  queryData.transType = (_this.form.transTypeValue).split("-")[1]
                  queryData.beginDate = _this.$tools.utils.formatDate(_this.form.startDateObj)
                  queryData.endDate = _this.$tools.utils.formatDate(_this.form.endDateObj)
                  queryData.currentPageNo = page

                  // let today1 =  _this.$tools.utils.formatDate(_this.today)
                  // if(_this.form.startDate > today1 || _this.form.endDate > today1 ){    //查询时间和截止时间不能大于当前日期
                  //     _this.$alert('查询时间不能大于当前日期', '提示', {
                  //        confirmButtonText: '确定'
                  //     })
                  //     return
                  // }
                  // let start1 = _this.form.startDateObj.getTime()
                  // let end1 = _this.form.endDateObj.getTime()
                
                  // if( (_this.today.getTime() - start1) > (1000*3600*24*365) ){
                  //     _this.$alert('查询开始时间为最近一年内', '提示', {
                  //           confirmButtonText: '确定'
                  //     })
                  //     return
                  // }

            
                    _this.$tools.request(_this, "CB01010401.do", queryData).then(
                      data => {
                        _this.tableData = []
                        _this.perTableData = []
                        if('0' == data.body.errorCode){
                          _this.totalsize = Number(data.body.totalCount)
                          _this.tableData = data.body.electronicTransList
                          for(let i = 0;i<_this.tableData.length;i++){
                              if('CB01010401-A' == _this.form.transTypeValue){ //资金归集
                                  _this.tableData[i].tranPurpose = '--'
                                  _this.tableData[i].postScript = '--'
                                  _this.tableData[i].poundage = '0.00'
                              }
                              if('' == _this.tableData[i].poundage){
                                _this.tableData[i].poundage = '0.00'
                              }
                            console.log('_this.tableData[i].tranTime11111',_this.tableData[i])
                              _this.tableData[i].tranTime = _this.$tools.utils.formatDateSymbol(_this.tableData[i].tranTime,"YYYY-MM-DD HH:mm:ss")
                              // console('_this.tableData[i].tranTime222222',_this.tableData[i].tranTime)
                              _this.tableData[i].transName = _this.formatTransName(_this.form.transTypeValue)
                          //  _this.tableData[i].transType = _this.form.transTypeValue.transType
                          }
                          
                          let queryData1 = {}
                          let _list = _this.$tools.storage.get("user","save")
                          let _operAccInfoList = _list.operAccInfoList
                          let _openBankNo1 = ''
                          for(let i=0;i<_operAccInfoList.length;i++){
                              if (_this.form.accNo == _operAccInfoList[i].accNo) {
                                  _openBankNo1 = _operAccInfoList[i].openBankNo
                                  break
                              }
                          }
                          queryData1.brhId = _openBankNo1
                          _this.$tools.request(_this, "CB060107.do",queryData1).then(
                              data => {
                                  if('0' == data.body.errorCode){
                                      _this._payAccNodeName = data.body.brhName
                                      console.log("_payAccNodeName1",_this._payAccNodeName)
                                  }else{
                                      _this._payAccNodeName = '--'
                                  }
                              }
                          )

                          let queryData2 = {}
                          queryData2.brhId = _openBankNo1
                          _this.$tools.request(_this, "CB060108.do",queryData2).then(
                              data => {
                                  if('0' == data.body.errorCode){
                                      _this.parentOpenNode = data.body.highterBrhName
                                      console.log("parentOpenNode",_this.parentOpenNode)
                                  }else{
                                      _this.parentOpenNode = '--'
                                  }
                              }
                          )

                            _this.perTableData =  _this.tableData
                      }else{
                        
                      }
                    }
              )}
          })
          return 
        }
        if( 'CB01010404-I' == _this.form.transTypeValue){  // 行内转账
              _this.isTransDeal = false
              _this.$refs.form.validate((valid)  => {
                  if(valid){
                      let queryData = {}
                    //   queryData.accNo = '8000011360002701'
                      queryData.accNo = _this.form.accNo
                      queryData.transType = (_this.form.transTypeValue).split("-")[1]
                      queryData.beginDate = _this.$tools.utils.formatDate(_this.form.startDateObj)
                      queryData.endDate = _this.$tools.utils.formatDate(_this.form.endDateObj)
                      queryData.currentPageNo = page

                      _this.$tools.request(_this, "CB01010404.do", queryData).then(
                          data => {
                            _this.tableData = []
                            _this.perTableData = []
                            if('0' == data.body.errorCode){
                              _this.tableData = []
                              _this.perTableData = []
                              _this.totalsize = Number(data.body.totalCount)
                              _this.tableData = data.body.inAndOutInfoList
                              for(let i = 0;i<_this.tableData.length;i++){
                                if('' !=  _this.tableData[i].spotExAcc){
                                    _this.tableData[i].payAcco = _this.tableData[i].spotExAcc
                                }else if('' !=  _this.tableData[i].purchasedExAcc){
                                    _this.tableData[i].payAcco = _this.tableData[i].purchasedExAcc
                                }else{
                                    _this.tableData[i].payAcco = _this.tableData[i].otherAcc
                                }
                                _this.tableData[i].payAccoName = _this.tableData[i].chName
                                // _this.tableData[i].payAcco = _this.tableData[i].payAccountShow
                                // _this.tableData[i].payAccoName = _this.tableData[i].tranTime
                                // _this.tableData[i].payBankName = _this.tableData[i].tranTime
                                _this.tableData[i].tranTime = _this.$tools.utils.formatDateSymbol( _this.tableData[i].tranTime,"YYYY-MM-DD HH:mm:ss")
                                _this.tableData[i].transName = _this.formatTransName(_this.form.transTypeValue)

                            
                          }
                              _this.perTableData =  _this.tableData
                              
                            }else{

                            }
                          }
                        )
                  }
              })
          return 
        }
        if( 'CB01010404-O' == _this.form.transTypeValue ){   //行外转账
                _this.isTransDeal = false
              _this.$refs.form.validate((valid)  => {
                  if(valid){
                      let queryData = {}
                    //   queryData.accNo = '8000011360002701'
                      queryData.accNo = _this.form.accNo
                      queryData.transType = (_this.form.transTypeValue).split("-")[1]
                      queryData.beginDate = _this.$tools.utils.formatDate(_this.form.startDateObj)
                      queryData.endDate = _this.$tools.utils.formatDate(_this.form.endDateObj)
                      queryData.currentPageNo = page

                      _this.$tools.request(_this, "CB01010404.do", queryData).then(
                          data => {
                            _this.tableData = []
                            _this.perTableData = []
                            if('0' == data.body.errorCode){
                              _this.totalsize = Number(data.body.totalCount)
                              _this.tableData = data.body.inAndOutInfoList
                              console.log("_this.tableData",_this.tableData)
                              for(let i = 0;i<_this.tableData.length;i++){
                                  if('' !=  _this.tableData[i].spotExAcc){
                                    _this.tableData[i].payAcco = _this.tableData[i].spotExAcc
                                  }else if('' !=  _this.tableData[i].purchasedExAcc){
                                      _this.tableData[i].payAcco = _this.tableData[i].purchasedExAcc
                                  }else{
                                      _this.tableData[i].payAcco = _this.tableData[i].otherAcc
                                  }
                                  _this.tableData[i].payAccoName = _this.tableData[i].chName
                                  // _this.tableData[i].payAcco = _this.tableData[i].payAccountShow
                                  // _this.tableData[i].payAccoName = _this.tableData[i].tranTime
                                  // _this.tableData[i].payBankName = _this.tableData[i].tranTime
                                  _this.tableData[i].tranTime = _this.$tools.utils.formatDateSymbol( _this.tableData[i].tranTime,"YYYY-MM-DD HH:mm:ss")
                                  _this.tableData[i].transName = _this.formatTransName(_this.form.transTypeValue)
                              }
                                 _this.perTableData =  _this.tableData
                              
                            }else{

                            }
                          }
                        )
                  }
              })

          return 
        }
        if( 'CB01010403' == (_this.form.transTypeValue).split("-")[0]){   //通知存款
                _this.isTransDeal = false
              _this.$refs.form.validate((valid)  => {
                  if(valid){
                      let queryData = {}
                      // queryData.accNo = '8000011540102701'
                      queryData.accNo = _this.form.accNo
                      queryData.transType = (_this.form.transTypeValue).split("-")[1]
                      queryData.beginDate = _this.$tools.utils.formatDate(_this.form.startDateObj)
                      queryData.endDate = _this.$tools.utils.formatDate(_this.form.endDateObj)
                      queryData.currentPageNo = page

                      _this.$tools.request(_this, "CB01010403.do", queryData).then(
                          data => {
                            _this.tableData = []
                            _this.perTableData = []
                            if('0' == data.body.errorCode){
                              _this.totalsize = Number(data.body.totalCount)
                              _this.tableData = data.body.callElectronicList
                              for(let i = 0;i<_this.tableData.length;i++){
                                _this.tableData[i].tranTime = _this.$tools.utils.formatDateSymbol( _this.tableData[i].tranTime,"YYYY-MM-DD HH:mm:ss")
                                if('1' == _this.tableData[i].transType){
                                      _this.tableData[i].transName = '通知存入'
                                }else if('2' == _this.tableData[i].transType){
                                    _this.tableData[i].transName = '通知支取'
                                }else if('4' == _this.tableData[i].transType){
                                    _this.tableData[i].transName = '通知支取'
                                }
                                // _this.tableData[i].transName = _this.formatTransName(_this.form.transTypeValue)
                                if('1' == _this.tableData[i].transType){  //存入类型
                                   
                                      _this.tableData[i].receiveAcco = _this.tableData[i].mainAcc
                                      _this.tableData[i].receiveAccoName = _this.tableData[i].mainAccName
                                      _this.tableData[i].receiveBankName = _this.tableData[i].callAccOpenName
                                 }else{
                                      _this.tableData[i].payAcco = _this.tableData[i].mainAcc
                                      _this.tableData[i].payAccoName = _this.tableData[i].mainAccName
                                      _this.tableData[i].payAccNode = _this.tableData[i].callAccOpenNode
                                      _this.tableData[i].payBankName = _this.tableData[i].callAccOpenName
                                 }
                              }
                              let queryData1 = {}
                              let _list = _this.$tools.storage.get("user","save")
                              let _operAccInfoList = _list.operAccInfoList
                              let _openBankNo1 = ''
                              for(let i=0;i<_operAccInfoList.length;i++){
                                  if (_this.form.accNo == _operAccInfoList[i].accNo) {
                                      _openBankNo1 = _operAccInfoList[i].openBankNo
                                      break
                                  }
                              }
                              queryData1.brhId = _openBankNo1
                              _this.$tools.request(_this, "CB060107.do",queryData1).then(
                                  data => {
                                      if('0' == data.body.errorCode){
                                          _this._payAccNodeName = data.body.brhName
                                          console.log("_payAccNodeName1",_this._payAccNodeName)
                                      }else{
                                          _this._payAccNodeName = '--'
                                      }
                                  }
                              )
                              let queryData2 = {}
                              // queryData2.brhId = _this.form.accNo
                              queryData2.brhId = _openBankNo1
                              _this.$tools.request(_this, "CB060108.do",queryData2).then(
                                  data => {
                                      if('0' == data.body.errorCode){
                                          _this.parentOpenNode = data.body.highterBrhName
                                          console.log("parentOpenNode",_this.parentOpenNode)
                                      }else{
                                          _this.parentOpenNode = '--'
                                      }
                                  }
                              )
                              _this.perTableData =  _this.tableData
                              
                            }else{

                            }
                          }
                        )
                  }
              })

          return 
        }
        if( 'CB01010402' == (_this.form.transTypeValue).split("-")[0]){   //定期存款
              console.log("进来了4")
              _this.isTransDeal = false
              console.log('(_this.form.transTypeValue).split("-")[0]',(_this.form.transTypeValue).split("-")[0])
              let url = (_this.form.transTypeValue).split("-")[0]
              _this.$refs.form.validate((valid)  => {
                  if(valid){
                  let queryData = {}
                  // queryData.accNo = '8900001090001701'
                  queryData.accNo = _this.form.accNo
                  queryData.transType = (_this.form.transTypeValue).split("-")[1]
                  queryData.beginDate = _this.$tools.utils.formatDate(_this.form.startDateObj)
                  queryData.endDate = _this.$tools.utils.formatDate(_this.form.endDateObj)
                  queryData.currentPageNo = page

                  // let today1 =  _this.$tools.utils.formatDate(_this.today)
                  // if(_this.form.startDate > today1 || _this.form.endDate > today1 ){    //查询时间和截止时间不能大于当前日期
                  //     _this.$alert('查询时间不能大于当前日期', '提示', {
                  //        confirmButtonText: '确定'
                  //     })
                  //     return
                  // }
                  // let start1 = _this.form.startDateObj.getTime()
                  // let end1 = _this.form.endDateObj.getTime()
                
                  // if( (_this.today.getTime() - start1) > (1000*3600*24*365) ){
                  //     _this.$alert('查询开始时间为最近一年内', '提示', {
                  //           confirmButtonText: '确定'
                  //     })
                  //     return
                  // }

            
                    _this.$tools.request(_this, url+".do", queryData).then(
                      data => {
                         _this.tableData = []
                          _this.perTableData = []
                        if('0' == data.body.errorCode){
                          _this.totalsize = Number(data.body.totalCount)
                          _this.tableData = data.body.termElectronicList
                          for(let i = 0;i<_this.tableData.length;i++){
                              _this.tableData[i].tranTime = _this.$tools.utils.formatDateSymbol( _this.tableData[i].tranTime,"YYYY-MM-DD HH:mm:ss")
                              
                              if('1' == _this.tableData[i].transName){
                                  _this.tableData[i].receiveAcco = _this.tableData[i].termPayAcco
                                  _this.tableData[i].receiveAccoName = _this.tableData[i].termPayAccoName
                                  _this.tableData[i].receiveBankName = _this.tableData[i].termBankName
                                  _this.tableData[i].transName = '定期存入'
                              }else if('2' == _this.tableData[i].transName){  //支取
                                  _this.tableData[i].payAcco = _this.tableData[i].termPayAcco
                                  _this.tableData[i].payAccoName = _this.tableData[i].termPayAccoName
                                  _this.tableData[i].payAccNode = _this.tableData[i].termOpenNode
                                  _this.tableData[i].payBankName = _this.tableData[i].termBankName
                                  _this.tableData[i].transName = '定期支取'
                              }
                                  // _this.tableData[i].receiveBankName = _this.tableData[i].payBankName
                                  // _this.tableData[i].payBankName = _this.tableData[i].payBankName
                          //  _this.tableData[i].transType = _this.form.transTypeValue.transType
                          }
                          let queryData1 = {}
                          let _list = _this.$tools.storage.get("user","save")
                          let _operAccInfoList = _list.operAccInfoList
                          let _openBankNo1 = ''
                          for(let i=0;i<_operAccInfoList.length;i++){
                              if (_this.form.accNo == _operAccInfoList[i].accNo) {
                                  _openBankNo1 = _operAccInfoList[i].openBankNo
                                  break
                              }
                          }
                          queryData1.brhId = _openBankNo1
                          _this.$tools.request(_this, "CB060107.do",queryData1).then( //根据网点号查网点名称
                              data => {
                                  if('0' == data.body.errorCode){
                                      _this._payAccNodeName = data.body.brhName
                                      console.log("_payAccNodeName1",_this._payAccNodeName)
                                  }else{
                                      _this._payAccNodeName = '--'
                                  }
                              }
                          )
                          let queryData2 = {}
                          queryData2.brhId = _openBankNo1
                          _this.$tools.request(_this, "CB060108.do",queryData2).then(//根据网点号查父网点名称
                              data => {
                                  if('0' == data.body.errorCode){
                                      _this.parentOpenNode = data.body.highterBrhName
                                      console.log("parentOpenNode",_this.parentOpenNode)
                                  }else{
                                      _this.parentOpenNode = '--'
                                  }
                              }
                          )
                          _this.perTableData =  _this.tableData
                      }else{
                        
                      }
                    }
              )}
          })
        return 
        }
        if( ('CB01010401' != (_this.form.transTypeValue).split("-")[0])  && ('CB01010402' != (_this.form.transTypeValue).split("-")[0]) && ('CB01010404' != (_this.form.transTypeValue).split("-")[0]) && ('CB01010403' != (_this.form.transTypeValue).split("-")[0]) ){
              console.log("进来了4")
              _this.isTransDeal = false
              console.log('(_this.form.transTypeValue).split("-")[0]',(_this.form.transTypeValue).split("-")[0])
              let url = (_this.form.transTypeValue).split("-")[0]
              _this.$refs.form.validate((valid)  => {
                  if(valid){
                  let queryData = {}
                //   queryData.accNo = '8000011560003901'
                  queryData.accNo = _this.form.accNo
                  queryData.transType = (_this.form.transTypeValue).split("-")[1]
                  queryData.beginDate = _this.$tools.utils.formatDate(_this.form.startDateObj)
                  queryData.endDate = _this.$tools.utils.formatDate(_this.form.endDateObj)
                  queryData.currentPageNo = page

                  // let today1 =  _this.$tools.utils.formatDate(_this.today)
                  // if(_this.form.startDate > today1 || _this.form.endDate > today1 ){    //查询时间和截止时间不能大于当前日期
                  //     _this.$alert('查询时间不能大于当前日期', '提示', {
                  //        confirmButtonText: '确定'
                  //     })
                  //     return
                  // }
                  // let start1 = _this.form.startDateObj.getTime()
                  // let end1 = _this.form.endDateObj.getTime()
                
                  // if( (_this.today.getTime() - start1) > (1000*3600*24*365) ){
                  //     _this.$alert('查询开始时间为最近一年内', '提示', {
                  //           confirmButtonText: '确定'
                  //     })
                  //     return
                  // }

            
                    _this.$tools.request(_this, url+".do", queryData).then(
                      data => {
                         _this.tableData = []
                          _this.perTableData = []
                        if('0' == data.body.errorCode){
                          _this.totalsize = Number(data.body.totalCount)
                          _this.tableData = data.body.electronicCounterList
                          for(let i = 0;i<_this.tableData.length;i++){
                              _this.tableData[i].tranTime = _this.$tools.utils.formatDateSymbol( _this.tableData[i].tranTime,"YYYY-MM-DD HH:mm:ss")
                              
                              if('CB01010406' == (_this.form.transTypeValue).split("-")[0]){ //保证金存入
                                  if('0' == _this.tableData[i].transName){
                                      _this.tableData[i].transName = '活期保证金存入'
                                  }else if('1' == _this.tableData[i].transName){
                                      _this.tableData[i].transName = '定期保证金存入'
                                  }
                              }else{
                                _this.tableData[i].transName = _this.formatTransName(_this.form.transTypeValue)
                              }
                          //  _this.tableData[i].transType = _this.form.transTypeValue.transType
                          }
                          if( _this.tableData.payBankName == ""){
                            _this.tableData.payBankName =  _this.tableData.receiveBankName
                          }
                          let queryData1 = {}
                          let _list = _this.$tools.storage.get("user","save")
                          let _operAccInfoList = _list.operAccInfoList
                          let _openBankNo1 = ''
                          for(let i=0;i<_operAccInfoList.length;i++){
                              if (_this.form.accNo == _operAccInfoList[i].accNo) {
                                  _openBankNo1 = _operAccInfoList[i].openBankNo
                                  break
                              }
                          }
                          queryData1.brhId = _openBankNo1
                          _this.$tools.request(_this, "CB060107.do",queryData1).then(
                              data => {
                                  if('0' == data.body.errorCode){
                                      _this._payAccNodeName = data.body.brhName
                                      console.log("_payAccNodeName1",_this._payAccNodeName)
                                  }else{
                                      _this._payAccNodeName = '--'
                                  }
                              }
                          )
                          let queryData2 = {}
                          queryData2.brhId = _openBankNo1
                          _this.$tools.request(_this, "CB060108.do",queryData2).then(
                              data => {
                                  if('0' == data.body.errorCode){
                                      _this.parentOpenNode = data.body.highterBrhName
                                      console.log("parentOpenNode",_this.parentOpenNode)
                                  }else{
                                      _this.parentOpenNode = '--'
                                  }
                              }
                          )
                          _this.perTableData =  _this.tableData
                      }else{
                        
                      }
                    }
              )}
          })
        return 
        }
      
    },
    queryDetail(index){
      let _this = this
      let _list = _this.$tools.storage.get("user","save")
      let _operAccInfoList = _list.operAccInfoList
      let _openBankNo = ''
  		for(let i=0;i<_operAccInfoList.length;i++){
          if (_this.form.accNo == _operAccInfoList[i].accNo) {
              _openBankNo = _operAccInfoList[i].openBankNo
              break
          }
  		}
      
      let queryData3 = {}
      queryData3.openBankNo = _openBankNo
      _this.$tools.request(_this, "CB01010411.do",queryData3).then(
          data => {
              if('0' == data.body.errorCode){
                  _this.sealType = data.body.sealType
                  console.log("_this.sealType",_this.sealType)
              }else{
              }
          }
      )

       if( 'CB01010404-I' == _this.form.transTypeValue){  //行内
             _this.isVisiable = true
            //  _this.formData = {}
             _this.formData = _this.tableData[index]
             console.log("_this.formData",_this.formData.countryCode)
             console.log("_this.tableData[index]",_this.tableData[index])
              _this.recordPrintList = []
              _this.PrintListShowOne = []
              _this.payOpenBankNo = _this.form.accNo
              _this.PrintListShowOne.push(_this.formData)
              return 
       }
       if( 'CB01010404-O' == _this.form.transTypeValue ){//行外
             _this.isVisiable = true
            //  _this.formData = {}
             _this.formData = _this.tableData[index]
             console.log("_this.formData",_this.formData.countryCode)
             _this.recordPrintList = []
             _this.PrintListShowOne = []
             _this.payOpenBankNo = _this.form.accNo
             _this.PrintListShowOne.push(_this.formData)
              return
       }
       if('CB01010404' != (_this.form.transTypeValue).split("-")[0]){ //转账
          _this.dialogVisible =true
            _this.detailData = _this.tableData[index]
            // _this.detailData.cryType = _this.formatCurrency(_this.detailData.cryType)
            // _this.detailData.transType = _this.formatTransType(_this.detailData.transType)
            _this.recordPrintList = []
            _this.recordPrintList.push(_this.detailData)
            return
       }
      
    },
    volumePrint(){
      let _this = this
      if( _this.recordPrintList==null ||_this.recordPrintList==''){
    	  _this.$alert('请选择电子回单', '提示')
      }
      let _list = _this.$tools.storage.get("user","save")
      let _operAccInfoList = _list.operAccInfoList
      let _openBankNo = ''
  		for(let i=0;i<_operAccInfoList.length;i++){
          if (_this.form.accNo == _operAccInfoList[i].accNo) {
              _openBankNo = _operAccInfoList[i].openBankNo
              break
          }
  		}
      
      let queryData3 = {}
      queryData3.openBankNo = _openBankNo
      _this.$tools.request(_this, "CB01010411.do",queryData3).then(
          data => {
              if('0' == data.body.errorCode){
                  _this.sealType = data.body.sealType
                  console.log("_this.sealType",_this.sealType)
              }else{
              }
          }
      )
       if( 'CB01010404-I' == _this.form.transTypeValue){
           if(_this.recordPrintList.length){
              if(_this.recordPrintList.length == 1){
                _this.isVisiable = true
                _this.payOpenBankNo = _this.form.accNo
                _this.PrintListShowOne = _this.recordPrintList
              }else {
                  _this.$alert("行内外汇出汇款每次只能选择一条记录打印查询！", '提示', {
                        confirmButtonText: '确定'
                    })
          }
          }
          return
      }
      if( 'CB01010404-O' == _this.form.transTypeValue ){
          if(_this.recordPrintList.length){
              if(_this.recordPrintList.length == 1){
                _this.isVisiable = true
                _this.payOpenBankNo = _this.form.accNo
                _this.PrintListShowOne = _this.recordPrintList
              }else {
                _this.$alert("行内外汇出汇款每次只能选择一条记录打印查询！", '提示', {
                     confirmButtonText: '确定'
                })
              }
          }  
        return
      }
      if('CB01010404' != (_this.form.transTypeValue).split("-")[0]){
          if(_this.recordPrintList.length){
            _this.dialogVisible =true
          }
        return
      }

    },
    closeDialog(){
        let _this = this
        _this.dialogVisible=false
        _this.recordPrintList = []
        _this.$refs.receiptData.clearSelection();
    },
    printer(){
       let _this = this
       _this.$tools.print()
       _this.addPrintNum()
    },

    printElectronic(){
      let _this = this
      _this.dialogVisible = false

      let fieldBeanList1 = []
      for(let i = 0;i<_this.recordPrintList.length;i++){
         let temp = 'tempDate'+ i
         temp = {}
         console.log('temp',temp)
         temp.ParentOrg  = _this.parentOpenNode
         temp.payAccNode =  _this._payAccNodeName
         temp.electronicNum =  _this.recordPrintList[i].electronicNum
         temp.checkCode =  _this.recordPrintList[i].checkCode
         temp.payAccoName =  _this.recordPrintList[i].payAccoName
         temp.payAcco =  _this.recordPrintList[i].payAcco
         temp.payBankName =  _this.recordPrintList[i].payBankName
         temp.receiveAccoName =  _this.recordPrintList[i].receiveAccoName
         temp.receiveAcco =  _this.recordPrintList[i].receiveAcco
         temp.receiveBankName =  _this.recordPrintList[i].receiveBankName
         temp.cryType =  _this.formatCurrency(_this.recordPrintList[i].cryType)
         temp.Flag =  ''
         temp.tranMoney =  _this.$tools.utils.currencyFormat(_this.recordPrintList[i].tranMoney)
         if(_this.isTransDeal){
            temp.poundage =  _this.$tools.utils.currencyFormat(_this.recordPrintList[i].poundage)
         }else if(!_this.isTransDeal){
            temp.poundage = '0.00'
         }
         let crySign = ''
         if('CNY' == _this.recordPrintList[i].cryType){
            crySign = '¥'
         }else if('HKD' == _this.recordPrintList[i].cryType){
            crySign = 'HK$'
         }else if('USD' == _this.recordPrintList[i].cryType){
            crySign = '$'
         }else if('EUR' == _this.recordPrintList[i].cryType){
            crySign = '€'
         }else if('GBP' == _this.recordPrintList[i].cryType){
            crySign = '£'
         }else if('JPY' == _this.recordPrintList[i].cryType){
            crySign = 'J¥'
         }else if('SGD' == _this.recordPrintList[i].cryType){
            crySign = 'S$'
         }
         if(_this.isTransDeal){
            // temp.TotalMoney ="人民币大写： " + _this.$tools.utils.toChinese(Number(_this.recordPrintList[i].tranMoney)+Number(_this.recordPrintList[i].poundage)) + '  '+ crySign + _this.$tools.utils.currencyFormat(Number(_this.recordPrintList[i].tranMoney)+Number(_this.recordPrintList[i].poundage))
            temp.TotalMoney ="人民币大写： " + _this.$tools.utils.toChinese(Number(_this.recordPrintList[i].tranMoney)+Number(_this.recordPrintList[i].poundage)) 
            temp.numTotal = crySign +" " + _this.$tools.utils.currencyFormat(Number(_this.recordPrintList[i].tranMoney)+Number(_this.recordPrintList[i].poundage))
         }
         if(!_this.isTransDeal){
            // temp.TotalMoney = "人民币大写： " + _this.$tools.utils.toChinese(Number(_this.recordPrintList[i].tranMoney)) +'  ' + crySign + _this.$tools.utils.currencyFormat(Number(_this.recordPrintList[i].tranMoney))
            temp.TotalMoney = "人民币大写： " + _this.$tools.utils.toChinese(Number(_this.recordPrintList[i].tranMoney)) 
            temp.numTotal = crySign +" "  + _this.$tools.utils.currencyFormat(Number(_this.recordPrintList[i].tranMoney))
         }
         temp.hisFlowNo =  _this.recordPrintList[i].bankFlowNo
        //  temp.TotalMoney =  _this.recordPrintList[i].tranMoney
         temp.transName =  _this.recordPrintList[i].transName
         temp.tranTime =  _this.recordPrintList[i].tranTime
         temp.BusinessStatus =  '成功'
         temp.tranPurpose =  _this.recordPrintList[i].tranPurpose
         temp.postScript =  _this.recordPrintList[i].postScript
         temp.operatorNo =  _this.recordPrintList[i].operatorName
         temp.printNum =  _this.recordPrintList[i].printNum
         temp.printTime =  _this.recordPrintList[i].tranTime
         console.log('temp之后',temp)
         fieldBeanList1.push(temp)
      }
      let queryData = {}
      queryData.fieldBeanList1 = fieldBeanList1
    //   // _this.dialogVisible=false,
    //  let aa =  JSON.stringify(queryData)
    //  console.log("aa",aa)
    //  let bb = "/api/CB01010408.do?versionNo=0.1&"+aa
    //  _this.printData = bb
    //   console.log("aa",aa)

    //  let listTemp = JSON.stringify(fieldBeanList1)
    //  console.log('listTemp',listTemp)
    // _this.logonImageCode= encodeURI(encodeURI("/api/CB01010408.do?versionNo=0.1&fieldBeanList1="+aa))  //build后
      let _list = _this.$tools.storage.get("user","save")
      let _operAccInfoList = _list.operAccInfoList
      let _openBankNo = ''
  		for(let i=0;i<_operAccInfoList.length;i++){
          if (_this.form.accNo == _operAccInfoList[i].accNo) {
              _openBankNo = _operAccInfoList[i].openBankNo
              break
          }
  		}
      // queryData.openBankNo = _openBankNo
    //   let url = "/api/CB01010408.do"
      let url = "/corpbank/CB01010408.do"
      let form = $("<form></form>").attr("action",url).attr("method","post")
      // let form = $("<form></form>").attr("action",url).attr("method","post").attr("enctype","multipart/form-data")
      // let form = $("<form></form>").attr("action",url).attr("method","post").attr("enctype","application/x-www-form-urlencoded")
      form.append($("<input></input>").attr("type","hidden").attr("name","versionNo").attr("value",'0.1'))
      form.append($("<input></input>").attr("type","hidden").attr("name","openBankNo").attr("value",_openBankNo))
      for(let i = 0;i<fieldBeanList1.length;i++){
        form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList1["+i+"]"+"[ParentOrg]").attr("value",fieldBeanList1[i].ParentOrg))
        form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList1["+i+"]"+"[payAccNode]").attr("value",fieldBeanList1[i].payAccNode))
        form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList1["+i+"]"+"[electronicNum]").attr("value",fieldBeanList1[i].electronicNum))
        form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList1["+i+"]"+"[checkCode]").attr("value",fieldBeanList1[i].checkCode))
        form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList1["+i+"]"+"[payAccoName]").attr("value",fieldBeanList1[i].payAccoName))
        form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList1["+i+"]"+"[payAcco]").attr("value",fieldBeanList1[i].payAcco))
        form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList1["+i+"]"+"[payBankName]").attr("value",fieldBeanList1[i].payBankName))
        form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList1["+i+"]"+"[receiveAccoName]").attr("value",fieldBeanList1[i].receiveAccoName))
        form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList1["+i+"]"+"[receiveAcco]").attr("value",fieldBeanList1[i].receiveAcco))
        form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList1["+i+"]"+"[receiveBankName]").attr("value",fieldBeanList1[i].receiveBankName))
        form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList1["+i+"]"+"[cryType]").attr("value",fieldBeanList1[i].cryType))
        form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList1["+i+"]"+"[Flag]").attr("value",fieldBeanList1[i].Flag))
        form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList1["+i+"]"+"[tranMoney]").attr("value",fieldBeanList1[i].tranMoney))
        form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList1["+i+"]"+"[poundage]").attr("value",fieldBeanList1[i].poundage))
        form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList1["+i+"]"+"[TotalMoney]").attr("value",fieldBeanList1[i].TotalMoney))
        form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList1["+i+"]"+"[numTotal]").attr("value",fieldBeanList1[i].numTotal))
        form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList1["+i+"]"+"[hisFlowNo]").attr("value",fieldBeanList1[i].hisFlowNo))
        form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList1["+i+"]"+"[transName]").attr("value",fieldBeanList1[i].transName))
        form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList1["+i+"]"+"[tranTime]").attr("value",fieldBeanList1[i].tranTime))
        form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList1["+i+"]"+"[BusinessStatus]").attr("value",fieldBeanList1[i].BusinessStatus))
        form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList1["+i+"]"+"[tranPurpose]").attr("value",fieldBeanList1[i].tranPurpose))
        form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList1["+i+"]"+"[postScript]").attr("value",fieldBeanList1[i].postScript))
        form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList1["+i+"]"+"[operatorNo]").attr("value",fieldBeanList1[i].operatorNo))
        form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList1["+i+"]"+"[printNum]").attr("value",fieldBeanList1[i].printNum))
        form.append($("<input></input>").attr("type","hidden").attr("name","fieldBeanList1["+i+"]"+"[printTime]").attr("value",fieldBeanList1[i].printTime))
      }

      form.appendTo("body").submit().remove()
      _this.addPrintNum()
    },

    addPrintNum(){
        let _this=this
        let flowListTemp = []
        for(let i = 0;i<_this.recordPrintList.length;i++){
          let temp = {}
          temp.flowNo = _this.recordPrintList[i].bankFlowNo
          flowListTemp.push(temp)
        }
        let formData1 = {}
        formData1.transType = (_this.form.transTypeValue).split("-")[1]
        console.log("formData1.transType",formData1.transType)
        formData1.flowNoList = flowListTemp
        console.log("formData1.flowNoList",formData1.flowNoList)
        _this.$tools.request(_this, "CB01010407.do", formData1).then(
              data => {
                if('0' == data.body.errorCode){
                  console.log("下载次数加1")
                }else{
                  
                }
              }
        )
    },
    selectCheckBox(selection,row){
      let _this=this
      _this.recordPrintList=selection
      console.log("_this.recordPrintList",_this.recordPrintList)
    },
    //重置
    resetForm(form) {
      let _this = this
      // _this.$refs[form].resetFields()
      _this.form.accNo = ''
      _this.form.transTypeValue= ''
      _this.form.startDateObj = _this.$tools.utils.differDate(29)[0]
      _this.form.endDateObj = _this.today
    },
    //翻页
     handleCurrentChange(currentPageNo){
        let _this = this
        _this.currentPageNo = currentPageNo
        _this.query(_this.currentPageNo)
      //   let _firstIndex = (currentPageNo-1)*_this.pageSize
      //   let _lastIndex = currentPageNo*_this.pageSize
      //  _this.perTableData = _this.tableData.slice(_firstIndex,_lastIndex)
       
     },
    //当天
    getToday(){
      let _this = this
      _this.form.startDateObj = _this.today
      _this.form.endDateObj = _this.today
    },
    //最近一周
    getWeek(){
      let _this = this
      _this.form.startDateObj = _this.$tools.utils.differDate(6)[0]
      _this.form.endDateObj = _this.today
    },
    //最近30天
    getMonth(){
      let _this = this
      _this.form.startDateObj = _this.$tools.utils.differDate(29)[0]
       _this.form.endDateObj = _this.today
    },
    //获取当月最后一天
    formatEndDate(){
      let _this = this
      if(_this.form.endDateObj != ''){
        let y = _this.form.endDateObj.getFullYear()
        let m = _this.form.endDateObj.getMonth() + 1
        let d = _this.form.endDateObj.getDate()
        let endDate = new Date()
        endDate.setFullYear(y,m,d)
        endDate.setTime(endDate.getTime() - 1000 * 3600 * 24 * 1)
        return endDate
      }
    },
    //校验交易类型
    validatorTransTypeValue(rule, value, callback){
      let _this=this
      if("" == value || undefined == value) return callback("请选择交易类型")
      callback()
    },
    //币种
    formatCurrency(value){
      if('CNY' == value) return '人民币'
      if('HKD' == value) return '港元'
      if('USD' == value) return '美元'
      if('EUR' == value) return '欧元'
      if('GBP' == value) return '英镑'
      if('JPY' == value) return '日元'
      if('SGD' == value) return '新加坡币'
    },
    // //交易类型
    // formatTransType(value){
    //   if('S' == value) return '一站式转账'
    //   if('B' == value) return '批量转账'
    //   if('A' == value) return '保证金存入'
    //   if('T' == value) return '定期存款'
    //   if('N' == value) return '通知存款'
    //   if('I' == value) return '行内汇款'
    //   if('O' == value) return '行外汇款'
    //   if('E' == value) return '结汇'
    //   if('F' == value) return '购汇'
    //   if('C' == value) return '套汇'
    //   if('D' == value) return '上划'
    //   if('G' == value) return '下拨'
    //   if('H' == value) return '以子公司名义转账'
    //   if('J' == value) return '资金归集'
    // },

    formatTransName(value){
      if('CB01010401-S' == value) return '一站式转账'
      if('CB01010401-B' == value) return '批量转账'
      if('CB01010401-U' == value) return '上划'
      if('CB01010401-D' == value) return '下拨'
      if('CB01010401-G' == value) return '操作子公司账户转账'
      if('CB01010401-H' == value) return '内部调拨'
      if('CB01010401-K' == value) return '资金归集'
      if('CB01010406-A' == value) return '保证金存入'
      if('CB01010402-T' == value) return '定期存款'
      if('CB01010403-N' == value) return '通知存款'
      if('CB01010404-I' == value) return '行内汇款'
      if('CB01010404-O' == value) return '行外汇款'
      if('CB01010405-E' == value) return '结汇'
      if('CB01010405-F' == value) return '购汇'
      if('CB01010405-C' == value) return '套汇'
    },

  },
  mounted(){ 
     let _this = this
     _this.isSign()
     _this.getCardList()
     _this.getWeek()
  }
}
</script>
<style lang="scss">
  .electronicReceipt{position:relative;}
  .electronicReceipt .receiptImg{position:absolute;bottom:5px;left:375px;}
  .receiptTable1 caption{ background: #aca2a0; height: 38px; line-height:38px; padding-left: 20px; font-size:16px; font-weight: normal; color: #fff; text-align:left;}
  .receiptTable1 td{border:1px solid #000 !important;height:24px;padding:4px 0px; }
  .receiptTable1 .w100{width:100px;}
  .receiptTable1 .w200{width:200px;}
  .receiptTable1 .w300{width:400px;}
  .first .el-form-item__content{padding-right:5px;}
  .second .el-form-item__content{padding-left:5px;}
  .reminder{text-align:left;margin-top:10px}
 .remiContent{text-indent:35px}
 .receiptTable1 .border_none{border:0px !important;}
.receipt_i .el-input__prefix{height:0px;}
#accRecipt .el-input{width:350px;}
.electronicReceipt .el-dialog_body{padding:0px;}
.iePrint{page-break-after:always;}
 @media print{
   .printArea{font-size:12px;}
 }
</style>
