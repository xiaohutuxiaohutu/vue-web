<template>
	<el-form class="formEmbedTable" ref="form" :model="form" :rules="rules">
		<div class="tableData p20">
			<table>
				<tr>
					<td>付款账号户名：</td>
					<td>
						<el-form-item>
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
						<el-form-item>
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
						<el-form-item>
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
						<el-form-item>
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
						<el-form-item>
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
					<td>附言：</td>
					<td>
						<el-form-item>
							{{form.POSTSCRIPT}}
						</el-form-item>
					</td>
				</tr>
				<tr>
					<td>备注：</td>
					<td colspan="3" style="text-align:left">
						<el-form-item>
							{{form.bak}}
						</el-form-item>
					</td>
				</tr>
				<tr v-if="rejectdialogVisible">
					<td>拒绝原因：</td>
					<td colspan="3">
						<el-form-item label="" prop="rejReason">
							<el-input type="textarea" v-model="form.rejReason"></el-input>
						</el-form-item>
					</td>
				</tr>
			</table>
			<div class="btnArea mt20 tac" v-if="!rejectdialogVisible">
				<el-button type="primary" @click="allSubmit(authflag)">同意</el-button>
				<el-button type="primary" @click="rejectdialogVisible=true">拒绝</el-button>
				<el-button @click="close">关闭</el-button>
			</div>
			<div class="btnArea mt20 tac" v-if="rejectdialogVisible">
				<el-button type="primary" @click="onSubmit">确认</el-button>
				<el-button @click="rejectdialogVisible=false">取消</el-button>
			</div>
		</div>
		<!--拒绝弹窗-->
		<!--         <el-dialog title="" :visible.sync="rejectdialogVisible" v-if="rejectdialogVisible"  > -->

		<!-- 		     <div class="formEmbedTable"> -->
		<!-- 		      <table> -->
		<!-- 		        <tr> -->
		<!-- 		          <td>拒绝原因：</td> -->
		<!-- 		          <td> -->
		<!-- 				       <el-form-item label=""  prop="rejReason"> -->
		<!-- 		                <el-input type="textarea" v-model="form.rejReason" ></el-input> -->
		<!-- 		              </el-form-item> -->
		<!-- 		          </td> -->
		<!-- 		        </tr> -->
		<!-- 		      </table> -->
		<!-- 		    </div> -->
		<!--             <div slot="footer" class="dialog-footer btnArea tac"> -->
		<!--                 <el-button type="primary" @click="onSubmit">确认</el-button> -->
		<!--                 <el-button @click="rejectdialogVisible=false">取消</el-button> -->
		<!--             </div> -->
		<!--         </el-dialog> -->
		<!--拒绝end弹窗-->
	</el-form>
</template>


