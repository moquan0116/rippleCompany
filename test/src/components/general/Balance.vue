<template>
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
        console.log(this.$root.rip);
        const self = this;
        const api = this.getRippleApi();
        api.on('error', (errorCode, errorMessage) => {
            console.log(errorCode + ': ' + errorMessage);
        });
        api.on('connected', () => {
            console.log('连接成功');
        });
        api.on('disconnected', (code) => {
            console.log('disconnected, code:', code);
        });
        api.connect().then(function () {
            console.log(JSON.parse(localStorage.getItem('user')).address);
            return api.getAccountInfo(JSON.parse(localStorage.getItem('user')).address);
        }).then(function (accountInfo) {
            self.accountInfo = [
                {'title': '序列', 'item': accountInfo.sequence},
                {'title': '余额', 'item': accountInfo.xrpBalance},
                {'title': '所有者数量', 'item': accountInfo.ownerCount},
                {'title': '上一个事务ID', 'item': accountInfo.previousAffectingTransactionID},
                {'title': '上一个事务ID账目版本', 'item': accountInfo.previousAffectingTransactionLedgerVersion}
            ];
        }).catch(console.error);
    }
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
