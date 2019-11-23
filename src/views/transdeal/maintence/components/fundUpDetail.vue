<template>
  <el-form class="formEmbedTable" ref="form" :model="form" :rules="rules" >
  
      <table>
        <tr>
          <td>付款账号户名：</td>
          <td>
            <el-form-item >
             {{form.ACCT_NM}}
            </el-form-item>
          </td>
          <td>收款款账号户名：</td>
          <td>
            <el-form-item>
             {{form.PAYEE_ACCT_NM}}
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>付款账号：</td>
          <td>
            <el-form-item >
            {{form.ACCT_NO}}
            </el-form-item>
          </td>
          <td>收款账号：</td>
          <td>
            <el-form-item>
              {{form.PAYEE_ACCT_NO}}
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>付款账号开户行：</td>
          <td>
            <el-form-item >
            {{form.payerBank}}
            </el-form-item>
          </td>
          <td>收款账号开户行：</td>
          <td>
            <el-form-item>
              {{form.PAYEE_BANK_NM}}
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>转账金额：</td>
          <td>
            <el-form-item >
            	{{$tools.utils.currencyFormat(form.amt)}}元
            </el-form-item>
          </td>
          <td>大写金额：</td>
          <td>
            <el-form-item>
                {{$tools.utils.toChinese(form.amt)}}
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>手续费（参考）：</td>
          <td>
            <el-form-item >
             <span v-if="form.bankFlag =='0' ">免手续费</span>
             <span v-if="form.bankFlag =='1' ">{{$tools.utils.currencyFormat(form.FEEDISCOUNTED)}}元</span>
            </el-form-item>
          </td>
          <td>大写金额：</td>
          <td>
            <el-form-item>
             <span v-if="form.bankFlag =='0' ">免手续费</span>
             <span v-if="form.bankFlag =='1' "> {{$tools.utils.toChinese(form.FEEDISCOUNTED)}}</span>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>付款用途：</td>
          <td>
            <el-form-item>
              {{form.purpose}}
            </el-form-item>
          </td>
          <td>预约处理日期：</td>
          <td>
            <el-form-item>
            {{$tools.utils.formatDate(form.DEALTIME,{"symbol":"YYYY-MM-DD"})}} &nbsp;{{form.time}}
            </el-form-item>
          </td>
        </tr>
         <tr>
          <td>附言：</td>
          <td>
            <el-form-item >
              {{form.POSTSCRIPT}}
            </el-form-item>
          </td>
          <td>备注：</td>
          <td>
            <el-form-item >
              {{form.bak}}
            </el-form-item>
          </td>
        </tr>
        <tr  v-if="status=='0'">
          <td>失败原因：</td>
          <td   colspan="3" style="text-align:left">
            <el-form-item >
             {{form.ERRORMSG}}
            </el-form-item>
          </td>
        </tr>
      </table>
      <!--拒绝弹窗-->
        <el-dialog title="" :visible.sync="rejectdialogVisible" v-if="rejectdialogVisible"  >
              
		     <div class="formEmbedTable">
		      <table>
		        <tr>
		          <td>拒绝原因：</td>
		          <td>
				       <el-form-item label=""  prop="rejReason">
		                <el-input type="textarea" v-model="form.rejReason" ></el-input>
		              </el-form-item>
		          </td>
		        </tr>
		      </table>
		    </div>
            <div slot="footer" class="dialog-footer btnArea tac">
                <el-button type="primary" @click="onSubmit">确认</el-button>
                <el-button @click="rejectdialogVisible=false">取消</el-button>
            </div>
        </el-dialog>
          <div class="btnArea mt20 tac" v-if="openType">
            <el-button @click="close2">关闭</el-button>
        </div>
      <!--拒绝end弹窗-->
  </el-form>
  
</template>


