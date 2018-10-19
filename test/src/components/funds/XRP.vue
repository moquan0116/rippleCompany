<template>
  <div class="box">
      <el-row>
          <el-col :span="24">
              <div class="grid-content bg-purple-dark title-font">
                  Ripple 地址
              </div>
          </el-col>
      </el-row>
      <el-row>
          <el-col :span="24">
              <div class="grid-content bg-purple-dark">
                  {{$store.state.account.address}}
              </div>
          </el-col>
      </el-row>
  </div>
</template>

<script>
export default {
    name: 'XRP',
    data () {
        return {
            msg: '这是XRP页'
        };
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title-font{
    font-size: 18px;
}
.el-row {
    margin-bottom: 20px;
    &:last-child {
         margin-bottom: 0;
     }
}
.box{
    border-bottom: 1px solid #CCCCCA;
}
</style>
