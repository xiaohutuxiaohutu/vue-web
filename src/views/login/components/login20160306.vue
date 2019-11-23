<template>
  <div class="s1">
      <div class="login" v-if="first">
        <div class="loginBanner">
          <div class="loginHeader">
            <img src="../../../images/common/logo.png" />
          </div>
          <!--登录表单-->
          <div class="loginBox">
            <p class="loginP">企业网银登录入口</p>
            <div class="loginForm">
              <el-form ref="loginForm" :model="loginForm" :rules="rules">
                <el-form-item label="" prop="userName" class="userName">
                  <el-input v-model="loginForm.userName" placeholder="用户名" id="userName">{{loginForm.userName}}</el-input>
                </el-form-item>
                <div class="mt25">
                  <el-form-item label="" prop="password" id="passWord">
                    <!--<el-input v-model="loginForm.password" placeholder="密码" id="password"></el-input>-->
                    <ynet-password v-model="loginForm.password" :config="pwConfig" ref="password" @enterEvent="enterEvent"></ynet-password>
                    <div class="fogot">
                      <router-link to="/forgetPwd" style="color:#ee6b00" class="forgetPwd" id="forgetPwd">忘记密码</router-link>
                    </div>
                  </el-form-item>
                </div>
                <div class="mt25">
                  <el-form-item label="" prop="identify" v-if="showValidateCode">
                    <el-row>
                      <el-col :span="12">
                        <el-input v-model="loginForm.identify" placeholder="验证码" id="identify" @keyup.enter.native="doLogin($event)"></el-input>
                      </el-col>
                      <el-col :span="4" class="tar">
                        <!--<el-button style="background:#fef5e8;color:#ee6b00;">验证码区域</el-button>-->
                        <img :src="logonImageCode" @click="verifyImage" id="click-verifyImage" style="background:#fef5e8;color:#ee6b00;" />
                      </el-col>
                    </el-row>
                  </el-form-item>
                </div>
              </el-form>
            </div>
            <div class="loginButton" style="cursor:pointer;">
              <img src="../../../images/login/login_button.png" alt="登录" id="loginButton" @click="login('loginForm')">
            </div>
          </div>
          <!--登录页功能按钮-->
          <div class="loginFooter pt20">
            <div class="footerbox fl">
              <ul class="ul1">
                <li class="ul1li">
                  <ul class="ul2">
                    <li><img src="../../../images/login/tel_bank_icon.png" alt=""></li>
                    <!--li>下载客户端</li-->
                    <li><img src="../../../images/login/function_title_bj.png" alt="">
                      <span style="position:absolute;left:58px;top:79px;color:#FFF">手机银行</span>
                    </li>
                    <li style="width:95px;height:95px;position: absolute;top: -8px;left: 97px;">
                      <img src="../../../images/login/saoMa.png" style="width: auto;height: auto;max-width: 100%;max-height: 100%;"/>
                    </li>
                  </ul>
                </li>
                <li class="ul1li">
                  <ul class="ul2">
                    <li><img src="../../../images/login/down_center_icon.png" alt=""></li>
                    <li><a href="/corpbank/static/ocx/CXYH_Assistant_Setup.exe"><span style="color:#4C4C4C">网银小助手</span></a></li>
                    <li><img src="../../../images/login/function_title_bj.png" alt="">
                      <span>下载中心</span>
                    </li>
                    <li><a><span @click="downLoad" style="color:#4C4C4C;padding-left:16px;">下载中心</span></a></li>
                  </ul>
                </li>
                <li class="ul1li">
                  <ul class="ul2">
                    <li><img src="../../../images/login/helper.png" alt=""></li>
                    <li @click="dialogVisible = true"><a><span style="color:#4C4C4C">安全提示</span></a></li>
                    <li><img src="../../../images/login/function_title_bj.png" alt="">
                      <span>客户帮助</span>
                    </li>
                    <li @click="bankslip"><a><span style="color:#4C4C4C">电子回单校验</span></a></li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <!--安全提示弹窗-->
      <el-dialog :visible.sync="dialogVisible" title="注意事项" >
          <div>
            <p>1、我行网上银行网址为：<a href="https://corpbank.chbank.com.cn/corpbank" class="cOrange">https://corpbank.chbank.com.cn/corpbank</a>，请直接从我行官方门户网站登录网上银行，避免从其他网站链接登录，以防进入钓鱼网站或虚假网站。建议您将我行官方网站网址放入收藏夹中，既方便又安全。</p>
            <p>2、请勿向他人透露您的网银登录密码、证书密码和注册账户密码，请勿使用您的生日、QQ号码、电话号码、手机号、账号、有规则数字等号码作为您的网银登录密码、证书密码和注册账户密码，并应定期更换密码。</p>
            <p>3、使用网银完毕后，请点击“安全退出”按钮，关闭浏览器窗口，从电脑上取回USBKEY。</p>
            <p>4、请妥善保管您的USBKEY，如果您不慎遗失USBKEY，请立即到我行网点补办证书。</p>
            <p>5、要确保登录网上银行的电脑安全可靠，设置开机登录密码，安装杀毒软件和网络防火墙并及时升级更新，及时下载补丁程序，不打开不明的程序、链接、邮件。使用Windows操作系统的客户，请打开Windows系统自带的防火墙，关闭共享和远程功能，以防止恶意程序入侵您的电脑。</p>
            <p>6、不要在不明网站输入银行账号、密码等个人资料，以免被钓鱼网站或网络木马等软件窃取。</p>
            <p>7、尽量不要在网吧、图书馆等公共场所使用网上银行，防止他人通过录像或键盘监控设备等手段窃取您的账号和密码信息。如在公用电脑上使用网上银行，请务必确认所有信息都被清除后再关闭电脑浏览器，并取回USBKEY。</p>
          </div>
          <span slot="footer" class="dialog-footer btnArea">
            <!--<el-button @click="dialogVisible = false">取 消</el-button>-->
            <el-button type="primary"  @click="dialogVisible = false">确 定</el-button>
          </span>
      </el-dialog>
    <!--安全提示弹窗end-->

      <!--电子回单页面-->
      <div class="s2" v-if="second">
          <div class="header-content container-border-b" style="overflow:hidden;">
            <div class="main-container">
              <div class="header-logo"><img src="../../../images/common/logo.png" /></div>
              <!--span class="fr" style="font-size:19px;color:#000;line-height:100px;">创兴银行首页|个人网上银行</span-->
            </div>
          </div>
          <div class="main-container electronic-receipt">
              <div class="query">
                <p style="line-height:30px;font-size:16px;" class="cOrange">电子回单查验</p>
                <div class="electForm">
                  <div class="elect-input">
                    <el-form ref="electForm" :model="electForm" :rules="rulesEle">
                      <!--el-form-item label="交易类型:" prop="bsnCode" style="padding-left:22px;">
                        <el-select clearable v-model="electForm.bsnCode">
                          <el-option v-for="item in options" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                      </el-form-item-->
                      <el-form-item label="电子回单号:" prop="elecNo">
                        <el-input v-model="electForm.elecNo"></el-input>
                      </el-form-item>
                      <el-form-item label="收款方账号:" prop="recAccNo">
                        <el-input v-model="electForm.recAccNo"></el-input>
                      </el-form-item>
                    </el-form>
                  </div>
                </div>
                <div class="btnArea mt40 tac mb20">
                  <el-button type="primary" @click="getElecReceipt">查询</el-button>
                  <el-button type="primary" @click="resetForm()">重置</el-button>
                  <el-button @click="queryback">返回</el-button>
                </div>
              </div>
              <div class="elect-footer mt30" style="border:1px solid #000;">
                <p class="cOrange">温馨提示</p>
                <p class="mtb10">1.您可以输入创兴银行网上银电子回单号，验证电子回单真伪</p>
              </div>
          </div>
      </div>
      <!--弹窗-->
      <!--弹窗-->
      <el-dialog :visible.sync="queryVisible" v-if="queryVisible" :close-on-click-modal="false" :close-on-press-escape="false">
        <div slot="footer" class="dialog-footer btnArea">
          <div class="p5">
              <div class="printArea">
                  <div class="tal">
                      <img src="../../../images/common/logo.jpg" alt="">
                  </div>
                  <div class="electronicReceipt pageBreakAfter">
                     <div class="lectronicReceiptTitle">
                        <p class="tac mb20"style="font-size:16px;">创兴银行网上银行电子回单</p>
                        <p class="mb10 mlf10" style="overflow:hidden;">
                          <span class="fl"> 账户所属上级机构：{{highterBrhName}}</span>
                          <span  class="fr">电子回单号：{{elecList.electronicNum}}</span>
                        </p>
                        <p class="mb10 mlf10" style="overflow:hidden;">
                          <span class="fl"> 账户所属机构：{{payAccOpenBrhName}}</span>
                          <span  class="fr">校验码：{{elecList.checkCode}}</span>
                        </p>
                    </div>
                    <!--table布局-->
                    <div class="receiptTable1">
                        <table>
                            <tr>
                                <td rowspan="3" style="width:20px;padding:0px 5px;"  class="tac">付款人</td>
                                <td class="tac">户名</td>
                                <td class="w300 tal">{{elecList.payAccoName}}</td>
                                <td rowspan="3" style="width:20px;padding:0px 5px;"  class="tac">收款人</td>
                                <td class="tac">户名</td>
                                <td class="w300 tal">{{elecList.receiveAccoName}}</td>
                            </tr>
                            <tr>  
                                <td class="w100 tac">账号</td>
                                <td  class=" w300 tal">{{elecList.payAcco}}</td>
                                <td  class="w100 tac">账号</td>            
                                <td class="w300 tal">{{elecList.receiveAcco}}</td>
                            </tr>
                            <tr>         
                                <td class="w200 tac">开户银行</td>
                                <td class="w300 tal">{{payAccOpenBrhName}}</td>
                                <td class="w200 tac">开户银行</td>
                                <td class="w300 tal">{{elecList.receiveBankName}}</td>
                            </tr> 
                            <tr> 
                                <td colspan="2" class="tac">交易币种</td>       
                                <td class="w100 tal">{{$tools.dict.currTypeDict(elecList.cryType)}}</td>
                                <td colspan="2" class="tac">钞汇标识</td>
                                <td class="w300 tal">-----</td>
                            </tr>
                            <tr> 
                                <td colspan="2" class="tac">交易金额</td>       
                                <td class="w100 tal">{{$tools.utils.currencyFormat(elecList.tranMoney)}}</td>
                                <td colspan="2" class="tac">手续费</td>       
                                <td class="w300 tal" v-if="elecList.poundage!=''">{{$tools.utils.currencyFormat(elecList.poundage)}}</td>
                                <td class="w300 tal" v-else>--</td>
                                
                            </tr> 
                            <tr>
                              <td colspan="2" class="tac">合计</td>
                              <td colspan="4" class="tal">
                                  <span>人民币大写：{{$tools.utils.toChinese(Number(elecList.tranMoney)+Number(elecList.poundage))}}</span>
                                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  <span v-if="elecList.cryType=='CNY'">￥</span>
                                  <span v-if="elecList.cryType=='HKD'">HK$</span>
                                  <span v-if="elecList.cryType=='USD'">$</span>
                                  <span v-if="elecList.cryType=='EUR'">€</span>
                                  <span v-if="elecList.cryType=='GBP'">£</span>
                                  <span v-if="elecList.cryType=='JPY'">J￥</span>
                                  <span v-if="elecList.cryType=='SGD'">S$</span>
                                  <span>{{$tools.utils.currencyFormat(Number(elecList.tranMoney)+Number(elecList.poundage))}}</span>
                              </td>  
                            </tr>
                            <tr> 
                                <td colspan="2" class="tac">网银流水号</td>       
                                <td class="w100 tal">{{elecList.bankFlowNo}}</td>
                                <td colspan="2" class="tac">交易类型</td>
                                <td class="w300 tal">一站式转账</td>
                            </tr>
                            <tr> 
                                <td colspan="2" class="tac">交易时间</td>
                                <td class="w100 tal">{{$tools.utils.formatDate(elecList.tranTime,{"symbol":"YYYY-MM-DD HH:mm:ss"})}}</td>
                                <td colspan="2" class="tac">交易状态</td>
                                <td class="w300 tal">交易成功</td>
                            </tr>
                            <tr>
                              <td colspan="2" class="tac">用途</td>
                              <td colspan="4" class="tal">{{elecList.tranPurpose}}</td>
                            </tr> 
                            <tr>
                              <td colspan="2" class="tac">附言</td>
                              <td colspan="4" class="tal">{{elecList.postScript}}</td>
                            </tr> 
                            <tr>
                              <td style="height:100px;color:red;" colspan="6" class="tac">重要提示：电子回单仅作记账参考，不作为收款方入账依据和发货依据，请勿重复记账</td>
                            </tr>               
                        </table>
                    </div>
                    <table width="915px;">
                      <tr> 
                        <td style="width:30%;">操作员：{{elecList.operatorName}}</td>       
                        <td style="width:30%;">已打印次数：{{elecList.printNum}}次</td>       
                        <td style="width:40%;">回单生成时间：{{$tools.utils.formatDate(elecList.tranTime,{"symbol":"YYYY-MM-DD HH:mm:ss"})}}</td>
                      </tr>
                    </table>
                    <div class="sealType">
                      <span v-if='sealType=="1"'>
                        <img src="../../../images/receipt/sealImage-gz.png" alt="" class="receiptImg"> 
                      </span>
                      <span v-if='sealType=="2"'>
                        <img src="../../../images/receipt/sealImage-sz.png" alt="" class="receiptImg"> 
                      </span>
                      <span v-if='sealType=="3"'>
                        <img src="../../../images/receipt/sealImage-st.png" alt="" class="receiptImg"> 
                      </span>
                    </div>
                </div>
              </div>
              <div class="btnArea mt20 tac">
                  <el-button @click="queryVisible=false">关闭</el-button>
              </div>
          </div>
       </div>
    </el-dialog>
    <!--弹窗end-->
    <!--下载页面-->
      <div class="s3" v-if="three">
        <div class="header-content container-border-b" style="overflow:hidden;">
          <div class="main-container">
            <div class="header-logo"><img src="../../../images/common/logo.png" /></div>
            <!--span class="fr" style="font-size:19px;color:#000;line-height:100px;">创兴银行首页|个人网上银行</span-->
          </div>
        </div>
        <div class="bankLoad">
            <el-row  v-for="item in downItems">
              <el-col :span="24"><div class="grid-content bg-purple"><a :href="item.url" class="cOrange">{{ item.message }}</a></div></el-col>
            </el-row>
          <div class="btnArea mt20 tac">
            <el-button @click="comeback">返回</el-button>
          </div>
        </div>
      </div>
    <!--下载页面end-->
   
  </div>
