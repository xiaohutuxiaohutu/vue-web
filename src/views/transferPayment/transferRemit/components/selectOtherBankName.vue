<template>
    <div class="importCreditOpen">
		 <el-form ref="form" :model="form" :rules="rules"  class="formEmbedTable">
			 <table>
			 	<caption>填写查询信息</caption>
			 	<tr>
			 	<td>银行：</td>
			 	 <td>
		            <el-form-item  prop="recBankName" >
						 <el-select v-model="form.recBankName" placeholder="请选择银行">
								<el-option v-for="item in bankOptions" :label="item.bankName" :value="item.bankNo"></el-option>  
						 </el-select>
		        	</el-form-item>
	          	</td>
			 	</tr>
			 	<tr>
			 	<td>省份：</td>
			 	 <td>
		            <el-form-item  prop="province" >
						 <el-select v-model="form.province" placeholder="请选择省份" @change="selectCity">
								<el-option v-for="item in provinceOptions" :label="item.provinceName" :value="item.provinceCode"></el-option>  
						 </el-select>
		        	</el-form-item>
	          	</td>
			 	</tr>
			 	<tr>
			 	<td>城市：</td>
				 	 <td>
			            <el-form-item  prop="city" >
							 <el-select v-model="form.city" placeholder="请选择城市" >
									<el-option v-for="item in cityOptions" :label="item.cityName" :value="item.cityCode"></el-option>  
							 </el-select>
			        	</el-form-item>
		          	</td>
			 	</tr>
			 	<tr>
			 	<td>关键字：</td>
				 	 <td>
			           <el-form-item  prop="keyWord">
              				<el-input v-model="form.keyWord" placeholder="请输入关键字"></el-input>
           			   </el-form-item>
		          	</td>
			 	</tr>
			 </table>
			 <div class="btnArea mt20 tac">
		        <el-button type="primary" @click="selectUnionBank(1)">查询</el-button>
		        <el-button @click="resetForm()">重置</el-button>
		        <el-button @click="onClose()">返回</el-button>
			 </div>
		 </el-form>
		  <div class="tableData hideSelectAll printArea">
			  	  <el-table ref="singleTable" :data="tableData" highlight-current-row @select="select" @select-all="selectDisabled">
			  	  	  <el-table-column label="联行号" type="selection" ></el-table-column>
			  	      <el-table-column prop="bankNo" label="联行号" ></el-table-column>
<!-- 			  	      <el-table-column  label="类型"></el-table-column> -->
			  	      <el-table-column prop="bankName" label="银行名称"></el-table-column>
			  	  </el-table>
	  	  </div>
			<!--pagination-->
			<div class="pagination mt30 tar">
			<el-pagination layout="total, prev, pager, next, jumper" :total="total":size="size" :current-page="currentPage" @current-change="handleCurrentChange"></el-pagination>
			</div>
			<!--pagination--end-->
	  	   <div class="btnArea mt20 tac">
		        <el-button type="primary" @click="toggleRowSelection" >确认</el-button>
		 </div>
	 </div>
</template>
<script>
export default {
	name:'selectOtherBankName',
	components:{
		
	},
	props: {
		 selankPageNameMsg:{
	          type: Object
	        }
	      },
	data(){
		return{
		    multipleSelection: [],
			tableData:[],
			bankOptions:[],
			provinceOptions:[],
			cityOptions:[],
			form:{
				recBankName:'',
				province:'',
				city:'',
				keyWord:'',
				rcvNode:'',
				rcvLinkBank:''
			},
			rules:{
				
			},
			size:5,
          	total:0,
          	currentPage:1,
		}
	},
	methods:{
	      onClose(){
	    	  let _this=this
			  _this.$emit("goOtherBankPage","1")
	      },
	      selectBankName(){
	    	 let _this=this
	    	 let body={}
	    	 _this.$tools.request(_this,"CB000004.do",body).then(
	    				data=>{
		    				let errorCode =data.body.errorCode
			    			if(errorCode =='0'){
			    				 _this.bankOptions=data.body.bankInfoList
			    			}else{
			    				this.$alert('查询银行名称失败');
			    			}
		    		     }
	    	 )
	      },
	      queryProvince(){
		    	 let _this=this
		    	 let body={}
		    	 _this.$tools.request(_this,"CB000005.do",body).then(
		    				data=>{
			    				let errorCode =data.body.errorCode
				    			if(errorCode =='0'){
				    				 _this.provinceOptions=data.body.provinceInfoList
				    			}else{
				    				this.$alert('查询省份名称失败');
				    			}
			    		     }
		    	 )
		      },
		      selectCity(){
		    	   
			    	 let _this=this
			    	 _this.form.city=''
			    	 let body={}
			    	  body.provinceCode=_this.form.province
			    	 _this.$tools.request(_this,"CB000006.do",body).then(
			    				data=>{
				    				let errorCode =data.body.errorCode
					    			if(errorCode =='0'){
					    				 _this.cityOptions=data.body.cityList 
					    			}else{
					    				this.$alert('查询失败');
					    			}
				    		     }
			    	 )
			      },
			   selectUnionBank(currentPage){
			    	let _this=this
			    	let body={}
		    	    body.bankCode=_this.form.recBankName
		    	  	body.bankCity=_this.form.city
		    	  	body.keyWord=_this.form.keyWord
		    	  	body.turnPageShowNum='5'
		    	  	body.currentPage=currentPage
		    	 	_this.$tools.request(_this,"CB000007.do",body).then(
				    				data=>{
					    				let errorCode =data.body.errorCode
						    			if(errorCode =='0'){
											 _this.total = Number(data.body.turnPageTotalNum)
						    				 _this.tableData=data.body.unionBankList
						    			}else{
						    				this.$alert('查询城市名称失败');
						    			}
					    		     }
				    	 )
			      },
			      toggleRowSelection(){
			    	  let _this=this
			    	  if(_this.currentRow !=null){
			    		  _this.selankPageNameMsg.recopenNode=_this.currentRow.bankName
			    		  _this.selankPageNameMsg.rcvNode=_this.currentRow.bankNo
			    		  _this.selankPageNameMsg.rcvLinkBank=_this.currentRow.bankNo
			    		  //_this.selankPageNameMsg.payNode=_this.multipleSelection[0].bankCode
				    	  _this.$emit("goOtherBankPage","1")
			    	  }else{
			    		  this.$alert('请勾选选列表数据');
			    	  }
			    	 
			      },
					selectDisabled(selection, row){
						this.$refs.singleTable.clearSelection()
					},
					select(selection, row){
						this.currentRow = row
						this.$refs.singleTable.clearSelection()
						this.$refs.singleTable.toggleRowSelection(row)
					},
					 handleCurrentChange(currentPage){
						let _this = this
						_this.selectUnionBank(currentPage)
						_this.currentPage = currentPage
					},
					 resetForm() {//重置事件
					      let _this=this
					      this.$refs.form.resetFields()
					 },
	      
	},
	created(){
		let _this=this
		_this.selectBankName();
		_this.queryProvince();
	}
	
}

</script>