<template>
    <div class="row">
        <div class="login-form">
            <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                <el-row :gutter="20">
                    <el-col :span="24" >
                        <el-form-item label="操作">
                            <el-button @click="showDialog">选择账户文件</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="24" >
                        <el-form-item label="文件路径">
                            {{path}}
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="24" >
                        <el-form-item label="密码" prop="password">
                            <el-input type="password" v-model="ruleForm2.password" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="24" >
                        <el-form-item>
                            <el-button type="primary" :loading="loading" @click="submitForm('ruleForm2')">打开账户</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
    </div>

</template>

<script>
export default {
    name: 'InLogin',
    data () {
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                console.log('valiPass');
                this.getDecryptContent(callback);
            }
        };
        return {
            ruleForm2: {
                password: ''
            },
            rules2: {
                password: [
                    { validator: validatePass, trigger: 'blur' }
                ]
            },
            path: '',
            errorMsg: '',
            loading: false
        };
    },
    computed: {
        login: function () {
            return this.$store.state.login;
        }
    },
    watch: {
        login: function (newVal, oldVal) {
            if (newVal === true) {
                this.getTransactions(this.$store.state.account.address);
                this.$router.push('/general/balance');
            }
        }
    },
    methods: {
        submitForm (formName) {
            if (!this.path) {
                this.$message.error('请选择账户文件');
                return false;
            } else {
                this.loading = true;
                this.$refs[formName].validate((valid) => {
                    if (!valid) {
                        this.$message.error('login error');
                        console.log('error submit');
                        return false;
                    }
                });
            }
        },
        getAccountInfo: function (params) { // 获取用户信息
            const address = params.address || this.$store.state.account.address;
            const self = this;
            const ripple = this.getRippleApi;
            ripple.connect().then(() => {
                return ripple.getAccountInfo(address);
            }).then(function (info) {
                console.log('info-ok');
                params.extend = info;
                self.$store.commit('login', params);
            }).catch(function (error) {
                if (error instanceof ripple.errors.RippledError) {
                    console.log('没有找到用户');
                    self.$store.commit('notActivated');
                }
                console.log(error);
                return error;
            });
        },
        getDecryptContent: function (callback) { // 解密账户
            this.$GLOBAL.ipc.send('decrypt', {
                path: this.path,
                pwd: this.ruleForm2.password
            });
            this.$GLOBAL.ipc.on('decrypt-ok', (event, res) => {
                console.log('decrypt-ok');
                if (res) {
                    this.getAccountInfo(JSON.parse(res));
                    callback();
                } else {
                    callback(new Error('密码错误'));
                }
            });
        },
        showDialog: function () { // 显示选择文件对话框
            this.$GLOBAL.ipc.send('open-dialog');
            this.$GLOBAL.ipc.on('in-open', (event, paths) => {
                if (paths.length) {
                    this.path = paths[0];
                } else {
                    this.$message.error('请选择账户文件');
                }
            });
        },
        resetForm (formName) {
            this.$refs[formName].resetFields();
        },
        getTransactions (address) { // 获取交易数据
            let that = this;
            let ripple = this.getRipple;
            let options = {limit: 200};
            ripple.getTrader(address, options, function (data) {
                that.$store.commit('setTransactions', data);
            }, function (status) {
                console.log(status);
            });
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login-form{
    padding: 1em 2em 0 0;
}
</style>
