<template>
  <div class="box">
      <div class="button" v-if="current === 'List'">
          <el-row style="margin-bottom: 1.5em">
              <el-col :span="6" :offset="18">
                  <el-button style="width: 100%" v-on:click="switcher" type="primary">connect gateway</el-button>
              </el-col>
          </el-row>
      </div>
      <div class="component">
          <List v-if="current === 'List'"></List>
          <Add  v-on:add="switcher" v-else></Add>
      </div>
  </div>
</template>

<script>
import Add from './Add';
import List from './List';
export default {
    name: 'Index',
    data () {
        return {
            current: 'List'
        };
    },
    methods: {
        switcher: function () {
            this.current = this.current === 'List' ? 'Add' : 'List';
        }
    },
    components: {
        Add,
        List
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
#label-custom{
    display: none !important;
}
</style>
