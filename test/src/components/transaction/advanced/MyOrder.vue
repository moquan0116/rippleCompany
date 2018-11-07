<template>
  <div class="my-order">
      <el-row>
          <el-col :span="12">
              <span class="m-ord-tit">My Orders</span>
              <el-button type="text">隐藏</el-button>
          </el-col>
      </el-row>
      <el-table
              :data="orders"
              border
              style="width: 100%">
          <el-table-column
                  prop="direction"
                  label="类型"
                  width="60">
          </el-table-column>
          <el-table-column
                  prop="currency"
                  label="币种">
          </el-table-column>
          <el-table-column
                  prop="totalPrice"
                  label="价格"
                  width="170">
          </el-table-column>
          <el-table-column
                  prop="quantity"
                  label="金额"
                  width="170">
          </el-table-column>
          <el-table-column
                  prop="price"
                  label="动作"
                  width="100">
              <template slot-scope="scope">
                  <el-button
                          size="mini"
                          type="danger"
                          @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
              </template>
          </el-table-column>
      </el-table>
  </div>
</template>

<script>
export default {
    name: 'MyOrder',
    data () {
        return {
            orders: []
        };
    },
    created: function () {
        this.getOrders();
    },
    methods: {
        getOrders: function () {
            const address = this.$store.state.account.address;
            const that = this;
            const ripple = this.getRippleApi;
            ripple.connect().then(function () {
                return ripple.getOrders(address, {limit: 50});
            }).then(function (orders) {
                console.log(orders);
                that.format(orders);
            }).catch(function (error) {
                console.log(error);
            });
        },
        format: function (orders) {
            if (!orders.length) {
                this.orders = [];
                return false;
            }
            const that = this;
            orders.forEach(function (item, key) {
                let val = item.specification;
                let temp = {
                    direction: val.direction,
                    currency: val.quantity.currency + '与' + val.totalPrice.currency + '(' + val.totalPrice.counterparty + ')',
                    totalPrice: val.totalPrice.value + ' ' + val.totalPrice.currency,
                    quantity: val.quantity.value + ' ' + val.quantity.currency
                };
                that.orders.push(temp);
            });
        },
        handleDelete: function (index, row) {
            console.log(row);
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
