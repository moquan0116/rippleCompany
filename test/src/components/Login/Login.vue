<template>
    <div id="login">
        <div class="container-fluid top-bg">
            <div class="top-box">
                <span class="top-title">欢迎使用汇金智能|ripple钱包</span>
            </div>
        </div>
        <div class="container-fluid login-main">
            <div class="container">
                <Hint :text="text"></Hint>
                <div class="lr-box">
                    <el-tabs type="border-card" stretch>
                        <el-tab-pane label="打开账户">
                            <in-login></in-login>
                        </el-tab-pane>
                        <el-tab-pane>
                            <span slot="label">创建账户</span>
                            <in-reg></in-reg>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
import InLogin from './InLogin';
import InReg from './InReg';
export default {
    name: 'Login',
    data () {
        return {
            currentTab: 'in-reg',
            tabs: ['in-login', 'in-reg'],
            activeName: 'ses',
            tabPosition: 'top',
            text: '你不能使用在Ripple Trade或者网页版的Ripple客户端中注册的用户名和密码登录下载的客户端。你只可以用秘钥来登录已有的Ripple账户。因为下载的客户端把你的登录信息存在了你的电脑里，所以你的账户可以像你的个人电脑一样安全。'
        };
    },
    methods: {

    },
    computed: {
        currentTabComponent: function () {
            return this.currentTab.toLowerCase();
        }
    },
    components: {
        'in-login': InLogin,
        'in-reg': InReg
        // 'create-address': CreateAddress
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
.alert-info p{
    text-indent: 2em;
}
.lr-box{
    /*width: 45%;*/
    /*min-height: 40em !important;*/
    margin: 1% auto 3% auto;
}
</style>
