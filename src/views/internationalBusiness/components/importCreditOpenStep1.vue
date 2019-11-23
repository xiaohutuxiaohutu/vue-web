<template>
  <div class="importCreditOpen importCreditMain">
    <!--table布局-->
    <el-form ref="form" :model="form" :rules="rules" class="formEmbedTable">
      <table>
        <caption>信用证开立</caption>
        <tr>
          <td>
            <p><span class="cRed">*</span>Applicantion Date of the DC</p>
            <p>申请日期</p>
          </td>
          <td colspan="3">
            <span><span class="cRed">*</span>申请日期</span>
            <el-form-item prop="applyDate">
              <el-input disabled v-model="form.applyDate1"></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td rowspan="2">
            <p><span class="cRed">*</span>Applicant’s Name and Address</p>
            <p>申请人名称及地址</p>
          </td>
          <td colspan="3">
            <span><span class="cRed">*</span>申请人名称</span>
            <el-form-item class="w400" prop="appName">
              <el-input v-model="form.appName" disabled></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td colspan="3" class="tableEvenText">
            <span><span class="cRed">*</span>申请人地址</span>
            <el-form-item class="w400" prop="appAddr">
              <el-input v-model="form.appAddr"></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>
            <p><span class="cRed">*</span>Methods of dispatching the DC to the Advising Bank or Beneficiary</p>
            <p>传递信用证给通知行或受益人的方法</p>
          </td>
          <td colspan="3">
            <el-form-item ref="dispatchType" prop="dispatchType">
              <el-radio-group v-model="form.dispatchType" @change="radioChage">
                <el-radio label="1">Full Tele-transmission 全电讯</el-radio>
                <el-radio label="2">Courier 速递</el-radio>
                <el-radio label="3">Brief tele-transmission follows by mail 简短电讯附加邮件</el-radio>
                <div>
                  <el-radio label="4">Collect at your Counter by</el-radio>
                  <el-form-item prop="dispatchCounter" ref="dispatchCounter">
                    <el-input v-model="form.dispatchCounter" placeholder="" :disabled="disabledForm.formName2Disabled"></el-input><span> tel. </span>
                  </el-form-item>
                  <el-form-item prop="dispatchCounterTel" ref="dispatchCounterTel">
                    <el-input v-model="form.dispatchCounterTel" placeholder="" :disabled="disabledForm.formName2Disabled"></el-input><span> 由 ______ 电话号码 _____从银行柜台提取</span>
                  </el-form-item>
                </div>
              </el-radio-group>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td rowspan="2">
            <p><span class="cRed">*</span>Beneficiary’s Name and Address</p>
            <p>受益人名称及地址</p>
          </td>
          <td colspan="3">
            <span><span class="cRed">*</span>受益人姓名</span>
            <el-form-item class="w400" prop="beneficiary">
              <el-input v-model="form.beneficiary"></el-input>
            </el-form-item>
            <a class="cOrange m15" @click="dialogVisible = true"><i class="el-icon-search"/>常用受益人</a>
          </td>
        </tr>
        <tr>
          <td colspan="3" class="tableEvenText">
            <span><span class="cRed">*</span>受益人地址</span>
            <el-form-item class="w400" prop="beneficiaryAddr">
              <el-input v-model="form.beneficiaryAddr"></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>
            <p><span class="cRed">*</span>Advising Bank</p>
            <p>通知行</p>
          </td>
          <td colspan="3">
            <el-form-item class="w400" prop="advisingBank">
              <el-input v-model="form.advisingBank"></el-input>
            </el-form-item>
            <a class="cOrange m15" @click="dialogVisible2 = true"><i class="el-icon-search"/>swift 查询</a>
          </td>
        </tr>
        <tr>
          <td rowspan="2">
            <p><span class="cRed">*</span>Specify the Credit Currency and Amount in figures</p>
            <p>以数字说明信用证货币及金额</p>
          </td>
          <td colspan="3">
            <span><span class="cRed">*</span>币种</span>
            <el-form-item ref="CRYFigures" prop="CRYFigures">
              <el-select placeholder="----请选择----" v-model="form.CRYFigures" @change="changeCRY('CRYFigures')">
                <el-option label="CNY-人民币" value="CNY"></el-option>
                <el-option label="HKD-港元" value="HKD"></el-option>
                <el-option label="USD-美元" value="USD"></el-option>
                <el-option label="EUR-欧元" value="EUR"></el-option>
                <el-option label="GBP-英镑" value="GBP"></el-option>
                <el-option label="JPY-日元" value="JPY"></el-option>
                <el-option label="SGD-新加坡币" value="SGD"></el-option>
              </el-select>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td colspan="3" class="tableEvenText">
            <span><span class="cRed">*</span>金额</span>
            <el-form-item prop="AMTFigures">
              <ynet-currency-input name="AMTFigures" ref="AMTFigures" v-model="form.AMTFigures" :disabled="form.CRYFigures==''" :showChinese="false"></ynet-currency-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td rowspan="2">
            <p><span class="cRed">*</span>Specify the Credit Currency and Amount in words</p>
            <p>以文字说明信用证货币及金额</p>
          </td>
          <td colspan="3">
            <span><span class="cRed">*</span>币种&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <el-form-item ref="CRY" prop="CRYFigures">
              <el-select placeholder="----请选择----" v-model="form.CRYFigures" @change="changeCRY('CRY')">
                <el-option label="CNY-人民币" value="CNY"></el-option>
                <el-option label="HKD-港元" value="HKD"></el-option>
                <el-option label="USD-美元" value="USD"></el-option>
                <el-option label="EUR-欧元" value="EUR"></el-option>
                <el-option label="GBP-英镑" value="GBP"></el-option>
                <el-option label="JPY-日元" value="JPY"></el-option>
                <el-option label="SGD-新加坡币" value="SGD"></el-option>
              </el-select>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td colspan="3" class="tableEvenText">
            <span><span class="cRed">*</span>大写金额</span>
            <el-form-item class="w400" ref="amt" prop="amt">
              <el-input v-model="form.amt" :disabled="form.CRYFigures==''"></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>
            <p>Allowance in Credit Amount in percentage</p>
            <p>允许信用证金额的百分比增减幅度</p>
          </td>
          <td colspan="3">
            <el-form-item prop="moreAmtPercent">
              <el-input v-model="form.moreAmtPercent"></el-input> % more or
            </el-form-item>
            <el-form-item prop="lessAmtPercent">
              <el-input v-model="form.lessAmtPercent"></el-input> % less
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>
            <p>Allowance in Quantity of Goods in percentage</p>
            <p>允许货物数量的百分比增减幅度</p>
          </td>
          <td colspan="3">
            <el-form-item prop="moreQuaPercent">
              <el-input v-model="form.moreQuaPercent"></el-input> %more or
            </el-form-item>
            <el-form-item prop="lessQuaPercent">
              <el-input v-model="form.lessQuaPercent"></el-input> %less
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>
            <p><span class="cRed">*</span>Expiry date of the DC</p>
            <p>信用证到期日</p>
          </td>
          <td colspan="3">
            <el-form-item ref="expDt" prop="expDt">
              <el-date-picker type="date" placeholder="信用证到期日" :picker-options="pickerOptions" formate="yyyyMMdd" v-model="form.expDt1" @change="selectExpDt"></el-date-picker>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>
            <p><span class="cRed">*</span>Expiry place of the DC</p>
            <p>信用证到期地点</p>
          </td>
          <td colspan="3">
            <el-form-item ref="expPlace" prop="expPlace">
              <el-radio-group v-model="form.expPlace" @change="expPlaceRadioChage">
                <el-radio label="1">Nominated Bank’s country 指定行的国家</el-radio>
                <el-radio label="2">Issuing Bank’s counter 开证行柜台</el-radio>
                <div class="radio-input">
                  <el-radio label="3" class="radioo">&nbsp;</el-radio>
                  <el-form-item prop="expPlaceAdd" ref="expPlaceAdd" class="input">
                    <el-input v-model="form.expPlaceAdd"  :disabled="disabledForm.expPlaceAddDisabled"></el-input><span> 其他</span>
                  </el-form-item>
                </div>
              </el-radio-group>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>
            <p><span class="cRed">*</span>Period of presentation</p>
            <p>交单期限</p>
          </td>
          <td colspan="3">
            <el-form-item prop="periodPresentDays">
              <el-radio-group v-model="form.periodPresentDays" @change="periodPresentDaysRadioChage">
                <div>
                  <el-radio label="1">&nbsp;</el-radio>
                  <el-form-item ref="periodPresentDaysAdd1" prop="periodPresentDaysAdd1">
                    <el-input v-model="form.periodPresentDaysAdd1" :disabled="disabledForm.periodPresentDaysAdd1Disabled"></el-input><span> days after shipment but within this DC validity</span>
                  </el-form-item>
                </div>
                <div>
                  <el-radio label="2">&nbsp;</el-radio>
                  <el-form-item ref="periodPresentDaysAdd2" prop="periodPresentDaysAdd2" class="w400">
                    <el-input v-model="form.periodPresentDaysAdd2" :disabled="disabledForm.periodPresentDaysAdd2Disabled"></el-input>
                  </el-form-item>
                </div>
              </el-radio-group>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>
            <p>Shipment from</p>
            <p>发运地点</p>
          </td>
          <td colspan="3">
            <el-form-item ref="portDeparture" prop="portDeparture">
              <el-input type="textarea" v-model="form.portDeparture"></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>
            <p>Port of discharge / Airport of destination</p>
            <p>卸货港，或目的地机场，(请注明港口/机场名称)</p>
          </td>
          <td colspan="3">
            <el-form-item ref="portDestination" prop="portDestination">
              <el-input type="textarea" v-model="form.portDestination"></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>
            <p>Place of taking in charge / Dispatch from / Place of Receipt</p>
            <p>收货地点</p>
          </td>
          <td colspan="3">
            <el-form-item ref="placeDeparture" prop="placeDeparture">
              <el-input type="textarea" v-model="form.placeDeparture" ></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>
            <p>Place of Final Destination / For transportation to / Place of Delivery</p>
            <p>付运至</p>
          </td>
          <td colspan="3">
            <el-form-item ref="placeDestination" prop="placeDestination">
              <el-input type="textarea" v-model="form.placeDestination"></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>
            <p><span class="cRed">*</span>Not later than</p>
            <p>货物最迟的发运日期</p>
          </td>
          <td colspan="3">
            <el-form-item ref="notLaterThan" prop="notLaterThan">
              <el-date-picker type="date" placeholder="最晚发运日期" formate="yyyyMMdd" v-model="form.notLaterThan1" @change="selectNotLaterThan"></el-date-picker>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>
            <p><span class="cRed">*</span>Partial shipments/deliveries is allowed or prohibited</p>
            <p>允许或不允许部份发运</p>
          </td>
          <td>
            <el-form-item ref="partShip" prop="partShip">
              <el-radio-group v-model="form.partShip" @change="partShipRadioChage">
                <el-radio label="1">allowed 是</el-radio>
                <el-radio label="2">prohibited 否</el-radio>
              </el-radio-group>
            </el-form-item>
          </td>
          <td>
            <p><span class="cRed">*</span>Transshipment is allowed or prohibited</p>
            <p>允许或不允许转运</p>
          </td>
          <td>
            <el-form-item ref="transShip" prop="transShip">
              <el-radio-group v-model="form.transShip" @change="transShipRadioChage">
                <el-radio label="1">allowed 是</el-radio>
                <el-radio label="2">prohibited 否</el-radio>
              </el-radio-group>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td colspan="4" class="tableEvenText">
            <p class="mb10">Insurance to be covered by (for EXW, FCA/FOB or CFR/CPT shipment):  This field is applicable for shipment with EXW, FCA/FOB or CFR/CPT trade terms.  Please indicate the cargo insurance arrangement unless it is covered by the Beneficiary and insurance policy/certificate will be accompanied upon the presentation.<br/>
              保险提供（适用于EXW, FCA/FOB or CFR/CPT 的贸易条款）：若货物的贸易条款为EXW, FCA/FOB or CFR/CPT请填写此栏。除非受益人于交单时附有保险单/证明书，请注明货运保险安排。</p>
            <el-form-item ref="insurance" prop="insurance">
              <el-radio-group v-model="form.insurance" @change="insuranceRadioChage">
                <el-radio label="1">
                  <span> As per open policy held by the issuing bank </span><el-radio label="2">Ultimate buyer</el-radio>（根据 开证行 / 最终买家持有的预约保单）
                </el-radio>
                <el-radio label="3">
                  Cover note per attached or to be submitted within 7 days of this application（附上临时保单或在7天内递交临时保单）
                </el-radio>
                <el-radio label="4">
                  Please arrange insurance cover on our account for 110% of this DC value（请银行为申请人提供110%信用证金额的保险安排）
                </el-radio>
              </el-radio-group>
            </el-form-item>
            <p class="mt10"><span class="cRed">-</span>The Bank may arrange insurance cover on Applicant’s account for 110% of the credit value if so instructed by customer.  (For details, please contact our staff) </p>
            <p><span class="cRed">-</span>如申请人需要，本行亦可为申请人提供110%信用证金额的保险安排。(详情请联络本行职员)</p>
          </td>
        </tr>
        <tr>
          <td colspan="4" class="tableEvenText">
            <p class="mb10"><span class="cRed">*</span>Please indicate the DC is available by sight payment or by deferred payment at maturity.  If not pay at sight, please fill in the number of days and terms for determining the maturity date of deferred payment/acceptance.<br/>
              请注明信用证为即期付款或延期于到期日付款。如非即期付款，请填上用以确定延期/承兑到期日的日数及准则。</p>
            <el-form-item ref="LCAvailWith" prop="LCAvailWith">WITH 由
              <el-radio-group v-model="form.LCAvailWith" @change="LCAvailWithRadioChage">
                <el-radio label="1">Issuing Bank开证行</el-radio>
                <el-radio label="2">Any bank其他银行</el-radio>
                <el-radio label="3">&nbsp;</el-radio>
                <el-form-item ref="LCAvailWithAdd" prop="LCAvailWithAdd">
                  <el-input v-model="form.LCAvailWithAdd" :disabled="disabledForm.LCAvailWithAddDisabled"></el-input> 支付
                </el-form-item>
              </el-radio-group>
            </el-form-item>
            <el-form-item ref="LCAvailBy" prop="LCAvailBy">BY 付款方式
              <el-radio-group v-model="form.LCAvailBy" @change="LCAvailByRadioChage">
                <el-radio label="1">Negotiation议付</el-radio>
                <el-radio label="2">Sight Payment即时付款</el-radio>
                <el-radio label="3">Acceptance承兑票据</el-radio>
                <el-radio label="4">Deferred Payment延期付款</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item ref="LCAvailAt" prop="LCAvailAt">AT 付款时间
              <el-radio-group v-model="form.LCAvailAt" @change="LCAvailAtRadioChage">
                <el-radio label="1">Sight即时</el-radio>
                <el-radio label="2">&nbsp;</el-radio>
                <el-form-item ref="LCAvailAtAdd1" prop="LCAvailAtAdd1">
                  <el-input v-model="form.LCAvailAtAdd1" :disabled="disabledForm.LCAvailAtAddDisabled"></el-input> days
                </el-form-item>
              </el-radio-group>
            </el-form-item>
            <el-form-item ref="LCAvailDraft" prop="LCAvailDraft">Draft drawn on (Not applicable to sight or deferred payment DC) 汇票是以（即时或延期付款的信用证不适用）
              <el-radio-group v-model="form.LCAvailDraft" @change="LCAvailDraftRadioChage">
                <el-radio label="1">Issuing Bank开证行为受票人</el-radio>
                <el-radio label="2">&nbsp;</el-radio>
                <el-form-item ref="LCAvailDraftAdd" prop="LCAvailDraftAdd">
                  <el-input v-model="form.LCAvailDraftAdd" :disabled="disabledForm.LCAvailDraftAddDisabled"></el-input> 为受票人
                </el-form-item>
              </el-radio-group>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td colspan="4" class="tableEvenText">
            <p class="mb10"><span class="cRed">*</span>Charges to be paid by: Please indicate which party (Applicant or Beneficiary) will pay the relevant commissions, fees and charges.<br/>
              If DC opening(and/or amendment) charges are for account of Beneficiary, we shall debit these charges from Applicant’s account upon DC issuance/amendment and refund to you after deducting from payment to Beneficiary. <br/>
              费用由哪方偿付：请注明将由哪方(申请人或受益人)付费与相关手续费、费用及支出。<br/>
              如开立(及或修改)信用证费用由受益人付缴，本行于开立或修证时将先从申请人账户扣取，并于偿付时向受益人扣款及向申请人退款。</p>
            <el-checkbox-group v-model="form.chargeLCOpen" @change="chargeLCOpenCheckChage">
              <el-form-item ref="chargeLCOpen" prop="chargeLCOpen">
                DC opening commission & charges 开立(及或修改)信用证费用
                <el-checkbox label="1">Beneficiary</el-checkbox>
                <el-checkbox label="2">Applicant</el-checkbox>
                <!--<el-radio-group v-model="form.chargeLCOpen" @change="chargeLCOpenRadioChage">
                  <el-radio label="1">Beneficiary</el-radio>
                  <el-radio label="2">Applicant</el-radio>
                </el-radio-group>-->
              </el-form-item>
            </el-checkbox-group>
            <el-checkbox-group v-model="form.chargeAccept" @change="chargeAcceptCheckChage">
              <el-form-item ref="chargeAccept" prop="chargeAccept">
                Acceptance commission (for usance DC) 承兑手续费（远期信用证适用）
                <el-checkbox label="1">Beneficiary</el-checkbox>
                <el-checkbox label="2">Applicant</el-checkbox>
              </el-form-item>
            </el-checkbox-group>
            <el-checkbox-group v-model="form.chargeUsanceInt" @change="chargeUsanceIntCheckChage">
              <el-form-item ref="chargeUsanceInt" prop="chargeUsanceInt">
                Usance Interest (for UPAS) 远期利息（远期即付信用证适用）
                <el-checkbox label="1">Beneficiary</el-checkbox>
                <el-checkbox label="2">Applicant</el-checkbox>
              </el-form-item>
            </el-checkbox-group>
            <el-checkbox-group v-model="form.chargeOutsideBank" @change="chargeOutsideBankCheckChage">
              <el-form-item ref="chargeOutsideBank" prop="chargeOutsideBank">
                Charges outside issuing bank开证行以外的收费
                <el-checkbox label="1">Beneficiary</el-checkbox>
                <el-checkbox label="2">Applicant</el-checkbox>
              </el-form-item>
            </el-checkbox-group>
            <br/>
            <el-form-item ref="chargeAdd" prop="chargeAdd">
              <el-checkbox-group v-model="form.chargeAdd" @change="chargeAddCheckboxChage">
                <el-checkbox>
                  <el-form-item ref="chargeAdd1" prop="chargeAdd1">
                    <el-input v-model="form.chargeAdd1" :disabled="disabledForm.chargeAdd1Disabled"></el-input>
                  </el-form-item>
                  <span>其他，请填写</span>
                  <el-form-item ref="chargeAdd2" prop="chargeAdd2">
                    <el-radio-group v-model="form.chargeAdd2" :disabled="disabledForm.chargeAdd1Disabled" @change="chargeAdd2RadioChage">
                      <el-radio label="1">Beneficiary</el-radio>
                      <el-radio label="2">Applicant</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td colspan="4" class="tableEvenText">
            <p class="mb10">Documents Required:  The documents listed herein are for your selection.  Please also fill in the number of copies/originals and other requirements.<br/>
              If the DC requires presentation of document(s) other than transport document, insurance documents or commercial invoices, Applicant has to specify the issuer and data content.<br/>
              要求单据：可选项备有的单据类别。请填上正本及或副本数量及其他要求。<br/>
              如要求提交运输单据、保险单据或商业发票以外的单据，申请人须注明此等单据的出具人及内容。</p>
            <el-form-item ref="docItems" prop="docItems" style="width:320px;"></el-form-item>
            <el-form-item>
              <el-checkbox-group v-model="form.docItems" @change="docItemsCheckboxChage">
                <div>
                  <el-checkbox label="A" class="s">
                    <span>Signed commercial invoice in</span>
                  </el-checkbox>
                  <el-form-item ref="docSignOriginals" prop="docSignOriginals">
                    <el-input v-model="form.docSignOriginals" :disabled="disabledForm.docSignOriginalsDisabled"></el-input> originals and&nbsp;
                  </el-form-item>
                  <el-form-item ref="docSignCopies" prop="docSignCopies">
                    <el-input v-model="form.docSignCopies" :disabled="disabledForm.docSignOriginalsDisabled"></el-input> copies 
                  </el-form-item>
                  <el-form-item class="ml22"><span>已签署的发票(_____份正本及_____份副本)。</span></el-form-item>
                </div>
                <div>
                  <el-checkbox label="B" class="s">
                    <span>Packing list in</span>
                  </el-checkbox>
                  <el-form-item ref="docPackOriginals" prop="docPackOriginals">
                    <el-input v-model="form.docPackOriginals" :disabled="disabledForm.docPackOriginalsDisabled"></el-input> originals and&nbsp;
                  </el-form-item>
                  <el-form-item ref="docPackCopies" prop="docPackCopies">
                    <el-input v-model="form.docPackCopies" :disabled="disabledForm.docPackOriginalsDisabled"></el-input> copies 
                  </el-form-item>
                  <el-form-item class="ml22"><span>装箱单(_____份正本及_____份副本)。</span></el-form-item>
                </div>
                <div>
                  <el-checkbox label="C" class="s">
                    <span>Certificate of Origin in</span>
                  </el-checkbox>
                  <el-form-item ref="docCertfcOriginals" prop="docCertfcOriginals" class="sort">
                    <el-input  v-model="form.docCertfcOriginals" :disabled="disabledForm.docCertfcOriginalsDisabled"></el-input> originals and&nbsp;
                  </el-form-item>
                  <el-form-item ref="docCertfcCopies" prop="docCertfcCopies"  class="sort">
                    <el-input v-model="form.docCertfcCopies" :disabled="disabledForm.docCertfcOriginalsDisabled"></el-input> copies issued by&nbsp;
                  </el-form-item>
                  <el-form-item ref="docCertfcIssued" prop="docCertfcIssued"  class="sort">
                    <el-input v-model="form.docCertfcIssued" :disabled="disabledForm.docCertfcOriginalsDisabled"></el-input>
                  </el-form-item>
                  <el-form-item class="ml22"><span>产地证明书(____份正本及____ 份副本)。由______________________________出具。</span></el-form-item>
                </div>
                <div>
                  <el-checkbox label="D" class="s">
                    <el-form-item ref="docBillSetNums" prop="docBillSetNums">
                      <el-input v-model="form.docBillSetNums" :disabled="disabledForm.docBillSetNumsDisabled"></el-input>
                    </el-form-item>
                  </el-checkbox>
                  <el-form-item><span>set of original clean shipped on board marine bill(s) of lading made out</span></el-form-item>
                  <el-form-item ref="docBillTodo" prop="docBillTodo">
                    <el-radio-group class="ml22" v-model="form.docBillTodo" :disabled="disabledForm.docBillSetNumsDisabled" @change="docBillTodoRadioChage">
                      <el-radio label="1">to order of shipper and blank endorsed /</el-radio>
                      <el-radio label="2">to</el-radio>
                      <el-form-item ref="docBillTodoAdd1" prop="docBillTodoAdd1" class="mr10 sort2"><el-input v-model="form.docBillTodoAdd1" :disabled="disabledForm.docBillTodoAddDisabled1"></el-input></el-form-item>
                      <el-radio label="3">/ to order of</el-radio>
                      <el-form-item ref="docBillTodoAdd2" prop="docBillTodoAdd2" class="sort2"><el-input v-model="form.docBillTodoAdd2" :disabled="disabledForm.docBillTodoAddDisabled2"></el-input></el-form-item>
                    </el-radio-group>
                  </el-form-item>
                  <div class="ml22">
                    <el-form-item ref="docBillFreight" prop="docBillFreight">
                      <span>marked freight</span>
                      <el-radio-group v-model="form.docBillFreight" :disabled="disabledForm.docBillSetNumsDisabled" @change="docBillFreightRadioChage">
                        <el-radio label="1">collect /</el-radio>
                        <el-radio label="2">prepaid, notify</el-radio>
                      </el-radio-group>
                    </el-form-item>
                    <el-form-item ref="docBillFreightAdd" prop="docBillFreightAdd"><el-input v-model="form.docBillFreightAdd" :disabled="disabledForm.docBillSetNumsDisabled"></el-input><span> and&nbsp;</span></el-form-item>
                    <el-checkbox-group v-model="form.docBillIndicat" :disabled="disabledForm.docBillSetNumsDisabled" style="display:inline;">
                      <el-checkbox true-label="1">indicating this DC number. </el-checkbox>
                    </el-checkbox-group>
                    <el-form-item><p>整套洁净已装船(港对港) 的正本海运提单，托运按托运人及空白背书之命令/到____________/按_______________之命令海运提单显示「运费未付/运费已付」， 通知 ______________________及本信用证编号。</p></el-form-item>
                  </div>
                </div>
                <div>
                  <el-checkbox label="E" class="s">&nbsp;</el-checkbox>
                  <el-form-item><span>Original clean air waybill consigned to</span>&nbsp;</el-form-item>
                  <el-form-item ref="docAirWaybill" prop="docAirWaybill">
                    <el-radio-group v-model="form.docAirWaybill" :disabled="disabledForm.docAirWaybillDisabled" @change="docAirWaybillRadioChage">
                      <el-radio label="1">issuing bank</el-radio>
                      <el-radio label="2">applicant</el-radio>
                      <el-radio label="3">&nbsp;</el-radio>
                      <el-form-item ref="docAirWaybillAdd" prop="docAirWaybillAdd"><el-input v-model="form.docAirWaybillAdd" :disabled="disabledForm.docAirWaybillAddDisabled"></el-input></el-form-item>
                    </el-radio-group>
                  </el-form-item>
                  <div class="ml22">
                    <el-form-item ref="docAirWaybillFreight" prop="docAirWaybillFreight">
                      <span>marked freight</span>
                      <el-radio-group  v-model="form.docAirWaybillFreight" :disabled="disabledForm.docAirWaybillDisabled" @change="docAirWaybillFreightRadioChage">
                        <el-radio label="1">collect /</el-radio>
                        <el-radio label="2">prepaid, notify</el-radio>
                      </el-radio-group>
                    </el-form-item>
                    <el-form-item ref="docAirWaybillFreightAdd" prop="docAirWaybillFreightAdd"><el-input v-model="form.docAirWaybillFreightAdd" :disabled="disabledForm.docAirWaybillDisabled"></el-input><span> and&nbsp;</span></el-form-item>
                    <el-checkbox-group v-model="form.docAirWaybillIndicat" :disabled="disabledForm.docAirWaybillDisabled" style="display:inline;">
                      <el-checkbox true-label='1'>indicating this DC number. </el-checkbox>
                    </el-checkbox-group>
                    <el-form-item><p>洁净的正本空运单据，托运予开证行/申请人/ ______________________， 每张空运单据显示「运费未付/运费已付」,通知______________________ 及本信用证编号。</p></el-form-item>
                  </div>
                </div>
                <div>
                  <el-checkbox label="F"  class="s">
                    <el-form-item ref="docTransSportSetNums" prop="docTransSportSetNums">
                      <el-input v-model="form.docTransSportSetNums" :disabled="disabledForm.docTransSportSetNumsDisabled"></el-input>
                    </el-form-item>
                  </el-checkbox>
                  <el-form-item>set of original clean multimodal transport documents made out</el-form-item>
                  <el-form-item ref="docTransSportTodo" prop="docTransSportTodo">
                    <el-radio-group  class="ml22" v-model="form.docTransSportTodo" :disabled="disabledForm.docTransSportSetNumsDisabled" @change="docTransSportTodoRadioChage">
                      <el-radio label="1">to order of shipper and blank endorsed/</el-radio>
                      <el-radio label="2">to</el-radio>
                      <el-form-item ref="docTransSportTodoAdd1" prop="docTransSportTodoAdd1" class="mr10 sort2"><el-input v-model="form.docTransSportTodoAdd1" :disabled="disabledForm.docTransSportTodoAddDisabled1"></el-input></el-form-item>
                      <el-radio label="3">/ to order of</el-radio>
                      <el-form-item ref="docTransSportTodoAdd2" prop="docTransSportTodoAdd2" class="sort2"><el-input v-model="form.docTransSportTodoAdd2" :disabled="disabledForm.docTransSportTodoAddDisabled2"></el-input></el-form-item>
                    </el-radio-group>
                  </el-form-item>
                  <div class="ml22">
                    <el-form-item ref="docTransSportFreight" prop="docTransSportFreight">
                      <span>marked freight</span>
                      <el-radio-group v-model="form.docTransSportFreight" :disabled="disabledForm.docTransSportSetNumsDisabled" @change="docTransSportFreightRadioChage">
                        <el-radio label="1">collect /</el-radio>
                        <el-radio label="2">prepaid, notify</el-radio>
                      </el-radio-group>
                    </el-form-item>
                    <el-form-item ref="docTransSportFreightAdd" prop="docTransSportFreightAdd"><el-input v-model="form.docTransSportFreightAdd" :disabled="disabledForm.docTransSportSetNumsDisabled"></el-input><span> and&nbsp;</span></el-form-item>
                    <el-checkbox-group v-model="form.docTransSportIndicat" :disabled="disabledForm.docTransSportSetNumsDisabled" style="display:inline;">
                      <el-checkbox true-label='1'>indicating this DC number. </el-checkbox>
                    </el-checkbox-group>
                    <el-form-item><p>整套洁净的正本多式运输提单，托运按托运人及空白背书之命令/到____________/按_______________之命令， 每张多式运输提单显示「运费未付/运费已付」，通知______________________及本信用证编号。</p></el-form-item>
                  </div>
                </div>
                <div>
                  <el-checkbox label="G" class="s">&nbsp;</el-checkbox>
                  <el-form-item style="width:830px;">
                    <span>Cargo receipt issued and signed by authorized signatory(ies) of the applicant (whose signature(s) must be in conformity with the specimen signature held in the issuing bank’s records) certifying that the goods have been received in good order and condition and stating the quantity and value of goods received and this DC number, indicating Cargo receipt issuing date which will be deemed as shipment date.</span>
                    <span>由申请人的授权签字人出具及签署（该货物收据的签名必须与开证行记录的签字样本相符）的货物收据证明收到的货物状态良好并说明数量和收到的货物的价值及本信用证编号，显示货物收据出具日期将被视为发运日期。</span>
                  </el-form-item>
                </div>
                <div>
                  <el-checkbox label="H"  class="s">&nbsp;</el-checkbox>
                  <el-form-item><span>Insurance Policy / Certificate in negotiable form, at least in duplicate, and endorsed in blank for full </span>&nbsp;</el-form-item>
                  <el-form-item ref="docInsuranceValue" prop="docInsuranceValue"><el-input v-model="form.docInsuranceValue" :disabled="disabledForm.docInsuranceValueDisabled"></el-input></el-form-item>
                  <el-form-item class="ml22"><span> value plus 10% covering:</span><span class="ml10">空白背书的保险证书/单据，保险金额至少为110% 价值，保险条款须包括：</span></el-form-item>
                  <el-form-item ref="docInsuranceInst" prop="docInsuranceInst">
                    <el-radio-group class="ml22" v-model="form.docInsuranceInst" :disabled="disabledForm.docInsuranceValueDisabled" @change="docInsuranceInstRadioChage">
                      <el-radio label="1"><span>Institute Cargo Clauses</span></el-radio>
                      <el-form-item ref="docInsuranceInstAdd1" prop="docInsuranceInstAdd1">
                        <el-radio-group v-model="form.docInsuranceInstAdd1" :disabled="disabledForm.docInsuranceInstAddDisabled1" @change="docInsuranceInstAdd1RadioChage">
                          <el-radio label="A">(A)</el-radio>
                          <el-radio label="B">(B)</el-radio>
                          <el-radio label="C">(C)</el-radio>
                          <el-radio label="AIR">(Air) <span style="color:#5a5e66;"> (伦敦保险)协会货物保险条款(A /B/C/ 空运货物)</span></el-radio>
                        </el-radio-group>
                      </el-form-item>
                      <el-radio label="2">Institute War Clauses (Cargo) and Institute Strikes Clauses (Cargo);<span style="color:#5a5e66;"> (伦敦保险)协会战争条款 ( 海运货物)及(伦敦保险)协会罢工条款 ( 海运货物)</span></el-radio>
                      <el-radio label="3">Institute War Clauses (Air Cargo) and Institute Strikes Clauses (Air Cargo);<span style="color:#5a5e66;"> (伦敦保险)协会战争条款 (空运货物)及(伦敦保险)协会罢工条款 (空运货物)</span></el-radio>
                      <el-radio label="4">&nbsp;</el-radio>
                      <el-form-item ref="docInsuranceInstAdd2" prop="docInsuranceInstAdd2"><el-input v-model="form.docInsuranceInstAdd2" :disabled="disabledForm.docInsuranceInstAddDisabled2"></el-input><span style="color:#5a5e66;"> 其他;</span></el-form-item>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item><span class="ml22">indicating claims payable at destination in the currency of this DC, </span></el-form-item>
                  <el-checkbox-group v-model="form.docInsuranceIrre" :disabled="disabledForm.docInsuranceValueDisabled" style="display:inline;">
                    <el-checkbox true-label="1">irrespective of percentage. </el-checkbox>
                  </el-checkbox-group>
                  <el-form-item class="ml22"><span>并显示在目的地以信用证货币赔付，不计免赔率。</span></el-form-item>
                </div>
              </el-checkbox-group>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td colspan="4" class="tableEvenText">
            <p>Other Documents (Please use separate sheet, if necessary, which must be signed by the Applicant’s authorized signatory(ies) with company chop.)</p>
            <p>其他单据 (如有需要，可用分页并附有申请人的授权人签署并加盖公司公章) </p>
            <div class="mt10">
              <el-form-item ref="otherDoc" prop="otherDoc">
                <el-input type="textarea" v-model="form.otherDoc"></el-input>
              </el-form-item>
            </div>
          </td>
        </tr>
        <tr>
          <td colspan="4" class="tableEvenText">
            <p>Description of Goods and Shipment Schedule (Please avoid excessive details and use separate sheet if necessary)</p>
            <p>货物描述及发运排程(请避免过多描述，及如有需要可用分页)</p>
            <div class="mt10">
              <el-form-item  prop="descGoods">
                <el-input type="textarea" v-model="form.descGoods"></el-input>
              </el-form-item>
            </div>
          </td>
        </tr>
        <tr>
          <td colspan="4" class="tableEvenText">
            <p>Trade terms:  This refers to the Incoterms agreed between the Applicant and Beneficiary and may be referred to the sales contract.</p>
            <p>Incoterms (International Commercial Terms) are a series of pre-defined commercial terms published by the International Chamber of Commerce (ICC).  The Incoterms rules are intended primarily to clearly communicate the tasks, costs, and risks associated with the transportation and delivery of goods.</p>
            <p>贸易条款：指经由申请人及受益人于订立销售合同时同意的Incoterms(国际贸易术语)。</p>
            <p>Incoterms (International Commercial Terms)是一系列由国际商会(ICC)所制定的商业条款。Incoterms(国际贸易术语)规则主要是用以清晰说明买卖双方在货物运输及交接方面的责任、费用和风险划分。</p>
            <div class="mt10">
              <el-form-item  prop="tradeTerms">
                <el-input type="textarea" v-model="form.tradeTerms"></el-input>
              </el-form-item>
            </div>
          </td>
        </tr>
        <tr>
          <td colspan="4" class="tableEvenText">
            <p>Other instructions:  Some typical instructions are listed herein for your selection, such as: </p>
            <p><span class="cRed">-</span> Please indicate if Beneficiary request for “Transferable DC” or “Confirmed DC”. </p>
            <p><span class="cRed">-</span> Please fix exchange rate: Customer may request the Bank to book foreign exchange forward contract on Applicant’s account up to the value of this DC. </p>
            <p class="mb10"><span class="cRed">-</span> Please indicate the account number for payment of DC opening charges and marginal deposits (if any) </p>
            <p class="mb10">Hints: if a DC contains a condition without stipulating the document to indicate compliance with the condition, banks will deem such condition as not stated and will disregard it. </p>
            <p>其他指示：附有多项常行指示以供选择，例如：</p>
            <p><span class="cRed">-</span> 请注明如受益人要求「可转让信用证」或「保兑信用证」。 </p>
            <p><span class="cRed">-</span> 请订定汇价：客户可要求本行为信用证的最大面值金额订定远期汇率合约。 </p>
            <p class="mb10"><span class="cRed">-</span> 请注明支付开立信用证费用及保证金(如有)的户口号码。 </p>
            <p class="mb10">提示： 如果信用证含有一项条件，但未规定用以表明该条件得到满足的单据，银行将视为未作规定并不予理会。 </p>
            <el-checkbox-group v-model="form.otherInst" @change="otherInstCheckboxChage">
              <el-checkbox label="a">
                <span>This DC is transferable by</span>
                <el-radio-group v-model="form.otherInstTransBank" :disabled="disabledForm.otherInstTransBankDisabled" @change="otherInstTransBankRadioChage">
                  <el-radio label="A">advising bank</el-radio>
                  <el-radio label="B">others (please specify)</el-radio>
                  <el-form-item ref="otherInstTransBankAdd" prop="otherInstTransBankAdd"><el-input v-model="form.otherInstTransBankAdd" :disabled="disabledForm.otherInstTransBankAddDisabled"></el-input></el-form-item>
                </el-radio-group>
              </el-checkbox>
              <el-checkbox label="b">
                <span>DC confirmation required and confirmation charges for account of</span>
                <el-radio-group v-model="form.otherInstChargeAccNo" :disabled="disabledForm.otherInstChargeAccNoDisabled">
                  <el-radio label="A">Beneficiary</el-radio>
                  <el-radio label="B">Applicant.</el-radio>
                </el-radio-group>
              </el-checkbox>
              <el-checkbox label="c" checked disabled>
                <span>All documents must be issued in English. </span>
              </el-checkbox>
              <el-checkbox label="d">
                <span>All documents must showing this DC number.</span>
              </el-checkbox>
              <el-checkbox label="e">
                <span>Please fix exchange rate.</span>
              </el-checkbox>
              <el-checkbox label="f" checked disabled>
                <span>Debit your commission and charges from our account no. </span>
                <el-form-item ref="otherInstDebitAccNo1" prop="otherInstDebitAccNo1">
                  <el-select v-model="form.otherInstDebitAccNo1" placeholder="----请选择----" @change="otherInstDebitAccNo1Change">
                    <el-option v-for="item in options" :label="item.accNo+' ['+ $tools.dict.currTypeDict(item.currType) +']'+' ['+(item.alias==''?item.accName:item.alias)+']'" :value="item.accNo"></el-option>   
                  </el-select>
                </el-form-item>
              </el-checkbox>
              <el-checkbox label="g">
                <span>Debit marginal deposits from our account no.</span>
              </el-checkbox>
                <el-form-item ref="otherInstDebitAccNo2" prop="otherInstDebitAccNo2" >
                  <el-select class="lh28" v-model="form.otherInstDebitAccNo2" placeholder="----请选择----" :disabled="disabledForm.otherInstDebitAccNo2Disabled" @change="otherInstDebitAccNo2Change">
                    <el-option v-for="item in options" :label="item.accNo+' ['+ $tools.dict.currTypeDict(item.currType) +']'+' ['+(item.alias==''?item.accName:item.alias)+']'" :value="item.accNo"></el-option>   
                  </el-select>
                </el-form-item>
            </el-checkbox-group>
          </td>
        </tr>
        <tr>
          <td colspan="4" class="tableEvenText">
            <p class="mb10">Please fill in master DC details for issuance of Back-to-Back DC.  (Please note that the Bank only consider issuance of Back-to-Back DC if the master DC is advised through us and the original master DC will be held in our possession until exhausted or cancellation.)</p>
            <p>如开出「背对背信用证」，请填写「主信用证」资料。﹝请注意本行只接受其「主信用证」经由本行通知的背对背信用证申请，且「主信用证」必须留存本行直至其用耗或取消﹞</p>
              This is a back-to-back DC supported by master credit no.
              <el-form-item ref="backToBackCreditNo" prop="backToBackCreditNo"><el-input v-model="form.backToBackCreditNo"></el-input></el-form-item>
              issued by 
              <el-form-item ref="backToBackIssBank" prop="backToBackIssBank"><el-input v-model="form.backToBackIssBank"></el-input></el-form-item>. 
              The master credit is 
              <el-checkbox-group v-model="form.backToBackCloseOrNot" @change="backToBackCloseOrNotChange" style="display:inline;">
                <el-checkbox label="1">enclosed /</el-checkbox>
                <el-checkbox label="2">being held by you.</el-checkbox>
              </el-checkbox-group>
          </td>
        </tr>
        <tr>
          <td colspan="4" class="tableEvenText">
            <p class="mb10">We apply for the Bank’s issuance of an irrevocable documentary credit (“DC”) for our account in accordance with the above instructions (marked with an “√” where appropriate).  We agree that this application is subject to the terms and conditions below.</p>
            <p>本人等向银行申请根据以上以“√” 标示的指示开立信用证。本人等同意本申请书是受制于以下条件及条款。</p>
          </td>
        </tr>
        <tr>
          <td colspan="4" class="tableEvenText pageBreakAfter">
            <p class="mb10">This application must be signed by the Authorized signatory(ies) of Applicant with company chop.</p>
            <p>Please indicate the name and phone/fax number of the contact person(s).</p>
            <p>此申请书必须由申请人的授权人签署并加盖 公司公章。</p>
            <p>请列明联络人的姓名及电话/传真号码。</p>
          </td>
        </tr>
      </table>
      <table>
        <caption>附加附件（附件：支持zip压缩包格式，每个压缩包不要超过5M）</caption>
        <tr v-for="(item,index) in form.fileList">
          <td class="tableEvenText">
            <span>{{item.fileName}}</span>
            <a class="ml10 cBlue" @click="delAmountRange1(index)">删除</a>
          </td>
        </tr>
        <tr v-for="(item,index) in form.upLoadList" v-if="isShowUpload && !item.isDel">
          <td class="tableEvenText">
            <template>
              <el-form-item
                  :prop="'upLoadList.' + index + '.fileShow'"
                  :rules="uploadRules(index,'uploadListConfig')"
              >
                  <ynet-upload 
                    name="filePath2"
                    :configName="'uploadListConfig'+index"
                    action="/api/CB000019.do?versionNo=0.1"
                    :ref="'upLoadList'+index"
                    v-model="form.upLoadList[index].fileShow" 
                    :vm="returnVm()"
                    @uploadSuccess="uploadSuccess" 
                    @input="uploadInput" 
                    :isShowBtnUoload="['uploadListConfig'+index].isShowBtnUoload"
                    class="inline-block"
                    :index="index"
                  >
                  </ynet-upload>
                  <a @click="addUpLoadList(form.upLoadList.length,'uploadListConfig')" v-if="isShowAdd(index)">添加</a>
                  <a @click="delAmountRange(index)" v-if="isShowDel(index)">删除</a>
              </el-form-item>
            </template>
          </td>
        </tr>
      </table>
      <div>
        <p align="center">
          <el-form-item ref="isAgree" prop="isAgree">
            <el-checkbox-group v-model="form.isAgree" @change="isAgreeCheckboxChage">
              <el-checkbox label="1">
                <span>请阅读<a class="cBlue" @click="dialogVisible1 = true">《条款及条件》</a></span>
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
    <!-- 受益人账号 -->
    <div v-if="dialogVisible">
      <selectBeneficiary @selectBeneficiary="selectBeneficiary"></selectBeneficiary>
    </div>
    <!-- 受益人账号end -->
    <!-- swift代码 -->
    <div v-if="dialogVisible2">
      <selectSwift @selectSwift="selectSwift"></selectSwift>
    </div>
    <!-- swift代码end -->
    <!-- 条款及条件 -->
    <div>
      <el-dialog :visible.sync="dialogVisible1" width="910px" :close-on-click-modal="false" :close-on-press-escape="false">
        <div class="TermsAndConditions mt20">
          <h3 class="tac">Terms and Conditions</h3>
          <ul>
            <li v-for="(value,index) in conditionsList"><span>{{Number(index+1)}}.</span>{{value}}</li>
          </ul>
        </div>
        <span slot="footer" class="el-dialog__footer btnArea">
          <el-button @click="dialogVisible1 = false">关闭</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 条款及条件end -->
  </div>
