<template>
  <div class="box2 bt pt20">
    <div class="information">
      <h3 class="mb20 ml10" v-if="userInfo.userSex=='M'">
        <span class="ml10">{{userInfo.userName}}先生，下午好!</span>
      </h3>
      <h3 class="mb20 ml10" v-if="userInfo.userSex=='F'">
        <span class="ml10">{{userInfo.userName}}女士，下午好!</span>
      </h3>
      <span class="set"><img src="../../../images/my/setting.png" alt=""></span>
      <p class="plr10 basic">基本信息</p>
      <el-row>
        <el-col :span="24">
          <el-form :model="userInfo" ref="userInfo">
            <el-form-item label="专属客户经理：">
              <label>{{ userInfo.mName}}</label>
            </el-form-item>
            <el-form-item label="联系电话：">
              <label>{{ userInfo.mPhone}}</label>
            </el-form-item>
            <el-form-item label="最近登录时间：">
              <label>{{$tools.utils.formatDate(userInfo.lastLogonTime,{"symbol":"YYYY-MM-DD HH:mm:ss"})}}</label>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <div class="notice plr20 mt20">
        <p style="height:35px;margin-bottom:10px;">
          <span class="fl"><img src="../../../images/my/announcement.png" alt=""></span>
          <span class="fr"><img src="../../../images/my/button_bj_78.png" alt=""></span>
          <span class="more" style="color:#ee6b00" @click="more">更多</span>
        </p>
        <p class="pb10" v-for="(option,index) in options" v-if="isNotice"><a @click="toNoticeDetail(JSON.stringify(option))">{{option.title}}</a></p>
        <p v-if="!(isNotice)">维护中</p>
      </div>
      <!--弹窗-->
      <el-dialog title="详细信息" :visible.sync="dialogTableVisible" :close-on-click-modal="false" :close-on-press-escape="false">
        <div class="formEmbedTable">
          <table>
            <caption>公告详情</caption>
            <tr>
              <td>公告编号：</td>
              <td>{{detailMsg.announcementNo}}</td>
              <td>公告标题：</td>
              <td>{{detailMsg.title}}</td>
            </tr>
            <tr>
              <td>发布时间：</td>
              <td colspan="3">{{$tools.utils.formatDate(detailMsg.publishTime,{"symbol":"YYYY-MM-DD HH:mm:ss"})}}</td>
            </tr>
            <tr>
              <td>公告内容：</td>
              <td style="width:750px" colspan="3"><div v-html="detailMsg.content"></div></td>
            </tr>
        </table>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogTableVisible = false">关闭</el-button>
        </div>
      </el-dialog>
      <!--弹窗--END-->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      isNotice : true,
      userInfo: {
        userName: "",
        mName: "",
        mPhone: "",
        lastLogonTime: "",
        userSex: ""
      },
      options: [],
      noticeCount: '',
      tempList:[],
      detailMsg:{},
      dialogTableVisible:false,
    }
  },
  mounted() {
    this.information()
    this.announcement()
  },

  methods: {
    information() {
      let _this = this
      let user = _this.$tools.storage.get("user","save")
      _this.userInfo.userName = user.userName
      _this.userInfo.mName = user.mName
      _this.userInfo.mPhone = user.mPhone
      _this.userInfo.lastLogonTime = user.lastLogonTime
      _this.userInfo.userSex = user.userSex
    },
    announcement() {
      let _this = this
      let body = {}
      body.currentPage='1'
      body.pageSize='10'
      _this.$tools.request(_this, "CB000204.do", body).then(
        data => {
         _this.tempList = data.body.announcementList
          //console.log(JSON.stringify(tempList.length))
          if(_this.tempList.length > 2){
            for(let i = 0;i < 2; i++){
              _this.options.push(_this.tempList[i])
            }
            //console.log("公告1:"+JSON.stringify(_this.options))
          }else if(_this.tempList.length == 0){
            _this.isNotice=false
          }else{
            _this.options = _this.tempList
            //console.log("公告2:"+JSON.stringify(_this.options))
          }
          _this.noticeCount = data.body.annoCount
          //console.log("公告总条数:"+_this.noticeCount)
        }
      )
    },
    toNoticeDetail(val){
      let _this = this
      _this.detailMsg = JSON.parse(val)
      _this.detailMsg.content = _this.$tools.validator.unescapeHTML(_this.detailMsg.content)
      _this.detailMsg.content = _this.$tools.validator.unformatHTML(_this.detailMsg.content)
      _this.dialogTableVisible = true
    },
    more(){
      let _this = this
      _this.$emit("announment",false)
    },

  }
}

</script>
<style lang="scss">
.box2 {
  width: 270px;
  height: 322px;
  background:#fff;
}

.box2 .information {
  position: relative;
}

.box2 .information h3 {
  line-height: 40px;
  background: #ee6b00;
  color: #fff;
  font-size: 16px;
}

.box2 .information .set {
  position: absolute;
  top: 10px;
  right: 50px;
}

.box2 .information .basic {
  line-height: 30px;
  background: #ccc;
  width: 60px;
}

.box2 .information .el-form-item {
  margin-bottom: 0;
  border: 1px
}

.box2 .information .el-form-item__content {
  border-bottom: 2px dashed #ee6b00;
}

.box2 .notice {
  height: 90px;
  position: relative;
}

.notice .more {
  position: absolute;
  top: 2px;
  right: 33px;
  color: #ee6b00;
  z-index: 100;
  cursor: pointer;
}

.fade-enter-active,
.fade-leave-active {
  transition: all .2s ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>