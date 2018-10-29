<template>
  <div class="advanced">
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
                      <el-button type="text" class="hover pad-lg">flip</el-button>
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
      <el-row style="margin-top: 2em">
          <order-book :order-book="orderbook"></order-book>
      </el-row>
      <el-row style="margin-top: 2em">
          {{trustlines}}
      </el-row>
  </div>
</template>

<script>
import OrderBook from './OrderBook';
export default {
    name: 'Advanced',
    data () {
        return {
            value: '',
            trustlines: [],
            orderbook: []
        };
    },
    mounted: function () {
        if (this.orderbook.length <= 0) {
            this.getOrderBook();
        }
    },
    created: function () {
        this.getTrustlines();
    },
    methods: {
        getOrderBook: function () {
            const that = this;
            const ripple = this.getRippleApi();
            ripple.connect().then(function () {
                const address = that.$store.state.account.address;
                const orderbook = {
                    base: {
                        currency: 'XRP'
                    },
                    counter: {
                        currency: 'CNY',
                        counterparty: 'rPT74sUcTBTQhkHVD54WGncoqXEAMYbmH7'
                    }
                };
                return ripple.getOrderbook(address, orderbook, {limit: 50});
            }).then(function (orders) {
                that.orderbook = orders;
            }).catch(function (error) {
                console.log(error);
            });
        },
        getTrustlines: function () {
            const ripple = this.getRippleApi();
            const that = this;
            ripple.connect().then(function () {
                ripple.getTrustlines(that.$store.state.account.address).then(function (trustlines) {
                    trustlines.forEach(function (item, key) {
                        let currency = item.specification.currency;
                        let counterparty = item.specification.counterparty;
                        let trust = {
                            value: currency + '.' + counterparty,
                            label: currency + '.' + counterparty
                        };
                        that.trustlines.push(trust);
                    });
                });
            });
        }
    },
    components: {
        OrderBook
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
</style>
