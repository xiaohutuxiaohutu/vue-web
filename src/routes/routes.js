//测试
const templateMain = resolve => require(['@src/views/test/templateMain'], resolve)
const templateMain1 = resolve => require(['@src/views/test/templateMain1'], resolve)
const templateMain2 = resolve => require(['@src/views/test/templateMain2'], resolve)
const templateMain3 = resolve => require(['@src/views/test/templateMain3'], resolve)
const templateMain4 = resolve => require(['@src/views/test/templateMain4'], resolve)
const templateMain5 = resolve => require(['@src/views/test/templateMain5'], resolve)
const step = resolve => require(['@src/views/test/step'], resolve)
    //登陆
const loginMain = resolve => require(['@src/views/login/loginMain'], resolve)
    //国际业务
const importCreditMain = resolve => require(['@src/views/internationalBusiness/importCreditMain'], resolve)
    //const importCreditUpdateMain = resolve => require(['@src/views/internationalBusiness/importCreditUpdateMain'], resolve)
const importCreditQueryMain = resolve => require(['@src/views/internationalBusiness/importCreditQueryMain'], resolve)
const remittanceWithinTheLineMain = resolve => require(['@src/views/international/remit/remittanceWithinTheLine/remittanceWithinTheLineMain'], resolve)
const remittanceManagementMain = resolve => require(['@src/views/internationalBusiness/remittanceManagementMain'], resolve)
const outLineRemittanceMain = resolve => require(['@src/views/internationalBusiness/outLineRemittanceMain'], resolve)
const remittanceQueryMain = resolve => require(['@src/views/internationalBusiness/remittanceQueryMain'], resolve)
const foreignExchangePurchaseMain = resolve => require(['@src/views/internationalBusiness/foreignExchangePurchaseMain'], resolve)
const foreignExchangePurchaseQueryMain = resolve => require(['@src/views/internationalBusiness/foreignExchangePurchaseQueryMain'], resolve)
const letterOfGuaranteeToOpenMain = resolve => require(['@src/views/internationalBusiness/letterOfGuaranteeToOpenMain'], resolve)
const letterOfGuaranteeToOpenQueryMain = resolve => require(['@src/views/internationalBusiness/letterOfGuaranteeToOpenQueryMain'], resolve)
const commonCounterpartyMain = resolve => require(['@src/views/internationalBusiness/commonCounterpartyMain'], resolve)
const exportCollectionMain = resolve => require(['@src/views/internationalBusiness/exportCollectionMain'], resolve)
const exportCollectionQueryMain = resolve => require(['@src/views/internationalBusiness/exportCollectionQueryMain'], resolve)

//我的
const myMain = resolve => require(['@src/views/my/myMain'], resolve)
const menuMap = resolve => require(['@src/views/my/menuMap'], resolve)
const serviceGuide = resolve => require(['@src/views/my/serviceGuide'], resolve)
const managerGuide = resolve => require(['@src/views/my/managerGuide'], resolve)
const operatorGuide = resolve => require(['@src/views/my/operatorGuide'], resolve)
const helpCenter = resolve => require(['@src/views/my/helpCenter'], resolve)

const setShortMenu = resolve => require(['@src/views/my/setShortMenu'], resolve)

//头部菜单
const mapMain = resolve => require(['@src/views/headerNav/mapMain'], resolve)

//投资理财
const termDepositQuery = resolve => require(['@src/views/investment/termdeposit/termDepositQuery'], resolve)
const termDepositIn = resolve => require(['@src/views/investment/termdeposit/termDepositIn'], resolve)
const termWithdrawList = resolve => require(['@src/views/investment/termdeposit/termWithdrawList'], resolve)
const termWithdraw = resolve => require(['@src/views/investment/termdeposit/termWithdraw'], resolve)
const termModeChangeList = resolve => require(['@src/views/investment/termdeposit/termModeChangeList'], resolve)
const termModeChange = resolve => require(['@src/views/investment/termdeposit/termModeChange'], resolve)
const callDepositQuery = resolve => require(['@src/views/investment/calldeposit/callDepositQuery'], resolve)
const callDepositIn = resolve => require(['@src/views/investment/calldeposit/callDepositIn'], resolve)
const callDepositOrderWithdrawMain = resolve => require(['@src/views/investment/calldeposit/callDepositOrderWithdrawMain'], resolve)
const callDepositCancelMain = resolve => require(['@src/views/investment/calldeposit/callDepositCancelMain'], resolve)
const callDepositWithdraw = resolve => require(['@src/views/investment/calldeposit/callDepositWithdraw'], resolve)
const callWithdraw = resolve => require(['@src/views/investment/calldeposit/callWithdraw'], resolve)
const currentcashdeposit = resolve => require(['@src/views/investment/cashdepositmanager/currentcashdeposit'], resolve)
const termcashdeposit = resolve => require(['@src/views/investment/cashdepositmanager/termcashdeposit'], resolve)

