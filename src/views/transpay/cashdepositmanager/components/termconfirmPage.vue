<template>
  <div class="fourForm tableForm mt20">
    <h3>定期存款存入信息</h3>
    <el-form>
      <el-row>
        <el-form-item label="付款账号：" class="fullLine">
          {{confirmMsg.transOutCardNo}}
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="存期：" class="fullLine">
          <span v-if="confirmMsg.depTerm=='3M'">三个月</span>
          <span v-if="confirmMsg.depTerm=='6M'">半年</span>
          <span v-if="confirmMsg.depTerm=='1Y'">一年</span>
          <span v-if="confirmMsg.depTerm=='2Y'">两年</span>
          <span v-if="confirmMsg.depTerm=='3Y'">三年</span>
          <span v-if="confirmMsg.depTerm=='5Y'">五年</span>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="转入金额：" class="fullLine">
          {{confirmMsg.PNPAmt}}
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="大写：" class="fullLine">
          {{$tools.utils.toChinese(confirmMsg.PNPAmt)}}
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="保证金账号：" class="fullLine">
          {{confirmMsg.CardNo}}
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="付款凭证用途：" class="fullLine">
          {{confirmMsg.transDes}}
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="备注：" class="fullLine">
          {{confirmMsg.transDesc}}
        </el-form-item>
      </el-row>
    </el-form>
    <div class="btnArea mt20 tac">
        <el-button type="primary" @click="nextStep">确定</el-button>
        <el-button @click="preStep">返回</el-button>
    </div>
  </div>
</template>


<script>
export default {
  name: 'termconfirmPage',
  props: {
    confirmMsg:{
      type: Object
    }
  },
  data(){
    return {
    }
  },
  methods: {
    nextStep() {
      let _this = this
      _this.confirmMsg.depTermTp = _this.confirmMsg.depTerm.substring(1,2)
      _this.confirmMsg.depTerm = _this.confirmMsg.depTerm.substring(0,1)
      let body= {}
      alert(JSON.stringify(_this.confirmMsg))
      _this.$tools.request(_this,"CB030102.do",_this.confirmMsg).then(
        data => {
          if(data.body){
            _this.$emit("goStepPage",[2,data.body])
          }
      })
    },
    preStep(){
      let _this = this
      _this.$emit("goStepPage",[0])
    }
  }
}
</script>