<template>
  <div class="panel panel-default">
        <!-- Default panel contents -->
        <div class="panel-heading">测试</div>
        <!-- Table -->
        <!--<table class="table">
          <thead>

          </thead>
        </table>-->
      <wen
              v-for="post in posts"
              v-bind:key="post.id"
              v-bind:post="post"
      ></wen>
      <el-table
              :data="tableData"
              style="width: 100%">
          <el-table-column
                  prop="date"
                  label="日期"
                  width="180">
          </el-table-column>
          <el-table-column
                  prop="name"
                  label="姓名"
                  width="180">
          </el-table-column>
          <el-table-column
                  prop="address"
                  label="地址">
          </el-table-column>
      </el-table>

  </div>
</template>

<script>
import Wen from './wen.vue';
export default {
    name: 'Test',
    data () {
        return {
            posts: [
                { id: 1, title: 'My journey with Vue' },
                { id: 2, title: 'Blogging with Vue' },
                { id: 3, title: { x: 12123 } }
            ],
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }]
        };
    },
    components: {
        wen: Wen
    }
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
