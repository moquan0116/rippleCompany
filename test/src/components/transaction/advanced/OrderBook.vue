<template>
  <div class="order-book">
      <el-row>
          <el-col :span="12">
              <span class="m-ord-tit">OrderBook</span>
              <el-button type="text">隐藏</el-button>
          </el-col>
      </el-row>
      <el-row>
          <el-col :span="12" style="border-right: 2px solid #ccc;border-left: 1px solid #E6E6E6;">
              <el-row class="box-title">买单出价</el-row>
              <el-row>
                  <div class="buy">
                      <el-table
                              :data="buyData"
                              :header-row-style="{'height':'100px'}"
                              :row-style="setRowStyle"
                              style="width: 100%">
                          <el-table-column
                                  prop="address"
                                  label="挂单人"
                                  width="100">
                              <template slot-scope="scope">
                                  <el-popover trigger="hover" placement="top">
                                      <p>{{ scope.row.originAddress }}</p>
                                      <div slot="reference" class="name-wrapper">
                                          <el-tag size="medium">{{ scope.row.address }}</el-tag>
                                      </div>
                                  </el-popover>
                              </template>
                          </el-table-column>
                          <el-table-column
                                  :render-header="tabHeader"
                                  prop="totalPrice"
                                  label="总和"
                                  width="170">
                          </el-table-column>
                          <el-table-column
                                  :render-header="tabHeader"
                                  prop="quantity"
                                  label="挂单量"
                                  width="150">
                          </el-table-column>
                          <el-table-column
                                  :render-header="tabHeader"
                                  prop="price"
                                  label="买入价"
                                  width="150">
                          </el-table-column>
                      </el-table>
                  </div>
              </el-row>
          </el-col>
          <el-col :span="12" style="border-left: 2px solid #ccc;border-right: 1px solid #E6E6E6;">
              <el-row class="box-title">卖单要价</el-row>
              <el-row>
                  <div class="sell">
                      <el-table
                              :data="sellData"
                              :header-row-style="{'height':'100px'}"
                              style="width: 100%">
                          <el-table-column
                                  prop="price"
                                  :render-header="tabHeader"
                                  label="卖出价"
                                  width="150">
                          </el-table-column>
                          <el-table-column
                                  prop="quantity"
                                  :render-header="tabHeader"
                                  label="挂单量"
                                  width="150">
                          </el-table-column>
                          <el-table-column
                                  prop="totalPrice"
                                  :render-header="tabHeader"
                                  label="总和"
                                  width="170">
                          </el-table-column>
                          <el-table-column
                                  prop="address"
                                  label="挂单人"
                                  width="100">
                              <template slot-scope="scope">
                                  <el-popover trigger="hover" placement="top">
                                      <p>{{ scope.row.originAddress }}</p>
                                      <div slot="reference" class="name-wrapper">
                                          <el-tag size="medium">{{ scope.row.address }}</el-tag>
                                      </div>
                                  </el-popover>
                              </template>
                          </el-table-column>
                      </el-table>
                  </div>
              </el-row>
          </el-col>
      </el-row>
  </div>
</template>

<script>
export default {
    name: 'OrderBook',
    props: ['orderBook', 'bookReset', 'bcc'],
    data () {
        return {
            buyData: [],
            sellData: [],
            orders: this.orderBook,
            columnData: ['xrp'],
            testData: 'XRP'
        };
    },
    methods: {
        tabHeader (h, {column, $index}) {
            let q = '';
            if (column.property === 'quantity' || column.property === 'totalPrice') {
                q = this.bcc.base;
            }
            if (column.property === 'price') {
                q = this.bcc.counCurr;
            }
            return [
                h('p', {}, column.label),
                h('p', {}, q)
            ];
        },
        setBids: function (params) {
            const that = this;
            params.forEach(function (item, key) {
                let totalPrice = parseFloat(item.specification.totalPrice.value);
                let quantity = parseFloat(item.specification.quantity.value);
                let data = {
                    originAddress: item.properties.maker,
                    address: that.shortAddress(item.properties.maker),
                    totalPrice: totalPrice.toFixed(2),
                    quantity: quantity.toFixed(),
                    price: (totalPrice / quantity).toFixed(5),
                    extend: {highlight: false}
                };
                if (item.properties.maker === that.$store.state.account.address) {
                    data.extend.highlight = true;
                }
                that.buyData.push(data);
            });
        },
        setAsks: function (params) {
            const that = this;
            params.forEach(function (item, key) {
                let totalPrice = parseFloat(item.specification.totalPrice.value);
                let quantity = parseFloat(item.specification.quantity.value);
                let data = {
                    originAddress: item.properties.maker,
                    address: that.shortAddress(item.properties.maker),
                    totalPrice: totalPrice.toFixed(2),
                    quantity: quantity.toFixed(),
                    price: (totalPrice / quantity).toFixed(5),
                    extend: {highlight: false}
                };
                if (item.properties.maker === that.$store.state.account.address) {
                    data.extend.highlight = true;
                }
                that.sellData.push(data);
            });
        },
        shortAddress: function (address) {
            if (!address) return '';
            let len = address.length;
            return address.substr(0, 5) + '...' + address.substring(len - 3, len);
        },
        setRowStyle: function (row, index) {
            if (row.row.extend.highlight === true) {
                return 'color: #356834;font-weight: 700;';
            }
        }
    },
    watch: {
        orderBook: function (newQuestion, oldQuestion) {
            if (this.bookReset) {
                this.buyData = [];
                this.sellData = [];
            }
            this.setBids(newQuestion.bids);
            this.setAsks(newQuestion.asks);
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.box-title{
    font-weight: 500;
    text-align: center;
    background: #F2F2F2;
    padding: 15px 0;
    border-top: 1px solid #E6E6E6;
}
</style>
