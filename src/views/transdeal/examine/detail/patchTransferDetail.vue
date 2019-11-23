<template>
	<div class="check tableData">
		<el-table :data="tableData1" class="mb40">
			<el-table-column label="网银批次号" prop="patchNo"></el-table-column>
			<el-table-column label="交易总笔数" prop="totalNum"></el-table-column>
			<el-table-column label="总金额" prop="totalAmt">
				<template scope="scope">
					{{$tools.utils.currencyFormat(scope.row.totalAmt)}}元
				</template>
			</el-table-column>
			<el-table-column label="交易类型">
				<template scope="scope">{{type}}</template>
			</el-table-column>
			<el-table-column label="提交日期" prop="submitTime">
				<template scope="scope">
					{{$tools.utils.formatDate(scope.row.submitTime,{"symbol":"YYYY-MM-DD"})}}
				</template>
			</el-table-column>
		</el-table>
		<el-table :data="tableData2" class="mb40">
			<el-table-column label="序列号" prop="authFlowNo">
				<template scope="scope">
					{{Number(popForm.currentPage-1)*Number(popForm.turnPageShowNum)+Number(scope.row.authFlowNo)}}
				</template>
			</el-table-column>
			<el-table-column label="付款账号" prop="payAccount"></el-table-column>
			<el-table-column label="收款账号" prop="recAccount"></el-table-column>
			<el-table-column label="收款账号户名" prop="recName"></el-table-column>
			<el-table-column label="金额" prop="transAmount">
				<template scope="scope">
					{{$tools.utils.currencyFormat(scope.row.transAmount)}}元
				</template>
			</el-table-column>
			<el-table-column label="用途" prop="purposeName"></el-table-column>
			<el-table-column label="状态" prop="stt" v-if="queryStatu==0">
				<template scope="scope">
					{{$tools.dict.statusTrans(scope.row.stt)}}
				</template>
			</el-table-column>
			<el-table-column label="详情">
				<template scope="scope">
					<a class="cOrange" @click="detail(scope.row)">详情</a>
				</template>
			</el-table-column>
		</el-table>
		<div class="block tar">
			<el-pagination @current-change="handleCurrentChange" :current-page.sync="popForm.currentPage" :page-size="popForm.turnPageShowNum" layout="total, prev, pager, next, jumper" :total="Number(popForm.turnPageTotalNum)">
			</el-pagination>
		</div>
		<el-form class="formEmbedTable" ref="form" :model="form" :rules="rules">
			<div class="btnArea mt20 tac">
				<el-button type="primary" @click="allSubmit(authflag)" v-if="openflag==1">同意</el-button>
				<el-button type="primary" @click="rejectdialogVisible=true" v-if="openflag==1">拒绝</el-button>
				<el-button @click="close" v-if="openflag==1">返回</el-button>
				<el-button @click="close" v-if="openflag==2">返回</el-button>
			</div>
			<!--拒绝弹窗-->
			<el-dialog title="" :visible.sync="rejectdialogVisible" v-if="rejectdialogVisible">
				<div class="formEmbedTable">
					<table>
						<tr>
							<td>拒绝原因：</td>
							<td>
								<el-form-item label="" prop="rejReason">
									<el-input type="textarea" v-model="form.rejReason"></el-input>
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
		</el-form>
		<!--拒绝弹窗-->
		<!--详情弹窗-->
		<el-dialog :visible.sync="detailDialog" v-if="detailDialog">

			<intelligentTransferDetail ref="dialog" :list="dialogList" @close1="close1"></intelligentTransferDetail>
			<div slot="footer" class="dialog-footer btnArea tac">
				<!--el-button @click="detailDialog=false">关闭</el-button!-->
			</div>
		</el-dialog>
		<!--详情end弹窗-->

	</div>
