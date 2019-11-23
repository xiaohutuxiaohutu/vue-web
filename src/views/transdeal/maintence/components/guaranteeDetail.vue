<template>
  <el-form class="formEmbedTable printArea">
      <table>
        <tr>
            <td>网银流水号：</td>
            <td>{{detailMsg.guaranteeList[0].sequenceNo}}</td>
            <td>申请时间：</td>
            <td>{{$tools.utils.formatDate(detailMsg.guaranteeList[0].createDate,{"symbol":"YYYY-MM-DD"})}}</td>
          </tr>
          <tr v-if="detailMsg.guaranteeList[0].status=='90'">
	          <td>业务编号：</td>
	          <td>{{detailMsg.guaranteeList[0].busCode}}</td>
	          <td>开立日期：</td>
	          <td>{{$tools.utils.formatDate(detailMsg.guaranteeList[0].openDate,{"symbol":"YYYY-MM-DD"})}}</td>
          </tr>
          <tr>
            <td>保函种类：</td>
            <td>{{$tools.dict.gntTypeTrans(detailMsg.guaranteeList[0].gntType)}}</td>
            <td>开立方式：</td>
            <td>{{$tools.dict.ESTBDTrans(detailMsg.guaranteeList[0].ESTBD)}}</td>
          </tr>
          <tr>
            <td>保函币种：</td>
            <td>{{$tools.dict.CRYTrans(detailMsg.guaranteeList[0].CRY)}}</td>
            <td>保函金额：</td>
            <td>{{$tools.utils.currencyFormat(detailMsg.guaranteeList[0].gntAmt)}}</td>
          </tr>
          <tr>
            <td>保函生效日：</td>
            <td>{{$tools.utils.formatDate(detailMsg.guaranteeList[0].valueDate,{"symbol":"YYYY-MM-DD"})}}</td>
            <td>保函到期日：</td>
            <td>{{$tools.utils.formatDate(detailMsg.guaranteeList[0].dueDate,{"symbol":"YYYY-MM-DD"})}}</td>
          </tr>
          <tr>
            <td>申请人客户号：</td>
            <td>{{detailMsg.guaranteeList[0].cstNo}}</td>
            <td>申请人客户名称：</td>
            <td>{{detailMsg.guaranteeList[0].cstName}}</td>
          </tr>
          <tr>
            <td>申请人地址：</td>
            <td colspan="3">{{detailMsg.guaranteeList[0].appAddr}}</td>
          </tr>
          <tr>
            <td>被担保人姓名：</td>
            <td>{{detailMsg.guaranteeList[0].wrntName}}</td>
            <td>被担保人地址：</td>
            <td>{{detailMsg.guaranteeList[0].wrntAddr}}</td>
          </tr>
          <tr>
            <td>受益人姓名：</td>
            <td>{{detailMsg.guaranteeList[0].befName}}</td>
            <td>受益人地址：</td>
            <td>{{detailMsg.guaranteeList[0].befAddr}}</td>
          </tr>
          <tr>
            <td>合同编号：</td>
            <td>{{detailMsg.guaranteeList[0].contraNo}}</td>
            <td>合同币种：</td>
            <td>{{$tools.dict.CRYTrans(detailMsg.guaranteeList[0].contraCRY)}}</td>
          </tr>
          <tr>
            <td>合同金额：</td>
            <td>{{$tools.utils.currencyFormat(detailMsg.guaranteeList[0].contraAmt)}}</td>
            <td>保函模板：</td>
            <td>{{$tools.dict.gntTemplateTrans(detailMsg.guaranteeList[0].gntTemplate)}}</td>
          </tr>
          <tr v-if="detailMsg.guaranteeList[0].gntTemplate=='1'">
            <td>申请人模板文件：</td>
            <td colspan="3">{{detailMsg.guaranteeList[0].newFileName}}</td>
          </tr>
          <tr>
            <td>备注：</td>
            <td>{{detailMsg.guaranteeList[0].comments}}</td>
            <td>扣费账号：</td>
            <td>{{detailMsg.guaranteeList[0].wthdAccNo}}</td>
          </tr>
          <tr>
            <td>操作员姓名：</td>
            <td>{{detailMsg.guaranteeList[0].oprName}}</td>
            <td>状态：</td>
            <td>{{$tools.dict.statusTrans(detailMsg.guaranteeList[0].status)}}</td>
          </tr>
      </table>
      <!--<div class="btnArea mt20 tac">
        <el-button  type="primary" @click="change(detailMsg)">修改</el-button>
        <el-button  type="primary" @click="deleteChange(detailMsg)">撤销</el-button>
        <el-button  type="primary" @click="$tools.print()">打印</el-button>
        <el-button @click="close()">关闭</el-button>
      </div>-->
  </el-form>
</template>

<script>
export default {
  name: 'guaranteeDetail',
  components:{
  },
  props: {
    detailMsg:{
      type: Object
    }
  },
  data(){
    return {
      bsnCode:'CB050401'
    }
  },
  mounted(){
  },
  methods:{
    change(val){
      let _this = this
      let form = val
      form.oldSqno = val.guaranteeList[0].sequenceNo
      form.operateFlag = '1'
      //console.log(form)
      _this.$router.push({ name:'letterOfGuaranteeToOpenMain',params:form})
    },
    deleteChange(val){
      //console.log(this.detailMsg)
      let _this = this
      let body = {}
      body.operateFlag = '2'  //交易撤销
      body.oldSqno = val.guaranteeList[0].sequenceNo
      body.cstNo = _this.$tools.storage.get("user","save").cstNo
      body.eCIFID = _this.$tools.storage.get("user","save").eCIFID
      body.oprNo = _this.$tools.storage.get("user","save").eCIFID
      body.bsnCode = _this.bsnCode
      _this.$confirm('确定撤销该交易？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        _this.$tools.request(_this,"CB050401.do",body).then(
          data =>{
            if(data.body.errorCode=='0'){
              //console.log("撤销成功")
              _this.close()
            }
          })
      }).catch(() => {
      });
    },
    close(body){
      if(body===null||body===undefined||body===''){
        this.$emit("close")
      }else{
        this.$emit("close",[body])
      }
    },
  }
}
</script>