/*
方法名：getExplorerType
功能：获取浏览器类型类型
输入：	没有
输出：	1：IE浏览器32位
		3：IE浏览器64位
		2：其他浏览器

方法名：init
功能：初始化UKEY环境
输入：	没有
输出：	"success"：一切正常
		异常："errorFTCtrl"：没有安装华兴U盾驱动程序
		异常："errorCryptoAgent"：没有安装正确签名工具包
		
方法名：getUkeyNum
功能：获取当前Ukey数量
执行条件：需要先执行init
输入：	没有
输出：	tokenCount：0-10

方法名：getDN
功能：获取当前UkeyDN
执行条件：需要先执行init，getUkeyNum，且Ukey数量为1
输入：	没有
输出：	DN

方法名：getSN
功能：获取当前UkeySN
执行条件：需要先执行init，getUkeyNum，且Ukey数量为1
输入：	没有
输出：	SN

方法名：getCN
功能：获取当前UkeyCN
执行条件：需要先执行init，getUkeyNum，且Ukey数量为1
输入：	没有
输出：	CN

方法名：getStartDate
功能：获取当前证书的开始日期
执行条件：需要先执行init，getUkeyNum，且Ukey数量为1
输入：	没有
输出：	startDate

方法名：getEndDate
功能：获取当前证书的结束日期
执行条件：需要先执行init，getUkeyNum，且Ukey数量为1
输入：	没有
输出：	endDate

方法名：signJSON
功能：证书签名（不带原文）
执行条件：需要先执行init，getUkeyNum，且Ukey数量为1
输入：	obj：JSON对象，模板详见方法
		type: 1:带TradeType，Timestamp  2：不带TradeType，Timestamp
输出：	signature
		异常："errorSign"：签名过程中抛异常
		异常："errorSignType"：签名类型没有指定1或者2

方法名：signXML
功能：证书签名（不带原文）
执行条件：需要先执行init，getUkeyNum，且Ukey数量为1
输入：	SourceData：XML报文，模板详见方法
输出：	signature
		异常："errorSign"：签名过程中抛异常

方法名：getLastErrorDesc
功能：获取最后一次抛异常信息
执行条件：CryptoAgent工具包下的方法抛异常以后
输入：	没有
输出：	lastErrorDesc
*/


//调用FTCtrl工具包下的方法，如果没有安装华兴U盾驱动程序，方法不会抛异常，一般返回undefined或者空值，
var FTCtrl;
//调用CryptoAgent工具包下的方法，如果签名工具包，将会抛异常
var CryptoAgent;
//证书CN值
var CN;
//最后一次抛异常信息
var lastErrorDesc;

var GHBUkeyCommon = {};

