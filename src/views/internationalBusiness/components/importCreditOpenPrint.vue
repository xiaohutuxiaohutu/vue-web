<template>
  <div class="importCreditOpenPrint mt20 printArea">
      <div class="importCreditOpenPrintHead fix">
        <h3>APPLICATION FOR ISSUANCE OF DOCUMENTARY CREDIT</h3>
        <div class="fl" style="width:70%">
          <p class="mt10"><span>To： </span><span class="fs18 pl30">CHONG HING BANK LIMITED</span></p>
          <p class="mt30">Date：<span>{{$tools.utils.formatDate(formData.applyDate,{"symbol":"YYYY-MM-DD"})}}</span></p>
          <p class="mt5">(Note: Please complete all following blanks and select the applicable instructions by “√” as appropriate.)</p>
        </div>
        <div class="fr mt10" style="width:30%">
          <div class="DCNumbe">
            <p class="bankUse">DC Number (for Bank use)</p>
            <p class="tac lh35">{{formData.busCode}}</p>
          </div>
        </div>
      </div>
      <div class="importCreditOpenPrintContent mt5 lh15" style="word-break:break-all;">
        <table>
          <tr>
            <td width="46%" height="80">
              <p>Applicant (Name and Address)</p>
              <p>{{formData.appName}}</p>
              <p>{{formData.appAddr}}</p>
            </td>
            <td colspan="2">
              <p>DC to be dispatched by</p>
              <p>
                <span class="checkBox" :class="{'el-icon-check':formData.dispatchType=='1'?true:false}"></span>Full Tele-transmission  
                <span class="checkBox" :class="{'el-icon-check':formData.dispatchType=='2'?true:false}"></span>Courier   
                <span class="checkBox" :class="{'el-icon-check':formData.dispatchType=='3'?true:false}"></span>Brief tele-transmission follows by mail
                <span class="checkBox" :class="{'el-icon-check':formData.dispatchType=='4'?true:false}"></span>Collect at your Counter by 
                <span v-if="formData.dispatchType!='4'">________ tel. ________</span>
                <span class="underline" v-if="formData.dispatchType=='4'">{{formData.dispatchCounter}}</span><span v-if="formData.dispatchType=='4'"> tel. </span>
                <span class="underline" v-if="formData.dispatchType=='4'">{{formData.dispatchCounterTel}}</span>
              </p>
            </td>
          </tr>
          <tr>
            <td height="80">
              <p>Beneficiary (Name and Address) </p>
              <p>{{formData.beneficiary}}</p>
              <p>{{formData.beneficiaryAddr}}</p>
            </td>
            <td colspan="2">
              <p>Advising Bank (at the full discretion of the Issuing Bank)</p>
              <p>{{formData.advisingBank}}</p>
            </td>
          </tr>
          <tr>
            <td rowspan="2">
              <p>DC Currency and Amount in words</p>
              <p>{{formData.CRY}}</p>
              <p>{{formData.amt}}</p>
            </td>
            <td rowspan="2">
              <p>DC Currency and Amount in figures:</p>
              <p>{{formData.CRYFigures}}</p>
              <p>{{$tools.utils.toDecimalString(formData.AMTFigures,true,2)}}</p>
            </td>
            <td width="27%">
              <p>Allowance in DC Amount (more/less)</p>
              <p style="margin-bottom:2px;"><span class="checkBox" :class="{'el-icon-check':formData.moreAmtPercent?true:false}"></span> + <span>{{formData.moreAmtPercent}}</span>%<span class="checkBox ml10" :class="{'el-icon-check':formData.lessAmtPercent?true:false}"></span> - <span>{{formData.lessAmtPercent}}</span>%</p>
            </td>
          </tr>
          <tr>
            <td>
              <p>Allowance in Quantity of Goods(more/less)</p>
              <p class="mb5"><span class="checkBox" :class="{'el-icon-check':formData.moreQuaPercent?true:false}"></span> + <span>{{formData.moreQuaPercent}}</span>%<span class="checkBox ml10" :class="{'el-icon-check':formData.lessQuaPercent?true:false}"></span> - <span>{{formData.lessQuaPercent}}</span>%</p>
            </td>
          </tr>
          <tr>
            <td height="40">
              <p>Expiry date:</p>
              <p>{{$tools.utils.formatDate(formData.expDt,{"symbol":"YYYY-MM-DD"})}}</p>
            </td>
            <td colspan="2"  rowspan="2">
              <p>Expiry Place: </p>
              <p class="mt5"><span class="checkBox" :class="{'el-icon-check':formData.expPlace=='1'?true:false}"></span>Nominated Bank’s country<span class="checkBox ml10" :class="{'el-icon-check':formData.expPlace=='2'?true:false}"></span>Issuing Bank’s counter</p>
              <p class="mt5"><span class="checkBox" :class="{'el-icon-check':formData.expPlace=='3'?true:false}"></span><span class="underline" v-if="formData.expPlace=='3'">{{formData.expPlaceAdd}}</span><span v-if="formData.expPlace!='3'">________</span></p>
            </td>
          </tr>
          <tr>
            <td>
              <p>Period of presentation： <span class="checkBox" :class="{'el-icon-check':formData.periodPresentDays=='1'}"></span> <span class="underline" v-if="formData.periodPresentDays=='1'">{{formData.periodPresentDaysAdd}}</span><span v-if="formData.periodPresentDays!='1'">________</span> days after shipment but within this DC validity
                                          <span class="checkBox" :class="{'el-icon-check':formData.periodPresentDays=='2'}"></span> <span class="underline" v-if="formData.periodPresentDays=='2'">{{formData.periodPresentDaysAdd}}</span><span v-if="formData.periodPresentDays!='2'">________</span>  
              </p>
            </td>
          </tr>
          <tr>
            <td rowspan="2">
              <p>Shipment from:</p>
              <p>Port of loading / Airport of departure <span class="underline">{{formData.portDeparture}}</span><span v-if="formData.portDeparture==''">________</span></p>
              <p>Port of discharge / Airport of destination <span class="underline">{{formData.portDestination}}</span><span v-if="formData.portDestination==''">________</span></p>
              <p>Place of taking in charge / Dispatch from / Place of Receipt: <span class="underline">{{formData.placeDeparture}}</span><span v-if="formData.placeDeparture==''">________</span></p>
              <p>Place of Final Destination / For transportation to / Place of Delivery: <span class="underline">{{formData.placeDestination}}</span><span v-if="formData.placeDestination==''">________</span></p>
              <p>Not later than: <span class="underline">{{$tools.utils.formatDate(formData.notLaterThan,{"symbol":"YYYY-MM-DD"})}}</span></p>
            </td>
            <td>
              <p>Partial shipments / deliveries</p>
              <p class="mt5"><span class="checkBox" :class="{'el-icon-check':formData.partShip=='1'}"></span>Allowed <span class="checkBox ml10" :class="{'el-icon-check':formData.partShip=='2'}"></span>Prohibited</p>
            </td>
            <td>
              <p>Transshipment</p>
              <p class="mt5 mb5"><span class="checkBox" :class="{'el-icon-check':formData.transShip=='1'}"></span>Allowed <span class="checkBox ml10" :class="{'el-icon-check':formData.transShip=='2'}"></span>Prohibited</p>
            </td>
          </tr>
          <tr>
            <td colspan="2">
              <p>Insurance to be covered by (for EXW, FCA/FOB or CFR/CPT shipment) </p>
              <p><span class="checkBox" :class="{'el-icon-check':formData.insurance=='1'}"></span>As per open policy held by the issuing bank<span class="checkBox ml10" :class="{'el-icon-check':formData.insurance=='2'}"></span> Ultimate buyer </p>
              <p><span class="checkBox" :class="{'el-icon-check':formData.insurance=='3'}"></span>Cover note per attached or to be submitted within 7 days of this application</p>
              <p><span class="checkBox" :class="{'el-icon-check':formData.insurance=='4'}"></span>Please arrange insurance cover on our account for 110% of this DC value </p>
              <p>We undertake to indemnify you against all damages and/or liabilities resulting from the absence of or inadequate insurance coverage over the goods. </p>
            </td>
          </tr>
          <tr>
            <td></td>
            <td>Charges (if applicable)</td>
            <td>To be paid by</td>
          </tr>
          <tr>
            <td>This DC is available：</td>
            <td rowspan="2">DC opening commission & charges<br>
                Acceptance commission (for usance DC)<br>
                Usance Interest (for UPAS)<br>
                Charges outside issuing bank<br>
                <p>
                  <span class="checkBox" :class="{'el-icon-check':formData.chargeAdd}"></span>
                  <span class="underline">{{formData.chargeAdd1}}</span>
                  <span v-if="!formData.chargeAdd">________</span>
                </p>
            </td>
            <td rowspan="2">
              <p>
                <em class="inline-block pWidth40 mr20">
                  <span class="checkBox" :class="{'el-icon-check':formData.chargeLCOpen=='1'}"></span>Beneficiary
                </em>
                <span class="checkBox" :class="{'el-icon-check':formData.chargeLCOpen=='2'}"></span>Applicant
              </p>
              <p>
                <em class="inline-block pWidth40 mr20">
                  <span class="checkBox" :class="{'el-icon-check':formData.chargeAccept=='1'}"></span>Beneficiary
                </em>
                <span class="checkBox" :class="{'el-icon-check':formData.chargeAccept=='2'}"></span>Applicant
              </p>
              <p>
                <em class="inline-block pWidth40 mr20">
                  <span class="checkBox" :class="{'el-icon-check':formData.chargeUsanceInt=='1'}"></span>Beneficiary
                </em>
                <span class="checkBox" :class="{'el-icon-check':formData.chargeUsanceInt=='2'}"></span>Applicant
              </p>
              <p>
                <em class="inline-block pWidth40 mr20">
                  <span class="checkBox" :class="{'el-icon-check':formData.chargeOutsideBank=='1'}"></span>Beneficiary
                </em>
                <span class="checkBox" :class="{'el-icon-check':formData.chargeOutsideBank=='2'}"></span>Applicant
              </p>
              <p>
                <em class="inline-block pWidth40 mr20">
                  <span class="checkBox" :class="{'el-icon-check':formData.chargeAdd2=='1'}"></span>Beneficiary
                </em>
                <span class="checkBox" :class="{'el-icon-check':formData.chargeAdd2=='2'}"></span>Applicant
              </p>
            </td>
          </tr>
          <tr>
            <td>
              <p>
                <em class="inline-block pWidth10" style="width:30px;">WITH</em>
                <em class="inline-block pWidth30 ml10" style="width:100px;">
                  <span class="checkBox" :class="{'el-icon-check':formData.LCAvailWith=='1'}"></span>Issuing Bank
                </em>
                <em>
                  <span class="checkBox" :class="{'el-icon-check':formData.LCAvailWith=='2'}"></span>Any bank
                  <span class="checkBox ml20" :class="{'el-icon-check':formData.LCAvailWith=='3'}"></span>
                  <span class="underline">{{formData.LCAvailWithAdd}}</span>
                  <span v-if="formData.LCAvailWith!='3'">______________</span>
                </em>
              </p>
              <p>
                <em class="inline-block pWidth10" style="width:30px;">BY</em>
                <em class="inline-block pWidth30 ml10" style="width:100px;">
                  <span class="checkBox" :class="{'el-icon-check':formData.LCAvailBy=='1'}"></span>Negotiation
                </em>
                <em>
                  <span class="checkBox" :class="{'el-icon-check':formData.LCAvailBy=='3'}"></span>Acceptance
                </em>
              </p>
              <p>
                <em class="inline-block pWidth10 " style="width:30px;"></em>
                <em class="inline-block pWidth30 ml10" style="width:100px;">
                  <span class="checkBox" :class="{'el-icon-check':formData.LCAvailBy=='2'}"></span>Sight Payment
                </em>
                <em>
                  <span class="checkBox" :class="{'el-icon-check':formData.LCAvailBy=='4'}"></span>Deferred Payment
                </em>
              </p>
              <p>
                <em class="inline-block pWidth10" style="width:30px;">AT</em>
                <em class="inline-block pWidth30 ml10" style="width:100px;">
                  <span class="checkBox" :class="{'el-icon-check':formData.LCAvailAt=='1'}"></span>Sight
                </em>
                <em>
                  <span class="checkBox" :class="{'el-icon-check':formData.LCAvailAt=='2'}"></span>
                  <span class="underline">{{formData.LCAvailAtAdd1}}</span>
                  <span v-if="formData.LCAvailAt!='2'">______</span> days
                </em>
              </p>
              <p>Draft drawn on (Not applicable to sight or deferred payment DC)</p>
              <p class="mb5">
                <em>
                  <span class="checkBox" :class="{'el-icon-check':formData.LCAvailDraft=='1'}"></span>Issuing Bank
                  <span class="checkBox" :class="{'el-icon-check':formData.LCAvailDraft=='2'}"></span>
                  <span class="underline">{{formData.LCAvailDraftAdd}}</span>
                  <span v-if="formData.LCAvailDraft!='2'">______________</span>
                </em>
              </p>
            </td>
          </tr>
        </table>
        <table>
          <tr>
            <td colspan="3">
            <p>Documents Required: </p>
            <p class="positionLeft">
              <span class="checkBox" :class="{'el-icon-check':docA=='A'}"></span>
              <em v-if="docA=='A'">Signed commercial invoice in <span class="underline">{{formData.docSignOriginals}}</span> originals and <span class="underline">{{formData.docSignCopies}}</span> copies</em>
              <em v-if="docA!='A'">Signed commercial invoice in ________ originals and ________ copies</em>
            </p>
            <p class="positionLeft">
              <span class="checkBox" :class="{'el-icon-check':docB=='B'}"></span>
              <em v-if="docB=='B'">Packing list in <span class="underline">{{formData.docPackOriginals}}</span> originals and <span class="underline">{{formData.docPackCopies}}</span> copies</em>
              <em v-if="docB!='B'">Packing list in ________ originals and ________ copies</em>
            </p>
            <p class="positionLeft">
              <span class="checkBox" :class="{'el-icon-check':docC=='C'}"></span>
              <em v-if="docC=='C'">Certificate of Origin in <span class="underline">{{formData.docCertfcOriginals}}</span> originals and <span class="underline">{{formData.docCertfcCopies}}</span> copies issued by <span class="underline">{{formData.docCertfcIssued}}</span></em>
              <em v-if="docC!='C'">Certificate of Origin in ________ originals and ________ copies issued by ________</em>
            </p>
            <p class="positionLeft">
              <span class="checkBox" :class="{'el-icon-check':docD=='D'}"></span>
              <em v-if="docD=='D'">
                <span class="underline">{{formData.docBillSetNums}}</span> set of original clean shipped on board marine bill(s) of lading made out 
                <span class="checkBox ml5" :class="{'el-icon-check':formData.docBillTodo=='1'}"></span> to order of shipper and blank endorsed / 
                <span class="checkBox ml5" :class="{'el-icon-check':formData.docBillTodo=='2'}"></span> to <span class="underline" v-if="formData.docBillTodo=='2'">{{formData.docBillTodoAdd}}</span><span v-if="formData.docBillTodo!='2'"> ________ </span>
                <span class="checkBox ml5" :class="{'el-icon-check':formData.docBillTodo=='3'}"></span> to order of <span class="underline" v-if="formData.docBillTodo=='3'">{{formData.docBillTodoAdd}}</span><span v-if="formData.docBillTodo!='3'"> ________ </span><br>
              </em>
              <em v-if="docD=='D'">marked freight <span class="checkBox ml5" :class="{'el-icon-check':formData.docBillFreight=='1'}"></span> collect / <span class="checkBox ml5" :class="{'el-icon-check':formData.docBillFreight=='2'}"></span> prepaid, notify <span class="underline">{{formData.docBillFreightAdd}}</span> and <span class="checkBox ml5" :class="{'el-icon-check':formData.docBillIndicat=='1'}"></span> indicating this DC number. </em>
              <em v-if="docD!='D'">________ set of original clean shipped on board marine bill(s) of lading made out <span class="checkBox ml5"></span> to order of shipper and blank endorsed / <span class="checkBox ml5"></span> to ________ /<span class="checkBox ml5"></span> to order of ________<br></em>
              <em v-if="docD!='D'">marked freight <span class="checkBox ml5"></span> collect / <span class="checkBox ml5"></span> prepaid, notify ________ and <span class="checkBox ml5"></span> indicating this DC number. </em>
            </p>
            <p class="positionLeft">
              <span class="checkBox" :class="{'el-icon-check':docE=='E'}"></span>
              <em v-if="docE=='E'">Original clean air waybill consigned to <span class="checkBox ml5" :class="{'el-icon-check':formData.docAirWaybill=='1'}"></span> issuing bank <span class="checkBox ml5" :class="{'el-icon-check':formData.docAirWaybill=='2'}"></span> applicant <span class="checkBox ml5" :class="{'el-icon-check':formData.docAirWaybill=='3'}"></span><span class="underline">{{formData.docAirWaybillAdd}}</span><span v-if="formData.docAirWaybill!='3'"> ________ </span><br></em>
              <em v-if="docE=='E'">marked freight <span class="checkBox ml5" :class="{'el-icon-check':formData.docAirWaybillFreight=='1'}"></span> collect / <span class="checkBox ml5" :class="{'el-icon-check':formData.docAirWaybillFreight=='2'}"></span> prepaid, notify <span class="underline">{{formData.docAirWaybillFreightAdd}}</span> and <span class="checkBox ml5" :class="{'el-icon-check':formData.docAirWaybillIndicat=='1'}"></span> indicating this DC number. </em>
              <em v-if="docE!='E'">Original clean air waybill consigned to <span class="checkBox ml5"></span> issuing bank <span class="checkBox ml5"></span> applicant <span class="checkBox ml5"></span> ________ <br></em>
              <em v-if="docE!='E'">marked freight <span class="checkBox ml5"></span> collect / <span class="checkBox ml5"></span> prepaid, notify ________ and <span class="checkBox ml5"></span> indicating this DC number. </em>
            </p>
            <p class="positionLeft">
              <span class="checkBox" :class="{'el-icon-check':docF=='F'}"></span>
              <em v-if="docF=='F'">
                <span class="underline">{{formData.docTransSportSetNums}}</span> set of original clean multimodal transport documents made out  
                <span class="checkBox ml5" :class="{'el-icon-check':formData.docTransSportTodo=='1'}"></span> to order of shipper and blank endorsed / 
                <span class="checkBox ml5" :class="{'el-icon-check':formData.docTransSportTodo=='2'}"></span> to <span class="underline" v-if="formData.docTransSportTodo=='2'">{{formData.docTransSportTodoAdd}}</span><span v-if="formData.docTransSportTodo!='2'">________</span>
                <span class="checkBox ml5" :class="{'el-icon-check':formData.docTransSportTodo=='3'}"></span> to order of <span class="underline" v-if="formData.docTransSportTodo=='3'">{{formData.docTransSportTodoAdd}}</span><span v-if="formData.docTransSportTodo!='3'">________<br></span>
              </em>
              <em v-if="docF=='F'">marked freight <span class="checkBox ml5" :class="{'el-icon-check':formData.docTransSportFreight=='1'}"></span> collect / <span class="checkBox ml5" :class="{'el-icon-check':formData.docTransSportFreight=='2'}"></span> prepaid, notify <span class="underline">{{formData.docTransSportFreightAdd}}</span> and <span class="checkBox ml5" :class="{'el-icon-check':formData.docTransSportIndicat=='1'}"></span> indicating this DC number. </em>
              <em v-if="docF!='F'">________ set of original clean multimodal transport documents made out <span class="checkBox ml5"></span> to order of shipper and blank endorsed / <span class="checkBox ml5"></span>to ________ /<span class="checkBox ml5"></span> to order of ________<br></em>
              <em v-if="docF!='F'">marked freight <span class="checkBox ml5"></span> collect / <span class="checkBox ml5"></span> prepaid, notify ________ and <span class="checkBox ml5"></span> indicating this DC number. </em>
            </p>
            <p class="positionLeft">
              <span class="checkBox" :class="{'el-icon-check':docG=='G'}"></span>
              <em>Cargo receipt issued and signed by authorized signatory(ies) of the applicant (whose signature(s) must be in conformity with the specimen signature held in the issuing bank’s records) certifying that the goods have been received in good order and condition and stating the quantity and value of goods received and this DC number, indicating Cargo receipt issuing date which will be deemed as shipment date.</em>
            </p>
            <p class="positionLeft">
              <span class="checkBox" :class="{'el-icon-check':docH=='H'}"></span>
              <em>Insurance Policy / Certificate in negotiable form, at least in duplicate, and endorsed in blank for full <span v-if="docH=='H'" class="underline">{{formData.docInsuranceValue}}</span><span v-if="docH!='H'"> ________ </span> value plus 10% covering：
                <p class="mt5"><span class="checkBox" :class="{'el-icon-check':formData.docInsuranceInst=='1'}"></span>Institute Cargo Clauses 
                    <span class="checkBox ml10" :class="{'el-icon-check':formData.docInsuranceInst=='1'&&formData.docInsuranceInstAdd=='A'}"></span>(A)  
                    <span class="checkBox ml10" :class="{'el-icon-check':formData.docInsuranceInst=='1'&&formData.docInsuranceInstAdd=='B'}"></span>(B)  
                    <span class="checkBox ml10" :class="{'el-icon-check':formData.docInsuranceInst=='1'&&formData.docInsuranceInstAdd=='C'}"></span>(C)  
                    <span class="checkBox ml10" :class="{'el-icon-check':formData.docInsuranceInst=='1'&&formData.docInsuranceInstAdd=='AIR'}"></span>(Air);
                </p>
                <p><span class="checkBox" :class="{'el-icon-check':formData.docInsuranceInst=='2'}"></span>Institute War Clauses (Cargo) and Institute Strikes Clauses (Cargo);</p>                
                <p><span class="checkBox" :class="{'el-icon-check':formData.docInsuranceInst=='3'}"></span>Institute War Clauses (Air Cargo) and Institute Strikes Clauses (Air Cargo);</p>                
                <p><span class="checkBox" v-if="formData.docInsuranceInst=='4'" :class="{'el-icon-check':formData.docInsuranceInst=='4'}"></span><span class="underline" v-if="formData.docInsuranceInst=='4'">{{formData.docInsuranceInstAdd}}</span></p>                
                <p><span class="checkBox" v-if="formData.docInsuranceInst!='4'"></span><span v-if="formData.docInsuranceInst!='4'"> ________ </span></p>                
                <p><span>indicating claims payable at destination in the currency of this DC, </span><span class="checkBox" :class="{'el-icon-check':formData.docInsuranceIrre=='1'}"></span> irrespective of percentage.</p>
              </em>
            </p>
            </td>
          </tr>
        </table>
         <table>
          <tr>
            <td colspan="3">
              <p>Other Documents: (Please use separate sheet if necessary)</p>
              <p>
                <p v-for="item in otherDocs">{{item}}</p>
              </p>
            </td>
          </tr>
          <tr>
            <td colspan="3">
              <p>Description of Goods and Shipment Schedule: (Please avoid excessive details and use separate sheet if necessary)</p>
              <p>
                <span>{{formData.descGoods}}</span>
              </p>
            </td>
          </tr>
          <tr>
            <td colspan="3">
              <p>Trade terms</p>
              <p>
                <span>{{formData.tradeTerms}}</span>
              </p>
            </td>
          </tr>
          <tr>
            <td colspan="3">
              <p>Other Instructions: (Please use separate sheet if necessary)</p>
              <p class="positionLeft">
                <span class="checkBox" :class="{'el-icon-check':doca=='a'}"></span>
                <em>This DC is transferable by 
                  <span class="checkBox ml5" :class="{'el-icon-check':formData.otherInstTransBank=='A'}"></span> advising bank 
                  <span class="checkBox ml5" :class="{'el-icon-check':formData.otherInstTransBank=='B'}"></span> others (please specify) <span class="underline" v-if="formData.otherInstTransBank=='B'">{{formData.otherInstTransBankAdd}}</span><span v-if="formData.otherInstTransBank!='B'"> ________ </span>
                </em>
              </p>
              <p class="positionLeft">
                <span class="checkBox" :class="{'el-icon-check':docb=='b'}"></span>
                <em>DC confirmation required and confirmation charges for account of <span class="checkBox ml5" :class="{'el-icon-check':formData.otherInstChargeAccNo=='A'}"></span> Beneficiary <span class="checkBox ml5" :class="{'el-icon-check':formData.otherInstChargeAccNo=='B'}"></span> Applicant.</em>
              </p>
              <p class="positionLeft">
                <span class="checkBox" :class="{'el-icon-check':docc=='c'}"></span>
                <em>All documents must be issued in English. <span class="checkBox ml10" :class="{'el-icon-check':docd=='d'}"></span>All documents must showing this DC number.</em>
              </p>
              <p class="positionLeft">
                <span class="checkBox" :class="{'el-icon-check':doce=='e'}"></span>
                <em>Please fix exchange rate. </em>
              </p>
              <p class="positionLeft">
                <span class="checkBox" :class="{'el-icon-check':docf=='f'}"></span>
                <em>Debit your commission and charges from our account no. <span class="underline">{{formData.otherInstDebitAccNo1}}</span></em>
              </p>
              <p class="positionLeft" style="margin-bottom:3px;">
                <span class="checkBox" :class="{'el-icon-check':docg=='g'}"></span>
                <em>Debit marginal deposits from our account no. <span class="underline" v-if="docg=='g'">{{formData.otherInstDebitAccNo2}}</span><span v-if="docg!='g'"> ________</span></em>
              </p>
            </td>
          </tr>
          <tr>
            <td colspan="3">
              <p style="margin-bottom:2px;">
                This is a back-to-back DC supported by master credit no. 
                <span class="underline">{{formData.backToBackCreditNo}}</span><span v-if="formData.backToBackCreditNo==''"> ________ </span> issued by
                <span class="underline">{{formData.backToBackIssBank}}</span><span v-if="formData.backToBackIssBank==''"> ________</span>.
                <em>The master credit is <span class="checkBox ml5" :class="{'el-icon-check':formData.backToBackCloseOrNot=='1'}"></span> enclosed / <span class="checkBox ml5" :class="{'el-icon-check':formData.backToBackCloseOrNot=='2'}"></span> being held by you. </em>
              </p>
            </td>
          </tr>
          <tr>
            <td colspan="3">
              <p>We apply for the Bank’s issuance of an irrevocable documentary credit (“DC”) for our account in accordance with the above instructions (marked with an “√” where appropriate).&nbsp We agree that this application is subject to the terms and conditions below.</p>
            </td>
          </tr>
          <tr v-for="item in formData.fileList" v-if="!isPrint">
            <td colspan="3">
              {{item.fileName}}
            </td>
          </tr>
        </table>
      </div>
      <!--打印显示区-->
      <div class="importCreditOpenPrintContent lh25 pageBreakAfter" style="margin-top:-1px;" v-if="isPrint">
        <table>
          <tr>
            <td colspan="5" width="46%" class="pNone borderLeft borderRight">
              <p class="bankUse">For Bank Use：</p>
            </td>
            <td colspan="3">
              <p>Applicant’s Company chop：</p>
              <p>Legal representative or</p>
              <p>Authorized signatory(ies)：</p>
            </td>
          </tr>
          <tr>
            <td class="borderLeft">Process on</td>
            <td width="6%">Prepare</td>
            <td width="6%">Check</td>
            <td width="6%">Approve</td>
            <td width="6%" class="borderRight"></td>
            <td width="24%"></td>
            <td width="24%">Fax</td>
            <td rowspan="2">s.v.</td>
          </tr>
          <tr>
            <td class="borderLeft borderBottom"></td>
            <td class="borderBottom"></td>
            <td class="borderBottom"></td>
            <td class="borderBottom"></td>
            <td class="borderRight borderBottom"></td>
            <td>Contact person</td>
            <td>Tel.</td>
          </tr>
        </table>
      </div>
      <div class="TermsAndConditions mt20" v-if="isPrint">
        <h3 class="tac">Terms and Conditions</h3>
        <ul>
          <li v-for="(value,index) in conditionsList"><span>{{Number(index+1)}}.</span>{{value}}</li>
        </ul>
      </div>
      <!--打印显示区--end-->
  </div>
