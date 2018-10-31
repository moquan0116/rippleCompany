<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
export default {
    name: 'App',
    created: function () {
        let a = this.getRipple.test();
        console.log(a);
    }
};
</script>

<style>

</style>
