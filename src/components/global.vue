<script>
const BUSINESS_TEXT = {
  //注册:温馨提示
  'registerTips' : [
    '1.在线注册网上银行时使用的客户信息、证件类型和证件号码必须与该账号的户名、证件类型和证件号码一致。',
    '2.已经在线注册了网上银行或在柜台开通网上银行的客户无需再次注册，只需要网上银行或移步柜台办理账号追加业务即可。'
  ],
  //定活互转:温馨提示
  'registerCollect1' : [
    '1.预留预留',
    '2.预留预留'
  ],
  //定活互转：
  //注册:步骤
  'registerStep' : [
    '身份信息验证',
    '用户信息设置',
    '注册完成',
  ],
  //注册二类户:步骤
  'registerSecondStep' : [
    '身份信息验证',
    '用户信息设置',
    '身份证信息上传',
    '注册完成',
  ],
  //忘记密码:步骤
  'forgotStep' : [
    '身份验证',
    '账户填写',
    '新密码设置',
    '完成'
  ],
  //忘记密码:温馨提示
  'forgotTips' : [
    '1.如成功找回网上银行登录密码，请在网上银行状态正常的情况下再次登陆。'
  ],
  //安全中心:温馨提示
  'safeCenterTips' : [
    '1.预留温馨提示。',
    '2.预留温馨提示。'
  ],
  //安全中心私密问题:温馨提示
  'privateQuestionTips' : [
    '1.我行已取消私密问题设置，您可使用短信验证码代替私密问题。'
  ],
  //登录密码修改:温馨提示
  'changePwdTips' : [
    '1.密码为6-16位，由数字、字母和特殊字符两种或三种组合。',
    '2.新密码不能与原密码相同。'
  ],
  //交易密码修改:温馨提示
  'changeDealPwdTips' : [
    '1.交易密码为银行账户密码，用于取款、银行账户验证等。',
    '2.交易密码必须为6位纯数字。',
    '3.新密码不能与原密码相同。'
  ],
  //账户转账限额:温馨提示
  'accountLimitationTips' : [
    '1.账户转账限额1。',
    '2.账户转账限额2。',
    '3.账户转账限额3。'
  ],
  //安全认证方式限额:温馨提示
  'safeLimitationTips' : [
    '1.安全认证方式限额1。',
    '2.安全认证方式限额2。',
    '3.安全认证方式限额3。'
  ],
  //安全认证方式限额:温馨提示
  'visaFreeTips' : [
    '1.预留小额免密免签1。',
    '2.预留小额免密免签2。',
    '3.预留小额免密免签3。'
  ],
  //激活卡步骤
  'activeCardStep' : [
    '信息校验',
    '短信验证',
    '人脸识别'
  ],
  //随身WiFi预约服务:温馨提示
  'carryWifiTips' : [
    '1.健康体检服务通过广东创兴银行客服服务热线4008308001人工服务预约。',
    '2.机场/高铁豪车接送，需提前六小时通过我行指定渠道进行预约。',
    '3.境外/随身WiFi，提前五天预约，出国日期和归国日期必须相差两天以上',
    '4.全球失卡保障生效时间：全球失卡保障，自映山红卡开卡次月15日生效。',
    '5.机场/高铁贵宾服务、一对一理财经理、高级别积分礼遇、映山红贵宾/窗口无需预约，出示映山红卡即可享受。',
    '6.卡号定制可通过广东创兴银行各营业网点申请办理。',
    '7.已预约的服务，未在规定时间内取消，无论您是否使用，均会进行权益扣减。',
    '8.映山红卡服务项目内容，服务细则如涉及到变更，均以官网公布所示为主。',
  ],
  'orderTransferTips' : [
    '1.预留orderTransferTips'
  ],
  'orderTransferStep' : [
    '交易录入',
    '交易确认',
    '交易完成'
  ],
  'financeBuyStep' : [
    '交易录入',
    '交易确认',
    '交易完成'
  ],
  'fundBuy': [
    '信息录入',
    '交易确认',
    '交易完成'
  ],
  //转账步骤
  'NormalTransfer' : [
  	'交易录入',
    '交易确认',
    '交易完成'
  ],
  'BacthTransfer' : [
  	'文件录入',
    '交易确认',
    '交易完成'
  ],
  //主动收钱步骤
  'collectMoney' : [
  	'录入',
    '确认',
    '完成'
  ],
  //主动归集步骤
  'collection' : [
  	'录入',
    '确认',
    '完成'
  ],
   //理财赎回步骤
  'MyFinanceBoughtRedeem' : [
  	'交易录入',
    '交易确认',
    '交易结果'
  ],
  //转账温馨提示
  'NormalTransferFirstTips' : [
		'1、5万（不含）以上金额需使用我行u盾操作，未领取u盾的客户请到我行免费领取。',
		'2、普通转出和次日转出具体到账时间是人行和收款行处理时间，具体请咨询收款行。'

  ],
  //主动收钱温馨提示
  'toCollectMoney' : [
		'1、预留预留预留预留预留。',
		'2、预留预留预留预留预留预留。'
  ],
  //自动收钱温馨提示
  'autoCollectMoney' : [
		'1、自动收钱预留预留预留预留。',
		'2、预留预留预留预留预留预留。'
  ],
   //归集签约温馨提示
  'Collection' : [
		'1、预留预留预留预留预留。',
		'2、预留预留预留预留预留预留。'
  ],
  'FundRedeemStep' : [
    '基金赎回',
    '赎回确认',
    '赎回结果'
  ],
  'FundTransformStep' : [
    '基金转换',
    '转换确认',
    '转换结果'
  ],
  'FundBonusStep' : [
    '分红方式选择',
    '分红方式确认',
    '受理结果'
  ],
  'FundInvestmentEditStep': [
    '定投修改',
    '确认修改',
    '修改结果'
  ],
  'FundInvestmentStatusStep' : [
    '修改状态',
    '确认修改',
    '修改完成'
  ],
  // 撤单步骤
  'FundCancelStep' : [
    '撤单确认',
    '撤单结果'
  ],
    //收钱签约
  'CollectMoneySign' : [
  	'录入',
    '确认',
    '结果'
  ],
  //智能存款步骤
  'depositsStep' : [
    '录入',
    '确认',
    '结果'
  ],
  //集团服务-资金上划
  'allocateUp' : [
    '填写资金上划信息',
    '确认资金上划信息',
    '提交结果'
  ],
  //集团服务-资金下拨
  'allocateDown' : [
    '填写资金下拨信息',
    '确认资金下拨信息',
    '提交结果'
  ],
  //集团服务-内部调拨
  'interiorallot' : [
    '填写信息',
    '确认调拨信息',
    '提交结果'
  ],
  //集团服务-子公司名义转账
  'subcorptrans' : [
    '填写信息',
    '确认转账信息',
    '提交结果'
  ],
}

