<template>
  <div class="my-order">
      <div class="show-res">
          <Hint :text="text" :typeClass="style" v-if="text"></Hint>
      </div>
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
                          :loading="scope.row.extend.loading"
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
            orders: [],
            text: '',
            style: '',
            loading: []
        };
    },
    created: function () {
        this.$store.dispatch('notUpdate');
        this.getMyOrders();
    },
    computed: {
        myOrderUpdate: function () {
            return this.$store.state.myOrderUpdate;
        }
    },
    watch: {
        myOrderUpdate: function (newVal, oldVal) {
            if (newVal) {
                const that = this;
                setTimeout(function () {
                    that.getMyOrders();
                    that.$store.dispatch('notUpdate');
                }, 7000);
            }
        }
    },
    methods: {
        getMyOrders: function () {
            let address = this.$store.state.account.address;
            let that = this;
            let ripple = this.getRippleApi;
            ripple.connect().then(function () {
                return ripple.getOrders(address, {limit: 50});
            }).then(orders => {
                that.format(orders);
            }).catch(function (error) {
                console.log(error);
            });
        },
        format: function (orders) {
            this.orders = [];
            if (!orders.length) {
                return false;
            }
            let that = this;
            orders.forEach(function (item, key) {
                let val = item.specification;
                let temp = {
                    direction: val.direction,
                    currency: val.quantity.currency + '与' + val.totalPrice.currency + '(' + val.totalPrice.counterparty + ')',
                    totalPrice: val.totalPrice.value + ' ' + val.totalPrice.currency,
                    quantity: val.quantity.value + ' ' + val.quantity.currency,
                    origin: item,
                    extend: {loading: false}
                };
                that.orders.push(temp);
            });
        },
        handleDelete: function (index, row) {
            row.extend.loading = true;
            let orderCancellation = {orderSequence: row.origin.properties.sequence};
            let that = this;
            let ripple = this.getRipple;
            let address = this.$store.state.account.address;
            let secret = this.$store.state.account.secret;
            ripple.cancellationOrder(address, secret, orderCancellation, function (data) {
                if (data.resultCode === 'tesSUCCESS') {
                    that.text = '取消成功';
                    that.style = 'success';
                    that.$store.dispatch('hasUpdate');
                } else {
                    that.text = '取消失败';
                    that.style = 'danger';
                }
                console.log(data);
            }, function (status) {
                that.text = Object.values(status)[0];
                that.style = Object.keys(status)[0];
            });
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
