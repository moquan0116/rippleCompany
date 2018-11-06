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
      <Loading :status="status" :text="text"></Loading>
  </div>
</template>

<script>
import Loading from './Loading';
export default {
    name: 'ShowType',
    props: ['address', 'addressError', 'reset'],
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
            },
            status: false,
            text: ''
        };
    },
    created: function () {
        if (this.reset.num) {
            this.num = this.reset.num;
        }
        this.typeData.trustline = this.selected;
        this.getTrustlines(this.address);
    },
    computed: {

    },
    watch: {
        address: function (newVal, oldVal) {
            if (this.addressError.length) {
                return false;
            }

            this.getTrustlines(newVal);
        },
        num: function (newVal, oldVal) {
            this.typeData.num = newVal;
        },
        selected: function (newVal, oldVal) {
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

            if (this.reset.trustline) {
                this.selected = this.reset.trustline;
            }
        },
        reload: function () {
            this.num = '';
        }
    },
    components: {
        Loading
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    /* send-box */
    .reset-btn{
        width: 100% !important;
        border: none !important;
        background: #346AA9 !important;
        border-radius: unset !important;
        color: #fff !important;
        letter-spacing: 0.1em;
    }
    .reset-btn:hover{
        background: #22456E !important;
    }
    .primary-rip {
        text-align: center !important;
    }
    .title,.content,.memo{
        font-weight: normal !important;
    }
    .title {
        font-size: 2.2em;
        color: black;
    }
    .content{
        font-size: 2em;
        color: #8F93B4;
    }
    .memo{
        font-size: 1em;
        color: #8F93B4;
    }
</style>