export default {
    init: function() {
        var FTCtrlStr = "";
        var CryptoAgentStr = "";
        if (document.getElementById("FTCtrl")) {
            //控件加载了就不需要再加载了
        } else {
            var explorerType = GHBUkeyCommon.getExplorerType();
            //console.log("explorerType"+explorerType)
            if (explorerType == 1) { //win32
                FTCtrlStr = '<OBJECT classid="clsid:CE662365-36F7-403F-AE73-838E40019F4A" id="FTCtrl" VIEWASTEXT style="height: 0px; width: 0px"></OBJECT>';
                CryptoAgentStr = '<OBJECT id="CryptoAgent" classid="clsid:D0F27162-EED5-4E82-B731-CB42985E1638" codeBase="../resource/download/CryptoKit.ghbank.x86.cab#version=3,3,0,3" style="height: 0px; width: 0px"></OBJECT>';
            } else if (explorerType == 2) { //win64
                FTCtrlStr = '<OBJECT classid="clsid:CE662365-36F7-403F-AE73-838E40019F4A" id="FTCtrl" VIEWASTEXT  style="height: 0px; width: 0px"></OBJECT>';
                CryptoAgentStr = '<OBJECT id="CryptoAgent" classid="clsid:A0213349-4C7F-4467-9877-14BA68C53C9B" codeBase="../resource/download/CryptoKit.ghbank.x64.cab#version=3,3,0,3" style="height: 0px; width: 0px"></OBJECT>';
            } else if (explorerType == 3) { //mac

            } else if (explorerType == 4) { //edge

            } else {
                FTCtrlStr = '<embed id="FTCtrl" type="application/npGHBank"  style="height: 0px; width: 0px">';
                CryptoAgentStr = '<embed id="CryptoAgent"  type="application/npCryptoKit.ghbank.x86"  style="height: 0px; width: 0px">';
            }
            var html = FTCtrlStr + CryptoAgentStr;
            var div = document.createElement('div');
            div.innerHTML = html;
            document.body.appendChild(div);
        }
        FTCtrl = document.getElementById("FTCtrl");
        //console.log(FTCtrl)
        CryptoAgent = document.getElementById('CryptoAgent');

        /*
        CheckUsbkeySoft方法功能：检查USB Key软件完整性
        返回值:IE为0，非IE为-1，其他值或者undefined为错误	
        */
        var ret = FTCtrl.CheckUsbkeySoft;
        if (ret != 0 && ret != -1) {
            return "errorFTCtrl";
        }
        try {
            var test = CryptoAgent.GetLastErrorDesc();
        } catch (e) {
            return "errorCryptoAgent";
        }
        return "success";
    },
    getUkeyNum: function() {
        /*
        ListUsbkeyNumber方法功能：返回所有已经插入电脑的USB Key的个数
        返回结果:0-10：表示已经连接到电脑的USB Key数量
        */
        var tokenCount = FTCtrl.ListUsbkeyNumber;
        if (tokenCount == 1) {
            /*
            GetAllCertCn方法功能：获取所有UKEY的CN值
            */
            CN = FTCtrl.GetAllCertCn;
            //var SN = FTCtrl.GetUsbkeySN;
        }
        return tokenCount;
    },
    signJSON: function(obj, type) {
        return GHBUkeyCommon.signJSON(obj, type)
    },
    getLastErrorDesc: function() {
        return GHBUkeyCommon.getLastErrorDesc()
    },
    getDN: function() {
        return GHBUkeyCommon.getDN()
    }
}

GHBUkeyCommon.getExplorerType = function() {
    //苹果浏览器
    if (-1 != navigator.userAgent.indexOf("Mac", 0)) {
        return 3; //mac
    }
    if (navigator.appVersion.indexOf("Edge") >= 0) {
        return 4; //edge
    }
    if (navigator.appName.indexOf("Internet") >= 0 || navigator.appVersion.indexOf("Trident") >= 0) {
        if (window.navigator.cpuClass == "x86") {
            //IE32位
            return 1; //win32
        } else {
            //IE64位
            return 2; //win64
        }
    } else {
        //其他
        return 99;
    }
};

GHBUkeyCommon.init = function() {
    var FTCtrlStr = "";
    var CryptoAgentStr = "";
    if (document.getElementById("FTCtrl")) {
        //控件加载了就不需要再加载了
    } else {
        var explorerType = GHBUkeyCommon.getExplorerType();
        if (explorerType == 1) { //win32
            FTCtrlStr = '<OBJECT classid="clsid:CE662365-36F7-403F-AE73-838E40019F4A" id="FTCtrl" VIEWASTEXT style="height: 0px; width: 0px"></OBJECT>';
            CryptoAgentStr = '<OBJECT id="CryptoAgent" classid="clsid:D0F27162-EED5-4E82-B731-CB42985E1638" codeBase="../resource/download/CryptoKit.ghbank.x86.cab#version=3,3,0,3" style="height: 0px; width: 0px"></OBJECT>';
        } else if (explorerType == 2) { //win64
            FTCtrlStr = '<OBJECT classid="clsid:CE662365-36F7-403F-AE73-838E40019F4A" id="FTCtrl" VIEWASTEXT  style="height: 0px; width: 0px"></OBJECT>';
            CryptoAgentStr = '<OBJECT id="CryptoAgent" classid="clsid:A0213349-4C7F-4467-9877-14BA68C53C9B" codeBase="../resource/download/CryptoKit.ghbank.x64.cab#version=3,3,0,3" style="height: 0px; width: 0px"></OBJECT>';
        } else if (explorerType == 3) { //mac

        } else if (explorerType == 4) { //edge

        } else {
            FTCtrlStr = '<embed id="FTCtrl" type="application/npGHBank"  style="height: 0px; width: 0px">';
            CryptoAgentStr = '<embed id="CryptoAgent"  type="application/npCryptoKit.ghbank.x86"  style="height: 0px; width: 0px">';
        }
        var html = FTCtrlStr + CryptoAgentStr;
        var div = document.createElement('div');
        div.innerHTML = html;
        document.body.appendChild(div);
    }

    FTCtrl = document.getElementById("FTCtrl");
    CryptoAgent = document.getElementById('CryptoAgent');

    /*
    CheckUsbkeySoft方法功能：检查USB Key软件完整性
    返回值:IE为0，非IE为-1，其他值或者undefined为错误	
    */
    var ret = FTCtrl.CheckUsbkeySoft;
    if (ret != 0 && ret != -1) {
        return "errorFTCtrl";
    }

    /*
    GetLastErrorDesc方法功能：获取最后一次错误信息
    */
    try {
        var test = CryptoAgent.GetLastErrorDesc();
    } catch (e) {
        return "errorCryptoAgent";
    }
    return "success";
};