</template>
<script>
import intelligentTransferDetail from '../../maintence/components/intelligentTransferDetail'
export default {
	name: 'patchTransferDetail',
	components: {
		intelligentTransferDetail
	},
	props: {
		list: {
			type: Object
		}
	},
	data() {
		return {
			detailDialog: false,
			authflag: '0',
			openflag: '0',
			queryStatu: '0',
			rejectdialogVisible: false,
			type: '批量转账',
			tableData2: [{}],
			tableData1: [{}],
			form: {
				rejReason: '',
				transFlowNoList: [{}],
				userId: '',
				cstNo: '',
				payAccount: '',
				transFlowNo: '',
				totalAmount: '',
				totalNum: '',
				timeStamps: ''
			},
			popForm: {
				currentPage: 1,
				turnPageShowNum: 10,
				turnPageTotalNum: 0
			},
			dialogList: {},
			rules: {
				rejReason: [
					{ required: true, message: '请输入拒绝原因', trigger: 'blur' },
					{ min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
				]
			}
		}
	},
	methods: {
		onLoadPatchList() {
			let _this = this
			let body = {}
			body.transFlowNo = _this.list.flowNo
			_this.$tools.request(_this, "CB020112.do", body).then(
				data => {
					let errorCode = data.body.errorCode

					if (errorCode == '0') {
						_this.tableData1 = data.body.detalPathNoList
					} else {
						this.$alert('查询批量转账明细失败');
					}
				}
			)
		},
		onLoadTransList() {
			let _this = this
			let body = {}
			body.transFlowNo = _this.list.flowNo
			body.cstNo = this.$tools.storage.get("user", "save").cstNo
			body.currentPage = _this.popForm.currentPage
			body.turnPageShowNum = '10'
			_this.$tools.request(_this, "CB020113.do", body).then(
				data => {
					let errorCode = data.body.errorCode
					if (errorCode == '0') {
						//alert(JSON.stringify(data.body.transDetalList))
						_this.tableData2 = data.body.transDetalList
						_this.popForm.turnPageTotalNum = data.body.turnPageTotalNum
					} else {
						this.$alert('查询批量转账明细失败');
					}
				}
			)
		},
		handleCurrentChange(val) {
			let _this = this
			_this.popForm.currentPage = val
			_this.onLoadTransList()
		},
		onSubmit() {
			let _this = this
			_this.$refs.form.validate((valid) => {
				if (valid) {
					_this.rejectdialogVisible = false
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
				_this.form.userNo = this.$tools.storage.get("user", "save").eCIFID,
				_this.form.authFlag = value
			_this.form.bsnCode = _this.list.bsnCode
			_this.form.transFlowNoList[0].transFlowNo = _this.list.flowNo
			_this.form.payAccount = _this.tableData2[0].payAccount
			_this.form.userId = this.$tools.storage.get("user", "save").eCIFID,
				_this.form.transFlowNo = _this.tableData1[0].patchNo
			_this.form.totalAmount = _this.tableData1[0].totalAmt
			_this.form.totalNum = _this.tableData1[0].totalNum
			let userStorge = _this.$tools.storage.get("user", "save")
			let newDate = [{ key: 'cstNo', value: userStorge.cstNo },
			{ key: 'userId', value: userStorge.eCIFID },
			{ key: 'payAccount', value: _this.tableData2[0].payAccount },
			{ key: 'transFlowNo', value: _this.tableData1[0].patchNo },
			{ key: 'totalAmount', value: _this.tableData1[0].totalAmt },
			{ key: 'totalNum', value: _this.tableData1[0].totalNum },
			{ key: 'rejReason', value: _this.form.rejReason }
			]
			let siDate = JSON.stringify(newDate);
			let certNo = userStorge.serialNo
			let ukeyNo = userStorge.uKeySn
			let siAmt = _this.tableData1[0].totalAmt
			let siAccountNo = _this.tableData2[0].payAccount
			let arrAcc = ["付款账号:", siAccountNo]
			let arrAmt = ["交易金额:", siAmt]
			let keyFlag = _this.$ukey
			if (keyFlag == true || keyFlag == 'true') {
				let flag = getSignData(arrAcc, arrAmt, siDate, certNo, ukeyNo)
				//alert("flag"+flag)
				if (flag == false || flag == 'false') {
					return
				}
				let signData = document.getElementById("signData").value.toString()
				// alert(signData)
				_this.form.signedData = ""
				_this.form.signedData = signData
			}

			_this.$tools.request(_this, "CB020110.do", _this.form).then(data => {
				let errorCode = data.body.errorCode
				let errorMsg = data.body.errorMsg
				if (errorCode == '0') {
					// _this.$emit("close")
					console.log(data.body, 'data.body')
					_this.$emit("close", [4, data.body])
				} else {
					this.$alert(errorMsg, '温馨提示');
					//_this.$emit("close", [4, data.body])
				}

			})
		},
		close(body) {
			let _this = this
			//this.$emit("close",[4,data.body])
			_this.$emit("close2")

		},
		detail(val) {
			//alert(val.flowNo)
			let _this = this
			_this.dialogList = { "flowNo": val.flowNo, "TYPE": "1" }

			_this.detailDialog = true
		},
		//弹窗关闭
		close1() {
			let _this = this
			_this.detailDialog = false
		},
		getTimeStamps(tradeCode) { //获取时间戳
			let _this = this
			let code = { "tradeCode": tradeCode }
			_this.$tools.request(this, "CB000028Action.do", code).then(data => {
				_this.form.timeStamps = data.body.timeStamps
				//_this.nextStep()
			})
		},
	},
	created() {
		this.onLoadPatchList()
		this.onLoadTransList()
		this.getTimeStamps('CB020110')
		//alert(this.list.queryFlag)
		if (this.list.queryFlag == '2') {
			this.openflag = '1'
			this.queryStatu = '1'
		} else if (this.list.queryFlag == '3') {
			this.openflag = '2'
		}
	}
}
</script>
