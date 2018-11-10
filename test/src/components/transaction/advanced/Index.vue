<template>
  <div class="advanced">
      <!--测试显示状态-->
      <div class="show-res">
          <Hint :text="text" :typeClass="style" v-if="text"></Hint>
      </div>
      <el-row>
          <el-button v-on:click="test">试一下子</el-button>
      </el-row>

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
                      n/a = n/a
                  </div>
              </el-col>
              <el-col :span="6">
                  <div class="grid-content">
                      n/a = n/a
                  </div>
              </el-col>
              <el-col :span="6">
                  <div class="grid-content">
                      n/a = n/a
                  </div>
              </el-col>
              <el-col :span="6">
                  <div class="grid-content">
                      n/a = n/a
                  </div>
              </el-col>
          </el-row>
      </div>
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
                },
                {
                    lable: 'XRP/CNY.razqQKzJRdB4UxFPWf5NEpEG3WMkmwgcXA',
                    value: 'XRP/CNY.razqQKzJRdB4UxFPWf5NEpEG3WMkmwgcXA'
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
            let baseCurrency = '';// 买入/卖出的货币类型
            let baseCounterParty = '';// 网关(暂时不会出现两个货币交易用两个网关,但只管先这样设计)
            let counterCurrency = '';// 计数(价)货币类型
            let counterCounterParty = '';// 网关

            let arr = selected.split('/'); // arr[0]是要买入/卖出的货币类型, 用arr[1]货币类型买入/换取

            if (arr[0].indexOf('.') !== -1) {
                let temp = arr[0].split('.');
                baseCurrency = temp[0];
                baseCounterParty = this.getCounterParty(temp[1]);
            } else { // 为XRP
                baseCurrency = arr[0];
            }

            if (arr[1].indexOf('.') !== -1) {
                let temp = arr[1].split('.');
                counterCurrency = temp[0];
                counterCounterParty = this.getCounterParty(temp[1]);
            } else { // 为XRP
                counterCurrency = arr[1];
            }

            if (baseCurrency && counterCurrency && (baseCounterParty || counterCounterParty)) {
                this.baseCurrency = baseCurrency;
                this.counterCurrency = counterCurrency;
                this.counterParty = baseCounterParty || counterCounterParty; // 此处暂没考虑两个不一样的网关
            } else {
                // 获取货币类型/网关错误
            }
        },
        getCounterParty: function (nickname) {
            // let gateWayRelation = []; // 先模拟网关有别名，暂时直接返回
            return nickname;
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
                return ripple.getOrderbook(address, orderbook);
            }).then(function (orders) {
                that.orderbook = orders;
            }).catch(function (error) {
                console.log(error);
            });
        },
        test: function () {
            // this.$store.dispatch('updateOrder');
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
