<template>
  <div class="main-content">
    <!--面包屑-->
    <ynet-breadcrumb></ynet-breadcrumb>
    <!--面包屑--end-->
    <ynet-content id="stmanager" :headerInformation="true" :headerMenu="true" class="functionalArea">
      <h3 class="functionalAreaTitle">意见反馈</h3>
     
        <div class="stContent">
          <el-input type="textarea" :rows="8" placeholder="请输入您的宝贵建议" v-model="input" class="stText" id="suggestion" maxlength="400">
          </el-input>
        </div>

        <div class="btnArea mt20 tac">
          <el-button type="primary" @click="stSubmit()">提交</el-button>
          <el-button @click="getBack()">返回</el-button>
        </div>

    </ynet-content>
  </div>
</template>

<script>

export default {
  name: 'stManager',
  components: {

  },
  data() {
    return {
      input: '',
      form: {
        purposeName: ""
      },
    };
  },
  methods: {
    stSubmit() {
      let _this = this
      let body = {}
      body.content = this.input
      if (this.input.trim() == '') {
        _this.$alert("请输入内容", '失败提示', {
          confirmButtonText: '确定'
        })
      } else {
        _this.$tools.request(this, "CB081007.do", body).then(data => {
          if (data.body.errorCode == 0) {
            _this.$alert('提交成功', '温馨提示', {
              confirmButtonText: '确定',
              callback: action => {
                this.input = ''
              }
            });
          } else {
            _this.$alert(data.body.errorMsg, '温馨提示', {
              confirmButtonText: '确定'
            });
          }
        })
      }
    },
    getBack() {
      this.$router.push('/my/myMain')
    }
  }
}
</script>

<style>
.stMain {
  width: 100%;
  height: 700px;
  border: 1px solid;
  border-color: #ddd;
}

.stTitle {
  width: 100%;
  height: 50px;
  border: 0;
  border-bottom: 1px;
  border-style: solid;
  border-color: #ddd;
  background: #eee;
}

.stTitle>p {
  padding: 15px;
  padding-left: 40px;
}

.stContent {
  width: 80%;
  margin: 0 auto;
  margin-top: 50px;
}

.st_btn {
  margin: 70px;
}
</style>



