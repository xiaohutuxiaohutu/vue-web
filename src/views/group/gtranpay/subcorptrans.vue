<template> 
	  <ynet-content id="subcorptrans" class="main-content" :headerInformation="true" :headerMenu="true">
	  		<!--面包屑-->
    		<ynet-breadcrumb></ynet-breadcrumb>
    		<!--面包屑--end-->
    		<!--功能区-->
			<div  class="functionalArea">
				<h3 class="functionalAreaTitle">操作子公司账户转账</h3>
			    	<div class="p20">
			   			<ynet-progress-bar class="mt10" :items="stepText" :itemIndex="currentItemIndex"></ynet-progress-bar>
			   	   <!--进度条--end-->
			 	   <iTransferFirst v-if="currentItemIndex==0" @goStepPage="nextPage" @goShowPage="showDialogVisible"  @goOtherBankPage="otherBankPageName"  :fillinMsg="form"></iTransferFirst>
			 	   <iTransferSecond v-if="currentItemIndex==1" @goStepPage="nextPage" :confirmMsg="form"></iTransferSecond>
	 			   <iTransferThird v-if="currentItemIndex==2" @goStepPage="nextPage"  :resultMsg="form"></iTransferThird>
			  		</div>
	   		</div>
	   	    <!--功能区--end-->
	   	    
	   	    <!--弹窗1-->
		    <el-dialog title="常用收款人" :visible.sync="dialogVisible" size="small">
		      <selTransferPayee  v-if="dialogVisible" @goShowPage="showDialogVisible" :selTransferPayeeMsg="form"></selTransferPayee>
		    </el-dialog>
		    <el-dialog title="查询收款行" :visible.sync="otherBankDialogVisible" size="small">
		      <selectOtherBankName v-if="otherBankDialogVisible"  @goOtherBankPage="otherBankPageName" :selankPageNameMsg="form"></selectOtherBankName>
		    </el-dialog>
    	<!--弹窗end-->
	 </ynet-content>
</template>
<script>

import iTransferFirst from './components/subcorptranFirst'
import iTransferSecond from './components/subcorptranSecond'
import iTransferThird from './components/subcorptranThird'
import selTransferPayee from './components/selectTransferPayee'
import selectOtherBankName from './components/selectOtherBankName'
export default {
	name:'subcorptrans',
	components:{
		iTransferFirst,
		iTransferSecond,
		iTransferThird,
		selTransferPayee,
		selectOtherBankName
	},
	data(){
		return{
      stepText:["填写信息","确认转账信息","提交结果"],
      headerInformation:true,
      headerMenu:true,
      currentItemIndex:0,
      dialogVisible: false,
      otherBankDialogVisible:false,
      form: {}
		}
	},
	methods:{
		nextPage(index,form){
      let _this=this
      _this.currentItemIndex=Number(index)
      if(form)
      _this.form=form
      _this.$tools.scrollTop()
    },
    showDialogVisible(index,form){
      let _this=this
        _this.form=form
      if(index=='1'){
        _this.dialogVisible=false
      }else{
        _this.dialogVisible=true
      }
    },
    otherBankPageName(index,form){
      let _this=this
        _this.form=form
      if(index=='1'){
        _this.otherBankDialogVisible=false
      }else{
        _this.otherBankDialogVisible=true
      }
      
    }
	}
}

</script>