<template>
    <div class="row">
        <div class="login-form">
            <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                <el-row :gutter="20">
                    <el-col :span="24" >
                        <el-form-item label="钱包地址" prop="address">
                            <el-input type="text" v-model="ruleForm2.address" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="24" >
                        <el-form-item label="秘钥" prop="secret">
                            <el-input type="password" v-model="ruleForm2.secret" autocomplete="off"></el-input>
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

</template>

<script>
export default {
    name: 'InLogin',
    data () {
        var validateAddress = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入钱包地址'));
            } else {
                callback();
            }
        };
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入钱包秘钥'));
            } else {
                callback();
            }
        };
        return {
            ruleForm2: {
                address: '',
                secret: ''
            },
            rules2: {
                address: [
                    { validator: validateAddress, trigger: 'blur' }
                ],
                secret: [
                    { validator: validatePass, trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        submitForm (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$http.post('/api/login', this.ruleForm2).then(response => {
                        let userInfo = JSON.stringify(response.body);
                        console.log(userInfo);
                        if (userInfo !== 'null') {
                            localStorage.setItem('user', userInfo);
                            // this.$store.commit('login');
                            this.$router.push({path: '/general'});
                        } else {
                            this.$message.error('用户不存在');
                            // this.$store.commit('notLogin');
                        }
                    }, response => {
                        // error callback
                    });
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
.login-form{
    padding: 1em 2em 0 0;
}
</style>
