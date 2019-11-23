<template>
  <div>
    <div class="filestep1" v-show="upload">
      <!--table布局-->
      <div class="mt20">
        <el-form ref="upload_form" :model="upload_form" :rules="rules" class="formEmbedTable" enctype="multipart/form-data">
          <table>
            <caption>转账信息：</caption>
            <tr>
              <td><span class="cRed">*</span>选择批量文件：</td>
              <td >
                   <el-form-item prop="file" class="fl">
                        <ynet-upload 
                        name="filePath"
                        configName="uploadConfig"
                        action="/api/CB000008.do?versionNo=0.1"
                        ref="upload"
                        v-model="upload_form.file"
                        :vm="this"
                        formName="upload_form"
                        @uploadSuccess="uploadSuccess"
                        :isShowBtnUoload="uploadConfig.isShowBtnUoload"
                       >
                       </ynet-upload>
                   </el-form-item>
                   <a class="cBlue fr mt5" href="/corpbank/static/fileUpload/fileBatchtrans.zip">批次模板下载</a>
              </td>
            </tr>
            <tr>
                <td>转账方式：</td>
                <td>
                  <el-checkbox-group v-model="upload_form.radio" @change="updateRadio">
                    <el-checkbox :label="3">次日到账</el-checkbox>
                  </el-checkbox-group>
                </td>
              </tr>
              <tr> 
                <td colspan='2'  style="background:rgb(255,255,255); text-align:left;padding:12px 20px" ><p >温馨提示：</p>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp每次批量转账最多支持批量1000笔，目前只支持.xls格式上传！</td>
              </tr>
          </table>
        </el-form>
      </div>
      <!--table布局-->
      <!--手工添加列表 start-->
      <div class="tableData mt20"  v-if="success">
          <el-table :data="tableData1" stripe prop="tableData1">
            <el-table-column label="提交日期" prop="submitDate"></el-table-column>
            <el-table-column label="制单人" prop="userName"></el-table-column>
            <el-table-column label="总笔数" prop="amount"></el-table-column>
            <el-table-column prop="amountPrice" label="总金额">
            <template  scope="scope">
              <label v-if="!success_fail">{{$tools.utils.currencyFormat(scope.row.amountPrice)}}</label>
              <label v-if="success_fail">--</label>
            </template>
          </el-table-column>
          <el-table-column label="总手续费" >
           <template  scope="scope">
              <label v-if="scope.row.netFee!=''">{{$tools.utils.currencyFormat(scope.row.netFee)}}</label>
              <label v-if="scope.row.netFee==''">--</label>
              <label v-if="success_fail">--</label>
            </template>
          </el-table-column>
            <el-table-column label="文件解析状态" prop="status"></el-table-column>
            <el-table-column label="操作">
              <template  scope="scope">
                <a class="cOrange" @click="uploadFile" v-if="!success_fail">提交确认</a>
                <a class="cOrange ml5" @click="cleanList" v-if="!success_fail">删除</a>
                <a class="cOrange" @click="uploadFile" v-if="success_fail">查看详情</a>
              </template>
            </el-table-column>
          </el-table>
      </div>
      <!--手工添加列表--END-->
    </div>
    
    <div class="filestep1" v-if="fail">
    <!--添加列表-->
    <div class="tableData mt40">
        <el-table :data="tableData2" stripe>
          <el-table-column prop="errorCode" label="错误码"></el-table-column>
          <el-table-column prop="errorMsg" label="错误描述"></el-table-column>
        </el-table>
    </div>  
    
  </div>
    
    </div>
  </div>
</template>

