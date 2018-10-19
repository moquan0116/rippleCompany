<template>
    <div id="balance">
        <div class="panel panel-default">
            <!-- Default panel contents -->
            <div class="panel-heading">账户余额</div>
            <!-- Table -->
            <table class="table">
                <thead>
                <tr v-for="(data,index) in accountInfo" v-bind:key="index">
                    <th>{{data.title}}</th>
                    <th>{{data.item}}</th>
                </tr>
                </thead>
            </table>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Balance',
    data () {
        return {
            rip: '',
            accountInfo: []
        };
    },
    created: function () {
        const self = this;
        const api = this.getRippleApi();
        api.connect().then(function () {
            return api.getAccountInfo(self.$store.state.account.address);
        }).then(function (accountInfo) {
            self.accountInfo = [
                {'title': '序列', 'item': accountInfo.sequence},
                {'title': '余额', 'item': accountInfo.xrpBalance},
                {'title': '所有者数量', 'item': accountInfo.ownerCount},
                {'title': '上一个事务ID', 'item': accountInfo.previousAffectingTransactionID},
                {'title': '上一个事务ID账目版本', 'item': accountInfo.previousAffectingTransactionLedgerVersion}
            ];
        }).catch(function (error) {
            if (error instanceof api.errors.RippledError) {
                console.log('没有找到用户');
                self.$store.commit('notActivated');
            }
            return error;
        });
    }
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