</div>
</template>

<script>

export default {
  components: {

  },
  data() {
    return {
      downItems: [
        { message: '网银小助手', url:'/corpbank/static/ocx/CXYH_Assistant_Setup.exe' },
        { message: '飞天UKEY驱动', url:'/corpbank/static/ocx/InterPass3000_CHBank.exe' },
        { message: '信安世纪IE 64位版签名控件', url:'/corpbank/static/ocx/netsign/NetSign20_all.exe' },
        { message: '信安世纪IE 32位版签名控件', url:'/corpbank/static/ocx/netsign/NetSign20.exe' },
        { message: '信安世纪非IE版签名控件', url:'/corpbank/static/ocx/netsign/npInfosecNetSign.exe' },
        { message: '微通密码控件IE 64位版', url:'/corpbank/static/ocx/PassGuardX64.exe' },
        { message: '微通密码控件IE 32位版', url:'/corpbank/static/ocx/PassGuardX.exe' },
        { message: '微通密码控件非IE版', url:'/corpbank/static/ocx/PassGuardXFF.exe' },
        { message: '手机银行', url:'/corpbank/static/androidDownload/chbank.apk' }
      ],
      sealType:'',
      downPath:'',
      first: true,
      second: false,
      three:false,
      queryVisible: false,
      dialogVisible: false,
      isLogin: false,//和userTemp用于保存用户校验状态
      userTemp: '',
      pwConfig: {
        //pwdStrength:true,     //开启密码强度,默认关闭
        //pgeMaxlength:20,      //密码长度,默认6
        //isLoginIncludeNum:false,
        pgeId: "pgeId3",
        initId: "initId3"
      },
      maxlength: '20',
      items: [
        { tag: '下载中心', p1: '网银小助手', p2: '控件下载' },
        { tag: '客户帮助', p1: '安全提示', p2: '电子回单校验' },
        { tag: '客户帮助', p1: '安全提示', p2: '电子回单校验' }
      ],
      showValidateCode: false,
      loginForm: {
        userName: '',
        password: '',
        identify: ''
      },
      electForm: {
        bsnCode:'',
        elecNo: '',
        recAccNo: ''
      },
      elecList: {
        bankFlowNo: '',
        tranMoney: '',
        tranTime: '',
        checkCode: '',
        payAcco: '',
        payAccoName: '',
        receiveAcco: '',
        receiveAccoName: '',
        electronicNum: '',
        receiveBankName: '',
        payBankName: '',
        cryType: '',
        hisFlowNo: '',
        tranPurpose: '',
        operatorNo: '',
        printNum: '',
        transName: ''
      },
      logonImageCode: '',
      cstMac:'',
      payAccOpenBrhNo:'',
      payAccOpenBrhName:'',
      highterBrhName:'',
      options:[
        {value:'CB01010401-S',label:'一站式转账'},
        {value:'CB01010401-B',label:'批量转账'},
        {value:'CB01010406-A',label:'保证金存入'},
        {value:'CB01010402-T',label:'定期存款'},
        {value:'CB01010403-N',label:'通知存款'},
        {value:'CB01010404-I',label:'行内汇出汇款'},
        {value:'CB01010404-O',label:'行外汇出汇款'},
        {value:'CB01010405-E',label:'结汇'},
        {value:'CB01010405-F',label:'购汇'},
        {value:'CB01010405-C',label:'套汇'},
        {value:'CB01010401-U',label:'上划'},
        {value:'CB01010401-D',label:'下拨'},
        {value:'CB01010401-G',label:'操作子公司账户转账'},
        {value:'CB01010401-H',label:'内部调拨'},
        {value:'CB01010401-K',label:'资金归集'}
      ],
      rules: {
        userName: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { min: 1, max: 20, message: '用户名长度最大20位', trigger: 'blur' },
          //{ min: 6, max: 20, message: '用户名长度为6到20位', trigger: 'blur' },
          { validator: this.isCnEngNum, trigger: 'blur' },
          { validator: this.validateCodeAndUserStt, trigger: 'blur' }
        ],
        password: [
          { validator: this.$tools.validator.loginPwdValidator, vm: this, formName: "loginForm" }
        ],
        identify: [
          { required: this.showValidateCode, message: '验证码不能为空', trigger: 'blur' }
        ]
      },
      rulesEle: {
        elecNo: [{ required: true, message: '请输入电子回单号', trigger: 'blur' }],
        recAccNo: [{ required: true, message: '请输入收款方账户', trigger: 'blur' }]
      }
    }
  },

  mounted() {
    let _this = this
    //验证码初始化
    _this.verifyImage()
    //tab 初始化
    _this.addTabIndex()
    //根据UKey获取登录别名
    _this.getInfoByUKeySn()
  },
  
  // created: function() {
  //   //检测ukey
  //   let _this = this
  //   _this.getUKSn()
  // },
  
  methods: {
    getUKSn() {//获取ukeysn
      let _this = this
      try{
          let listNum = checkUK();
          //alert(listNum)
          if( 1 == listNum ){
            return getUKeySn();
          }else{
            return
          }
      }catch (e) {
      }
    },
    
    getInfoByUKeySn() {
      let _this = this
      let body = {}
      body.uKeySn = _this.getUKSn()
      //alert(body.uKeySn)
      //debugger
      if(body.uKeySn!=null && body.uKeySn!='' && body.uKeySn!=false && body.uKeySn!=undefined && body.uKeySn!='undefined'){
        //alert(body.uKeySn)
        _this.$tools.request(_this, "CB000101.do", body).then(data => {
          let errorCode = data.body.errorCode
          let errorMsg = data.body.errorMsg
          if (errorCode == '' || errorCode == null || errorCode == '0') {
            _this.loginForm.userName = data.body.alias
          } else {
            _this.$alert(errorMsg, '温馨提示', {
              confirmButtonText: '确定'
            })
          }
        })
      }
    },

    resetForm() {
      let _this=this
      _this.$refs['electForm'].resetFields()
    },

    bankslip() {
      let _this = this
      _this.first = false
      _this.electForm.elecNo = ''
      _this.electForm.recAccNo = ''
      _this.second = true
    },
    queryback() {
      let _this = this
      _this.first = true
      _this.second = false
    },

    getElecReceipt() {
      let _this = this
      _this.$refs['electForm'].validate((valid) => {
        if (valid) {
          _this.$tools.request(_this, "CB000106.do", _this.electForm).then(data => {
            let errorCode = data.body.errorCode
            let errorMsg = data.body.errorMsg
            if (errorCode == '' || errorCode == null || errorCode == '0') {
              let electronicCounterList = data.body.electronicCounterList
                  _this.payAccOpenBrhNo = data.body.branchNo
                  _this.payAccOpenBrhName = data.body.branchName
                  _this.sealType = data.body.sealType
                  _this.highterBrhName = data.body.highterBrhName
              if (electronicCounterList.length) {
                  _this.elecList = electronicCounterList[0]
              }
              _this.queryVisible = true
            } else {
              _this.$alert(errorMsg, '温馨提示', {
                  confirmButtonText: '确定'
              })
              _this.queryVisible = false
            }
          })
        } else {
          _this.queryVisible = false
        }
      })
      return _this.queryVisible
    },

    //校验用户名
    isCnEngNum(rule, value, callback) {
      // let _this = this
      // if (_this.$tools.validator.isCnEngNum(value)) return callback('用户名类型错误')
      // callback()
      if (!/^([\u4e00-\u9fa5\a-zA-Z0-9]+)$/.test(value) && $.trim(value) != "") {
            callback("用户名类型错误")
        }
        callback()
    },

    //提交表单前校验
    validateForm(formName, callback) {
      let _this = this
      _this.$refs[formName].validate((valid) => {
        if (valid) {
          callback()
        } else {
          _this.$alert("请检查输入登录信息", '温馨提示', {
            confirmButtonText: '确定'
          })
        }
      })
    },

    //请求并接受验证码图片
    verifyImage() {
      var _this = this
      let keyWord = Math.random()
      _this.logonImageCode = "/api/CB000000.do?versionNo=1.0&keyWord=" + keyWord  //build前
      //_this.logonImageCode="/coporbank/CB000000.do?versionNo=1.0&keyWord="+keyWord  //build后
      _this.$tools.storage.set("keyWord", keyWord)
    },

    //异步请求用户状态和是否需要验证码
    validateCodeAndUserStt(rule, value, callback) {
      let _this = this
      if (_this.isLogin && _this.userTemp == _this.loginForm.userName) {
        callback()
      } else {
        let body = {}
        body.alias = _this.loginForm.userName
        _this.$tools.request(_this, "CB000113.do", body).then(data => {
          let errorCode = data.body.errorCode
          let errorMsg = data.body.errorMsg
          if (errorCode == '' || errorCode == null || errorCode == '0') {
            _this.showValidateCode = data.body.showValidateCode
            _this.isLogin = true
            _this.userTemp = _this.loginForm.userName
            if (_this.showValidateCode == "false") {
              this.showValidateCode = false
            } else {
              this.showValidateCode = true
            }
            callback()
          } else {
            //console.log(errorCode)
            _this.isLogin = false
            return callback()
            //return callback(errorMsg)
          }
        })
      }
    },

    //enter事件(密码框)
    enterEvent(val){
      $("#loginButton").click()
    },

    //enter事件(验证码)
    doLogin:function(ev){
      if(ev.keyCode==13){
        //alert("11111111")
        this.login('loginForm')
      }
    },
    
    //登陆请求
    login(loginForm) {
      let _this = this
      _this.validateForm(loginForm, function() {
        let body = {}
        body.alias = _this.loginForm.userName
        body.password = _this.loginForm.password
        body.codeIn = _this.loginForm.identify
        body.keyWord = _this.$tools.storage.get("keyWord")
        body.randomNum = _this.$refs['password'].srandNum
        body.mac = _this.$refs['password'].cstMac
        _this.$tools.request(_this, "CB000103.do", body).then(data => {
          let errorCode = data.body.errorCode
          let errorMsg = data.body.errorMsg
          _this.cstMac = data.body.mac
          //Vue.http.headers.common['cstMac'] = data.body.mac
          //alert(_this.cstMac)
          if (errorCode == '' || errorCode == null || errorCode == '0') {
            let user = data.body
            user.cstMac = data.body.mac
            //console.log(">>>>>>>>>>>>>>>>"+JSON.stringify(user))
            _this.$tools.storage.set("user", user)   //储存登录数据信息  
            if (user.resetFlag == '1') {
              _this.$router.push({ path: '/cstservice/nickname/nicknameMain' })
            } else if (user.resetFlag == '2') {
              _this.$confirm('您的密码已过期,请尽快修改密码!', '温馨提示', {
                  confirmButtonText: '前往修改',
                  cancelButtonText: '暂不修改',
                  type: 'warning'
              }).then(() => {
                  _this.$router.push({ path: '/cstservice/userInfo/nicknameMain' })
              }).catch(() => {
                  _this.$router.push({ path: '/my/myMain' })
              });
            } else {
                _this.$router.push({ path: '/my/myMain' })
            }
          } else {
            //刷新验证码
            _this.verifyImage()
            if (errorCode == 'CB000103050'||errorCode == 'CB000103051'||errorCode == 'CB000103052'||errorCode == 'CB000103053'||errorCode == 'CB000103054') {
              _this.showValidateCode = true
            }
            //弹出登录失败提示
            _this.loginForm.password = ''
            _this.$alert(errorMsg, '温馨提示')
          }
        })
      })
    },

    //初始化tab
    addTabIndex(){
      $("#userName").attr("tabindex","1")
      $("#forgetPwd").attr("tabindex","3")
      $("#identify").attr("tabindex","4")
      $("#loginButton").attr("tabindex","5")
    },
    downLoad(){
      let _this = this
      _this.first = false
      _this.three = true
    },
    comeback(){
      let _this = this
      _this.first = true
      _this.three = false
    },

  }
}