</template>

<script>
export default {
  name:'importCreditOpenStep2',
  components: {
  },
  data() {
    return {
      // conditionsList:[
      //   "本申请书及依据本申请书开立的信用证（「信用证」,包括其不时的修订、展期或更新）受国际商会的跟单信用证统一惯例于信用证开立当日生效的最新版本（「UCP」）所约束。本申请书亦受任何由申请人（「申请人」）签署及向创兴银行有限公司（「银行」）交付的协议所约束。如有任何冲突，就冲突而言，以本申请书内的条款为准。",
      //   "在银行要求时，申请人必须立刻就银行在信用证项下已付或必须支付的每笔款项，以相同货币向银行作出全额连利息的偿付，而利息由银行付款当天起至申请人偿付日计算。该等款项包括提款、利息、支出、开支、手续费、指定行或保兑行的偿付申索及银行就信用证所作出的任何付款、预付款项及购买。在银行要求时，申请人必须立刻向银行支付由银行收取或银行在信用证下所承担的费用、收费和手续费。",
      //   "在银行要求时，申请人必须立刻（按全额赔偿的标准）赔偿银行或其受委托人因本申请书及/或信用证而可能遭受的所有债务、损失、付款、损害赔偿、要求、申索、开支、支出（包括法律费用）、法律程序、诉讼或其他后果(由银行的重大过失或故意失当行为而引致者除外)。",
      //   "在银行要求时，申请人必须立刻（按全额赔偿的标准）赔偿银行或其受委托人因本申请书及/或信用证而可能遭受的所有债务、损失、付款、损害赔偿、要求、申索、开支、支出（包括法律费用）、法律程序、诉讼或其他后果(由银行的重大过失或故意失当行为而引致者除外)。",
      //   "申请人授权银行从申请人的账户中扣除其对银行的任何欠款，并按当时的兑换率（该兑换率由银行决定或为双方约定的兑换率，如有的话）将上述款项及银行收到的其他供申请人清偿责任或债务的款项，兑换成相关债务的货币以作清偿之用。此授权是不可撤销的。",
      //   "若银行提出要求，申请人必须立刻向银行缴付现金保证金或提供担保品，而其金额或价值必须足以担保银行于信用证下可能需要缴付的款项及申请人就信用证而欠下银行的任何实际及或有债务。",
      //   "任何根据此申请书而向银行缴付的现金保证金（「现金保证金」），将会被转移到一个以申请人的名义在银行开立的专门用途账户（保证金账户），以质押的方式担保申请人在信用证下的责任及其他对银行并与信用证有关的实际及或有债务。银行有权随时在没有通知申请人的情况下抵销、使用及/或转移现金保证金以清偿申请人在信用证项下对银行的任何债务。为该抵销、使用或转移，银行可将任何现金保证金按当时的兑换率（该兑换率由银行全权决定）进行兑换。",
      //   "所有信用证的条款及条件须与背页描述的主信用证（「主信用证」）的条款及条件一样(如有的话)，银行另行同意者除外。",
      //   "申请人承诺提交所有主信用证项下所要求的单据予银行，以作向主信用证开证行收款或作银行提供主信用证下的议付、购买、预付或融资之用。",
      //   "银行有权补充其合理地认为适当的信用证条款和条件。",
      //   "申请人承诺对银行出具的信用证的申请人副本与此申请书作出核对。申请人不可撤销地同意，如在银行出具的信用证副本发出予申请人后五个银行工作天内，申请人未就其内容提出异议，则被视为申请人放弃就信用证提出异议或就此向银行追索的权利。",
      //   "申请人同意对下列事项负上全部责任：确保信用证内的任何条款或要求均为清晰、可强制执行及有效; 遵守与信用证下基础交易有关的所有适用法律及法规，并向有关政府或监管机构取得所有必须的文件、许可及批准，并在银行要求时提供该等文件、许可或批准。银行对该等事项并无责任亦并无义务向申请人作出任何建议。",
      //   "如申请人指示银行在信用证中可容许电索的安排，即使银行尚未收到有关单据，申请人以不可撤销的方式授权银行在收到有关索偿行或偿付行的要求时向其作出付款及／或偿付。申请人并将承担所有有关风险（包括但不限于收不到有关单据及单据有不符点的风险），及必须偿付及赔偿银行按信用证所支付的任何款项。",
      //   "申请人以不可撤销的方式授权银行(i)把信用证所提交的单据，用于主信用证的交单收款;(ii)对主信用证项下提交的单据进行议付、预付银行已承担的延期付款承诺、购买银行已承兑的汇票或就提交的单据作任何融资（统称「银行融资」）；及(iii)直接将主信用证的银行融资款项或主信用证下收到的款项用于支付信用证下的有关提款及/或清偿申请人在信用证下的债务，而毋需事先将该等款项存入申请人在银行的帐户，无论按信用证所提交的单据是否有不符点(如有的话，申请人在此接受及豁免所有不符点)。申请人亦授权银行以申请人或银行的名义拟备、签署、完成及/或提交主信用证所要求提交的任何单据，并就主信用证项下的提款、索偿及/或收取款项采取其认为合适的行动。",
      //   "如任何交易有可能触犯或违反任何由联合国、欧盟、美国、英国、香港特别行政区、中华人民共和国（「中国」）或所有其他约束银行或申请人的司法管辖区所颁布并与制裁、禁运、打击清洗黑钱或恐怖分子资金筹集有关的法律、法规、规定、指引或程序（「制裁」），银行有权拒绝处理该等交易。银行不需为拒绝处理该等交易就任何一方所蒙受的任何申索、损失、损害赔偿、开支或费用承担任何责任。申请人保证本申请书内所涉及的发货或交易没有触犯任何制裁。",
      //   "作为申请人对银行的责任及债务的持续担保，申请人特此：（i）把按信用证提交的单据（「单据」）的质押权和留置权授予银行；及（ii）把单据所对应的货物的质押权授予银行，而该等货物包括银行正在或将会实际或推定占有的货物。如属推定占有的货物，申请人将通知货物的实际占有人有关的质押安排。申请人授权银行在其认为有需要的情况下把质押货物储存及为其购买保险，所有风险及费用由申请人承担。如申请人没有妥为履行或偿付其对银行的责任或债务，申请人授权银行（随时在毋需事先通知申请人或其他人士或取得其同意，并按银行认为合适的形式）出售、处置或以其他形式处理任何单据及已质押的货物。银行可将任何出售、处置或处理任何单据或已质押货物后所得的收益净额用于偿付申请人对银行的责任和债务（次序及形式由银行决定）。",
      //   "银行不承担任何其采取或不采取行动而引致申请人所有损失的任何责任（惟直接由于银行的重大过失或故意失当行为而引致的损失除外）。申请人授权银行就此申请书所提供的服务，委任任何其他人士（包括往来机构、代理人或第三方承办商）。银行并无责任，亦毋需为该等人仕的任何作为、遗漏、失责、疏忽、无力偿债或破产负责。银行亦无责任，亦无需要为任何单据在运送途中或由该等人仕引致的丢失或延误负责，即使该等人仕是由银行选派的。",
      //   "申请人特此声明，除非获得银行同意，否则按此申请书所开立的信用证只能用于申请人的自身业务。申请人就是信用证项下的基础交易中的协议一方。申请人承诺不会准许或容许其他人士直接或间接使用银行向申请人授予的开立信用证额度，及在任何情况下，不会为任何其他人士开立信用证，银行另行同意者除外。",
      //   "本申请书属申请人要求银行开立信用证的请求。除非银行明确表示接受本申请书或根据本申请书开立信用证，否则银行并没有义务开立该信用证。",
      //   "本申请书受中国法律管辖，并按中国法律解释，而申请人同意服从银行所在地的中国法院的非专属管辖权。",
      //   "本申请书的中文版本仅供参考。如本申请书的中文版本与英文版本有任何冲突，概以英文版本为准。",
      // ],
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
      docA:'',
      docB:'',
      docC:'',
      docD:'',
      docE:'',
      docF:'',
      docG:'',
      docH:'',
      doca:'',
      docb:'',
      docc:'',
      docd:'',
      doce:'',
      docf:'',
      docg:'',
      doch:'',
      otherDocs:[]
    }
  },
  props:{
    formData:{type:Object,default:{}},
    isPrint:{type:Boolean,default:false},
  },
  methods: {
  },
  mounted(){
    let _this = this
    _this.formData.otherDoc = _this.$tools.validator.unescapeHTML(_this.formData.otherDoc)
    _this.formData.descGoods = _this.$tools.validator.unescapeHTML(_this.formData.descGoods)
    _this.formData.tradeTerms = _this.$tools.validator.unescapeHTML(_this.formData.tradeTerms)
    let docItems = _this.formData.docItems.split(",")
    for(let item in docItems){
      if(docItems[item]=='A') _this.docA='A'
      if(docItems[item]=='B') _this.docB='B'
      if(docItems[item]=='C') _this.docC='C'
      if(docItems[item]=='D') _this.docD='D'
      if(docItems[item]=='E') _this.docE='E'
      if(docItems[item]=='F') _this.docF='F'
      if(docItems[item]=='G') _this.docG='G'
      if(docItems[item]=='H') _this.docH='H'
    }
    let otherInst = _this.formData.otherInst.split(",")
    for(let item in otherInst){
      if(otherInst[item]=='a') _this.doca='a'
      if(otherInst[item]=='b') _this.docb='b'
      if(otherInst[item]=='c') _this.docc='c'
      if(otherInst[item]=='d') _this.docd='d'
      if(otherInst[item]=='e') _this.doce='e'
      if(otherInst[item]=='f') _this.docf='f'
      if(otherInst[item]=='g') _this.docg='g'
      if(otherInst[item]=='h') _this.doch='h'
    }
    _this.otherDocs = _this.formData.otherDoc.replace(new RegExp('/space/','gm'),' ').split("/br/")
  }
}
</script>
<style  lang="scss">
.importCreditOpenPrint{word-spacing:-1px;font-family:Calibri;font-size:12px;}
.importCreditOpenPrintHead h3{border-bottom: 2px solid #000}
.importCreditOpenPrintHead .DCNumbe{border: 2px solid #000; height: 80px;}
.importCreditOpenPrintHead .bankUse{height:45PX; line-height:70px; background:#000; text-align: center; color: #fff;}
.importCreditOpenPrintContent table{width:100%;border-collapse:collapse;border:1px solid #000;margin-top:-1px;}
.importCreditOpenPrintContent td{ border:1px solid #000; padding:2px 5px; vertical-align:top}
.importCreditOpenPrint .checkBox{border:1px solid #000; display:inline-block; width:10px; height:10px; vertical-align:middle; margin-right:2px;font-size: 12px;line-height: 12px;padding-right:2px;}
.importCreditOpenPrint .positionLeft{padding-left:20px; position:relative;margin-top:1px;}
.positionLeft > .checkBox{position: absolute; left: 0px; top:4px;}
.importCreditOpenPrint .pNone{padding:0px;}
.importCreditOpenPrint .pNone .bankUse{height:40PX;  background:#000;color: #fff;}
.importCreditOpenPrint .borderLeft{border-left: 3px solid #000}
.importCreditOpenPrint .borderRight{border-right: 3px solid #000}
.importCreditOpenPrint .borderBottom{border-bottom: 3px solid #000}
.TermsAndConditions li{ position:relative; padding-left:20px; margin-top:20px;}
.TermsAndConditions li span{position: absolute; left:0px;top:1px;}
.importCreditOpenPrint .underline{text-decoration:underline;}

.importCreditOpenPrint ul{
    text-align: justify;
  }
  @media print{
    .importCreditOpenPrint{word-spacing:-1px;font-family:Calibri;font-size:12px;}
    .importCreditOpenPrintContent td{padding:0.5px 2px;}
  }
   

#accbutton{
  background-color:#fff;
  color:#00f;
  border:0px;
  text-decoration:underline;
  padding:0px;
}
</style>