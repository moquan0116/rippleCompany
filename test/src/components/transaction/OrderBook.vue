<template>
  <div class="order-book">
      <el-row>
          <el-col :span="8">
              <div class="grid-content">
                  <h2>OrderBook</h2>
              </div>
          </el-col>
          <el-col :span="8">
              <div class="grid-content">
                  <el-button type="text" class="hover pad-lg">隐藏</el-button>
              </div>
          </el-col>
      </el-row>
      <el-row>
          <el-col :span="12" style="border-right: 2px solid #ccc">
              <el-row class="box-title">买单总价</el-row>
              <el-row>
                  <div class="buy">
                      <el-table
                              :data="buyData"
                              style="width: 100%">
                          <el-table-column
                                  prop="address"
                                  label="挂单人"
                                  width="100">
                          </el-table-column>
                          <el-table-column
                                  prop="totalPrice"
                                  label="总和"
                                  width="170">
                          </el-table-column>
                          <el-table-column
                                  :render-header="test"
                                  prop="quantity"
                                  label="挂单量"
                                  currency="XRP"
                                  width="170">
                          </el-table-column>
                          <el-table-column
                                  prop="price"
                                  label="买入价">
                          </el-table-column>
                      </el-table>
                  </div>
              </el-row>
          </el-col>
          <el-col :span="12" style="border-left: 2px solid #ccc">
              <el-row class="box-title">卖单要价</el-row>
              <el-row>
                  <div class="sell">
                      <el-table
                              :data="sellData"
                              style="width: 100%">
                          <el-table-column
                                  prop="price"
                                  label="卖出价">
                          </el-table-column>
                          <el-table-column
                                  prop="quantity"
                                  label="挂单量"
                                  width="170">
                          </el-table-column>
                          <el-table-column
                                  prop="totalPrice"
                                  label="总和"
                                  width="170">
                          </el-table-column>
                          <el-table-column
                                  prop="address"
                                  label="挂单人"
                                  width="140">
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
    props: ['orderBook'],
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
        test (h, {column, $index}) {
            return [h('p', {}, column.label), h('p', {}, this.testData)];
        },
        setBids: function (params) {
            const that = this;
            params.forEach(function (item, key) {
                let totalPrice = parseFloat(item.specification.totalPrice.value);
                let quantity = parseFloat(item.specification.quantity.value);
                let data = {
                    address: that.shortAddress(item.properties.maker),
                    totalPrice: totalPrice.toFixed(2),
                    quantity: quantity.toFixed(),
                    price: (totalPrice / quantity).toFixed(5)
                };
                that.buyData.push(data);
            });
        },
        setAsks: function (params) {
            const that = this;
            params.forEach(function (item, key) {
                let totalPrice = parseFloat(item.specification.totalPrice.value);
                let quantity = parseFloat(item.specification.quantity.value);
                let data = {
                    address: that.shortAddress(item.properties.maker),
                    totalPrice: totalPrice.toFixed(2),
                    quantity: quantity.toFixed(),
                    price: (totalPrice / quantity).toFixed(5)
                };
                that.sellData.push(data);
            });
        },
        shortAddress: function (address) {
            if (!address) return '';
            let len = address.length;
            return address.substr(0, 5) + '...' + address.substring(len - 3, len);
        }
    },
    watch: {
        orderBook: function (newQuestion, oldQuestion) {
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
}

</style>
