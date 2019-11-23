<template>
<div class="exportCollectionStep">
      <!--table布局-->
      <el-form ref="form" :model="form" :rules="rules" class="formEmbedTable mt20">
        <table>
          <caption>出口托收信息</caption>
          <tr>
            <td>
              <p><span class="cRed">*</span>Collecting Bank (Full name & address & SWIFT)</p>
              <p>代收行（全称、地址和SWIFT）</p>
            </td>
            <td colspan="3">
              <el-form-item  prop="chineseAdd">
                <el-input type="textarea" placeholder="第一行请输入，第二行请输入"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>
              <p><span class="cRed">*</span>Drawer(Full name & address)</p>
              <p>收款人（全称和地址）</p>
            </td>
            <td colspan="3">
              <el-form-item  prop="chineseAdd">
                <el-input type="textarea" placeholder="第一行请输入，第二行请输入"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>
              <p><span class="cRed">*</span>Drawee(Full name & address)</p>
              <p>付款人（全称和地址）</p>
            </td>
            <td colspan="3">
              <el-form-item  prop="chineseAdd">
                <el-input type="textarea" placeholder="第一行请输入，第二行请输入"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>
              <p><span class="cRed">*</span>Tenor</p>
              <p>付款期限</p>
            </td>
            <td>
              <el-form-item  prop="chineseAdd">
                <el-input  placeholder="第一行请输入，第二行请输入"></el-input>
              </el-form-item>
            </td>
            <td>
              <p><span class="cRed">*</span>Draft/Inv no.</p>
              <p>汇票/发票号码</p>
            </td>
            <td>
              <el-form-item  prop="chineseAdd">
                <el-input  placeholder="第一行请输入，第二行请输入"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>
              <p><span class="cRed">*</span>Currency</p>
              <p>币种</p>
            </td>
            <td>
              <el-form-item  prop="chineseAdd">
                <el-input  placeholder="第一行请输入，第二行请输入"></el-input>
              </el-form-item>
            </td>
            <td>
              <p><span class="cRed">*</span>Amount</p>
              <p>金额</p>
            </td>
            <td>
              <el-form-item  prop="chineseAdd">
                <el-input  placeholder="第一行请输入，第二行请输入"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>
              <p><span class="cRed">*</span>Brief Goods Description</p>
              <p>货物简述</p>
            </td>
            <td colspan="3">
              <el-form-item  prop="chineseAdd">
                <el-input type="textarea" placeholder="第一行请输入，第二行请输入"></el-input>
              </el-form-item>
            </td>
          </tr>
        </table>
        <table class="textCenter">
          <caption><span class="cRed">*</span>单据</caption>
          <tr class="resetPadding">
            <th colspan="2">
              <p>DRAFT</p>
              <p>汇票</p>
            </th>
            <th colspan="2">
              <p>INV.</p>
              <p>发票</p>
            </th>
            <th colspan="2">
              <p>PACKING LIST</p>
              <p>装箱单</p>
            </th>
            <th colspan="2">
              <p>WEIGHT LIST</p>
              <p>重量单</p>
            </th>
            <th colspan="2">
              <p>B/L</p>
              <p>提单</p>
            </th>
            <th colspan="2">
              <p>AWB</p>
              <p>航空运单</p>
            </th>
            <th colspan="2">
              <p>ORIGIN CERT.</p>
              <p>产地证明书</p>
            </th>
            <th colspan="2">
              <p>INS. POL.</p>
              <p>保单</p>
            </th>
            <th colspan="2">
              <p>CERT.</p>
              <p>证明书</p>
            </th>
          </tr>
          <tr class="bgWhite resetPadding">
            <td>original</td>
            <td>copy</td>
            <td>original</td>
            <td>copy</td>
            <td>original</td>
            <td>copy</td>
            <td>original</td>
            <td>copy</td>
            <td>original</td>
            <td>copy</td>
            <td>original</td>
            <td>copy</td>
            <td>original</td>
            <td>copy</td>
            <td>original</td>
            <td>copy</td>
            <td>original</td>
            <td>copy</td>
          </tr>
          <tr class="bgWhite resetPadding">
            <td>
              <el-form-item>
                <el-input class="w28"></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item>
                <el-input class="w28"></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item>
                <el-input class="w28"></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item>
                <el-input class="w28"></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item>
                <el-input class="w28"></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item>
                <el-input class="w28"></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item>
                <el-input class="w28"></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item>
                <el-input class="w28"></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item>
                <el-input class="w28"></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item>
                <el-input class="w28"></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item>
                <el-input class="w28"></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item>
                <el-input class="w28"></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item>
                <el-input class="w28"></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item>
                <el-input class="w28"></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item>
                <el-input class="w28"></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item>
                <el-input class="w28"></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item>
                <el-input class="w28"></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item>
                <el-input class="w28"></el-input>
              </el-form-item>
            </td>
          </tr>
        </table>
        <div class="btnArea mt20 tac">
          <el-button type="primary" @click="submitForm()">下一步</el-button>
          <el-button @click="resetForm()">重置</el-button>
        </div>
      </el-form>
      <!--table布局-->
</div>
</template>

<script>
export default {
  name:'exportCollectionStep1',
  components: {
  },
  data() {
    return {
      form: {
          chineseName:''
      },
      rules: {
        chineseName: [
          {trigger: 'blur', validator:this.chineseValidator}
        ]
      }
    }
  },
  methods: {
    submitForm() {
      let _this=this
      _this.$refs['form'].validate((valid) => {
        if (valid) {
          _this.$emit("changeStep","1",_this.form)
        } else {
          console.log('error submit!!')
          return false
        }
      });
    },
    resetForm() {
      let _this=this
      _this.$refs['form'].resetFields()
    }
  },
  mounted(){ 
  }
}
</script>