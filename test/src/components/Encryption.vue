<template>
    <div class="row">
        <div class="login-form" v-if="status === false">
            <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                <el-form-item label="加密文件:">{{path}}</el-form-item>
                <el-form-item label="密码" prop="pass">
                    <el-input type="password" v-model="ruleForm2.pass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                    <el-input type="password" v-model="ruleForm2.checkPass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm2')">加密文件</el-button>
                    <el-button @click="resetForm('ruleForm2')">取消并删除文件</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="login-form login-dialog" v-else>
            <el-form label-width="100px" class="demo-ruleForm">
                <el-form-item label="重要信息:">
                    <span style="text-indent: 2em">
                    下方的秘钥让你可以在丢失密码的小概率事件中拿回你的钱。在这种情况下，你的联系人信息会丢失，但任何拥有该秘钥的人可以取出你的钱。所以请将它保管在安全的地方。在这里了解更多关于秘钥和钱包安全的信息安全
                    </span>
                </el-form-item>
                <el-form-item label="密码">
                    {{formatPass}}<a @click="showPass" class="a_pass">{{btnPassText}}</a>
                </el-form-item>
                <el-form-item label="ripple地址">
                    {{account.address}}
                </el-form-item>
                <el-form-item label="秘钥">
                    {{formatSecret}}
                </el-form-item>
                <el-form-item label="">
                    <el-button type="primary" @click="showFormat">{{btnSecretText}}</el-button>
                </el-form-item>
                <el-form-item label="注意">
                    你是否已保存好秘钥？
                </el-form-item>
                <el-form-item label="">
                    <el-button @click="saveOk" type="primary">我已保存好了</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>

</template>

<script>
export default {
    name: 'Encryption',
    props: ['path'],
    data () {
        let validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (this.ruleForm2.checkPass !== '') {
                    this.$refs.ruleForm2.validateField('checkPass');
                }
                callback();
            }
        };
        let validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.ruleForm2.pass) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            ruleForm2: {
                pass: '',
                checkPass: ''
            },
            rules2: {
                pass: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                checkPass: [
                    { validator: validatePass2, trigger: 'blur' }
                ]
            },
            status: false,
            formatPass: '',
            formatSecret: '',
            secretShow: false,
            passShow: false,
            btnSecretText: '显示秘钥',
            btnPassText: '显示'
        };
    },
    methods: {
        submitForm (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.GenerateAccount();
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm (formName) {
            this.$refs[formName].resetFields();
        },
        GenerateAccount: function () {
            const rippletest = 'https://faucet.altnet.rippletest.net/accounts';
            this.$http.post(rippletest).then(response => {
                this.$GLOBAL.ipc.send('encrypt-ripple', {
                    file: this.$props.path,
                    pwd: this.ruleForm2.pass,
                    account: JSON.stringify(response.body.account)
                });
                this.account = response.body.account;
                this.formatPass = this.formatOut(this.ruleForm2.pass);
                this.formatSecret = this.formatOut(this.account.secret, 1);
                this.status = true;
            }, response => {
                // error callback
            });
        },
        saveOk: function () {
            console.log(this.account);
            sessionStorage.setItem('user', JSON.stringify(this.account));
            this.$router.push('/general/balance');
        },
        formatOut: function (data, start) {
            start = start || 0;
            let n = '';
            let f = '';
            if (start !== undefined && start > 0) {
                if (start > data.length) {
                    return data;
                }
                f = data.substr(0, start);
            }
            for (let i = 0; i < (data.length - start); i++) {
                n += '*';
            }
            return (f += n);
        },
        showFormat: function () {
            if (this.secretShow) {
                this.btnSecretText = '显示秘钥';
                this.formatSecret = this.formatOut(this.account.secret, 1);
            } else {
                this.btnSecretText = '隐藏秘钥';
                this.formatSecret = this.account.secret;
            }
            this.secretShow = !this.secretShow;
        },
        showPass: function () {
            if (this.passShow) {
                this.btnPassText = '显示';
                this.formatPass = this.formatOut(this.ruleForm2.pass);
            } else {
                this.btnPassText = '隐藏';
                this.formatPass = this.ruleForm2.pass;
            }
            this.passShow = !this.passShow;
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login-form{
    padding: 1em 2em 0 0;
}
.login-dialog .align-right{
    text-align: right;
}
.a_pass:hover{
    cursor: pointer;
}
</style>
