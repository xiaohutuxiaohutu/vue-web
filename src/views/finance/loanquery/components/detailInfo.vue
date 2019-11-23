<template>
  <div class="importCreditOpen p20">
    <div  class="formEmbedTable">
      <table>
        <caption>企业基本资料</caption>
        <tr>
          <td>企业名称:</td>  
          <td>
              {{detailData.cstName}}
          </td>
          <td>法人代表姓名:</td> 
          <td>
              {{detailData.legalName}}
          </td>
        </tr>
        <tr>
          <td>组织机构代码:</td> 
          <td>
              {{detailData.orgaCode}}
          </td>
          <td>法人代表证件类型:</td> 
          <td>
              {{$tools.dict.certTypeDict(detailData.legalCertType)}}
          </td>
        </tr>
        <tr>
          <td>实际经营地址:</td> 
          <td>
              {{detailData.busAddress}}
          </td>
          <td>法人代表证件号码:</td> 
          <td>
              {{detailData.legalCertNo}}
          </td>
        </tr>
        <tr>
          <!--<td>所属行业:</td> 
          <td>
            <el-form-item>
              {{detailData.trade}}
            </el-form-item>
          </td>-->
          <td>上年度营销收入:</td> 
          <td>
              {{detailData.saleYear}}万元
          </td>
          <td>年底净利润:</td> 
          <td>
              {{detailData.profitYear}}
          </td>
        </tr>
        <tr>
          <td>联系人姓名:</td> 
          <td>
              {{detailData.linkName}}
          </td>
          <td>联系人手机号:</td> 
          <td>
              {{detailData.linkPhone}}
          </td>
        </tr>
        <tr>
          <td>授信申请所在行:</td> 
          <td colspan="3">
              {{detailData.applyBranchName}}
          </td>
        </tr>
      </table>
    </div>
    <div class="formEmbedTable mt20">
      <table>
        <caption>贷款基本资料</caption>
        <tr>
          <td>贷款编号:</td> 
          <td>
              {{detailData.sequenceNo}}
          </td>
          <td>申请贷款期限:</td> 
          <td>
              {{detailData.loanDate}}
              <!--{{this.$tools.dict.dictTerm(detailData.loanDate)}}-->
          </td>
        </tr>
        <tr>
          <td>币种:</td> 
          <td>
              {{$tools.dict.currTypeDict(detailData.currency)}}
          </td>
          <td>申请贷款金额:</td> 
          <td>
              {{$tools.utils.toDecimalString(detailData.loanAmount,true,2)}}
          </td>
        <tr>
          <td>贷款用途:</td> 
          <td>
              {{detailData.loanUsed}}
          </td>
          <td>可提供担保方式:</td> 
          <td>
              {{detailData.assuseMeans}}
          </td>
        </tr>
      </table>
    </div>
    <div class="formEmbedTable mt20">
      <table>
        <caption>审核信息</caption>
        <tr>
          <td v-if="imAuthInfoList.length==0">状态:</td> 
          <td v-if="imAuthInfoList.length==0" colspan="3">
              {{$tools.dict.statusTrans(detailData.stt)}}
          </td>
          <td v-if="imAuthInfoList.length>0">状态:</td> 
          <td v-if="imAuthInfoList.length>0">
              {{$tools.dict.statusTrans(detailData.stt)}}
          </td>
          <td v-if="imAuthInfoList.length>0">拒绝原因:</td> 
          <td v-if="imAuthInfoList.length>0">
            {{imAuthInfoList[0].rejReason}}
          </td>
        </tr>
      </table>
    </div>
    <div class="btnArea mt20 tac">
        <el-button type="primary" @click="preStep()">返回</el-button>
  </div>
  </div>
</template>

<script>
export default {
  name:'affLoanInfo',
  components: {
  },
  data() {
    return {
      imAuthInfoList:[]
    }
  },
  props:{
    detailData:{type:Object,default:{}},
  },
  methods: {
    preStep(){
      let _this=this
      _this.$emit("returnMain","1")
    }
  },
  mounted(){ 
    let _this = this
    if(_this.detailData.stt=='05'){
      let body={}
      body.sequenceNo = _this.detailData.sequenceNo
      body.status = _this.detailData.stt
      _this.$tools.request(this, "CB000034.do", body).then(data => {
            if (data.body.errorCode == '0') {
              _this.imAuthInfoList = data.body.imAuthInfoList
            } else {
              _this.$alert(data.body.errorMsg, '温馨提示', {
                confirmButtonText: '确定',
                callback: action => {
                }
              })
            }
          })
    }
  }
}
</script>
