<template>
<div class="exportCollectionStep">
      <!--table布局-->
      <div ref="form" :model="form" :rules="rules" class="exportCollectionTable mt40">
        <h3 class="tac">APPLICATION FOR DOCUMENTARY COLLECTION</h3>
        <div class="fix mt20">
          <span class="fl">To：<span class="cRed">HING BANK LIMITED, ________________Branch</span></span>
          <span class="fr">Date:</span>
        </div>
        <table class="mt20">
          <tr>
            <td width="60%" height="120" style="border:0;">
              <p class="mt20">We present the enclosed draft(s)/documents for your disposal in accordance with the following instructions. </p>
              <p class="mt20">This collection is subject to URC522.</p>
            </td>
            <td colspan="2">
              <p>Collecting Bank (Full name & address & SWIFT)</p>
            </td>
          </tr>
          <tr>
            <td height="100">
              <p>Drawer(Full name & address)</p>
            </td>
            <td colspan="2">
              <p>Tenor</p>
            </td>
          </tr>
          <tr>
            <td height="100">
              <p>Drawee(Full name & address)</p>
            </td>
            <td>
              <p>Draft/Inv no.</p>
            </td>
            <td>
              <p>Currency and Amount</p>
            </td>
          </tr>
          <tr>
            <td height="200" colspan="3">
              <p>Brief Goods Description</p>
            </td>
          </tr>
        </table>
        <h3 class="mt20">DOCUMENTS</h3>
        <table class="textCenter mt20 tac">
          <tr>
            <th>
              <p>DRAFT</p>
            </th>
            <th>
              <p>INV.</p>
            </th>
            <th>
              <p>PACKING LIST</p>
            </th>
            <th>
              <p>WEIGHT LIST</p>
            </th>
            <th>
              <p>B/L</p>
            </th>
            <th>
              <p>AWB</p>
            </th>
            <th>
              <p>ORIGIN CERT.</p>
            </th>
            <th>
              <p>INS. POL.</p>
            </th>
            <th height="30">
              <p>CERT.</p>
            </th>
          </tr>
          <tr>
            <td height="30"></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </table>
        <table>
          <tr>
            <td>
              <p>Special Instructions (See box marked 'X'): </p>
            </td>
          </tr>
        </table>
        <div class="btnArea mt20 tac">
          <el-button type="primary" @click="submitForm()">提交</el-button>
          <el-button @click="preStep()">上一步</el-button>
        </div>
      </div>
      <!--table布局--> 
</div>
</template>

<script>
export default {
  name:'exportCollectionStep2',
  components: {
  },
  data() {
    return {

    }
  },
  props:{
    formData:{type:Object,default:{}},
  },
  methods: {
    preStep(){
      let _this=this
      _this.$emit("changeStep","0")
    },
    submitForm() {
      let _this=this
      _this.$tools.request(this,"MyTransaction.do",_this.formData).then(data => {
        _this.$emit("changeStep","2",data)
      })
    }
  },
  mounted(){ 
  }
}
</script>
<style  lang="scss">

</style>