</script>

<style lang="scss">
.login {
  width: 100%;
  height: auto;
  background: #fff;
}

.loginBanner {
  position: relative;
  width: 1400px;
  height: 720px;
  margin: 0 auto;
  background: url(../../../images/login/banner_pic.png) no-repeat center;
  background-color: #fff;
  padding-top: 40px;
}

.loginHeader {
  position: absolute;
  top: 20px;
  right: 280px;
}

.loginBox {
  background: url(../../../images/login/login_bj.png) no-repeat;
  width: 569px;
  height: 326px;
  position: absolute;
  top: 170px;
  right: 200px;
}

.login .loginForm {
  width: 350px;
  height: 160px;
  margin-top: 73px;
  margin-left: 142px;
}

.login .loginForm input {
  width: 260px;
  height: 40px;
  padding-left: 32px;
}

#userName input {
  background: url(../../../images/login/person_icon.png) no-repeat left;
  background-position: 6px 8px;
  background-color: #fef5e8;
}

#password input {
  background: url(../../../images/login/password.png) no-repeat left;
  background-position: 6px 8px;
  background-color: #fef5e8
}

#identify input {
  width: 170px;
  background: url(../../../images/login/code_icon.png) no-repeat left;
  background-position: 6px 8px;
  background-color: #fef5e8
}

