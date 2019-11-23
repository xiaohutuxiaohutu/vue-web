//获得当前时间戳防止缓存
function get_time() {
	return new Date().getTime();
}
//通过id获得页面元素
function _$(v) {
	return document.getElementById(v);
}
//登录集成演示页面提交表单的方法
function FormSubmit() {
	var length = pgeditor.pwdLength();//获得密码长度
	var length1 = pgeditor1.pwdLength();//获得密码长度
	if (length == 0 || length == undefined) {
		setTimeout(function(){
			alert("密码不能为空");
			_$("_ocx_password").focus();
		},0);
		return false;
	}
	if (pgeditor.pwdValid() == 1) {//判断密码是否匹配正则表达式二
		setTimeout(function(){
			alert("密码不符合要求");
			_$("_ocx_password").focus();
		},0);
		return false;
	}
	if (length1 == 0 || length1 == undefined) {
		setTimeout(function(){
			alert("密码不能为空");
			_$("_ocx_password").focus();
		},0);
		return false;
	}
	if (pgeditor1.pwdValid() == 1) {//判断密码是否匹配正则表达式二
		setTimeout(function(){
			alert("密码不符合要求");
			_$("_ocx_password").focus();
		},0);
		return false;
	}
	$.ajax( {
		url : "./srand_num.jsp?" + get_time(),//get_time()防止缓存
		type : "GET",
		async : false,
		success : function(srand_num) {
			pgeditor.pwdSetSk(srand_num);//给控件设置随机因子
		}
	});
	var pwdResult = pgeditor.pwdResultSM47();//获取密码国密登陆密文
	var pwdResult1 = pgeditor.pwdResultSM48();//获取密码国密交易密文
	var machineNetwork = pgeditor.machineNetwork();//获取网卡信息密文
	var machineDisk = pgeditor.machineDisk();//获取硬盘信息密文
	var machineCPU = pgeditor.machineCPU();//获取CPU信息密文
	_$("password").value = pwdResult;//将密码登陆密文赋值给表单
	_$("password1").value = pwdResult1;//将密码交易密文赋值给表单
	_$("local_network").value = machineNetwork;//将网卡和MAC信息密文赋值给表单
	_$("local_disk").value = machineDisk;//将硬盘信息密文赋值给表单
	_$("local_cpu").value = machineCPU;//将CPU信息密文赋值给表单
	document.form1.submit();
}

