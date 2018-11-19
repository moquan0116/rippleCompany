<template>
  <div class="collapse-box">
      <send :collapseData="collapseData" v-if="collapseData.flag === 'send'"></send>
      <Received :collapseData="collapseData" v-if="collapseData.flag === 'received'"></Received>
  </div>
</template>

<script>
import Send from './types/Send';
import Received from './types/Received';
export default {
    name: 'collapseBox',
    props: ['collapseData'],
    render: function (createElement) {
        return createElement(this.collapseData);
    },
    components: {
        Send,
        Received
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .item-head{
        border-left: 0.5em solid #41A447;
    }
    .item-head span{
        font-size: 1.3em;
        color: black;
    }
    .item-body{
        padding: 1em;
    }
    .item-body .el-row:last-child{
        padding-bottom: 0.5em;
        border-bottom: 1px solid #cccccc;
    }
    .item-body .el-row .el-col span{
        font-size: 1.1em;
    }
    .item-body .el-row:nth-child(2) .el-col span{
        color: black !important;
        font-weight: 600;
    }

</style>
