import { request } from './request'

export default {
    // 通过不同功能模块支持的账户类型对账户列表进行过滤展示
    // Acclist是接口获取的账号列表，param是传入的账户类型比如A001|A003|A016
    // 返回过滤后的账号列表
    Accfilter: function(Acclist, param) {
        var listarry = param.split('|')
        var paramarry = []
            //console.log(listarry)
        for (let j = 0; j < listarry.length; j++) {
            for (let i = 0; i < Acclist.length; i++) {
                if (Acclist[i].accType == listarry[j]) {
                    paramarry.push(Acclist[i])
                }
            }
        }
        return paramarry
    },
    // 查询用户名下所有账号
    // callback（list）中的list为所有的账号列表
    loadAccounts(callback) {
        let _this = this
        let data = {}
            //PBS02001-加载本人卡号列表
        request(_this, "PBS02001.do", data).then(
            data => {
                let { errorMsg, errorCode } = data.header
                if (errorCode !== "0") {
                    _this.$message({
                        message: errorMsg,
                        type: 'error'
                    });
                } else {
                    let list = data.body.accountInfoList
                    callback(list);
                }
            }
        )
    },
    // 查询用户名下特定类型的账号
    // param是传入的账户类型比如A001|A003|A016 
    // callback(list)是调用接口后的回调方法，返回的list为过滤后的账号列表
    loadParticularAccounts(that, param, callback) {
        let _this = this
        let data = {}
            //PBS02001-加载本人卡号列表
        request(that, "PBS02001.do", data).then(
            data => {
                let { errorMsg, errorCode } = data.header
                if (errorCode !== "0") {
                    that.$message({
                        message: errorMsg,
                        type: 'error'
                    });
                } else {
                    let list = _this.Accfilter(data.body.accountInfoList, param)
                    callback(list);
                }
            }
        )
    },
    // 查询余额接口
    // 输入账号accNo和回调方法callback
    // callback(balance) 回调返回【可用】余额balance
    queryBalance: function(that, accNo, callback) {
        // 账户余额查询(PBS02002)
        let data = {
            ACCTNO: accNo,
            CRCYCD: '01',
            CSEXTG: 'x',
            DEBTTP: 'S01',
            TERMCD: '000',
            CLOSTG: 'allType',
            BEGINO: '1',
            RCRDNM: '100',
        }
        request(that, "PBS02002.do", data).then(
            data => {
                let { errorMsg, errorCode } = data.header
                if (errorCode !== "0") {
                    that.$message({
                        message: errorMsg,
                        type: 'error'
                    });
                    callback('');
                } else {
                    //console.log(data);
                    callback(data.body.SUBSACLIST[0].AVAIBL);
                }
            }
        )
    },
}