//切换层集成演示页面信用卡场景提交表单方法
function FormSubmit1() {
	if (pgeditorcvn.pwdLength() == 0) {
		alert("密码不能为空");
		_$("_ocx_password").focus();
		return false;
	}
	if (pgeditorcvn.pwdValid() == 1) {
		alert("密码不符合要求");
		_$("_ocx_password").focus();
		return false;
	}
	$.ajax( {
		url : "./srand_num.jsp?" + get_time(),
		type : "GET",
		async : false,
		success : function(srand_num) {
			pgeditorcvn.pwdSetSk(srand_num);
		}
	});
	var PwdResult = pgeditorcvn.pwdResult();
	var machineNetwork = pgeditorcvn.machineNetwork();
	var machineDisk = pgeditorcvn.machineDisk();
	var machineCPU = pgeditorcvn.machineCPU();
	_$("password").value = PwdResult;// 获得密码密文,赋值给表单
	_$("local_network").value = machineNetwork;// 获得网卡和MAC信息,赋值给表单
	_$("local_disk").value = machineDisk;// 获得硬盘信息,赋值给表单
	_$("local_cpu").value = machineCPU;// 获得CPU信息,赋值给表单
	document.form1.submit();
}
//切换层集成演示页面借记卡场景提交表单方法
function FormSubmit2() {
	if (pgeditoratm.pwdLength() == 0) {
		alert("密码不能为空");
		_$("_ocx_password2").focus();
		return false;
	}
	if (pgeditoratm.pwdValid() == 1) {
		alert("密码不符合要求");
		_$("_ocx_password2").focus();
		return false;
	}
	$.ajax( {
		url : "./srand_num.jsp?" + get_time(),
		type : "GET",
		async : false,
		success : function(srand_num) {
			pgeditoratm.pwdSetSk(srand_num);
		}
	});
	var PwdResult = pgeditoratm.pwdResult();
	var machineNetwork = pgeditoratm.machineNetwork();
	var machineDisk = pgeditoratm.machineDisk();
	var machineCPU = pgeditoratm.machineCPU();
	_$("password").value = PwdResult;// 获得密码密文,赋值给表单
	_$("local_network").value = machineNetwork;// 获得网卡和MAC信息,赋值给表单
	_$("local_disk").value = machineDisk;// 获得硬盘信息,赋值给表单
	_$("local_cpu").value = machineCPU;// 获得CPU信息,赋值给表单
	document.form1.submit();
}
//修改密码页面提交表单方法
function FormSubmitXiu() {
	if (pgeditor.pwdLength() == 0) {
		alert("老密码不能为空");
		_$("_ocx_password").focus();
		return false;
	}
	if (pgeditor.pwdValid() == 1) {
		alert("老密码不符合要求");
		_$("_ocx_password").focus();
		return false;
	}
	if (pgeditornew.pwdLength() == 0) {
		alert("新密码不能为空");
		_$("_ocx_passwordnew").focus();
		return false;
	}
	if (pgeditornew.pwdValid() == 1) {
		alert("新密码不符合要求");
		_$("_ocx_passwordnew").focus();
		return false;
	}
	if (pgeditorrenew.pwdLength() == 0) {
		alert("确认新密码不能为空");
		_$("_ocx_passwordrenew").focus();
		return false;
	}
	if (pgeditorrenew.pwdValid() == 1) {
		alert("确认新密码不符合要求");
		_$("_ocx_passwordrenew").focus();
		return false;
	}
	$.ajax( {
		url : "./srand_num.jsp?" + get_time(),
		type : "GET",
		async : false,
		success : function(srand_num) {
			pgeditor.pwdSetSk(srand_num);
			pgeditornew.pwdSetSk(srand_num);
			pgeditorrenew.pwdSetSk(srand_num);
		}
	});
	if(pgeditornew.pwdHash()!=pgeditorrenew.pwdHash()){
		alert("新密码和确认密码不一致！请重新输入");
		return false;
	}
	var pwdResultNew = pgeditornew.pwdResult();
	var machineNetwork = pgeditor.machineNetwork();//获取网卡信息密文
	var machineDisk = pgeditor.machineDisk();//获取硬盘信息密文
	var machineCPU = pgeditor.machineCPU();//获取CPU信息密文
	_$("password").value = pwdResultNew;//将密码密文赋值给表单
	_$("local_network").value = machineNetwork;//将网卡和MAC信息密文赋值给表单
	_$("local_disk").value = machineDisk;//将硬盘信息密文赋值给表单
	_$("local_cpu").value = machineCPU;//将CPU信息密文赋值给表单
	document.form1.submit();
}
//清除密码强度
function ClearLevel() {
	_$("passwd_level_1").style.background = "url(./images/bg.gif)";
	_$("passwd_level_2").style.background = "url(./images/bg.gif)";
	_$("passwd_level_3").style.background = "url(./images/bg.gif)";
}
//获取密码强度
function GetLevel() {
	var n = pgeditor.pwdStrength();
	if (n > 0) {
		SetPWDStrength(n);
	} else {
		ClearLevel();
	}
}
//判断密码强度
function SetPWDStrength(n) {
	_$("passwd_level_1").style.background = "url(./images/bg.gif)";
	_$("passwd_level_2").style.background = "url(./images/bg.gif)";
	_$("passwd_level_3").style.background = "url(./images/bg.gif)";
	if (n == 1) {
		_$("passwd_level_1").style.background = "url(./images/bg1.gif)";
	}
	if (n == 2) {
		_$("passwd_level_1").style.background = "url(./images/bg1.gif)";
		_$("passwd_level_2").style.background = "url(./images/bg1.gif)";
	}
	if (n == 3) {
		_$("passwd_level_1").style.background = "url(./images/bg1.gif)";
		_$("passwd_level_2").style.background = "url(./images/bg1.gif)";
		_$("passwd_level_3").style.background = "url(./images/bg1.gif)";
	}
}
//限制input框只能输入数字
function isNum(e) {
    var k = window.event ? e.keyCode : e.which;
    if (((k >= 48) && (k <= 57)) || k == 8 || k == 0) {
    } else {
        if (window.event) {
            window.event.returnValue = false;
        }
        else {
            e.preventDefault(); //for firefox 
        }
    }
} 