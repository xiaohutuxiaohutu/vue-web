export default {
    // 各功能模块的数据字典

    // 智能存款 - 存期转换 
    // 入参为数字，返回中文
    // 107-七天
    // 203-三个月
    // 206-六个月
    // 301-一年
    // 302-二年
    // 303-三年
    // 305-五年
    // OTH-其他
    dictTerm: function(value) {
        switch (value) {
            case '107':
                return "七天";
                break;
            case '203':
                return "三个月";
                break;
            case '206':
                return "六个月";
                break;
            case '301':
                return "一年";
                break;
            case '302':
                return "二年";
                break;
            case '303':
                return "三年";
                break;
            case '305':
                return "五年";
                break;
            default:
                return "其他";
                break;
        }
    },

    //--------------------获取利息计算公式中的时间-------------------------------
    //存期时间获取函数
    // 入参存期代码  返回存期天数（数字）
    periodDay: function(data) {
        switch (data) {
            case '107':
                return 7;
            case '203':
                return 90;
            case '206':
                return 180;
            case '301':
                return 360;
            case '302':
                return 720;
            case '303':
                return 1080;
            case '305':
                return 1800;
        }
    },

    // 智能存款 - 转存方式字典
    // 入参为转存代码 返回转存方式中文
    // ["0"] = "到期后不转存"
    // ["1"] = "到期后转存"
    modeTrans: function(data) {
        switch (data) {
            case '0':
                return "到期后不转存";
                break;
            case '1':
                return "到期后转存";
                break;
        }
    },

    // 储蓄定投-定投周期
    RPDSPTrans: function(data) {
        switch (data) {
            case 'D':
                return "天";
            case 'M':
                return "月";
            case 'Q':
                return "季";
            case 'W':
                return "周";
            case 'Y':
                return "年";
        }
    },

    // 我的智能存款-利率查询
    instrtTrans: function(list, type, termCD) {
        let rate
        for (let i = 0; i < list.length; i++) {
            if (list[i].TERMCD == termCD && 　list[i].INRTTP == type) {
                return list[i].INSTRT
            }
        }
    },
    //转存类型
    AUTRTPTrans: function(data) {
        switch (data) {
            case '1':
                return "活期转双整"
            case '2':
                return "活期转通知"
            case '3':
                return "不约定存期"
            default:
                return ''
        }
    },


    certTypeDictList: [
        { "key": "0", "value": "第二代居民身份证" },
        { "key": "1", "value": "第一代居民身份证" },
        { "key": "2", "value": "户口簿" },
        { "key": "3", "value": "中国护照" },
        { "key": "4", "value": "外国护照" },
        { "key": "5", "value": "军人身份证" },
        { "key": "6", "value": "武警身份证" },
        { "key": "7", "value": "港澳居民来往内地通行证" },
        { "key": "9", "value": "台湾居民来往大陆通行证或有效旅行证件" },
        { "key": "10", "value": "临时身份证" },
        { "key": "11", "value": "其他中国公民身份证" },
        { "key": "12", "value": "外国人永久居留证" },
        { "key": "13", "value": "边民出入境通行证" },
        { "key": "14", "value": "执法证" },
        { "key": "15", "value": "工作证" },
        { "key": "16", "value": "其他证件" },
        { "key": "17", "value": "执行公务证" },
        { "key": "X02", "value": "对私其他证件" },
        { "key": "18", "value": "港澳居民身份证" },
        { "key": "19", "value": "台湾居民身份证" },
        { "key": "201", "value": "组织机构代码" },
        { "key": "202", "value": "税务登记证（国税）" },
        { "key": "203", "value": "税务登记证（地税）" },
        { "key": "211", "value": "企业法人营业执照" },
        { "key": "212", "value": "事业单位法人证书" },
        { "key": "213", "value": "社会团体法人登记证书" },
        { "key": "214", "value": "武警部队单位开户核准通知书" },
        { "key": "218", "value": "个体工商户营业执照" },
        { "key": "219", "value": "企业名称预先核准通知书" },
        { "key": "221", "value": "非企业法人营业执照" },
        { "key": "229", "value": "其他证明文件" },
        { "key": "231", "value": "金融许可证" },
        { "key": "232", "value": "商业登记证" },
        { "key": "233", "value": "经营保险业务许可证" },
        { "key": "234", "value": "经营证券业务许可证" },
        { "key": "235", "value": "进出口经营权许可证书" },
        { "key": "236", "value": "外地常设机构驻在地政府主管部门批文号" },
        { "key": "237", "value": "国家主管部门颁外国驻华机构批文" },
        { "key": "238", "value": "国家登记机关颁外资企业驻华代表、办事处登记证" },
        { "key": "239", "value": "经营外汇业务许可证" },
        { "key": "240", "value": "海外客户类证件" },
        { "key": "241", "value": "FCI编码" },
        { "key": "242", "value": "Swift编码" },
        { "key": "243", "value": "券商编码" },
        { "key": "244", "value": "券商内部营业部编码" },
        { "key": "245", "value": "券商通用营业部编码" },
        { "key": "246", "value": "同业机构代码类" },
        { "key": "247", "value": "外商企业投资登记证书" },
        { "key": "248", "value": "基本户开户许可证" },
        { "key": "249", "value": "外汇登记证" },
        { "key": "250", "value": "进出口业务资格证" },
        { "key": "251", "value": "机构信用代码证" },
        { "key": "252", "value": "营业执照（三证合一）" },
        { "key": "253", "value": "公司登记执照/公司注册证书" },
        { "key": "254", "value": "董事在职（或代理）证明" }
    ],
    accTypeList: [
        { "key": "201", "value": "单位活期存款（本币）", "transAble": "Y" },
        { "key": "205", "value": "单位委托存款（本币）", "transAble": "Y" },
        { "key": "541", "value": "贷款项下保证金活期(本币)", "transAble": "N" },
        { "key": "561", "value": "金融机构保证金活期(本币)", "transAble": "N" },
        { "key": "631", "value": "国际结算保证金活期(本币)", "transAble": "N" },
        { "key": "511", "value": "国内信用证保证金活期(本币)", "transAble": "N" },
        { "key": "531", "value": "非融资性保函保证金活期(本币)", "transAble": "N" },
        { "key": "521", "value": "融资性保函保证金活期(本币)", "transAble": "N" },
        { "key": "591", "value": "进口电汇保付加签保证金活期(本币)", "transAble": "N" },
        { "key": "501", "value": "信用证保证金活期(本币)", "transAble": "N" },
        { "key": "611", "value": "提单背书保证金活期(本币)", "transAble": "N" },
        { "key": "551", "value": "承兑汇票保证金活期(本币)", "transAble": "N" },
        { "key": "601", "value": "提货担保保证金活期(本币)", "transAble": "N" },
        { "key": "581", "value": "进口代收保付加签保证金活期(本币)", "transAble": "N" },
        { "key": "571", "value": "其它单位保证金活期(本币)", "transAble": "N" },
        { "key": "206", "value": "对公港币往来帐户", "transAble": "Y" },
        { "key": "202", "value": "单位活期存款（外币）", "transAble": "Y" },
        { "key": "606", "value": "提货担保保证金活期(外币)", "transAble": "N" },
        { "key": "566", "value": "金融机构保证金活期(外币)", "transAble": "N" },
        { "key": "586", "value": "进口代收保付加签保证金活期(外币)", "transAble": "N" },
        { "key": "516", "value": "国内信用证保证金活期(外币)", "transAble": "N" },
        { "key": "546", "value": "贷款项下保证金活期(外币)", "transAble": "N" },
        { "key": "526", "value": "融资性保函保证金活期(外币)", "transAble": "N" },
        { "key": "576", "value": "其它单位保证金活期(外币)", "transAble": "N" },
        { "key": "556", "value": "承兑汇票保证金活期(外币)", "transAble": "N" },
        { "key": "616", "value": "提单背书保证金活期(外币)", "transAble": "N" },
        { "key": "596", "value": "进口电汇保付加签保证金活期(外币)", "transAble": "N" },
        { "key": "621", "value": "国际结算保证金活期(外币)", "transAble": "N" },
        { "key": "626", "value": "资金业务保证金活期(外币)", "transAble": "N" },
        { "key": "536", "value": "非融资性保函保证金活期(外币)", "transAble": "N" },
        { "key": "506", "value": "信用证保证金活期(外币)", "transAble": "N" },
        { "key": "911", "value": "待划转暂记款项（外币）", "transAble": "Y" },
        { "key": "901", "value": "待划转暂记款项（本币）", "transAble": "Y" },
        { "key": "241", "value": "单位七天通知存款-自动转存（本币）", "transAble": "N" },
        { "key": "251", "value": "单位定期存款（本币）", "transAble": "N" },
        { "key": "252", "value": "单位协议存款（本币）", "transAble": "N" },
        { "key": "253", "value": "单位一天通知存款（本币）", "transAble": "N" },
        { "key": "254", "value": "单位七天通知存款（本币）", "transAble": "N" },
        { "key": "258", "value": "单位大额存单", "transAble": "N" },
        { "key": "295", "value": "智能定期-靠档型", "transAble": "N", },
        { "key": "296", "value": "智能定期-组合型", "transAble": "N", },
        { "key": "502", "value": "信用证保证金定期(本币)", "transAble": "N" },
        { "key": "512", "value": "国内信用证保证金定期(本币)", "transAble": "N" },
        { "key": "522", "value": "融资性保函保证金定期(本币)", "transAble": "N" },
        { "key": "532", "value": "非融资性保函保证金定期(本币)", "transAble": "N" },
        { "key": "542", "value": "贷款项下保证金定期(本币)", "transAble": "N" },
        { "key": "552", "value": "承兑汇票保证金定期(本币)", "transAble": "N" },
        { "key": "562", "value": "金融机构保证金定期(本币)", "transAble": "N" },
        { "key": "572", "value": "其它单位保证金定期(本币)", "transAble": "N" },
        { "key": "582", "value": "进口代收保付加签保证金定期(本币)", "transAble": "N" },
        { "key": "592", "value": "进口电汇保付加签保证金定期(本币)", "transAble": "N" },
        { "key": "602", "value": "提货担保保证金定期(本币)", "transAble": "N" },
        { "key": "612", "value": "提单背书保证金定期(本币)", "transAble": "N" },
        { "key": "632", "value": "国际结算保证金定期(本币)", "transAble": "N" },
        { "key": "503", "value": "信用证保证金协议存款(本币)", "transAble": "N" },
        { "key": "513", "value": "国内信用证保证金协议存款(本币)", "transAble": "N" },
        { "key": "523", "value": "融资性保函保证金协议存款(本币)", "transAble": "N" },
        { "key": "533", "value": "非融资性保函保证金协议存款(本币)", "transAble": "N" },
        { "key": "543", "value": "贷款项下保证金协议存款(本币)", "transAble": "N" },
        { "key": "553", "value": "承兑汇票保证金协议存款(本币)", "transAble": "N" },
        { "key": "563", "value": "金融机构保证金协议存款(本币)", "transAble": "N" },
        { "key": "573", "value": "其它单位保证金协议存款(本币)", "transAble": "N" },
        { "key": "583", "value": "进口代收保付加签保证金协议存款(本币)", "transAble": "N" },
        { "key": "593", "value": "进口电汇保付加签保证金协议存款(本币)", "transAble": "N" },
        { "key": "603", "value": "提货担保保证金协议存款(本币)", "transAble": "N" },
        { "key": "613", "value": "提单背书保证金协议存款(本币)", "transAble": "N" },
        { "key": "633", "value": "国际结算保证金协议存款(本币)", "transAble": "N" },
        { "key": "504", "value": "信用证保证金一天通知存款(本币)", "transAble": "N" },
        { "key": "514", "value": "国内信用证保证金一天通知存款(本币)", "transAble": "N" },
        { "key": "524", "value": "融资性保函保证金一天通知存款(本币)", "transAble": "N" },
        { "key": "534", "value": "非融资性保函保证金一天通知存款(本币)", "transAble": "N" },
        { "key": "544", "value": "贷款项下保证金一天通知存款(本币)", "transAble": "N" },
        { "key": "554", "value": "承兑汇票保证金一天通知存款(本币)", "transAble": "N" },
        { "key": "564", "value": "金融机构保证金一天通知存款(本币)", "transAble": "N" },
        { "key": "574", "value": "其它单位保证金一天通知存款(本币)", "transAble": "N" },
        { "key": "584", "value": "进口代收保付加签保证金一天通知存款(本币)", "transAble": "N" },
        { "key": "594", "value": "进口电汇保付加签保证金一天通知存款(本币)", "transAble": "N" },
        { "key": "604", "value": "提货担保保证金一天通知存款(本币)", "transAble": "N" },
        { "key": "614", "value": "提单背书保证金一天通知存款(本币)", "transAble": "N" },
        { "key": "634", "value": "国际结算保证金一天通知存款(本币)", "transAble": "N" },
        { "key": "505", "value": "信用证保证金七天通知存款(本币)", "transAble": "N" },
        { "key": "515", "value": "国内信用证保证金七天通知存款(本币)", "transAble": "N" },
        { "key": "525", "value": "融资性保函保证金七天通知存款(本币)", "transAble": "N" },
        { "key": "535", "value": "非融资性保函保证金七天通知存款(本币)", "transAble": "N" },
        { "key": "545", "value": "贷款项下保证金七天通知存款(本币)", "transAble": "N" },
        { "key": "555", "value": "承兑汇票保证金七天通知存款(本币)", "transAble": "N" },
        { "key": "565", "value": "金融机构保证金七天通知存款(本币)", "transAble": "N" },
        { "key": "575", "value": "其它单位保证金七天通知存款(本币)", "transAble": "N" },
        { "key": "585", "value": "进口代收保付加签保证金七天通知存款(本币)", "transAble": "N" },
        { "key": "595", "value": "进口电汇保付加签保证金七天通知存款(本币)", "transAble": "N" },
        { "key": "605", "value": "提货担保保证金七天通知存款(本币)", "transAble": "N" },
        { "key": "615", "value": "提单背书保证金七天通知存款(本币)", "transAble": "N" },
        { "key": "635", "value": "国际结算保证金七天通知存款(本币)", "transAble": "N" },
        { "key": "250", "value": "单位定期存款（外币）", "transAble": "N" },
        { "key": "256", "value": "单位七天通知存款（外币）", "transAble": "N" },
        { "key": "257", "value": "单位协议存款（外币）", "transAble": "N" },
        { "key": "259", "value": "大额单位外币定期存款", "transAble": "N" },
        { "key": "507", "value": "信用证保证金定期((外币)", "transAble": "N" },
        { "key": "517", "value": "国内信用证保证金定期((外币)", "transAble": "N" },
        { "key": "527", "value": "融资性保函保证金定期((外币)", "transAble": "N" },
        { "key": "537", "value": "非融资性保函保证金定期((外币)", "transAble": "N" },
        { "key": "547", "value": "贷款项下保证金定期((外币)", "transAble": "N" },
        { "key": "557", "value": "承兑汇票保证金定期((外币)", "transAble": "N" },
        { "key": "567", "value": "金融机构保证金定期((外币)", "transAble": "N" },
        { "key": "577", "value": "其它单位保证金定期((外币)", "transAble": "N" },
        { "key": "587", "value": "进口代收保付加签保证金定期((外币)", "transAble": "N" },
        { "key": "597", "value": "进口电汇保付加签保证金定期((外币)", "transAble": "N" },
        { "key": "607", "value": "提货担保保证金定期((外币)", "transAble": "N" },
        { "key": "617", "value": "提单背书保证金定期((外币)", "transAble": "N" },
        { "key": "622", "value": "国际结算保证金定期((外币)", "transAble": "N" },
        { "key": "627", "value": "资金业务保证金定期((外币)", "transAble": "N" },
        { "key": "508", "value": "信用证保证金协议存款((外币)", "transAble": "N" },
        { "key": "518", "value": "国内信用证保证金协议存款((外币)", "transAble": "N" },
        { "key": "528", "value": "融资性保函保证金协议存款((外币)", "transAble": "N" },
        { "key": "538", "value": "非融资性保函保证金协议存款((外币)", "transAble": "N" },
        { "key": "548", "value": "贷款项下保证金协议存款((外币)", "transAble": "N" },
        { "key": "558", "value": "承兑汇票保证金协议存款((外币)", "transAble": "N" },
        { "key": "568", "value": "金融机构保证金协议存款((外币)", "transAble": "N" },
        { "key": "578", "value": "其它单位保证金协议存款((外币)", "transAble": "N" },
        { "key": "588", "value": "进口代收保付加签保证金协议存款((外币)", "transAble": "N" },
        { "key": "598", "value": "进口电汇保付加签保证金协议存款((外币)", "transAble": "N" },
        { "key": "608", "value": "提货担保保证金协议存款((外币)", "transAble": "N" },
        { "key": "618", "value": "提单背书保证金协议存款((外币)", "transAble": "N" },
        { "key": "623", "value": "国际结算保证金协议存款((外币)", "transAble": "N" },
        { "key": "628", "value": "资金业务保证金协议存款((外币)", "transAble": "N" },
        { "key": "510", "value": "信用证保证金七天通知存款((外币)", "transAble": "N" },
        { "key": "520", "value": "国内信用证保证金七天通知存款((外币)", "transAble": "N" },
        { "key": "530", "value": "融资性保函保证金七天通知存款((外币)", "transAble": "N" },
        { "key": "540", "value": "非融资性保函保证金七天通知存款((外币)", "transAble": "N" },
        { "key": "550", "value": "贷款项下保证金七天通知存款((外币)", "transAble": "N" },
        { "key": "560", "value": "承兑汇票保证金七天通知存款((外币)", "transAble": "N" },
        { "key": "570", "value": "金融机构保证金七天通知存款((外币)", "transAble": "N" },
        { "key": "580", "value": "其它单位保证金七天通知存款((外币)", "transAble": "N" },
        { "key": "590", "value": "进口代收保付加签保证金七天通知存款((外币)", "transAble": "N" },
        { "key": "600", "value": "进口电汇保付加签保证金七天通知存款((外币)", "transAble": "N" },
        { "key": "610", "value": "提货担保保证金七天通知存款((外币)", "transAble": "N" },
        { "key": "620", "value": "提单背书保证金七天通知存款((外币)", "transAble": "N" },
        { "key": "625", "value": "国际结算保证金七天通知存款((外币)", "transAble": "N" },
        { "key": "630", "value": "资金业务保证金七天通知存款((外币)", "transAble": "N" },
        { "key": "280", "value": "对公定期主账户（本币）", "transAble": "N" },
        { "key": "490", "value": "承兑保证金主账户（本币）", "transAble": "N" },
        { "key": "552", "value": "承兑汇票保证金定期(本币)", "transAble": "N" },
        { "key": "553", "value": "承兑汇票保证金协议存款(本币)", "transAble": "N" },
        { "key": "554", "value": "承兑汇票保证金一天通知存款(本币)", "transAble": "N" },
        { "key": "555", "value": "承兑汇票保证金七天通知存款(本币)", "transAble": "N" },
        { "key": "241", "value": "单位七天通知存款-自动转存（本币）", "transAble": "N" },
        { "key": "251", "value": "单位定期存款（本币）", "transAble": "N" },
        { "key": "253", "value": "单位一天通知存款（本币）", "transAble": "N" },
        { "key": "254", "value": "单位七天通知存款（本币）", "transAble": "N" }
    ],
    transAbleDict: function(keyVal) {
        for (let item of this.accTypeList) {
            if (item.key == keyVal) {
                return item.transAble
            }
        }
        return ''
    },
    currTypeList: [
        { key: 'CNY', currType: "人民币", bkIdentityType: "A" },
        { key: 'HKD', currType: "港元", bkIdentityType: "U" },
        { key: 'USD', currType: "美元", bkIdentityType: "B" },
        { key: 'EUR', currType: "欧元", bkIdentityType: "C" },
        { key: 'GBP', currType: "英镑", bkIdentityType: "E" },
        { key: 'JPY', currType: "日元", bkIdentityType: "G" },
        { key: 'SGD', currType: "新加坡币", bkIdentityType: "H" },
    ],
    boundTypeList: [
        // { "key": "29", "value": "单位保证金活期" },
        { "key": "552", "value": "承兑汇票保证金定期(本币)" },
        { "key": "553", "value": "承兑汇票保证金协议存款(本币)" },
        { "key": "554", "value": "承兑汇票保证金一天通知存款(本币)" },
        { "key": "555", "value": "承兑汇票保证金七天通知存款(本币)" },
        // { "key": "241", "value": "单位七天通知存款-自动转存（本币）" },
    ],
    canncelTransList: [
        { "key": "CB020108", "value": "CB020119.do" }, //批量转账
        { "key": "CB020102", "value": "CB020119.do" }, //一站式转账
    ],

    canncelTransDict: function(keyVal) {
        for (let item of this.canncelTransList) {
            if (item.key == keyVal) {
                return item.value
            }
        }
        return ''
    },
    boundTypeDict: function(keyVal) {
        for (let item of this.boundTypeList) {
            if (item.key == keyVal) {
                return item.value
            }
        }
        return ''
    },
    funTransTypeDict: function(keyVal) {
        for (let item of this.funTransTypeList) {
            if (item.key == keyVal) {
                return item.value
            }
        }
        return ''
    },
    certTypeDict: function(keyVal) {
        for (let item of this.certTypeDictList) {
            if (item.key == keyVal) {
                return item.value
            }
        }
        return ''
    },
    currTypeDict: function(keyVal) {
        for (let item of this.currTypeList) {
            if (item.key == keyVal) {
                return item.currType
            }
        }
        return ''
    },
    accTypeDict: function(keyVal) {
        for (let item of this.accTypeList) {
            if (item.key == keyVal) {
                return item.value
            }
        }
        return ''
    },


    //基金部分 字典
    //基金风险等级
    funRiskLevelTrans: function(data) {
        switch (data) {
            case '0':
                return "未评估过"
            case '1':
                return "保守型"
            case '2':
                return "谨慎型"
            case '3':
                return "稳健型"
            case '4':
                return "进取型"
            case '5':
                return "激进型"
        }
    },
    fundTypeTrans: function(data) {
        switch (data) {
            case "0":
                return "其他"
            case "1":
                return "股票型"
            case "2":
                return "债券型"
            case "3":
                return "混合型"
            case "4":
                return "货币型"
            case "5":
                return "保本型"
            case "6":
                return "指数型"
            case "7":
                return "QDII型"
            case "8":
                return "商品型"
            case "9":
                return "短期理财"
        }
    },
    currency(data) {
        switch (data) {
            case "0":
                return "人民币"
            case "1":
                return "美元"
        }
    },
    transactionType(data) {
        switch (data) {
            case "0":
                return "结汇"
            case "1":
                return "购汇"
            case "2":
                return "套汇"
        }
    },
    funTransTypeList: [
        { key: 'CB020102', value: '一站式转账', areaType: '' },
        { key: 'CB020108', value: '批量转账', areaType: '' },
        { key: 'CB030301', value: '定期保证金存入', areaType: '' },
        { key: 'CB030302', value: '活期保证金存入', areaType: '' },
        { key: 'CB030102', value: '定期存款存入', areaType: '' },
        { key: 'CB030106', value: '定期存款支取', areaType: '' },
        { key: 'CB030109', value: '定期约转方式更改', areaType: '0' },
        { key: 'CB030201', value: '通知存款存入', areaType: '' },
        { key: 'CB030202', value: '通知存款立即支取', areaType: '' },
        { key: 'CB030203', value: '通知存款取消预约', areaType: '' },
        { key: 'CB030204', value: '通知存款支取预约', areaType: '' },
        { key: 'CB050101', value: '行内汇出汇款', areaType: '' },
        { key: 'CB050102', value: '行外汇出汇款', areaType: '' },
        { key: 'CB040401', value: '资金上划', areaType: '' },
        { key: 'CB040402', value: '资金下拨', areaType: '' },
        { key: 'CB040403', value: '内部调拨', areaType: '' },
        { key: 'CB0402', value: '操作子公司账户转账', areaType: '' },
        { key: 'CB0405', value: '资金归集管理', areaType: '0' },
        // { key: 'CB050201', value: '结汇业务' }, 
        { key: 'CB050202', value: '结购套汇业务', areaType: '' },
        { key: 'CB050301', value: '进口信用证', areaType: '' },
        { key: 'CB050501', value: '出口托收', areaType: '' },
        { key: 'CB050401', value: '保函开立', areaType: '' }
    ],
    resetFields: function(data) {
        for (var name in data) {
            data.name = ''
        }
        return ''
    },
    funTransType: function(keyVal) { //返回交易名称
        for (let item of this.funTransTypeList)
            if (item.key == keyVal) {
                return item.value
            }
    },
    selectAction: function(data) { //查询待授权列表.do
        switch (data) {
            case "CB020102": //一站式转账
                return "CB020103.do"
            case "CB020108": //批量转账
                return "CB020109.do"
            case "CB050401": //保函开立
                return "CB050404.do"
            case "CB050501": //出口托收
                return "CB050504.do"
            case "CB030102": //定期存款存入
                return "CB030111.do"
            case "CB030106": //定期存款支取
                return "CB030111.do"
            case "CB030109": //定期存款约转方式更改
                return "CB030111.do"
            case "CB030201": //通知存款存入
                return "CB030209.do"
            case "CB030202": //通知存款立即支取
                return "CB030209.do"
            case "CB030203": //通知存款取消预约
                return "CB030209.do"
            case "CB030204": //通知存款支取预约
                return "CB030209.do"
            case "CB050301": //进口信用证开立
                return "CB050306.do"
            case "CB030301": //定期保证金存入
                return "CB03030301.do"
            case "CB030302": //活期保证金存入
                return "CB03030301.do"
            case "CB050101": //行内汇出汇款
                return "CB050108.do"
            case "CB050102": //行外汇出汇款
                return "CB050108.do"
            case "CB050202": //结购套
                return "CB050112.do"
            case "CB040401": //资金上划
                return "CB020103.do"
            case "CB040402": //资金下拨
                return "CB020103.do"
            case "CB040403": //内部调拨
                return "CB020103.do"
            case "CB0402": //操作子公司账户转账
                return "CB020103.do"
            case "CB0405": //资金归集
                return "CB040306.do"
        }
    },
    //通知类型
    callType: function(data) {
        switch (data) {
            case '253':
                return "单位一天通知存款"
            case '254':
                return "单位七天通知存款"
            case '241':
                return "单位七天通知存款-自动转存"
            default:
                return ''
        }
    },
    gntTypeTrans: function(data) {
        switch (data) {
            case "01":
                return "投标"
            case "02":
                return "履约"
            case "03":
                return "质量"
            case "04":
                return "预留金(滞留金)"
            case "05":
                return "备付金"
            case "06":
                return "租赁"
            case "07":
                return "即期付款"
            case "08":
                return "延期付款"
            case "09":
                return "诉讼"
            case "10":
                return "融资"
            case "11":
                return "转开"
            case "12":
                return "关税保付"
            case "13":
                return "借款"
            case "14":
                return "其他非融资性保函"
            case "15":
                return "其他融资性保函"
            case "16":
                return "预付款保函"
            case "17":
                return "其他"
        }
    },
    ESTBDTrans: function(data) {
        switch (data) {
            case "0":
                return "电开"
            case "1":
                return "信开"
        }
    },
    CRYTrans: function(data) {
        switch (data) {
            case "CNY":
                return "CNY 人民币"
            case "HKD":
                return "HKD 港元"
            case "USD":
                return "USD 美元"
            case "EUR":
                return "EUR 欧元"
            case "GBP":
                return "GBP 英镑"
            case "JPY":
                return "JPY 日元"
            case "SGD":
                return "SGD 新加坡币"
            default:
                return ''
        }
    },
    gntTemplateTrans: function(data) {
        switch (data) {
            case "0":
                return "银行提供"
            case "1":
                return "申请人提供"
        }
    },
    cashSweepStatusList: [ //集团资金归集状态
        { key: '', value: '' },
        { key: '1', value: '已完成' },
        { key: '2', value: '进行中' },
        { key: '3', value: '已暂停' },
        { key: '4', value: '已删除' },
        { key: '5', value: '等待授权' },
        { key: '6', value: '授权中' },
        { key: '7', value: '授权拒绝' }
    ],
    statusTransList: [
        { key: '', value: '全部' },
        { key: '00', value: '等待授权' },
        { key: '01', value: '授权中' },
        { key: '02', value: '授权拒绝' },
        { key: '03', value: '银行处理中' },
        { key: '04', value: '预约待处理' },
        { key: '05', value: '银行拒绝' },
        { key: '06', value: '银行审核通过' },
        { key: '90', value: '交易成功' },
        { key: '91', value: '交易失败' },
        { key: '92', value: '交易作废' },
        { key: '93', value: '交易过期' },
        { key: '95', value: '交易撤销' },
        { key: '96', value: '交易部分成功' },
        { key: '50', value: '进程处理中' },
        { key: '07', value: '银行处理中' },
        { key: '61', value: '银行授权处理中' },
        { key: '99', value: '未知待处理' },
    ],
    cashSweepStatus: function(keyVal) {
        for (let item of this.cashSweepStatusList)
            if (item.key == keyVal) {
                return item.value
            }
    },
    statusTrans: function(keyVal) {
        for (let item of this.statusTransList)
            if (item.key == keyVal) {
                return item.value
            }
    },
    transTypeOptions: function() { //交易类型列表
        return [{
            bsnCode: 'CB020102',
            bsnName: '一站式转账'
        }, {
            bsnCode: 'CB020108',
            bsnName: '批量转账'
        }, {
            bsnCode: 'CB030301',
            bsnName: '保证金存入'
        }, {
            bsnCode: 'CB030102',
            bsnName: '定期存款'
        }, {
            bsnCode: 'CB030201',
            bsnName: '通知存款'
        }, {
            bsnCode: 'CB050101',
            bsnName: '行内汇出汇款'
        }, {
            bsnCode: 'CB050102',
            bsnName: '行外汇出汇款'
        }, {
            bsnCode: 'CB040401',
            bsnName: '资金上划'
        }, {
            bsnCode: 'CB040402',
            bsnName: '资金下拨'
        }, {
            bsnCode: 'CB040403',
            bsnName: '内部调拨'
        }, {
            bsnCode: 'CB0402',
            bsnName: '操作子公司账户转账'
        }, {
            bsnCode: 'CB050202',
            bsnName: '结购套汇业务'
        }, {
            bsnCode: 'CB050301',
            bsnName: '进口信用证'
        }, {
            bsnCode: 'CB050501',
            bsnName: '出口托收'
        }, {
            bsnCode: 'CB050401',
            bsnName: '保函开立'
        }]
    },
    selectQueryDataildo: function(data) { //查询交易详情.do   传入交易码
        switch (data) {
            case "CB020102": //一站式转账
            case "CB040401": //集团资金上划
            case "CB040402": //集团资金下拨
            case "CB040403": //集团资金内部调拨
            case "CB0402": //操作子公司账户转账
                return "CB020105.do"
                break;
            case "CB020108": //批量转账
                return "CB020110.do"
                break;
            case "CB030201": //通知存款存入
                return "CB030210.do"
                break;
            case "CB030202": //通知存款立即支取
                return "CB030210.do"
                break;
            case "CB030203": //通知存款取消预约
                return "CB030210.do"
                break;
            case "CB030204": //通知存款支取预约
                return "CB030210.do"
                break;
            case "CB030102": //定期存款存入
                return "CB030110.do"
                break;
            case "CB030106": //定期存款支取
                return "CB030110.do"
                break;
            case "CB030109": //定期存款约转方式更改
                return "CB030110.do"
                break;
            case "CB050401": //保函开立
                return "CB050405.do"
                break;
            case "CB050501": //出口托收
                return "CB050505.do"
                break;
            case "CB030302": //活期保证金存入
                return "CB03030302.do"
                break;
            case "CB030301": //定期保证金存入
                return "CB03030302.do"
                break;
            case "CB050301": //进口信用证开立
                return "CB050308.do"
                break;
            case "CB050101": //行内汇出汇款
                return "CB050108.do"
                break;
            case "CB050102": //行外汇出汇款
                return "CB050108.do"
                break;
            case "CB050202": //结购套
                return "CB050112.do"
                break;
            default:
        }
    },
    getAuthdo: function(data) { //根据交易码获取授权.do
        switch (data) {
            case "CB0405": //集团资金归集
                return "CB040307.do"
                break;
            case "CB040401": //集团资金上划
            case "CB040402": //集团资金下拨
            case "CB040403": //集团资金内部调拨
                return "CB040210.do"
                break;
            case "CB020102": //一站式转账
            case "CB0402": //操作子公司账户转账
                return "CB020104.do"
                break;
            case "CB020108": //批量转账
                return "CB020110.do"
                break;
            case "CB030201": //通知存款存入
                return "CB030205.do"
                break;
            case "CB030202": //通知存款立即支取
                return "CB030205.do"
                break;
            case "CB030203": //通知存款取消预约
                return "CB030205.do"
                break;
            case "CB030204": //通知存款支取预约
                return "CB030205.do"
                break;
            case "CB030102": //定期存款存入
                return "CB030103.do"
                break;
            case "CB030106": //定期存款支取
                return "CB030103.do"
                break;
            case "CB030109": //定期存款约转方式更改
                return "CB030103.do"
                break;
            case "CB050401": //保函开立
                return "CB050402.do"
                break;
            case "CB050501": //出口托收
                return "CB050502.do"
                break;
            case "CB030301": //定期保证金存入
                return "CB03030303.do"
                break;
            case "CB030302": //活期保证金存入
                return "CB03030303.do"
                break;
            case "CB050301": //进口信用证开立
                return "CB050303.do"
                break;
            case "CB050101": //行内汇出汇款
                return "CB050109.do"
                break;
            case "CB050102": //行外汇出汇款
                return "CB050109.do"
                break;
            case "CB050202": //结购套
                return "CB050111.do"
                break;
            default:
        }
    },
    getDepTerm: function(data) {
        switch (data) {
            case "3-M":
                return "三个月"
            case "6-M":
                return "半年"
            case "1-Y":
                return "一年"
            case "2-Y":
                return "两年"
            case "3-Y":
                return "三年"
            case "5-Y":
                return "五年"
            default:
                return ''
        }
    },
    remitType: function(data) {
        switch (data) {
            case "0":
                return "行内汇款"
            case "1":
                return "行外汇款"
            default:
                return ''
        }
    },
    acctAuthType: function(data) {
        switch (data) {
            case "0":
                return "查询"
            case "1":
                return "付款"
        }
    },
    currencyType: function(val) {
        switch (val) {
            case "CNY":
                return "￥"
            case "HKD":
                return "HK$"
            case "USD":
                return "$"
            case "EUR":
                return "€"
            case "GBP":
                return "£"
            case "JPY":
                return "J￥"
            case "SGD":
                return "S$"
            default:
                return ''
        }
    },
    accNoAttrType: function(val) {
        switch (val) {
            case "1":
                return "个人储蓄户"
            case "2":
                return "个人结算户"
            case "3":
                return "一般户"
            case "4":
                return "基本户"
            case "5":
                return "临时户"
            case "6":
                return "专用户（核准类）"
            case "7":
                return "验资户"
            case "8":
                return "单位保证金定期"
            case "9":
                return "同业活期存款"
            case "10":
                return "外币往来账户"
            case "14":
                return "个人定期存款户"
            case "15":
                return "单位定期存款户"
            case "16":
                return "委托存款专用户"
            case "17":
                return "同业定期存款户"
            case "18":
                return "应解汇款"
            case "20":
                return "暂记户（不允许现存、不允许现取）"
            case "23":
                return "专用户（备案类）"
            case "24":
                return "暂记户（允许现金交易）"
            case "25":
                return "同业活期保证金户"
            case "26":
                return "同业定期保证金户"
            case "29":
                return "单位保证金活期"
            case "31":
                return "专用户（移植用）"
            case "38":
                return "单位保证金一天通知"
            case "39":
                return "单位保证金七天通知"
            case "40":
                return "单位保证金协议"
            case "41":
                return "社保基金专户"
            case "100":
                return "个人外币账户"
            case "101":
                return "个人外币定期账户"
            case "102":
                return "人民币港澳储蓄账户"
            case "103":
                return "跨境资金池主户（专用户）"
            case "104":
                return "单位外币活期账户"
            default:
                return ''
        }
    },
    accuntQList: [
        { "key": "6016", "value": "定期本息转存贷记本金+利息（系统用）" },
        { "key": "6017", "value": "定期本金转存贷记利息（系统用）" },
        { "key": "7000", "value": "单位汇划手续费收入（转账缴存）" },
        { "key": "7001", "value": "单位汇划手续费收入（转账缴存）" },
        { "key": "7004", "value": "凭证出售工本费收入（转账缴存）" },
        { "key": "7005", "value": "凭证出售工本费收入（转账缴存）" },
        { "key": "7006", "value": "凭证出售工本费收入（现金缴存）" },
        { "key": "7007", "value": "凭证出售工本费收入（现金缴存）" },
        { "key": "7016", "value": "凭证挂失手续费收入（转账缴存）" },
        { "key": "7017", "value": "凭证挂失手续费收入（转账缴存）" },
        { "key": "7018", "value": "凭证挂失手续费收入（现金缴存）" },
        { "key": "7019", "value": "凭证挂失手续费收入（现金缴存）" },
        { "key": "7024", "value": "账户注销费收入（转账缴存）" },
        { "key": "7025", "value": "账户注销费收入（转账缴存）" },
        { "key": "7026", "value": "账户注销费收入（现金缴存）" },
        { "key": "7027", "value": "账户注销费收入（现金缴存）" },
        { "key": "7036", "value": "个人汇划手续费收入（转账缴存）" },
        { "key": "7037", "value": "个人汇划手续费收入（转账缴存）" },
        { "key": "7038", "value": "个人汇划手续费收入（现金缴存）" },
        { "key": "7039", "value": "个人汇划手续费收入（现金缴存）" },
        { "key": "7040", "value": "存款证明手续费收入（转账缴存）" },
        { "key": "7041", "value": "存款证明手续费收入（转账缴存）" },
        { "key": "7042", "value": "存款证明手续费收入（现金缴存）" },
        { "key": "2010", "value": "进/出口单据手续费（转账缴存）" },
        { "key": "2011", "value": "进/出口单据手续费（转账缴存）" },
        { "key": "2012", "value": "进/出口单据手续费（现金缴存）" },
        { "key": "2013", "value": "进/出口单据手续费（现金缴存）" },
        { "key": "2014", "value": "光票手续费（转账缴存）" },
        { "key": "2015", "value": "光票手续费（转账缴存）" },
        { "key": "2016", "value": "光票手续费（现金缴存）" },
        { "key": "2017", "value": "光票手续费（现金缴存）" },
        { "key": "2018", "value": "信用证手续费（转账缴存）" },
        { "key": "2019", "value": "信用证手续费（转账缴存）" },
        { "key": "2020", "value": "信用证手续费（现金缴存）" },
        { "key": "2021", "value": "信用证手续费（现金缴存）" },
        { "key": "4012", "value": "电报费（转账缴存）" },
        { "key": "4013", "value": "电报费（转账缴存）" },
        { "key": "4014", "value": "电报费（现金缴存）" },
        { "key": "4015", "value": "电报费（现金缴存）" },
        { "key": "4016", "value": "快递费（转账缴存）" },
        { "key": "4017", "value": "快递费（转账缴存）" },
        { "key": "4018", "value": "快递费（现金缴存）" },
        { "key": "4019", "value": "快递费（现金缴存）" },
        { "key": "7043", "value": "存款证明手续费收入（现金缴存）" },
        { "key": "7044", "value": "现钞转现汇手续费收入（转账缴存）" },
        { "key": "7045", "value": "现钞转现汇手续费收入（转账缴存）" },
        { "key": "7046", "value": "现钞转现汇手续费收入（现金缴存）" },
        { "key": "7047", "value": "现钞转现汇手续费收入（现金缴存）" },
        { "key": "9936", "value": "其它模块结算_借方(系统用)" },
        { "key": "9937", "value": "其它模块结算_贷方(系统用)" },
        { "key": "9996", "value": "其他模块现金结算_借方(系统用)" },
        { "key": "9997", "value": "其他模块现金结算_借方(系统用)" },
        { "key": "9998", "value": "其它模块结算_贷方(系统用)" },
        { "key": "9999", "value": "其它模块结算_借方(系统用)" },
        { "key": "A100", "value": "汇兑" },
        { "key": "A101", "value": "委托收款划回" },
        { "key": "A200", "value": "汇兑-冲正" },
        { "key": "A201", "value": "委托收款划回" },
        { "key": "C123", "value": "提入借方（支票）" },
        { "key": "C124", "value": "提入借方（支票）" },
        { "key": "CK01", "value": "长款处理-客户账" },
        { "key": "CK03", "value": "长款处理-总账" },
        { "key": "CK04", "value": "长款处理-客户账冲正" },
        { "key": "CK06", "value": "长款处理-总账冲正" },
        { "key": "DK02", "value": "短款处理-现金" },
        { "key": "DK03", "value": "短款处理-总账" },
        { "key": "DK05", "value": "短款处理-现金冲正" },
        { "key": "DK06", "value": "短款处理-总账冲正" },
        { "key": "EA01", "value": "人民币实时贷记往账" },
        { "key": "EA02", "value": "人民币实时贷记来账" },
        { "key": "EA03", "value": "同城外币MT103往账" },
        { "key": "EA04", "value": "同城外币MT103来账" },
        { "key": "EA05", "value": "粤港外币MT103往账" },
        { "key": "EA06", "value": "粤港外币MT103来账" },
        { "key": "EA07", "value": "在线支付往账" },
        { "key": "EA08", "value": "在线支付来账" },
        { "key": "FX26", "value": "冲正-售汇转账支取" },
        { "key": "FX27", "value": "冲正-套汇" },
        { "key": "FX28", "value": "冲正-套汇" },
        { "key": "FX29", "value": "冲正-套汇" },
        { "key": "FX30", "value": "冲正-套汇" },
        { "key": "FX31", "value": "冲正-套汇转账支取" },
        { "key": "4308", "value": "智能存款划转转出" },
        { "key": "4310", "value": "智能存款划转转入" },
        { "key": "5024", "value": "利息转出" },
        { "key": "5026", "value": "利息转入" },
        { "key": "GL01", "value": "收款" },
        { "key": "GL02", "value": "收款-冲正" },
        { "key": "RH04", "value": "大额即时转账电子商业汇票买入来账" },
        { "key": "RH05", "value": "大额即时转账电子商业汇票卖出来账" },
        { "key": "RH06", "value": "大额即时转账债券买入来账" },
        { "key": "RH07", "value": "大额即时转账债券卖出来账" },
        { "key": "GK00", "value": "国库现金存入" },
        { "key": "GK01", "value": "国库现金存入" },
        { "key": "GK03", "value": "国库现金支取" },
        { "key": "GK04", "value": "国库现金支取" },
        { "key": "GK07", "value": "国库行内转账支取" },
        { "key": "GK08", "value": "国库行内转账支取" },
        { "key": "GK10", "value": "国库行内转账存入" },
        { "key": "GK11", "value": "国库行内转账存入" },
        { "key": "4008", "value": "其他支付结算手续费收入（转账缴存）" },
        { "key": "4009", "value": "其他支付结算手续费收入（转账缴存）" },
        { "key": "4010", "value": "其他支付结算手续费收入（现金缴存）" },
        { "key": "4011", "value": "其他支付结算手续费收入（现金缴存）" },
        { "key": "4020", "value": "其他业务手续费收入（转账缴存）" },
        { "key": "4021", "value": "其他业务手续费收入（转账缴存）" },
        { "key": "4022", "value": "其他业务手续费收入（现金缴存）" },
        { "key": "4023", "value": "其他业务手续费收入（现金缴存）" },
        { "key": "4084", "value": "委托贷款手续费收入（转账缴存）" },
        { "key": "4085", "value": "委托贷款手续费收入（转账缴存）" },
        { "key": "4086", "value": "委托贷款手续费收入（现金缴存）" },
        { "key": "4087", "value": "委托贷款手续费收入（现金缴存）" },
        { "key": "4184", "value": "个人网银业务收入（转账缴存）" },
        { "key": "4185", "value": "个人网银业务收入（转账缴存）" },
        { "key": "4186", "value": "个人网银业务收入（现金缴存）" },
        { "key": "4187", "value": "个人网银业务收入（现金缴存）" },
        { "key": "4216", "value": "单位网银业务收入（转账缴存）" },
        { "key": "4217", "value": "单位网银业务收入（转账缴存）" },
        { "key": "4218", "value": "单位网银业务收入（现金缴存）" },
        { "key": "4219", "value": "单位网银业务收入（现金缴存）" },
        { "key": "7002", "value": "单位汇划手续费收入（现金缴存）" },
        { "key": "7003", "value": "单位汇划手续费收入（现金缴存）" },
        { "key": "7008", "value": "承兑出票手续费收入（转账缴存）" },
        { "key": "7009", "value": "承兑出票手续费收入（转账缴存）" },
        { "key": "7010", "value": "承兑出票手续费收入（现金缴存）" },
        { "key": "7011", "value": "承兑出票手续费收入（现金缴存）" },
        { "key": "7012", "value": "保函业务手续费收入（转账缴存）" },
        { "key": "7013", "value": "保函业务手续费收入（转账缴存）" },
        { "key": "7014", "value": "保函业务手续费收入（现金缴存）" },
        { "key": "7015", "value": "保函业务手续费收入（现金缴存）" },
        { "key": "BJ01", "value": "保证金支取" },
        { "key": "BJ02", "value": "保证金支取" },
        { "key": "BJ03", "value": "保证金存入" },
        { "key": "BJ04", "value": "保证金存入" },
        { "key": "4092", "value": "资信证明手续费收入（转账缴存）" },
        { "key": "4093", "value": "资信证明手续费收入（转账缴存）" },
        { "key": "4094", "value": "资信证明手续费收入（现金缴存）" },
        { "key": "4095", "value": "资信证明手续费收入（现金缴存）" },
        { "key": "4096", "value": "银团贷款业务手续费收入（转账缴存）" },
        { "key": "4097", "value": "银团贷款业务手续费收入（转账缴存）" },
        { "key": "4098", "value": "银团贷款业务手续费收入（现金缴存）" },
        { "key": "4099", "value": "银团贷款业务手续费收入（现金缴存）" },
        { "key": "4100", "value": "广州市本级财政国库集中支付业务手续费收入（转账缴存）" },
        { "key": "4101", "value": "广州市本级财政国库集中支付业务手续费收入（转账缴存）" },
        { "key": "4102", "value": "广州市本级财政国库集中支付业务手续费收入（现金缴存）" },
        { "key": "4103", "value": "广州市本级财政国库集中支付业务手续费收入（现金缴存）" },
        { "key": "4104", "value": "贷款承诺费收入（转账缴存）" },
        { "key": "4105", "value": "贷款承诺费收入（转账缴存）" },
        { "key": "4106", "value": "贷款承诺费收入（现金缴存）" },
        { "key": "4107", "value": "贷款承诺费收入（现金缴存）" },
        { "key": "EB05", "value": "实时扣税" },
        { "key": "EB06", "value": "实时扣税冲正" },
        { "key": "EB07", "value": "退税来账入账" },
        { "key": "5012", "value": "行内转账支取次日到账（凭证）" },
        { "key": "5013", "value": "行内转账支取次日到账（凭证）" },
        { "key": "5014", "value": "行内转账存入次日到账（凭证）" },
        { "key": "5015", "value": "行内转账存入次日到账（凭证）" },
        { "key": "5016", "value": "行内转账支取次日到账（非凭证）" },
        { "key": "5017", "value": "行内转账支取次日到账（非凭证）" },
        { "key": "5018", "value": "行内转账存入次日到账（非凭证）" },
        { "key": "5019", "value": "行内转账存入次日到账（非凭证）" },
        { "key": "5020", "value": "行内转账支取次日到账（凭证）" },
        { "key": "5022", "value": "行内转账支取次日到账（非凭证）" },
        { "key": "7050", "value": "凭证出售手续费收入（转账缴存）" },
        { "key": "7051", "value": "凭证出售手续费收入（转账缴存）" },
        { "key": "7052", "value": "凭证出售手续费收入（现金缴存）" },
        { "key": "7053", "value": "凭证出售手续费收入（现金缴存）" },
        { "key": "EA09", "value": "人民币存款往账" },
        { "key": "EA10", "value": "人民币存款来账" },
        { "key": "EA11", "value": "人民币实时贷记往账" },
        { "key": "EA12", "value": "EFT汇兑来账手工入账" },
        { "key": "EA13", "value": "EFT汇兑来账手工入账冲销" },
        { "key": "EA14", "value": "同城外币MT103往账" },
        { "key": "EA15", "value": "粤港外币MT103往账" },
        { "key": "EA16", "value": "在线支付往账" },
        { "key": "EA17", "value": "人民币存款往账" },
        { "key": "EA18", "value": "人民币存款来账" },
        { "key": "EA19", "value": "人民币实时贷记往账-现金" },
        { "key": "EA20", "value": "同城外币MT103往账-现金" },
        { "key": "EA21", "value": "粤港外币MT103往账-现金" },
        { "key": "EA22", "value": "人民币实时贷记往账-现金冲正" },
        { "key": "EA23", "value": "同城外币MT103往账-现金冲正" },
        { "key": "EA24", "value": "粤港外币MT103往账-现金冲正" },
        { "key": "EA25", "value": "在线支付往账-现金" },
        { "key": "EA26", "value": "在线支付往账-现金冲正" },
        { "key": "EB01", "value": "人民币取款往账" },
        { "key": "EB02", "value": "人民币取款来账" },
        { "key": "EB03", "value": "人民币取款往账-冲正" },
        { "key": "EB04", "value": "人民币取款来账-冲正" },
        { "key": "ES01", "value": "批量退回入客户帐" },
        { "key": "FX01", "value": "结汇" },
        { "key": "FX02", "value": "结汇" },
        { "key": "FX03", "value": "结汇" },
        { "key": "FX04", "value": "结汇" },
        { "key": "FX05", "value": "结汇转账支取" },
        { "key": "FX06", "value": "售汇" },
        { "key": "FX07", "value": "售汇" },
        { "key": "FX08", "value": "售汇" },
        { "key": "FX09", "value": "售汇" },
        { "key": "FX10", "value": "售汇转账支取" },
        { "key": "FX11", "value": "套汇" },
        { "key": "FX12", "value": "套汇" },
        { "key": "FX13", "value": "套汇 " },
        { "key": "FX15", "value": "套汇 " },
        { "key": "FX16", "value": "套汇转账支取" },
        { "key": "FY25", "value": "账户结余证明手续费收入（转账缴存）" },
        { "key": "FY26", "value": "账户结余证明手续费收入（转账缴存）" },
        { "key": "FY27", "value": "账户结余证明手续费收入（现金缴存）" },
        { "key": "FY28", "value": "账户结余证明手续费收入（现金缴存）" },
        { "key": "HA01", "value": "二代支付小额汇兑来账手工入账" },
        { "key": "HA03", "value": "跨行汇款来账手工入账" },
        { "key": "I100", "value": "汇兑来账" },
        { "key": "I101", "value": "委托收款划回来账" },
        { "key": "I105", "value": "同业拆借来账" },
        { "key": "I108", "value": "退汇来账" },
        { "key": "I115", "value": "同业拆借来账-冲正" },
        { "key": "IA00", "value": "普通贷记业务-汇兑来账" },
        { "key": "IA01", "value": "普通贷记业务-委托收款划回来账" },
        { "key": "IB00", "value": "贷记退汇来账业务" },
        { "key": "IE50", "value": "定期贷记业务来账" },
        { "key": "IF01", "value": "普通借记回执业务-其他借记业务回执接收" },
        { "key": "IFS7", "value": "实时借记回执业务-通用截留业务回执接收" },
        { "key": "IFSB", "value": "定期借记回执来账" },
        { "key": "IG00", "value": "支票回执业务（票交）来账业务" },
        { "key": "OA00", "value": "普通贷记业务-汇兑往账" },
        { "key": "OA01", "value": "委托收款划回往账" },
        { "key": "OA0C", "value": "普通借记业务-其他借记往账" },
        { "key": "OASI", "value": "实时借记业务-通用截留往账" },
        { "key": "OC00", "value": "定期贷记业务往账" },
        { "key": "OD00", "value": "定期借记业务往账" },
        { "key": "OF01", "value": "普通借记回执业务-其他借记业务回执发送" },
        { "key": "OF05", "value": "普通借记回执业务-支票截留业务回执发送" },
        { "key": "OFSA", "value": "实时借记回执业务-实时借记回执发送" },
        { "key": "OFSB", "value": "定期借记回执业务-定期借记回执发送" },
        { "key": "OG00", "value": "支票影像提入业务" },
        { "key": "RA00", "value": "普通贷记业务-汇兑往账冲正" },
        { "key": "RA01", "value": "委托收款划回往账冲正" },
        { "key": "RA0C", "value": "其他借记业务往账冲正" },
        { "key": "RASI", "value": "实时借记业务-通用截留往账冲正" },
        { "key": "RC00", "value": "定期贷记业务冲正" },
        { "key": "RD00", "value": "定期借记业务-往账冲正业务" },
        { "key": "RF01", "value": "普通借记回执业务-其他借记业务回执冲正" },
        { "key": "FX17", "value": "冲正-结汇" },
        { "key": "FX18", "value": "冲正-结汇" },
        { "key": "FX19", "value": "冲正-结汇" },
        { "key": "FX20", "value": "冲正-结汇" },
        { "key": "FX21", "value": "冲正-结汇转账支取" },
        { "key": "FX22", "value": "冲正-售汇" },
        { "key": "FX23", "value": "冲正-售汇" },
        { "key": "FX24", "value": "冲正-售汇" },
        { "key": "FX25", "value": "冲正-售汇" },
        { "key": "0073", "value": "提出贷方（支票）" },
        { "key": "0074", "value": "提出贷方（支票）－冲正" },
        { "key": "0076", "value": "提出贷方（非支票）" },
        { "key": "0077", "value": "提出贷方（非支票）－冲正" },
        { "key": "0081", "value": "提出贷方被退票入账" },
        { "key": "0082", "value": "提出贷方被退票入账－冲正" },
        { "key": "0085", "value": "提出借方" },
        { "key": "0086", "value": "提出借方－冲正" },
        { "key": "0087", "value": "提出借方(粤港支票)" },
        { "key": "0088", "value": "提出借方收妥入账" },
        { "key": "0089", "value": "提出借方收妥入账－冲正" },
        { "key": "0090", "value": "提出借方(粤港支票)－冲正" },
        { "key": "0091", "value": "提出借方被退票" },
        { "key": "0092", "value": "提出借方被退票－冲正" },
        { "key": "0095", "value": "提入借方退票（提入时）" },
        { "key": "0096", "value": "提入借方退票（提入时）－冲正" },
        { "key": "0097", "value": "提入借方退票（提出时）" },
        { "key": "0098", "value": "提入借方退票（提出时）－冲正" },
        { "key": "0099", "value": "提入贷方" },
        { "key": "0100", "value": "提入贷方－冲正" },
        { "key": "0101", "value": "提入贷方退票（提入时）" },
        { "key": "0102", "value": "提入贷方退票（提入时）－冲正" },
        { "key": "0103", "value": "提入贷方退票（提出时）" },
        { "key": "0104", "value": "提入贷方退票（提出时）－冲正" },
        { "key": "0105", "value": "提入借方（非支票）" },
        { "key": "0106", "value": "提入借方（非支票）－冲正" },
        { "key": "0107", "value": "提出借方被退票（粤港支票）" },
        { "key": "0108", "value": "提出借方被退票（粤港支票）－冲正" },
        { "key": "0115", "value": "同城资金清算（借差）" },
        { "key": "0116", "value": "同城资金清算（借差）－冲正" },
        { "key": "RF05", "value": "普通借记回执业务-支票截留业务回执冲正" },
        { "key": "RFBP", "value": "实时借记业务通用截留业务回执冲正" },
        { "key": "RFSA", "value": "实时借记回执业务-实时借记回执冲正" },
        { "key": "RFSB", "value": "定期借记回执业务-定期借记回执冲正" },
        { "key": "RFSD", "value": "定期借记回执来账冲正" },
        { "key": "RG00", "value": "支票影像提入冲正业务" },
        { "key": "RG02", "value": "支票回执业务（票交）来账冲正" },
        { "key": "RH01", "value": "二代支付小额汇兑来账手工入账冲销" },
        { "key": "RH03", "value": "跨行汇款来账手工入账冲销" },
        { "key": "RI01", "value": "行内资金划转转出" },
        { "key": "RI02", "value": "行内资金划转转出-冲正" },
        { "key": "RI03", "value": "行内资金划转转入" },
        { "key": "RI04", "value": "行内资金划转转入-冲正" },
        { "key": "TZ07", "value": "待划转调账款项调整借记" },
        { "key": "TZ08", "value": "待划转调账款项调整借记-冲正" },
        { "key": "TZ09", "value": "待划转调账款项调整贷记" },
        { "key": "TZ10", "value": "待划转调账款项调整贷记-冲正" },
        { "key": "TZH1", "value": "EOD报错加入" },
        { "key": "TZH2", "value": "EOD报错加入" },
        { "key": "TZH3", "value": "EOD报错加入" },
        { "key": "TZH4", "value": "EOD报错加入" },
        { "key": "WY01", "value": "转出" },
        { "key": "WY02", "value": "转出-冲正" },
        { "key": "WY03", "value": "转入" },
        { "key": "WY04", "value": "转入-冲正" },
        { "key": "XY01", "value": "证转银" },
        { "key": "XY02", "value": "银转证" },
        { "key": "XY03", "value": "证转银-冲正" },
        { "key": "XY04", "value": "银转证-冲正" },
        { "key": "Z001", "value": "中间业务（现金缴存）" },
        { "key": "Z002", "value": "中间业务（现金缴存）冲正" },
        { "key": "Z003", "value": "中间业务转账存入" },
        { "key": "Z004", "value": "中间业务转账存入-冲正" },
        { "key": "Z005", "value": "中间业务转账支取" },
        { "key": "Z006", "value": "中间业务转账支取-冲正" },
        { "key": "Z007", "value": "中间业务（现金支取）" },
        { "key": "Z008", "value": "中间业务（现金支取）冲正" },
        { "key": "ZC05", "value": "询证函手续费收入（转账缴存）-冲正" },
        { "key": "ZC06", "value": "询证函手续费收入（转账缴存）" },
        { "key": "ZC07", "value": "询证函手续费收入（现金缴存）-冲正" },
        { "key": "0117", "value": "同城资金清算（贷差）" },
        { "key": "0118", "value": "同城资金清算（贷差）－冲正" },
        { "key": "1000", "value": "现金存入" },
        { "key": "1001", "value": "现金存入-冲正" },
        { "key": "1003", "value": "现金支取" },
        { "key": "1004", "value": "现金支取-冲正" },
        { "key": "1006", "value": "现金支票支取" },
        { "key": "1007", "value": "现金支票支取-冲正" },
        { "key": "1009", "value": "现金支取非支票-冲正" },
        { "key": "2113", "value": "待处理出纳短款" },
        { "key": "2114", "value": "待处理出纳短款-冲正" },
        { "key": "2119", "value": "待处理出纳长款" },
        { "key": "2120", "value": "待处理出纳长款-冲正" },
        { "key": "2125", "value": "强制扣划转账支取（非支票）" },
        { "key": "2126", "value": "强制扣划转账支取（非支票）-冲正" },
        { "key": "2128", "value": "强制扣划转账存入（非支票）" },
        { "key": "2129", "value": "强制扣划转账存入（非支票）-冲正" },
        { "key": "2131", "value": "其他应收款存入客户账" },
        { "key": "2132", "value": "其他应收款存入－冲正" },
        { "key": "2134", "value": "客户账支取到其他应收款（非支票）" },
        { "key": "2135", "value": "其他应收款支取（非支票）－冲正" },
        { "key": "2137", "value": "其他应收款支取（支票）" },
        { "key": "2138", "value": "其他应收款支取（支票）－冲正" },
        { "key": "2201", "value": "不动户转久悬户" },
        { "key": "2204", "value": "久悬户激活" },
        { "key": "2205", "value": "久悬户转营业外收入" },
        { "key": "2206", "value": "营业外久悬款项转账销户" },
        { "key": "FS01", "value": "非税代收现金存入" },
        { "key": "FS02", "value": "非税代收现金存入-冲正" },
        { "key": "FS03", "value": "转账存入" },
        { "key": "FS04", "value": "转账存入-冲正" },
        { "key": "FS05", "value": "转账支取" },
        { "key": "FS06", "value": "转账支取-冲正" },
        { "key": "4088", "value": "常年财务顾问手续费（转账缴存）" },
        { "key": "4089", "value": "常年财务顾问手续费（转账缴存）-冲正" },
        { "key": "4090", "value": "常年财务顾问费用（现金缴存）" },
        { "key": "4091", "value": "常年财务顾问费用（现金缴存）-冲正" },
        { "key": "4309", "value": "智能存款划转转出-冲正" },
        { "key": "4311", "value": "智能存款划转转入-冲正" },
        { "key": "ZC08", "value": "询证函手续费收入（现金缴存）" },
        { "key": "4304", "value": "行内转账支取(系统用)" },
        { "key": "4305", "value": "行内转账支取（系统用）-冲正" },
        { "key": "4306", "value": "行内转账存入（系统用）" },
        { "key": "4307", "value": "行内转账存入（系统用）-冲正" },
        { "key": "5001", "value": "行内转账支取（凭证）" },
        { "key": "5002", "value": "行内转账支取（凭证）-冲正" },
        { "key": "5004", "value": "行内转账存入（凭证）" },
        { "key": "5005", "value": "行内转账存入（凭证）-冲正" },
        { "key": "5007", "value": "行内转账支取（非凭证）" },
        { "key": "5008", "value": "行内转账支取（非凭证）-冲正" },
        { "key": "5010", "value": "行内转账存入（非凭证）" },
        { "key": "5011", "value": "行内转账存入（非凭证）-冲正" },
        { "key": "6000", "value": "贷方利息资本化（系统结息）" },
        { "key": "6001", "value": "贷方利息调整入账（单户结息）" },
        { "key": "6002", "value": "贷方利息调整入账冲正（单户结息）" },
        { "key": "6007", "value": "贷方利息调整资本化_借记客户冲正" },
        { "key": "6008", "value": "贷方利息调整资本化_贷记客户" },
        { "key": "6009", "value": "贷方利息调整资本化_贷记客户冲正" },
        { "key": "6010", "value": "贷方利息调整资本化_借记客户" },
        { "key": "6011", "value": "利息税" },
        { "key": "6012", "value": "利息税冲正" },
        { "key": "6015", "value": "定期本息转存贷记本金+利息（系统用）" }
    ],

    accuntQListDict: function(keyVal) {
        for (let item of this.accuntQList) {
            if (item.key == keyVal) {
                return item.value
            }
        }
    },
}