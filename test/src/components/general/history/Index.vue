<template>
  <div class="history" style="margin: 2em auto">
      <el-container>
          <el-aside width="20em" class="his-aside">
              <el-collapse v-model="activeNames1">
                  <el-collapse-item title="交易种类" name="1">
                      <div v-for="(item, $index) in btnData" :key="item.id" v-on:click="btnHandle(item, $index)">
                          <el-row v-bind:class="{ selected: item.active }">
                              <el-col :span="4" class="icon">
                                  <div><i></i></div>
                              </el-col>
                              <el-col :span="20">
                                  <div>{{item.text}}</div>
                              </el-col>
                          </el-row>
                      </div>
                  </el-collapse-item>
              </el-collapse>
              <el-collapse v-model="activeNames2">
                  <el-collapse-item title="日期" name="1">
                      <div>与现实生活一致</div>
                  </el-collapse-item>
              </el-collapse>
          </el-aside>
          <el-main>
              <div class="main-header">
                  <el-row>
                      <el-col :span="6">
                          <div>日期</div>
                      </el-col>
                      <el-col :span="6">
                          <div>描述</div>
                      </el-col>
                      <el-col :span="12">
                          <div style="float: right">
                              <el-button type="primary">导出成CSV</el-button>
                          </div>
                      </el-col>
                  </el-row>
              </div>
              <div class="main-body">
                  <div v-for="item of selectedData" :key="item.id">
                      <collapse-box :collapseData="item"></collapse-box>
                  </div>
              </div>
          </el-main>
      </el-container>
  </div>
</template>

<script>
import CollapseBox from './CollapseBox';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import RecordInfo from './RecordInfo';
export default {
    name: 'Index',
    data () {
        return {
            activeNames1: ['1'],
            activeNames2: ['2'],
            btnData: [
                {id: 1, flag: 'send', text: '发送', active: false},
                {id: 2, flag: 'received', text: '接收', active: false},
                {id: 3, flag: 'trustline', text: '网关', active: false},
                {id: 4, flag: 'trades', text: '交易', active: false},
                {id: 5, flag: 'order', text: '订单', active: false},
                {id: 6, flag: 'other', text: '其它', active: false}
            ],
            hisImg: {
                his_1: '../../../assets/image/his_1.png',
                his_2: '../../../assets/image/his_2.png'
            },
            collData: [],
            transactions: this.$store.state.transactions,
            selectedData: ''
        };
    },
    created: function () {
        // console.log(this.transactions);
    },
    methods: {
        btnHandle: function (row, index) {
            this.btnData[index].active = !row.active;
            let key = this.collData.indexOf(row.flag);
            if (key === -1) {
                this.collData.push(row.flag);
            } else {
                this.collData.splice(key, 1);
            }
            this.format(this.collData);
        },
        format: function (collData) {
            let data = this.transactions;
            let selfAddress = this.$store.state.account.address;
            data.forEach(function (item, key) {
                let type = item.type;
                if (type === 'payment') {
                    let sourceAddress = item.specification.source.address;
                    let destAddress = item.specification.destination.address;
                    if (selfAddress === sourceAddress && destAddress !== selfAddress) { // 发送(源地址是自己，但目标不是自己)
                        data[key].flag = 'send';
                    }
                    if (selfAddress === destAddress) { // 接收(目标地址是自己的)
                        data[key].flag = 'received';
                    }
                } else {
                    data[key].flag = item.type;
                }
            });

            this.selectedData = data.filter(function (item) {
                if (collData.length) {
                    return collData.indexOf(item.flag) !== -1;
                }
                return false;
            });
        }
    },
    components: {
        PulseLoader,
        RecordInfo,
        CollapseBox
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .main-header .el-row{
        border-bottom: 1px solid #cccccc;
        padding-bottom: 2em;
    }
    .main-body .collapse-box{
        margin-top: 2em;
    }
</style>
