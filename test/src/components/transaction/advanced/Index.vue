<template>
  <div class="advanced">
      <!--测试显示状态-->
      <div class="show-res">
          <Hint :text="text" :typeClass="style" v-if="text"></Hint>
      </div>
      <!--选择网关-->
      <div class="card-box card-top">
          <el-row :gutter="20" class="top-one-row">
              <el-col :span="15">
                  <div class="grid-content">
                      <el-select v-model="value" placeholder="请选择" class="gateway-select">
                          <el-option
                                  v-for="item in trustlines"
                                  :key="item.value"
                                  :label="item.label"
                                  :value="item.value">
                          </el-option>
                      </el-select>
                  </div>
              </el-col>
              <el-col :span="3" class="text-center">
                  <div class="grid-content">
                      <el-button type="text" v-on:click="flip" class="hover pad-lg">flip</el-button>
                  </div>
              </el-col>
              <el-col :span="3" class="text-center">
                  <div class="grid-content">
                      <el-button type="text" class="hover pad-lg">add pair</el-button>
                  </div>
              </el-col>
              <el-col :span="3" class="text-center">
                  <div class="grid-content">
                      <el-button type="text" class="hover pad-lg">edit pairs</el-button>
                  </div>
              </el-col>
          </el-row>
          <el-row :gutter="20" class="top-two-row">
              <el-col :span="6">
                  <div class="grid-content">
                      买一价 = 62.60000
                  </div>
              </el-col>
              <el-col :span="6">
                  <div class="grid-content">
                      买一价 = 62.60000
                  </div>
              </el-col>
              <el-col :span="6">
                  <div class="grid-content">
                      买一价 = 62.60000
                  </div>
              </el-col>
              <el-col :span="6">
                  <div class="grid-content">
                      买一价 = 62.60000
                  </div>
              </el-col>
          </el-row>
      </div>
      <el-row>
          <el-button v-on:click="test">试一下子</el-button>
      </el-row>
      <!--买卖-->
      <el-row class="mar-top" :gutter="30">
          <el-col :span="12">
              <trand-box :bcc="bcc" direction="buy"></trand-box>
          </el-col>
          <el-col :span="12">
              <trand-box :bcc="bcc" direction="sell"></trand-box>
          </el-col>
      </el-row>
      <!--我的订单-->
      <el-row>
          <my-order></my-order>
      </el-row>
      <!--订单列表-->
      <el-row class="mar-top">
          <order-book :order-book="orderbook" :bookReset="bookReset" :bcc="bcc"></order-book>
      </el-row>
  </div>
</template>

<script>
import OrderBook from './OrderBook';
import TrandBox from './TrandBox';
import MyOrder from './MyOrder';
export default {
    name: 'Advanced',
    data () {
        return {
            value: 'XRP/CNY.' + this.$GLOBAL.QKGATEWAY,
            trustlines: [
                {
                    lable: 'XRP/CNY.' + this.$GLOBAL.QKGATEWAY,
                    value: 'XRP/CNY.' + this.$GLOBAL.QKGATEWAY
                }
            ],
            orderbook: [],
            text: '',
            style: '',
            bookReset: true,
            baseCurrency: '', // 基本货币类型
            counterCurrency: '', // 计数货币类型
            counterParty: '' // 网关
        };
    },
    created: function () {
        this.formatSelected(this.value);
        this.getOrderBook();
    },
    computed: {
        bcc () {
            return {
                base: this.baseCurrency,
                counCurr: this.counterCurrency,
                counParty: this.counterParty
            };
        }
    },
    watch: {
        value: function (newVal, oldVal) {
            this.formatSelected(newVal);
            this.getOrderBook();
        }
    },
    methods: {
        flip: function () {
            let selected = this.value;
            let arr = selected.split('/');
            this.value = arr[1] + '/' + arr[0];
        },
        formatSelected: function (selected) {
            let arr = selected.split('/');

            if (arr[0].indexOf('.') !== -1) {
                let temp = arr[0].split('.');
                this.baseCurrency = temp[0];
                this.counterCurrency = arr[1];
                this.counterParty = temp[1];
            }

            if (arr[1].indexOf('.') !== -1) {
                let temp = arr[1].split('.');
                this.baseCurrency = arr[0];
                this.counterCurrency = temp[0];
                this.counterParty = temp[1];
            }
        },
        getOrderBook: function () {
            let orderbook = {
                base: {
                    currency: this.baseCurrency,
                    counterparty: this.counterParty
                },
                counter: {
                    currency: this.counterCurrency,
                    counterparty: this.counterParty
                }
            };

            if (this.baseCurrency === 'XRP') { // 由于当货币类型是XRP 时不需要网关
                delete orderbook.base.counterparty;
            }
            if (this.counterCurrency === 'XRP') {
                delete orderbook.counter.counterparty;
            }

            const address = this.$store.state.account.address;
            const that = this;
            const ripple = this.getRippleApi;
            ripple.connect().then(function () {
                return ripple.getOrderbook(address, orderbook, {limit: 50});
            }).then(function (orders) {
                that.orderbook = orders;
            }).catch(function (error) {
                console.log(error);
            });
        },
        test: function () {
            const order = {
                direction: 'buy',
                quantity: {
                    currency: 'XRP',
                    value: '1'
                },
                totalPrice: {
                    currency: 'CNY',
                    counterparty: this.$GLOBAL.QKGATEWAY,
                    value: '2'
                },
                passive: true,
                fillOrKill: false
            };
            let that = this;
            let ripple = this.getRipple;
            let address = this.$store.state.account.address;
            let secret = this.$store.state.account.secret;
            this.submit = true;
            ripple.submitOrder(address, secret, order, function (data) {
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
        OrderBook,
        TrandBox,
        MyOrder
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .el-row {
        margin-bottom: 20px;
    &:last-child {
         margin-bottom: 0;
     }
    }
    .el-col {
        border-radius: 4px;
    }
    .bg-purple-dark {
        background: #99a9bf;
    }
    .bg-purple {
        background: #d3dce6;
    }
    .bg-purple-light {
        background: #e5e9f2;
    }
    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }
    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }

    .text-center{
        text-align: center;
    }
    .pad-lg{
        padding-left: 15px;
        padding-right: 15px;
    }
    .gateway-select{
        width: 100%;
    }
    .full-box{
        width: 100%;
        height: inherit;
    }
    .hover:hover{
        background: #D9D9D9;
        cursor: pointer;
        color: black;
    }

    .card-top{
        padding:20px 10px 0 10px;
        border: 1px solid #E6E6E6;
        background: #FAFAFA;
    }
    .top-one-row{
        background: #FAFAFA !important;
    }

    .top-two-row{
        background: #F2F2F2 !important;
        margin-bottom: 0 !important;
        line-height: 36px;
    }
    .mar-top{
        margin-top: 2em;
    }
</style>
