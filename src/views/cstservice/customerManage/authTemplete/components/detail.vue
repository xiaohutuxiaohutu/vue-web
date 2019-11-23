<template>
  <div>
    <!--审批模版设置-->
    <el-form ref="form" :model="form" class="formEmbedTable">
      <table>
        <caption>审批模版设置</caption>
        <tr>
          <td>
            <span class="cRed">*</span>模版名称：</td>
          <td>
            <el-form-item prop="alias">
              <label>{{form.alias}}</label>
            </el-form-item>
          </td>
          <td>模版类型：</td>
          <td>
            <el-form-item prop="areaType">
              <label v-if="form.areaType == '1'">有金额式</label>
              <label v-if="form.areaType == '0'">无金额式</label>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>
            <span class="cRed">*</span>审批级别：</td>
          <td colspan="3">
            <el-form-item prop="level">
              <label v-if="form.level == '1'">一级</label>
              <label v-if="form.level == '2'">二级</label>
              <label v-if="form.level == '3'">三级</label>
              <label v-if="form.level == '4'">四级</label>
              <label v-if="form.level == '5'">五级</label>
            </el-form-item>
          </td>
        </tr>
      </table>
    </el-form>
    <!--审批模版设置-->

    <!--金额跨度区间-->
    <el-form ref="form2" :model="form2" class="tableData mt20 amountRangeTable">
      <el-table :data="form2.amountRange" stripe>
        <el-table-column label="金额区间" :width="320" align="left">
          <template scope="scope">
            <el-form-item :prop="'amountRange.' + scope.$index + '.start'">
              <ynet-currency-input class="w100" v-model="form2.amountRange[scope.$index].start" :showChinese="false" :disabled="true">
              </ynet-currency-input>
            </el-form-item>
            <span>&lt; 金额</span>
            <template v-if="scope.$index < form2.amountRange.length-1">
              <span> &lt;=</span>
              <el-form-item>
                <ynet-currency-input class="w100" v-model="form2.amountRange[scope.$index].end" :showChinese="false" :disabled="true">
                </ynet-currency-input>
              </el-form-item>
            </template>
          </template>
        </el-table-column>
        <el-table-column label="一级" v-if="form.level>=1">
          <template scope="scope">
            <el-form-item :prop="'amountRange.' + scope.$index + '.levelOne'">
              <el-input class="w30" v-model="form2.amountRange[scope.$index].levelOne" :disabled="true"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="二级" v-if="form.level>=2">
          <template scope="scope">
            <el-form-item :prop="'amountRange.' + scope.$index + '.levelTwo'">
              <el-input class="w30" v-model="form2.amountRange[scope.$index].levelTwo" :disabled="true"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="三级" v-if="form.level>=3">
          <template scope="scope">
            <el-form-item :prop="'amountRange.' + scope.$index + '.levelThree'">
              <el-input class="w30" v-model="form2.amountRange[scope.$index].levelThree" :disabled="true"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="四级" v-if="form.level>=4">
          <template scope="scope">
            <el-form-item :prop="'amountRange.' + scope.$index + '.levelFour'">
              <el-input class="w30" v-model="form2.amountRange[scope.$index].levelFour" :disabled="true"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="五级" v-if="form.level>=5">
          <template scope="scope">
            <el-form-item :prop="'amountRange.' + scope.$index + '.levelFive'">
              <el-input class="w30" v-model="form2.amountRange[scope.$index].levelFive" :disabled="true"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <!--金额跨度区间--END-->
    <div class="btnArea mt20 tac">

      <el-button type="primary" @click="preStep()">返回</el-button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'templateName',
  components: {

  },
  data() {
    return {
      form: {
        alias: '',
        areaType: '1',
        level: '1'
      },
      form2: {
        amountRange: [{
          levelOne: '',
          levelTwo: '',
          levelThree: '',
          levelFour: '',
          levelFive: '',
          start: '0',
          end: '999999999999999',
          authDef: ''
        }],
      },
      rules2: {

      }
    }
  },
  props: {
    stepData: { type: Object, default: {} },
  },
  methods: {
    preStep() {
      let _this = this
      _this.$emit("changeStep", '0')
    },

  },
  mounted() {

  },
  created() {
    let _this = this
    _this.form = _this.stepData.templete
    // _this.form2.amountRange = _this.stepData.templeteArea
    let compare = function(obj1, obj2) {
      let val1 = obj1.areaNo
      let val2 = obj2.areaNo
      if (val1 < val2) {
        return -1
      } else if (val1 > val2) {
        return 1
      } else {
        return 0
      }
    }
    _this.form2.amountRange = $.extend([],_this.stepData.templeteArea.sort(compare))
    let index = 0
    for (var value of _this.form2.amountRange) {
      _this.form2.amountRange[index].levelOne = value.authDef.substring(0, 1)
      _this.form2.amountRange[index].levelTwo = value.authDef.substring(1, 2)
      _this.form2.amountRange[index].levelThree = value.authDef.substring(2, 3)
      _this.form2.amountRange[index].levelFour = value.authDef.substring(3, 4)
      _this.form2.amountRange[index].levelFive = value.authDef.substring(4, 5)
      index += 1
    }
  }
}
</script>
