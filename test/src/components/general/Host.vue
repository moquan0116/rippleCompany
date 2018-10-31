<template>
  <div class="panel panel-default">
        <!-- Default panel contents -->
        <div class="panel-heading">服务器</div>
        <!-- Table -->
        <table class="table">
          <thead>
          <tr v-for="(data,index) in serverInfo" v-bind:key="index">
            <th>{{data.title}}</th>
            <th>{{data.item}}</th>
          </tr>
          </thead>
        </table>
      </div>
</template>

<script>
export default {
    name: 'Host',
    data () {
        return {
            rip: '',
            serverInfo: []
        };
    },
    created: function () {
        const self = this;
        const api = this.getRippleApi;
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
            return api.getServerInfo();
        }).then(function (serverInfo) {
            self.serverInfo = [
                {'title': '版本', 'item': serverInfo.buildVersion},
                {'title': '有效账目范围', 'item': serverInfo.completeLedgers},
                {'title': '主机ID', 'item': serverInfo.hostID},
                {'title': '最近验证的账目Seq', 'item': serverInfo.validatedLedger.ledgerVersion},
                {'title': '最近验证的账目哈希', 'item': serverInfo.validatedLedger.hash},
                {'title': '距离上次账目生效的秒数', 'item': serverInfo.validatedLedger.age}
            ];
        }).catch(console.error);
    }
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
