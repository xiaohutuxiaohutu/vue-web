<template>
  <div class="importCreditOpen ">
    <!--table1布局-->
    <el-form class="formEmbedTable mb20">
      <table>
        <caption>选择归集账户</caption>
        <tr>
          <td>归集计划主题</td> 
          <td>
            <el-form-item>
              {{confirmMsg.taskTheme}}
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>转入账号（公司账号）：</td>
          <td colspan="3">
            <el-form-item>
              {{confirmMsg.recAccount}}
            </el-form-item>
          </td>
          <td>账户名：</td>
            <td>
              <el-form-item>
                {{confirmMsg.recAccountName}}
              </el-form-item>
            </td>
        </tr>
        <tr>
          <td>转出子公司账号组别：</td> 
          <td colspan="3">
            <!--<el-form-item v-if="confirmMsg.payAccountGroup == '0'">其他</el-form-item>-->
            <el-form-item>{{confirmMsg.payAccountGroupDesc}}</el-form-item>
          </td>
        </tr>
        <tr>
          <td>转出账户（子公司账户）：</td>
          <td colspan="3">
            <el-form-item>
              {{confirmMsg.payAccountNo}}
            </el-form-item>
          </td>
          <td>账户名：</td>
          <td>
            <el-form-item>
              {{confirmMsg.payAccountName}}
            </el-form-item>
          </td>
        </tr>
      </table>
      <table>
        <caption>上存规则</caption>   
        <tr>
          <td>上存方式：</td>
          <td colspan="3">
            <el-form-item v-if="confirmMsg.upWay=='0'">比例上存</el-form-item>
            <el-form-item v-if="confirmMsg.upWay=='1'">保底上存</el-form-item>
            <el-form-item v-if="confirmMsg.upWay=='2'">全额上存</el-form-item>
            <el-form-item v-if="confirmMsg.upWay=='3'">定额上存</el-form-item>
          </td>
        </tr>
        <tr v-if="confirmMsg.upWay=='0'">
          <td>上存比例：</td>
          <td colspan="3">
            <el-form-item>
              {{confirmMsg.upPercentage}}%
            </el-form-item>
          </td>
        </tr>
        <tr v-if="confirmMsg.upWay=='1'">
          <td>留存余额：</td>
          <td colspan="3">
            <el-form-item>
              {{confirmMsg.restBalance}}
            </el-form-item>
          </td>
        </tr>
        <tr v-if="confirmMsg.upWay=='3'">
          <td>定额额度：</td>
          <td colspan="3">
            <el-form-item>
              {{confirmMsg.quotaLimit}}
            </el-form-item>
          </td>
        </tr>
      </table>
      <table>
        <caption>设置资金自动归集计划</caption>
        <tr>
          <td>归集方式：</td>
          <td colspan="3">
            <el-form-item v-if="confirmMsg.mode=='0'">即时生效</el-form-item>
            <el-form-item v-if="confirmMsg.mode=='1'">周期性归集</el-form-item>
          </td>
        </tr>
        <tr v-if="confirmMsg.mode=='1'">
          <td>周期类型：</td>
          <td colspan="3">
            <el-form-item v-if="confirmMsg.cycleType=='0'">按日</el-form-item>
            <el-form-item v-if="confirmMsg.cycleType=='1'">按周</el-form-item>
            <el-form-item v-if="confirmMsg.cycleType=='2'">按月</el-form-item>
          </td>
        </tr>
        <tr v-if="confirmMsg.mode=='1' && confirmMsg.cycleType!='0'">
          <td>周期内执行日：</td>
          <td colspan="3">
            <el-form-item v-if="confirmMsg.cycleType=='1' && confirmMsg.cycleByWeek=='1'">星期一</el-form-item>
            <el-form-item v-if="confirmMsg.cycleType=='1' && confirmMsg.cycleByWeek=='2'">星期二</el-form-item>
            <el-form-item v-if="confirmMsg.cycleType=='1' && confirmMsg.cycleByWeek=='3'">星期三</el-form-item>
            <el-form-item v-if="confirmMsg.cycleType=='1' && confirmMsg.cycleByWeek=='4'">星期四</el-form-item>
            <el-form-item v-if="confirmMsg.cycleType=='1' && confirmMsg.cycleByWeek=='5'">星期五</el-form-item>
            <el-form-item v-if="confirmMsg.cycleType=='1' && confirmMsg.cycleByWeek=='6'">星期六</el-form-item>
            <el-form-item v-if="confirmMsg.cycleType=='1' && confirmMsg.cycleByWeek=='0'">星期日</el-form-item>
            
            <el-form-item v-if="confirmMsg.cycleType=='2'">{{confirmMsg.cycleByMonth}}日</el-form-item>
          </td>
        </tr>
        <tr v-if="confirmMsg.mode=='1'">
          <td>生效日期：</td>
          <td colspan="3">
            <el-form-item>
              {{$tools.utils.formatDateSymbol(effectDateDesc)}}
            </el-form-item>
          </td>
        </tr>
        <tr v-if="confirmMsg.mode=='1'">
          <td>执行时间：</td>
          <td colspan="3">
            <el-form-item v-if="confirmMsg.actionTime=='0'">日初</el-form-item>
            <el-form-item v-if="confirmMsg.actionTime=='1'">日终</el-form-item>
          </td>
        </tr>
        <tr v-if="confirmMsg.mode=='1'">
          <td>终止条件：</td>
          <td colspan="3">
            <el-form-item v-if="confirmMsg.endCondition=='0'">永久有效</el-form-item>
            <el-form-item v-if="confirmMsg.endCondition=='1'">按日期</el-form-item>
            <el-form-item v-if="confirmMsg.endCondition=='2'">按次数</el-form-item>
          </td>
        </tr>
        <tr v-if="confirmMsg.mode=='1' && confirmMsg.endCondition=='1'">
          <td>归集终止日期：</td>
          <td colspan="3">
            <el-form-item>
              {{$tools.utils.formatDateSymbol(endByDateDesc)}}
            </el-form-item>
          </td>
        </tr>
        <tr v-if="confirmMsg.mode=='1' && confirmMsg.endCondition=='2'">
          <td>归集终止次数：</td>
          <td colspan="3">
            <el-form-item>
             {{confirmMsg.endByTimes}}
            </el-form-item>
          </td>
        </tr>
      </table>
    </el-form>
    <!--table1布局-->
    <div class="btnArea mt20 tac">
        <el-button type="primary" @click="nextStep">提交</el-button>
        <el-button @click="preStep">上一步</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name:'confirmPage',
  components: {
  },
  props: {
    confirmMsg:{
      type: Object
    }
  },
  data() {
    return {
      effectDateDesc: "",
      endByDateDesc: ""
    }
  },
  mounted(){
    let _this = this
    if(_this.confirmMsg.effectDate) _this.effectDateDesc = _this.$tools.utils.dateFormat(_this.confirmMsg.effectDate, "yyyyMMdd")
    if(_this.confirmMsg.endByDate)  _this.endByDateDesc = _this.$tools.utils.dateFormat(_this.confirmMsg.endByDate, "yyyyMMdd")
  },
  methods: {
    preStep(){
      let _this = this
      _this.$emit("changeStep","0",_this.confirmMsg)
    },
   nextStep() {
      let _this = this
      let userStorge = _this.$tools.storage.get("user","save")
      let cstNo = userStorge.cstNo
      let userId = userStorge.eCIFID
      let newDate = [
        {key:'cstNo', value:cstNo},
        {key:'userNo', value:userId},
        {key:'payAccountNo', value:_this.confirmMsg.payAccountNo},
        {key:'payAccountName', value:_this.confirmMsg.payAccountName},
        {key:'recAccount', value:_this.confirmMsg.recAccount},
        {key:'recAccountName', value:_this.confirmMsg.recAccountName},
        {key:'taskTheme', value:_this.confirmMsg.taskTheme}
      ]
      let siDate = JSON.stringify(newDate);
      let certNo = userStorge.serialNo
      let ukeyNo = userStorge.uKeySn
      let upWayDesc = ''
      switch(_this.confirmMsg.upWay){
        case '0':
          upWayDesc = "比例上存"
          break;
        case '1':
          upWayDesc = "保底上存"
          break;
        case '2':
          upWayDesc = "全额上存"
          break;
        case '3':
          upWayDesc = "定额上存"
          break;
      }
      // let siAmt = _this.confirmMsg.transAmount
      let siAccountNo = _this.confirmMsg.payAccountNo
      let arrAcc = ["付款账号:",siAccountNo]
      let arrAmt = ["上存方式:",upWayDesc]
      let keyFlag = _this.$ukey
      if(keyFlag == true || keyFlag == 'true'){
        let flag = getSignData(arrAcc,arrAmt,siDate,certNo,ukeyNo)
        if(flag == false || flag == 'false'){
          //this.$alert('UKey签名失败,请重新再试', '温馨提示')
          return
        } 
        let signData = document.getElementById("signData").value.toString()
        _this.confirmMsg.signedData = signData
      }

      _this.confirmMsg.effectDate = _this.effectDateDesc
      _this.confirmMsg.endByDate = _this.endByDateDesc
      _this.$tools.request(this,"CB040303.do",_this.confirmMsg).then(data => {
        let errorCode = data.body.errorCode
        let errorMsg = data.body.errorMsg
        if(errorCode == '0'){
          _this.$emit("changeStep","2", $.extend(_this.confirmMsg, data.body))
        }else{
          _this.$alert(errorMsg, errorCode, {confirmButtonText: '确定'});
        }
      })
    }
  }
}
</script>
