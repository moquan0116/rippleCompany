<template>
  <div class="trand-box">
      <el-row class="title">
          <div class="grid-content bg-purple">
              {{flag}} {{topTitle}}
          </div>
      </el-row>
      <div class="form" v-if="showConfir === false">
          <el-form :label-position="labelPosition" label-width="80px" ref="formTrand" :rules="formRules" :model="formTrand" class="trand-box-form">
              <el-form-item :label="flag"
                            prop="buyNum"
                            class="form-item">
                  <el-input v-model="formTrand.buyNum"></el-input>
                  <div class="right-block">
                      <span>{{bcc.base}}</span>
                      <span>{{shortGate}}</span>
                  </div>
              </el-form-item>
              <el-form-item label="单价"
                            prop="buyPrice">
                  <el-input v-model="formTrand.buyPrice"></el-input>
                  <div class="right-block">
                      <span>{{bcc.counCurr}}</span>
                      <span>{{shortGate}}</span>
                  </div>
              </el-form-item>
              <el-form-item label="本单(最多)价值"
                            prop="maxValue">
                  <el-input v-model="formTrand.maxValue"></el-input>
                  <div class="right-block">
                      <span>{{bcc.counCurr}}</span>
                      <span>rPT74sU</span>
                  </div>
              </el-form-item>
              <el-row class="msg" v-if="formTrand.maxValue && formTrand.buyNum && formTrand.buyPrice">
                  <el-col :span="24">
                  <span v-if="direction == 'buy'">
                      你想以 {{formTrand.maxValue}} {{bcc.counCurr}} {{flag}} {{formTrand.buyNum}} {{bcc.base}} ( {{bcc.base}} 的单价为 {{formTrand.buyPrice}} {{bcc.counCurr}})
                  </span>
                      <span v-if="direction == 'sell'">
                      你想{{flag}} {{formTrand.buyNum}} {{bcc.base}} 以换取 {{formTrand.maxValue}} {{bcc.counCurr}}   ( {{bcc.base}} 的单价为 {{formTrand.buyPrice}} {{bcc.counCurr}})
                  </span>
                  </el-col>
              </el-row>
              <el-row>
                  <el-col :span="24" class="btn-col">
                      <el-button class="btn enable" @click="submitForm('formTrand')">{{flag}} {{bcc.base}} ({{shortGate}})</el-button>
                  </el-col>
              </el-row>
          </el-form>
      </div>
      <!--确认页-->
      <div class="confirmation" v-if="showConfir === true && submitFlag === false">
          <el-form :label-position="labelPosition" class="trand-box-form">
              <el-form-item>
                  <span>您将要创建一个{{flag}}订单</span>
              </el-form-item>
              <el-form-item>
                  <span>以<b>{{formTrand.maxValue}} {{bcc.counCurr}}</b> {{flag}}<b>{{formTrand.buyNum}} {{bcc.base}}</b></span>
              </el-form-item>
              <el-form-item>
                  <span v-if="direction === 'buy'">({{bcc.base}}/{{formTrand.buyPrice}} {{bcc.counCurr}})</span>
                  <span v-if="direction === 'sell'">({{formTrand.buyPrice}} {{bcc.counCurr}}/{{bcc.base}})</span>
              </el-form-item>
              <el-form-item>
                  <span>你确定吗？</span>
              </el-form-item>
              <el-row :gutter="30">
                  <el-col :span="10" class="btn-col" style="text-align: right">
                      <el-button type="text" @click="back">返回</el-button>
                  </el-col>
                  <el-col :span="12" class="btn-col">
                      <el-button class="btn enable" @click="submitOrder">确定</el-button>
                  </el-col>
              </el-row>
          </el-form>
      </div>
      <!--结果页-->
      <div class="result" v-if="submitFlag">
          <el-form :label-position="labelPosition" class="trand-box-form">
              <el-form-item>
                  <span>{{createOrderMsg.msg}}</span>
              </el-form-item>
              <el-row :gutter="30" v-if="createOrderMsg.status === 20">
                  <el-col :span="10" class="btn-col" style="text-align: right">
                      <el-button type="text" @click="resetTrand('formTrand')">继续下单</el-button>
                  </el-col>
              </el-row>
          </el-form>
      </div>
  </div>
</template>

