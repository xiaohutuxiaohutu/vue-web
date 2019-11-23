<template>
  <div class="intraBankRemittanceStep1">
    <!--table布局-->
    <el-form ref="form" :model="form" :rules="rules" class="formEmbedTable mt20 " target="iframe" enctype="multipart/form-data" method="post" id="internationTable">
      <iframe name="iframe" style="display:none"></iframe>
      <table>
        <caption>汇款信息</caption>
        <tr>
          <td rowspan="2">
            <span class="cRed">*</span>汇款人名称及地址：
          </td>
          <td colspan="3">
            <el-radio-group v-model="form.chineseRadio" @change="chineseRadioFN">
              <el-radio :label="true">&nbsp;</el-radio>
            </el-radio-group>
            <span>中文名称：</span>
            <el-form-item prop="chName" ref="chName">
              <el-input v-model="form.chName" name="chName" placeholder="中文名称" :disabled="true"></el-input>
            </el-form-item>
            <span>中文地址：</span>
            <el-form-item prop="chAddr" ref="chAddr">
              <el-input v-model="form.chAddr" name="chAddr" placeholder="中文地址" :disabled="!form.chineseRadio"></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td colspan="3" class="tableEvenText">
            <el-radio-group v-model="form.engRadio" @change="engRadioFN">
              <el-radio :label="true">&nbsp;</el-radio>
            </el-radio-group>
            <span>英文名称：</span>
            <el-form-item prop="enName" ref="enName">
              <el-input v-model="form.enName" placeholder="英文名称" :disabled="true"></el-input>
            </el-form-item>
            <span>英文地址：</span>
            <el-form-item prop="enAddr" ref="enAddr">
              <el-input v-model="form.enAddr" placeholder="英文地址" :disabled="!form.engRadio"></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>
            <span class="cRed">*</span>收款人常驻国家（地区）名称及代码：
          </td>
          <td>
            <el-form-item prop="countryNameAndCode">
              <el-input v-model="form.countryNameAndCode" placeholder="国家名-邮政编码" @blur="countryNameAndCodeBlur"></el-input>
              <a class="cOrange" @click="dialogVisible = true">选择</a>
            </el-form-item>
          </td>
          <td>
            <span class="cRed">*</span>汇款币种：
          </td>
          <td>
            <el-form-item prop="CRY">
              <el-select placeholder="----请选择----" v-model="form.CRY" @change="changeCRY">
                <el-option label="CNY-人民币" value="CNY"></el-option>
                <el-option label="HKD-港元" value="HKD"></el-option>
                <el-option label="USD-美元" value="USD"></el-option>
                <el-option label="EUR-欧元" value="EUR"></el-option>
                <el-option label="GBP-英镑" value="GBP"></el-option>
                <el-option label="JPY-日元" value="JPY"></el-option>
                <el-option label="SGD-新加坡币" value="SGD"></el-option>
              </el-select>
              <a class="cOrange" @click="dialogVisible4 = true">牌价查询</a>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>
            <span class="cRed">*</span>汇款金额：
          </td>
          <td>
            <el-form-item prop="transAmount">
              <ynet-currency-input v-model="form.transAmount" name="transAmount" placeholder="汇款金额" :showChinese="false"></ynet-currency-input>
              <template>
                <span>{{$tools.dict.CRYTrans(form.CRY)}}</span>
              </template>
            </el-form-item>
          </td>
          <td>金额大写：</td>
          <td>{{$tools.utils.toChinese(form.transAmount)}}</td>
        </tr>
        <tr>
          <td>现汇金额：</td>
          <td>
            <el-form-item ref="cashAmount" prop="cashAmount">
              <ynet-currency-input v-model="form.cashAmount" name="cashAmount" placeholder="现汇金额" :showChinese="false" :disabled="form.CRY=='CNY'"></ynet-currency-input>
              <template>
                <span>{{$tools.dict.CRYTrans(form.CRY)}}</span>
              </template>
            </el-form-item>
          </td>
          <td>现汇账号：</td>
          <td>
            <el-form-item ref="spotExAcc" prop="spotExAcc">
              <el-select class="lh28" v-model="form.spotExAcc" clearable placeholder="----请选择----" :disabled="form.CRY=='CNY'" @change="selectSpotExAcc">
                <el-option v-for="items in spotExAccList" :label="items.accNo+' ['+ $tools.dict.currTypeDict(items.currType) +']'+' ['+(items.alias==''?items.accName:items.alias)+']'" :value="items.accNo"></el-option>
              </el-select>
              <div>
                <a class="cOrange" @click="search1" v-if="form.CRY!='CNY'">查询余额</a>
                <span v-if="!(form.resCashAmount =='' || form.resCashAmount==undefined)">&nbsp;{{$tools.dict.currencyType(form.CRY)+form.resCashAmount}}</span>
              </div>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>购汇金额：</td>
          <td>
            <el-form-item ref="exchangeAmount" prop="exchangeAmount">
              <ynet-currency-input v-model="form.exchangeAmount" name="exchangeAmount" placeholder="购汇金额" :showChinese="false" :disabled="form.CRY=='CNY'"></ynet-currency-input>
              <template>
                <span>{{$tools.dict.CRYTrans(form.CRY)}}</span>
              </template>
            </el-form-item>
          </td>
          <td>购汇账号：</td>
          <td>
            <el-form-item ref="purchasedExAcc" prop="purchasedExAcc">
              <el-select class="lh28" v-model="form.purchasedExAcc" clearable placeholder="----请选择----" :disabled="form.CRY=='CNY'" @change="selectPurchasedExAcc">
                <el-option v-for="items in purchasedExAccList" :label="items.accNo+' ['+ $tools.dict.currTypeDict(items.currType) +']'+' ['+(items.alias==''?items.accName:items.alias)+']'" :value="items.accNo"></el-option>
              </el-select>
              <div>
                <a class="cOrange" @click="search2" v-if="form.CRY!='CNY'">查询余额</a>
                <span v-if="!(form.resExchangeAmount =='' || form.resExchangeAmount==undefined)">&nbsp;{{$tools.dict.currencyType('CNY')+form.resExchangeAmount}}</span>
              </div>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>其他金额：</td>
          <td>
            <el-form-item ref="otherAmount" prop="otherAmount">
              <ynet-currency-input v-model="form.otherAmount" name="otherAmount" placeholder="其他金额" :showChinese="false" :disabled="form.CRY!='CNY'"></ynet-currency-input>
              <template>
                <span v-if="form.CRY=='CNY'">{{$tools.dict.CRYTrans(form.CRY)}}</span>
              </template>
            </el-form-item>
          </td>
          <td>其他账号：</td>
          <td>
            <el-form-item ref="otherAcc" prop="otherAcc">
              <el-select class="lh28" v-model="form.otherAcc" placeholder="----请选择----" :disabled="form.CRY!='CNY'" @change="selectOtherAcc">
                <el-option v-for="items in otherAccList" :label="items.accNo+' ['+ $tools.dict.currTypeDict(items.currType) +']'+' ['+(items.alias==''?items.accName:items.alias)+']'" :value="items.accNo"></el-option>
              </el-select>
              <div>
                <a class="cOrange" @click="search3" v-if="form.CRY=='CNY'">查询余额</a>
                <span v-if="!(form.resOtherAmount =='' || form.resOtherAmount==undefined)">
                  <span v-if="form.CRY=='CNY'">&nbsp;{{$tools.dict.currencyType(form.CRY)+form.resOtherAmount}}</span>
                </span>
              </div>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>
            <span class="cRed">*</span>国内外费用承担方式：
          </td>
          <td>
            <el-form-item prop="undertakingWay">
              <el-select placeholder="----请选择----" v-model="form.undertakingWay" @change="changeUndertakingWay">
                <el-option label="汇款人 OUR" value="0"></el-option>
                <el-option label="收款人 BEN" value="1"></el-option>
                <el-option label="共同 SHA" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-tooltip effect="light" placement="right">
              <div slot="content" style="width:200px;">
              <p>如果贵公司选择承担境内外银行全部汇款费用，应在申请书“国内外费用承担”（71A）栏勾选“OUR”，则汇款过程中产生的费用全部由贵公司承担。但即使选择了“OUR”，如果汇款路线迂回曲折，也不能保证全额到账。</p>
              </div>
              <span class="cOrange"><i class="el-icon-question"/></span>
            </el-tooltip>
          </td>
          <td>扣费账号：</td>
          <td>
            <el-form-item ref="payAccount" prop="payAccount" @change="selectPayAccount">
              <el-select class="lh28" v-model="form.payAccount" placeholder="----请选择----" :disabled="form.isPayAccountDisabled">
                <el-option v-for="items in payAccountList" :label="items.accNo+' ['+ $tools.dict.currTypeDict(items.currType) +']'+' ['+(items.alias==''?items.accName:items.alias)+']'" :value="items.accNo"></el-option>
              </el-select>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>合同号：</td>
          <td>
            <el-form-item prop="contra">
              <el-input v-model="form.contra" placeholder="合同号"></el-input>
            </el-form-item>
          </td>
          <td>发票号：</td>
          <td>
            <el-form-item prop="invNo">
              <el-input v-model="form.invNo" placeholder="发票号"></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>
            <span class="cRed">*</span>款项性质：
          </td>
          <td>
            <el-form-item prop="natureOfMoney">
              <el-select placeholder="----请选择----" v-model="form.natureOfMoney">
                <el-option label="预付款 Advance Payment " value="0"></el-option>
                <el-option label="货到付款 Payment Against Delivery " value="1"></el-option>
                <el-option label="退款 Refund" value="2"></el-option>
                <el-option label="其他 Others" value="3"></el-option>
              </el-select>
            </el-form-item>
          </td>
          <td v-if="form.countryNameAndCode!='中华人民共和国/China-CHN'"></td>
          <td v-if="form.countryNameAndCode=='中华人民共和国/China-CHN'">
            <span class="cRed">*</span>付汇性质
          </td>
          <td>
            <el-form-item prop="natureOfPayment" v-if="form.countryNameAndCode=='中华人民共和国/China-CHN'">
              <el-select placeholder="----请选择----" v-model="form.natureOfPayment">
                <el-option label="保税区 " value="0"></el-option>
                <el-option label="出口加工区 " value="1"></el-option>
                <el-option label="钻石交易所" value="2"></el-option>
                <el-option label="其他特殊经济区域 " value="3"></el-option>
                <el-option label="深加工结转" value="4"></el-option>
                <el-option label="其他" value="5"></el-option>
              </el-select>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>
            <span class="cRed">*</span>本笔款项是否为保税货物项下付款：
          </td>
          <td>
            <el-form-item prop="flag">
              <el-select placeholder="----请选择----" v-model="form.flag">
                <el-option label="是" value="0"></el-option>
                <el-option label="否" value="1"></el-option>
              </el-select>
            </el-form-item>
          </td>
          <td>外汇局批号件/备案表号/业务编号</td>
          <td>
            <el-form-item prop="setltBsnCode">
              <el-input v-model="form.setltBsnCode" placeholder="外汇局批号件/备案表号/业务编号"></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>交易编码1：</td>
          <td>
            <el-form-item prop="tranCode1">
              <el-input v-model="form.tranCode1" placeholder="六位数字编码"></el-input>
              <a class="cOrange" @click="selectCode(true)">选择</a>
            </el-form-item>
          </td>
          <td>相应金额</td>
          <td>
            <el-form-item ref="transaction1" prop="transaction1">
              <ynet-currency-input v-model="form.transaction1" name="transaction1" placeholder="相应金额" :showChinese="false"></ynet-currency-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>交易附言1：</td>
          <td colspan="3">
            <el-form-item prop="postscript1">
              <el-input v-model="form.postscript1" placeholder="交易附言1" :disabled="form.countryNameAndCode=='中华人民共和国/China-CHN'"></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>交易编码2：</td>
          <td>
            <el-form-item prop="tranCode2">
              <el-input v-model="form.tranCode2" placeholder="六位数字编码"></el-input>
              <a class="cOrange" @click="selectCode(false)">选择</a>
            </el-form-item>
          </td>
          <td>相应金额</td>
          <td>
            <el-form-item ref="transaction2" prop="transaction2">
              <ynet-currency-input v-model="form.transaction2" name="transaction2" placeholder="相应金额" :showChinese="false"></ynet-currency-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>交易附言2：</td>
          <td colspan="3">
            <el-form-item prop="postscript2">
              <el-input v-model="form.postscript2" placeholder="交易附言2" :disabled="form.countryNameAndCode=='中华人民共和国/China-CHN'"></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>
            <span class="cRed">*</span>汇款附言：
          </td>
          <td colspan="3">
            <el-form-item prop="remitPostscript">
              <el-input type="textarea" v-model="form.remitPostscript" placeholder="汇款附言"></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>汇款备注：</td>
          <td colspan="3">
            <el-form-item prop="rmk">
              <el-input type="textarea" v-model="form.rmk" placeholder="汇款备注"></el-input>
            </el-form-item>
          </td>
        </tr>
      </table>
      <table>
        <caption>收款人信息</caption>
        <tr>
          <td>
            <span class="cRed">*</span>收款人账号：
          </td>
          <td colspan="3">
            <el-form-item ref="recAccount" prop="recAccount">
              <el-input v-model="form.recAccount" placeholder="收款人账号" @blur="isSaveChange"></el-input>
              <a class="cOrange" @click="dialogVisible2 = true">查询收款人</a>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td rowspan="3">
            <span class="cRed">*</span>收款人名称及地址：
          </td>
          <td colspan="3">
            <span>
              <span class="cRed">*</span>收款人名称</span>
            <el-form-item class="w400" prop="recName">
              <el-input v-model="form.recName" placeholder="请输入名称"></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td colspan="3" class="tableEvenText">
            <span><span class="cRed">*</span>收款人地址</span>
            <el-form-item class="w400" prop="region">
              <el-input v-model="form.region" placeholder="请输入地址"></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td colspan="3" class="tableEvenText">
            <span><span class="cRed">*</span>收款人所在国家及邮政编码</span>
            <el-form-item class="w400" prop="countryAndCode">
              <el-input v-model="form.countryAndCode" placeholder="国家名-邮政编码"></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>保存收款人：</td>
          <td colspan="3">
            <el-form-item>
              <el-checkbox-group v-model="form.isSave" @change="isSaveChange">
                <el-checkbox></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </td>
        </tr>
      </table>
      <table>
        <caption>附加附件（附件：支持zip压缩包格式，每个压缩包不要超过5M）</caption>
        <tr v-if="isShowFileTable">
          <td class="tableEvenText">
            <span>{{form.newFileName}}</span>
            <a class="cBlue" v-if="form.newFileName!=''" @click="delAmountRange">删除</a>
          </td>
        </tr>
        <tr v-show="!isShowFileTable">
          <td class="tableEvenText">
            <el-form-item prop="fileName">
              <ynet-upload 
                name="filePath" 
                configName="uploadConfig" 
                action="/api/CB000019.do?versionNo=0.1" 
                ref="upload" 
                v-model="form.fileName" 
                :vm="this" 
                @uploadSuccess="uploadSuccess" 
                @input="uploadInput" 
                :isShowBtnUoload="uploadConfig.isShowBtnUoload"
                class="inline-block">
              </ynet-upload>
            </el-form-item>
          </td>
        </tr>
      </table>
      <ynet-application-guide textNO="intraBankRemittance" class="mt20"></ynet-application-guide>
      <div>
        <p align="center">
          <el-form-item ref="isAgree" prop="isAgree">
            <el-checkbox-group v-model="form.isAgree" @change="isAgreeCheckboxChage">
              <el-checkbox label="1">
                <!--<span>同意<a class="cBlue">《境内汇款申请书》填报说明</a></span>-->
                <span>同意<a class="cBlue" @click="dialogVisible5 = true">《汇款须知》</a></span>
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </p>
      </div>
      <div class="btnArea mt20 tac">
        <el-button type="primary" @click="submitForm()">下一步</el-button>
        <el-button @click="resetForm()">重置</el-button>
      </div>
    </el-form>
    <!--table布局-->

    <!-- 选择国家 -->
    <div v-if="dialogVisible">
      <selectCountry @selectCountry1="selectCountry1"></selectCountry>
    </div>
    <!-- 选择国家end -->
    <!-- 交易编码 -->
    <div v-if="dialogVisible1">
      <selectCode @selectCode1="selectCode1"></selectCode>
    </div>
    <!-- 交易编码end -->
    <!-- 收款人账号 -->
    <div v-if="dialogVisible2">
      <SelectAccount @selectAccount1="selectAccount1" @saveAccountBak="saveAccountBak" remitType="0"></SelectAccount>
    </div>
    <!-- 收款人账号end -->
    <!--牌价查询-->
    <el-dialog title="人民币兑外汇牌价" :visible.sync="dialogVisible4" :close-on-click-modal="false" :close-on-press-escape="false">
      <selectPriceTag></selectPriceTag>
      <span slot="footer" class="el-dialog__footer btnArea">
        <el-button @click="dialogVisible4=false">关闭</el-button>
      </span>
    </el-dialog>
    <!--牌价查询end-->
    <!-- 汇款须知 -->
    <el-dialog :visible.sync="dialogVisible5" width="910px" :close-on-click-modal="false" :close-on-press-escape="false">
      <div class="TermsAndConditions">
        <h3 class="tac">汇款须知</h3>
        <ul>
          <li v-for="(value,index) in conditionsList">{{value}}</li>
        </ul>
      </div>
      <span slot="footer" class="el-dialog__footer btnArea">
        <el-button @click="dialogVisible5 = false">关闭</el-button>
      </span>
    </el-dialog>
    <!-- 汇款须知end -->
  </div>