GHBUkeyCommon.getWarning = function(str) {
    if (str == "errorFTCtrl") {
        return "检测到未安装U盾控件，请安装U盾控件并刷新浏览器";
    } else if (str == "errorCryptoAgent") {
        return "检测到未安装签名工具包，请安装签名工具包并刷新浏览器";
    } else {
        return "";
    }
};

GHBUkeyCommon.getCryptoAgentUrl = function() {
    var explorerType = GHBUkeyCommon.getExplorerType();
    if (explorerType == 1) {
        return "./app/resource/download/CryptoKit.ghbank.x86.exe";
    } else if (explorerType == 3) {
        return "./app/resource/download/CryptoKit.ghbank.x64.exe";
    } else {
        return "./app/resource/download/npCryptoKit.ghbank.x86.exe";
    }
};

GHBUkeyCommon.getLink = function(str) {
    var link = "";
    if (str == "errorFTCtrl") {
        link += '请下载U盾控件并刷新浏览器：';
        link += '&emsp;<u class="font_blue"><a class="font_blue" href="./app/resource/download/HX2000AutoPro.exe">1.5代U盾下载</a></u>';
        link += '&emsp;<u class="font_blue"><a class="font_blue" href="./app/resource/download/HX3000AutoPro.exe">2代U盾下载</a></u>';
        link += '</br>';
    }
    link += '请下载签名工具包并刷新浏览器：';
    link += '&emsp;<u class="font_blue"><a class="font_blue" href="' + GHBUkeyCommon.getCryptoAgentUrl() + '">签名工具包下载</a></u>';
    return link;
};



GHBUkeyCommon.getUkeyNum = function() {
    /*
    ListUsbkeyNumber方法功能：返回所有已经插入电脑的USB Key的个数
    返回结果:0-10：表示已经连接到电脑的USB Key数量
    */
    var tokenCount = FTCtrl.ListUsbkeyNumber;
    if (tokenCount == 1) {
        /*
        GetAllCertCn方法功能：获取所有UKEY的CN值
        */
        CN = FTCtrl.GetAllCertCn;
        //var SN = FTCtrl.GetUsbkeySN;
    }
    return tokenCount;
};

GHBUkeyCommon.getDN = function() {
    var DN = FTCtrl.GetCertDN(CN);
    return DN;
};

GHBUkeyCommon.getSN = function() {
    return CN;
};

GHBUkeyCommon.getCN = function() {
    return CN;
};

GHBUkeyCommon.getStartDate = function() {
    var startDate = FTCtrl.GetCertStarteTime(CN);
    return startDate;
};

GHBUkeyCommon.getEndDate = function() {
    var endDate = FTCtrl.GetCertEndTime(CN);
    return endDate;
};

