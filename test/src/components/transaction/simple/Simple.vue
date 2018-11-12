<template>
    <div class="basic">
        <el-form :model="formData" status-icon label-position="top" ref="formData" label-width="100px" class="demo-ruleForm">
            <el-row :gutter="20">
                <el-col :span="4">
                    <el-form-item label="接收" prop="input">
                        <el-input type="text" v-model="formData.input" placeholder="请输入金额" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8" class="trust">
                    <el-form-item prop="selected">
                        <el-select v-model="formData.selected" placeholder="请选择">
                            <el-option
                                    v-for="item in trustlines"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>

    </div>
</template>

<script>
export default {
    name: 'Simple',
    props: ['propData'],
    data () {
        return {
            trustlines: [
                {
                    value: 'XRP',
                    label: 'XRP - Ripples'
                },
                {
                    value: 'CNY',
                    label: 'Chinese - Yuan'
                }
            ],
            formData: {
                input: '',
                selected: 'XRP'
            },
            iptError: false
        };
    },
    created: function () {
        if (this.propData.input && this.propData.selected) {
            this.formData = this.propData;
        }
    },
    watch: {
        formData: {
            handler: function (newVal, oldVal) {
                if (!this.$utils.checkNum(newVal.input)) {
                    this.iptError = '请输入正确的数字';
                    this.$emit('formData', '-1');
                    return false;
                }
                this.iptError = false;
                this.$emit('formData', newVal);
            },
            deep: true
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.basic{
    margin: 2em auto;
}

</style>
