<template>
  <div>
      <h2>{{post.title}}</h2>
      <p>{{post.id}}</p>
  </div>
</template>

<script>
export default {
    name: 'Wen',
    props: ['post'],
    data () {
        return {
            rip: '',
            serverInfo: []
        };
    }
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
