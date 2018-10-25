<template>
    <div class="row">
        <div class="reg-box">
            <el-row>
                <el-button type="primary" v-if="complete === false" @click="create">生成账号</el-button>
                <div class="add-box" v-show="complete">
                    <div>
                        <h2>重要信息：</h2>
                        <p>
                            下方的秘钥让你可以在丢失密码的小概率事件中拿回你的钱。在这种情况下，你的联系人信息会丢失，但任何拥有该秘钥的人可以取出你的钱。所以请将它保管在安全的地方。在这里了解更多关于秘钥和钱包安全的信息安全
                        </p>
                    </div>
                    <div class="info-box">
                        <span>Ripple 地址</span>
                        <div>{{info.address}}</div>
                    </div>
                    <div class="info-box">
                        <span>密钥：</span>
                        <div>{{info.secret}}</div>
                    </div>
                </div>
                <div style="margin-top: 0.5em" v-if="complete === true">
                    <el-button type="primary" @click="login">我已经保存好了</el-button>
                </div>
            </el-row>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CreateAddress',
    data () {
        return {
            info: {},
            complete: false
        };
    },
    methods: {
        create: function () {
            const self = this;
            const rippletest = 'https://faucet.altnet.rippletest.net/accounts';
            this.$http.post(rippletest).then(response => {
                self.saveToDb(response.body);
            }, response => {
                // error callback
            });
        },
        saveToDb: function (account) {
            this.$http.post('/api/reg', account.account).then(response => {
                let userInfo = response.body;
                console.log(response.body.reslut);
                if (userInfo.reslut === true) {
                    this.info = userInfo.data;
                    this.complete = true;
                    this.$message({
                        message: '恭喜，操作成功',
                        type: 'success'
                    });
                } else {
                    this.info = {};
                    this.$message.error('操作失败');
                    // this.$store.commit('notLogin');
                }
            }, response => {
                // error callback
            });
        },
        login: function () {
            this.$router.push({path: '/general'});
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