.login .loginForm .el-form-item {
  margin-bottom: 10px;
}

#identify .el-form-item {
  position: relative;
}

#password .el-form-item {
  position: relative;
}

.login .loginForm .el-form-item:nth-of-type(3) .el-button {
  position: absolute;
  top: 1px;
  right: 90px;
  padding-left: 5px;
  padding-right: 5px;
}

.login .loginForm .fogot {
  position: absolute;
  top: 1px;
  right: 24px;
}

.loginButton {
  margin-left: 270px;
  margin-top: 30px;
}

.loginFooter .footerbox {
  position: absolute;
  bottom: 20px;
  left: 200px;
  width: 1000px;
  height: 122px;
}

.loginFooter .footerbox .ul1 {
  width: 100%;
  height: 100%;
}

.loginFooter .footerbox .ul1 .ul1li {
  width: 31%;
  height: 100%;
  background: url(../../../images/login/function_bj.png) no-repeat;
  float: left;
  margin-right: 25px;
  box-sizing: border-box;
  padding-right: 69px;
}

.loginFooter .footerbox .ul1 .ul1li:nth-of-type(3) {
  margin-right: 0px;
}

.loginFooter .footerbox .ul2 {
  width: 100%;
  height: 100%;
}

//.loginFooter .footerbox .ul2 li {//鼠标变手
//  cursor: pointer;
//}

