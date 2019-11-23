<template>
  <ynet-content id="termDepositQuery" class="main-content" :headerInformation="true" :headerMenu="true">
    <!--面包屑-->
    <ynet-breadcrumb></ynet-breadcrumb>
    <!--面包屑--end-->
    <div class="functionalArea">
      <h3 class="functionalAreaTitle">签约输入</h3>
        <div class="p20">
          <div class="importCreditOpen">
            <el-form :model="form"  class="formEmbedTable mb40">
              <table>
                  <caption>标题</caption>
                  <tr>
                    <td>企银名称：</td> 
                    <td colspan="3">
                      <el-form-item>
                        {{user.cstCN}}
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td>对账方式：</td> 
                    <td colspan="3">
                      <el-form-item>
                        网银对账
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td>对账周期：</td> 
                    <td colspan="3">
                      <el-form-item>
                        每季
                      </el-form-item>
                    </td>
                  </tr>
              </table>
            </el-form>
             <div class="tal">
                <div>
                   <h3 class="tac pb20">创兴银行有限公司中国境内分支行网上银企对账业务须知</h3>

一、为保障客户账户资金安全，及时核实、纠正可能发生的账务差错，创兴银行有限公司中国境内分支行为客户提供网上对账服务。 </br>
二、客户进行网上对账的账户须为已在网上银行注册的存、贷款账户。  </br>
三、账户余额相符的，客户确认余额相符视为向创兴银行有限公司中国境内分支行返回网上对账信息；账户余额不符的，客户编制并提交余额调节表视为向创兴银行有限公司中国境内分支行返回网上对账信息。  </br>
四、自电子对账单生成日起超过15日仍未收到客户的电子对账单确认信息，将视同客户已核实无误并认可对账数据，由此产生的后果由客户负责。  </br>
五、根据我行《银企对账管理办法》规定，除另有约定，以下账户可不对账：验资账户；保证金账户；长期不动存款账户；外汇待核查账户；企业年金基金银行账户；托管专户存款返还账户；开户后无款项发生；有效对账后无资金往来的账户。 </br> 
六、客户对同一账户的对账方式只能选择网上对账和邮寄对账单之一。开通网上对账服务，在下一个对账周期开始网上对账后，邮寄对账单方式自动终止。  </br>
七、客户如需变更对账方式，可以通过网上银行自助办理，也可以到创兴银行分支机构营业网点申请变更。  </br>
<p>声明:本单位已知悉并完全同意《创兴银行有限公司中国境内分支行网上银企对账业务须知》内容，并且自愿遵守该业务须知。</p>
                </div>
                <div class="tac pt20" >
                   <el-checkbox v-model="checked" v-if="signFlag=='0'" >我已阅读签约协议</el-checkbox>
                   <el-checkbox v-model="checked" v-if="signFlag=='1'">我已阅读解约协议</el-checkbox>
                </div>
               
                <div class="btnArea mt20 tac">
                  <el-button type="primary" @click='sign' v-if="signFlag=='0'">签约</el-button>
                  <el-button type="primary" @click='cancel' v-if="signFlag=='1'">解约</el-button>
                </div>           
             </div>
         </div>
          <div class="reminder">
              <b>业务说明：</b>
              <div class="remiContent"> 可通过此功能进行开启/关闭网上银行银企对账服务，开通此业务后银行将不再寄送纸质账单。</div>     
          </div>
        </div>
    </div>
    
   

  </ynet-content>
</template>