</template>

<script>
import selectBeneficiary from '../components/selectBeneficiary' //受益人选择组件
import selectSwift from '../components/selectSwift' //受益人选择组件
export default {
  name:'templateStep1',
  components: {
    selectBeneficiary,
    selectSwift
  },
  props:{
    preData:{
      type: Object
    },
    preDisabledForm:{
      type: Object
    },
    turnUpNums:{
      type: Number
    }
  },
  data() {
    return {
      maintainForm:this.$route.params,
      loginStorage:this.$tools.storage.get("user","save"),
      conditionsList:[
        "This application and the documentary credit to be issued pursuant to this application (the “DC”, including the same as amended, extended or renewed from time to time) are subject to the latest version of Uniform Customs and Practice for Documentary Credits (the “UCP”) of the International Chamber of Commerce as are in effect on the issuance date of the DC.  This application is also subject to any agreement previously signed by the applicant (the “Applicant”) and delivered to Chong Hing Bank Limited (the “Bank”).  In case of conflict, terms of this application shall prevail to the extent of such conflict.  ",
        "The Applicant shall on demand reimburse the Bank in full in the same currency for each payment made, or required to be made, by the Bank under or pursuant to the DC together with interest from the date of such payment to the date of such reimbursement.  Such payment includes drawings, interest, costs, expenses, commissions, reimbursement claims from any nominated bank or confirming bank and any payment, prepayment or purchase effected by the Bank in connection with the DC.  The Applicant shall also upon demand pay to the Bank the fees, charges and commissions charged or incurred by the Bank or for which the Bank becomes liable under the DC.  ",
        "The Applicant shall indemnify the Bank and the Bank's delegate(s) on demand (on a full indemnity basis) against all liabilities, losses, payments, damages, demands, claims, expenses and costs (including legal fees), proceedings, actions and other consequences which the Bank or the Bank's delegate(s) may suffer or incur under or in connection with this application and/or the DC (except caused by the Bank’s gross negligence or wilful misconduct).",
        "The obligations of the Applicant owing to the Bank in connection with the DC shall not be affected by any alleged discrepancies or irregularities in the presented documents and/or any fraud or illegality (whether actual or alleged) in connection with any presented document, the DC and/or any underlying transaction of the DC or any event or circumstance not caused by the Bank’s gross negligence or wilful misconduct.",
        "The Applicant irrevocably authorizes the Bank to debit the Applicant’s account(s) for any sum owing or payable by the Applicant to the Bank.  Any monies debited from the Applicant’s account(s) or otherwise received by the Bank for settlement of any obligation or liability of the Applicant may, at the Bank’s sole discretion, be converted into the currency of the relevant obligation or liability at the prevailing exchange rate determined by the Bank (or any other agreed exchange rate, if any) to effect such settlement.",
        "If so required by the Bank, the Applicant shall pay cash margin or provide collateral to the Bank in an amount or value sufficient to cover any payment that is or may be required to be made by the Bank under the DC and any other actual or contingent obligations and liabilities of the Applicant owed to the Bank in connection with the DC. ",
        "Any cash margin paid to the Bank pursuant to or in connection with this application (“Cash Margin”) will be transferred to a specific purpose account (保证金账户) opened in the name of the Applicant and held with the Bank as security by way of pledge for the Applicant’s obligations under the DC and any other actual or contingent obligation and liability of the Applicant owed to the Bank in connection with the DC. The Bank has the right, at any time without notice or demand, to set off, apply and/or transfer the Cash Margin against and/or towards satisfaction of all or any of the obligations and liabilities of the Applicant to the Bank in connection with the DC.  The Bank may convert any of them at the prevailing exchange rate as may be absolutely determined by the Bank at its discretion for the purpose of the set-off, application and/or transfer. ",
        "All the terms and conditions of the DC must be identical to that of the master credit detailed overleaf (“Master Credit”), if any, except as otherwise agreed by the Bank.",
        "The Applicant undertakes to present all documents under the Master Credit to the Bank for the issuing bank's payment or the Bank's negotiation, purchase, prepayment or advance under the Master Credit.",
        "The Bank may supplement the terms and conditions of the DC as the Bank reasonably thinks appropriate.  ",
        "The Applicant undertakes to examine the applicant copy of the DC issued by the Bank to check its consistency with this application.  The Applicant irrevocably agrees that failure to give a notice of objection about the contents of the DC issued by the Bank within 5 banking days after the applicant copy of the DC is sent to the Applicant shall be deemed to be its waiver of any rights to raise objections or pursue any remedies against the Bank in respect of the DC.",
        "It is the sole responsibility of the Applicant to (i) ensure clarity, enforceability or effectiveness of any terms or requirements incorporated in the DC; and (ii) comply with all applicable laws and regulations regarding the underlying transaction to which the DC relates and obtain all necessary documents, licences and approvals from any governmental or regulatory bodies and provide such documents, licences and/or approvals to the Bank upon request. The Bank is not responsible for advising and has no duty whatsoever to advise the Applicant on such issues.",
        "If the Applicant instructs the Bank to permit T/T reimbursement under the DC, the Bank is irrevocably authorized to pay and/or reimburse the relevant claiming bank or reimbursing bank upon receipt of a claim from such bank even prior to the Bank's receipt of the presented documents under the DC.  The Applicant shall bear all the relevant risks (including, without limitation, non-receipt and non-compliance risks of the presented documents) and shall reimburse and indemnify the Bank for any payment made under the DC.",
        "The Bank is irrevocably authorized (but is not obliged) to (i) utilize documents presented under the DC for the drawing of the Master Credit; (ii) negotiate the presented documents, prepay the deferred payment undertaking incurred by the Bank, purchase the draft accepted by the Bank under the Master Credit or make any advance(s) against the documents presented (“Financing”); and (iii) directly apply the Financing proceeds of, or payment proceeds received under, the Master Credit to settle the corresponding drawing(s) under the DC and/or the Applicant’s obligations and liabilities under or arising out of the DC without first crediting such proceeds to the Applicant's account with the Bank, irrespective of discrepancies that may appear on the documents presented under the DC (all of which, if any, are hereby waived). The Bank is also irrevocably authorized (whether in the name of the Applicant or in the name of the Bank) to prepare, sign, complete and/or deliver the documents of whatever nature required by the Master Credit and to do such acts, instruments and things as desirable for drawing, claiming and/or collection of payment under the Master Credit.",
        "The Bank would refuse to process any transaction which may violate or breach any sanctions, embargo, anti-money laundering or counter-terrorist financing laws, regulations, rules, guidelines and procedures promulgated by the United Nations, the European Union, the United States of America, the United Kingdom, the Hong Kong Special Administrative Region, the People’s Republic of China (“PRC”) and all other jurisdictions to which the Bank or the Applicant are subject (“Sanctions”).  The Bank will not be liable for any claims, losses, damages, costs or expenses suffered by any party in connection with the Bank’s refusal to process such transactions.  The Applicant certifies that no shipment or transaction involved in this application is in violation of any Sanction. ",
        "As continuing security for the Applicant’s obligations and liabilities to the Bank, the Bank shall have and the Applicant hereby grants (i) a pledge and lien over the documents presented under the DC (the “Documents”); and (ii) a pledge over the goods represented by the Documents insofar as such goods are in or come into the Bank's actual or constructive possession (under which case notice of pledge will be given to the party in actual possession of the goods). The Bank has full authority (but no obligation) at the Bank's discretion to store and insure the pledged goods at the Applicant's risk and cost.  If the Applicant fails to duly perform or discharge its obligations or liabilities to the Bank, the Applicant hereby authorises the Bank to (at any time, without prior notice to or consent from the Applicant or any other person and in such manner as the Bank thinks fit) sell, dispose of or otherwise deal with any of the Documents and the pledged goods.  The Bank may apply the net proceeds of any sale, disposition or dealing of the Documents or the pledged goods in or towards the discharge of the Applicant’s obligations and liabilities to the Bank in such order and manner as the Bank may determine.",
        "The Bank shall not be liable to the Applicant for any action taken or not taken by it unless directly caused by the Bank’s gross negligence or wilful misconduct.  The Applicant authorizes the Bank to appoint any other person (including correspondent, agent or third party contractor) in relation to the services extended by the Bank in this application.  The Bank shall not be responsible or liable for any act, omission, default, negligence, insolvency or bankruptcy of any correspondent, agent or third party contractor, nor shall the Bank be responsible or liable for loss or delay of any documents in transit or in the possession of any correspondent, agent or third party contractor notwithstanding that the Bank may choose such correspondent, agent or third party contractor.  ",
        "The Applicant represents and declares that, except the Bank otherwise agrees, its application for issuance of the DC pursuant to this application is solely for the Applicant’s own business purposes and the Applicant is the contractual party for itself in the underlying transaction(s) relating to the DC.  The Applicant undertakes that (i) it shall not permit or allow any other party to utilize such documentary credit issuance facility made available by the Bank to the Applicant, whether directly or indirectly and (ii) any DC to be issued by the Bank under the abovementioned facility shall not be issued for the benefit of any other party, in each case unless the Bank otherwise agrees.",
        "This application for the DC issuance shall be a request by the Applicant to the Bank to issue such DC. No commitment by the Bank to issue such DC shall arise until and unless this application by the Applicant is accepted by the Bank either expressly or by the Bank’s issuing such DC pursuant to this application. ",
        "This application is governed by and shall be construed in accordance with the laws of the PRC, and the Applicant agrees to submit to the non-exclusive jurisdiction of the PRC courts at the place where the Bank is located.",
        "The Chinese version of this application is for reference purpose only.  If there is any conflict between the English and Chinese versions of this application, the English version shall prevail.",
      ],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      form: {
          branchNo:'',     //支行
          applyDate:'',  //申请日期
          LCNO:'',       //DC号
          appName:'',    //申请人名称
          appAddr:'',    //申请人地址
          dispatchType:'',  //传递信用证给通知行或受益人的方法
          dispatchCounter:'',
          dispatchCounterTel:'',
          beneficiary:'',  //受益人名称
          beneficiaryAddr:'',  //受益人地址
          advisingBank:'',  //信用证通知行
          CRY:'',    //以文字说明信用证货币
          amt:'',   //以文字说明信用证金额
          CRYFigures:'',    //以数字说明信用证货币
          AMTFigures:'',    //以数字说明信用证金额
          moreAmtPercent:'',
          lessAmtPercent:'',
          moreQuaPercent:'',
          lessQuaPercent:'',
          expDt:'',  //到期日
          expPlace:'',  //到期地点
          expPlaceAdd:'',
          periodPresentDays:'',  //交单期限
          periodPresentDaysAdd:'',  //交单期限补充
          portDeparture:'',  //发运地点
          portDestination:'',  //卸货港，或目的地机场
          placeDeparture:'',  //收获地点
          placeDestination:'',  //付运至
          notLaterThan:'',  //最晚日期
          partShip:'',  //是否允许分批运输
          transShip:'',  //是否允许转载
          insurance:'',  //保险
          LCAvailWith:'',  //信用证生效银行
          LCAvailWithAdd:'',
          LCAvailBy:'',
          LCAvailAt:'',
          LCAvailAtAdd1:'',
          LCAvailDraft:'',
          LCAvailDraftAdd:'',
          chargeLCOpen:[],  //信用证开立收费方式
          chargeAccept:[],
          chargeUsanceInt:[],
          chargeOutsideBank:[],
          chargeAdd:false,  //中间变量
          chargeAdd1:'',
          chargeAdd2:'',
          docItems:[],  //正式条款
          docSignOriginals:'',
          docSignCopies:'',
          docPackOriginals:'',
          docPackCopies:'',
          docCertfcOriginals:'',
          docCertfcCopies:'',
          docCertfcIssued:'',
          docBillSetNums:'',
          docBillTodo:'',
          docBillTodoAdd:'',
          docBillFreight:'',
          docBillFreightAdd:'',
          docBillIndicat:'',  //
          docAirWaybill:'',
          docAirWaybillAdd:'',
          docAirWaybillFreight:'',
          docAirWaybillFreightAdd:'',
          docAirWaybillIndicat:'',  //
          docTransSportSetNums:'',
          docTransSportTodo:'',
          docTransSportTodoAdd:'',
          docTransSportFreight:'',
          docTransSportFreightAdd:'',
          docTransSportIndicat:'',  //
          docInsuranceValue:'',
          docInsuranceInst:'',
          docInsuranceInstAdd:'',
          docInsuranceIrre:'',
          descGoods:'',
          tradeTerms:'',
          otherInst:[],  //其他条款
          otherInstTransBank:'',
          otherInstTransBankAdd:'',
          otherInstChargeAccNo:'',
          otherInstDebitAccNo1:'',
          otherInstDebitAccNo2:'',
          backToBack:'',
          backToBackCreditNo:'',
          backToBackIssBank:'',
          backToBackCloseOrNot:[],
          otherDoc:'',
          applyDate1:'',  //实际不需要，仅为校验方便
          expDt1:'',  //实际不需要，仅为校验方便
          notLaterThan1:'',  //实际不需要，仅为校验方便
          periodPresentDaysAdd1:'',  //实际不需要，仅为校验方便
          periodPresentDaysAdd2:'',  //实际不需要，仅为校验方便
          docBillTodoAdd1:'',  //实际不需要，仅为校验方便
          docBillTodoAdd2:'',  //实际不需要，仅为校验方便
          docTransSportTodoAdd1:'',  //实际不需要，仅为校验方便
          docTransSportTodoAdd2:'',  //实际不需要，仅为校验方便
          docInsuranceInstAdd1:'',  //实际不需要，仅为校验方便
          docInsuranceInstAdd2:'',  //实际不需要，仅为校验方便
          file1:'',
          file2:'',
          saveFilePath1:'',
          saveFilePath2:'',
          isAgree:false,  //基础条款同意与否
          upLoadList:[
            {filePath:'',newFileName:'',isDel:false,fileShow:''}
          ],
          fileList:[],
          PCH:'',  //批次号
          signedData:'',  //签名要素
          timeStamps:''
      },
      options:[],    //扣费账号数组（活期结算账号）
      uploadListConfig0:{
        isUploading:false,
        isClickUpload:false,
        isShowBtnUoload:true,
        isSuccess:false,
        fileSize:5
      },
      isValidator1:false,  //发运地点
      isValidator2:false,  //卸货港，或目的地机场
      isValidator3:false,  //收货地点
      isValidator4:false,  //付运至
      isValidator5:false,  //docItems
      isValidator6:false,  //otherDoc
      rules: {
        // appName:[
        //   {trigger:'blur', validator:this.$tools.validator.notChineseValidator}
        // ],
        appAddr:[
          {trigger:'blur', validator:this.$tools.validator.notChineseValidator}
        ],
        dispatchType:[
          {trigger: 'blur', message:'请选择',required:true}
        ],
        dispatchCounter:[
          {trigger: 'blur', validator:this.$tools.validator.disabledNonemptyValidator,vm:this,form:'disabledForm',disabled:"formName2Disabled"},
          {trigger: 'blur', validator:this.$tools.validator.notChineseValidator}
        ],
        dispatchCounterTel:[
          {trigger: 'blur', validator:this.$tools.validator.disabledNonemptyValidator,vm:this,form:'disabledForm',disabled:"formName2Disabled"},
          {trigger: 'blur', validator:this.$tools.validator.notChineseValidator}
        ],
        beneficiary:[
          {trigger: 'change', message:'请输入',required:true},
          {trigger: 'blur', validator:this.$tools.validator.notChineseValidator}
        ],
        beneficiaryAddr:[
          {trigger: 'change', message:'请输入',required:true},
          {trigger: 'blur', validator:this.$tools.validator.notChineseValidator}
        ],
        advisingBank:[
          {trigger: 'change', message:'请输入',required:true},
          {trigger: 'blur', validator:this.$tools.validator.notChineseValidator}
        ],
        CRYFigures:[
          {trigger: 'blur', message:'请选择',required:true}
        ],
        AMTFigures:[
          {trigger: 'blur', message:'请输入',required:true},
          {trigger: 'blur', validator:this.AMTFiguresValidator,required:true}
        ],
        CRY:[
          {trigger: 'blur', message:'请选择',required:true}
        ],
        amt:[
          {trigger: 'blur', message:'请输入',required:true},
          {trigger: 'blur', validator:this.$tools.validator.notChineseValidator},
          {trigger: 'blur', validator:this.notNumValidator}
        ],
        moreAmtPercent:[
          {trigger: 'blur',validator:this.percentValidator}
        ],
        lessAmtPercent:[
          {trigger: 'blur',validator:this.percentValidator}
        ],
        moreQuaPercent:[
          {trigger: 'blur',validator:this.percentValidator}
        ],
        lessQuaPercent:[
          {trigger: 'blur',validator:this.percentValidator}
        ],
        expDt:[
          {trigger: 'change', message:'请选择日期',required:true},
          // {trigger: 'change', validator:this.notLaterThanValidator}
        ],
        expPlace:[
          {trigger: 'blur', message:'请选择',required:true}
        ],
        expPlaceAdd: [
          {trigger: 'blur', validator:this.$tools.validator.disabledNonemptyValidator,vm:this,form:'disabledForm',disabled:"expPlaceAddDisabled"},
          {trigger: 'blur', validator:this.$tools.validator.notChineseValidator}
        ],
        periodPresentDays:[
          {trigger: 'change', message:'请选择',required:true}
        ],
        periodPresentDaysAdd1:[
          {trigger: 'blur', validator:this.$tools.validator.disabledNonemptyValidator,vm:this,form:'disabledForm',disabled:"periodPresentDaysAdd1Disabled"},
          {trigger: 'blur', validator:this.$tools.validator.notChineseValidator}
        ],
        periodPresentDaysAdd2:[
          {trigger: 'blur', validator:this.$tools.validator.disabledNonemptyValidator,vm:this,form:'disabledForm',disabled:"periodPresentDaysAdd2Disabled"},
          {trigger: 'blur', validator:this.$tools.validator.notChineseValidator}
        ],
        notLaterThan:[
          {trigger: 'change', message:'请选择日期',required:true},
          {trigger: 'change', validator:this.notLaterThanValidator}
        ],
        portDeparture:[
          {trigger: 'blur', validator:this.$tools.validator.notChineseValidator},
          {trigger: 'click', validator:this.portOrPlaceValidator},
          {trigger: 'blur', validator:this.portDepartureValidator}
        ],
        portDestination:[
          {trigger: 'blur', validator:this.$tools.validator.notChineseValidator},
          {trigger: 'click', validator:this.portOrPlaceValidator},
          {trigger: 'blur', validator:this.portDestinationValidator}
        ],
        placeDeparture:[
          {trigger: 'blur', validator:this.$tools.validator.notChineseValidator},
          {trigger: 'click', validator:this.portOrPlaceValidator},
          {trigger: 'blur', validator:this.placeDepartureValidator}
        ],
        placeDestination:[
          {trigger: 'blur', validator:this.$tools.validator.notChineseValidator},
          {trigger: 'click', validator:this.portOrPlaceValidator},
          {trigger: 'blur', validator:this.placeDestinationValidator}
        ],
        partShip:[
          {trigger: 'blur', message:'请选择',required:true}
        ],
        transShip:[
          {trigger: 'blur', message:'请选择',required:true}
        ],
        LCAvailWith:[
          {trigger: 'blur', message:'请选择',required:true}
        ],
        LCAvailWithAdd:[
          {trigger: 'blur', validator:this.$tools.validator.disabledNonemptyValidator,vm:this,form:'disabledForm',disabled:"LCAvailWithAddDisabled"},
          {trigger: 'blur', validator:this.$tools.validator.notChineseValidator}
        ],
        LCAvailBy:[
          {trigger: 'blur', message:'请选择',required:true}
        ],
        LCAvailAt:[
          {trigger: 'blur', message:'请选择',required:true}
        ],
        LCAvailAtAdd1:[
          {trigger: 'blur', validator:this.$tools.validator.disabledNonemptyValidator,vm:this,form:'disabledForm',disabled:"LCAvailAtAddDisabled"},
          {trigger: 'blur', validator:this.$tools.validator.notChineseValidator}
        ],
        LCAvailDraft:[
          {trigger: 'blur', message:'请选择',required:true}
        ],
        LCAvailDraftAdd:[
          {trigger: 'blur', validator:this.$tools.validator.disabledNonemptyValidator,vm:this,form:'disabledForm',disabled:"LCAvailDraftAddDisabled"},
          {trigger: 'blur', validator:this.$tools.validator.notChineseValidator}
        ],
        chargeLCOpen:[
          {trigger: 'blur', validator:this.oneOrAllValidator}
        ],
        chargeAccept:[
          {trigger: 'blur', validator:this.oneOrAllValidator}
        ],
        chargeUsanceInt:[
          {trigger: 'blur', validator:this.oneOrAllValidator}
        ],
        chargeOutsideBank:[
          {trigger: 'blur', validator:this.oneOrAllValidator}
        ],
        chargeAdd:[
          {trigger: 'blur', validator:this.oneOrAllValidator}
        ],
        chargeAdd1:[
          {trigger: 'blur', validator:this.$tools.validator.disabledNonemptyValidator,vm:this,form:'disabledForm',disabled:"chargeAdd1Disabled"},
          {trigger: 'blur', validator:this.$tools.validator.notChineseValidator}
        ],
        chargeAdd2:[
          {trigger: 'blur', validator:this.$tools.validator.disabledNonemptyValidator,vm:this,form:'disabledForm',disabled:"chargeAdd1Disabled"}
        ],
        docSignOriginals:[
          {trigger: 'blur', validator:this.$tools.validator.disabledNonemptyValidator,vm:this,form:'disabledForm',disabled:"docSignOriginalsDisabled"},
          {trigger: 'blur', validator:this.$tools.validator.notChineseValidator}
        ],
        docSignCopies:[
          {trigger: 'blur', validator:this.$tools.validator.disabledNonemptyValidator,vm:this,form:'disabledForm',disabled:"docSignOriginalsDisabled"},
          {trigger: 'blur', validator:this.$tools.validator.notChineseValidator}
        ],
        docPackOriginals:[
          {trigger: 'blur', validator:this.$tools.validator.disabledNonemptyValidator,vm:this,form:'disabledForm',disabled:"docPackOriginalsDisabled"},
          {trigger: 'blur', validator:this.$tools.validator.notChineseValidator}
        ],
        docPackCopies:[
          {trigger: 'blur', validator:this.$tools.validator.disabledNonemptyValidator,vm:this,form:'disabledForm',disabled:"docPackOriginalsDisabled"},
          {trigger: 'blur', validator:this.$tools.validator.notChineseValidator}
        ],
        docCertfcOriginals:[
          {trigger: 'blur', validator:this.$tools.validator.disabledNonemptyValidator,vm:this,form:'disabledForm',disabled:"docCertfcOriginalsDisabled"},
          {trigger: 'blur', validator:this.$tools.validator.notChineseValidator}
        ],
        docCertfcCopies:[
          {trigger: 'blur', validator:this.$tools.validator.disabledNonemptyValidator,vm:this,form:'disabledForm',disabled:"docCertfcOriginalsDisabled"},
          {trigger: 'blur', validator:this.$tools.validator.notChineseValidator}
        ],
        docCertfcIssued:[
          {trigger: 'blur', validator:this.$tools.validator.notChineseValidator}
        ],
        docBillSetNums:[
          {trigger: 'blur', validator:this.$tools.validator.disabledNonemptyValidator,vm:this,form:'disabledForm',disabled:"docBillSetNumsDisabled"},
          {trigger: 'blur', validator:this.$tools.validator.notChineseValidator}
        ],
        docBillTodo:[
          {trigger: 'blur', validator:this.allValidator,disabled:"docBillSetNumsDisabled"},
        ],
        docBillTodoAdd1:[
          {trigger: 'blur', validator:this.$tools.validator.disabledNonemptyValidator,vm:this,form:'disabledForm',disabled:"docBillTodoAddDisabled1"},
          {trigger: 'blur', validator:this.$tools.validator.notChineseValidator}
        ],
        docBillTodoAdd2:[
          {trigger: 'blur', validator:this.$tools.validator.disabledNonemptyValidator,vm:this,form:'disabledForm',disabled:"docBillTodoAddDisabled2"},
          {trigger: 'blur', validator:this.$tools.validator.notChineseValidator}
        ],
        docBillFreight:[
          {trigger: 'blur', validator:this.allValidator,disabled:"docBillSetNumsDisabled"},
        ],
        docBillFreightAdd:[
          {trigger: 'blur', validator:this.$tools.validator.notChineseValidator}
        ],
        docAirWaybill:[
          {trigger: 'blur', validator:this.allValidator,disabled:"docAirWaybillDisabled"},
        ],
        docAirWaybillAdd:[
          {trigger: 'blur', validator:this.$tools.validator.disabledNonemptyValidator,vm:this,form:'disabledForm',disabled:"docAirWaybillAddDisabled"},
          {trigger: 'blur', validator:this.$tools.validator.notChineseValidator}
        ],
        docAirWaybillFreight:[
          {trigger: 'blur', validator:this.allValidator,disabled:"docAirWaybillDisabled"},
        ],
        docAirWaybillFreightAdd:[
          {trigger: 'blur', validator:this.$tools.validator.notChineseValidator}
        ],
        docTransSportSetNums:[
          {trigger: 'blur', validator:this.$tools.validator.disabledNonemptyValidator,vm:this,form:'disabledForm',disabled:"docTransSportSetNumsDisabled"},
          {trigger: 'blur', validator:this.$tools.validator.notChineseValidator}
        ],
        docTransSportTodo:[
          {trigger: 'blur', validator:this.allValidator,disabled:"docTransSportSetNumsDisabled"},
        ],
        docTransSportTodoAdd1:[
          {trigger: 'blur', validator:this.$tools.validator.disabledNonemptyValidator,vm:this,form:'disabledForm',disabled:"docTransSportTodoAddDisabled1"},
          {trigger: 'blur', validator:this.$tools.validator.notChineseValidator}
        ],
        docTransSportTodoAdd2:[
          {trigger: 'blur', validator:this.$tools.validator.disabledNonemptyValidator,vm:this,form:'disabledForm',disabled:"docTransSportTodoAddDisabled2"},
          {trigger: 'blur', validator:this.$tools.validator.notChineseValidator}
        ],
        docTransSportFreight:[
          {trigger: 'blur', validator:this.allValidator,disabled:"docTransSportSetNumsDisabled"},
        ],
        docTransSportFreightAdd:[
          {trigger: 'blur', validator:this.$tools.validator.notChineseValidator}
        ],
        docInsuranceInst:[
          {trigger: 'blur', validator:this.$tools.validator.disabledNonemptyValidator,vm:this,form:'disabledForm',disabled:"docInsuranceValueDisabled"},
        ],
        docInsuranceInstAdd1:[
          {trigger: 'blur', validator:this.$tools.validator.disabledNonemptyValidator,vm:this,form:'disabledForm',disabled:"docInsuranceInstAddDisabled1"},
        ],
        docInsuranceValue:[
          {trigger: 'blur', validator:this.$tools.validator.notChineseValidator}
        ],
        docInsuranceInstAdd2:[
          {trigger: 'blur', validator:this.$tools.validator.disabledNonemptyValidator,vm:this,form:'disabledForm',disabled:"docInsuranceInstAddDisabled2"},
          {trigger: 'blur', validator:this.$tools.validator.notChineseValidator}
        ],
        docItems:[
          {trigger: 'blur', validator:this.docValidator}
        ],
        otherDoc:[
          {trigger: 'blur', validator:this.otherhDocValidator},
          {trigger: 'blur', validator:this.$tools.validator.notChineseValidator}
        ],
        descGoods:[
          {trigger: 'blur', message:'不能为空',required:true},
          {trigger: 'blur', validator:this.$tools.validator.notChineseValidator}
        ],
        tradeTerms:[
          {trigger: 'blur', validator:this.$tools.validator.notChineseValidator}
        ],
        otherInstTransBankAdd:[
          {trigger: 'blur', validator:this.$tools.validator.disabledNonemptyValidator,vm:this,form:'disabledForm',disabled:"otherInstTransBankAddDisabled"},
          {trigger: 'blur', validator:this.$tools.validator.notChineseValidator}
        ],
        otherInstDebitAccNo1:[
          {trigger: 'change', message:'不能为空',required:true}
        ],
        otherInstDebitAccNo2:[
          {trigger: 'blur', validator:this.$tools.validator.disabledNonemptyValidator,vm:this,form:'disabledForm',disabled:"otherInstDebitAccNo2Disabled"}
        ],
        backToBackCreditNo:[
          {trigger: 'blur', validator:this.$tools.validator.notChineseValidator}
        ],
        backToBackIssBank:[
          {trigger: 'blur', validator:this.$tools.validator.notChineseValidator}
        ],
        isAgree:[
          {trigger: 'blur', validator:this.isAgreeValidator,required:true}
        ]
      },
      dialogVisible:false,
      dialogVisible1:false,
      dialogVisible2:false,
      isShowUpload:true,
      disabledForm:{
        formName2Disabled:true,
        expPlaceAddDisabled:true,
        periodPresentDaysAdd1Disabled:true,
        periodPresentDaysAdd2Disabled:true,
        LCAvailWithAddDisabled:true,
        LCAvailAtAddDisabled:true,
        LCAvailDraftAddDisabled:true,
        chargeAdd1Disabled:true,
        docSignOriginalsDisabled:true,
        docPackOriginalsDisabled:true,
        docCertfcOriginalsDisabled:true,
        docBillSetNumsDisabled:true,
        docAirWaybillDisabled:true,
        docBillTodoAddDisabled1:true,
        docBillTodoAddDisabled2:true,
        docAirWaybillAddDisabled:true,
        docTransSportSetNumsDisabled:true,
        docTransSportTodoAddDisabled1:true,
        docTransSportTodoAddDisabled2:true,
        docInsuranceValueDisabled:true,
        docInsuranceInstAddDisabled1:true,
        docInsuranceInstAddDisabled2:true,
        otherInstTransBankDisabled:true,
        otherInstTransBankAddDisabled:true,
        otherInstChargeAccNoDisabled:true,
        otherInstDebitAccNo2Disabled:true,
      },
    }
  },
  methods: {
    addUpLoadList(index,configName){
      let _this = this
      _this[configName + index] = {
        isUploading:false,
        isClickUpload:false,
        isShowBtnUoload:true,
        isSuccess:false,
        fileSize:5
      }
      // console.log(_this[configName+index],configName+index)
      _this.form.upLoadList.push({filePath:"",newFileName:"",isDel:false,fileShow:''})
    },
    delAmountRange(index){
      let _this=this
      let firstIndex = _this.getFirstFileIndex()
      let count = _this.getFileListLength()
      _this.form.upLoadList[index].isDel = true
      if(index == firstIndex && count==1) _this.addUpLoadList(index+1,'uploadListConfig')
    },
    delAmountRange1(index){
      let _this = this
      this.$confirm('确定删除已上传的文件，重新上传文件？','温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type:'warning'
      }).then(() => {
        _this.form.fileList.splice(index,1)
        if(_this.form.fileList.length<4) _this.isShowUpload = true
      }).catch(() => {

      });
    },
    uploadRules(index,configName){
      let _this = this
      return [
        { trigger: 'change',validator:this.$tools.validator.fileValidator,fileType:['zip'],vm:this,configName:configName + index,requested:false}
      ]
    },
    isShowAdd(index){
      let _this=this
      let endIndex = _this.getEndFileIndex()
      let count = _this.getFileListLength()
      if(index != endIndex || count == 4) return false  //最后一个显示 已有4个不显示
      return true
    },
    isShowDel(index){
      let _this=this
      let firstIndex = _this.getFirstFileIndex()
      let count = _this.getFileListLength()
      if(index == firstIndex && count>=2) return true  //第一个 且个数>=2时显示
      else if(index == firstIndex) return false
      return true
    },
    getFirstFileIndex(){
      let _this = this
      let firstIndex = 0
      for(let i=0;i<_this.form.upLoadList.length;i++){
        if(!_this.form.upLoadList[i].isDel){
          firstIndex = i
          break
        }
      }
      return firstIndex
    },
    getEndFileIndex(){
      let _this = this
      let endIndex = 0
      for(let i=0;i<_this.form.upLoadList.length;i++){
        if(!_this.form.upLoadList[i].isDel){
          endIndex = i
        }
      }
      return endIndex
    },
    getFileListLength(){
      let _this = this
      // let count = _this.form.upLoadList.length
      let count = _this.form.upLoadList.length + _this.form.fileList.length
      for(let i=0;i<_this.form.upLoadList.length;i++){
        if(_this.form.upLoadList[i].isDel){
          --count
        }
      }
      return count
    },
    returnVm(){
      return this
    },
    uploadInput(value,index){
      let _this = this
      if(typeof(index)=='number'){
        if(!_this['uploadListConfig'+index].isSuccess) _this.form.upLoadList[index].newFileName = value.substring(value.lastIndexOf('\\')+1)
      }
      // console.log(_this.form.upLoadList[index].newFileName,index)
    },
    uploadSuccess(data){
      let _this = this
      // console.log(data,"data")
      for(let i=0;i<_this.form.upLoadList.length;i++){
        if(_this.form.upLoadList[i].fileShow == data.body.newFileName){
          _this.form.upLoadList[i].filePath = data.body.flowNo
          _this.form.upLoadList[i].fileShow = ''
        }
      }
    },
    selectDate(val){
      this.form.applyDate = this.$tools.utils.formatDate(val,{removeFormat:true})
    },
    selectExpDt(val){
      let _this = this
      _this.form.expDt = _this.$tools.utils.formatDate(val,{removeFormat:true})
      _this.$refs['expDt'].validate("change")
    },
    selectNotLaterThan(val){
      let _this = this
      _this.form.notLaterThan = _this.$tools.utils.formatDate(val,{removeFormat:true})
      _this.$refs['notLaterThan'].validate("change")
    },
    changeCRY(formName){
      let _this = this
      _this.form.CRY = _this.form.CRYFigures
      _this.$refs[formName].validate("blur")
    },
    radioChage(val){
      let _this=this
      if(val=="4"){
        _this.disabledForm.formName2Disabled=false
      }else{
        _this.disabledForm.formName2Disabled=true
        _this.form.dispatchCounter=""
        _this.form.dispatchCounterTel=""
        _this.$refs['dispatchCounter'].validate("blur")
        _this.$refs['dispatchCounterTel'].validate("blur")
      }
      _this.$refs['dispatchType'].validate("blur")
    },
    AMTFiguresValidator(rule,value,callback){
      let _this = this
      if(_this.form.CRYFigures=='JPY' && value.substring(value.indexOf(".")+1) != '00'){
        return callback('日元只能输入整数，请重新输入！')
      }
      callback()
    },
    notNumValidator(rule,value,callback){
      let _this = this
      if(/[0-9]+/.test(value)){
        callback("不可输入阿拉伯数字，请重新输入！")
      }
      callback()
    },
    percentValidator(rule,value,callback){
      let _this = this
      if(!_this.$tools.validator.isNumber(value)) return callback("请输入数字")
      if(Number(value)<0 || Number(value)>99.99) return callback('请输入0-99.99之间的数字')
      if(value != _this.$tools.utils.currencyReg(value)) return callback('只能输入两位小数')
      callback()
    },
    notLaterThanValidator(rule,value,callback){
      let _this = this
      // if(_this.form.expDt1!="" && _this.form.notLaterThan1!="" && _this.form.notLaterThan1.getTime()>_this.form.expDt1.getTime()) return callback("货物最迟的发运日期不可大于信用证到期日")
      if(_this.form.expDt1!="" && _this.form.notLaterThan1!="" && _this.form.notLaterThan1>_this.form.expDt1) return callback("货物最迟的发运日期不可大于信用证到期日")
      callback()
    },
    expPlaceRadioChage(val){
      let _this=this
      if(val=="3"){
        _this.disabledForm.expPlaceAddDisabled=false
      }else{
        _this.disabledForm.expPlaceAddDisabled=true
        _this.form.expPlaceAdd=""
        _this.$refs['expPlaceAdd'].validate("blur")
      }
      _this.$refs['expPlace'].validate("blur")
    },
    periodPresentDaysRadioChage(val){
      let _this = this
      if(val=='1'){
        _this.disabledForm.periodPresentDaysAdd1Disabled = false
        _this.disabledForm.periodPresentDaysAdd2Disabled = true
        _this.form.periodPresentDaysAdd2 = ""
        _this.$refs['periodPresentDaysAdd2'].validate("blur")
      }else if(val=='2'){
        _this.disabledForm.periodPresentDaysAdd1Disabled = true
        _this.disabledForm.periodPresentDaysAdd2Disabled = false
        _this.form.periodPresentDaysAdd1 = ""
        _this.$refs['periodPresentDaysAdd1'].validate("blur")
      }else{
        _this.form.periodPresentDaysAdd1 = ""
        _this.form.periodPresentDaysAdd2 = ""
        _this.disabledForm.periodPresentDaysAdd1Disabled = false
        _this.disabledForm.periodPresentDaysAdd2Disabled = false
      }
    },
    portOrPlaceValidator(rule,value,callback){
      let _this = this
      if(_this.form.portDeparture=="" && _this.form.portDestination=="" && _this.form.placeDeparture=="" && _this.form.placeDestination=="") return callback("四项不能同时为空")
      callback()
    },
    portDepartureValidator(rule,value,callback){
      let _this = this
      _this.isValidator1 = false
      if($.trim(value)=="" && _this.form.portDestination!=""){
        _this.isValidator1 = true
        return callback("上下两项需同时填写或同时为空")
      }else if($.trim(value)=="" && _this.form.portDestination==""){
        if(_this.isValidator2){
          setTimeout(function(){
            _this.$refs['portDestination'].validate("blur")
          },0)
        }
        callback()
      }
      callback()
    },
    portDestinationValidator(rule,value,callback){
      let _this = this
      _this.isValidator2 = false
      if($.trim(value)=="" && _this.form.portDeparture!=""){
        _this.isValidator2 = true
        return callback("上下两项需同时填写或同时为空")
      }else if($.trim(value)=="" && _this.form.portDeparture==""){
        if(_this.isValidator1){
          setTimeout(function(){
            _this.$refs['portDeparture'].validate("blur")
          },0)
        }
        callback()
      }
      callback()
    },
    placeDepartureValidator(rule,value,callback){
      let _this = this
      _this.isValidator3 = false
      if($.trim(value)=="" && _this.form.placeDestination!=""){
        _this.isValidator3 = true
        return callback("上下两项需同时填写或同时为空")
      }else if($.trim(value)=="" && _this.form.placeDestination==""){
        if(_this.isValidator4){
          setTimeout(function(){
            _this.$refs['placeDestination'].validate("blur")
          },0)
        }
        callback()
      }
      callback()
    },
    placeDestinationValidator(rule,value,callback){
      let _this = this
      _this.isValidator4 = false
      if($.trim(value)=="" && _this.form.placeDeparture!=""){
        _this.isValidator4 = true
        return callback("上下两项需同时填写或同时为空")
      }else if($.trim(value)=="" && _this.form.placeDeparture==""){
        if(_this.isValidator3){
          setTimeout(function(){
            _this.$refs['placeDeparture'].validate("blur")
          },0)
        }
        callback()
      }
      callback()
    },
    partShipRadioChage(val){
      this.$refs['partShip'].validate("blur")
    },
    transShipRadioChage(val){
      this.$refs['transShip'].validate("blur")
    },
    insuranceRadioChage(val){
      this.$refs['insurance'].validate("blur")
    },
    LCAvailWithRadioChage(val){
      let _this=this
      if(val=="3"){
        _this.disabledForm.LCAvailWithAddDisabled=false
      }else{
        _this.disabledForm.LCAvailWithAddDisabled=true
        _this.form.LCAvailWithAdd=""
        _this.$refs['LCAvailWith'].validate("blur")
        _this.$refs['LCAvailWithAdd'].validate("blur")
      }
    },
    LCAvailByRadioChage(val){
      let _this = this
      _this.$refs['LCAvailBy'].validate("blur")
    },
    LCAvailAtRadioChage(val){
      let _this=this
      if(val=="2"){
        _this.disabledForm.LCAvailAtAddDisabled=false
      }else{
        _this.disabledForm.LCAvailAtAddDisabled=true
        _this.form.LCAvailAtAdd1=""
        _this.$refs['LCAvailAt'].validate("blur")
        _this.$refs['LCAvailAtAdd1'].validate("blur")
      }
    },
    LCAvailDraftRadioChage(val){
      let _this=this
      if(val=="2"){
        _this.disabledForm.LCAvailDraftAddDisabled=false
      }else{
        _this.disabledForm.LCAvailDraftAddDisabled=true
        _this.form.LCAvailDraftAdd=""
        _this.$refs['LCAvailDraft'].validate("blur")
        _this.$refs['LCAvailDraftAdd'].validate("blur")
      }
    },
    oneOrAllValidator(rule,value,callback){
      let _this = this
      if(_this.form.chargeLCOpen=="" && _this.form.chargeAccept=="" && _this.form.chargeUsanceInt=="" && _this.form.chargeOutsideBank=="" && !_this.form.chargeAdd){
        callback("五项至少选择一项")
      }
      callback()
    },
    chargeLCOpenCheckChage(val){
      let _this = this
      if(val.length==2){
        let value = val[1]
        _this.form.chargeLCOpen = []
        _this.form.chargeLCOpen.push(value)
      }
      _this.chargeLCOpenRadioChage()
    },
    chargeAcceptCheckChage(val){
      let _this = this
      if(val.length==2){
        let value = val[1]
        _this.form.chargeAccept = []
        _this.form.chargeAccept.push(value)
      }
      _this.chargeLCOpenRadioChage()
    },
    chargeUsanceIntCheckChage(val){
      let _this = this
      if(val.length==2){
        let value = val[1]
        _this.form.chargeUsanceInt = []
        _this.form.chargeUsanceInt.push(value)
      }
      _this.chargeLCOpenRadioChage()
    },
    chargeOutsideBankCheckChage(val){
      let _this = this
      if(val.length==2){
        let value = val[1]
        _this.form.chargeOutsideBank = []
        _this.form.chargeOutsideBank.push(value)
      }
      _this.chargeLCOpenRadioChage()
    },
    chargeAddCheckboxChage(val){
      let _this=this
      // setTimeout(function(){
        if(_this.form.chargeAdd){
          _this.disabledForm.chargeAdd1Disabled=false
        }else{
          _this.disabledForm.chargeAdd1Disabled=true
          _this.form.chargeAdd1=""
          _this.form.chargeAdd2=""
          _this.$refs['chargeAdd1'].validate("blur")
          _this.$refs['chargeAdd2'].validate("blur")
        }
      // },0)
      _this.chargeLCOpenRadioChage()
    },
    chargeLCOpenRadioChage(){
      let _this = this
      _this.$refs['chargeLCOpen'].validate("blur")
      _this.$refs['chargeAccept'].validate("blur")
      _this.$refs['chargeUsanceInt'].validate("blur")
      _this.$refs['chargeOutsideBank'].validate("blur")
      _this.$refs['chargeAdd'].validate("blur")
    },
    chargeAdd2RadioChage(val){
      let _this = this
      if(val) _this.$refs['chargeAdd2'].validate("blur")
    },
    docItemsCheckboxChage(val){    //大多选框
      let _this=this
      // setTimeout(function(){
        let _A = false
        let _B = false
        let _C = false
        let _D = false
        let _E = false
        let _F = false
        let _G = false
        let _H = false
        for(let i=0;i<=_this.form.docItems.length-1;i++){
          if(_this.form.docItems[i]=="A"){
            _this.disabledForm.docSignOriginalsDisabled=false
            _A = true
          }
          if(_this.form.docItems[i]=="B"){
            _this.disabledForm.docPackOriginalsDisabled=false
            _B = true
          }
          if(_this.form.docItems[i]=="C"){
            _this.disabledForm.docCertfcOriginalsDisabled=false
            _C = true
          }
          if(_this.form.docItems[i]=="D"){
            _this.disabledForm.docBillSetNumsDisabled=false
            _D = true
          }
          if(_this.form.docItems[i]=="E"){
            _this.disabledForm.docAirWaybillDisabled=false
            _E = true
          }
          if(_this.form.docItems[i]=="F"){
            _this.disabledForm.docTransSportSetNumsDisabled=false
            _F = true
          }
          if(_this.form.docItems[i]=="H"){
            _this.disabledForm.docInsuranceValueDisabled=false
            _H = true
          }
        }
        if($.trim(_this.form.docItems)==""){
          _this.controlDocDisabled(false,'O')
        }else {
          _this.$refs['docItems'].validate("blur")
          _this.controlDocDisabled(_A,'A')
          _this.controlDocDisabled(_B,'B')
          _this.controlDocDisabled(_C,'C')
          _this.controlDocDisabled(_D,'D')
          _this.controlDocDisabled(_E,'E')
          _this.controlDocDisabled(_F,'F')
          _this.controlDocDisabled(_H,'H')
        }
      // },0)
    },
    controlDocDisabled(item,val){    //DOC多选框验证 (当没有选对应复选框时，需校验)
      let _this = this
      if(item=='undefined' || item=="" || !item || val=='O'){
      // if((!(item!='undefined'&&item!=""&&item))||val=='O'){
        switch(val){
          case 'O':
          case 'A':
            _this.disabledForm.docSignOriginalsDisabled=true
            _this.form.docSignOriginals=""
            _this.form.docSignCopies=""
            _this.$refs['docSignOriginals'].validate("blur")
            _this.$refs['docSignCopies'].validate("blur")
            if(val=='A') {break;}
          case 'B':
            _this.disabledForm.docPackOriginalsDisabled=true
            _this.form.docPackOriginals=""
            _this.form.docPackCopies=""
            _this.$refs['docPackOriginals'].validate("blur")
            _this.$refs['docPackCopies'].validate("blur")
            if(val=='B') {break;}
          case 'C':
            _this.disabledForm.docCertfcOriginalsDisabled=true
            _this.form.docCertfcOriginals=""
            _this.form.docCertfcCopies=""
            _this.form.docCertfcIssued=""
            _this.$refs['docCertfcOriginals'].validate("blur")
            _this.$refs['docCertfcCopies'].validate("blur")
            _this.$refs['docCertfcIssued'].validate("blur")
            if(val=='C') {break;}
          case 'D':
            _this.disabledForm.docBillSetNumsDisabled=true
            _this.form.docBillSetNums=""
            _this.form.docBillTodo=""
            _this.form.docBillFreight=""
            _this.form.docBillFreightAdd=""
            _this.form.docBillIndicat=""
            _this.$refs['docBillSetNums'].validate("blur")
            _this.$refs['docBillFreightAdd'].validate("blur")
            _this.docBillTodoRadioChage()
            _this.docBillFreightRadioChage()
            if(val=='D') {break;}
          case 'E':
            _this.disabledForm.docAirWaybillDisabled=true
            _this.form.docAirWaybill=""
            _this.form.docAirWaybillFreight=""
            _this.form.docAirWaybillFreightAdd=""
            _this.form.docAirWaybillIndicat=""
            _this.$refs['docAirWaybillFreightAdd'].validate("blur")
            _this.docAirWaybillRadioChage()
            _this.docAirWaybillFreightRadioChage()
            if(val=='E') {break;}
          case 'F':
            _this.disabledForm.docTransSportSetNumsDisabled=true
            _this.form.docTransSportSetNums=""
            _this.form.docTransSportTodo=""
            _this.form.docTransSportFreight=""
            _this.form.docTransSportFreightAdd=""
            _this.form.docTransSportIndicat=""
            _this.$refs['docTransSportSetNums'].validate("blur")
            _this.$refs['docTransSportFreightAdd'].validate("blur")
            _this.docTransSportTodoRadioChage()
            _this.docTransSportFreightRadioChage()
            if(val=='F') {break;}
          case 'G':
            if(val=='G') {break;}
          case 'H':
            _this.disabledForm.docInsuranceValueDisabled=true
            _this.disabledForm.docInsuranceInstAddDisabled1=true
            _this.disabledForm.docInsuranceInstAddDisabled2=true
            _this.form.docInsuranceInst = ""
            _this.form.docInsuranceValue = ""
            _this.form.docInsuranceIrre = ""
            _this.$refs['docInsuranceValue'].validate("blur")
            _this.docInsuranceInstRadioChage()
            if(val=='H') {break;}
        }
      }
    },
    allValidator(rule,value,callback){  //D验证
      let _this = this
      if(!_this.disabledForm[rule.disabled] && value==""){
        callback("请选择")
      }
      callback()
    },
    docBillTodoRadioChage(val){    //D
      let _this=this
      _this.$refs['docBillTodo'].validate("blur")
      if(val=="2"){
        _this.disabledForm.docBillTodoAddDisabled1=false
        _this.disabledForm.docBillTodoAddDisabled2=true
        _this.form.docBillTodoAdd2=""
        _this.$refs['docBillTodoAdd2'].validate("blur")
      }else if(val=="3"){
        _this.disabledForm.docBillTodoAddDisabled1=true
        _this.disabledForm.docBillTodoAddDisabled2=false
        _this.form.docBillTodoAdd1=""
        _this.$refs['docBillTodoAdd1'].validate("blur")
      }else{
        _this.disabledForm.docBillTodoAddDisabled1=true
        _this.disabledForm.docBillTodoAddDisabled2=true
        _this.form.docBillTodoAdd1=""
        _this.form.docBillTodoAdd2=""
        _this.$refs['docBillTodoAdd1'].validate("blur")
        _this.$refs['docBillTodoAdd2'].validate("blur")
      }
    },
    docBillFreightRadioChage(val){   //D
      let _this=this
      _this.$refs['docBillFreight'].validate("blur")
    },
    docAirWaybillRadioChage(val){   //E
      let _this=this
      _this.$refs['docAirWaybill'].validate("blur")
      if(val=="3"){
        _this.disabledForm.docAirWaybillAddDisabled=false
      }else{
        _this.disabledForm.docAirWaybillAddDisabled=true
        _this.form.docAirWaybillAdd=""
        _this.$refs['docAirWaybillAdd'].validate("blur")
      }
    },
    docAirWaybillFreightRadioChage(val){   //E
      let _this=this
      _this.$refs['docAirWaybillFreight'].validate("blur")
    },
    docTransSportTodoRadioChage(val){   //F
      let _this=this
      _this.$refs['docTransSportTodo'].validate("blur")
      if(val=="2"){
        _this.disabledForm.docTransSportTodoAddDisabled1=false
        _this.disabledForm.docTransSportTodoAddDisabled2=true      
        _this.form.docTransSportTodoAdd2=""
        _this.$refs['docTransSportTodoAdd2'].validate("blur")
      }else if(val=="3"){
        _this.disabledForm.docTransSportTodoAddDisabled1=true
        _this.disabledForm.docTransSportTodoAddDisabled2=false
        _this.form.docTransSportTodoAdd1=""
        _this.$refs['docTransSportTodoAdd1'].validate("blur")
      }else{
        _this.disabledForm.docTransSportTodoAddDisabled1=true
        _this.disabledForm.docTransSportTodoAddDisabled2=true        
        _this.form.docTransSportTodoAdd1=""
        _this.form.docTransSportTodoAdd2=""
        _this.$refs['docTransSportTodoAdd1'].validate("blur")
        _this.$refs['docTransSportTodoAdd2'].validate("blur")
      }
    },
    docTransSportFreightRadioChage(val){   //F
      let _this=this
      _this.$refs['docTransSportFreight'].validate("blur")
    },
    docInsuranceInstRadioChage(val){   //H
      let _this=this
      _this.$refs['docInsuranceInst'].validate("blur")
      if(val=="1"){
        _this.disabledForm.docInsuranceInstAddDisabled1=false
        _this.disabledForm.docInsuranceInstAddDisabled2=true
        _this.form.docInsuranceInstAdd2 = ""
        _this.$refs['docInsuranceInstAdd2'].validate("blur")
      }else if(val=="4"){
        _this.disabledForm.docInsuranceInstAddDisabled1=true
        _this.disabledForm.docInsuranceInstAddDisabled2=false
        _this.form.docInsuranceInstAdd1 = ""
      }else{
        _this.disabledForm.docInsuranceInstAddDisabled1=true
        _this.disabledForm.docInsuranceInstAddDisabled2=true
        _this.form.docInsuranceInstAdd1 = ""
        _this.form.docInsuranceInstAdd2 = ""
        _this.$refs['docInsuranceInstAdd2'].validate("blur")
      }
    },
    docInsuranceInstAdd1RadioChage(val){  //H小单选框组
      let _this = this
      _this.$refs['docInsuranceInstAdd1'].validate("blur")
    },
    otherInstCheckboxChage(val){      //小多选框
      let _this=this
      // setTimeout(function(){
        let _a = false
        let _b = false
        let _g = false
        for(let i=0;i<=_this.form.otherInst.length-1;i++){
          if(_this.form.otherInst[i]=="a"){
            _this.disabledForm.otherInstTransBankDisabled=false
            _a = true
          }
          if(_this.form.otherInst[i]=="b"){
            _this.disabledForm.otherInstChargeAccNoDisabled=false
            _b = true
          }
          if(_this.form.otherInst[i]=="g"){
            _this.disabledForm.otherInstDebitAccNo2Disabled=false
            _g = true
          }
        }
        if($.trim(_this.form.otherInst)==""){
          _this.controlDocDisabled(false,'O')
        }else {
          _this.controlOtherInstDisabled(_a,'a')
          _this.controlOtherInstDisabled(_b,'b')
          _this.controlOtherInstDisabled(_g,'g')
        }
      // },0)
    },
    controlOtherInstDisabled(item,val){    //OtherInst多选框验证
      let _this = this
      if(item=='undefined' || item=="" || !item || val=='O'){
      // if((!(item!='undefined'&&item!=""&&item))){
        switch(val){
          case 'a':
            _this.disabledForm.otherInstTransBankDisabled=true
            _this.form.otherInstTransBank = ""
            _this.otherInstTransBankRadioChage()
            break;
          case 'b':
            _this.disabledForm.otherInstChargeAccNoDisabled=true
            _this.form.otherInstChargeAccNo = ""
            break;
          case 'g':
            _this.disabledForm.otherInstDebitAccNo2Disabled=true
            _this.form.otherInstDebitAccNo2=""
            _this.$refs['otherInstDebitAccNo2'].validate("blur")
            break;
        }
      }
    },
    otherInstTransBankRadioChage(val){   //a
      let _this=this
      if(val=="B"){
        _this.disabledForm.otherInstTransBankAddDisabled=false
      }else{
        _this.disabledForm.otherInstTransBankAddDisabled=true
        _this.form.otherInstTransBankAdd=""
        _this.$refs['otherInstTransBankAdd'].validate("blur")
      }
    },
    selectBeneficiary(val){
      let _this = this
      if (val != null && val != undefined && JSON.stringify(val)!='{}') {
        _this.form.beneficiary = val.beneficiaryName
        _this.form.beneficiaryAddr = val.beneficiaryAddress
      }
      _this.dialogVisible = false
    },
    selectSwift(val){
      let _this = this
      if (val != null && val != undefined && JSON.stringify(val)!='{}') {
        _this.form.advisingBank = val.swiftNo
      }
      _this.dialogVisible2 = false
    },
    docValidator(rule,value,callback){
      let _this = this
      _this.isValidator5 = false
      if(String(_this.form.docItems)==''&&_this.form.otherDoc==''){
        _this.isValidator5 = true
        return callback('Documents Required 与 Other Documents 至少填写一项')
      }else if(_this.form.otherDoc==''){
        if(_this.isValidator6){
          setTimeout(function(){
            _this.$refs['otherDoc'].validate("blur")
          },0)
        }
        callback()
      }
      callback()
    },
    otherhDocValidator(rule,value,callback){
      let _this = this
      _this.isValidator6 = false
      if(String(_this.form.docItems)==''&&_this.form.otherDoc==''){
        _this.isValidator6 = true
        return callback('Documents Required 与 Other Documents 至少填写一项')
      }else if(String(_this.form.docItems)==''){
        if(_this.isValidator5){
          setTimeout(function(){
            _this.$refs['docItems'].validate("blur")
          },0)
        }
        callback()
      }
      callback()
    },
    otherInstDebitAccNo1Change(val){
      let _this = this
      for(let index in _this.options){
        if(_this.options[index].accNo == val){
          _this.form.branchNo = _this.options[index].openBankNo
          break
        }
      }
    },
    otherInstDebitAccNo2Change(val){
      this.$refs['otherInstDebitAccNo2'].validate("blur")
    },
    backToBackCloseOrNotChange(val){
      let _this = this
      if(val.length==2){
        let value = val[1]
        _this.form.backToBackCloseOrNot = []
        _this.form.backToBackCloseOrNot.push(value)
      }
    },
    isAgreeCheckboxChage(val){
      let _this = this
      // setTimeout(function(){
        if(_this.form.isAgree) _this.$refs['isAgree'].validate("blur")
      // },0)
    },
    isAgreeValidator(rule,value,callback){
      let _this = this
      if(!value) return callback('请阅读并同意《条款与条件》')
      callback()
    },
    itemsFormat(name1){  //[A,B,C]-->A,B,C
      let _this = this
      let item = ''
      for(let i=0;i<_this.form[name1].length;i++){
        if(i==_this.form[name1].length-1){
          item = item+_this.form[name1][i]
          continue
        }
        item = item+_this.form[name1][i]+','
      }
      return item
    },
    submitForm() {
      let _this=this
      _this.$refs['form'].validate((valid) => {
        if(valid && _this.form.isAgree) {
          _this.form.docItems = _this.itemsFormat('docItems')     //为了保持print页面显示一致
          _this.form.otherInst = _this.itemsFormat('otherInst')  //为了保持print页面显示一致
          // （二期）_this.form.otherDoc = _this.$tools.validator.formatHTML(_this.form.otherDoc)  //为了保持print页面显示一致
          if(_this.form.periodPresentDays=='1') {_this.form.periodPresentDaysAdd = _this.form.periodPresentDaysAdd1}
          else if(_this.form.periodPresentDays=='2') {_this.form.periodPresentDaysAdd = _this.form.periodPresentDaysAdd2}
          if(_this.form.docBillTodo=='2') {_this.form.docBillTodoAdd = _this.form.docBillTodoAdd1}
          else if(_this.form.docBillTodo=='3') {_this.form.docBillTodoAdd = _this.form.docBillTodoAdd2}
          if(_this.form.docTransSportTodo=='2') {_this.form.docTransSportTodoAdd = _this.form.docTransSportTodoAdd1}
          else if(_this.form.docTransSportTodo=='3') {_this.form.docTransSportTodoAdd = _this.form.docTransSportTodoAdd2}
          if(_this.form.docInsuranceInst=='1') {_this.form.docInsuranceInstAdd = _this.form.docInsuranceInstAdd1}
          else if(_this.form.docInsuranceInst=='4') {_this.form.docInsuranceInstAdd = _this.form.docInsuranceInstAdd2}
          for(let item of _this.form.upLoadList){
            if(!item.isDel){
              if(item.newFileName=='' || item.filePath=='') continue
              _this.form.fileList.push({fileName:item.newFileName,fileCode:item.filePath,filePath:''})
            }
          }
          _this.form.upLoadList = []
          _this.addUpLoadList(0,'uploadListConfig')
          _this.$emit("changeStep","1",_this.form,false,_this.disabledForm)
        }else{
          console.log('error submit!!')
          return false
        }
      });
    },
    resetForm() {
      let _this=this
      _this.$refs['form'].resetFields()
      _this.form.appName = _this.loginStorage.cstEN
      _this.form.chargeAdd = false
      _this.form.docBillIndicat = ''
      _this.form.docAirWaybillIndicat = ''
      _this.form.docTransSportIndicat = ''
      _this.form.otherInst = ['c','f']
      _this.disabledForm.formName2Disabled = true
      _this.disabledForm.expPlaceAddDisabled = true
      _this.disabledForm.periodPresentDaysAdd1Disabled = true
      _this.disabledForm.periodPresentDaysAdd2Disabled = true
      _this.disabledForm.LCAvailWithAddDisabled = true
      _this.disabledForm.LCAvailAtAddDisabled = true
      _this.disabledForm.LCAvailDraftAddDisabled = true
      _this.disabledForm.chargeAdd1Disabled = true
      _this.disabledForm.docSignOriginalsDisabled = true
      _this.disabledForm.docPackOriginalsDisabled = true
      _this.disabledForm.docCertfcOriginalsDisabled = true
      _this.disabledForm.docBillSetNumsDisabled = true
      _this.disabledForm.docAirWaybillDisabled = true
      _this.disabledForm.docBillTodoAddDisabled1 = true
      _this.disabledForm.docBillTodoAddDisabled2 = true
      _this.disabledForm.docAirWaybillAddDisabled = true
      _this.disabledForm.docTransSportSetNumsDisabled = true
      _this.disabledForm.docTransSportTodoAddDisabled1 = true
      _this.disabledForm.docTransSportTodoAddDisabled2 = true
      _this.disabledForm.docInsuranceValueDisabled = true
      _this.disabledForm.docInsuranceInstAddDisabled1 = true
      _this.disabledForm.docInsuranceInstAddDisabled2 = true
      _this.disabledForm.otherInstTransBankDisabled = true
      _this.disabledForm.otherInstTransBankAddDisabled = true
      _this.disabledForm.otherInstChargeAccNoDisabled = true
      _this.disabledForm.otherInstDebitAccNo2Disabled = true
    },
    checkOptionsArray(option){
      return option.right.substr(0,1)=='1' && option.type=='1' && option.cstNo==this.loginStorage.cstNo && option.auth=='2'
    }
  },
  mounted(){
    let _this = this 
    if(JSON.stringify(_this.maintainForm)!='{}'&&_this.turnUpNums==0){
      _this.form = $.extend({},_this.form,_this.maintainForm)
      _this.form.docItems = _this.form.docItems.split(",")
      _this.form.otherInst = _this.form.otherInst.split(",")
      _this.form.expDt1 = _this.$tools.utils.formatDate(_this.form.expDt,{"symbol":"YYYY-MM-DD"})
      _this.form.notLaterThan1 = _this.$tools.utils.formatDate(_this.form.notLaterThan,{"symbol":"YYYY-MM-DD"})
      _this.form.applyDate1 = _this.$tools.utils.formatDate(_this.maintainForm.applyDate,{"symbol":"YYYY-MM-DD"})
      
      if(_this.form.dispatchType=='4') {_this.disabledForm.formName2Disabled=false}
      if(_this.form.expPlace=='3') {_this.disabledForm.expPlaceAddDisabled=false}
      if(_this.form.periodPresentDays=='1') {_this.disabledForm.periodPresentDaysAdd1Disabled=false;_this.form.periodPresentDaysAdd1 = _this.form.periodPresentDaysAdd}
      else if(_this.form.periodPresentDays=='2') {_this.disabledForm.periodPresentDaysAdd2Disabled=false;_this.form.periodPresentDaysAdd2 = _this.form.periodPresentDaysAdd}
      if(_this.form.LCAvailWith=='3') {_this.disabledForm.LCAvailWithAddDisabled=false}
      if(_this.form.LCAvailAt=='2') {_this.disabledForm.LCAvailAtAddDisabled=false}
      if(_this.form.LCAvailDraft=='2') {_this.disabledForm.LCAvailDraftAddDisabled=false}
      if(_this.form.chargeLCOpen=='1') {_this.form.chargeLCOpen=['1']}
      else if(_this.form.chargeLCOpen=='2') {_this.form.chargeLCOpen=['2']}
      if(_this.form.chargeAccept=='1') {_this.form.chargeAccept=['1']}
      else if(_this.form.chargeAccept=='2') {_this.form.chargeAccept=['2']}
      if(_this.form.chargeUsanceInt=='1') {_this.form.chargeUsanceInt=['1']}
      else if(_this.form.chargeUsanceInt=='2') {_this.form.chargeUsanceInt=['2']}
      if(_this.form.chargeOutsideBank=='1') {_this.form.chargeOutsideBank=['1']}
      else if(_this.form.chargeOutsideBank=='2') {_this.form.chargeOutsideBank=['2']}
      if(_this.form.chargeAdd1) {_this.disabledForm.chargeAdd1Disabled=false;_this.form.chargeAdd=true}
      for(let item in _this.form.docItems){
        if(_this.form.docItems[item]=='A') {_this.disabledForm.docSignOriginalsDisabled=false}
        if(_this.form.docItems[item]=='B') {_this.disabledForm.docPackOriginalsDisabled=false}
        if(_this.form.docItems[item]=='C') {_this.disabledForm.docCertfcOriginalsDisabled=false}
        if(_this.form.docItems[item]=='D') {
          _this.disabledForm.docBillSetNumsDisabled=false
          if(_this.form.docBillTodo=='2') {_this.disabledForm.docBillTodoAddDisabled1=false;_this.form.docBillTodoAdd1=_this.form.docBillTodoAdd}
          else if(_this.form.docBillTodo=='3') {_this.disabledForm.docBillTodoAddDisabled2=false;_this.form.docBillTodoAdd2=_this.form.docBillTodoAdd}
          // if(_this.form.docBillIndicat=='1') {_this.form.docBillIndicat=true}
        }
        if(_this.form.docItems[item]=='E') {
          _this.disabledForm.docAirWaybillDisabled=false
          if(_this.form.docAirWaybill=='3') {_this.disabledForm.docAirWaybillAddDisabled=false}
          // if(_this.form.docAirWaybillIndicat=='1') {_this.form.docAirWaybillIndicat=true}
        }
        if(_this.form.docItems[item]=='F') {
          _this.disabledForm.docTransSportSetNumsDisabled=false
          if(_this.form.docTransSportTodo=='2') {_this.disabledForm.docTransSportTodoAddDisabled1=false;_this.form.docTransSportTodoAdd1 = _this.form.docTransSportTodoAdd}
          else if(_this.form.docTransSportTodo=='3') {_this.disabledForm.docTransSportTodoAddDisabled2=false;_this.form.docTransSportTodoAdd2 = _this.form.docTransSportTodoAdd}
          // if(_this.form.docTransSportIndicat=='1') {_this.form.docTransSportIndicat=true}
        }
        if(_this.form.docItems[item]=='H') {
          _this.disabledForm.docInsuranceValueDisabled=false
          if(_this.form.docInsuranceInst=='1') {_this.disabledForm.docInsuranceInstAddDisabled1=false;_this.form.docInsuranceInstAdd1 = _this.form.docInsuranceInstAdd}
          else if(_this.form.docInsuranceInst=='4') {_this.disabledForm.docInsuranceInstAddDisabled2=false;_this.form.docInsuranceInstAdd2 = _this.form.docInsuranceInstAdd}
        }
      }
      for(let item in _this.form.otherInst){
        if(_this.form.otherInst[item]=='a') {
          _this.disabledForm.otherInstTransBankDisabled=false
          if(_this.form.otherInstTransBank=='B') {_this.disabledForm.otherInstTransBankAddDisabled=false}
        }
        if(_this.form.otherInst[item]=='b') {_this.disabledForm.otherInstChargeAccNoDisabled=false}
        if(_this.form.otherInst[item]=='g') {_this.disabledForm.otherInstDebitAccNo2Disabled=false}
      }
      _this.form.otherDoc = _this.$tools.validator.unescapeHTML(_this.form.otherDoc)
      _this.form.descGoods = _this.$tools.validator.unescapeHTML(_this.form.descGoods)
      _this.form.tradeTerms = _this.$tools.validator.unescapeHTML(_this.form.tradeTerms)
      //（二期）_this.form.otherDoc = _this.$tools.validator.unformatHTML(_this.form.otherDoc)
      if(_this.form.backToBackCloseOrNot=='1') {_this.form.backToBackCloseOrNot=['1']}
      else if(_this.form.backToBackCloseOrNot=='2') {_this.form.backToBackCloseOrNot=['2']}
    }else{
      _this.form.applyDate1 = _this.$tools.utils.formatDate(new Date(),{"today":true})
      _this.form.applyDate = _this.$tools.utils.formatDate(_this.form.applyDate1,{"removeFormat":true})  //为了保持print页面显示一致
      _this.form.appName = _this.loginStorage.cstEN
      _this.form.appAddr = _this.loginStorage.cstAddressEN
      
      _this.form = $.extend({},_this.form,_this.preData)
      if(JSON.stringify(_this.preDisabledForm)!='{}'){
        _this.disabledForm = $.extend({},_this.disabledForm,_this.preDisabledForm)  //只有上下步时才执行
      }
      _this.docItemsCheckboxChage(_this.form.docItems)
      _this.otherInstCheckboxChage(_this.form.otherInst)
    }
    _this.options = _this.loginStorage.operAccInfoList.filter(_this.checkOptionsArray)
    if(_this.form.fileList.length>=4){
      _this.isShowUpload = false
    }
  }
}
</script>
<style>
  .sort .el-input{width:164px;}
  .sort2 .el-input{width:184px;}
  .s .el-checkbox__label{display:inline;}
  .importCreditMain .ml22{margin-left:22px;}
  .importCreditMain .mr10{margin-right:10px;}
  .importCreditMain .el-checkbox-group .el-checkbox{vertical-align: top;}
  .lh28 .el-input__inner{height:28px !important;}
  .importCreditOpen .radio-input{ position:relative;height:36px;}
  .importCreditOpen .radio-input .radioo{line-height:36px;}
  .importCreditOpen .radio-input .input{position:absolute;left:23px;}
</style>
