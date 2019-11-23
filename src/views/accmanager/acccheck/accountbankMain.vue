
<template>
  <ynet-content id="templateName" class="main-content" :headerInformation="true" :headerMenu="true">
    <!--面包屑-->
    <ynet-breadcrumb></ynet-breadcrumb>
    <!--面包屑--end-->  
    <div class="functionalArea" v-if="display">
      <h3 class="functionalAreaTitle">填写查询信息</h3>
        <div class="p20">
            <div class="fourForm tableForm mt20">
        <!--table布局-->
              <el-form ref="form" :model="form" :rules="rules" class="formEmbedTable">
                <table>
                  <caption>填写查询信息</caption>
                  <tr>
                  <td><span class="cRed">*</span>账单状态：</td>
                  <td>
                    <el-form-item  prop="billState">
                      <el-select v-model="form.billState" placeholder="请选择">
                          <template v-for="item in stateList">
                            <el-option :label="item.label" :value="item.value"></el-option>
                          </template>         
                      </el-select>
                    </el-form-item>
                  </td>  
                </tr>
                  <tr>
                    <td><span class="cRed">*</span>账单日期：</td>
                    <td>
                        <div class="inline-block">
                            <el-form-item  prop="billTime" class="first">
							  <el-date-picker
							    v-model="form.billTime"
							    align="right"
							    type="year"
							    placeholder="选择年份">
							  </el-date-picker>
                            
                            
