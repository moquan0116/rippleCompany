<template>
    <div id="login">
        <div class="container-fluid top-bg">
            <div class="top-box">
                <span class="top-title">欢迎使用汇金智能|ripple钱包</span>
            </div>
        </div>
        <div class="container-fluid login-main">
            <div class="container">
                <div class="row" style="margin-top: 1.5em">
                    <div class="alert alert-info" role="alert">
                        <p>
                            你不能使用在Ripple Trade或者网页版的Ripple客户端中注册的用户名和密码登录下载的客户端。你只可以用秘钥来登录已有的Ripple账户。因为下载的客户端把你的登录信息存在了你的电脑里，所以你的账户可以像你的个人电脑一样安全。
                        </p>
                    </div>
                </div>
                <div class="row" style="margin-top: 8em">
                    <div class="login-form">
                        <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                            <el-row :gutter="20">
                                <el-col :span="24" >
                                    <el-form-item label="钱包地址" prop="pass">
                                        <el-input type="password" v-model="ruleForm2.pass" autocomplete="off"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row :gutter="20">
                                <el-col :span="24" >
                                    <el-form-item label="密码" prop="checkPass">
                                        <el-input type="password" v-model="ruleForm2.checkPass" autocomplete="off"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row :gutter="20">
                                <el-col :span="24" >
                                    <el-form-item label="..." prop="age">
                                        <el-input v-model.number="ruleForm2.age"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row :gutter="20">
                                <el-col :span="24" >
                                    <el-form-item>
                                        <el-button type="primary" @click="submitForm('ruleForm2')">确定</el-button>
                                        <el-button @click="resetForm('ruleForm2')">重置</el-button>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Login',
    data () {
        var checkAge = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('年龄不能为空'));
            }
            setTimeout(() => {
                if (!Number.isInteger(value)) {
                    callback(new Error('请输入数字值'));
                } else {
                    if (value < 18) {
                        callback(new Error('必须年满18岁'));
                    } else {
                        callback();
                    }
                }
            }, 1000);
        };
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (this.ruleForm2.checkPass !== '') {
                    this.$refs.ruleForm2.validateField('checkPass');
                }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
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
                checkPass: '',
                age: ''
            },
            rules2: {
                pass: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                checkPass: [
                    { validator: validatePass2, trigger: 'blur' }
                ],
                age: [
                    { validator: checkAge, trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        submitForm (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
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
.top-bg{
    height: 10rem;
    background: #346AA9;
}
.top-box{
    margin: 1.5% auto auto auto;
    text-align: center;
}
.top-title{
    color: #fff;
    font-size: 3em;
    letter-spacing: 0.1em;
}
.login-main{
    min-height: 50em;
}
.alert-info p{
    text-indent: 2em;
}
.login-form{
    width: 40%;
    padding: 2em 2em 2em 0;
    margin: auto;
    border: 1px solid #ccc;
}
</style>
