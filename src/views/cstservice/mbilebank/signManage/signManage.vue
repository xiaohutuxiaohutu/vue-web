<template>
  <div class="main-content">
    <!--面包屑-->
    <ynet-breadcrumb></ynet-breadcrumb>
    <!--面包屑--end-->
    <ynet-content id="signManage" :headerInformation="true" :headerMenu="true" class="functionalArea p20">
      <!--<h3 class="functionalAreaTitle">签约管理</h3>-->
      <!--签约管理table-->
      <div class="fourForm tableForm ">
        <div v-if="stepIndex == 1">
          <el-form ref="form" :model="tableData" class="formEmbedTable">
            <h3>手机银行</h3>
            <table>
              <tr>
                <td>企业名称：</td>
                <td colspan="3">
                  {{loginStorage.cstCN}}
                </td>
              </tr>
              <tr>
                <td>业务类型：</td>
                <td>
                  <span>企业手机银行业务</span>
                </td>
                <td>签约状态：</td>
                <td>
                  <span v-if="loginStorage.cstChannelNo.charAt(2)== 0">未签约</span>
                  <span v-if="loginStorage.cstChannelNo.charAt(2)== 1">已签约</span>
                </td>
              </tr>
            </table>
            <div class="btnArea mt20 tac">
              <el-button type="primary" @click="stepIndex = 2" v-if="loginStorage.cstChannelNo.charAt(2)== 0">立即签约</el-button>
              <el-button type="primary" @click="uKeySubmit(2)" v-if="loginStorage.cstChannelNo.charAt(2)== 1">立即解约</el-button>
            </div>
          </el-form>
        </div>
        <!--签约管理table--end-->

        <!--签约页面-->
        <div class="twoForm tableForm" v-if="stepIndex == 2">
          <h3>企业基本信息</h3>
          <el-form ref="form2">
            <el-form-item label="企业中文名称">
              {{loginStorage.cstCN}}
            </el-form-item>
            <el-form-item label="企业证件类型">
              {{$tools.dict.certTypeDict(loginStorage.cstCertType)}}
            </el-form-item>
            <el-form-item label="企业证件号码">
              {{loginStorage.cstCertNo}}
            </el-form-item>
          </el-form>
          <div class="mt10 signManageP" >
            <!--<h3>手机银行协议书</h3>-->
           <div style="border:1px solid #cbcbc9;height:400px;overflow:scroll;" class="pl15">
             <h4 style="textAlign:center;">《创兴银行企业网上银行服务协议》</h4>
            <p> 为明确甲乙双方权利与义务，规范双方业务行为，维护双方利益，创兴银行服务有限公司（以下简称甲方）和企业网上银行签约客户（以下简称乙方）本着平等自愿、互惠互利的原则，就创兴银行企业网上银行服务的相关事宜达成如下协议：</p>
            <p>
              <h4>第一条 如无特别说明，下列用语在协议中的含义为：</h4>
              <p>“网上银行服务”：指甲方借助因特网技术为乙方提供的金融交易服务；</p>
              <p>“数字证书”：指甲方交给乙方的用以在交易中识别乙方身份的电子文件。乙方证书的存放介质为甲方配发的Key盾。</p>
              <p>错误”：指甲方未能执行、未能及时执行或未能正确执行乙方交易指令的异常情况。</p>
              <p>“网上银行系统”：不仅指电脑方式访问企业网上银行系统，还包括手机、平板电脑等移动终端访问企业网上银行系统。</p>
            </p>
            <p>
              <h4>第二条 服务申请</h4>
              <p>1、乙方应按照甲方提供的格式和要求填写申请表，并按甲方要求提供相关资料和信息，申请开通、变更或关闭企业网上银行服务。甲方服务的内容依照乙方填写的《创兴银行企业网上银行服务申请表》中所选择的项目来确定。乙方应保证所填写的申请表和所提供的资料真实、准确、完整。 </p>
              <p>2、乙方在使用网上银行服务过程中，所提供的资料、信息如有更改，均应及时以书面形式通知甲方，并按甲方规定的程序办理有关手续，否则由此发生的损失和风险由乙方承担。乙方先前提交的身份证件或者身份证明文件已过有效期的，乙方应在甲方规定的期限内提交新的有效身份证件或者身份证明文件，如果乙方没有在上述期</p>
              <p>3、乙方具体办理的业务以其按照甲方规定在其签署并提交的申请表及/或网上银行选择的项目为准，但部分业务应按甲方的规定，事先在甲方营业网点柜面或网上银行另行签署相关业务协议后方可办理。 </p>
              <p>4、甲方根据乙方签署并提交的申请表、其他相关协议为乙方设置对应的企业网上银行服务内容。乙方应在网上银行服务及相关业务设置后及时核对，如发现甲方设置的信息与申请表、协议内容不符，应立即按本协议约定告知甲方，否则视为认可甲方设置。乙方未填写前述申请表或填写内容不符合甲方填表说明及其他相关要求、或</p>
              <p>5、甲方同意乙方网上银行开户申请后，应及时代乙方申请数字证书。甲方提供用于下载企业证书的Key盾。乙方只可使用由甲方配发的Key盾存放数字证书，因使用非甲方提供的介质存放向甲方申请的数字证书，产生一切后果由乙方自行负责。</p>
              <p>6、乙方应妥善保管及使用Key盾、Key盾密码和企业数字证书。如因保管不善或其他原因致使密码泄露或可能泄露时，应及时通知甲方，并同时办理相应的变更手续。在变更手续未办理完毕前，发生的一切纠纷或损失，由乙方负责。</p>
              <p>7、乙方如需终止使用甲方网上银行服务，应提前7个银行工作日以书面形式通知甲方。甲方处理完毕后，乙方网上银行服务正式终止，乙方证书将不能使用。同时，本协议即行终止。但协议终止并不表示终止前未完成指令的撤销，也不能消除协议终止前的交易所带来的法律后果。</p>
              <p>8、甲方有权在以下情况下终止或部分终止对乙方提供网上银行服务，如下述情况造成甲方损失的，有权要求乙方承担赔偿责任： 1）利用网上银行发送违法、违纪信息或破坏性信息； 2）利用网上银行从事非法活动，被我行发现或被执法机关或上级监管部门要求查处的； 3）乙方1年内未登录甲方网上银行，且期间无任何使用的网上银行服务； 4）因不遵守本协议而造成或即将造成不良后果的。第三条 乙方权利与义务 </p>
            </p>
            <p>
              <h4>第三条 乙方权利与义务 </h4>
              <p> 1、乙方自愿申请甲方网上银行服务，已了解并同意遵守《创兴银行电子银行业务章程》及本协议的相关约定及业务规则、规定。 </p>
              <p>2、乙方的企业数字证书、Key盾密码、用户登录名和登录密码是乙方进入甲方网上银行系统办理交易时确认乙方身份的要素。无论乙方实际上是否将企业证书及相关密码提供给他人使用，均须对该客户证书和密码下完成的一切交易和操作负责。乙方应妥善保管企业数字证书、Key盾密码、用户登录名及登录密码，如因保管不当、密码泄露等造成纠纷或损失，由乙方负责</p>
              <p>3、乙方应在企业内部设置专门的企业网上银行管理人员和具体操作人员，乙方对前述人员在网上银行中实施的一切行为负责。 乙方需指定一人担任“网上银行”管理员，企业网上银行管理人员应由乙方的财务总监或相当人员担任，并由甲方在乙方申请开办企业网上银行时加以确认。企业网上银行管理人员负责进行乙方企业网上银行的管理，其职能包括企业信息维护、账户权限、</p>
              <p>4、乙方的网上银行操作人员如果发生变动，乙方应及时在系统中调整。乙方的网上银行管理人员如果发生变动，乙方应及时到甲方柜台办理变更；如需修改网上银行管理人员密码，乙方可在系统中自行调整；如需重置网上银行管理人员的用户名及密码，乙方需到甲方柜台申请办理。乙方未按照本款的规定操作所造成的损失由乙方</p>
              <p>5、乙方如申请开通公转私服务功能的各种存款账户，须说明付款用途或事由，并对其真实性、合法性负责，承诺其转账到个人账户的用途必须符合《人民币银行结算业务账户管理办法》、《中国人民银行关于改进个人支付结算服务的通知》等文件的相关规定。乙方申请进行公转私服务功能的转出资金，必须遵守《人民币银行结算业务账户管理办法》的规定，不得进行公款私存。乙方违反本协议有关公转私服务规定，造成的后果由乙方承担一切法律责任。</p>
              <p>6、乙方不得在甲方网上银行系统内发送与网上银行业务无关或破坏性信息，否则，由此造成的风险和损失由乙方承担。 </p>
              <p> 7、乙方可通过以下方式进行网上银行业务查询和咨询，不要通过邮件或其他渠道获得的链接登录。 （一）登录创兴银行网站www.chbank.com.cn查询 （二）亲临创兴银行营业网点 </p>
              <!--（二）致电创兴银行客户服务中心热线XXXXXXXXX -->
            </p>
            <p>
              <h4>第四条 甲方权利与义务 </h4>
              <p>1、在网上银行系统和资金汇划清算系统等正常运行的情况下，甲方有义务及时准确的执行乙方发送的电子支付指令。</p>
              <p>2、甲方因以下情况没有正确执行乙方指令的或导致乙方损失的，甲方可不承担任何责任： 1) 甲方接收到的电子支付指令信息不明、存在乱码、不完整等； 2) 乙方账户存款余额不足或信用额度不足； 3) 乙方账户内资金被依法冻结或扣划； 4) 由于不可抗力、计算机黑客袭击、系统故障、通讯故障、网络拥堵、供电系统故障、电脑病毒、恶意程序攻击及其他不可归因于甲方的情况</p>
              <p>3、甲方应对乙方提供的申请资料和企业信息资料等保密，但国家法律法规和规章另有规定的除外</p>
              <p>4、甲方有权根据业务发展需要对网上银行业务产品及相关交易规则、收费标准进行升级或调整，并采取网站公告、交易提示等适当方式告知客户，乙方须按照升级和调整后的业务功能或交易规则办理网上银行业务。 </p>
              <p>5、甲方因网上银行系统升级、调试等原因，需要按计划暂时停止企业网上银行服务情况，不需要承担违约责任，但要在网站上提前公告通知乙方。 </p>
              <p>6、如有以下情况，甲方可以立刻停止乙方办理网上银行公转私业务： 1）乙方公转私交易不符合中国人民银行有关文件关于对网上银行公转私业务及本协议规定的范围。 2）甲方发现乙方公转私交易异常，乙方没有合理理由。 </p>
              <p>7、甲方保证网上银行业务的收款入账时间不迟于相应通过同城票据交换、异地电汇业务的收款入账时间。 </p>
              <p> 8、在网上银行系统和资金汇划清算系统正常运行的情况下，甲方有义务及时准确的执行乙方发送的电子支付指令，甲方为乙方办理转账的时间以甲方批复受理其电子支付指令为准。 1）节假日提交的跨行电子转账指令，在节假日后第一个工作日上午作提出处理； 2）工作日16：30分后至次日8：30分之间提交的跨行电子转账指令，在下一个工作日上午作提出处理。</p>
              <p> 9、乙方存在未按时支付有关费用、不遵守甲方有关业务规定，或存在恶意操作、诋毁、损害甲方声誉等情况的，甲方有权单方暂停或中止对乙方提供网上银行服务，并保留追究乙方责任的权利。</p>
              <p>10、甲方以乙方发出的电子支付指令为办理转账付款的合法有效依据。根据乙方电子支付指令生成的“创兴银行网上银行转账凭证”为甲方合法、有效的记账凭证。“创兴银行网上银行转账凭证”不需加盖乙方的印鉴。</p>
            </p>
            <p>
              <h4>第五条 关于代付业务的特殊约定 鉴于代付业务的特殊性，如果乙方申请通过甲方网上银行办理代付业务，根据人民银行发布的《人民币银行结算业务账户管理办法》、《中国人民银行关于改进个人支付结算服务的通知》中相关要求，甲、乙双方就代付业务需遵守以下特殊约定：</h4>
              <p>1、本协议的代付业务服务是指甲乙双方在符合法律、法规的前提下，甲方为乙方开通网上银行的工资发放、财务管理、其他代发服务功能。乙方申请开通工资发放服务功能，必须通过基本账户操作。乙方通过甲方的网上银行，按照约定的结算方式，通过基本账号将工资发放款项存入乙方员工指定的个人银行结算账户上。</p>
              <p>2、乙方保证付款用途的真实性、合法性，甲方为核实交易的真实性、合法性，有权对乙方提交的交易指令做进一步确认，并要求乙方出具相关付款依据证明材料。但甲方对此所做的任何核实、确认并不减免乙方的责任。 乙方通过网上银行办理代付业务时，应在付款用途栏或附言栏注明付款用途及事由，并对支付款项是有的真实性、合法性负责，否则，甲方有权拒绝执行乙方提</p>
              <p>3、乙方同意按照申请表约定金额向甲方支付代付业务手续费。 4、代付业务手续费在乙方使用甲方网上银行进行代付业务操作后由甲方系统自动在乙方基本账户中扣收，乙方需保证在相关费用收取时账户内有足够余额供甲方扣收，因余额不足以支付代付业务手续费造成业务处理失败的，甲方不承担责任。 5、乙方不得利用甲方的代付业务服务从事洗钱、恐怖融资等非法活动，否则由此引起的法律责任由乙方全部承担 6、乙方如需取消代付业务服务，应当到甲方网点柜台填写《创兴银行企业网上银行服务申请表》，申请终止该服务。 </p>
            </p>
            <p>
              <h4>第六条 费用</h4>
              <p>甲方有权制定、调整和修改网上银行业务收费项目、收费标准、收费方式和收费周期，并有权根据乙方所办理的业务从乙方账户直接扣收。乙方同意向甲方交纳使用企业网上银行服务的各项费用，并且保证在对应账户中保留足够余额，由甲方从其中账户直接扣收，如因乙方账户余额不足导致手续费扣收失败的，甲方有权暂停或终止网上银行服务。甲方收费项目、收费标准、收费方式和收费周期的调整和修改将通过网站或营业网点等适当方式公告，不再逐一通知客户。</p>
            </p>
            <p>
              <h4>第七条 故障处理 </h4>
              <p>乙方一旦确信错误已发生，应在知道或应当知道错误发生之日起5日内以书面形式通知甲方，在通知中应说明怀疑错误发生的原因、有关的账号、金额等情况。甲方应在自接到通知之日起7个银行工作日内告知乙方调查结果，如甲方认为错误确已发生并是甲方的原因，应在告知乙方调查结果后3个银行工作日内对错误加以纠正。</p>
            </p>
            <p>
              <h4>第八条 争议解决与法律适用</h4>
              <p>本协议生效后，甲乙双方应全面履行本协议约定的义务，任何一方不履行或不完全履行约定义务，应承担相应的违约责任，并赔偿因此给对方造成的损失。 本协议适用中华人民共和国有关法律、法规，甲乙双方在履行本协议的过程中，如发生争议，应协商解决；协商不成的,甲方所在地人民法院通过诉讼解决</p>
            </p>
            <p>
              <h4>第九条 协议的效力和生效 </h4>
              <p>乙方确认已全部阅读了本协议，并保证已全部通晓、理解和完全接受本协议。本协议自乙方申请企业网上银行服务获甲方批准之日起生效。本协议生效后，本协议的任何条款如因法律原因而被确认无效，并不影响本协议其他条款的效力。甲方有权修订本协议及附件，且修订后内容将通过包括但不限于网站公告、营业网点公告、网上银行公告、电子邮件、短信等方式予以公布。如乙方继续使用网上银行服务的，视为接受该修订内容。 乙方如果取消企业网上银行服务功能，应当到甲方开户行填写《创兴银行企业网上银行服务申请表》，申请取消网上企业银行服务功能。甲方取消乙方企业网上银行服务功能后，本协议自动失效。</p>
            </p>
           </div>
          </div>
          <div class="tac mt20">
            <el-checkbox v-model="checked" @change="handleChange">我已阅读并且同意协议内容</el-checkbox>
          </div>

          <div class="btnArea mt20 tac">
            <el-button type="primary" @click="uKeySubmit(0)">立即签约</el-button>
            <el-button @click="stepIndex = 1">返回</el-button>
          </div>
        </div>
        <!--签约页面--end-->
      </div>

      <!-- 成功页面-->
      <div class="tableForm mt20" v-if="stepIndex == 3">
        <h3>签约结果</h3>
        <div class="transactionStatus">
          <ynet-icon Type="transactionStatus" NO="1"></ynet-icon>
          <span class="ml15">企业手机银行业务签约成功，请前往“手机银行-用户启停”设置企业手机银行用户。</span>
          <div class="btnArea mt20 tac">
            <el-button @click="stepIndex = 1">返回</el-button>
          </div>
        </div>
      </div>
      <!--成功页面--end-->

    </ynet-content>
  </div>
