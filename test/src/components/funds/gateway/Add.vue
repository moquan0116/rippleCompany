<template>
  <div class="box">
      <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
          <el-form-item label="" label-width="0" prop="trustline">
              <el-input placeholder="Gateway's Ripple address" type="text" v-model="ruleForm2.trustline" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="货币类型" prop="currency">
              <el-select v-model="ruleForm2.currency" placeholder="请选择" style="width: 80%">
                  <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                  </el-option>
              </el-select>
          </el-form-item>
          <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
              <el-button @click="resetForm('ruleForm2')">取消</el-button>
          </el-form-item>
      </el-form>
      <div class="row mtop-1em" v-if="Object.keys(msg).length">
          <div class="col-xs-12">
              <div class="alert" v-bind:class="{'alert-info': flag == 'info', 'alert-success': flag == 'success', 'alert-warning': flag == 'warning', 'alert-danger': flag == 'error',}" role="alert">{{msg[flag]}}</div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    name: 'Add',
    data () {
        return {
            address: this.$store.state.account.address,
            ruleForm2: {
                trustline: '',
                currency: ''
            },
            rules2: {
                trustline: [
                    { require: true, trigger: 'blur' }
                ]
            },
            options: [{
                value: 'XRP',
                label: 'XRP - Ripples'
            }, {
                value: 'CNY',
                label: 'CNY - Chinese Yuan'
            }],
            value: '',
            Gateways: '',
            api: this.getRippleApi,
            msg: {},
            flag: 'info'
        };
    },
    methods: {
        submitForm (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.setTrustlines();
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm (formName) {
            this.$refs[formName].resetFields();
            this.$emit('add');
        },
        setTrustlines () {
            this.api.connect().then(() => {
                this.msg = {
                    'success': '连接服务器成功！'
                };
                let trustline = {
                    currency: this.ruleForm2.currency,
                    counterparty: this.ruleForm2.trustline,
                    limit: '100000',
                    // qualityIn: 0.91,
                    // qualityOut: 0.87,
                    ripplingDisabled: true,
                    frozen: false,
                    memos: [
                        {
                            type: 'www.zzhjzn.com',
                            format: 'text/plain',
                            data: 'huijin wallet'
                        }
                    ]
                };
                return this.api.prepareTrustline(this.$store.state.account.address, trustline);
            }).then((prepared) => {
                // console.log('Payment Prepared');
                this.msg = {
                    'info': '设置信息网关准备已完成！'
                };
                return this.api.getLedger().then(ledger => {
                    return this.submitTransaction(ledger.ledgerVersion, prepared, this.$store.state.account.secret);
                });
            }).then((res) => {
                // console.log(signed);
            }).catch(console.error);
        },
        submitTransaction: function (lastClosedLedgerVersion, prepared, secret) {
            const signedData = this.api.sign(prepared.txJSON, secret);
            return this.api.submit(signedData.signedTransaction).then(data => {
                this.msg = {'info': '支付提交中...结果：' + data.resultCode + ' 消息 ' + data.resultMessage};
                // console.log('Tentative Result: ', data.resultCode);
                // console.log('Tentative Message: ', data.resultMessage);

                const options = {
                    minLedgerVersion: lastClosedLedgerVersion,
                    maxLedgerVersion: prepared.instructions.maxLedgerVersion
                };
                return new Promise((resolve, reject) => {
                    setTimeout(() => this.verifyTransaction(signedData.id, options)
                        .then(resolve, reject), 1000);
                });
            });
        },
        /* 验证事务 */
        verifyTransaction: function (hash, options) {
            this.msg = {
                'success': '验证事务...'
            };
            // console.log('Verifying Transaction');
            return this.api.getTransaction(hash, options).then(data => {
                this.msg = {
                    'info': '验证结果：' + data.outcome.result
                };
                this.msg = {
                    'info': '验证版本：' + data.outcome.ledgerVersion
                };
                this.msg = {
                    'info': '序号：' + data.sequence
                };
                // console.log('Final Result: ', data.outcome.result);
                // console.log('Validated in Ledger: ', data.outcome.ledgerVersion);
                // console.log('Sequence: ', data.sequence);
                return data.outcome.result === 'tesSUCCESS';
            }).catch(error => {
                if (error instanceof this.api.errors.PendingLedgerVersionError) {
                    return new Promise((resolve, reject) => {
                        setTimeout(() => this.verifyTransaction(hash, options)
                            .then(resolve, reject), 1000);
                    });
                }
                console.log(hash);
                console.log(error);
                return error;
            });
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
#label-custom{
    display: none !important;
}
</style>