.loginFooter .footerbox .ul2 li:nth-of-type(1) {
  margin: 15px 2px 0 80px;
  float: left;
}

.loginFooter .footerbox .ul2 li:nth-of-type(2) {
  margin: 16px 2px 20px 40px;
  float: left;
}

.loginFooter .footerbox .ul2 li:nth-of-type(3) {
  margin: 20px 2px 0 49px;
  float: left;
  position: relative;
}

.loginFooter .footerbox .ul2 li:nth-of-type(3) span {
  position: absolute;
  top: 2px;
  right: 17px;
  color: #fff;
}

.loginFooter .footerbox .ul2 li:nth-of-type(4) {
  margin: 16px 2px 20px 9px;
  float: right;
  width: 35%;
}

.loginForm .password .passwordB {
  width: 228px;
  border-radius: 4px;
  padding-left:30px;
}
.loginForm .password{background: url(../../../images/login/password.png) no-repeat;background-position:6px 7px;}

.header .header-content {
  width: 100%;
  height: 94px;
  background-color: #ffffff;
  min-width: 1000px;
}

.header-logo {
  float: left;
  padding-top: 25px;
  padding-top: 25px;
}

.electronic-receipt {
  border: 1px solid #4c4c4c;
  height: 700px;
  padding: 50px 50px 0px 50px;
  box-sizing: border-box;
}

