<template>
  <div class="box">
      <el-table
              :data="trustlines"
              style="width: 100%">
          <el-table-column
                  prop="specification.counterparty"
                  label="Gateways"
                  min-width="280">
          </el-table-column>
          <el-table-column
                  prop="state.balance"
                  label="余额"
                  width="160">
          </el-table-column>
          <el-table-column label="操作">
              <template slot-scope="scope">
                  <el-row class="del" v-if="inArray(scope.$index, del)">
                      <el-button size="mini" type="danger"  @click="handleDel(scope.$index, scope.row)">删除</el-button>
                      <el-button size="mini"   @click="handleEdit(scope.$index, scope.row)">取消</el-button>
                  </el-row>
                  <el-row class="edit" v-else>
                      <el-button size="mini"  type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                  </el-row>
              </template>
          </el-table-column>
      </el-table>
  </div>
</template>

<script>
export default {
    name: 'List',
    data () {
        return {
            trustlines: [],
            del: []
        };
    },
    created: function () {
        this.test = 1;
        const ripple = this.getRippleApi();
        const that = this;
        ripple.connect().then(function () {
            ripple.getTrustlines(that.$store.state.account.address).then(function (trustlines) {
                that.trustlines = trustlines;
            });
        });
    },
    methods: {
        handleEdit: function (index, row) {
            let key = this.inArray(index, this.del);
            if (key) {
                this.del.splice(key, 1);
            } else {
                this.del.push(index);
            }
        },
        handleDel: function (index, row) {
            this.trustlines.splice(index, 1);
        },
        inArray: function (search, arr) {
            for (let key in arr) {
                if (arr[key] === search) {
                    return key;
                }
            }
            return false;
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
#label-custom{
    display: none !important;
}
</style>