<!--                               <el-select v-model="form.billTime" placeholder="请选择"> -->
<!--                                 <template v-for="item in timeList"> -->
<!--                                   <el-option :label="item.time" :value="item.time"></el-option> -->
<!--                                 </template>          -->
<!--                               </el-select> -->
                            </el-form-item>
                          <span>季度：</span>
                            <el-form-item  prop="quarter" class="second">
                              <el-select v-model="form.quarter" placeholder="请选择">
                                <template v-for="item in quarterList">
                                  <el-option :label="item.label" :value="item.value"></el-option>
                                </template>         
                              </el-select>
                            </el-form-item>
                        </div>
                    </td>  
                  </tr>
                </table>
              </el-form>
              <!--table布局--END-->
              <div class="btnArea mt20 tac">
                <el-button type="primary" @click="query(1)">查询</el-button>
                <el-button @click="resetForm('form')">重置</el-button>
              </div>
            </div>
      </div>

    
      <div class="p20" v-show="unCheckedBill"> 
      <h3 class="functionalAreaTitle">账单信息查询</h3>
          <!--列表table-->
        <div class="fourForm tableData mt20">
          <el-table  :data="tableData" @select="selectCheckBox" @select-all="selectCheckBox">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column label="对账单编号" width="180" prop="checkBillNo"></el-table-column>
            <el-table-column label="对账单日期" prop="checkTime">
                <template scope="scope">
                    {{scope.row.checkTime}}
                </template>
            </el-table-column>
            <el-table-column label="账号" prop="accNo"></el-table-column>
            <el-table-column label="账号名称" prop="accName"></el-table-column>
            <el-table-column label="账户类型" prop="accType"></el-table-column>
            <el-table-column label="账单余额" prop="balance">
                <template scope="scope">
                      {{$tools.utils.currencyFormat(scope.row.balance)}}
                </template>
            </el-table-column>
            <el-table-column label="币种" prop="cry"></el-table-column>
            <el-table-column label="对账结果" width="100"  prop="state">
              <template scope="scope">
                  <el-select v-model="scope.row.state" placeholder="请选择">
                        <el-option label="相符" value="0"></el-option>
                        <el-option label="不相符" value="1"></el-option>
                  </el-select>
                </template>
            </el-table-column>
            <el-table-column label="操作">
              <template scope="scope">
                <span v-if='scope.row.state==1'><a class="cOrange" @click="queryCheckDetail(Number(scope.$index))">不相符信息</a></span>
              </template>
            </el-table-column>
            
          </el-table>
          <!--分页-->
           <div class="block mt30 tar" v-if="totalsize>pageSize">
              <el-pagination
                @current-change="handleCurrentChange"
                :current-page.sync="pageNo"
                :page-size="pageSize"
                layout="prev, pager, next, jumper"
                :total="totalsize">
              </el-pagination>
          </div>
          <!--分页end-->
          <div class="btnArea mt20 tac">
            <el-button type="primary" @click="billSubmit()">回签</el-button>
          </div>
           <!--提交-->
          <el-dialog :visible.sync="dialogVisible1" size=tiny class="money tac">
              <span style="font-size:16px;">确定要回签勾选的账单信息吗？</span>
              <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible1 = false">取 消</el-button>
                  <el-button type="primary" @click="dialogVisible1 = false;billAllSubmit()">确 定</el-button>
              </div>
          </el-dialog>
       <!--提交 end-->
        </div>
        <!--列表table end-->
      </div>
    
    <!--功能区--end-->

    <!-- 已对账信息查询-->
        <div class="p20" v-show="checkedBill">
        <h3 class="functionalAreaTitle">账单信息查询</h3>
          <!--列表table-->
        <div class="fourForm tableData mt20">
          <el-table  :data="checkBillData" @select="selectCheckBox" @select-all="selectCheckBox">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column label="对账单编号" width="180" prop="checkBillNo">
                <template scope="scope">
                    <a class="cOrange" @click="queryCheckedDetail(scope.row.checkBillNo,Number(scope.$index))">
                        {{scope.row.checkBillNo}}
                    </a>
                </template>
            </el-table-column>
            <el-table-column label="对账单日期" prop="checkTime">
                <template scope="scope">
                    {{$tools.utils.formatDate(scope.row.checkTime,"YYYY-MM")}}
                </template>
            </el-table-column>
            <el-table-column label="账号" prop="accNo"></el-table-column>
            <el-table-column label="账号名称" prop="accName"></el-table-column>
            <el-table-column label="账户类型" prop="accType"></el-table-column>
            <el-table-column label="账单余额" prop="balance">
                <template scope="scope">
                      {{$tools.utils.currencyFormat(scope.row.balance)}}
                </template>
            </el-table-column>
            <el-table-column label="币种" prop="cry">
                <template scope="scope">
                      {{formatCurrency(scope.row.cry)}}
                </template>formatBillResult
            </el-table-column>
            <el-table-column label="对账结果" width="100"  prop="billResult">
                  <template scope="scope">
                      {{formatBillResult(scope.row.billResult)}}
                </template>
            </el-table-column>
          </el-table>
          <!--分页-->
           <div class="block mt30 tar" v-if="totalsize1>pageSize">
              <el-pagination
                @current-change="handleCurrentChange1"
                :current-page.sync="pageNo1"
                :page-size="pageSize"
                layout="prev, pager, next, jumper"
                :total="totalsize1">
              </el-pagination>
          </div>
          <!--分页end-->
         
        </div>
        <!--列表table end-->
      </div>
  
    <!--已对账信息查询end-->
  </div>



    <!--跳转核对页面-->
    <div class="functionalArea" v-if="checkdetail"> 
       <h3 class="functionalAreaTitle">未对账清单</h3>
       <div class="p20">
        <!--table布局-->
        <el-form :model="unMatchData" class="formEmbedTable">
          <table>
             <tr>
                <td>账单日期：</td>
                <td>
                  <el-form-item>
                    {{unMatchData.checkTime}}
                  </el-form-item>
                </td>
                <td>账单编号：</td>
                <td>
                  <el-form-item>
                    {{unMatchData.checkBillNo}}
                  </el-form-item>
                </td>
             </tr>
             <tr>
                <td>账号：</td>
                <td>
                  <el-form-item>
                    {{unMatchData.accNo}}
                  </el-form-item>
                </td>
                <td>账户名称：</td>
                <td>
                  <el-form-item>
                   {{unMatchData.accName}}
                  </el-form-item>
                </td>
             </tr>
             <tr>
                <td>账户类型：</td>
                <td>
                  <el-form-item>
                    {{unMatchData.accType}}
                  </el-form-item>
                </td>
                <td>币种：</td>
                <td>
                  <el-form-item>
                    {{unMatchData.cry}}
                  </el-form-item>
                </td>
             </tr>
            <tr>
                <td>账单余额：</td>
                <td colspan='3'>
                  <el-form-item>
                    {{$tools.utils.currencyFormat(unMatchData.balance)}}
                  </el-form-item>
                </td>
             </tr>
             <tr>
              <td>重要提示：</td>
              <td colspan="3" style="height:80px;color:red;">
                  &nbsp&nbsp&nbsp&nbsp为保障账户资金安全，及时核实，纠正可能发生的财务差错，无论核对是否相符，请贵单位务必在收到本余额对账单后15个自然日内，将对账通过网上银行对账系统提交我行。
              </td>
            </tr>
          </table>
        </el-form>
       <!--table布局end-->
    

       <!--不相符form布局start-->
       <el-form :model='outterCheckResult' ref="outterCheckResult" :rules="checkResultRules" class="tableData mt20 amountRangeTable">
          <table class="receiptTable1">
             <tr>
                <td rowspan="2" style="width:195px;">发生日期</td>
                <td colspan="2" class="w100">银行上有，我单位无</td>   
                <td colspan="2" class="w300">银行上有无，我单位有</td>
                <td rowspan="2" class="w100">操作</td>
             </tr>
              <tr>
                 <td class="w100">支出</td>
                 <td class="w100">收入</td>
                 <td class="w100">支出</td>
                 <td class="w100">收入</td>
             </tr>     
          </table>
          <el-table :data="outterCheckResult.checkResult">
           
            <el-table-column align="left">
              <template  scope="scope">
                <el-form-item prop="occurTime">
                  <el-date-picker v-model="outterCheckResult.checkResult[scope.$index].occurTime" type="date" :editable="false" placeholder="发生日期" :picker-options="pickerOptions"></el-date-picker>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column>
              <template  scope="scope">
                <el-form-item prop="bank_get_AMT_pay">
                    <ynet-currency-input v-model="outterCheckResult.checkResult[scope.$index].bank_get_AMT_pay" name="bank_get_AMT_pay" placeholder="支出" :showChinese="false"></ynet-currency-input>
                        <template>
                            <span>{{$tools.dict.CRYTrans(outterCheckResult.CRY)}}</span>
                        </template>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column>
              <template  scope="scope">
                <el-form-item prop="bank_get_AMT_income">
                    <ynet-currency-input v-model="outterCheckResult.checkResult[scope.$index].bank_get_AMT_income" name="bank_get_AMT_income" placeholder="收入" :showChinese="false"></ynet-currency-input>
                        <template>
                            <span>{{$tools.dict.CRYTrans(outterCheckResult.CRY)}}</span>
                        </template>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column>
              <template  scope="scope">
                <el-form-item prop="user_get_AMT_pay">
                    <ynet-currency-input v-model="outterCheckResult.checkResult[scope.$index].user_get_AMT_pay" name="user_get_AMT_pay" placeholder="支出" :showChinese="false"></ynet-currency-input>
                        <template>
                            <span>{{$tools.dict.CRYTrans(outterCheckResult.CRY)}}</span>
                        </template>
                </el-form-item>
              </template>
            </el-table-column>
             <el-table-column>
              <template  scope="scope">
                <el-form-item prop="user_get_AMT_income">
                    <ynet-currency-input v-model="outterCheckResult.checkResult[scope.$index].user_get_AMT_income" name="user_get_AMT_income" placeholder="收入" :showChinese="false"></ynet-currency-input>
                        <template>
                            <span>{{$tools.dict.CRYTrans(outterCheckResult.CRY)}}</span>
                        </template>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column>
              <template  scope="scope">
                <a class="cOrange" @click="addSingleResult(scope.$index)">添加</a>
                  <span v-if='scope.$index != 0'>
                      <a cOrange @click="delSingleResult(scope.$index)">删除</a>
                  </span>
              </template>
            </el-table-column>
          </el-table>
        </el-form>
        <!--不相符form布局end-->


       </div>
        <div class="btnArea mt20 tac">
            <el-button type="primary" @click="dialogVisible2 = true">提交</el-button>
            <el-button @click="previous">返回</el-button>
        </div>
    </div>
    <!--跳转核对页面end-->

    <!--确定要提交？-->
      <el-dialog :visible.sync="dialogVisible2" size=tiny class="tac">
           <div class="tableForm mt20">
              <span style="font-size:16px;">确定要提交?</span>
              <div class="btnArea mt20 tac">
                  <el-button @click="dialogVisible2 = false">取 消</el-button>
                  <el-button type="primary" @click="dialogVisible2 = false;submit()">确 定</el-button>
              </div>
          </div> 
      </el-dialog>
      <!--确定要提交end？-->



    <!--跳转成功页面--> 
      <div class="templateStep3" v-if="success">
        <div class="tableForm mt20">
          <h3>核对结果</h3>
          <div class="transactionStatus">
            <ynet-icon Type="transactionStatus" NO="1"></ynet-icon>
            <span class="ml15">您的交易已成功提交！</span>
          </div>
            <div class="btnArea mt20 tac">
              <el-button type="primary" @click="checkagainst()">继续核对</el-button>
            </div>
        </div>
       
      </div>
    <!--跳转成功页面 end--> 


    
     <!--跳转已对账详情页-->
    <div class="functionalArea" v-if="checkeddetail"> 
       <h3 class="functionalAreaTitle">已对账清单</h3>
       <div class="p20">
        <!--table布局-->
        <el-form :model="billDetail" class="formEmbedTable">
          <table>
             <tr>
                <td>账单日期：</td>
                <td>
                  <el-form-item>
                    {{$tools.utils.formatDate(billDetail.checkTime,"YYYY-MM")}}
                  </el-form-item>
                </td>
                <td>账单编号：</td>
                <td>
                  <el-form-item>
                    {{billDetail.checkBillNo}}
                  </el-form-item>
                </td>
             </tr>
             <tr>
                <td>账号：</td>
                <td>
                  <el-form-item>
                    {{billDetail.accNo}}
                  </el-form-item>
                </td>
                <td>账户名称：</td>
                <td>
                  <el-form-item>
                   {{billDetail.accName}}
                  </el-form-item>
                </td>
             </tr>
             <tr>
                <td>账户类型：</td>
                <td>
                  <el-form-item>
                    {{billDetail.accType}}
                  </el-form-item>
                </td>
                <td>币种：</td>
                <td>
                  <el-form-item>
                    {{formatCurrency(billDetail.cry)}}
                  </el-form-item>
                </td>
             </tr>
            <tr>
                <td>账单余额：</td>
                <td>
                  <el-form-item>
                    {{$tools.utils.currencyFormat(billDetail.balance)}}
                  </el-form-item>
                </td>
                <td>对账结果：</td>
                <td>
                  <el-form-item>
                    {{formatBillResult(billDetail.billResult)}}
                  </el-form-item>
                </td>
             </tr>
          </table>
        </el-form>
       <!--table布局end-->
    

       <!--不相符form布局start-->
      
          <table class="receiptTable1 mt20" >
             <tr>
                <td rowspan="2" width='117px'>账号</td>
                <td rowspan="2" width='111px'>发生日期</td>
                <td colspan="2" width='216px'>银行上有，我单位无</td>   
                <td colspan="2" width='200px'>银行上有无，我单位有</td>
             </tr>
              <tr>
                 <td width='111px'>支出</td>
                 <td width='110px'>收入</td>
                 <td width='111px'>支出</td>
                 <td width='110px'>收入</td>
             </tr>     
          </table>
          <el-table :data="billDetailList" id="billDetailList" border>
              <el-table-column >
                  <template  scope="scope" width='200px'>
                      {{billDetail.accNo}}
                  </template>
              </el-table-column>
              <el-table-column >
                  <template  scope="scope" width='100px'>
                      {{$tools.utils.formatDateSymbol(scope.row.occurTime,"YYYY-MM-DD")}}
                  </template>
              </el-table-column>
              <el-table-column>
                  <template  scope="scope">
                      {{$tools.utils.currencyFormat(scope.row.bank_get_AMT_pay)}}
                  </template>
              </el-table-column>
              <el-table-column>
                  <template  scope="scope">
                      {{$tools.utils.currencyFormat(scope.row.bank_get_AMT_income)}}
                  </template>
              </el-table-column>
              <el-table-column>
                  <template  scope="scope">
                      {{$tools.utils.currencyFormat(scope.row.user_get_AMT_pay)}}
                  </template>
              </el-table-column>
              <el-table-column>
                  <template  scope="scope">
                      {{$tools.utils.currencyFormat(scope.row.user_get_AMT_income)}}
                  </template>
              </el-table-column>
          </el-table>

        </div>
          <div class="btnArea mt20 tac">
            <el-button @click="detailBack">返回</el-button>
          </div>
      
    </div>

  </ynet-content>
