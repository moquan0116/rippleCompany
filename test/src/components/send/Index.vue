<template>
  <div class="send-index">
      <el-form :label-position="labelPosition" ref="formLabelAlign" label-width="80px" :model="formLabelAlign">
          <el-row>
              <el-col :span="12">
                  <el-form-item label="接收方" :error="error">
                      <el-input placeholder="Enter a Ripple Address or contract" v-model="formLabelAlign.address"></el-input>
                  </el-form-item>
              </el-col>
          </el-row>
          <show-type v-if="off === false" :address="address" :addressError="error" v-on:typeData="typeFormData"></show-type>
          <el-row>
              <el-col :span="12"></el-col>
          </el-row>
          <el-row>
              <el-col :span="6">
                  <el-button class="width-full bg_on" v-on:click="sendPayment" v-if="btn === true">发送XRP</el-button>
                  <el-button class="width-full bg_off" v-else disabled="">发送XRP</el-button>
              </el-col>
          </el-row>
      </el-form>
  </div>
</template>

<script>
import WAValidator from 'wallet-address-validator';
import ShowType from './SelectType/ShowType';
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
            path: '',
            payment: ''
        };
    },
    created: function () {
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
        typeFormData: function (data) {
            let num = data.num;
            let trustline = data.trustline;
            let temp = '';
            this.btn = true;

            if (num === '' || trustline === '') {
                this.btn = false;
                return false;
            }

            if (trustline.indexOf('-')) {
                temp = trustline.split('-').map(function (item) {
                    return item.replace(/^\s+|\s+$/gm, '');
                });
            }

            if (temp.length <= 1) { // 如果没有信任网关
                return false;
            }

            this.getPath(this.$store.state.account.address, temp[0], temp[1], num);
        },
        getPath: function (address, currency, counterparty, num) {
            const pathfind = {
                source: {
                    address: address
                },
                destination: {
                    address: this.formLabelAlign.address,
                    amount: {
                        currency: currency,
                        counterparty: counterparty,
                        value: num
                    }
                }
            };
            const ripple = this.getRippleApi;
            const that = this;
            ripple.connect().then(() => {
                return ripple.getPaths(pathfind);
            }).then((paths) => {
                pathfind.source.maxAmount = {
                    value: num,
                    currency: currency
                };
                pathfind.paths = paths.length >= 1 ? paths[0].paths : paths.paths;
                that.payment = pathfind;
            }).catch(console.log);
        },
        sendPayment: function () {
            /* let payment = {
                source: {
                    address: this.$store.state.account.address,
                    maxAmount: {
                        value: this.num,
                        currency: this.currency
                    }
                },
                destination: {
                    address: this.toAddress,
                    amount: {
                        value: this.amount,
                        currency: this.currency
                    }
                },
                paths: this.paths
            }; */
            this.$message.success('ehllo');
            console.log(this.payment);
            /* 测试一下支付 */
            let ripple = this.getRipple;
            ripple.payment(this.$store.state.account.address, this.$store.state.account.secret, this.payment);
        }
    },
    components: {
        ShowType
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