const MENU_URL = {
  'batchTransfer' : [
    {k:'手工录入',v:'/batch_transfer@manual'},
    {k:'文件导入',v:'/batch_transfer'},
    {k:'批量转账查询',v:'/batch_transfer@query'},
  ],
  'myFinance' : [
    {k:'已买理财', v:'/my_finance'},
    {k:'委托查询', v:'/my_finance/entrust/query'},
    {k:'撤单查询', v:'/my_finance/repeal/query'},
    {k:'明细查询', v:'/my_finance/detail/query'},
    {k:'收益查询', v:'/my_finance/profits/query'},
  ],
  'familyFinance' : [
    {k:'购买一家亲理财',v:'/family/finance'},
    {k:'已买一家亲理财',v:'/family/finance@cancleFamilyFinance2'},
    {k:'一家亲理财查询',v:'/family/cancleFamilyFinance@detail'},
    {k:'一家亲理财撤单',v:'/family/cancleFamilyFinance'},
  ],
  'accountManage' : [
    {k:'本行账户添加删除', v:''},
    {k:'他行账户添加删除', v:''},
  ],
  'fundAccountContractManage' : [
    {k:'账户签约管理', v:'/fund/accountContractManage'},
    {k:'TA账户管理', v:'/fund/taAccountContractManage'},
  ],
  'myCollectMoney' : [
    {k:'签约管理', v:'/collectMoney'},
    {k:'主动收钱', v:'/collectMoney@toCollectMoney'},
    {k:'自动收钱', v:'/collectMoney@autoCollectMoney'}
  ],
  'collection' : [
    {k:'签约管理', v:'/collection'},
    {k:'主动归集', v:''},
    {k:'主动归集', v:'/collectionAccordQueryMain'},
    {k:'自动归集', v:'/collectionAutoQueryMain'},
    {k:'他行账户查询', v:'/collectionRestMain'},
    {k:'本行账户授权解除', v:'/collectionRestRelieveMain'}
  ],
  'myFund':[
    {k:'持有基金', v:'/fund/my'},
    {k:'我的定投', v:'/fund/investment'},
    {k:'可撤单基金', v:'/fund/cancelOrder'},
  ]
}

const CONFIG = {
  APP_DOWNLOAD :"https://ebank.ghbank.com.cn/public/huaxingclient/HXBankDownload.html"
}
export default {
  BUSINESS_TEXT,
  MENU_URL,
  CONFIG
}
</script>