</template>

<script>
import selectCountry from '../components/selectCountry' //国家选择组件
import selectCode from '../components/selectCode' //国家选择组件
import SelectAccount from '../components/SelectAccount' //收款人账号选择组件
import selectPriceTag from '../components/selectPriceTag' //牌价查询组件
export default {
  name: 'intraBankRemittanceStep1',
  components: {
    selectCountry,
    selectCode,
    SelectAccount,
    selectPriceTag
  },
  props: {
    formData1: {type: Object, default:{}},
    turnUpNums: {type:Number, default:0},
    isShowFileTable: {type:Boolean, default:false}
  },
  data() {
    return {
      maintainForm:this.$route.params,
      user: this.$tools.storage.get("user", "save"),
      conditionsList:[
        "1.我国属于外汇管制国家，申请人应提供 国家外汇管理局规定的汇款资料供银行审核， 对于不符合国家外汇法规 政策 以及跨境人民币结算有关规定 的汇款申请，我行有权拒绝办理。",
        "2.汇款人应认真填写申请书的每一栏位，对于填写不完整的我行有权拒绝办理。",
        "3.汇款人应提供清晰详尽的路线[即填写申请书中第 54/56A （如有）、57A 、59A 栏]，若由于汇款指 示不详尽、不清晰 、不正确（包括但不限于未提供或错误提供收款银行英文全称、地址 、SWIFT代码 、清算代码 ,收款人的英文全称 、账号 、地址 ,收款银行之代理名称 、SWIFT代码 、清算代码等）或字迹不清而引起的迟付错付款，责任由汇款人承担。对于汇款人没有提供收款银行之代理行的，则视为委托我行选择代理行，由此产生费用和风险，由汇款人承担。",
        "4.汇款人应尽量提供收款银行之代理行（若有）、收款银行之SWIFT代码。若汇款人无法提供SWIFT代码，将存在中间银行及收款银行收取更高的银行费用的可能性。",
        "5.如果汇款人选择承担境内外银行全部汇款费用，应在“国内外费用承担” 勾选“OUR”，如果汇款路线迂回曲折，不能保证全额到账。",
        "6.汇款申请人应当按照国家外管理局有关国际收支统计申报的规定准确全面地申报其交易情况，违反申报义务的，应当承担相应法律责任。",
        "7.我行以汇款人发出的电子付款指令为办理汇款的核发有效依据，该指令即视为汇款人正式委托我行从申请书指定的账户主动扣账并办理售付汇手续。汇款人应保证在该账户中保留足够余额，由我行直接扣收。",
        "8.我行将按照规定的手续费和电报费标准收取相关费用，售汇按我行当天或事先约定的售汇价办理。",
        "9.汇款人通过我行处理完成后汇款人对汇款的任何修改和退汇申请，必须向我行提供加盖预留印鉴的修改或退汇申请书。退汇须待我行接到有关银行证实汇款已取消后，方能办理退汇手续。",
        "10.因下列情形而引致的任何损失，我行概不负责：款项交付或通知延误，信函、票据、电报或其他文件在寄发传送途中生错误、残缺、遗漏、中断或延误，战争、检查、封锁 、政变、骚乱，本地或外国政府其行机构所实的一切法律、规令、条例、管制、制裁，委托解付汇款的代理行或其他银行的错误、疏忽或过失，其他我行难以控制之事故。",
        "11.汇款人使用我行网上银行服务应遵守与我行签署的相关服务协议的各项条款。",
        "12.以上条款在您提交交易申请时开始生效。",
      ],
      dialogVisible: false, //是否显示选择国家弹窗
      dialogVisible1: false, //是否显示交易编码弹窗
      dialogVisible2: false, //是否显示收款人账号弹窗
      dialogVisible4: false, //牌价弹窗
      dialogVisible5: false, //汇款须知弹窗
      form: {
        applyDate: this.$tools.utils.formatDate(new Date(),{"removeFormat":true}),
        flowNo: '',
        userNo: '',//操作员编号
        prepare: '',//操作员姓名
        cstNo: '',//客户号
        bsnCode: 'CB050101',//网银交易代码
        chineseRadio: true,//是否选择中文名称与地址
        chName: '',//中文名称
        chAddr: '',//中文地址
        engRadio: false,//是否选择英文名称与地址
        enName: '',//英文名称
        enAddr: '',//英文地址
        countryCode: '',//收款人常驻国家代码
        countryName: '',//收款人常驻国家名称
        countryNameAndCode: '',//收款人常驻国家名称与代码
        CRY: 'USD',//币种-核心的字段
        currencyType: '',//币种-数据库中的字段
        transAmount: '',//汇款金额
        amtCplt: '',//大写汇款金额
        cashAmount: '',//现汇金额
        spotExAcc: '',//现汇账号
        resCashAmount: '',//现汇账号余额
        exchangeAmount: '',//购汇金额
        purchasedExAcc: '',//购汇账号
        resExchangeAmount: '',//购汇账号余额
        otherAmount: '',//其他金额
        otherAcc: '',//其他账号
        resOtherAmount: '',//其他账号余额
        undertakingWay: '',//国内外费用承担方式
        contra: '',//合同号
        invNo: '',//发票号
        natureOfMoney: '',//款项性质
        natureOfPayment: '',//付款性质
        flag: '0',//本笔款项是否为保税货物项下付款
        setltBsnCode: '',//外汇局批号件/备案表号/业务编号
        tranCode1: '',//交易编码1
        transaction1: '',//相应金额1
        postscript1: '',//交易附言1
        tranCode2: '',//交易编码2
        transaction2: '',//交易金额2
        postscript2: '',//交易附言2
        remitPostscript: '',//汇款附言
        rmk: '',//汇款备注
        recAccount: '',//收款人账号
        recName: '',//收款人名称
        region: '',//收款人地址
        country: '',//收款人所在国家
        // recNameAndAddress: '',
        countryCode1: '',//收款人所在国家的邮政编码
        newFileName: '',//文件名
        file: '',//文件路径
        fileName:'', //上传文件
        inrOrOut: '0',//行内外表示：0表示行内，1表示行外
        sysCode: "CCB",//渠道表示
        countryAndCode: '',//收款人所在国家及邮政编码
        payAccount: '',//扣费账号
        payAccountName: '',//扣费账号名称
        payBank: '',//原（付款人开户银行）  改（扣费账号开户银行）
        cstName: '',//客户名称
        hostNo: '',//核心客户号
        unitCode:'',//证件号码（组织机构代码）

        recAccountBak:'',  //备份收款人账号
        isSave: false,//是否保存常用收款人
        remitType: '0',//汇款类型-添加常用收款人
        isPayAccountDisabled: false,  //扣费账号（付款账号）是否显示
        isAgree:false,

        spotExAccName:'',  //毋需保存数据库
        spotExAccOpenNode:'',  //毋需保存数据库
        purchasedExAccName:'',  //毋需保存数据库
        purchasedExAccOpenNode:'', //毋需保存数据库
        otherAccName:'',  //毋需保存数据库
        otherAccOpenNode:'',  //毋需保存数据库
        verifyPayAcc:'',  //保存数据库(需传到后台校验) 验证码付款账号
        verifyPayAccName:'',  //毋需保存数据库  验证码付款账户名
        payNode:'',  //保存数据库  付款账号开户网点
        vivCode:'',  //毋需保存数据库(需传到后台校验) 验证码
        signedData:'',  //签名要素
        timeStamps:''
      },
      tranCodeNo: '',//true为交易编码1，false为交易编码2
      spotExAccList: [],
      purchasedExAccList: [],
      otherAccList: [],
      accInfoList: [],
      payAccountList: [],
      XRTEInfo: {},
      uploadConfig: {
        isUploading: false,
        isClickUpload: false,
        isShowBtnUoload: true,
        isSuccess: false,
        fileSize: 5
      },
      isValiator1:false,  //相应金额1
      isValiator2:false,  //相应金额2
      isValiator3:false,  //现汇金额
      isValiator4:false,  //购汇金额
      rules: {
        chAddr: [
          { trigger: 'blur', validator: this.$tools.validator.disabledNonemptyValidator, vm:this, form:'form', disabled:'engRadio'}
        ],
        enAddr: [
          { trigger: 'blur', validator: this.$tools.validator.disabledNonemptyValidator, vm:this, form:'form', disabled:'chineseRadio'},
          { trigger: 'blur', validator: this.$tools.validator.isEngNumSpace }
        ],
        countryNameAndCode: [
          { trigger: 'change', validator: this.countryValidator }
        ],
        CRY: [
          { trigger: 'change', message:"请选择", required:true }
        ],
        transAmount: [
          { trigger: 'blur', message:"请输入", required:true },
          { trigger: 'blur', validator: this.AMTFiguresValidator },
        ],
        cashAmount: [
          { trigger: 'blur', validator: this.cashAmountValidator },  //现汇与购汇不能同时为空
          { trigger: 'blur', validator: this.checkAmountVaildator1},  //汇款金额 不等于 现汇金额+购汇金额
          { trigger: 'blur', validator: this.AMTFiguresValidator },  //日元不能输入小数点
        ],
        spotExAcc: [
          { trigger: 'change', validator: this.spotExAccValidator },
          { trigger: 'change', validator: this.payAccRecAccValidator }
        ],
        exchangeAmount: [
          { trigger: 'blur', validator: this.exchangeAmountValidator },  //现汇与购汇不能同时为空
          { trigger: 'blur', validator: this.checkAmountVaildator2},  //汇款金额 不等于 现汇金额+购汇金额
          { trigger: 'blur', validator: this.AMTFiguresValidator },
        ],
        purchasedExAcc: [
          { trigger: 'change', validator: this.purchasedExAccValidator },
          { trigger: 'change', validator: this.payAccRecAccValidator }
        ],
        otherAmount: [
          { trigger: 'blur', validator: this.otherAmountValidator },  //非空校验
          { trigger: 'blur', validator: this.checkAmountVaildator3 }  //汇款金额 不等于 其他金额
        ],
        otherAcc: [
          { trigger: 'change', validator: this.otherAmountValidator },
          { trigger: 'change', validator: this.payAccRecAccValidator }
        ],
        undertakingWay: [
          { trigger: 'change', message:"请选择", required:true }
        ],
        payAccount: [
          { trigger: 'blur', validator:this.$tools.validator.disabledNonemptyValidator, vm:this, form:'form', disabled:'isPayAccountDisabled' },
          { trigger: 'change', validator:this.$tools.validator.disabledNonemptyValidator, vm:this, form:'form', disabled:'isPayAccountDisabled' }
        ],
        natureOfMoney: [
          { trigger: 'change', message:"请选择", required:true }
        ],
        natureOfPayment: [
          { trigger: 'change', message:"请选择", required:true }
        ],
        tranCode1: [
          { trigger: 'blur', validator: this.tranCode1Validator }
        ],
        transaction1: [
          { trigger: 'blur', validator: this.transaction1Validator },
        ],
        tranCode2: [
          { trigger: 'blur', validator: this.tranCode2Validator }
        ],
        transaction2: [
          { trigger: 'blur', validator: this.transaction2Validator },
        ],
        remitPostscript: [
          { trigger: 'blur', message:"请输入",required:true },
          { min:1, max:140, trigger: 'blur',message:"请控制在140个字符以内"}
        ],
        recAccount: [
          { trigger: 'change', message:"请输入",required:true },
          { trigger: 'change', validator: this.$tools.validator.isAccNo },
          { trigger: 'blur', validator: this.recAccPayAccValidator }
          // { trigger: 'blur' ,validator: this.recAccountValidator}
        ],
        recName: [
          { trigger: 'change', message:"请输入",required:true },
          { trigger: 'blur' ,validator: this.recNameValidator}
        ],
        region: [
          { trigger: 'change', message:"请输入",required:true }
        ],
        countryAndCode: [
          // { trigger: 'change', validator: this.countryAndCodeValidator },
          { trigger: 'change', message:"请输入",required:true }
        ],
        fileName: [
          { trigger: 'change', validator: this.$tools.validator.fileValidator, fileType: ['zip'], configName: 'uploadConfig', vm: this, requested: false }
        ],
        isAgree:[
          {trigger: 'blur', validator:this.isAgreeValidator,required:true}
        ]
      },
    }
  },
  methods: {
    submitForm() {
      let _this = this
      // console.log($(_this.$refs['form'].$el).submit())
      _this.$refs['form'].validate((valid) => {
        if (valid) {
          let payAcc = ''
          let payeeName = ''
          let payNode = ''
          if(_this.form.CRY != "CNY"){
            if(_this.form.spotExAcc!=''){
              payAcc = _this.form.spotExAcc
              payeeName = _this.form.spotExAccName
              payNode = _this.form.spotExAccOpenNode
            }else{
              payAcc = _this.form.purchasedExAcc
              payeeName = _this.form.purchasedExAccName
              payNode = _this.form.purchasedExAccOpenNode
            }
          }else{
            payAcc = _this.form.otherAcc
            payeeName = _this.form.otherAccName
            payNode = _this.form.otherAccOpenNode
          }
          _this.form.verifyPayAcc = payAcc
          _this.form.verifyPayAccName = payeeName
          _this.form.payNode = payNode
          _this.form.currencyType = _this.form.CRY
          _this.form.country = _this.form.countryAndCode  //收款人所在国家及邮政编码 不校验输入格式
          // _this.form.country = String(_this.form.countryAndCode).split("-")[0]
          // _this.form.countryCode1 = String(_this.form.countryAndCode).split("-")[1]
          _this.form.countryName = String(_this.form.countryNameAndCode).split("-")[0]
          _this.form.countryCode = String(_this.form.countryNameAndCode).split("-")[1]
          _this.$emit("changeStep", "1", _this.form)
        } else {
          // console.log('error submit!!')
          return false
        }
      });
    },
    resetForm() {
      let _this = this
      _this.$refs['form'].resetFields()
      _this.form.chName = _this.user.cstCN
      _this.form.chAddr = _this.user.cstAddress
      _this.form.enName = _this.user.cstEN
      _this.form.enAddr = _this.user.cstAddressEN

      _this.form.rmk=""
      _this.form.recAccount=""
      _this.form.recName=""
      _this.form.region=""
      _this.form.countryAndCode=""
      _this.form.isSave=""
    },
    chineseRadioFN(val){
      let _this = this
      if (val) {
        _this.form.engRadio = !_this.form.chineseRadio
        _this.$refs['enAddr'].validate("blur")
      }
    },
    engRadioFN(val) {
      let _this = this
      if (val) {
        _this.form.chineseRadio = !_this.form.engRadio
        _this.$refs['chAddr'].validate("blur")
      }
    },
    countryValidator(rule, value, callback) {
      let _this = this
      if (String(_this.form.countryNameAndCode).indexOf("-") == -1 || !(String(_this.form.countryNameAndCode).indexOf("-") == (String(_this.form.countryNameAndCode).length - 4))) {
        callback("请填写,格式为‘国家名-邮政编码’")
      }
      callback()
    },
    AMTFiguresValidator(rule,value,callback){
      let _this = this
      if(_this.form.CRY=='JPY' && value.substring(value.indexOf(".")+1) != '00'){
        return callback('日元只能输入整数，请重新输入！')
      }
      callback()
    },
    checkAmountVaildator1(rule,value,callback){
      let _this = this
      _this.isValiator3 = false
      if(_this.form.CRY != "CNY" && value!=""){
        if(Number(_this.form.transAmount) != (Number(_this.form.cashAmount)+Number(_this.form.exchangeAmount))){
          _this.isValiator3 = true
          return callback("现汇金额+购汇金额+其他金额与汇款金额不符，请重新输入！")
        }
        if(_this.isValiator4){
          setTimeout(function(){
            _this.$refs['exchangeAmount'].validate("blur")
          },0)
        }
        callback()
      }
      callback()
    },
    checkAmountVaildator2(rule,value,callback){
      let _this = this
      _this.isValiator4 = false
      if(_this.form.CRY != "CNY" && value!=""){
        if(Number(_this.form.transAmount) != (Number(_this.form.cashAmount)+Number(_this.form.exchangeAmount))){
          _this.isValiator4 = true
          return callback("现汇金额+购汇金额+其他金额与汇款金额不符，请重新输入！")
        }
        if(_this.isValiator3){
          setTimeout(function(){
            _this.$refs['cashAmount'].validate("blur")
          },0)
        }
        callback()
      }
      callback()
    },
    checkAmountVaildator3(rule,value,callback){
      let _this = this
      if(_this.form.CRY == "CNY"){
        if(Number(_this.form.transAmount) != Number(_this.form.otherAmount)) return callback("现汇金额+购汇金额+其他金额与汇款金额不符，请重新输入！")
        callback()
      }
      callback()
    },
    cashAmountValidator(rule, value, callback) {
      let _this = this
      if (_this.form.CRY != 'CNY') {
        if (($.trim(value)=="") && (_this.form.exchangeAmount == '' || _this.form.purchasedExAcc == '')) {
          return callback("现汇与购汇不能全为空")
        }else if(($.trim(value)=="") && _this.form.spotExAcc!=""){
          return callback("现汇金额与现汇账号需同时填写或同时为空")
        }else if(($.trim(value)=="") && _this.form.spotExAcc==""){
          setTimeout(function(){
            _this.$refs['spotExAcc'].validate("change")
          },0)
        }
        callback()
      }
      callback()
    },
    spotExAccValidator(rule, value, callback) {
      let _this = this
      if (_this.form.CRY != 'CNY') {
        if (($.trim(value)=="") && (_this.form.exchangeAmount == '' || _this.form.purchasedExAcc == '')) {
          return callback("现汇与购汇不能全为空")
        }else if(($.trim(value)=="") && _this.form.cashAmount!=""){
          return callback("现汇金额与现汇账号需同时填写或同时为空")
        }
        callback()
      }
      callback()
    },
    exchangeAmountValidator(rule, value, callback) {
      let _this = this
      if (_this.form.CRY != 'CNY') {
        if (($.trim(value)=="") && (_this.form.cashAmount == '' || _this.form.spotExAcc == '')) {
          return callback("现汇与购汇不能全为空")
        }else if(($.trim(value)=="") && _this.form.purchasedExAcc!=""){
          return callback("购汇金额与购汇账号需同时填写或同时为空")
        }else if(($.trim(value)=="") && _this.form.purchasedExAcc==""){
          setTimeout(function(){
            _this.$refs['purchasedExAcc'].validate("change")
          },0)
        }
        callback()
      }
      callback()
    },
    purchasedExAccValidator(rule, value, callback) {
      let _this = this
      if (_this.form.CRY != 'CNY') {
        if (($.trim(value)=="") && (_this.form.cashAmount == '' || _this.form.spotExAcc == '')) {
          return callback("现汇与购汇不能全为空")
        }else if(($.trim(value)=="") && _this.form.exchangeAmount!=""){
          return callback("购汇金额与购汇账号需同时填写或同时为空")
        }
        callback()
      }
      callback()
    },
    otherAmountValidator(rule, value, callback) {
      let _this = this
      if (_this.form.CRY == 'CNY' && $.trim(value) == "") {
        callback("请输入")
      }
      callback()
    },
    payAccRecAccValidator(rule, value, callback) {
      let _this = this
      if($.trim(value)!='' && value==_this.form.recAccount){
        return callback("收款人账号与付款人账号不能相同")
      }
      callback()
    },
    recAccPayAccValidator(rule, value, callback) {
      let _this = this
      if(_this.form.spotExAcc==value || _this.form.purchasedExAcc==value || _this.form.otherAcc==value){
        return callback("收款人账号与付款人账号不能相同")
      }
      callback()
    },
    tranCode1Validator(rule, value, callback) {  //交易编码1
      let _this = this
      if (_this.form.tranCode1 == "" && (_this.form.transaction1 != '' || _this.form.postscript1 != '')) {
        callback("请输入")
      } else if (_this.form.tranCode1 == "" || _this.form.tranCode1.length == 6) {
        _this.$refs['transaction1'].validate("blur")
        callback()
      } else {
        callback("格式有误")
      }
    },
    transaction1Validator(rule, value, callback) {  //相应金额1
      let _this = this
      _this.isValiator1 = false
      if (_this.form.transaction1 == "" && (_this.form.tranCode1 != '' || _this.form.postscript1 != '')) {
        callback("请输入")
      }else if(_this.form.transAmount!="" && _this.form.transaction1 != "" && (Number(_this.form.transaction1)+Number(_this.form.transaction2)) != Number(_this.form.transAmount)){
        _this.isValiator1 = true
        callback("交易编码对应金额之和应等于汇款金额，请重新输入！")
      }else if(_this.form.transAmount!="" && _this.form.transaction1 != "" && (Number(_this.form.transaction1)+Number(_this.form.transaction2)) == Number(_this.form.transAmount)){
        if(_this.isValiator2){
          setTimeout(function(){
            _this.$refs['transaction2'].validate("blur")
          },0)
        }
        callback()
      }
      callback()
    },
    tranCode2Validator(rule, value, callback) {  //交易编码2
      let _this = this
      if (_this.form.tranCode2 == '' && (_this.form.transaction2 != '' || _this.form.postscript2 != '')) {
        callback("请输入")
      } else if (_this.form.tranCode2 == '' || _this.form.tranCode2.length == 6) {
        _this.$refs['transaction2'].validate("blur")
        callback()
      } else {
        callback("格式有误")
      }
    },
    transaction2Validator(rule, value, callback) {  //相应金额2
      let _this = this
      _this.isValiator2 = false
      if (_this.form.transaction2 == "" && (_this.form.tranCode2 != '' || _this.form.postscript2 != '')) {
        callback("请输入")
      }else if(_this.form.transAmount!="" && _this.form.transaction2 != "" && (Number(_this.form.transaction1)+Number(_this.form.transaction2)) != Number(_this.form.transAmount)){
        _this.isValiator2 = true
        callback("交易编码对应金额之和应等于汇款金额，请重新输入！")
      }else if(_this.form.transAmount!="" && _this.form.transaction2 != "" && (Number(_this.form.transaction1)+Number(_this.form.transaction2)) == Number(_this.form.transAmount)){
        if(_this.isValiator1)
        setTimeout(function(){
          _this.$refs['transaction1'].validate("blur")
        },0)
        callback()
      }
      callback()
    },
    recAccountValidator(rule,value,callback){
      let _this = this
      _this.$tools.request(_this,"CB050105.do",{accNo:value}).then(data =>{
        let errorCode = data.body.errorCode
        let errorMsg = data.body.errorMsg
        if(errorCode!='0'){
          return callback("非我行账号，请核实后重新输入！")
        }else if(errorCode=='ESB-E-000001' || errorCode=='ESB-E-000042' || errorCode=='ESB-E-000052'){
          setTimeout(function(){
            _this.$refs['recAccount'].validate("blur")
          },0)
        }
        callback()
      })
    },
    recNameValidator(rule,value,callback){
      let _this = this
      _this.$tools.request(_this,"CB050105.do",{accNo:_this.form.recAccount,cstName:_this.form.recName}).then(data =>{
        let errorCode = data.body.errorCode
        let errorMsg = data.body.errorMsg
        if(errorCode=='ESB-E-000001' || errorCode=='ESB-E-000042' || errorCode=='ESB-E-000052'){
          setTimeout(function(){
            _this.$refs['recAccount'].validate("blur")
          },0)
        }else if(errorCode!='0'){
          return callback("收款账号与收款人名称不符，请核实后重新输入！")
        }
        callback()
      })
    },
    countryAndCodeValidator(rule, value, callback) {
      let _this = this
      if (_this.form.countryAndCode.indexOf("-") <= 1){
        return callback("请填写,格式为‘国家名-邮政编码’")
      }else{
        let val1 = _this.form.countryAndCode.split("-")[0]
        let val2 = _this.form.countryAndCode.split("-")[1]
        if(_this.$tools.validator.isNumEng(val2) || $.trim(val1)=="" || $.trim(val2)=="") return callback("请填写,格式为‘国家名-邮政编码’")
        // if(_this.$tools.validator.isUnion(val1) || _this.$tools.validator.isNumEng(val2) || $.trim(val1)=="" || $.trim(val2)=="") return callback("请填写,格式为‘国家名-邮政编码’")
        callback()
      }
    },
    isAgreeValidator(rule,value,callback){
      let _this = this
      if(!value) return callback('请同意《汇款须知》')
      // if(!value) return callback('请阅读并同意《境内汇款申请书》')
      callback()
    },
    isAgreeCheckboxChage(val){
      let _this = this
      // setTimeout(function(){
        if(_this.form.isAgree) _this.$refs['isAgree'].validate("blur")
      // },0)
    },
    countryNameAndCodeBlur(){
      let _this = this
      if(_this.form.countryNameAndCode=='中华人民共和国/China-CHN'){
        _this.form.postscript1 = ''
        _this.form.postscript2 = ''
      }
    },
    selectCountry1(val) {
      let _this = this
      if (val != null && val != undefined && JSON.stringify(val)!='{}') {
        _this.form.countryNameAndCode = val.countryName + "-" + val.countryCode
      }
      _this.countryNameAndCodeBlur()
      _this.dialogVisible = false
    },
    selectCode(val) {
      let _this = this
      _this.tranCodeNo = val
      _this.dialogVisible1 = true

    },
    selectCode1(val) {
      let _this = this
      _this.dialogVisible1 = false
      if (val.length > 0) {
        if (_this.tranCodeNo) {
          _this.form.tranCode1 = val[0].trancode
        } else {
          _this.form.tranCode2 = val[0].trancode
        }
      }
    },
    selectAccount1(val) {
      let _this = this
      if (val != null && val != undefined && JSON.stringify(val)!='{}') {
        _this.form.recAccount = val.acctNo
        _this.form.recAccountBak = val.acctNo
        _this.form.recName = val.acctNmAndAddr.split("-")[0]
        _this.form.region = val.acctNmAndAddr.split("-")[1]
        _this.form.countryAndCode = val.country
      }
      _this.dialogVisible2 = false
    },
    search1() {
      let _this = this
      if(_this.form.spotExAcc==""){
        _this.$alert('请选择查询账号','温馨提示',{
          confirmButtonText: '确定'
        })
      }else{
        let form = {}
        form.accNo = _this.form.spotExAcc
        _this.$tools.request(_this, "CB000001.do", form).then(
          data => {
            if(data.body.errorCode=='0') _this.form.resCashAmount = data.body.accNoList[0].ACCT_BAL
            else _this.$alert(data.body.errorMsg,"温馨提示")
          }
        )
      }
    },
    search2() {
      let _this = this
      if(_this.form.purchasedExAcc==""){
        _this.$alert('请选择查询账号','温馨提示',{
          confirmButtonText: '确定'
        })
      }else{
        let form = {}
        form.accNo = _this.form.purchasedExAcc
        _this.$tools.request(_this, "CB000001.do", form).then(
          data => {
            if(data.body.errorCode=='0') _this.form.resExchangeAmount = data.body.accNoList[0].ACCT_BAL
            else _this.$alert(data.body.errorMsg,"温馨提示")
          }
        )
      }
    },
    search3() {
      let _this = this
      if(_this.form.otherAcc==""){
        _this.$alert('请选择查询账号','温馨提示',{
          confirmButtonText: '确定'
        })
      }else{
        let form = {}
        form.accNo = _this.form.otherAcc
        _this.$tools.request(_this, "CB000001.do", form).then(
          data => {
            if(data.body.errorCode=='0') _this.form.resOtherAmount = data.body.accNoList[0].ACCT_BAL
            else _this.$alert(data.body.errorMsg,"温馨提示")
          }
        )
      }
    },
    delAmountRange(){
      let _this = this
      _this.$confirm("确定删除已上传的文件，重新上传文件？","温馨提示",{
        confirmButtonText:"确定",
        cancelButtonText:"取消",
        type:'warning'
      }).then(() =>{
        _this.form.newFileName = ''
        _this.form.file = ''
        _this.$emit("showFileTable",false)
      }).catch(() =>{

      })
    },
    uploadInput(value){
      let _this = this
      if(!_this.uploadConfig.isSuccess) _this.form.newFileName = value.substring(value.lastIndexOf('\\')+1)
    },
    uploadSuccess(data) {
      let _this = this
      if(data.body.status=='S'){
        _this.form.file = data.body.saveFilePath
        _this.form.fileName = ''
      }
    },
    changeCRY(val) {
      let _this = this
      if (val == "CNY") {
        _this.form.exchangeAmount = ''
        _this.form.purchasedExAcc = ''
        _this.form.purchasedExAccName = ''
        _this.form.purchasedExAccOpenNode = ''
        _this.$refs['cashAmount'].validate("blur")
        _this.$refs['spotExAcc'].validate("change")
        _this.$refs['exchangeAmount'].validate("blur")
        _this.$refs['purchasedExAcc'].validate("change")
      }else if (val != "CNY") {
        _this.form.otherAmount = ''
        _this.form.otherAcc = ''
        _this.form.otherAccName = ''
        _this.form.otherAccOpenNode = ''
        _this.$refs['otherAmount'].validate("blur")
        _this.$refs['otherAcc'].validate("change")
      }
      _this.form.cashAmount = ''
      _this.form.spotExAcc = ''
      _this.form.spotExAccName = ''
      _this.form.spotExAccOpenNode = ''

      _this.form.resCashAmount = ''
      _this.form.resExchangeAmount = ''
      _this.form.resOtherAmount = ''
      _this.purchasedExAccList = []
      _this.otherAccList = []
      _this.spotExAccList = []
      _this.payAccountList = []
      _this.getAccountList()
    },
    selectSpotExAcc(val){
      let _this = this
      for(let index in _this.spotExAccList){
        if(val == _this.spotExAccList[index].accNo){
          _this.form.spotExAccName = _this.spotExAccList[index].accName
          _this.form.spotExAccOpenNode = _this.spotExAccList[index].openBankNo
          break
        }
      }
      _this.form.resCashAmount = ''
    },
    selectPurchasedExAcc(val){
      let _this = this
      for(let index in _this.purchasedExAccList){
        if(val == _this.purchasedExAccList[index].accNo){
          _this.form.purchasedExAccName = _this.purchasedExAccList[index].accName
          _this.form.purchasedExAccOpenNode = _this.purchasedExAccList[index].openBankNo
          break
        }
      }
      _this.form.resExchangeAmount = ''
    },
    selectOtherAcc(val){
      let _this = this
      for(let index in _this.otherAccList){
        if(val == _this.otherAccList[index].accNo){
          _this.form.otherAccName = _this.otherAccList[index].accName
          _this.form.otherAccOpenNode = _this.otherAccList[index].openBankNo
          break
        }
      }
      _this.form.resOtherAmount = ''
    },
    selectPayAccount(val){
      let _this = this
      for(let index in _this.payAccountList){
        if(val == _this.payAccountList[index].accNo){
          _this.form.payAccountName = _this.payAccountList[index].accName
          _this.form.payBank = _this.payAccountList[index].openBankName
          break
        }
      }
    },
    changeUndertakingWay() {
      let _this = this
      if (_this.form.undertakingWay == '1') {
        _this.form.payAccount = ''
        _this.form.payAccountName = ''
        _this.form.payBank = ''
        _this.form.isPayAccountDisabled = true
        _this.$refs['payAccount'].validate("blur")
      }else{
        _this.form.isPayAccountDisabled = false
      }
    },
    saveAccountBak(){
      let _this = this
      _this.form.recAccountBak = _this.form.recAccount
    },
    isSaveChange(){
      let _this = this
      if(_this.form.isSave && _this.form.recAccount!=''){
        let body = {}
        _this.saveAccountBak()
        body.acctNo = _this.form.recAccountBak
        _this.$tools.request(_this,"CB05060105.do",body).then(data =>{
          if(data.body.count!=null && data.body.count!=undefined && data.body.count!=''){
            if(Number(data.body.count)>=1){
              _this.$confirm('该收款账号在系统中已经存在，是否覆盖？','温馨提示',{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
              }).catch(() => {
                _this.form.isSave=false
              })
            }
          }
        })
      }
    },
    getAccountList(){
      let _this = this
      for (let index in _this.accInfoList) {
        // if ((_this.accInfoList[index].type)==201 ||(_this.accInfoList[index].type)==911||(_this.accInfoList[index].type)==901||(_this.accInfoList[index].type)==202||(_this.accInfoList[index].type)==206){
        if ((_this.accInfoList[index].type=='1') && _this.accInfoList[index].right.substr(0,1)=='1' && _this.accInfoList[index].cstNo==_this.user.cstNo && _this.accInfoList[index].auth=='2') {
          _this.payAccountList.push(_this.accInfoList[index])
          if ((_this.accInfoList[index].currType) == "CNY") {
            _this.purchasedExAccList.push(_this.accInfoList[index])
            _this.otherAccList.push(_this.accInfoList[index])
          }else if(_this.accInfoList[index].currType == _this.form.CRY && _this.form.CRY != "CNY"){
            _this.spotExAccList.push(_this.accInfoList[index])  //现汇账号币种 == 汇款币种
          }
        }
      }
    }
  },
  mounted() {
    let _this = this
    _this.accInfoList = _this.user.operAccInfoList
    _this.getAccountList()
    if(JSON.stringify(_this.maintainForm)!='{}'&&_this.turnUpNums==0){
      _this.form = $.extend({},_this.form,_this.maintainForm.remitInfoList[0])
      _this.form = $.extend({},_this.form,{oldSqno:_this.maintainForm.oldSqno,operateFlag:_this.maintainForm.operateFlag})
      _this.form.CRY = _this.form.currencyType
      if(_this.form.chAddr!="") {_this.form.chineseRadio = true;_this.form.engRadio = false;_this.form.enAddr = _this.user.cstAddressEN}
      else {_this.form.chineseRadio = false;_this.form.engRadio = true;_this.form.chAddr = _this.user.cstAddress}
      if(_this.form.undertakingWay=='1') _this.form.isPayAccountDisabled = true
      _this.form.countryNameAndCode = _this.form.countryName + "-" + _this.form.countryCode
      // _this.form.countryAndCode = _this.form.country + "-" + _this.form.countryCode1
      _this.form.countryAndCode = _this.form.country+_this.form.countryCode1
      _this.selectSpotExAcc(_this.form.spotExAcc)
      _this.selectPurchasedExAcc(_this.form.purchasedExAcc)
      _this.selectOtherAcc(_this.form.otherAcc)
      _this.form.remitPostscript = _this.$tools.validator.unescapeHTML(_this.form.remitPostscript)
      _this.form.rmk = _this.$tools.validator.unescapeHTML(_this.form.rmk)
      if(_this.form.file!='') _this.$emit("showFileTable",true)
    }else{
      _this.form.chAddr = _this.user.cstAddress
      _this.form.enAddr = _this.user.cstAddressEN
      _this.form = $.extend({}, _this.form, _this.formData1)   //从父组件传来的值可能是空或对象
    }
    _this.form.chName = _this.user.cstCN 
    _this.form.enName = _this.user.cstEN
    _this.form.cstNo = _this.user.cstNo //客户号
    _this.form.hostNo = _this.user.hostNo//核心客户号
    _this.form.userNo = _this.user.eCIFID //操作员编号
    _this.form.prepare = _this.user.userName //操作员姓名
    _this.form.bsnCode = "CB050101"
    _this.form.cstName = _this.user.cstCN
    if(_this.user.cstCertType=='201'){
      _this.form.unitCode = _this.user.cstCertNo
    }else if(_this.user.cstCertNo.length>=17){
      _this.form.unitCode = _this.user.cstCertNo.substring(8,17)
    }
  }
}
</script>
<style>
#internationTable  td:nth-child(odd){width:130px;}
.lh28 .el-input__inner{height:28px !important;}
</style>