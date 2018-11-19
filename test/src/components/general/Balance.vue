<template>
    <div class="balance">
        <el-collapse v-model="activeNames">
            <el-collapse-item>
                <template slot="title">
                    <div style="display: inline-block;width: 100%">
                        <el-row>
                            <el-col :span="2" style="text-align: center;">
                                <img src="../../assets/image/ripple-logo.png" class="icon-ripple-logo">
                            </el-col>
                            <el-col :span="14">
                                <span class="tit-coll">XRP - Ripple</span>
                            </el-col>
                            <el-col :span="8">
                                <span class="con-coll">{{assets.xrp.value}}</span>
                            </el-col>
                        </el-row>
                    </div>
                </template>
                <el-row>
                    <el-col :span="16">
                        <div class="font-bal">现有</div>
                    </el-col>
                    <el-col :span="8">
                        <div class="font-bal">...</div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="16">
                        <div class="font-bal">冻结</div>
                    </el-col>
                    <el-col :span="8">
                        <div class="font-bal">...</div>
                    </el-col>
                </el-row>
            </el-collapse-item>
        </el-collapse>
        <el-collapse v-model="activeNames">
            <el-collapse-item>
                <template slot="title">
                    <div style="display: inline-block;width: 100%">
                        <el-row>
                            <el-col :span="2" style="text-align: center;">
                                <img src="../../assets/image/yuan.png" class="icon-ripple-logo">
                            </el-col>
                            <el-col :span="14">
                                <span class="tit-coll">Chinese Yuan</span>
                            </el-col>
                            <el-col :span="8">
                                <span class="con-coll">{{assets.yuan.total}}</span>
                            </el-col>
                        </el-row>
                    </div>
                </template>
                <el-row v-if="assets.yuan" v-for="item in assets.yuan" :key="item.counterparty">
                    <el-col :span="16">
                        <div class="font-bal">{{item.counterparty}}</div>
                    </el-col>
                    <el-col :span="8">
                        <div class="font-bal">{{item.value}}</div>
                    </el-col>
                </el-row>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>

<script>
export default {
    name: 'Balance',
    data () {
        return {
            activeNames: ['0'],
            assets: {
                xrp: '',
                yuan: []
            }
        };
    },
    created: function () {
        const self = this;
        const api = this.getRippleApi;
        api.connect().then(function () {
            /* api.getBalanceSheet(self.$store.state.account.address).then(balance => {
                self.yuan(balance.assets);
            }); */
            return api.getBalances(self.$store.state.account.address);
        }).then(function (balance) {
            self.format(balance);
        }).catch(function (error) {
            console.log(error);
        });
    },
    methods: {
        handleChange: function (val) {
            // console.log(val);
        },
        format: function (assets) {
            let xrp = '';
            let yuan = [];
            let total = 0;
            assets.forEach(function (item, key) {
                if (item.currency === 'XRP') {
                    xrp = item;
                }
                if (item.currency === 'CNY') {
                    total += parseFloat(item.value);
                    yuan.push(item);
                }
            });
            yuan['total'] = total;
            this.assets = {
                xrp: xrp,
                yuan: yuan
            };
        }
    }
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.balance .el-collapse{
    border: 1px solid #CCCCCA !important;
    margin-bottom: 2em;
    padding: 1em;
}
.balance .el-collapse-item__content{
    padding-bottom: 0 !important;
}
.balance .el-collapse,.el-collapse-item__header,.el-collapse-item__content{
    background:#F3F3F3 !important;
}
.balance .el-collapse-item__arrow{
    display: none !important;
}

.balance .el-collapse-item__wrap{
    /*border-bottom: 1px solid .CCCCCA;*/
}
.balance .el-collapse-item__content .el-row{
    border-top:1px solid #CCCCCA !important;
    height: 3.5em;
    line-height: 3.5em;
    padding-left: 1em;
}
.balance .icon-ripple-logo {
    display: inline-block;
    width: 25px;
    height: 25px;
}
.balance .font-bal{
    font-size: 1.4em;
}
.balance .tit-coll{
    font-size: 1.6em;
    font-weight: 600
}
.balance .con-coll{
    font-size: 1.4em;
    font-weight: 600;
}
</style>
