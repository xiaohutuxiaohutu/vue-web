<template>
    <div>
        <!--进度条-->
        <ynet-progress-bar class="mt10" :items="stepText" :itemIndex="stepIndex"></ynet-progress-bar>
        <!--进度条--end-->
        <div class="p20">
        <add1 v-if="stepIndex=='0'" @changeStep="changeStep" :formData="formData"></add1>
        <add2 v-if="stepIndex=='1'" @changeStep="changeStep" :formData="formData"></add2>
        <add3 v-if="stepIndex=='2'" @changeStep="changeStep" :formData="formData"></add3>
        <result v-if="stepIndex=='3'" @changeStep="changeStep" :resultData="formData"></result>
        </div>
    </div>
</template>

<script>
import add1 from './add1'
import add2 from './add2'
import add3 from './add3'
import result from './result'

export default {
    name: 'add',
    components: {
        add1,
        add2,
        add3,
        result
    },
    data() {
        return {
            stepText: ["基本信息", "可操作账户", "菜单权限", "提交结果"],
            stepIndex: 0,
            formData: {}
        }
    },
    methods: {
        changeStep(index, formData) {
            let _this = this
            if (Number(index) == 99) {
                _this.$emit("changeStep","0")
            } else {
                _this.stepIndex = Number(index)
                if (formData) _this.formData = formData
                _this.$tools.scrollTop()
            }
        }
    },
    mounted() {

    }
}
</script>
