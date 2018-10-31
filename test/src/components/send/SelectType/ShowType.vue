<template>
  <div class="show-type">
      <el-row :gutter="20">
          <el-col :span="6">
              <el-form-item label="对方将收到" :error="error">
                  <el-input v-model="num" class="width-full"></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="12">
              <el-form-item label="货币类型">
                  <el-select v-model="selected" placeholder="请选择" class="gateway-select width-full">
                      <el-option
                              v-for="item in trustlines"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                      </el-option>
                  </el-select>
              </el-form-item>
          </el-col>
      </el-row>
  </div>
</template>

<script>
// import WAValidator from 'wallet-address-validator';
export default {
    name: 'ShowType',
    props: ['address', 'addressError'],
    data () {
        return {
            trustlines: [{
                value: 'XRP',
                label: 'XRP - Ripples'
            }],
            selected: 'XRP',
            num: '',
            error: '',
            trust: [],
            typeData: {
                num: '',
                trustline: ''
            }
        };
    },
    created: function () {
        this.typeData.trustline = this.selected;
        this.getTrustlines(this.address);
    },
    watch: {
        address: function (newVal, oldVal) {
            if (this.addressError.length <= 0) {
                this.getTrustlines(newVal);
            }
        },
        num: function (newVal, oldVal) {
            let toVal = newVal;
            if (!this.checkNum(newVal)) { // 验证num通过
                toVal = '';
            }
            this.typeData.num = toVal;
        },
        selected: function (newVal, oldVal) {
            this.checkNum(this.num, true);
            this.typeData.trustline = newVal;
        },
        typeData: {
            handler (newValue, oldValue) {
                this.$emit('typeData', newValue);
            },
            deep: true
        }
    },
    methods: {
        checkNum: function (num) {
            let msg = '不正确的金额值';
            if (num === '') {
                if (arguments[1]) {
                    this.error = '请输入金额值';
                } else {
                    this.error = '';
                }
                return false;
            }

            let rule = /^[1-9]\d*$/;
            if (!rule.test(num)) {
                this.error = msg;
                return false;
            }
            this.error = '';
            return true;
        },
        getTrustlines: function (address) {
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
            let defaultTrust = this.trustlines[0];
            let trustArr = [];

            if (trustlines.length <= 0) {
                this.trustlines = defaultTrust;
                return false;
            }

            trustlines.forEach(function (item, key) {
                let currency = item.specification.currency;
                let counterparty = item.specification.counterparty;
                let t = currency + ' - ' + counterparty;
                let temp = {
                    value: t,
                    label: t
                };
                trustArr.push(temp);
            });

            trustArr.unshift(defaultTrust);
            this.trustlines = trustArr;
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
