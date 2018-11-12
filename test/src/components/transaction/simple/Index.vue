<template>
  <div class="simple-index">
      <div class="confirm-box" v-if="payment">
          <confirm :payment="payment" v-on:cancel="cancel"></confirm>
      </div>
      <div class="diy-box" v-else>
          <el-row>
              <simple :prop-data="propData" v-on:formData="formData"></simple>
          </el-row>
          <el-row>
              <loading v-if="status" :status="status" :text="text"></loading>
              <send-cny :sendPath="path" v-if="path" v-on:sendConfirm="sendConfirmForPath"></send-cny>
          </el-row>
      </div>
  </div>
</template>

<script>
import Simple from './Simple';
import Loading from './Loading';
import SendCny from './SendCny';
import Confirm from './Confirm';
export default {
    name: 'Index',
    inject: ['reload'],
    data () {
        return {
            isRouterAlive: true,
            status: false,
            text: '计算中...',
            path: [],
            reset: false,
            payment: '',
            propData: ''
        };
    },
    methods: {
        formData: function (data) {
            if (data === '-1') {
                this.path = [];
            } else {
                this.getPath(data);
            }
        },
        getPath: function (data) { // 取path
            this.status = true;
            this.path = [];
            const that = this;
            const pathfind = {
                source: {
                    address: this.$store.state.account.address
                },
                destination: {
                    address: this.$store.state.account.address,
                    amount: {
                        currency: data.selected,
                        counterparty: this.$GLOBAL.QKGATEWAY,
                        value: data.input
                    }
                }
            };
            let goGetPath = this.getRipple.getPath(pathfind, function () {});
            goGetPath.then((path) => {
                that.path = path;
                that.status = false;
            }).catch((error) => {
                if (error instanceof that.getRippleApi.errors.NotFoundError) {
                    that.status = false;
                    that.$message.error('货币数量不足无法兑换');
                    that.reload();
                }
            });
        },
        sendConfirmForPath: function (data) {
            this.payment = this.formatSubmit(data);
        },
        cancel: function (data) {
            this.propData = {
                input: data.num,
                selected: data.trustline
            };
            this.payment = '';
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
        }
    },
    components: {
        Simple,
        Loading,
        SendCny,
        Confirm
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