/*
传入参数SourceData例子(XML)

<?xml version="1.0" encoding="utf-8"?>
<SignData>
	<TradeType>RYURUYTUIT</TradeType>
	<Timestamp>1464320097640</Timestamp>
	<Fields>
		<PayerAcNo>6231139901000012235</PayerAcNo>
		<PayerAcName>小华04</PayerAcName>
		<PayeeAcName name="收款人：">小华</PayeeAcName>
		<PayeeAcNo name="收款账号：">6231138801000000829</PayeeAcNo>
	</Fields>
</SignData>
*/
GHBUkeyCommon.signXML = function(SourceData) {
    try {
        //selectedSignStyle为0：不带原文，为1：带原文
        var selectedSignStyle = 1;
        var signature = "";
        var filter = "83080";
        var certificateContent = CryptoAgent.SelectSignCertificate(filter);
        var subjectDN = CryptoAgent.GetCertificateSubjectDN(certificateContent);

        var ukeyType = subjectDN.substring(subjectDN.indexOf(filter) + filter.length, subjectDN.indexOf(filter) + filter.length + 1);

        if (ukeyType == "1" || ukeyType == "2") {
            if (selectedSignStyle === 0) {
                //不带原文签名：定长
                signature = CryptoAgent.SignMessageDetach(SourceData, "SHA-256");
            } else {
                //带原文签名
                signature = CryptoAgent.SignMessage(SourceData, "SHA-256");
            }
        } else {
            if (selectedSignStyle === 0) {
                //不带原文签名：定长
                signature = CryptoAgent.SignMessageDetach(SourceData, "SHA-1");
            } else {
                //带原文签名
                signature = CryptoAgent.SignMessage(SourceData, "SHA-1");
            }
        }

        //console.log(signature);
        return signature;

    } catch (e) {
        //console.log(e);
        var errorCode = CryptoAgent.GetLastErrorDesc();
        //console.log(errorCode);
        if (errorCode.toString().indexOf('0x00000000') >= 0) {
            lastErrorDesc = "您的签名工具包版本过低，请下载并安装最新签名工具包，并重启浏览器。";
        } else if (errorCode.toString().indexOf('0x80090020') >= 0) {
            lastErrorDesc = "交易确认超时，请重新发起交易。";
        } else if (errorCode.toString().indexOf('0xa0071001') >= 0) {
            lastErrorDesc = "请插入U盾。";
        } else if (errorCode.toString().indexOf('0x8010006e') >= 0) {
            //用户取消了操作
            lastErrorDesc = "您取消了交易";
        } else if (errorCode.toString().indexOf('0xa0071002') >= 0) {
            //用户取消了证书
            lastErrorDesc = "您取消了选择证书";
        } else {
            lastErrorDesc = "U盾插入超时，请拔出U盾并重新插入。";
        }
        //console.log(lastErrorDesc);
        return "errorSign";

    }
};

/*
传入参数obj例子(JSON)

var TradeType = "purchaseProducts";
var Timestamp = "1464320097640";
var PayerAcNo = "6231139901000012235";
var PayerAcName = "小华";
var _PayerAcNo = "收款账号"+":"+"6231139901000012235";
var _PayerAcName = "收款人"+":"+"小华";

var obj = {
	TradeType:TradeType,
	Timestamp:Timestamp,
	PayerAcNo:PayerAcNo,
	PayerAcName:PayerAcName,
	_PayerAcNo:_PayerAcNo,
	_PayerAcName:_PayerAcName
};
*/
GHBUkeyCommon.signJSON = function(obj, type) {
    //console.log("obj" + obj + "type" + type)
    if (type != 1 && type != 2) {
        return "errorSignType";
    }

    var TradeType = "";
    var Timestamp = "";
    var show = {};
    var notShow = {};

    $.each(obj, function(key, value) {
        if (key == "TradeType") {
            TradeType = value;
        } else if (key == "Timestamp") {
            Timestamp = value;
        } else if (key.substring(0, 1) == "_") {
            show[key] = value;
        } else {
            notShow[key] = value;
        }
    });

    var objXml = "";
    objXml += '<?xml version="1.0" encoding="utf-8"?>';
    objXml += '<SignData>';
    if (type == 1) {
        objXml += '<TradeType>' + TradeType + '</TradeType>';
        objXml += '<Timestamp>' + Timestamp + '</Timestamp>';
    }
    objXml += '<Fields>';

    $.each(notShow, function(key, value) {
        objXml += '<' + key + '>' + value + '</' + key + '>';
    });

    $.each(show, function(key, value) {
        var key1 = key.substring(1, key.length);
        var index = value.indexOf(":");
        var value1 = value.substring(0, index);
        var value2 = value.substring(++index, value.length);
        objXml += '<' + key1 + ' name="' + value1 + '：">' + value2 + '</' + key1 + '>';
    });
    objXml += '</Fields>';
    objXml += '</SignData>';
    //console.log(objXml);
    var result = GHBUkeyCommon.signXML(objXml);
    //console.log("result" + result)
    return result;
};

GHBUkeyCommon.getLastErrorDesc = function() {
    return lastErrorDesc;
};