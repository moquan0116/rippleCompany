<template>
  <div class="collapse-send">
      <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item>
              <template slot="title">
                  <div class="item-head">
                      &nbsp;&nbsp;
                      <i class="fa fa-arrow-up"></i>
                      &nbsp;&nbsp;
                      <span>你给{{formaAddress(collapseData.specification.destination.address)}} 发送了 {{collapseData.specification.source.maxAmount.value}} {{collapseData.specification.source.maxAmount.currency}}</span>
                  </div>
              </template>
              <div class="item-body">
                  <el-row>
                      <el-col :span="24">
                          <span>余额变化</span>
                      </el-col>
                  </el-row>
                  <el-row>
                      <el-col :span="5">
                          <span>描述</span>
                      </el-col>
                      <el-col :span="11">
                          <span>发行人</span>
                      </el-col>
                      <el-col :span="4">
                          <span>金额</span>
                      </el-col>
                      <el-col :span="4">
                          <span>最终金额</span>
                      </el-col>
                  </el-row>
                  <el-row>
                      <el-col :span="5">
                          <span>费用</span>
                      </el-col>
                      <el-col :span="11">
                          <span>-</span>
                      </el-col>
                      <el-col :span="4">
                          <span>-0.000012 XRP</span>
                      </el-col>
                      <el-col :span="4">
                          <span>104.99 XRP</span>
                      </el-col>
                  </el-row>
                  <el-row>
                      <el-col :span="5">
                          <span>CNY Balance Changer</span>
                      </el-col>
                      <el-col :span="11">
                          <span>PT74sUcTBTQhkHVD54WGncoqXEAMYbmH7</span>
                      </el-col>
                      <el-col :span="4">
                          <span>-5 CNY</span>
                      </el-col>
                      <el-col :span="4">
                          <span>100 CNY</span>
                      </el-col>
                  </el-row>
              </div>
              <div class="item-btn">
                  <el-row>
                      <el-col :span="4" style="padding-left: 1em">
                          <el-button type="text">交易详情</el-button>
                      </el-col>
                  </el-row>
              </div>
          </el-collapse-item>
      </el-collapse>
  </div>
</template>

<script>
export default {
    name: 'Send',
    props: ['collapseData'],
    data () {
        return {
            activeNames: [1]
        };
    },
    created: function () {
        console.log(this.collapseData);
    },
    methods: {
        handleChange: function (data) {
            console.log(data);
        },
        formaAddress: function (address) {
            return this.$utils.hiddenString(address, 6, 3);
        }
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
