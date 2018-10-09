<template>
    <div class="row">
        <div class="reg-box">
            <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                <el-form-item label="用户名" prop="name">
                    <el-input type="text" v-model="ruleForm2.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pass">
                    <el-input type="password" v-model="ruleForm2.pass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                    <el-input type="password" v-model="ruleForm2.checkPass" autocomplete="off"></el-input>
                </el-form-item>
                <!--<el-form-item label="手机" prop="phone">
                    <el-input v-model.number="ruleForm2.phone"></el-input>
                </el-form-item>-->
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm2')">确定</el-button>
                    <el-button @click="resetForm('ruleForm2')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'InReg',
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
                name: '',
                pass: '',
                checkPass: ''
                // phone: ''
            },
            rules2: {
                name: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 2, max: 25, message: '长度在 2 到 25 个字符', trigger: 'blur' }
                ],
                pass: [
                    { required: true, validator: validatePass, trigger: 'blur' }
                ],
                checkPass: [
                    { required: true, validator: validatePass2, trigger: 'blur' }
                ]
                /* phone: [
                    { required: false, trigger: 'blur' }
                ] */
            }
        };
    },
    methods: {
        submitForm (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    console.log(this.ruleForm2);
                    this.saveToDb(this.ruleForm2);
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm (formName) {
            this.$refs[formName].resetFields();
        },
        saveToDb: function (regInfo) {
            const rippletest = 'https://faucet.altnet.rippletest.net/accounts';
            this.$http.post(rippletest).then(response => {
                let account = response.body.account;
                regInfo.address = account.address;
                regInfo.secret = account.secret;
                this.$http.post('/api/reg', regInfo).then(response => {
                    let userInfo = response.body;
                    if (userInfo.reslut === true) {
                        this.info = userInfo.data;
                        localStorage.setItem('user', JSON.stringify(userInfo.data));
                        this.complete = true;
                        this.$message({
                            message: '恭喜，操作成功',
                            type: 'success'
                        });
                        this.$router.push({path: '/general'});
                    } else {
                        this.info = {};
                        this.$message.error('操作失败');
                        // this.$store.commit('notLogin');
                    }
                }, response => {
                    // error callback
                });
            }, response => {
                // error callback
            });
        }
    }
};
</script>

<style scoped>
.reg-box{
    padding: 1em 2em 0 2em;
}
.info-box{
    margin-top: 1em;
    color: #1F1F1E;
}
</style>