<script>
export default {
	name: 'fundDownDetail',
	components: {

	},
	props: {
		list: {
			type: Object
		}
	},
	data() {
		return {
			rejectdialogVisible: false,
			authflag: '0',
			form: {
				ACCT_NO: '',
				ACCT_NM: '',
				PAYEE_ACCT_NO: '',
				PAYEE_ACCT_NM: '',
				PAYEE_BANK_NM: '',
				amt: '',
				FEEREGION: '',
				purpose: '',
				POSTSCRIPT: '',
				bak: '',
				bankFlag: '',
				DEALTIME: '',
				rejReason: '',
				authFlag: '',
				FEEDISCOUNTED: '',
				transFlowNoList: [{}],
				payAccountNo: '',
				payAccountName: '',
				recAccount: '',
				recName: '',
				transAmount: '',
				timeStamps: ''
			},
			rules: {
				rejReason: [
					{ required: true, message: '请输入拒绝原因', trigger: 'blur' },
					{ min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
				]
			}
		}
	},
	methods: {
		selectTransferList() {
			let _this = this
			let body = {}
			body.transFlowNo = _this.list.flowNo
			_this.$tools.request(_this, "CB020111.do", body).then(
				data => {
					let errorCode = data.body.errorCode

					if (errorCode == '0') {
						let transferList = data.body.transferList
						console.log("transferList", transferList)
						_this.form.ACCT_NO = transferList[0].ACCT_NO
						_this.form.ACCT_NM = transferList[0].ACCT_NM
						_this.form.PAYEE_ACCT_NO = transferList[0].PAYEE_ACCT_NO
						_this.form.PAYEE_ACCT_NM = transferList[0].PAYEE_ACCT_NM
						_this.form.PAYEE_BANK_NM = transferList[0].PAYEE_BANK_NM
						_this.form.amt = transferList[0].amt
						_this.form.FEEREGION = transferList[0].FEEREGION//FEEDISCOUNTED
						_this.form.FEEDISCOUNTED = transferList[0].FEEDISCOUNTED//
						_this.form.purpose = transferList[0].purpose
						_this.form.DEALTIME = transferList[0].DEALTIME
						_this.form.POSTSCRIPT = transferList[0].POSTSCRIPT
						_this.form.bak = transferList[0].bak
						_this.form.bankFlag = transferList[0].bankFlag
						_this.form.payerBank = transferList[0].payerBank //付款银行名称
						_this.form.bespeakTimeType = transferList[0].bespeakTimeType
						_this.form.seqno = transferList[0].seqno
						if (_this.form.payerBank == '' || _this.form.payerBank == undefined) {
							_this.form.payerBank = '创兴银行'
						}
						if (_this.form.bespeakTimeType == '1') {
							_this.form.time = '8:00-10:00'
						} else if (_this.form.bespeakTimeType == '2') {
							_this.form.time = '10:00-12:00'
						} else if (_this.form.bespeakTimeType == '3') {
							_this.form.time = '12:00-14:00'
						} else if (_this.form.bespeakTimeType == '4') {
							_this.form.time = '14:00-16:00'
						}
					} else {
						this.$alert('查询失败');
					}
				}
			)
		},
		onSubmit() {
			let _this = this
			_this.$refs.form.validate((valid) => {
				if (valid) {
					_this.form.authFlag = '1'
					_this.allSubmit(_this.form.authFlag)

				}
			})
		},
		getTimeStamps(tradeCode) { //获取时间戳
			let _this = this
			let code = { "tradeCode": tradeCode }
			_this.$tools.request(this, "CB000028Action.do", code).then(data => {
				_this.form.timeStamps = data.body.timeStamps
				//_this.nextStep()
			})
		},
		allSubmit(value) {
			let _this = this
			if (value == '0') {
				_this.form.rejReason = ''
			}
			_this.form.cstNo = this.$tools.storage.get("user", "save").cstNo,
				_this.form.userId = this.$tools.storage.get("user", "save").eCIFID,
				_this.form.authFlag = value
			_this.form.bsnCode = _this.list.bsnCode
			_this.form.transFlowNoList[0].transFlowNo = _this.list.flowNo
			_this.form.payAccountNo = _this.form.ACCT_NO
			_this.form.payAccountName = _this.form.ACCT_NM
			_this.form.recAccount = _this.form.PAYEE_ACCT_NO
			_this.form.recName = _this.form.PAYEE_ACCT_NM
			_this.form.transFlowNo = _this.list.flowNo
			_this.form.transAmount = _this.form.amt
			let userStorge = _this.$tools.storage.get("user", "save")
			let cstNo = userStorge.cstNo
			let userId = userStorge.eCIFID
			let newDate = [{ key: 'cstNo', value: cstNo },
			{ key: 'userId', value: userId },
			{ key: 'payAccountNo', value: _this.form.ACCT_NO },
			{ key: 'payAccountName', value: _this.form.ACCT_NM },
			{ key: 'recAccount', value: _this.form.PAYEE_ACCT_NO },
			{ key: 'recName', value: _this.form.PAYEE_ACCT_NM },
			{ key: 'transAmount', value: _this.form.amt },
			{ key: 'transFlowNo', value: _this.list.flowNo },
			{ key: 'bsnCode', value: _this.list.bsnCode },
			{ key: 'rejReason', value: _this.form.rejReason },
			]

			let siDate = JSON.stringify(newDate);
			let certNo = userStorge.serialNo
			let ukeyNo = userStorge.uKeySn
			let siAmt = _this.form.amt
			let siAccountNo = _this.form.ACCT_NO
			let arrAcc = ["付款账号:", siAccountNo]
			let arrAmt = ["交易金额:", siAmt]
			let keyFlag = _this.$ukey
			if (keyFlag == true || keyFlag == 'true') {
				let flag = getSignData(arrAcc, arrAmt, siDate, certNo, ukeyNo)
				if (flag == false || flag == 'false') {
					return
				}
				let signData = document.getElementById("signData").value.toString()
				_this.form.signedData = ''
				_this.form.signedData = signData
			}

			_this.$tools.request(_this, "CB020104.do", _this.form).then(data => {
				let errorCode = data.body.errorCode
				let errorMsg = data.body.errorMsg
				if (errorCode == '0') {
					_this.$emit("close", [4, data.body])
				} else {
					_this.rejectdialogVisible = false
					this.$alert(errorMsg);
				}

			})
		},
		close() {
			this.$emit("close")
		}
	},
	created() {
		this.selectTransferList()
		this.getTimeStamps('CB020104')

	}
}



</script>