<script>
export default {
    name: 'TrandBox',
    props: ['bcc', 'direction'],
    data () {
        let validateNumber = (rule, value, callback) => {
            let reg = /^\d+(\.\d+)?$/;
            if (!reg.test(value)) {
                callback(new Error('只能是数字'));
            } else {
                callback();
            }
        };
        return {
            labelPosition: 'top',
            formTrand: {
                buyNum: '',
                buyPrice: '',
                maxValue: ''
            },
            formRules: {
                buyNum: [
                    { validator: validateNumber, trigger: 'keyUp' }
                ],
                buyPrice: [
                    { validator: validateNumber, trigger: 'blur' }
                ],
                maxValue: [
                    { validator: validateNumber, trigger: 'blur' }
                ]
            },
            balances: '',
            topTitle: '',
            showMsg: false,
            showConfir: false,
            submitFlag: false,
            createOrderMsg: {
                status: false,
                msg: ''
            }
        };
    },
    created: function () {
        this.getBalances();
    },
    computed: {
        flag: function () {
            if (this.direction === 'buy') {
                return '买入';
            }

            if (this.direction === 'sell') {
                return '卖出';
            }
        },
        totalValue: function () {
            let n = this.formTrand.buyNum;
            let p = this.formTrand.buyPrice;
            if (p && n) {
                return p * n;
            }
            return this.formTrand.maxValue;
        },
        shortGate: function () {
            return this.shortAddress(this.bcc.counParty);
        }
    },
    watch: {
        bcc: function (newVal, oldVal) {
            this.format();
        },
        totalValue: function (newVal, oldVal) {
            this.formTrand.maxValue = newVal;
        }
    },
    methods: {
        submitForm: function (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.showConfir = true;
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        submitOrder: function () {
            const order = {
                direction: this.direction,
                quantity: {
                    currency: this.bcc.base,
                    counterparty: this.bcc.counParty,
                    value: this.formTrand.buyNum
                },
                totalPrice: {
                    currency: this.bcc.counCurr,
                    counterparty: this.bcc.counParty,
                    value: this.formTrand.maxValue.toString()
                },
                passive: false,
                fillOrKill: false
            };
            if (this.bcc.base === 'XRP') {
                delete order.quantity.counterparty;
            }
            this.createOrder(order);
        },
        createOrder: function (order) {
            let that = this;
            let ripple = this.getRipple;
            let address = this.$store.state.account.address;
            let secret = this.$store.state.account.secret;
            this.submitFlag = true;
            this.createOrderMsg = {status: 10, msg: '正在把挂单提交到ripple网络...'};
            ripple.submitOrder(address, secret, order, function (data) {
                if (data.resultCode === 'tesSUCCESS') {
                    that.createOrderMsg = {status: 20, msg: '您的订单现在生效'};
                    that.$store.dispatch('hasUpdate');
                    // that.style = 'success';
                }
                if (data.resultCode === 'tecINSUF_RESERVE_OFFER') {
                    that.createOrderMsg = {status: 40, msg: '没有足够的金额来完成订单'};
                }
                console.log(data);
            }, function (status) {
                that.createOrderMsg = {status: 10, msg: Object.values(status)[0]};
                /* that.text = Object.values(status)[0];
                that.style = Object.keys(status)[0]; */
            });
        },
        back: function () {
            this.showConfir = false;
        },
        resetTrand (formName) {
            this.submitFlag = false;
            this.showConfir = false;
            this.formTrand.buyNum = '';
            this.formTrand.buyPrice = '';
            this.formTrand.maxValue = '';
        },
        shortAddress: function (address) {
            if (!address) return '';
            let len = address.length;
            let start = arguments[1] || 5;
            let end = arguments[2] || 3;
            return address.substr(0, start) + '...' + address.substring(len - end, len);
        },
        getBalanceByType: function (param) {
            let res = '';
            this.balances.forEach(function (itme, key) {
                if (itme.counterparty === param) {
                    res = itme.value;
                    return false;
                }
            });
            return res;
        },
        getBalances: function () {
            const that = this;
            const ripple = this.getRippleApi;
            ripple.connect().then(function () {
                return ripple.getBalances(that.$store.state.account.address);
            }).then(function (balance) {
                that.balances = balance;
                that.format();
            }).catch(function (error) {
                console.log(error);
            });
        },
        format: function () {
            if (this.bcc.base === 'XRP') {
                if (this.direction === 'buy') {
                    let num = this.getBalanceByType(this.bcc.counParty);
                    let trust = this.shortAddress(this.bcc.counParty);
                    this.topTitle = this.bcc.base + num + trust + this.bcc.counCurr;
                }
                if (this.direction === 'sell') {
                    let num = this.balances[0].value;
                    this.topTitle = this.bcc.base + num + this.bcc.base;
                }
            }

            if (this.bcc.base === 'CNY') {
                if (this.direction === 'sell') {
                    let num = this.getBalanceByType(this.bcc.counParty);
                    let trust = this.shortAddress(this.bcc.counParty);
                    this.topTitle = trust + this.bcc.base + num + this.bcc.base;
                }
                if (this.direction === 'buy') {
                    let num = this.balances[0].value;
                    let trust = this.shortAddress(this.bcc.counParty);
                    this.topTitle = this.bcc.base + '_' + num + trust + this.bcc.counCurr;
                }
            }
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.trand-box{
    background: #FAFAFA !important;
    border: 1px solid #E6E6E6;
    padding-bottom: 1em;
}
.trand-box-form,.title{
    padding: 1em;
}
.title{
    background: #F2F2F2 !important;
    font-size: inherit !important;
}
.el-form-item__content>.el-input{
    width: 70% !important;
}
.el-input>.el-input__inner{
    /* border-top-right-radius: unset !important;
    border-bottom-right-radius: unset !important; */
}
.el-form-item__content>.right-block{
    display: inline-block;
    background: #CCCCCA;
    position: relative;
    font-size: 14px;
    top: 8px;
    width: 28%;
    padding: 0.3em 0;
    text-align: center;
    right: 4px;
}
.right-block>span{
    display: block;
    color: #ffffff;
    line-height: normal !important;
}
.btn-col{
    text-align: center;
}
.btn{
    display:inline-block;
}
.disabled-my{
    background: #CCCCCA;
    color: #fff;
}
.disabled-my:hover{
    cursor: auto !important;
}
.enable{
    background: #346AA9 !important;
    color: #fff;
}
.enable:hover{
    background: #22456E !important;
}
.msg{
    padding: 1em 0;
    color: #41A447 !important;
}
/*确认框*/
.confirmation .el-form-item{
    text-align: center !important;
}
</style>
