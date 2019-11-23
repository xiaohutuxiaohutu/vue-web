<template>
	<ynet-content id="templateName" class="main-content" :headerInformation="true" :headerMenu="true">
		<!--面包屑-->
		<ynet-breadcrumb></ynet-breadcrumb>
		<!--面包屑--end-->
		<!--功能区-->
		<div class="functionalArea">
			<h3 class="functionalAreaTitle">一站式转账</h3>
			<div class="p20">
				<ynet-progress-bar class="mt10" :items="stepText" :itemIndex="currentItemIndex"></ynet-progress-bar>
				<!--进度条--end-->
				<iTransferFirst v-if="currentItemIndex==0" @goStepPage="nextPage" @goShowPage="showDialogVisible" @goOtherBankPage="otherBankPageName" :fillinMsg="form"></iTransferFirst>
				<iTransferSecond v-if="currentItemIndex==1" @goStepPage="nextPage" :confirmMsg="form"></iTransferSecond>
				<iTransferThird v-if="currentItemIndex==2" @goStepPage="nextPage" :resultMsg="form"></iTransferThird>
			</div>
		<!-- 溫馨提示 -->
		<ynet-warm-tips :items="warmTips"></ynet-warm-tips>
		<!-- 溫馨提示end -->
		</div>
		<!--功能区--end-->

		<!--弹窗1-->
		<el-dialog title="常用收款人" :visible.sync="dialogVisible" size="small">
			<selTransferPayee v-if="dialogVisible" @goShowPage="showDialogVisible" :selTransferPayeeMsg="form"></selTransferPayee>
		</el-dialog>
		<el-dialog title="查询收款行" :visible.sync="otherBankDialogVisible" size="small">
			<selectOtherBankName v-if="otherBankDialogVisible" @goOtherBankPage="otherBankPageName" :selankPageNameMsg="form"></selectOtherBankName>
		</el-dialog>
		<!--弹窗end-->
	</ynet-content>
</template>
<script>

import iTransferFirst from '../transferRemit/components/intelligentTransferFirst'
import iTransferSecond from '../transferRemit/components/intelligentTransferSecond'
import iTransferThird from '../transferRemit/components/intelligentTransferThird'
import selTransferPayee from '../transferRemit/components/selectTransferPayee'
import selectOtherBankName from '../transferRemit/components/selectOtherBankName'
export default {
	name: 'intelligentTransferMain',
	components: {
		iTransferFirst,
		iTransferSecond,
		iTransferThird,
		selTransferPayee,
		selectOtherBankName
	},
	data() {
		return {
			warmTips: [
				'1.本企业创兴银行同名账户之间的转账不受账户单笔限额、日累计限额影响；',
				'2.通过“预约处理”功能可以设置在未来某个日期及时间系统自动转账；',
				'3.本模块仅受理人民币项下业务，如需处理对应外币业务请在国际结算模块中处理，点击此处前往；',
				'4.如果您选择的是行内转账汇款“次日转账”方式，则您的交易将于第2天上午转出；',
				'5.如果您选择的是跨行转账汇款“次日转账”方式，则您提交的交易将于第2个工作日上午转出。'
			],
			stepText: ["填写信息", "确认转账信息", "提交结果"],
			headerInformation: true,
			headerMenu: true,
			currentItemIndex: 0,
			dialogVisible: false,
			otherBankDialogVisible: false,
			form: {}
		}
	},
	methods: {
		nextPage(index, form) {
			let _this = this
			_this.currentItemIndex = Number(index)
			if (form)
				_this.form = form
			_this.$tools.scrollTop()
		},
		showDialogVisible(index, form) {
			let _this = this
			_this.form = form
			if (index == '1') {
				_this.dialogVisible = false
			} else {
				_this.dialogVisible = true
			}

		},
		otherBankPageName(index, form) {
			let _this = this
			_this.form = form
			if (index == '1') {
				_this.otherBankDialogVisible = false
			} else {
				_this.otherBankDialogVisible = true
			}

		}


	}


}

</script>