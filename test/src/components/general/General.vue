<template>
<div v-if="login === true">
    <router-view></router-view>
</div>
</template>

<script>
import NavTwo from '../NavTwo';
export default {
    name: 'Genneral',
    props: ['login'],
    components: {
        NavTwo
    }
};
</script>

<style>

</style>
