<template>
  <div class="funds-index">
      <el-container>
          <el-aside style="width: 20em" :class="{rightLint: currentTab === 'XRP'}">
              <div
                      v-for="tab in tabs"
                      v-bind:key="tab"
                      v-on:click="currentTab = tab"
              >
                  <el-row class="not-Margin-leftRight margin-topBom">
                      <el-col :span="22">
                          <div class="grid-content bg-purple font-custom"  v-bind:class="['tab-button', { activeButton: currentTab === tab }]">
                              {{ tab }}
                          </div>
                      </el-col>
                  </el-row>
              </div>
          </el-aside>
          <el-main>
              <keep-alive>
                  <component v-bind:is="currentTabComponent"></component>
              </keep-alive>
          </el-main>
      </el-container>
  </div>
</template>

<script>
import Gateway from './Gateway';
import XRP from './XRP';
export default {
    name: 'Index',
    data () {
        return {
            currentTab: 'Gateway',
            tabs: ['XRP', 'Gateway']
        };
    },
    components: {
        gateway: Gateway,
        xrp: XRP
    },
    computed: {
        currentTabComponent: function () {
            return this.currentTab.toLowerCase();
        }
    },
    methods: {
        toggle: function () {
            alert('asdf');
        }
    }
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .el-row {
        margin-bottom: 20px;
        &:last-child {
             margin-bottom: 0;
         }
    }
    .el-col {
        border-radius: 4px;
    }
    .bg-purple-dark {
        background: #99a9bf;
    }
    .bg-purple {
        background: #F3F3F3;
    }
    .bg-purple-light {
        background: #e5e9f2;
    }
    .grid-content {
        border-radius: 4px;
        min-height: 20px;
        line-height: 20px;
        padding: 1em;
    }
    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
    .margin-topBom{
        margin-top: 1em !important;
        margin-bottom: 1em !important;
    }
    .not-Margin-leftRight{
        margin-left: 0 !important;
        margin-right: 0 !important;
    }
    .font-custom{
        color: #3F72B2 !important;
    }
    .activeButton{
        background: #3A76BC !important;
        color: #fff !important;
    }
    .font-custom:hover{
        cursor: pointer;
        background: #3A76BC !important;
        color: #fff !important;
    }
    .rightLint{
        border-right: 1px solid #CCCCCA;
    }
</style>
