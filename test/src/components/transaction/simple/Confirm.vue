<template>
  <div class="confirm">
      <el-form :label-position="labelPosition" label-width="80px" v-if="submit === false">
          <el-form-item label="你正在进行货币兑换">
              <el-row class="bg">
                  <el-col :span="24" class="tit">{{payment.show.selfVal}} {{payment.show.selfCurrency}}</el-col>
              </el-row>
          </el-form-item>
          <el-form-item label="兑换成">
              <el-row class="bg">
                  <el-col :span="24" class="tit">{{payment.show.destVal}}&nbsp;&nbsp;{{payment.show.destCurrency}}</el-col>
              </el-row>
          </el-form-item>
          <el-form-item label="您最多需要支付">
              <el-row class="bg">
                  <el-col :span="24" class="tit">{{payment.show.selfVal}}&nbsp;&nbsp;{{payment.show.selfCurrency}}</el-col>
              </el-row>
          </el-form-item>
          <el-form-item label="确定吗？">
              <el-row :gutter="20">
                  <el-col :span="6">
                      <el-button class="reset-btn" v-on:click="sendPayment(payment.original)">确定</el-button>
                  </el-col>
                  <el-col :span="6">
                      <el-button type="text" v-on:click="cancel">取消</el-button>
                  </el-col>
              </el-row>
          </el-form-item>
      </el-form>
      <div class="box" v-else>
          <div class="show-res">
              <Hint :text="text" :typeClass="style" v-if="text"></Hint>
          </div>
          <div class="show-body">
              <el-row>
                  <el-col>
                      <el-button type="text" v-on:click="resetCurr">进行另一个兑换</el-button>
                  </el-col>
              </el-row>
              <el-row>
                  <el-col>
                      <router-link to="/general/balance">
                          <el-button type="text">返回到余额界面</el-button>
                      </router-link>
                  </el-col>
              </el-row>
          </div>
      </div>

  </div>
</template>

<script>
export default {
    name: 'Confirm',
    props: {
        payment: {
            require: true
        }
    },
    inject: ['reload'],
    data () {
        return {
            labelPosition: 'top',
            type: {
                CNY: '你正在把 XRP 兑换成 CNY',
                XRP: '你正在把 CNY 兑换成 XRP'
            },
            submit: false,
            text: '',
            style: ''
        };
    },
    computed: {
        currency: function () {
            let flag = this.payment.show.destCurrency;
            return this.type[flag];
        }
    },
    methods: {
        sendPayment: function (data) {
            if (data.hasOwnProperty('paths') && data.paths.length <= 2) {
                delete data.paths;
            }

            let that = this;
            let ripple = this.getRipple;
            let address = this.$store.state.account.address;
            let secret = this.$store.state.account.secret;
            this.submit = true;
            ripple.payment(address, secret, data, function (data) {
                if (data.resultCode === 'tesSUCCESS') {
                    that.text = '交易成功';
                    that.style = 'success';
                } else {
                    that.text = '交易失败';
                    that.style = 'danger';
                }
                console.log(data);
            }, function (status) {
                that.text = Object.values(status)[0];
                that.style = Object.keys(status)[0];
            });
        },
        cancel: function () {
            let reloadData = {
                num: this.payment.show.destVal,
                trustline: this.payment.show.destCurrency === 'XRP' ? 'XRP' : this.payment.original.destination.amount.currency
            };
            this.$emit('cancel', reloadData);
        },
        resetCurr: function () {
            this.reload();
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bg{
    background: #F3F3F3 !important;
    padding-left: 2em;
    padding-right: 2em;
}
.tit{
    font-size: 2em !important;
}
.gray{
    color: #888888 !important;
}
.reset-btn{
    width: 100% !important;
    background: #346AA9 !important;
    color: #fff !important;
    letter-spacing: 0.1em;
}
.reset-btn:hover{
    background: #22456E !important;
}
</style>
