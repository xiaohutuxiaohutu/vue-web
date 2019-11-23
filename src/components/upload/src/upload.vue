<template>
  <el-form ref="formFlie"  :action="action"  method="post" target="iframe" enctype="multipart/form-data">
      <input Type="file"  
        autocomplete="off"   
        @change="change($event.target.value,$event)"
        :placeholder="placeholder"
        :name="name"
        :id="configName"
        :disabled="disabledBtnFile"
      />
      <template v-for="(value,key) in uploadData">
        <input type="hidden" :name="key" :value="value" />
      </template>
      <el-button type="primary" @click="btnUpload" v-if="isShowBtnUoload" :disabled="disabledBtnFile">上传</el-button>
      <template v-if="isShowBtnUoload && isSuccess">
        <i class="el-icon-circle-check cGreen"></i>上传成功
      </template>
      <p v-if="isIE9()">您的浏览器暂不支持计算上传文件的大小，确保上传文件不要超过{{fileSize}}M。</p>
      <iframe name="iframe" style="display:none"></iframe>
  </el-form>
</template>
<script>
export default {
  name: 'upload',
  componentName: 'upload',
  data() {
      return {
        $parent:this.$parent || this.$root,
        filePath:'',
        disabledFile:false,
        disabledBtnFile:false,
        uploadData:{},
        checkTime:30,
        isSuccess:false,
        fileSize:'',
      }
  },
  props: {
    value:{},
    placeholder:{type:String,default:""},
    name: String,
    vm:{},
    formName:{},
    configName:{},
    action:{},
    formData:{},
    isShowBtnUoload:{default:true},
    index:{type:Number,default:0}
  },
  methods:{
    reset(){
      let _this=this
      _this.isSuccess=false
      let _uploadConfig=_this.vm[_this.configName]
      _uploadConfig.isSuccess = false
      _uploadConfig.isUploading = false
      _uploadConfig.isClickUpload = false
      _this.filePath=""
      document.getElementById(_this.configName).value = ""
      _this.$emit('input',"reset",_this.index)
      _this.$parent.$emit("el.form.change","reset")
    },
    change(value,event){
      let _this=this
      _this.isSuccess=false
      //let _form=_this.vm[_this.formName]
      let _uploadConfig=_this.vm[_this.configName]
      //_form.newFileName = ''
      _uploadConfig.isSuccess = false
      _uploadConfig.isUploading = false
      _uploadConfig.isClickUpload = false
      _this.filePath=value
      if(!_this.checkFileSize()) _this.filePath="sizeIsBig"
      _this.$emit('input',_this.filePath,_this.index)
      _this.$parent.$emit("el.form.change",_this.filePath)
    },
    btnUpload(){
      let _this=this
      //let _form=_this.vm[_this.formName]
      if(_this.isSuccess) return
      let _uploadConfig=_this.vm[_this.configName]
      //_form.newFileName = ''
      _uploadConfig.isSuccess = false
      //_this.isSuccess=false
      _this.$emit('input',_this.filePath,_this.index)
      _this.$parent.$emit("el.form.change",_this.filePath)
      if(_uploadConfig.isClickUpload){
        _uploadConfig.isUploading=true
        _this.$parent.$emit("el.form.change",_this.filePath)
        _this.requestSequenceNo()
      }
    },
    requestSequenceNo(){
      let _this=this
      _this.$tools.request(_this,"CB000010.do").then(
        data => {
          _this.uploadData = Object.assign({},_this.uploadData,{"flowNo":data.body.sequenceNo+new Date().getTime()})
          _this.submitForm()
      })
    },
    submitForm(){
      let _this=this
      _this.uploadData = Object.assign({},_this.formData,_this.uploadData)
      setTimeout(function(){
        _this.$refs.formFlie.$el.submit()
        _this.disabledBtnFile=true
        setTimeout(_this.checkUploadStatus,2000)
      },0)
    },
    checkUploadStatus(){
      let _this=this
      //let _form=_this.vm[_this.formName]
      let _uploadConfig=_this.vm[_this.configName]
      _this.checkTime-=1
      _this.$tools.request(_this,"CB000009.do",{"flowNo":_this.uploadData.flowNo,"closeLoading":true}).then(
        data => {
          if(data.body.status == 'N'){
            if(_this.checkTime != 0) setTimeout(_this.checkUploadStatus,2000)
            else{
              _this.checkTime=30
              _this.disabledBtnFile = false
              _uploadConfig.isSuccess = true
              //_form.newFileName = 'F'
              if(_this.isShowBtnUoload){
                _this.$emit('input','F',_this.index)
                _this.$parent.$emit("el.form.change",'F')
              }
              _this.$emit('uploadSuccess',data)
            }
          }else if(data.body.status == 'S'){
            _this.checkTime=30
            _this.isSuccess=true
            _this.disabledBtnFile = false
            _uploadConfig.isUploading = false
            _uploadConfig.isClickUpload = false
            _uploadConfig.isSuccess = true
            //_form.newFileName = data.body.newFileName
            if(_this.isShowBtnUoload){
              _this.$emit('input',data.body.newFileName,_this.index)
              _this.$parent.$emit("el.form.change",data.body.newFileName)
            }
            _this.$emit('uploadSuccess',data)
          }else if(data.body.status == 'F'){
            _this.checkTime=30
            _this.disabledBtnFile = false
             _uploadConfig.isSuccess = true
            //_form.newFileName = data.body.status
            if(_this.isShowBtnUoload){
              _this.$emit('input',data.body.status,_this.index)
              _this.$parent.$emit("el.form.change",data.body.status)
            }
            _this.$emit('uploadSuccess',data)
          }
          _this.disabledBtnFile = false
      })
    },
    checkFileSize(){
      let _this=this
      let _uploadConfig=_this.vm[_this.configName]
      _this.fileSize = _uploadConfig.fileSize ? _uploadConfig.fileSize : 20
      let fileUpload=document.getElementById(_this.configName)
      if(fileUpload.files && this.filePath != ''){
        let fileSize=fileUpload.files[0].size/(1024*1000)
        if(fileSize < _this.fileSize) return true
        else return false
      }else{
        return true
      }
    },
    isIE9(){
      return /MSIE 9.0/i.test(window.navigator.userAgent)
    }
  },
  mounted(){
    let _this=this
    // console.log(_this.vm)
  }
}
</script>
<style  lang="scss">
@import '../../../styles/vars.scss';

</style>
