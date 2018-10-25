<template>
    <div class="login-form">
        <el-form label-width="100px" class="demo-ruleForm">
            <el-form-item label="重要信息:">
                下方的秘钥让你可以在丢失密码的小概率事件中拿回你的钱。在这种情况下，你的联系人信息会丢失，但任何拥有该秘钥的人可以取出你的钱。所以请将它保管在安全的地方。在这里了解更多关于秘钥和钱包安全的信息安全
            </el-form-item>
            <el-form-item label="密码">
                {{ruleForm2.pass}}
            </el-form-item>
            <el-form-item label="ripple地址">
                {{account.address}}
            </el-form-item>
            <el-form-item label="秘钥">
                {{account.secret}}
            </el-form-item>
            <el-form-item label="">
                <el-button type="primary">显示秘钥</el-button>
            </el-form-item>
            <el-form-item label="注意">
                你是否已保存好秘钥？
            </el-form-item>
            <el-form-item label="">
                <el-button type="primary">我已保存好了</el-button>
            </el-form-item>
        </el-form>
    </div>

</template>

<script>
export default {
    name: 'AddressInfo',
    props: ['info'],
    data () {
        return {
            info: this.info
        };
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
