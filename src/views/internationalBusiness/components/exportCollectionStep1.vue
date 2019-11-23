<template>
<div class="exportCollectionStep">
      <!--table布局-->
      <el-form ref="form" :model="form" :rules="rules" class="formEmbedTable mt20">
        <table>
          <caption style="height:25px;line-height:25px;padding-top:5px;">Collecting Bank</caption>
          <caption style="height:25px;line-height:25px;padding-bottom:5px;">出口托收信息</caption>
          <tr>
            <td>
              <p><span class="cRed">*</span>Collecting Bank (Full name & address & SWIFT)</p>
              <p>代收行（SWIFT、全称和地址）</p>
            </td>
            <td colspan="3">
              <a class="cOrange m15" @click="dialogVisible2 = true"><i class="el-icon-search"/>Swift 代码查询</a><br/>
              <el-form-item  prop="collectingBankAll" style="margin-top:5px;">
                <el-input class="collectingBankAll" type="textarea" :autosize="{ minRows: 3, maxRows: 6}" v-model="form.collectingBankAll" placeholder="第一行SWIFT CODE、第二行全称、第三行地址"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>
              <p><span class="cRed">*</span>Drawer(Full name & address)</p>
              <p>收款人（全称和地址）</p>
            </td>
            <td colspan="3">
              <span>{{form.drawerName}}</span><br/>
              <el-form-item  prop="drawerAddr" style="margin-top:5px;">
                <el-input v-model="form.drawerAddr" type="textarea" placeholder="请输入收款人地址" style="width:600px">{{form.drawerAddr}}</el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>
              <p><span class="cRed">*</span>Drawee(Full name & address)</p>
              <p>付款人（全称和地址）</p>
            </td>
            <td colspan="3">
              <el-form-item  prop="draweeAll">
                <el-input type="textarea"  v-model="form.draweeAll" placeholder="第一行全称、第二行地址"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr class="w200">
            <td>
              <p><span class="cRed">*</span>Tenor</p>
              <p>付款期限(天)</p>
            </td>
            <td>
              <el-form-item  prop="tenor">
                <el-input v-model="form.tenor" placeholder="付款期限"></el-input>
              </el-form-item>
            </td>
            <td>
              <p><span class="cRed">*</span>Draft/Inv no.</p>
              <p>汇票/发票号码</p>
            </td>
            <td>
              <el-form-item  prop="invNo">
                <el-input type="textarea" :rows="1" v-model="form.invNo"  placeholder="汇票/发票号码"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>
              <p><span class="cRed">*</span>Currency</p>
              <p>币种</p>
            </td>
            <td>
              <el-form-item  prop="CRY">
                <el-select placeholder="请选择" clearable v-model="form.CRY">
                  <el-option v-for="item in CRYOptions" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </td>
            <td>
              <p><span class="cRed">*</span>Amount</p>
              <p>金额</p>
            </td>
            <td>
              <el-form-item  prop="amt">
                <ynet-currency-input v-model="form.amt" name="amount" placeholder="汇款金额" :showChinese="false"></ynet-currency-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>
              <p><span class="cRed">*</span>Brief Goods Description</p>
              <p>货物简述</p>
            </td>
            <td colspan="3">
              <el-form-item  prop="goodsDesc">
                <el-input v-model="form.goodsDesc" type="textarea" placeholder="货物简述"></el-input>
              </el-form-item>
            </td>
          </tr>
        </table>
        <table class="textCenter">
          <caption style="height:25px;line-height:25px;padding-top:5px;"><span class="cRed">*</span>Documents</caption>
          <caption style="height:25px;line-height:25px;padding-bottom:5px;">&nbsp;&nbsp;单据</caption>
          <tr class="resetPadding">
            <th>
              <p>DRAFT</p>
              <p>汇票</p>
            </th>
            <th>
              <p>INV.</p>
              <p>发票</p>
            </th>
            <th>
              <p>PACKING LIST</p>
              <p>装箱单</p>
            </th>
            <th>
              <p>WEIGHT LIST</p>
              <p>重量单</p>
            </th>
            <th>
              <p>B/L</p>
              <p>提单</p>
            </th>
            <th>
              <p>AWB</p>
              <p>航空运单</p>
            </th>
            <th>
              <p>ORIGIN CERT.</p>
              <p>产地证明书</p>
            </th>
            <th>
              <p>INS. POL.</p>
              <p>保单</p>
            </th>
            <th>
              <p>CERT.</p>
              <p>证明书</p>
            </th>
          </tr>
          <tr class="bgWhite resetPadding">
            <td>
              <el-form-item prop="orglDraft">
                <el-input v-model="form.orglDraft" class="w28"></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item prop="orglInvNo">
                <el-input v-model="form.orglInvNo" class="w28"></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item prop="orglPacking">
                <el-input v-model="form.orglPacking" class="w28"></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item prop="orglWeight">
                <el-input v-model="form.orglWeight" class="w28"></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item prop="orglBl">
                <el-input v-model="form.orglBl" class="w28"></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item prop="orglAwb">
                <el-input v-model="form.orglAwb" class="w28"></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item prop="orglOrigin">
                <el-input v-model="form.orglOrigin" class="w28"></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item prop="orglIns">
                <el-input v-model="form.orglIns" class="w28"></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item prop="orglCert">
                <el-input v-model="form.orglCert" class="w28"></el-input>
              </el-form-item>
            </td>
          </tr>
        </table>
        <table class="textCenter">
          <tr class="resetPadding">
            <th>
              <el-form-item  prop="otherInput1">
                <el-input v-model="form.otherInput1" placeholder="OTHER1" ></el-input>
              </el-form-item>
            </th>
            <th>
              <el-form-item  prop="otherInput2">
                <el-input v-model="form.otherInput2" placeholder="OTHER2" ></el-input>
              </el-form-item>
            </th>
          </tr>
          <tr class="bgWhite resetPadding">
            <td>
              <el-form-item prop="orglOther1">
                <el-input v-model="form.orglOther1"></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item prop="orglOther2">
                <el-input v-model="form.orglOther2"></el-input>
              </el-form-item>
            </td>
          </tr>
        </table>
        <!--新增部分:特殊条款-->
        <table>
          <tr>
            <td colspan="4" class="tableEvenText">
              <p class="mb10"><span>Special Instructions (See box marked '√'): </span><br/><span>特殊条款（用“√”在方框中标明）: </span></p>
                <el-form-item  prop="Inst1" ref="Inst1" style="margin-right:10px;">
                  <el-checkbox v-model="form.Inst1"  @change="Inst1CheckboxChange" true-label="1" style="inline-block;height:20px;line-height:20px;">
                    <div style="display:inline-block;"><span class="cRed">*</span><span>Please deliver documents against</span></div>
                  </el-checkbox>
                </el-form-item>
                <el-form-item  prop="transType" ref="transType">
                  <el-radio-group v-model="form.transType" :disabled="disabledForm.Inst1Disabled" @change="transTypeChange">
                    <el-radio label="a">payment at sight</el-radio>
                    <el-radio label="b">payment after</el-radio>
                    <el-form-item prop="payDay2" ref="payDay2"><el-input v-model="form.payDay2" :disabled="disabledForm.InstInputDisabled2" style="width:85px;"></el-input>
                    <span style="padding-left:3px;margin-right:10px;">sight</span></el-form-item>
                    <el-radio label="c">acceptance at </el-radio>
                    <el-form-item prop="payDay3" ref="payDay3"><el-input v-model="form.payDay3" :disabled="disabledForm.InstInputDisabled3" style="width:85px;"></el-input></el-form-item>
                  </el-radio-group>
                </el-form-item>
                <div class="chText"><span class="cRed">*</span>请办理: 即期付款交单 / ________日远期付款交单 / _________日承兑交单。</div>
                <el-checkbox v-model="form.Inst2"  @change="Inst2CheckboxChange"  true-label="1" ref="Inst2"  prop="Inst2" style="inline-block;height:20px;line-height:20px;">
                  <span>All your charges are to be borne by</span>
                </el-checkbox>
                <el-form-item  prop="payType" ref="payType">
                  <el-radio-group v-model="form.payType" :disabled="disabledForm.Inst2Disabled">
                    <el-radio label="a">the drawee</el-radio>
                    <el-radio label="b">us.</el-radio>
                  </el-radio-group>
                </el-form-item>
                <div class="chText">贵行所有费用由:付款人 / 我司承担。</div>
                <el-checkbox v-model="form.Inst3" true-label="1" ref="Inst3" prop="Inst3">
                  <span>Acceptance/payment may wait until arrival of carrying vessel.</span>
                </el-checkbox><br/>
                <div class="chText">可在货船到达目的港后才要求买方承兑汇票/付款。</div>
                <el-checkbox v-model="form.Inst4" true-label="1" ref="Inst4" prop="Inst4">
                  <span>In case of a time bill, please advise us of acceptance giving maturity date.</span>
                </el-checkbox><br/>
                <div class="chText">如果托收包含远期汇票，请通知我司承兑到期日。</div>
                <el-checkbox v-model="form.Inst5" true-label="1" ref="Inst5" prop="Inst5">
                  <span>In case of dishonour, do not protest but advise us the reasons of non-payment/non-acceptance.</span>
                </el-checkbox><br/>
                <div class="chText">如发生拒付，无需安排拒绝证书但应通知我司拒绝付款或拒绝承兑的原因。</div>
                <el-checkbox v-model="form.Inst6" true-label="1" ref="Inst6" prop="Inst6">
                  <span>Please instruct the Collecting Bank to release the documents only upon receipt of all their banking charges.</span>
                </el-checkbox><br/>
                <div class="chText">请指示代收行收妥全部银行费用后才交付单据。</div>
                <el-checkbox v-model="form.Inst7" true-label="1" ref="Inst7" prop="Inst7">
                  <span>Full responsibility is on our part in respect of your appointment of the Collecting Bank chosen by us.</span>
                </el-checkbox><br/>
                <div class="chText">请选用我司选定的代收行，由此而引起的一切问题和后果概由我司负责。</div>
                <el-checkbox v-model="form.otherInst" true-label="1"  @change="onChange(form.otherInst)" ref="otherInst" prop="otherInst"><span>Other instructions:</span></el-checkbox>
                <div class="chText">其他指示:</div>
                <el-form-item ref="otherInstInput" prop="otherInstInput" class="chText">
                  <el-input v-model="form.otherInstInput" type="textarea" :autosize="{ minRows: 3, maxRows: 3}" :disabled="disabledForm.otherInstDisabled" style="width:795px;"></el-input>
                </el-form-item>
            </td>
          </tr>
        </table>
        <table>
          <tr class="bgWhite">
            <td  class="tableEvenText">
              <p class="mb10"><span>Disposal of proceeds upon collection</span><br/><span>款项收妥后，请按照以下要求办理</span></p>
              <p class="mb10"><span class="cRed">*</span><span>Credit to our current account No.</span>
              <el-form-item prop="payAccNo" ref="payAccNo">
                <el-select v-model="form.payAccNo">
                  <el-option value="" label="-----请选择-----"></el-option>
                  <el-option v-for="item in options" :label="item.accNo+' ['+ $tools.dict.currTypeDict(item.currType) +']'+' ['+(item.alias==''?item.accName:item.alias)+']'" :value="item.accNo"></el-option>   
                </el-select>
              </el-form-item><br/><span>贷记我方账户/账号</span></p>
            </td>
          </tr>
        </table>
        <div class="chText">
          <span class="cRed">*</span><span>联系人：</span>
          <el-form-item prop="linkMan">
            <el-input v-model="form.linkMan" style="width:230px;"></el-input>
          </el-form-item>
          <span class="cRed">*</span><span>电话：</span>
          <el-form-item prop="linkPhone">
            <el-input v-model="form.linkPhone" style="width:230px;"></el-input>
          </el-form-item>
          <span class="cRed">*</span><span>传真：</span>
          <el-form-item prop="linkFax">
            <el-input v-model="form.linkFax" style="width:230px;"></el-input>
          </el-form-item>
        </div>
        <div class="btnArea mt20 tac">
          <el-button type="primary" @click="submitForm()">下一步</el-button>
          <el-button @click="resetForm()">重置</el-button>
        </div>
      </el-form>
      <div>
        温馨提示：</br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;单据填写格式可由* / () - ~  数字与大写字母组成，最长15位，例如：</br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2： 两份正本；</br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2/3： 三份正本的两份；</br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3+3C：三份正本+三份副本；</br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3/3+3C： 三份正本的三份+三份副本；</br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2*(1+1C)：两套不同单据的一正本+一副本</br>
      </div>
      <!--table布局-->
      <!-- swift代码 -->
      <div v-if="dialogVisible2">
          <selectSwift @selectSwift="selectSwift"></selectSwift>
      </div>
      <!-- swift代码end -->