<script>  

  export default {
    name:'file',
    components:{
        
    },
    data(){
      return{
        user:this.$tools.storage.get("user","save"),
        upload_form: {
          radio:false,
          file:'',
          newFileName:'',
        },
        uploadConfig:{
          isUploading:false,
          isClickUpload:false,
          isShowBtnUoload:true,
          isSuccess:false,
          fileSize:'1',
        },
        tableData1:[],
        patchTransList:[],
        form:{
          radio:""
        },
        rules:{
          file: [
            { trigger: 'change',validator:this.$tools.validator.fileValidator,fileType:['xls'],formName:'upload_form',vm:this,configName:"uploadConfig"},
          ]
        },
        patchNo:"",
        upload:true,
        success:true,
        fail:false,
        success_fail:false,
        tableData2:[],
        errList:[],
        disabledBtnFile:false,
      }
    },
    props:{
        formData:{},
     },
    methods: {
     uploadSuccess(input){
       let _this = this
       _this.uploadConfig.isShowBtnUoload = false
       if(_this.tableData1 != undefined){
        _this.tableData1.splice(0,_this.tableData1.length)
       }
       let requestData ={}
       requestData.newFileName = input.body.newFileName
      _this.$tools.request(_this, "CB020107.do", requestData).then(//文件上传
        data => {
          if(data.body.errorCode == "0"){
              _this.uploadConfig.isShowBtnUoload = true
              _this.fail = false
              _this.success = true
              _this.errList = data.body.errList
              let _errLen = _this.errList.length
              if(_errLen > 0){
                _this.success_fail = true
              }else{
                _this.success_fail = false
              }

              let inTableData = {}
               if(_errLen > 0){
                inTableData.status = "失败"
                inTableData.amount = "--"
                inTableData.amountPrice = "--"
              }else{
                inTableData.status = "成功"
                _this.patchTransList = data.body.patchTransList
                inTableData.amount = _this.patchTransList.length
                let _amountPrice = 0
                let _receivableFee = 0
                let _netFee = 0
                for(let i = 0; i < inTableData.amount; i++){
                  _amountPrice += Number(_this.patchTransList[i].amt)
                  _receivableFee += Number(_this.patchTransList[i].receivableFee)
                  _netFee += Number(_this.patchTransList[i].netFee)
                  _this.patchTransList[i].DEALDATE = ""
                  _this.patchTransList[i].isOrder = ""
                  _this.patchTransList[i].symbolType = _this.upload_form.radio == true?"1":"0"
                  _this.patchTransList[i].bespeakTimeType = ""
                  _this.patchTransList[i].treadPhone = ""
                }
                inTableData.amountPrice = parseFloat(_amountPrice).toFixed(2)
                inTableData.receivableFee = _receivableFee
                inTableData.netFee = _netFee
                inTableData.payAccount = _this.patchTransList[0].payAccount
                inTableData.payName = _this.patchTransList[0].payName

              }

              inTableData.submitDate = _this.$tools.utils.formatDate(new Date(),{"today":true})
              inTableData.userName = _this.user.userName
              _this.tableData1.push(inTableData)
          }else{
              let _this = this
              _this.success = false
              _this.fail = true
              _this.uploadConfig.isShowBtnUoload = true
              let inTableData = {}
              inTableData.errorCode = data.body.errorCode
              inTableData.errorMsg = data.body.errorMsg
              _this.tableData2.splice(0,_this.tableData2.length)
              _this.tableData2.push(inTableData)
          }
        }
      )
     },
     //次日到账点击按钮
     updateRadio(){
       let _this = this
       if(_this.patchTransList.length != 0){
          if(_this.upload_form.radio == true){
            _this.patchTransList[0].symbolType = "1"
          }else{
            _this.patchTransList[0].symbolType = "0"
          }
       }
     },
     //删除
     cleanList(){
       let _this = this
       _this.tableData1.splice(0,_this.tableData1.length)
     },
     //提交确认
     uploadFile(){
        let _this = this
        _this.nextstep()  

        if(_this.patchTransList.length>0){
        	let transferType=_this.patchTransList[0].symbolType
            if(transferType=="1"){
           	 transferType="次日到账"
            }else{
           	 transferType="普通转账"
            }
           _this.tableData1[0].transferType=transferType
        }
         
     },
     nextstep(){
        let _this=this
        _this.$emit("changeStep","1",$.extend({},{tableData1:_this.tableData1,patchTransList:_this.patchTransList,errList:_this.errList}))
     }
  },
  mounted(){ 
	 
      let _this = this
      if(_this.formData.errList != undefined ){

        if(_this.formData.errList.length>0){
        	 
          _this.success_fail = true
          _this.tableData1 = _this.formData.tableData1
          _this.errList = _this.formData.errList
        }
        else{
         _this.tableData1 = _this.formData.tableData1
          _this.patchTransList = _this.formData.patchTransList
          _this.success_fail = false
        }
      }
  }
}

</script>