.electronic-receipt .query {
  border: 1px solid #4c4c4c;
  height: 500px;
  padding: 20px;
  box-sizing: border-box;
}

.electronic-receipt .electForm {
  border: 1px solid #4c4c4c;
  height: 260px;
}

.electronic-receipt .el-input {
  width: 300px;
}

.sealType .receiptImg{
  position:absolute;bottom:130px;left:375px;
}

.elect-input {
  padding: 50px 0 0 200px;
}

.receiptTable1 caption {
  background: #aca2a0;
  height: 38px;
  line-height: 38px;
  padding-left: 20px;
  font-size: 16px;
  font-weight: normal;
  color: #fff;
  text-align: left;
}

.receiptTable1 td {
  border: 1px solid #cbcbc9;
  height: 30px;
  padding: 4px 20px;
}

.receiptTable1 .w100 {
  width: 100px;
}

.receiptTable1 .w300 {
  width: 300px;
}

.queryVisible .el-dialog__body {
  padding: 0px;
}

.loginForm #identify{background: url(../../../images/login/code_icon.png) no-repeat;background-position:6px 7px;}
#identify {
  width: 170px;
}
.userName .el-input input{
  background: url(../../../images/login/person_icon.png) no-repeat left;
  background-position: 6px 8px;
  background-color: #fef5e8;
}
.s3 .bankLoad{width:960px;height:600px;margin:0 auto;}
.s3 .bankLoad .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
    line-height:36px;
    padding-left:10px;
  }
.bg-purple {
    //background: #d3dce6;
    background: #ddd;
  }
.loginBox .loginP{
    position:absolute;
    top:23px;
    left:140px;
    color:#fff;
    font-size:18px;
    font-weight:500;
}
</style>
