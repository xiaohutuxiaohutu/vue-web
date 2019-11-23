<template>
  <div>
    <ynet-content id="serviceGuide" class="main-content" :headerInformation="true" :headerMenu="true">
      <div class="functionalArea">
       <h3 class="functionalAreaTitle" style="border-bottom:0px;"> 开通</h3>
       <div class="plr20">
           <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item title="1、怎样申请个人网上银行服务？" name="1">
              <div>普通客户：客户申请网上银行服务无需到营业网点办理签约，但必须拥有我行活期存折，通过我行网站自助注册成功。凭网银用户名和登录密码即可登录，可使用账户余额查询、账户交易明细查询和挂失账户（口头挂失）功能。</div>
              <div>签约客户：客户申请网上银行服务必须持我行活期存折，本人身份证原件到营业网点填写《个人网上银行开户及变更服务申请表》，并签署《创兴银行电子银行章程》、《创兴银行电子银行个人客户服务协议》、《创兴银行个人网银交易规则》，开户成功后，即成为个人网上银行签约客户。签约客户登录网银，可使用账户查询、转账汇款、存款管理、挂失账户（口头挂失）等功能</div>
          </el-collapse-item>
          <el-collapse-item title="2、怎样申请企业网上银行服务？" name="2">
            <div>企业客户申请开通网上银行服务必须向开户行提供《营业执照》、《组织机构代码证》、经办人员有效身份证原件及复印件一份，如经办人员不是企业法人，还需提供法人授权委托书，填写《企业网上银行开户及变更服务申请表》，并签章，开户成功后，即可成为企业网上银行客户。</div>
          </el-collapse-item>
        </el-collapse>
       </div>
        <h3 class="functionalAreaTitle" style="border-bottom:0px;"> 安装</h3>
        <div class="plr20">
          <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item title="1、使用创兴银行网上银行，对客户的计算机系统设置有什么要求和建议？" name="3">
              <div><h4>为了保证您能正常使用我行个人网上银行，建议您按照以下方法对计算机系统进行设置：</h4>
                  <p>（1）操作系统：Windows7或Windows7以上；</p>
                  <p>（2）操作系统语言：中文简体;</p>
                  <p>（3）操作系统类型：32位操作系统；</p>
                  <p>（4）计算机屏幕分辨率：1024×768或以上；</p>
                  <p>（5）IE浏览器：IE7.0、IE8.0、IE9.0、IE10；</p>
                  <h4>如果您是第一次使用我行个人网上银行，建议您对IE浏览器按照如下步骤进行设置：</h4>
                  <p>（1）将IE的Internet选项的安全级别设置成默认（将vista操作IE的Internet选项的安全级别设置成中）。</p>
                  <p>（2）打开IE浏览器，点击“工具”->“Internet选项”->“安全”->“自定义级别”，将其中的“对标记为可安全执行脚本的ActiveX控件执行脚本”、“下载已签名的ActiveX控件”和“运行ActiveX控件和插件”全部设为“启用”，“没有证书或只有一个证书时不提示进行客户证书选择”设为“禁用”。</p>
                  <p>（3）打开IE浏览器，点击"工具"-> "Internet选项"->"安全"->"受信任的站点" ->"站点"中，在"将该网站添加到区域中"内输入"https://ebank.chbank.com.cn"（注意把"对该区域中的所有站点要求服务器验证(https)"的复选框去掉），然后点击添加、确定。</p>
              </div>
              <div>签约客户：客户申请网上银行服务必须持我行活期存折，本人身份证原件到营业网点填写《个人网上银行开户及变更服务申请表》，并签署《创兴银行电子银行章程》、《创兴银行电子银行个人客户服务协议》、《创兴银行个人网银交易规则》，开户成功后，即成为个人网上银行签约客户。签约客户登录网银，可使用账户查询、转账汇款、存款管理、挂失账户（口头挂失）等功能</div>
            </el-collapse-item>
            <el-collapse-item title="2、开通了“手机动态密码”后，是否需要下载网银证书及安装驱动软件？" name="4">
              <div>开通“手机动态密码”后，只需要开通时绑定手机号码，无需进行证书的下载及安装任何驱动软件。</div>
            </el-collapse-item>
          </el-collapse>
       </div>
         <h3 class="functionalAreaTitle" style="border-bottom:0px;"> 登录</h3>
          <div class="plr20">
              <el-collapse v-model="activeNames" @change="handleChange">
              <el-collapse-item title="1、登录名忘记了该怎么办？" name="1">
                  <div>登录名是您在创兴银行个人网上银行的有效识别号码，通过登录名登录网上银行后，可以管理您在创兴银行个人网上银行的所有账户情况，如果您记不清该登录名，可以输入个人相关信息作为登录名，如用户名、证件号码、卡（账）号。</div>
              </el-collapse-item>
              <el-collapse-item title="2、网银登录密码忘了该怎么办？" name="2">
                <div>可以点击“个人网上银行”登录页面的“忘记登录密码”交易，输入个人相关信息，找回登录密码；也可携带您开立网上银行时使用的有效身份证件和任意加挂到网上银行上的账户到我行任意网点申请登录密码重置。</div>
              </el-collapse-item>
               <el-collapse-item title="3、开通了“手机动态密码” ，但登录或进行相关交易时手机没有收到相应动态密码短信？" name="3">
                <div>（1）首先检查个人资料页面显示的手机号码是否正确，如果不是您现在使用的手机，请到柜台进行签约手机号码变更。（可凭本人有效身份证件和银行卡到我行各营业网点办理手机号码变更）</div>
                <div>（2）如果手机号码正确而长时间没有收到动态密码，请点击“获取动态密码”按钮，重新获取新的动态密码。</div>
              </el-collapse-item>
               <el-collapse-item title="4、登录网上银行时，创兴银行USBKEY无法识别，请问如何解决？" name="4">
               <div>
                  <h4>请按照以下几个步骤检查电脑：</h4>
                  <p>（1）检查USBKEY驱动是否安装或是否安装成功，如果不正常，请修复；</p>
                  <p> （2）如以上检测均正常，请检查USBKEY是否已经损坏(可通过检查USBKEY在其他机器上是否能正常登录来验证)。如USBKEY正常，请换其它USB接口进行登录。</p>
                </div>
              </el-collapse-item>
            </el-collapse>
          </div>
           <h3 class="functionalAreaTitle" style="border-bottom:0px;"> 使用</h3>
          <div class="plr20">
              <el-collapse v-model="activeNames" @change="handleChange">
              <el-collapse-item title="1、如何修改个人网上银行登录名？" name="1">
                  <div>答：客户可通过登录创兴银行个人网上银行，选择“客户服务”—“用户名设置”功能来修改网银的登录名。</div>
              </el-collapse-item>
              <el-collapse-item title="2、如何修改个人网上银行登录密码？" name="2">
                <div>客户可通过登录创兴银行个人网上银行，选择“安全中心”—“修改登录密码”功能来修改网银的登录密码。</div>
              </el-collapse-item>
               <el-collapse-item title="3、个人客户的客户证书损坏该如何处理？" name="3">
                <div>如果客户的客户证书损坏或密码遗忘，请携带您开立网上银行时使用的有效身份证件和任意加挂到网上银行上的账户到我行任意网点办理证书换发手续。</div>
              </el-collapse-item>
               <el-collapse-item title="4、登录网上银行时，创兴银行USBKEY无法识别，请问如何解决？" name="4">
                <div>请按照以下几个步骤检查电脑：</div>
                <div>（1）检查USBKEY驱动是否安装或是否安装成功，如果不正常，请修复；</div>
                <div>（2）如以上检测均正常，请检查USBKEY是否已经损坏(可通过检查USBKEY在其他机器上是否能正常登录来验证)。如USBKEY正常，请换其它USB接口进行登录。</div>
              </el-collapse-item>
              <el-collapse-item title="5、网银转账汇款授权？" name="5">
                <div>（1）个人转账汇款业务，单笔转账金额4.9万元以上，每日转账累计金额19.9万元以上，需账户开户行进行业务授权。</div>
                <div>（2）企业转账汇款业务，单笔转账金额99.9万元以上，每日转账累计金额999.9万元以上，需账户开户行进行业务授权。</div>
              </el-collapse-item>
               <el-collapse-item title="6、批量转账指令生成失败怎么办？" name="6">
                <div>（（1）检查导入文件总人数、总金额与输入的总人数、总金额是否一致。。</div>
                <div>（2）导入文件内容中是否有非法字符，是否超过规定长度。</div>
              </el-collapse-item>
            </el-collapse>
          </div>
            <h3 class="functionalAreaTitle" style="border-bottom:0px;">安全</h3>
          <div class="plr20">
              <el-collapse v-model="activeNames" @change="handleChange">
              <el-collapse-item title="1、使用网银的安全注意事项有哪些？" name="1">
                  <div>答：客户可通过登录创兴银行个人网上银行，选择“客户服务”—“用户名设置”功能来修改网银的登录名。
                      <h4>1、学会自我保护</h4>
                      <p>（1）不要通过不明网站、电子邮件或论坛中的网页链接登录网上银行，建议通过我行官方网站主页链接进入https://ebank.chbank.com.cn。</p>
                      <p>（2）登录成功后，请注意核对网银登录客户名、客户姓名和登录时间。</p>
                      <p>（3）不要在网吧等公共场所的计算机上使用网上银行。如果必须在这些场所使用网上银行，也请注意对输入密码的保护，使用完毕请及时清空浏览器及电脑上的记录。</p>
                      <h4>2、防止黑客攻击</h4>
                      <p>在电脑上安装防病毒软件和防火墙软件，并及时升级更新。定期下载安装最新的操作系统和浏览器安全程序或补丁。使用网上银行完毕或使用过程中暂离时，一定要退出网上银行，拔离USBKEY。</p>
                      <h4>3、注意密码安全</h4>
                      <p>妥善选择网银登录密码和USBKEY的密码，网银登录密码可选择数字和字母，长度最多不超过12位，避免使用生日、有规则的数字等容易猜测的字符，USBKEY的密码长度为6位以上的数字，建议不要与取款密码设为一致。密码不要告诉其他人，最好能定期更换密码。</p>
                      <h4>4、其他事项</h4>
                      <p>不要将USBKEY交付其他人。若USBKEY遗失，请尽快到柜台办理证书补发手续。手机动态密码客户，在收到短信密码时，请仔细核对交易信息。
 联系我们0754-88903222 粤ICP备15063243号 创兴银行有限公司版权所有</p>
                  </div>
                   
              </el-collapse-item>
            </el-collapse>
          </div>
        </div>
  </ynet-content>
</div>
  
</template>


<script>

  //import NProgress from 'nprogress'
  export default {
    name:'helpCenter',
    components:{
    },
    data() {
      return {
        guideCheck:false,
       tableData: [{
            num: '2016-05-02',
            name: '王小虎',
            dae: '查看'
          }],
          // activeNames: ['1']

      };
    },
    methods: {
      check(){
        let _this = this
        _this.guideCheck = true
      },
      start(){
        let _this = this
        _this.guideCheck = false
      }
    }
  }
</script>
<style>

.guideBox{
  position: fixed;left:0;top:0;width:100%;height:100%;opacity: .5;background: #000;
}
.guideNumBox{width:100%;text-align:center;margin-top:800px;}
.guideBox .guideNum{width:30px;height:30px;color:#000;line-height:30px;text-align:center;margin:0 10px;display:inline-block;cursor:pointer;background:#fff;}
.guideBox .guideNum:hover{background:#ee6b00;color:#fff;}
.guideBox p{display:inline-block;}
.guideBox .last_P{background:#efefef;cursor:pointer;color:#000;width:30px;height:30px;}
.guideBox .el-icon-arrow-right{color:#fff;}
</style>
