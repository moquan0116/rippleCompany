<template>
  <div class="container">
     <div class="row">
       <h1>{{ msg }}</h1>
     </div>
  </div>
</template>

<script>
export default {
    name: 'NotActived',
    data () {
        return {
            msg: '暂无开发中...'
        };
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
