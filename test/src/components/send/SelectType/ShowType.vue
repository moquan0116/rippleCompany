<template>
  <div class="box">
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
      <div class="loading" v-if="loading === true">
          <el-row :gutter="10">
              <el-col :span="2" >
                  <div class="grid-content bg-purple">
                      <div class="" v-loading="loading"></div>
                  </div>
              </el-col>
              <el-col :span="12">
                  <div class="grid-content bg-purple">
                      <span>正在计算其它路径...</span>
                  </div>
              </el-col>
          </el-row>
      </div>
      <div class="send-box" v-if="showSend">
          <el-row :gutter="12">
              <el-col :span="8">
                  <el-card shadow="hover" :body-style="{ padding: '0px' }">
                      <el-card>
                          <div class="text item primary-rip">
                              <span class="title">{{value}}</span>
                              <span class="content">{{currency}}</span>
                          </div>
                          <div class="text item primary-rip">
                              <span class="memo">({{value}} {{flag}}/{{currency}})</span>
                          </div>
                      </el-card>
                      <el-card :body-style="{ padding: '0px'}">
                          <div class="text item">
                              <el-button class="reset-btn">Send {{currency}}</el-button>
                          </div>
                      </el-card>
                  </el-card>
              </el-col>
          </el-row>
      </div>
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
            },
            loading: false,
            cardData: '',
            value: '',
            currency: '',
            flag: ''
        };
    },
    created: function () {
        this.typeData.trustline = this.selected;
        this.getTrustlines(this.address);
    },
    computed: {
        showSend: function () {
            return this.checkNum(this.num) && !this.loading
        }
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
                this.getPath(newValue);
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
                    /* let currency = item.specification.currency;
                    let counterparty = item.specification.counterparty;
                    let t = currency + ' - ' + counterparty; */
                    let temp = {
                        value: that.$GLOBAL.QKGATEWAY,
                        label: 'CNY - Chinese Yuan'
                    };
                    trustArr.push(temp);
                }
            });

            trustArr.unshift(defaultTrust);
            this.trustlines = trustArr;
        },
        getPath: function (data) {
            const that = this;
            this.loading = true;
            if (!this.checkNum(data.num)) {
                this.loading = false;
                return false;
            }
            const pathfind = {
                source: {
                    address: this.$store.state.account.address
                },
                destination: {
                    address: this.address,
                    amount: {
                        currency: this.selected === 'XRP' ? 'XRP' : 'CNY',
                        counterparty: this.$GLOBAL.QKGATEWAY,
                        value: data.num.replace(/^\s+|\s+$/gm, '')
                    }
                }
            };
            let goGetPath = this.getRipple.getPath(pathfind, function () {});
            goGetPath.then((path) => {
                /* that.$emit('path', {data: path, status: '1'}); */
                that.formatPath(path);
            }).catch((error) => {
                console.log(error);
                /* if (error instanceof that.getRippleApi.errors.NotFoundError) {
                    that.$emit('path', {data: '', status: '-1'});
                } */
            });
        },
        formatPath: function (data) {
            this.value = data[0].source.maxAmount.value;
            this.currency = data[0].source.maxAmount.currency;
            this.flag = data[0].destination.amount.currency;
            this.loading = false;
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .loading .el-loading-spinner{
        margin-top: 0 !important;
    }
    .loading .el-col{
        height: 3em !important;
    }
    .loading .el-col>div{
        line-height: 3em;
    }
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
