<template>
  <div class="templateStep3">
    <!--4格布局table-->
    <div class="tableForm mt20" v-if="checkType==0">
      <h3>交易结果</h3>
      <div v-if="formdata.status=='01'||formdata.status=='07'" class="transactionStatus">
        <ynet-icon Type="transactionStatus" NO="1"></ynet-icon>
        <span class="ml15">您的交易已成功提交！</span>
      </div>
      <div v-if="formdata.status=='00'" class="transactionStatus">
        <ynet-icon Type="transactionStatus" NO="1"></ynet-icon>
        <span class="ml15">您的交易已成功提交！</span>
      </div>
      <div v-if="formdata.status=='02'" class="transactionStatus">
        <ynet-icon Type="transactionStatus" NO="1"></ynet-icon>
        <span class="ml15">授权拒绝！</span>
      </div>
      <div v-if="formdata.status=='90'" class="transactionStatus">
        <ynet-icon Type="transactionStatus" NO="1"></ynet-icon>
        <span class="ml15">交易成功！</span>
      </div>
      <div v-if="formdata.status=='91'" class="transactionStatus">
        <ynet-icon Type="transactionStatus" NO="0"></ynet-icon>
        <span class="ml15">交易失败！</span>
      </div>
      <div v-if="formdata.status=='92'" class="transactionStatus">
        <ynet-icon Type="transactionStatus" NO="0"></ynet-icon>
        <span class="ml15">交易作废！</span>
      </div>
      <div v-if="formdata.status=='03'" class="transactionStatus">
        <ynet-icon Type="transactionStatus" NO="1"></ynet-icon>
        <span class="ml15">授权成功,等待银行审核！</span>
      </div>
      <div v-if="formdata.status=='04'" class="transactionStatus">
        <ynet-icon Type="transactionStatus" NO="1"></ynet-icon>
        <span class="ml15">预约待处理！</span>
      </div>
      <div v-if="formdata.status==null||formdata.status==undefined||formdata.status==''" class="transactionStatus">
        <ynet-icon Type="transactionStatus" NO="0"></ynet-icon>
        <span class="ml15">授权失败！</span>
      </div>
    </div>
    <div class="tableForm mt20" v-if="checkType==1">
      <h3>交易结果</h3>
      <div class="transactionStatus">
        <ynet-icon Type="transactionStatus" NO="1"></ynet-icon>
        <span class="ml15">您的交易已成功提交！</span>
      </div>
    </div>
    <!--4格布局table--end-->
    <!--4格布局table-->
    <div class="tableForm mt20">
      <h3>交易状态图</h3>
      <div class="transactionStatus">
        <ynet-transaction-bar class="mt10" :items="stepText" :itemIndex="stepIndex"></ynet-transaction-bar>
      </div>
    </div>
    <!--4格布局table--end-->
    <!--4格布局table-->
    <div class="fourForm tableForm mt20">
      <h3>交易审核信息</h3>
      <el-table :data="tableData">
        <el-table-column type="index" label="序号"></el-table-column>
        <!--<el-table-column label="网银流水号" prop="flowNo"></el-table-column>-->
        <!--<el-table-column label="提交日期" prop="submitTime">
                      <template scope="scope">
                        {{$tools.utils.formatDateSymbol(scope.row.submitTime)}}
                      </template>
                    </el-table-column>-->
        <el-table-column label="付款账号" prop="payAcc">
          <template scope="scope">
            <span v-if="scope.row.payAcc==''">----</span>
            <span v-else>{{scope.row.payAcc}}</span>
          </template>
        </el-table-column>
        <el-table-column label="交易金额" prop="amt">
          <template scope="scope">
            <span v-if="scope.row.transAmount==''">----</span>
            <span v-else>{{$tools.utils.toDecimalString(scope.row.amt,true,2)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="收款账号" prop="recAcc">
          <template scope="scope">
            <span v-if="scope.row.recAcc==''">----</span>
            <span v-else>{{scope.row.recAcc}}</span>
          </template>
        </el-table-column>
        <el-table-column label="收款账号名称" prop="recName">
          <template scope="scope">
            <span v-if="scope.row.recName==''">----</span>
            <span v-else>{{scope.row.recName}}</span>
          </template>
        </el-table-column>
        <!--<el-table-column label="交易类型" prop="type">
                      <template scope="scope">
                        {{$tools.dict.funTransType(scope.row.type)}}
                      </template>
                    </el-table-column>-->
        <!--<el-table-column label="用途" prop="type"></el-table-column>-->
        <el-table-column label="制单人" prop="userId"></el-table-column>
        <el-table-column label="状态" prop="status" v-if="code!='CB0405'">
          <template scope="scope">
            {{$tools.dict.statusTrans(scope.row.status)}}
          </template>
        </el-table-column>
        <el-table-column label="状态" prop="status" v-if="code=='CB0405'">
          <template scope="scope">
            {{$tools.dict.cashSweepStatus(scope.row.status)}}
          </template>
        </el-table-column>
        <el-table-column label="错误码" prop="errorCode">
          <template scope="scope">
            <span v-if="scope.row.errorCode=='0'||scope.row.errorCode=='000000'||scope.row.errorCode==''">----</span>
            <span v-else>{{scope.row.errorCode}}</span>
          </template>
        </el-table-column>
        <el-table-column label="错误信息" prop="errorMsg">
          <template scope="scope">
            <span v-if="scope.row.errorMsg==''||scope.row.errorMsg=='Success'">----</span>
            <span v-else>{{scope.row.errorMsg}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--4格布局table--end-->
    <div class="btnArea mt20 tac">
      <el-button type="primary" @click="lastStep">返回</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'templateStep4',
  components: {
  },
  props: {
    formdata: { type: Object, default: {} },
    table: { type: Array, default: {} },
    code: ''
  },
  data() {
    return {
      stepText: ['提交', '审核', '审核结果'],
      stepIndex: 2,
      tableData: [],
      checkType: 0,
      form: {
        bsnCode: '',
        transFlowNoList: []
      }
    }
  },
  methods: {
    lastStep() {
      let _this = this
      _this.$emit("changeStep", [1])
    }
  },
  mounted() {
    let _this = this
    // //alert(_this.formdata.status)
    // console.log(this.formdata, 'formdata')
    // console.log(_this.table, 'table')
    // console.log(this.code, 'code')
    _this.form.bsnCode = _this.code
    _this.form.transFlowNoList = _this.table
    _this.$tools.request(_this, "CB070109.do", _this.form).then(data => {
      // console.log(data.body, 'data.body')
      if (data.body.errorCode == '0') {
        _this.tableData = data.body.transQueryList?data.body.transQueryList:[]
        if (_this.tableData.length > 1) {
          _this.checkType = '1'
        }
      }else{
        this.$alert(data.body.errorMsg, '成功提示', {
              confirmButtonText: '确定',
              callback: action => {
              }
            });
      }

    })
    // if ('' != _this.formdata) {
    //   if (_this.list.length > 1) {
    //     _this.formdata.status = '01'
    //   }
    // } else {

    // }
  }
}
</script>
