<template>
  <div class="send-box" style="margin-top: 2em;">
      <div class="boxs">
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
      <!--<img class="loading" src="../../../assets/image/loading.png"/>-->

  </div>
</template>

<script>
export default {
    name: 'SendCny',
    props: ['sendPath'],
    data () {
        return {
            cardData: '',
            value: '',
            currency: '',
            flag: ''
        };
    },
    created: function () {
        this.format(this.sendPath);
    },
    watch: {
        sendPath: function (newVal, oldVal) {
            this.format(newVal);
        }
    },
    methods: {
        format: function (data) {
            /* if (data.status === '-1') {
                return false;
            } */
            console.log(data);
            /* this.value = data[0].source.maxAmount.value;
            this.currency = data[0].source.maxAmount.currency;
            this.flag = data[0].destination.amount.currency; */
            /* data.forEach(function (item, key) {
                let value = item.source.maxAmount.value;
                let currency = item.source.maxAmount.currency;
            }) */
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
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