//集团服务
const grelationquery = resolve => require(['@src/views/group/gquery/grelationquery'], resolve)
    // const subAuthAcctList = resolve => require(['@src/views/group/gquery/subAuthAcctList'], resolve)
const childcompanyquery = resolve => require(['@src/views/group/gquery/childcompanyquery'], resolve)
const chilcompanydetailquery = resolve => require(['@src/views/group/gquery/chilcompanydetailquery'], resolve)
    //const accGroup = resolve => require(['@src/views/group/gquery/accGroup'], resolve)
const addGroup = resolve => require(['@src/views/group/gquery/addGroup'], resolve)
const alterGroup = resolve => require(['@src/views/group/gquery/alterGroup'], resolve)
const fundup = resolve => require(['@src/views/group/gtranpay/fundup'], resolve)
const funddown = resolve => require(['@src/views/group/gtranpay/funddown'], resolve)
const interiorallot = resolve => require(['@src/views/group/gtranpay/interiorallot'], resolve)
const subcorptrans = resolve => require(['@src/views/group/gtranpay/subcorptrans'], resolve)
const accgroup = resolve => require(['@src/views/group/gtranpay/accgroup'], resolve)

const gantotransMain = resolve => require(['@src/views/group/gautotrans/gantotransMain'], resolve)
    //转账
const intelligentTransferMain = resolve => require(['@src/views/transferPayment/transferRemit/intelligentTransferMain'], resolve)
const batchtrans = resolve => require(['@src/views/transpay/transacc/batchtrans'], resolve)
const file = resolve => require(['@src/views/transpay/transacc/file'], resolve)
const payeemaintain = resolve => require(['@src/views/transpay/transacc/payeemaintain'], resolve)

//账户查询
const balancequeryMain = resolve => require(['@src/views/accmanager/accquery/balancequeryMain'], resolve)
const fixedDeposit = resolve => require(['@src/views/accmanager/accquery/fixedDeposit'], resolve)
const bond = resolve => require(['@src/views/accmanager/accquery/bond'], resolve)
const receipt = resolve => require(['@src/views/accmanager/accquery/receipt'], resolve)
const loanquery = resolve => require(['@src/views/accmanager/accquery/loanquery'], resolve)
const accdetail = resolve => require(['@src/views/accmanager/accquery/accdetail'], resolve)
const accountbankMain = resolve => require(['@src/views/accmanager/acccheck/accountbankMain'], resolve)
const bankSign = resolve => require(['@src/views/accmanager/acccheck/bankSign'], resolve)



//意见反馈
const stmanager = resolve => require(['@src/views/cstservice/customerManage/stmanager/stmanager'], resolve)
    //客户服务
const userInfoMain = resolve => require(['@src/views/cstservice/userInfo/userInfoMain'], resolve) //本人信息维护
const logQuery = resolve => require(['@src/views/cstservice/logQuery/logQuery'], resolve) //日志查询
const serviceQuery = resolve => require(['@src/views/cstservice/serviceQuery/serviceQuery'], resolve) //网银服务费查询
const tranPurpose = resolve => require(['@src/views/cstservice/tranPurpose/tranPurposeMain'], resolve) //转账用途维护
const accountAlias = resolve => require(['@src/views/cstservice/accountAlias/accountAlias'], resolve) //账户别名设置
const bookingAMT = resolve => require(['@src/views/cstservice/bookingAMT/bookingAMT'], resolve) //大金额现金支取预约
const signManage = resolve => require(['@src/views/cstservice/mbilebank/signManage/signManage'], resolve) //签约管理
const mobileBankManage = resolve => require(['@src/views/cstservice/mbilebank/mobileBankManage/mobileBankManage'], resolve) //用户启停
const accMaintain = resolve => require(['@src/views/cstservice/customerManage/accMaintain/accMaintain'], resolve) //账户维护
const authTemplete = resolve => require(['@src/views/cstservice/customerManage/authTemplete/authTempleteMain'], resolve) //审核模板维护
const operMaintain = resolve => require(['@src/views/cstservice/customerManage/operMaintain/operMaintain'], resolve) //操作员维护
const verifyProcessManage = resolve => require(['@src/views/cstservice/customerManage/authTemplete/verifyProcessManage'], resolve) //审核模板管理
const cstInfoMaintain = resolve => require(['@src/views/cstservice/customerManage/cstInfoMaintain/cstInfoMaintain'], resolve) //企业信息维护

