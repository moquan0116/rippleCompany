<template>
  <div class="send-index">
      <Hint :text="text" :typeClass="style" v-if="text"></Hint>
      <!--确认-->
      <confirm :payment="payment" v-if="payment" v-on:cancel="cancel"></confirm>
      <el-form :label-position="labelPosition" ref="formLabelAlign" label-width="80px" :model="formLabelAlign" v-else>
          <el-row>
              <el-col :span="12">
                  <el-form-item label="接收方" :error="error">
                      <el-input placeholder="Enter a Ripple Address or contract" v-model="formLabelAlign.destAddress"></el-input>
                  </el-form-item>
              </el-col>
          </el-row>
          <!--网关-->
          <show-type ref="showType" v-if="off === false" :address="destAddress" :addressError="error" :reset="reset" v-on:typeData="typeData"></show-type>
          <el-row>
              <el-col :span="6" v-if="btnOn">
                  <el-button class="width-full bg_on" v-on:click="sendConfirmForXrp"  v-if="btn === true">发送XRP</el-button>
                  <el-button class="width-full bg_off" v-else disabled="">发送XRP</el-button>
              </el-col>
          </el-row>
          <!--加载...-->
          <send-cny :sendPath="path" v-if="path" v-on:sendConfirm="sendConfirmForPath"></send-cny>
          <loading :status="status"></loading>
      </el-form>
  </div>
</template>

<script>
/*
* 1、地址
* 2、根据地址显示网关（这里只显示乾坤网关）,显示网关组件可选数量和网关返回
* 3、根据网关取路径
* */
import WAValidator from 'wallet-address-validator';
import ShowType from './SelectType/ShowType';
import SendCny from './SelectType/SendCny';
import Loading from './SelectType/Loading';
import Confirm from './SelectType/Confirm';

export default {
    name: 'Index',
    data () {
        return {
            labelPosition: 'top',
            formLabelAlign: {
                destAddress: ''
            },
            btn: false,
            error: '',
            off: true,
            payment: '',
            text: '',
            style: '',
            sendPath: '',
            btnOn: true,
            status: false,
            path: '',
            reset: '',
            xrpData: ''
        };
    },
    computed: {
        destAddress () {
            return this.formLabelAlign.destAddress;
        }
    },
    watch: {
        destAddress: function (newVal, oldVal) {
            if (WAValidator.validate(newVal, 'XRP')) {
                this.error = '';
                this.off = false;
            } else {
                this.path = '';
                this.error = '无效的ripple地址';
            }
        }
    },
    methods: {
        typeData: function (data) { // 返回的是货币类型、数量
            if (!this.$refs.showType.checkNum(data.num, true)) {
                this.path = '';
                return false;
            }
            this.btn = false;
            this.btnOn = false;
            if (data.trustline === 'XRP') {
                this.xrpData = this.whenXRP(data);
                this.btn = true;
                this.btnOn = true;
            }
            this.getPath(data);
        },
        getTrustlines: function (address) { // 取信任网关
            const that = this;
            const ripple = this.getRippleApi;
            ripple.connect().then(function () {
                return ripple.getTrustlines(address);
            }).then(function (trustlines) {
                that.format(trustlines);
            }).catch(function (error) {
                console.log(error);
            });
        },
        format: function (trustlines) {
            let that = this;
            let defaultTrust = this.trustlines[0];
            let trustArr = [];

            if (trustlines.length <= 0) {
                this.trustlines = defaultTrust;
                return false;
            }

            // 只取“乾坤网关”
            trustlines.forEach(function (item, key) {
                if (item.specification.counterparty === that.$GLOBAL.QKGATEWAY) {
                    let temp = {
                        value: that.$GLOBAL.QKGATEWAY,
                        label: 'CNY - Chinese Yuan'
                    };
                    trustArr.push(temp);
                }
            });

            trustArr.unshift(defaultTrust);
            this.trustlines = trustArr;
        },
        whenXRP: function (data) {
            let num = data.num.replace(/^\s+|\s+$/gm, '');
            return {
                original: {
                    source: {
                        address: this.$store.state.account.address,
                        maxAmount: {
                            value: num,
                            currency: 'XRP',
                            counterparty: this.$GLOBAL.QKGATEWAY
                        }
                    },
                    destination: {
                        address: this.formLabelAlign.destAddress,
                        amount: {
                            value: num,
                            currency: 'XRP',
                            counterparty: this.$GLOBAL.QKGATEWAY
                        }
                    }
                }
            };
        },
        getPath: function (data) { // 取path
            this.status = true;
            this.path = '';
            const that = this;
            const pathfind = {
                source: {
                    address: this.$store.state.account.address
                },
                destination: {
                    address: this.formLabelAlign.destAddress,
                    amount: {
                        currency: data.trustline === 'XRP' ? 'XRP' : 'CNY',
                        counterparty: this.$GLOBAL.QKGATEWAY,
                        value: data.num.replace(/^\s+|\s+$/gm, '')
                    }
                }
            };
            let goGetPath = this.getRipple.getPath(pathfind, function () {});
            goGetPath.then((path) => {
                that.path = path;
                that.status = false;
            }).catch((error) => {
                if (error instanceof that.getRippleApi.errors.NotFoundError) {
                    that.path = '';
                    that.status = false;
                }
            });
        },
        sendConfirmForXrp: function () {
            this.payment = this.formatSubmit(this.xrpData);
        },
        sendConfirmForPath: function (data) {
            this.payment = this.formatSubmit(data);
        },
        formatSubmit: function (params) {
            this.payment = '';
            let data = params;
            let dest = data.original.destination;
            let source = data.original.source;
            let show = {
                destAddress: dest.address,
                destVal: dest.amount.value,
                destCurrency: dest.amount.currency,
                selfVal: source.maxAmount.value,
                selfCurrency: source.maxAmount.currency
            };
            data.show = show;
            return data;
        },
        cancel: function (data) {
            this.payment = '';
            this.reset = '';
            this.reset = data;
        },
        resetAll: function () {
            this.path = '';
            this.payment = '';
        }
    },
    components: {
        ShowType,
        SendCny,
        Loading,
        Confirm
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
