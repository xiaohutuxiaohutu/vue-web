<template>
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
				<td>转入账户（公司账号）：</td>
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
			<!--<tr>
					<td>转出子公司账号组别：</td> 
					<td colspan="3">
						<el-form-item>{{confirmMsg.payAccountGroupDesc}}</el-form-item>
					</td>
				</tr>-->
			<tr>
				<td>转出账户（子公司账号）：</td>
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
						{{$tools.utils.formatDateSymbol(confirmMsg.effectDate)}}
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
			<tr v-if="rejectdialogVisible">
				<td>拒绝原因：</td>
				<td colspan="3">
					<el-form-item label="" prop="rejReason">
						<el-input type="textarea" v-model="form.rejReason"></el-input>
					</el-form-item>
				</td>
			</tr>
		</table>
		<div class="btnArea mt20 tac">
			<!--<el-button type="primary" @click="allSubmit(authflag)">同意</el-button>
				<el-button type="primary"  @click="rejectdialogVisible=true">拒绝</el-button>-->
			<el-button @click="close">关闭</el-button>
		</div>
	</el-form>
</template>


<script>
export default {
	name: 'cashSweepDetail',
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
				cstNo: '',
				userId: '',
				authFlag: '',
				rejReason: '',
				bsnCode: '',
				payAccountNo: '',
				timeStamps: ''
			},
			rules: {
				rejReason: [
					{ required: true, message: '请输入拒绝原因', trigger: 'blur' },
					{ min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
				]
			},
			confirmMsg: {}
		}
	},
	methods: {
		selectTransferList() {
			let _this = this
			let body = {}
			body.taskNo = _this.list.flowNo
			_this.$tools.request(_this, "CB040308.do", body).then(
				data => {
					let errorCode = data.body.errorCode
					// debugger
					if (errorCode == '0') {
						_this.confirmMsg = data.body.cashSweepTaskList[0]
					} else {
						_this.$alert(data.body.errorMsg)
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
			let newDate = [
				{ key: 'cstNo', value: cstNo },
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

			_this.$tools.request(_this, "CB020104.do", _this.form).then(
				data => {
					let errorCode = data.body.errorCode
					let errorMsg = data.body.errorMsg
					if (errorCode == '0') {
						_this.$emit("close", [4, data.body])
					} else {
						_this.rejectdialogVisible = false
						_this.$alert(errorMsg);
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
		close() {
			this.$emit("close")
		}
	},
	mounted() {
		// this.confirmMsg = this.list.cashSweepTaskList[0]
		this.selectTransferList()
		// this.getTimeStamps('CB020104')
	}
}



</script>