//登录昵称修改
const nicknameMain = resolve => require(['@src/views/cstservice/userInfo/nicknameMain'], resolve)
const modifyPwd = resolve => require(['@src/views/cstservice/userInfo/nicknameMain'], resolve)
const forgetPwd = resolve => require(['@src/views/cstservice/userInfo/nicknameMain'], resolve)
    //常用交易对手维护
const beneficiaryMain = resolve => require(['@src/views/internationalBusiness/beneficiaryMain'], resolve)
    // const commonCounterpartyList = resolve => require(['@src/views/internationalBusiness/commonCounterparty/commonCounterpartyMain/commonCounterpartyList'], resolve)
    // const addCommonCounterparty=resolve =>require(['@src/views/internationalBusiness/commonCounterparty/commonCounterpartyMain/addCommonCounterparty'],resolve)
    // const changeCommonCounterparty=resolve =>require(['@src/views/internationalBusiness/commonCounterparty/commonCounterpartyMain/changeCommonCounterparty'],resolve)

//信用证受益人维护
const beneficiaryList = resolve => require(['@src/views/internationalBusiness/beneficiary/beneficiaryMain/beneficiaryList'], resolve)
const addBeneficiary = resolve => require(['@src/views/internationalBusiness/beneficiary/beneficiaryMain/addBeneficiary'], resolve)
const changeBeneficiary = resolve => require(['@src/views/internationalBusiness/beneficiary/beneficiaryMain/changeBeneficiary'], resolve)


//融资业务
const lendingpropositionMain = resolve => require(['@src/views/finance/lendingproposition/lendingpropositionMain'], resolve)
const loanQueryMain = resolve => require(['@src/views/finance/loanquery/loanQueryMain'], resolve)
const historyRepayQueryMain = resolve => require(['@src/views/finance/historyRepayQuery/historyRepayQueryMain'], resolve)
const residualRequeryMain = resolve => require(['@src/views/finance/residualRequery/residualRequeryMain'], resolve)
const overdueMain = resolve => require(['@src/views/finance/overdue/overdueMain'], resolve)

//交易管理 
const examine = resolve => require(['@src/views/transdeal/examine/examine'], resolve)
const maintence = resolve => require(['@src/views/transdeal/maintence/maintence'], resolve)
const query = resolve => require(['@src/views/transdeal/query/query'], resolve)