</div>
</template>

<script>
import selectSwift from '../components/selectSwift' //swift查询组件
export default {
  name:'exportCollectionStep1',
  components: {
    selectSwift
  },
  data() {
    return {
      form: {
        cstNo:this.$tools.storage.get("user","save").cstNo,
        eCIFID:this.$tools.storage.get("user","save").eCIFID,
        oprName:this.$tools.storage.get("user","save").alias,
    	  sequenceNo:'',
        bsnCode:'',
        collectingBankAll:'',
        swiftCode:'',
        cbBank:'',
        cbAddr:'',
        //drawerAll:'',
        drawerName:this.$tools.storage.get("user","save").cstEN,
        drawerAddr:this.$tools.storage.get("user","save").cstAddressEN,
        draweeAll:'',
        draweeName:'',
        draweeAddr:'',
        tenor:'',
        allNO:'',
        draftNo:'',
        invNo:'',
        CRY:'',
        amt:'',
        goodsDesc:'',
        orglDraft:'',
        orglInvNo:'',
        orglPacking:'',
        orglWeight:'',
        orglBl:'',
        orglAwb:'',
        orglOrigin:'',
        orglIns:'',
        orglCert:'',
        otherInput1:'',
        otherInput2:'',
        orglOther1:'',
        orglOther2:'',
        createDate:'',
        status:'',
        channel:'',
        busCode:'',
        signedData:'',  //签名要素
        timeStamps:'',
        //以下为新增字段,其他条款
        Inst1:'',
        transType:'',
        payDay2:'',
        payDay3:'',
        Inst2:'',
        payType:'',
        Inst3:'',
        Inst4:'',
        Inst5:'',
        Inst6:'',
        Inst7:'',
        otherInst:'',//其他指示
        otherInstInput:'',//其他指示内容
        payAccNo:'',//付款账号
        linkMan:'',//联系人
        linkPhone:'',//电话
        linkFax:'',//传真
      },
      dialogVisible2:false,
      disabledForm:{
        Inst1Disabled:true,
        InstInputDisabled2:true,
        InstInputDisabled3:true,
        Inst2Disabled:true,
        otherInstDisabled:true,
      },
      options:[],//扣费账号数组（活期结算账号）
      rules: {
        collectingBankAll: [
          { required: true, message: '请输入代收行信息', trigger: 'blur' },
          {trigger: 'blur', validator:this.$tools.validator.fieldsCollection,fieldList:['swiftCode','cbBank','cbAddr'],vm:this},
          {trigger: 'blur', validator:this.colValidator}
        ],
        drawerAll: [
          { required: true, message: '请输入收款人信息', trigger: 'blur' },
          {trigger: 'blur', validator:this.$tools.validator.fieldsCollection,fieldList:['drawerName','drawerAddr'],vm:this},
          {trigger: 'blur', validator:this.invValidator}
        ],
        drawerAddr: [
          { required: true, message: '请输入收款人地址', trigger: 'blur' },
          {trigger: 'blur', validator:this.invValidator}
        ],
        draweeAll: [
          { required: true, message: '请输入付款人信息', trigger: 'blur' },
          {trigger: 'blur', validator:this.$tools.validator.fieldsCollection,fieldList:['draweeName','draweeAddr'],vm:this},
          {trigger: 'blur', validator:this.invValidator}
        ],
        // allNO: [
        //   { required: true, message: '请输入汇票/发票号码', trigger: 'blur' },
        //   {trigger: 'blur', validator:this.$tools.validator.fieldsCollection,fieldList:['draftNo','invNo'],vm:this},
        // ],
        invNo: [
          { required: true, message: '请输入汇票/发票号码', trigger: 'blur' },
          {trigger: 'blur', validator:this.invValidator}
        ],
        tenor: [
          { required: true, message: '请输入托收期限', trigger: 'blur' },
          {trigger: 'blur', validator:this.$tools.validator.isInteger}
        ],
        CRY: [
          { required: true, message: '请选择币种', trigger: 'change' }
        ],
        amt: [
          { required: true, message: '请输入交易金额', trigger: 'blur' },
          { trigger: 'blur', validator:this.$tools.validator.isTranAmount }
        ],
        goodsDesc: [
          { required: true, message: '请输入货物描述', trigger: 'blur' },
          {trigger: 'blur', validator:this.invValidator}
        ],
        otherInput1: [
          { trigger: 'blur', validator:this.otherInputValidator },
          { trigger: 'blur', validator:this.docValidator,fieldList:['otherInput1','orglOther1'],vm:this,formName:'form'}
        ],
        otherInput2: [
          { trigger: 'blur', validator:this.otherInputValidator },
          { trigger: 'blur', validator:this.docValidator,fieldList:['otherInput2','orglOther2'],vm:this,formName:'form'}
        ],
        orglDraft: [
          { required: true, message: '请输入单据信息', trigger: 'blur' },
          { trigger: 'blur', validator:this.invoiceValidator }
        ],
        orglInvNo: [
          { required: true, message: '请输入单据信息', trigger: 'blur' },
          { trigger: 'blur', validator:this.invoiceValidator }
        ],
        orglPacking: [
          { required: true, message: '请输入单据信息', trigger: 'blur' },
          { trigger: 'blur', validator:this.invoiceValidator }
        ],
        orglWeight: [
          { required: true, message: '请输入单据信息', trigger: 'blur' },
          { trigger: 'blur', validator:this.invoiceValidator }
        ],
        orglBl: [
          { required: true, message: '请输入单据信息', trigger: 'blur' },
          { trigger: 'blur', validator:this.invoiceValidator }
        ],
        orglAwb: [
          { required: true, message: '请输入单据信息', trigger: 'blur' },
          { trigger: 'blur', validator:this.invoiceValidator }
        ],
        orglOrigin: [
          { required: true, message: '请输入单据信息', trigger: 'blur' },
          { trigger: 'blur', validator:this.invoiceValidator }
        ],
        orglIns: [
          { required: true, message: '请输入单据信息', trigger: 'blur' },
          { trigger: 'blur', validator:this.invoiceValidator }
        ],
        orglCert: [
          { required: true, message: '请输入单据信息', trigger: 'blur' },
          { trigger: 'blur', validator:this.invoiceValidator }
        ],
        orglOther1: [
          { trigger: 'blur', validator:this.invoiceValidator1 },
          { trigger: 'blur', validator:this.docValidator1,fieldList:['orglOther1','otherInput1'],vm:this,formName:'form'}
        ],
        orglOther2: [
          { trigger: 'blur', validator:this.invoiceValidator1 },
          { trigger: 'blur', validator:this.docValidator1,fieldList:['orglOther2','otherInput2'],vm:this,formName:'form'}
        ],
        payAccNo: [
          { required: true, message: '请选择付款账号', trigger: 'change' }
        ],
        linkMan: [
          { required: true, message: '请输入联系人', trigger: 'blur' },
          {trigger: 'blur', validator:this.$tools.validator.isChEng},
          {trigger: 'blur', validator:this.invValidator}
        ],
        linkPhone: [
          { required: true, message: '请输入电话', trigger: 'blur' },
          //{trigger: 'blur', validator:this.$tools.validator.isMobile}
          {trigger: 'blur', validator:this.invValidator}
        ],
        linkFax: [
          { required: true, message: '请输入传真', trigger: 'blur' },
          //{trigger: 'blur', validator:this.$tools.validator.isNum}
          {trigger: 'blur', validator:this.invValidator}
        ],
        Inst1: [
          { required: true,trigger: 'blur', validator:this.inst1Validator},
          { required: true, message: '请选择办理方式', trigger: 'blur' }
        ],
        transType: [
          { trigger: 'change', validator:this.disabledNonemptyValidatorInst1,vm:this,form:'disabledForm',disabled:"Inst1Disabled"}
        ],
        payType: [
          { trigger: 'change', validator:this.disabledNonemptyValidatorInst2,vm:this,form:'disabledForm',disabled:"Inst2Disabled"}
        ],
        payDay2: [
          {trigger: 'blur', validator:this.$tools.validator.disabledNonemptyValidator,vm:this,form:'disabledForm',disabled:"InstInputDisabled2"},
          {trigger: 'blur', validator:this.$tools.validator.notChineseValidator}
        ],
        payDay3: [
          {trigger: 'blur', validator:this.$tools.validator.disabledNonemptyValidator,vm:this,form:'disabledForm',disabled:"InstInputDisabled3"},
          {trigger: 'blur', validator:this.$tools.validator.notChineseValidator}
        ],
        otherInstInput: [
          {trigger: 'blur', validator:this.disabledNonemptyValidatorOther,vm:this,form:'disabledForm',disabled:"otherInstDisabled"},
          {trigger: 'blur', validator:this.$tools.validator.notChineseValidator}
        ],
      },
      CRYOptions:[
        {value: '',label: '-----请选择-----'},
        {value: 'CNY',label: 'CNY人民币'},
        {value: 'HKD',label: 'HKD港元'},
        {value: 'USD',label: 'USD美元'},
        {value: 'EUR',label: 'EUR欧元'},
        {value: 'GBP',label: 'GBP英镑'},
        {value: 'JPY',label: 'JPY日元'},
        {value: 'SGD',label: 'SGD新加坡币'}
      ],
    }
  },
  methods: {
    submitForm() {
      let _this=this
      _this.$refs['form'].validate((valid) => {
        if (valid) {
          _this.$emit("changeStep","1",_this.form,false)
        } else {
          console.log('error submit!!')
          return false
        }
      });
    },
    resetForm() {
        let _this=this
        _this.$refs['form'].resetFields()
        _this.form.Inst1 = ''
        _this.form.Inst2 = ''
        _this.form.Inst3 = ''
        _this.form.Inst4 = ''
        _this.form.Inst5 = ''
        _this.form.Inst6 = ''
        _this.form.Inst7 = ''
        _this.form.Inst7 = ''
        _this.form.otherInst = ''
        _this.form.payDay2 = ''
        _this.form.payDay3 = ''
        _this.form.transType = ''
        _this.form.payType = ''
        _this.disabledForm.Inst1Disabled = true
        _this.disabledForm.InstInputDisabled2 = true
        _this.disabledForm.InstInputDisabled3 = true
        _this.disabledForm.Inst2Disabled = true
        _this.disabledForm.otherInstDisabled = true
    },
    selectSwift(val){
      let _this = this
      if (val != null && val != undefined && JSON.stringify(val)!='{}') {
        _this.form.collectingBankAll = val.swiftNo+"\n"+val.bankName+"\n"+val.addre1+" "+val.addre2+" "+val.addre3+" "+val.addre4
      }
      _this.dialogVisible2 = false
    },
    colValidator(rule, value, callback){   //代收行校验
      //let reg = /^[0-9]+(\/([0-9]+))*$/.test(value);
      let reg = /^[^\u4e00-\u9fa5]{0,}$/.test(value);
      if (!(this.isEmpty(value)) && !reg ) {
          callback("请勿输入中文")
      } else {
          callback()
      }
    },
    invValidator(rule, value, callback){   //汇票/发票号校验
      //let reg = /^[0-9]+(\/([0-9]+))*$/.test(value);
      let reg = /^[^\u4e00-\u9fa5]{0,}$/.test(value);
      if (this.isEmpty(value) || !reg ) {
          callback("请勿输入中文")
      } else {
          callback()
      }
    },
    instValidator(rule, value, callback){   //特殊条款输入框校验
      //let reg = /^[0-9]+(\/([0-9]+))*$/.test(value);
      let reg = /^[^\u4e00-\u9fa5]{0,}$/.test(value);
      if (!(this.isEmpty(value)) && !reg ) {
          callback("请勿输入中文")
      } else {
          callback()
      }
    },
    invoiceValidator(rule, value, callback){  //单据内容校验
      let reg = /^([*/()-~]|[A-Z0-9]){1,15}$/.test(value);
      if (this.isEmpty(value) || !reg ) {
          callback("由*/()-~和数字与大写字母组成,最长15位")
      } else {
          callback()
      }
    },
    invoiceValidator1(rule, value, callback){ //其他单据内容校验
      let reg = /^([*/()-~]|[A-Z0-9]){1,15}$/.test(value);
      if (!this.isEmpty(value) && !reg ) {
          callback("由*/()-~和数字与大写字母组成,最长15位")
      } else {
          callback()
      }
    },
    docValidator(rule, value, callback) { //单据内容校验名称非空
        let _form = rule.vm[rule.formName]
        let value1 = _form[rule.fieldList[0]]
        let value2 = _form[rule.fieldList[1]]
        if (this.isEmpty(value1) && !this.isEmpty(value2)) {
            callback("单据名称不能为空")
        } else {
            callback()
        }
    },
    docValidator1(rule, value, callback) { //单据名称校验内容非空
        let _form = rule.vm[rule.formName]
        let value1 = _form[rule.fieldList[0]]
        let value2 = _form[rule.fieldList[1]]
        if (this.isEmpty(value1) && !this.isEmpty(value2)) {
            callback("单据内容不能为空")
        } else {
            callback()
        }
    },
    otherInputValidator(rule, value, callback){ //其他单据名称校验
      let reg = /^(\s)*([A-Z]([.]?))((\s)*([A-Z]([.]?)))*(\s)*$/.test(value);
      if (!this.isEmpty(value) && !reg ) {
          callback("格式错误,由.和大写字母及空格组成")
      } else {
          callback()
      }
    },
    isEmpty(value) {
        if ($.trim(value) == "") return true
        return false
    },
    
    onChange(val){    //其他条款
      let _this = this
      if(val){
        _this.disabledForm.otherInstDisabled = false
        _this.$refs['otherInstInput'].validate("blur")
      }else{
        _this.disabledForm.otherInstDisabled = true
        _this.form.otherInstInput = ''
      }
    },
    Inst2CheckboxChange(val){       //条款2
      let _this = this
      if(val){
        _this.disabledForm.Inst2Disabled = false
      }else{
        _this.disabledForm.Inst2Disabled = true
        _this.form.payType = ''
        _this.$refs['payType'].validate("change")
      }
    },
    Inst1CheckboxChange(val){       //条款1
      let _this = this
      if(val=='1'){
          _this.disabledForm.Inst1Disabled = false
          _this.transTypeChange(val)
      }else{
          _this.disabledForm.Inst1Disabled = true 
          _this.disabledForm.InstInputDisabled2 = true 
          _this.disabledForm.InstInputDisabled3 = true 
          _this.form.transType = ''
          _this.form.payDay2 = ''
          _this.form.payDay3 = ''
          _this.form.Inst1 = '0'
          _this.$refs['transType'].validate("change")
      }
    },
    transTypeChange(val){   //条款1选项
      let _this = this
      if(val=='b'){
          _this.disabledForm.InstInputDisabled2 = false 
          _this.disabledForm.InstInputDisabled3 = true 
          _this.form.payDay3 = ''
          _this.$refs['payDay3'].validate("blur")
      }else if(val=='c'){
          _this.disabledForm.InstInputDisabled2 = true 
          _this.disabledForm.InstInputDisabled3 = false 
          _this.form.payDay2 = ''
          _this.$refs['payDay2'].validate("blur")
      }else if(val=='a'){
          _this.disabledForm.InstInputDisabled2 = true 
          _this.disabledForm.InstInputDisabled3 = true 
          _this.form.payDay2 = ''
          _this.form.payDay3 = ''
          _this.$refs['payDay3'].validate("blur")
          _this.$refs['payDay2'].validate("blur")
      }else{
          _this.disabledForm.InstInputDisabled2 = false  
          _this.disabledForm.InstInputDisabled3 = false  
          _this.form.payDay2 = ''
          _this.form.payDay3 = ''
      }
    },
    inst1Validator(rule,value,callback){    //条款1
      let _this = this
      if(!value) return callback('办理方式选项不能为空')
      callback()
    },
    disabledNonemptyValidatorInst1(rule, value, callback) {
        let _this = this
        if (!rule.vm[rule.form][rule.disabled] && $.trim(value) == "") return callback("请选择办理方式")
        callback()
    },
    disabledNonemptyValidatorInst2(rule, value, callback) {
        let _this = this
        if (!rule.vm[rule.form][rule.disabled] && $.trim(value) == "") return callback("请选择费用付款方")
        callback()
    },
    disabledNonemptyValidatorOther(rule, value, callback) {
        let _this = this
        if (!rule.vm[rule.form][rule.disabled] && $.trim(value) == "") return callback("请输入其他指示内容")
        callback()
    },
    
    checkOptionsArray(option){
      if((option.right.substr(0,1)=='1') && (option.coreType=='201'||option.type=='1')){
        return true
      }
    },
  },
  mounted(){ 
    let _this = this
    // console.log("交易维护参数start")
    // console.log(this.$route.params.oldSqno)
    // console.log(this.$route.params)
    // console.log("交易维护参数end")
    if(!(this.$route.params.oldSqno==''||this.$route.params.oldSqno == undefined)){
        _this.form  = $.extend({},_this.form,{
          oldSqno:this.$route.params.oldSqno,
          operateFlag:this.$route.params.operateFlag,
          cbBank:this.$route.params.exportCollectionList[0].cbBank,
          cbAddr:this.$route.params.exportCollectionList[0].cbAddr,
          swiftCode:this.$route.params.exportCollectionList[0].swiftCode,
          collectingBankAll:this.$route.params.exportCollectionList[0].swiftCode+"\n"+this.$route.params.exportCollectionList[0].cbBank+"\n"+this.$route.params.exportCollectionList[0].cbAddr,
          drawerName:this.$route.params.exportCollectionList[0].drawerName,
          drawerAddr:this.$route.params.exportCollectionList[0].drawerAddr,
          //drawerAll:this.$route.params.exportCollectionList[0].drawerName+"\n"+this.$route.params.exportCollectionList[0].drawerAddr,
          draweeName:this.$route.params.exportCollectionList[0].draweeName,
          draweeAddr:this.$route.params.exportCollectionList[0].draweeAddr,
          draweeAll:this.$route.params.exportCollectionList[0].draweeName+"\n"+this.$route.params.exportCollectionList[0].draweeAddr,
          tenor:this.$route.params.exportCollectionList[0].tenor,
          allNO:this.$route.params.exportCollectionList[0].draftNo+"/"+this.$route.params.exportCollectionList[0].invNo,
          draftNo:this.$route.params.exportCollectionList[0].draftNo,
          invNo:this.$route.params.exportCollectionList[0].invNo,
          CRY:this.$route.params.exportCollectionList[0].CRY,
          amt:this.$route.params.exportCollectionList[0].amt,
          goodsDesc:this.$route.params.exportCollectionList[0].goodsDesc,
          orglDraft:this.$route.params.exportCollectionList[0].orglDraft,
          orglInvNo:this.$route.params.exportCollectionList[0].orglInvNo,
          orglPacking:this.$route.params.exportCollectionList[0].orglPacking,
          orglWeight:this.$route.params.exportCollectionList[0].orglWeight,
          orglBl:this.$route.params.exportCollectionList[0].orglBl,
          orglAwb:this.$route.params.exportCollectionList[0].orglAwb,
          orglOrigin:this.$route.params.exportCollectionList[0].orglOrigin,
          orglIns:this.$route.params.exportCollectionList[0].orglIns,
          orglCert:this.$route.params.exportCollectionList[0].orglCert,
          otherInput1:this.$route.params.exportCollectionList[0].otherInput1,
          otherInput2:this.$route.params.exportCollectionList[0].otherInput2,
          orglOther1:this.$route.params.exportCollectionList[0].orglOther1,
          orglOther2:this.$route.params.exportCollectionList[0].orglOther2,
          Inst1:this.$route.params.exportCollectionList[0].Inst1,
          transType:this.$route.params.exportCollectionList[0].transType,
          payDay2:this.$route.params.exportCollectionList[0].payDay2,
          payDay3:this.$route.params.exportCollectionList[0].payDay3,
          Inst2:this.$route.params.exportCollectionList[0].Inst2,
          payType:this.$route.params.exportCollectionList[0].payType,
          Inst3:this.$route.params.exportCollectionList[0].Inst3,
          Inst4:this.$route.params.exportCollectionList[0].Inst4,
          Inst5:this.$route.params.exportCollectionList[0].Inst5,
          Inst6:this.$route.params.exportCollectionList[0].Inst6,
          Inst7:this.$route.params.exportCollectionList[0].Inst7,
          otherInst:this.$route.params.exportCollectionList[0].otherInst,
          otherInstInput:this.$route.params.exportCollectionList[0].otherInstInput,
          payAccNo:this.$route.params.exportCollectionList[0].payAccNo,
          linkMan:this.$route.params.exportCollectionList[0].linkMan,
          linkPhone:this.$route.params.exportCollectionList[0].linkPhone,
          linkFax:this.$route.params.exportCollectionList[0].linkFax,
        })
    }
    if(_this.form.Inst1!=''){_this.disabledForm.Inst1Disabled = false}
    if(_this.form.transType!=''){_this.disabledForm.Inst1Disabled = false}
    if(_this.form.payDay2!=''){_this.disabledForm.InstInputDisabled2 = false}
    if(_this.form.payDay3!=''){_this.disabledForm.InstInputDisabled3 = false}
    if(_this.form.payType!=''){_this.disabledForm.Inst2Disabled = false}
    if(_this.form.otherInstInput!=''){_this.disabledForm.otherInstDisabled = false}
    _this.options = this.$tools.storage.get("user","save").operAccInfoList.filter(_this.checkOptionsArray)
  }
}
</script>
<style>
  .chText{padding-left:23px;padding-bottom:10px;line-height:30px;}
  .tableEvenText el-checkbox,el-radio{color:#000;}
</style>