<script>
export default {
  name: 'fundUpDetail',
  components:{
		 
	 },
	 props: {
		 list:{
		      type: Object
		    }
	      },
  data(){
    return {
    	rejectdialogVisible:false,
    	openType:false,
    	authflag:'0',
    	typeflag:'0',
    	status:'1',
    	form:{
    		ACCT_NO:'',
    		ACCT_NM:'',
    		PAYEE_ACCT_NO:'',
    		PAYEE_ACCT_NM:'',
    		PAYEE_BANK_NM:'',
    		amt:'',
    		FEEREGION:'',
    		purpose:'',
    		POSTSCRIPT:'',
    		bak:'',
    		bankFlag:'',
    		DEALTIME:'',
    		rejReason:'',
    		authFlag:'',
    		FEEDISCOUNTED:'',
    		transFlowNoList:[{}]
    	},
    	rules:{
    		rejReason:[{ message: '请填写拒绝原因', trigger:'change', required: true}]
		}
    }
  },
  methods:{
	  selectTransferList(){
	    	 let _this=this
	    	 let body={}
	    	  body.transFlowNo=this.list.flowNo
	    	 _this.$tools.request(_this,"CB020111.do",body).then(
	    				data=>{
		    				let errorCode =data.body.errorCode
		    				
			    			if(errorCode =='0'){
			    				 let transferList=data.body.transferList 
			    				 _this.form.ACCT_NO=transferList[0].ACCT_NO
			    				 _this.form.ACCT_NM=transferList[0].ACCT_NM
			    				 _this.form.PAYEE_ACCT_NO=transferList[0].PAYEE_ACCT_NO
			    				 _this.form.PAYEE_ACCT_NM=transferList[0].PAYEE_ACCT_NM
			    				 _this.form.PAYEE_BANK_NM=transferList[0].PAYEE_BANK_NM
			    				 _this.form.amt=transferList[0].amt
			    				 _this.form.FEEREGION=transferList[0].FEEREGION//FEEDISCOUNTED
			    				 _this.form.FEEDISCOUNTED=transferList[0].FEEDISCOUNTED//
			    				 _this.form.purpose=transferList[0].purpose
			    				 _this.form.DEALTIME=transferList[0].DEALTIME
			    				 _this.form.POSTSCRIPT=transferList[0].POSTSCRIPT
			    				 _this.form.bak=transferList[0].bak
			    				 _this.form.bankFlag=transferList[0].bankFlag
			    				 _this.form.payerBank=transferList[0].payerBank //付款银行名称
			    				 _this.form.bespeakTimeType=transferList[0].bespeakTimeType //付款银行名称
			    				 _this.form.ERRORCODE=transferList[0].ERRORCODE //错误码
			    				 _this.form.ERRORMSG=transferList[0].ERRORMSG //错误信息
			    				 _this.form.stt=transferList[0].status
			    				 if(_this.form.payerBank==''||_this.form.payerBank==undefined){
			    					 _this.form.payerBank='创兴银行' 
			    				 }
			    				 if(_this.form.bespeakTimeType=='1'){
			    					 _this.form.time='8:00-10:00'
			    				 }else if (_this.form.bespeakTimeType=='2'){
			    					 _this.form.time='10:00-12:00'
			    				 }else if (_this.form.bespeakTimeType=='3'){
			    					 _this.form.time='12:00-14:00'
			    				 }else if (_this.form.bespeakTimeType=='4'){
			    					 _this.form.time='14:00-16:00'
			    				 }
			    				 
			    				if(_this.form.bankFlag=='0'&&_this.form.PAYEE_BANK_NM==''){
			    					_this.selectAccBankName()
			    				}
			    				if(_this.form.stt=='91'){
			    					_this.status='0'
			    				}
			    				 
			    			}else{
			    				this.$alert('查询失败');
			    			}
		    		     }
	    	 )
	      },
	      
		  selectAccBankName(){
		    	 let _this=this
		    	 let body={}
		    	  body.accNo=_this.form.PAYEE_ACCT_NO
		    	 _this.$tools.request(_this,"CB200035.do",body).then(
		    				data=>{
			    				let errorCode =data.body.errorCode
				    			if(errorCode =='0'){
				    				var branchName=data.body.branchName 
				    				_this.form.PAYEE_BANK_NM=branchName
				    			}else{
				    				_this.form.PAYEE_BANK_NM="创兴银行"
				    			}
			    		     }
		    	 )
		      },
	      
	      
	      close2(){
         //交易审核批量详情关闭、交易维护的一站式、批量详情关闭
              this.$emit("close1")
          
	    }
  },
  created(){
	  this.selectTransferList()
    console.log(this.$route,"route")
	  if(this.list.queryType=='1'){
		  this.typeflag='1'
	  }
	  if(this.list.TYPE=='1'){
		  this.openType=true
	  }
	  
  }
}



</script>