let routes = [
    { path: '/test/templateMain', component: templateMain, name: 'templateMain' },
    { path: '/test/templateMain1', component: templateMain1, name: 'templateMain1' },
    { path: '/test/templateMain2', component: templateMain2, name: 'templateMain2' },
    { path: '/test/templateMain3', component: templateMain3, name: 'templateMain3' },
    { path: '/test/templateMain4', component: templateMain4, name: 'templateMain4' },
    { path: '/test/templateMain5', component: templateMain5, name: 'templateMain5' },
    { path: '/test/step', component: step, name: 'step' },
    //登陆
    { path: '/login/loginMain', component: loginMain, name: 'loginMain' },
    //国际业务
    { path: '/internationalBusiness/importCreditMain', component: importCreditMain, name: 'importCreditMain' },
    // { path: '/internationalBusiness/importCreditUpdateMain', component: importCreditUpdateMain, name: 'importCreditUpdateMain' },
    { path: '/internationalBusiness/importCreditQuery', component: importCreditQueryMain, name: 'importCreditQueryMain' },
    // { path: '/remittanceWithinTheLine/remittanceWithinTheLineMain', component: remittanceWithinTheLineMain, name: 'remittanceWithinTheLineMain' },
    // { path: '/remittanceQuery/remittanceQueryMain', component: remittanceQueryMain, name: 'remittanceQueryMain' },
    { path: '/internationalBusiness/remittanceManagementMain', component: remittanceManagementMain, name: 'remittanceManagementMain' },
    { path: '/internationalBusiness/outLineRemittance', component: outLineRemittanceMain, name: 'outLineRemittanceMain' },
    { path: '/internationalBusiness/remittanceQuery', component: remittanceQueryMain, name: 'remittanceQueryMain' },
    { path: '/internationalBusiness/foreignExchangePurchaseMain', component: foreignExchangePurchaseMain, name: 'foreignExchangePurchaseMain' },
    { path: '/internationalBusiness/foreignExchangePurchaseQuery', component: foreignExchangePurchaseQueryMain, name: 'foreignExchangePurchaseQueryMain' },
    { path: '/internationalBusiness/letterOfGuaranteeToOpenMain', component: letterOfGuaranteeToOpenMain, name: 'letterOfGuaranteeToOpenMain' },
    { path: '/internationalBusiness/letterOfGuaranteeToOpenQuery', component: letterOfGuaranteeToOpenQueryMain, name: 'letterOfGuaranteeToOpenQueryMain' },
    { path: '/internationalBusiness/exportCollectionMain', component: exportCollectionMain, name: 'exportCollectionMain' },
    { path: '/internationalBusiness/exportCollectionQuery', component: exportCollectionQueryMain, name: 'exportCollectionQueryMain' },
    { path: '/internationalBusiness/commonCounterpartyMain', component: commonCounterpartyMain, name: 'commonCounterpartyMain' },

    //我的
    { path: '/my/myMain', component: myMain, name: 'myMain' },
    { path: '/menuMap', component: menuMap, name: 'menuMap' },
    { path: '/serviceGuide', component: serviceGuide, name: 'serviceGuide' },
    { path: '/managerGuide', component: managerGuide, name: 'managerGuide' },
    { path: '/operatorGuide', component: operatorGuide, name: 'operatorGuide' },
    { path: '/helpCenter', component: helpCenter, name: 'helpCenter' },
    
    { path: '/setShortMenu', component: setShortMenu, name: 'setShortMenu' },
    //头部菜单
    { path: '/headerNav/mapMain', component: mapMain, name: 'mapMain' },
    //投资理财
    { path: '/investment/termdeposit/termDepositQuery', component: termDepositQuery, name: 'termDepositQuery' },
    { path: '/investment/termdeposit/termDepositIn', component: termDepositIn, name: 'termDepositIn' },
    { path: '/investment/termdeposit/termWithdrawList', component: termWithdrawList, name: 'termWithdrawList' },
    { path: '/investment/termdeposit/termWithdrawList@termWithdraw', component: termWithdraw, name: 'termWithdraw' },
    { path: '/investment/termdeposit/termModeChangeList', component: termModeChangeList, name: 'termModeChangeList' },
    { path: '/investment/termdeposit/termModeChangeList@termModeChange', component: termModeChange, name: 'termModeChange' },
    { path: '/investment/calldeposit/callDepositQuery', component: callDepositQuery, name: 'callDepositQuery' },
    { path: '/investment/calldeposit/callDepositIn', component: callDepositIn, name: 'callDepositIn' },
    { path: '/investment/calldeposit/callDepositOrderWithdrawMain', component: callDepositOrderWithdrawMain, name: 'callDepositOrderWithdrawMain' },
    { path: '/investment/calldeposit/callDepositOrderWithdrawMain@callDepositCancelMain', component: callDepositCancelMain, name: 'callDepositCancelMain' },
    { path: '/investment/calldeposit/callDepositWithdraw', component: callDepositWithdraw, name: 'callDepositWithdraw' },
    { path: '/investment/calldeposit/callDepositWithdraw@callWithdraw', component: callWithdraw, name: 'callWithdraw' },
    { path: '/investment/cashdepositmanager/currentcashdeposit', component: currentcashdeposit, name: 'currentcashdeposit' },
    { path: '/investment/cashdepositmanager/termcashdeposit', component: termcashdeposit, name: 'termcashdeposit' },
    //集团服务
    { path: '/group/gquery/grelationquery', component: grelationquery, name: 'grelationquery' },
    { path: '/group/gquery/childcompanyquery', component: childcompanyquery, name: 'childcompanyquery' },
    { path: '/group/gquery/chilcompanydetailquery', component: chilcompanydetailquery, name: 'chilcompanydetailquery' },
    { path: '/group/gtranpay/fundup', component: fundup, name: 'fundup' },
    { path: '/group/gtranpay/funddown', component: funddown, name: 'funddown' },
    { path: '/group/gtranpay/interiorallot', component: interiorallot, name: 'interiorallot' },
    { path: '/group/gtranpay/subcorptrans', component: subcorptrans, name: 'subcorptrans' },
    { path: '/group/gtranpay/accgroup', component: accgroup, name: 'accgroup' },
    { path: '/group/gautotrans/gantotransMain', component: gantotransMain, name: 'gantotransMain' },

    //转账汇款
    { path: '/transferPayment/transferRemit/intelligentTransferMain', component: intelligentTransferMain, name: 'intelligentTransferMain' },
    { path: '/transpay/transacc/batchtrans', component: batchtrans, name: 'batchtrans' },
    { path: '/transpay/transacc/file', component: file, name: 'file' },
    { path: '/transpay/transacc/payeemaintain', component: payeemaintain, name: 'payeemaintain' },
    //账户查询
    { path: '/accmanager/accquery/balancequeryMain', component: balancequeryMain, name: 'balancequeryMain' },
    { path: '/accmanager/accquery/fixed', component: fixedDeposit, name: 'fixedDeposit' },
    { path: '/accmanager/accquery/bond', component: bond, name: 'bond' },
    { path: '/accmanager/accquery/receipt', component: receipt, name: 'receipt' },
    { path: '/accmanager/accquery/loanquery', component: loanquery, name: 'loanquery' },
    { path: '/accmanager/accquery/accdetail', component: accdetail, name: 'accdetail' },
    { path: '/accmanager/acccheck/accountbankMain', component: accountbankMain, name: 'accountbankMain' },
    { path: '/accmanager/acccheck/bankSign', component: bankSign, name: 'bankSign' },



    //客户服务
    { path: '/cstservice/customerManage/stmanager', component: stmanager, name: 'stmanager' }, //意见反馈
    { path: '/cstservice/userInfo/userInfoMain', component: userInfoMain, name: 'userInfoMain' },
    { path: '/cstservice/logQuery/logQuery', component: logQuery, name: 'logQuery' },
    { path: '/cstservice/serviceQuery/serviceQuery', component: serviceQuery, name: 'serviceQuery' },
    { path: '/cstservice/tranPurpose/tranPurposeMain', component: tranPurpose, name: 'tranPurpose' },
    { path: '/cstservice/accountAlias/accountAlias', component: accountAlias, name: 'accountAlias' },
    { path: '/cstservice/bookingAMT/bookingAMT', component: bookingAMT, name: 'bookingAMT' },
    { path: '/cstservice/mbilebank/signManage', component: signManage, name: 'signManage' }, //签约管理
    { path: '/cstservice/mbilebank/mobileBankManage', component: mobileBankManage, name: 'mobileBankManage' }, //用户启停
    { path: '/cstservice/customerManage/accMaintain', component: accMaintain, name: 'accMaintain' }, //账户维护
    { path: '/cstservice/customerManage/authTemplete/authTempleteMain', component: authTemplete, name: 'authTemplete' }, //审批模板维护
    { path: '/cstservice/customerManage/operMaintain/operMaintain', component: operMaintain, name: 'operMaintain' }, //操作员维护
    { path: '/cstservice/customerManage/authTemplete/verifyProcessManage', component: verifyProcessManage, name: 'verifyProcessManage' }, //审批模板管理
    { path: '/cstservice/customerManage/cstInfoMaintain/cstInfoMaintain', component: cstInfoMaintain, name: 'cstInfoMaintain' }, //企业信息维护


    //登录昵称修改
    { path: '/cstservice/userInfo/nicknameMain', component: nicknameMain, name: 'nicknameMain' },
    { path: '/modifyPwd', component: modifyPwd, name: 'modifyPwd' },
    { path: '/forgetPwd', component: forgetPwd, name: 'forgetPwd' },
    //常用交易对手维护


    //信用证受益人维护
    { path: '/internationalBusiness/beneficiaryMain', component: beneficiaryMain, name: 'beneficiaryMain' },
    { path: '/beneficiary/addBeneficiary', component: addBeneficiary, name: 'addBeneficiary' },
    { path: '/beneficiary/changeBeneficiary', component: changeBeneficiary, name: 'changeBeneficiary' },

    //融资业务
    { path: '/finance/lendingproposition/lendingpropositionMain', component: lendingpropositionMain, name: 'lendingpropositionMain' },
    { path: '/finance/loanquery/loanQueryMain', component: loanQueryMain, name: 'loanQueryMain' },
    { path: '/finance/historyRepayQuery/historyRepayQueryMain', component: historyRepayQueryMain, name: 'historyRepayQueryMain' },
    { path: '/finance/residualRequery/residualRequeryMain', component: residualRequeryMain, name: 'residualRequeryMain' },
    { path: '/finance/overdue/overdueMain', component: overdueMain, name: 'overdueMain' },

    //交易管理
    { path: '/transdeal/examine/examineMain', component: examine, name: 'examine' },
    { path: '/transdeal/maintence/maintenceMain', component: maintence, name: 'maintence' },
    { path: '/transdeal/query/queryMain', component: query, name: 'query' },


];

export default routes;