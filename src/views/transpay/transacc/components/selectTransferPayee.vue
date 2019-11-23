<template>
	 <div class="p20">
	   <div class="oneForm mt20">
	   		<el-form  >
	   			<el-form-item label="请输入查询条件：" prop="" class="fullLine" style="width:100%;">
	   				<el-input  v-model="selTransferPayeeMsg.selectName" placeholder="请输入账户、用户、别名等"  style="width:40%"></el-input>
	   				<el-button type="primary" style="background:#eb6300; border:1px solid #eb6300 ;width:10%" @click="getTableData(1)">查询</el-button>
	   			</el-form-item>
	   			
	   		</el-form>
	   </div>
	  	<div class="tableData hideSelectAll printArea">
	  	  
	  	  <el-table ref="singleTable" :data="tableData"  highlight-current-row @select="select" @select-all="selectDisabled">
			  <el-table-column type="selection"></el-table-column>
	  	      <el-table-column prop="recvAccount" label="账户" width="180"></el-table-column>
	  	      <el-table-column prop="recvAccountName" label="账户名称"></el-table-column>
	  	      <el-table-column prop="alias" label="别名"></el-table-column>
	  	      <el-table-column prop="openBankName" label="开户行行名"></el-table-column>
	  	  </el-table>
	  	</div>
		<!--pagination-->
        <div class="pagination mt30 tar">
          <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="size" layout="total, prev, pager, next, jumper" :total="total"></el-pagination>
        </div>
      	<!--pagination--end-->
	  	 <div class="btnArea mt20 tac">
		        <el-button type="primary" v-if="payeeIndex==0" @click="commitClick" >确认</el-button>
		        <el-button @click="close()">关闭</el-button>
		 </div>
	 </div>
</template>
<script>
export default
{
	name:'selectTransferPayee',
	components: {
		
	},
	 props: {
		 selTransferPayeeMsg:{
	          type: Object
	        }
	      },
	 data() {
	    	  
		 return {
			 payeeIndex:'0',
			 lStorage:this.$tools.storage.get("user","save"),
			 currentRow: null,
			 tableData: [{
			 }],
			 form:{
				 selectName:''
			 },
			 rules:{
				 
			 },
			 size:5,
			 total:0,
			 currentPage:1,
		 }
	},
	methods:{
				selectDisabled(selection, row){
					this.$refs.singleTable.clearSelection()
				},
				select(selection, row){
					this.currentRow = row
					this.$refs.singleTable.clearSelection()
					this.$refs.singleTable.toggleRowSelection(row)
				},
	      close(){
	    	  let _this=this
			  _this.$emit("goShowPage","1")
	      },
	     getTableData(currentPage){
	    	 
	    	  let _this=this
	    	  let body={}
	    	  //alert(_this.selTransferPayeeMsg.bankFlag)
			  body.keyWord=_this.selTransferPayeeMsg.selectName
			//   body.selectName=_this.selTransferPayeeMsg.accountName
	    	  body.recvType=_this.selTransferPayeeMsg.bankFlag
	    	  body.currentPage=currentPage
	    	  body.turnPageShowNum='5'
	    	  body.cstNo=_this.lStorage.cstNo
    		  body.userNo=_this.lStorage.eCIFID 
	    	  _this.$tools.request(_this,"CB000003.do",body).then(
	    			  data=>{
	    				        let errorCode =data.body.errorCode
			    				let errorMsg =data.body.errorMsg
			    				if(errorCode!=0){
			    					
			    				    this.$alert(errorMsg, '提示', {
     		    			              confirmButtonText: '确定'
     		    			            });
     		    			           
			    				}else{
									_this.total = Number(data.body.turnPageTotalNum)
			    					_this.tableData=data.body.payeeList
			    					let payeSize=data.body.payeeList
			    					if(payeSize.length>0){
			    						 _this.payeeIndex='0'
			    					}else{
			    						 _this.payeeIndex='1'
			    					}
			    				}
			    				
	    			  }
	    	  )
	      },
	      commitClick(){
	    	  let _this=this
					if(_this.currentRow.recvAccountName){
						_this.selTransferPayeeMsg.recAccount=_this.currentRow.recvAccount
						_this.selTransferPayeeMsg.accountName=_this.currentRow.recvAccountName
						_this.selTransferPayeeMsg.mobilePhone=_this.currentRow.mobilePhone
					    _this.selTransferPayeeMsg.recBankName=_this.currentRow.openBankName
			    		_this.selTransferPayeeMsg.rcvNode=_this.currentRow.bankNo//openBankNo
			    		_this.selTransferPayeeMsg.rcvLinkBank=_this.currentRow.bankNo //联行号
					    
						if(_this.currentRow.recvAccountName !=''){
							_this.selTransferPayeeMsg.acNamedisabled=true
						}
						_this.$emit("goShowPage","1",_this.selTransferPayeeMsg)
					}
	      },
		  handleCurrentChange(currentPage){
						let _this = this
						_this.getTableData(currentPage)
						_this.currentPage = currentPage
					},
	},
	created(){
		 let _this=this
		 _this.getTableData(1)
	}

	
}
</script>