<script>
 
  export default {
    name:'accountbankMain',
    components:{
      
    },
    data() {
      return {
        user:this.$tools.storage.get("user","save"),
        signFlag:'',
        success:false,
        checked:'',
        form: {
          protocol:'',
        }, 
        // rules:{
        //    accNo: [
        //     { required: true, message: '请选择活动区域', trigger: 'change' }
        //   ],
        // },                      
      };
    },
    mounted(){
      let _this = this
      console.log("user",_this.user)
      _this.isSign()
    },
    methods: {
      isSign(){
        let _this = this
        let queryData = {}
        queryData.reqTP='Q'
        _this.$tools.request(_this,"CB010205.do",queryData).then(
          data =>{
            if('0' == data.body.errorCode){
              _this.signFlag = data.body.signFlag//0：未签约,1：已签约
              if(''==_this.signFlag || '0'==_this.signFlag) {
                  _this.signFlag ='0'
              }
            }else{
            }
          }
        )
      },
      //签约
      sign(val){
        let _this = this
        if(_this.checked){
            let queryData = {}

            let userStorge = _this.$tools.storage.get("user","save")
            let cstNo = userStorge.cstNo
            let userId = userStorge.eCIFID
            let newDate = [
              {key:'cstNo',value:cstNo},
              {key:'userId',value:userId},
              {key:'isAgree',value:'1'},
            ]
            let siDate = JSON.stringify(newDate);
            let certNo = userStorge.serialNo
            let ukeyNo = userStorge.uKeySn
            let siCstNo = cstNo
            let arrCstNo = ["客户号:",siCstNo]
            let arrType = ["操作类型:",'签约']
            let keyFlag = _this.$ukey
            if(keyFlag == true || keyFlag == 'true'){
              let flag = getSignData(arrCstNo,arrType,siDate,certNo,ukeyNo)
              if(flag == false || flag == 'false'){
                // this.$alert('签约——UKey签名失败,请重新再试', '温馨提示')
                return
              } 
              let signData = document.getElementById("signData").value.toString()
              queryData.signedData = signData
            }
            queryData.cstNo = userStorge ? userStorge.cstNo : ''
            queryData.userId = userStorge ? userStorge.userNo || userStorge.eCIFID : ""

            queryData.reqTP = 'S'
            queryData.isAgree = '1'
            _this.$tools.request(_this,"CB010204.do",queryData).then(
              data =>{
                if('0' == data.body.errorCode){
                  _this.$alert('签约成功', '提示', {
                                confirmButtonText: '确定'
                              });
                  _this.signFlag = '1'
                  _this.checked = false          
                }else{
                    _this.$alert(data.body.errorMsg, '提示', {
                      confirmButtonText: '确定'
                    })
                }
              })
        }else{
           _this.$alert('请阅读并同意签约协议', '提示', {
                              confirmButtonText: '确定'
                            });
        }
      },
      //解约
      cancel(){
         let _this = this
        if(_this.checked){
          console.log("_this.checked",_this.checked)
          let queryData = {}

          let userStorge = _this.$tools.storage.get("user","save")
          let cstNo = userStorge.cstNo
          let userId = userStorge.eCIFID
          let newDate = [
            {key:'cstNo',value:cstNo},
            {key:'userId',value:userId},
            {key:'isAgree',value:'0'},
          ]
          let siDate = JSON.stringify(newDate);
          let certNo = userStorge.serialNo
          let ukeyNo = userStorge.uKeySn
          let siCstNo = cstNo
          let arrCstNo = ["客户号:",siCstNo]
          let arrType = ["操作类型:",'解约']
          let keyFlag = _this.$ukey
          if(keyFlag == true || keyFlag == 'true'){
            let flag = getSignData(arrCstNo,arrType,siDate,certNo,ukeyNo)
            if(flag == false || flag == 'false'){
              // this.$alert('解约——UKey签名失败,请重新再试', '温馨提示')
              return
            } 
            let signData = document.getElementById("signData").value.toString()
            queryData.signedData = signData
          }
          queryData.cstNo = userStorge ? userStorge.cstNo : ''
          queryData.userId = userStorge ? userStorge.userNo || userStorge.eCIFID : ""

          queryData.reqTP = 'S'
          queryData.isAgree = '0'
          _this.$tools.request(_this,"CB010204.do",queryData).then(
            data =>{
              if('0' == data.body.errorCode){
                _this.$alert('解约成功', '提示', {
                              confirmButtonText: '确定'
                            });
                _this.signFlag = '0'
                _this.isSign()
                _this.checked = false         
              }else{
                _this.$alert(data.body.errorMsg, '提示', {
                  confirmButtonText: '确定'
                })
              }
            })
        }else{
           _this.$alert('请阅读并同意签约协议', '提示', {
                              confirmButtonText: '确定'
                            });
        }
      },
    }
  }

</script>
<style>
 .reminder{text-align:left;margin-top:10px}
 .remiContent{text-indent:35px}
</style>