</template>
  
<script>

export default {
  name: 'signManage',
  components: {},
  data() {
    return {
      checked: '',
      stepIndex: 1,
      loginStorage: this.$tools.storage.get('user', 'save'),
      signData: ''
    };
  },
  methods: {
    uKeySubmit(val) {
      let _this = this
      let _Msg = ''
      if (val == '0') {
        if (_this.checked) {
          _Msg = '是否签约手机银行?'
        }else{
          this.$alert('请阅读并同意签约协议', '温馨提示', {
              confirmButtonText: '确定',
              callback: action => {
              }
            });
            return
        }
      }
      if (val == '2') {
        _Msg = '解约后本企业所有用户均不能使用企业手机银行业务, 请确定是否解约?'
      }
      this.$confirm(_Msg, '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let userStorge = _this.$tools.storage.get("user", "save")
        let cstNo = userStorge.cstNo
        let userNo = userStorge.eCIFID
        let newDate = [{ key: 'cstNo', value: cstNo },
        { key: 'userNo', value: userNo },
        { key: 'cstChannelNo', value: userStorge.cstChannelNo },]
        let siDate = JSON.stringify(newDate);
        let certNo = userStorge.serialNo
        let ukeyNo = userStorge.uKeySn
        let arrAcc = ["操作类型:", val == '0' ? "手机银行签约" : "手机银行解约"]
        let arrAmt = ["操作员登录名:", userStorge.alias]
        let keyFlag = _this.$ukey
        if (keyFlag == true || keyFlag == 'true') {
          let flag = getSignData(arrAcc, arrAmt, siDate, certNo, ukeyNo)
          if (flag == false || flag == 'false') {
            return
          }
          let signData = document.getElementById("signData").value.toString()
          _this.signData = signData
        }
        if (val == '0') {
          _this.singMobileBank()
        }
        if (val == '2') {
          _this.cannelMobileBank()
        }
      }).catch(() => {
      });

    },
    cannelMobileBank() {
      let _this = this
      let body = {}
      body.cstChannelNo = _this.$tools.storage.get("user", "save").cstChannelNo
      body.queryType = "close"
      body.signedData = _this.signData
      _this.$tools.request(_this, "CB080701.do", body).then(
        data => {
          if (data.body.errorCode == '0') {
            this.$alert('解约成功，请重新登录', '温馨提示', {
              confirmButtonText: '确定',
              callback: action => {
                // let _cstChannelNo = _this.loginStorage.cstChannelNo
                // _this.loginStorage.cstChannelNo = _cstChannelNo.substr(0, 2) + "0" + _cstChannelNo.substr(3, 5)
                // this.$tools.storage.set('user', _this.loginStorage)
                _this.$tools.request(_this, "CB000108.do").then(data => {
                  _this.$tools.storage.get("user")
                  _this.$tools.storage.get("menu")
                  _this.$tools.storage.get("menuGround")
                  _this.$router.push({ path: '/login/loginMain' })
                })
              }
            });
          } else {
            this.$alert(data.body.errorMsg, '温馨提示', {
              confirmButtonText: '确定',
              callback: action => {
              }
            });
          }
        })
    },
    singMobileBank() {
      let _this = this
      let body = {}
      body.cstChannelNo = _this.$tools.storage.get("user", "save").cstChannelNo
      body.signedData = _this.signData
      body.queryType = "open"
      _this.$tools.request(_this, "CB080701.do", body).then(
        data => {
          if (data.body.errorCode == '0') {
            // let _cstChannelNo = _this.loginStorage.cstChannelNo
            // _this.loginStorage.cstChannelNo = _cstChannelNo.substr(0, 2) + "1" + _cstChannelNo.substr(3, 5)
            // this.$tools.storage.set('user', _this.loginStorage)
            // _this.stepIndex = 3
            this.$alert('签约手机银行成功，请重新登录', '温馨提示', {
              confirmButtonText: '确定',
              callback: action => {
                _this.$tools.request(_this, "CB000108.do").then(data => {
                  _this.$tools.storage.get("user")
                  _this.$tools.storage.get("menu")
                  _this.$tools.storage.get("menuGround")
                  _this.$router.push({ path: '/login/loginMain' })
                })
              }
            });
          } else {
            this.$alert(data.body.errorMsg, '温馨提示', {
              confirmButtonText: '确定',
              callback: action => {
                _this.stepIndex = 1
              }
            });
          }
        })
    },
    handleChange(event) {
    }
  },
  mounted() {
    let _this = this
  }
}
</script>