</template>

<script>

export default {
  name:'receipt',
  components: {
   
  },
  data() {
      return {
        user:this.$tools.storage.get("user","save"),
        checkedBill:false,
        unCheckedBill:true,
        checkedDetail:false,
        display:true,
        dialogVisible1:false,
        dialogVisible2:false,
        checkdetail:false,
        page_change:false,
        success:false,
        signFlag:'',
        totalsize:0,
        totalsize1:0,
        pageNo: 1,
        pageNo1: 1,
        pageSize: 10,
        billDetail:{},
        billDetailList:[],
        stateList:[
            {value:'0',label:'已对账'},
            {value:'1',label:'未对账'},
        ],
        stateOptions:[
          {
              value:'0',
              label:'相符'
          },
          {
              value:'1',
              label:'不相符'
          },
        ],
        quarterList:[
            {value:'01',label:'第一季度'},
            {value:'02',label:'第二季度'},
            {value:'03',label:'第三季度'},
            {value:'04',label:'第四季度'},
        ],
        form: {
          billState:'',
          billTime:'',
          quarter:'',
        },
        checkBillNoList:[],
        billList:[],
        tableData:[],
        checkBillData:[],
        unMatchData:{},
        unMatchList:[
          {
            accNo:'',
            accType:'',
            balance:'',
            cry:'',
            flag:'',
          }
        ],
        rules:{
           billState: [{ required: true, message: '请选择账单状态', trigger: 'blur' }],
           quarter: [{ required: true, message: '请选择季度', trigger: 'blur' }],
        } ,
        perTableData:[],
        reqTP:'', 
        flag:'',
        outterCheckResult:{
          checkResult:[
            {
              checkBillNo:'',
              occurTime:'',
              bank_get_AMT_pay:'',
              bank_get_AMT_income:'',
              user_get_AMT_pay:'',
              user_get_AMT_income:'',
            }
          ],
        },
        checkResultRules:{
           
        } ,
        value:'',                
      };
    },
 mounted(){
    let _this = this
    let _today = _this.$tools.utils.formatDate(new Date())
    _this.form.billTime=_today.slice(0,4)
    let queryData = {}
    queryData.reqTP='Q'
    // queryData.cstNo =_this.user.cstNo
    _this.$tools.request(_this,"CB010205.do",queryData).then(
      data =>{
        if('0' == data.body.errorCode){
          _this.signFlag = data.body.signFlag//0：未签约,1：已签约
          console.log('_this.signFlag1', _this.signFlag)
          if(''==_this.signFlag || '0'==_this.signFlag) {
              this.$alert('尚未开通余额对账功能', '提示')
              return
          }
          // if('1'==_this.signFlag) {
          //    _this.query(1)
          // }
          
        }else{
          this.$alert('查询签约状态失败', '提示')
              return
        }
      }
    )
     // _this.query(1)
    //_this.start()
  },
   methods: {
       query(page){ 
        let  _this = this
        if('1'!=_this.signFlag){
          return
        }
        if('' == this.form.billTime){
          this.$alert('请选择对账单查询年份', '提示')
              return
        }
        let queryData = {}
        if('0' == _this.form.billState){    //已对账
           _this.checkedBill = true
           _this.unCheckedBill = false
           queryData.reqTP = 'Y' 
          //  queryData.pageNo = _this.pageNo1   
        } else if('1' == _this.form.billState){  //未对账
            _this.checkedBill = false
            _this.unCheckedBill = true
            queryData.reqTP = 'A'
            // queryData.pageNo = _this.pageNo
        }
         let gbillTime=_this.$tools.utils.formatDate(this.form.billTime)
         _this.form.billTime=(gbillTime).slice(0,4)
        queryData.pageNo = page
        queryData.billState = _this.form.billState
        queryData.checkTime = _this.form.billTime + _this.form.quarter
        console.log("queryData.checkTime",queryData.checkTime)
        // queryData.cstNo = _this.user.cstNo
        _this.$refs.form.validate((valid)  => {
          if(valid){
                _this.$tools.request(_this, "CB010202.do", queryData).then(
                  data => {
                      if('0' == data.body.errorCode){
                        if('0' == _this.form.billState){ //已对账
                            console.log("进入已对账")
                            // debugger
                            _this.tableData = []
                            _this.checkBillData = []
                            _this.totalsize1 = Number(data.body.totalSize)
                            _this.checkBillData = data.body.balCheckedQueryList
                            // _this.checkBillData = data.body.balCheckedQueryList
                            // let checkedData = data.body.balCheckedQueryList
                            // for(let i = 0;i<checkedData.length;i++){
                            //   checkedData[i].checkTime = _this.$tools.utils.formatDate( checkedData[i].checkTime,"YYYY-MM")
                            //   console.log("checkedData[i].checkTime",checkedData[i].checkTime)
                            //   checkedData[i].cry =  _this.formatCurrency( checkedData[i].cry)
                            //   let _t = $.extend({},checkedData[i],{"state":''})
                            //   _this.checkBillData.push(_t)
                            // }
                            
                            
                              console.log("_this.checkBillData",_this.checkBillData)
                        }else if('1' == _this.form.billState){  //未对账
                            console.log("进入未对账")
                            _this.checkBillData = []
                            _this.tableData = []
                            _this.totalsize = Number(data.body.totalSize)
                            let _tableData = data.body.balUnCheckQueryList   
                            for(let i = 0;i<_tableData.length;i++){
                              _tableData[i].checkTime = _this.$tools.utils.formatDate( _tableData[i].checkTime,"YYYY-MM")
                              console.log("_tableData[i].checkTime",_tableData[i].checkTime)
                              _tableData[i].cry =  _this.formatCurrency( _tableData[i].cry)
                              let _t = $.extend({},_tableData[i],{"state":''})
                              _this.tableData.push(_t)
                            }
                        }
                        
                      }else{
                        
                      }
                    }
                  )
          }
        })

        
      },

       //核对、
      queryCheckDetail(index){
        let _this = this
        _this.display = false
        _this.checkdetail =  true
        _this.unMatchData = _this.tableData[index]
        // _this.detailData.transType = _this.formatTransType(_this.detailData.transType)
      },
      //已对账详细查询
      queryCheckedDetail(checkBillNo,index){
          let _this = this
          _this.display = false
          _this.checkeddetail = true
          _this.billDetailList = []
          _this.billDetail = _this.checkBillData[index]
          let queryData = {}
          queryData.reqTP = 'D'
          queryData.queryBillNo = checkBillNo
          _this.$tools.request(_this, "CB010202.do", queryData).then(
              data => {
                if('0' == data.body.errorCode){
                     _this.billDetailList = data.body.balCheckErrorList
                }else{
                  
                }
              }
        )

          
      },
    
     //翻页
      handleCurrentChange(pageNo){
         let _this = this
         _this.pageNo = pageNo
         _this.query(_this.pageNo)
        // let _firstIndex = (currentPageNo-1)*_this.pageSize
        // let _lastIndex = currentPageNo*_this.pageSize
       // _this.perTableData = _this.tableData.slice(_firstIndex,_lastIndex)
        
      },
      //翻页
      handleCurrentChange1(pageNo1){
         let _this = this
         _this.pageNo1 = pageNo1
         _this.query(_this.pageNo1)
        // let _firstIndex = (currentPageNo-1)*_this.pageSize
        // let _lastIndex = currentPageNo*_this.pageSize
       // _this.perTableData = _this.tableData.slice(_firstIndex,_lastIndex)
        
      },
      selectCheckBox(selection,row){
        let _this=this
        _this.checkBillNoList=selection
     },
     addSingleResult(index){
      let _this=this
      //_this.$refs.outterCheckResult.checkResult.validate((valid) => {
       // if (valid) {
         if('' == _this.outterCheckResult.checkResult[index].occurTime){
              _this.$alert("请先选择发生日期", '提示', {
                    confirmButtonText: '确定'
                })
                return
         }
         if('' == _this.outterCheckResult.checkResult[index].bank_get_AMT_pay && 
            '' == _this.outterCheckResult.checkResult[index].bank_get_AMT_income &&
            '' == _this.outterCheckResult.checkResult[index].user_get_AMT_pay &&
            '' == _this.outterCheckResult.checkResult[index].user_get_AMT_income 
              ){
              _this.$alert('调节金额表单数据不能全空', '提示', {
                   confirmButtonText: '确定'
                })
                return
         }
          _this.outterCheckResult.checkResult.push({checkBillNo:'',occurTime:new Date(),bank_get_AMT_pay:'',bank_get_AMT_income:'',user_get_AMT_pay:'',user_get_AMT_income:''})
          // _this.outterCheckResult.checkResult[index+1].checkBillNo = _this.unMatchList[0].accNo
          console.log("_this.outterCheckResult.checkResult",_this.outterCheckResult.checkResult)
        // } else {
        //   console.log('error submit!!')
        //   return false
        // }
      //});
     
    },

    delSingleResult(index){
      let _this=this
      _this.outterCheckResult.checkResult.splice(index, 1)
    },

    billSubmit(){
      let _this = this
      console.log("_this.checkBillNoList",_this.checkBillNoList)
       let _total = _this.checkBillNoList.length
       if( 0 == _total) {
              this.$alert('未勾选回签账单', '提示')
              return
       }
        for(let i = 0;i < _total; i++){
          if ('1' == _this.checkBillNoList[i].state) {
              this.$alert('请单独提交不相符账单信息', '提示')
              return
          }  
          if ('0' != _this.checkBillNoList[i].state) {
              this.$alert('对账结果信息不能为空', '提示')
              return
          } 
       }
       _this.dialogVisible1=true

      },
      billAllSubmit(){
        let _this = this
        let requestData = {}

        let sumLength = _this.checkBillNoList.length
        console.log("sumLength",sumLength)

        let userStorge = _this.$tools.storage.get("user","save")
        let cstNo = userStorge.cstNo
        let userId = userStorge.eCIFID
        let newDate = [
          {key:'cstNo',value:cstNo},
          {key:'userId',value:userId},
          {key:'sumLength',value:sumLength}
        ]
        let siDate = JSON.stringify(newDate);
        let certNo = userStorge.serialNo
        let ukeyNo = userStorge.uKeySn
        let arrCstNo = ["客户号:",cstNo]
        let arrLength = ["回签条数:",sumLength]
        let keyFlag = _this.$ukey
        if(keyFlag == true || keyFlag == 'true'){
          let flag = getSignData(arrCstNo,arrLength,siDate,certNo,ukeyNo)
          if(flag == false || flag == 'false'){
            // this.$alert('批量回签——UKey签名失败,请重新再试', '温馨提示')
            return
          } 
          let signData = document.getElementById("signData").value.toString()
          requestData.signedData = signData
        }

        requestData.cstNo = userStorge ? userStorge.cstNo : ''
        requestData.userId = userStorge ? userStorge.userNo || userStorge.eCIFID : ""
        requestData.sumLength = sumLength
        requestData.channelFlag = 'CCB'
        // requestData.cstNo = _this.user.cstNo
       requestData.bsnCode = 'CB010502'
       requestData.flag = 'A'
       requestData.checkBillNoList = _this.checkBillNoList
       console.log("requestData",requestData)
      _this.$tools.request(_this, "CB010203.do", requestData).then(
              data => {
                if('0' == data.body.errorCode){
                  _this.query(1)
                    //_this.alert("提交成功")   
                      this.$alert('提交成功', '提示')
                }else{
                    this.$alert(data.body.errorMsg, '提示', {
                      confirmButtonText: '确定'
                    })
                }
              }
            )
      },
  
      submit(){
          let _this = this
          // console.log("11111")
          // console("_this.outterCheckResult.checkResult",_this.outterCheckResult.checkResult[0].occurTime)
          // //  for(let i =0; i < _this.outterCheckResult.checkResult.length; i++){

          // //  }
          // return
          for(let i =0; i < _this.outterCheckResult.checkResult.length; i++){
              _this.outterCheckResult.checkResult[i].occurTime  =  _this.$tools.utils.formatDate(_this.outterCheckResult.checkResult[i].occurTime)
          }
         for(let i =0; i < _this.outterCheckResult.checkResult.length; i++){
              if('' == _this.outterCheckResult.checkResult[i].occurTime){
                  _this.$alert("请选择第"+(i+1)+"条数据的发生日期", '提示', {
                        confirmButtonText: '确定'
                    })
                    return
              }
              if('' == _this.outterCheckResult.checkResult[i].bank_get_AMT_pay && 
                  '' == _this.outterCheckResult.checkResult[i].bank_get_AMT_income &&
                  '' == _this.outterCheckResult.checkResult[i].user_get_AMT_pay &&
                  '' == _this.outterCheckResult.checkResult[i].user_get_AMT_income 
                    ){
                  _this.$alert("第"+(i+1) +"条数据的调节金额表单数据不能全空", '提示', {
                      confirmButtonText: '确定'
                    })
                    return
              }
         }
          let requestData = {}
          
          let userStorge = _this.$tools.storage.get("user","save")
          
          let cstNo = userStorge.cstNo
          let userId = userStorge.eCIFID
          let newDate = [
            {key:'cstNo',value:cstNo},
            {key:'userId',value:userId},
            {key:'accNo',value:_this.unMatchData.accNo},
            {key:'accName',value:_this.unMatchData.accName}
          ]
          let siDate = JSON.stringify(newDate);
          let certNo = userStorge.serialNo
          let ukeyNo = userStorge.uKeySn
          let arrAccNo = ["对账账号:",_this.unMatchData.accNo]
          let arrAccName = ["账号名称:",_this.unMatchData.accName]
          let keyFlag = _this.$ukey
          if(keyFlag == true || keyFlag == 'true'){
            let flag = getSignData(arrAccNo,arrAccName,siDate,certNo,ukeyNo)
            if(flag == false || flag == 'false'){
              // this.$alert('不相符对账——UKey签名失败,请重新再试', '温馨提示')
              return
            } 
            let signData = document.getElementById("signData").value.toString()
            requestData.signedData = signData
          }

          requestData.cstNo = userStorge ? userStorge.cstNo : ''
          requestData.userId = userStorge ? userStorge.userNo || userStorge.eCIFID : "" 

          requestData.checkBillNo = _this.unMatchData.checkBillNo
          requestData.accNo = _this.unMatchData.accNo
          requestData.accName = _this.unMatchData.accName
          // requestData.cstNo = _this.user.cstNo
          requestData.bsnCode = 'CB010502'
          requestData.flag = 'N'
          requestData.channelFlag = 'CCB'
          let length = _this.outterCheckResult.checkResult.length
          for (let i = 0; i < length; i++) {
            _this.outterCheckResult.checkResult[i].occurTime = _this.$tools.utils.dateFormat(_this.outterCheckResult.checkResult[i].occurTime, "yyyyMMdd") 
          }
          requestData.balCheckDataList = _this.outterCheckResult.checkResult
          console.log("requestData",requestData)
          _this.$tools.request(_this, "CB010203.do", requestData).then(
              data => {
                if('0' == data.body.errorCode){
                  console.log("success")
                  _this.display =false
                  _this.checkdetail = false
                  _this.outterCheckResult.checkResult = [{checkBillNo:'',occurTime:'',bank_get_AMT_pay:'',bank_get_AMT_income:'',user_get_AMT_pay:'',user_get_AMT_income:'',}]
               
                  _this.success = true
                }else{
//                   _this.$alert('提交失败', '提示', {
//                     confirmButtonText: '确定'
//                   })
                   _this.$alert(data.body.errorMsg, '提示', {
                    confirmButtonText: '确定'
                  })
                }
              }
            )
        
      },
      resetForm(form) {
        let _this = this
        _this.form.billState = ''
        _this.form.billTime = ''
        _this.form.quarter = ''
      },
      previous(){
        let _this = this
        _this.display = true
        _this.checkdetail = false
      },
      detailBack(){
        let _this = this
        _this.display = true
        _this.checkeddetail = false
      },
      checkagainst(){
        let _this = this
        _this.display= true
        _this.checkdetail = false
        _this.success = false
        _this.query(1)
      },
       //校验金额
      validatorCurrency(rule, value, callback){
        let _this = this
        console.log("value",value)
        if("" == value || undefined == value) return callback("请输入金额")
        //if(!(/^\d{8}$/.test(value))) return callback("请输入八位数字格式日期")
        //if(_this.$tools.utils.formatDate(new Date()) < value) return callback("发生日期不能大于当前日期")
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
      //对账状态
      formatBillResult(value){
        if('0' == value) return '相符'
        if('1' == value) return '不相符'
      },
      // //币种
      // formatTimeShow(value){
      //   let _this = this
      //   let year = value.split("-")[0]
      //   let quarter = value.split("-")[1]
      //   let quarter1 = ''
      //   if( '01' == quarter){
      //     quarter1 = '第一季度' 
      //   }
      //   if( '02' == quarter){
      //     quarter1 = '第二季度' 
      //   }
      //   if( '03' == quarter){
      //     quarter1 = '第三季度' 
      //   }
      //   if( '04' == quarter){
      //     quarter1 = '第四季度' 
      //   }
      //   return year+'年' +quarter1
      // },

  },

}
</script>
<style lang="scss">；；
  .receiptTable1 caption{ background: #aca2a0; height: 38px; line-height:38px; padding-left: 20px; font-size:16px; font-weight: normal; color: #fff; text-align:left;}
  .receiptTable1 td{border:1px solid #cbcbc9;height:30px;padding:4px 20px; }
  .receiptTable1 .w100{width:100px;}
  .receiptTable1 .w300{width:300px;}
  .first .el-form-item__content{padding-right:5px;}
  .second .el-form-item__content{padding-left:5px;}
  #billDetailList .el-table__body{border-collapse:separate!important;}
  #billDetailList .el-table__header-wrapper{border:1px solid #e6ebf5;}
</style>
