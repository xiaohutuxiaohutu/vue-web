<template>
    <!-- 业务提醒 -->
      <div class="box3 bt position-r">
        <div class="lh40 plr20 fix">
          <h3 class="fl" style="margin-right:80px;">
            <span><img src="../../../images/my/main_title_bj_178.png" alt=""></span>
          </h3>
          <span class="bell"><img src="../../../images/my/bell.png" alt=""></span>
          <span class="text">业务提醒</span>
          <span class="fr mt10"  v-if="isShow"><img src="../../../images/my/button_bj_78.png" alt=""></span>
          <span @click="more" class="more"  v-if="isShow">更多</span>
          <div>
            <!--<el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="业务提醒" name="first">-->
                <el-table ref="MyTransaction" :data="authResultList">
                  <el-table-column label="待处理任务" width="200">
                    <template scope="scope">
                      <div class="circle inline-block mr10"></div>
                      <a @click="toAuth()" class="cOrange" style="margin-top:8px;">{{$tools.dict.funTransType(scope.row.bsnCode)}}</a>
                      <!--a @click="toAuth()" class="cOrange" style="margin-top:8px;">{{scope.row.bsnCode}}</a-->
                      <!--<span style="color:#353535;">{{scope.row.bsnName}}</span>-->
                    </template>
                  </el-table-column>
                  <el-table-column label="待授权交易" width="138">
                    <template scope="scope">
                      <span style="color:#353535;">{{scope.row.authSum}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="授权同意交易" width="138">
                    <template scope="scope">
                      <span style="color:#353535;" v-if="scope.row.authAllowSum==''">0</span>
                      <span style="color:#353535;" v-else>{{scope.row.authAllowSum}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="授权拒绝交易" width="138">
                    <template scope="scope">
                      <span style="color:#353535;" v-if="scope.row.authRefuseSum==''">0</span>
                      <span style="color:#353535;" v-else>{{scope.row.authRefuseSum}}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
              <!--<el-tab-pane label="消息提醒" name="second">
                <el-form ref="form" :model="form" class="msgR">
                  <table style="width:100%;">
                    <tr>
                      <td>
                        <p>该模块正在维护,给您造成的不便敬请谅解!</p>
                      </td>
                    </tr>
                  </table>
                </el-form>
              </el-tab-pane>
            </el-tabs>-->
          </div>
        </div>
      </div>
    <!--最近交易记录--END-->
</template>

<script>
import ynetIcon from '@src/components/icon'  //icon
export default {
  name: 'MyCard',
  components: {
    ynetIcon
  },
  data() {
    return {
      user:this.$tools.storage.get("user", "save"),
      isShow:false,
      form: {
        name: '',
        name2: '',
        input1: '',
        input2: '',
        resource: [],
        file: ''
      },
      activeName: 'first',
      cardList: [],
      tableData: [],
      NO: "1",
      authResultList: []
    };
  },
  methods: {
    toAuth(index,obj){
        let _this = this
        _this.$router.push({path:'/transdeal/examine/examineMain'})
    },
    handleClick(tab, event) {
      //console.log(tab, event);
    },
    remind() {
      let _this = this
      let body = {}
      let user = _this.$tools.storage.get("user","save")
      body.cstNo = user.cstNo
      body.userNo = user.eCIFID
      body.startDateObj = new Date(this.getDefaultDate().replace(/-/g,"/"))
      body.endDateObj = new Date()
      body.startDate = this.$tools.utils.formatDate(body.startDateObj)
      body.endDate = this.$tools.utils.formatDate(body.endDateObj)
      //console.log(body.startDate)
      //console.log(body.endDate)
      _this.$tools.request(_this, "CB000205.do", body).then(
        data => {
          let authList = data.body.authList
          let authAllowList = data.body.authAllowList
          let authRefuseList = data.body.authRefuseList
          for (let i = 0; i < authList.length; i++) {
            for (let j = 0; j < authAllowList.length; j++) {
                if (authList[i].bsnCode == authAllowList[j].bsnCode) {
                    authList[i].authAllowSum = authAllowList[j].authAllowSum
                }
            }
            for (let k = 0; k < authRefuseList.length; k++) {
                if (authList[i].bsnCode == authRefuseList[k].bsnCode) {
                    authList[i].authRefuseSum = authRefuseList[k].authRefuseSum
                }
            }
          }
          let tempList=[]
          if (authList.length > 5) {
            for (let l = 0; l < 5; l++) {
              tempList[l] = authList[l]
            }
          } else {
            tempList = authList
          }
          _this.authResultList = tempList
        }
      )
    },
    getDefaultDate(){ //获取当前日期前90天的日期
        let currDate = new Date()
        let year = currDate.getFullYear()
        let month = currDate.getMonth()+1
        let date  = currDate.getDate()
        switch(month){
            case 1:
            case 2:
            case 3:
                month += 9
                year --
                break
            default:
                month -= 3
                break
        }
        month = (month < 10) ? ( '0' + month) : month
        if(month=='02'){
            if((year%4==0&&year%100!=0)||(year%400==0)){   //闰年判断
            if(Number(date)>29){
                date='29'
            }
            } else {    //平年
            if(Number(date)>28){
                date='28'
            }
            }
        }
        let resultDate = year+'-'+month+'-'+date
        return resultDate
    },
    more(val) {
      let _this = this
      _this.$router.push(
        '/transdeal/examine/examineMain'
      )
    },
  },

  mounted() {
    let _this = this
    this.remind()
    if(_this.user.right=='10100000'||_this.user.right=='10110000'){
        _this.isShow = true
    }
  },
}

</script>
<style lang="scss">
.box3 {
  width: 670px;
  height:358px;
  background:#fff;
}

.box3 .text {
  position: absolute;
  top: -5px;
  left: 77px;
  color: #fff;
  font-size: 17px;
}

.box3 .more {
  position: absolute;
  top: 4px;
  right: 34px;
  color: #ee6b00;
  z-index: 100;
  cursor: pointer;
}

.box3 .bell {
  position: absolute;
  top: 1px;
  left: 47px;
}

.box3 a {
  position: absolute;
  top: 4px;
  right: 32px;
  color: #f18031
}

.box3 .el-table th {
  background: #aca3a0;
}

.box3 .el-table__header-wrapper .cell {
  background: #aca3a0;
  color: #fff;
}

.box3 .circle {
  width: 15px;
  height: 15px;
  background: #f86049;
  border-radius: 50%;
}

.msgR td {
  height: 40px;
  border-bottom: 1px solid #dfe6ec;
  width: 100%;
}

.el-table__empty-block {
  min-height: 80px;
}

.el-table th>.cell {
  text-align: center;
}

.el-table_1_column_2,.el-table_1_column_3,.el-table_1_column_4 .cell {
  text-align: center;
}

</style>