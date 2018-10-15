<template>
    <div class="basic">
        <div class="panel panel-default">
            <div class="panel-body">
                交易
            </div>
        </div>
        <div class="row">
            <div class="col-xs-5">
                <label for="ba-1">转出方</label>
                <div class="input-group">
                    <span class="input-group-addon" >钱包地址</span>
                    <input type="text" v-model="walletAddress"  @input="changeFrom" class="form-control" id="ba-1" aria-describedby="basic-addon3">
                </div>
                <div class="input-group col-xs-12 mtop-1em">
                    <span class="input-group-addon">货币类型</span>
                    <select class="form-control" v-model="currency" v-on:input="changeCurrency">
                        <option>XRP</option>
                        <option>USD</option>
                    </select>
                </div>
                <div class="input-group col-xs-12 mtop-1em">
                    <span class="input-group-addon" >货币数量</span>
                    <input type="text" v-model="amount" @input="changeAmount" class="form-control" aria-describedby="basic-addon3">
                </div>
            </div>
            <div class="col-xs-5" style="float: right">
                <label for="ba-2">接收方</label>
                <div class="input-group">
                    <span class="input-group-addon" >钱包地址</span>
                    <input type="text" class="form-control" placeholder="rPJfPRexDDL3AG6TsW6TghP8Mafcp16htE" v-model="toAddress" @input="changeTo" id="ba-2" aria-describedby="basic-addon3">
                </div>
            </div>
        </div>
        <div class="row mtop-1em" v-if="Object.keys(msg).length">
            <div class="col-xs-12">
                <div class="alert" v-bind:class="{'alert-info': flag == 'info', 'alert-success': flag == 'success', 'alert-warning': flag == 'warning', 'alert-danger': flag == 'error',}" role="alert">{{msg[flag]}}</div>
            </div>
        </div>
        <div class="progress">
            <div class="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">
                <span class="sr-only">60% Complete</span>
                <div class="row" style="margin: 3em 0 0 0;">
                    <div class="col-xs-5 text-right">
                        <div class="btn-group" role="group" aria-label="...">
                            <button type="button" v-on:click="submit" class="btn btn-primary">确定</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
export default {
    name: 'Basic',
    data () {
        return {
            tran: {},
            walletAddress: JSON.parse(sessionStorage.getItem('user')).address,
            secret: JSON.parse(sessionStorage.getItem('user')).secret,
            toAddress: '',
            currency: 'XRP',
            amount: 1,
            api: this.getRippleApi(),
            msg: {},
            flag: 'info'
        };
    },
    watch: {
        msg: function (val, oldVal) {
            this.flag = Object.keys(val)[0];
        }
    },
    methods: {
        changeFrom: function (val) {
            this.walletAddress = val.target.value;
        },
        changeTo: function (val) {
            this.toAddress = val.target.value;
        },
        changeAmount: function (val) {
            this.amount = val.target.value;
        },
        changeCurrency: function (val) {
            this.currency = val.target.value;
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
        },
        submit: function () {
            var payment = {
                source: {
                    address: this.walletAddress,
                    maxAmount: {
                        value: this.amount,
                        currency: this.currency
                    }
                },
                destination: {
                    address: this.toAddress,
                    amount: {
                        value: this.amount,
                        currency: this.currency
                    }
                }
            };
            this.api.connect().then(() => {
                this.msg = {
                    'success': '连接服务器成功！'
                };
                return this.api.preparePayment(this.walletAddress, payment);
            }).then((prepared) => {
                // console.log('Payment Prepared');
                this.msg = {
                    'info': '支付准备已完成！'
                };
                return this.api.getLedger().then(ledger => {
                    // console.log('Current Ledger', ledger.ledgerVersion);
                    return this.submitTransaction(ledger.ledgerVersion, prepared, this.secret);
                });
            }).then((signed) => {
                // console.log(signed);
            }).catch(console.error);
        }
    },
    created: function () {

    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .progress{
        height: 100px;
        margin-top: 5em;
    }
    .progress-bar{
        background-color: #D2D6DE !important;
        height: 2%;
    }
    .mtop-1em{
        margin-top: 1em;
    }
</style>
