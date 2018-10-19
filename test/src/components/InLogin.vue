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
                            <el-button type="primary" @click="submitForm('ruleForm2')">打开账户</el-button>
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
                this.$GLOBAL.ipc.send('decrypt', {path: this.path, pwd: this.ruleForm2.password});
                this.$GLOBAL.ipc.on('decrypt-ok', (event, res) => {
                    if (res) {
                        this.$store.commit('login', JSON.parse(res));
                        callback();
                    } else {
                        callback(new Error('密码错误'));
                    }
                });
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
            errorMsg: ''
        };
    },
    methods: {
        submitForm (formName) {
            if (!this.path) {
                this.$message.error('请选择账户文件');
                return false;
            } else {
                this.$refs[formName].validate((valid) => {
                    if (valid && this.$store.state.login === true) {
                        const self = this;
                        const api = this.getRippleApi();
                        api.connect().then(function () {
                            api.getAccountInfo(self.$store.state.account.address);
                            self.$store.commit('activated');
                        }).catch(function (error) {
                            if (error instanceof api.errors.RippledError) {
                                console.log('没有找到用户');
                                self.$store.commit('notActivated');
                            }
                            return error;
                        });
                        this.$router.push('/general/balance');
                    } else {
                        console.log('error submit');
                        return false;
                    }
                });
            }
        },
        showDialog: function () {
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
