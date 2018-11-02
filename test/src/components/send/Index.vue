<template>
  <div class="send-index">
      <Hint :text="text" :typeClass="style" v-if="text"></Hint>
      <el-form :label-position="labelPosition" ref="formLabelAlign" label-width="80px" :model="formLabelAlign">
          <el-row>
              <el-col :span="12">
                  <el-form-item label="接收方" :error="error">
                      <el-input placeholder="Enter a Ripple Address or contract" v-model="formLabelAlign.address"></el-input>
                  </el-form-item>
              </el-col>
          </el-row>
          <show-type v-if="off === false" :address="address" :addressError="error"></show-type>
          <el-row>
              <el-col :span="12"></el-col>
          </el-row>
          <el-row>
              <el-col :span="6">
                  <el-button class="width-full bg_on" v-on:click="sendPayment"  v-if="btn === true">发送XRP</el-button>
                  <el-button class="width-full bg_off" v-else disabled="">发送XRP</el-button>
              </el-col>
          </el-row>
      </el-form>
  </div>
</template>

<script>
import WAValidator from 'wallet-address-validator';
import ShowType from './SelectType/ShowType';
import SendCny from './SelectType/SendCny';
export default {
    name: 'Index',
    data () {
        return {
            labelPosition: 'top',
            formLabelAlign: {
                address: ''
            },
            btn: false,
            error: '',
            off: true,
            payment: '',
            text: '',
            style: '',
            sendPath: ''
        };
    },
    computed: {
        address () {
            return this.formLabelAlign.address;
        }
    },
    watch: {
        address: function (newVal, oldVal) {
            if (WAValidator.validate(newVal, 'XRP')) {
                this.error = '';
                this.off = false;
            } else {
                this.error = '无效的ripple地址';
            }
        }
    },
    methods: {
        sendPayment: function () {
            /* 测试一下支付 */
            let that = this;
            let ripple = this.getRipple;
            let address = this.$store.state.account.address;
            let secret = this.$store.state.account.secret;
            ripple.payment(address, secret, this.payment, function (data) {
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
        }
    },
    components: {
        ShowType,
        SendCny
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.send-index{
    margin-bottom: 2em;
}
.width-full{
    width:100%;
}
.bg_on{
    background: #346AA9 !important;
    color: #fff;
}
.bg_off{
    background: #DEDEDC !important;
    color: #fff;
}
.bg_off:hover{
    color: #fff !important;
}
</style>
