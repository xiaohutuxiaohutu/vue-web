<template>
  <div class="templateStep1 ">
    <!--4格布局table-->
    <div class="fourForm tableForm mt20">
      <h3>付款人信息</h3>
      <el-form ref="form1" :model="form1" :rules="rules1">
        <el-row>
          <el-form-item label="证件类型" prop="name" class="fullLine">
            <el-select v-model="form1.name" placeholder="请选择证件类型">
              <el-option label="身份证" value="身份证"></el-option>
              <el-option label="军官证" value="军官证"></el-option>
            </el-select>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="输入1"  prop="name2">
            <el-input v-model="form1.name2" placeholder="请输入账号"></el-input>
            <span class="cOrange ml5">常用收款人</span>
          </el-form-item>
          <el-form-item label="输入2"  prop="name3">
            <el-input v-model="form1.name3" placeholder="请输入账号"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="数据1">
            {{form2.data1}}
          </el-form-item>
          <el-form-item label="数据2">
            {{form2.data2}}
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="一行数据" class="fullLine">
            {{form2.name2}}
          </el-form-item>
        </el-row>
      </el-form>  
    </div>
    <!--4格布局table--end-->
    <!--2格布局table-->
    <div class="twoForm tableForm mt20">
      <h3>收款人信息</h3>
      <el-form ref="form2" :model="form2" :rules="rules2">
        <el-form-item label="账号" prop="name2">
          <el-input v-model="form2.name2" placeholder="请输入账号"></el-input>
          <span class="cOrange ml5">常用收款人</span>
        </el-form-item>
        <el-form-item label="手机号1">
          <el-input></el-input>
          <span class="cGray9 ml5">免费通知其汇款信息</span>
        </el-form-item>
        <el-form-item label="活动性质">

            <el-checkbox label="美食/餐厅线上活动" v-model="checked"  @change="checkChange(checked)"></el-checkbox>
            <el-checkbox label="地推活动"></el-checkbox>
            <el-checkbox label="线下主题活动"></el-checkbox>
            <el-checkbox label="单纯品牌曝光"></el-checkbox>

        </el-form-item>
        <el-form-item label="特殊资源">
          <el-radio-group v-model="form2.resource">
            <el-radio label="线上品牌商赞助"></el-radio>
            <el-radio label="线下场地免费"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="活动时间" required>
          <el-form-item prop="star">
            <el-date-picker type="date" placeholder="开始日期" v-model="form2.star"></el-date-picker>
          </el-form-item>
          至
          <el-form-item prop="end">
            <el-date-picker type="date" placeholder="结束日期" v-model="form2.end"></el-date-picker>
          </el-form-item>
        </el-form-item>
        <el-form-item label="活动形式">
          <el-input type="textarea" v-model="form2.desc"></el-input>
        </el-form-item>
      </el-form>
      <div class="btnArea mt20 tac">
        <el-button type="primary" @click="submitForm()">提交结果</el-button>
        <el-button type="primary" @click="$tools.print()">打印</el-button>
        <el-button @click="resetForm()">重置</el-button>
      </div>
    </div>
    <!--2格布局table--end-->
  </div>
</template>

<script>
export default {
  name:'templateStep1',
  components: {
  },
  data() {
    return {
      checked:true,
      form1: {
          name:''
      },
      rules1: {
        name: [
          { message: '请选择证件类型', trigger: 'change', required: true}
        ],
        name2: [
          { message: '请输入', trigger: 'blur', required: true}
        ],
        name3: [
          { message: '请输入', trigger: 'blur', required: true}
        ]
      },
      form2: {
          name2:'',
          type:[],
          resource:'',
          star:'',
          end:'',
          date:'',
          desc:'',
          data1:'测试1',
          data2:'测试2'
      },
      rules2: {
        name2: [
          { message: '请输入账号', trigger: 'blur', required: true}
        ],
        star:[
          { required: true, type:"date", message:'请输入起始日期', trigger: 'blur' },
          { validator:this.compareDate, trigger: 'blur'}
        ],
        end:[
          { required: true, type:"date", message:'请输入结束日期', trigger: 'blur' },
          { validator:this.compareDate, trigger: 'blur'}
        ]
      },
      form1Validate:false
    }
  },
  methods: {
    compareDate(rule, value, callback){
      console.log(rule)
      let _this=this
      let star=_this.form2.star
      let end=_this.form2.end
      if(star && end){
        if(star.getTime() > end.getTime())  callback("起始日期不能大于结束日期")
      }
      callback()
    },
    submitForm() {
      let _this=this
      _this.$refs['form1'].validate((valid) => {
        if (valid) {
          _this.form1Validate=true
        } else {
          console.log('error submit!!')
          return false
        }
      });
      _this.$refs['form2'].validate((valid) => {
        if (valid) {
          if(_this.form1Validate) _this.$emit("changeStep","1",$.extend({},_this.form1,_this.form2))
        } else {
          console.log('error submit!!')
          return false
        }
      });
    },
    resetForm() {
      let _this=this
      _this.$refs['form1'].resetFields()
      _this.$refs['form2'].resetFields()
    },
    checkChange(val){
      console.log(val)
    }
  },
  mounted(){ 
    
  }
}
</script>
