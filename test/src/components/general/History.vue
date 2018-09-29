<template>
  <div class="history">
    <div class="panel panel-default m-top">
      <div class="panel-heading">历史</div>
      <div class="panel-body">
        <el-button type="primary" @click="submitForm('ruleForm2')">确定</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'History',
    data () {
        return {
            msg: '这是历史页面'
        };
    },
    methods: {
        submitForm: function () {
            this.$http.get('/api/test').then(response => {
                console.log(response);
            }, response => {
                // error callback
            });
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
