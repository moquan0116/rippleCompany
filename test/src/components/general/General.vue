<template>
<div>
    <router-view></router-view>
</div>
</template>

<script>
// import NotFound from '../NotFound';
export default {
    name: 'Genneral',
    created: function () {
        console.log(this.$root.a);
        /* this.$router.matcher.addRoutes({
            routes: [
                {
                    path: '/',
                    name: 'NotFound',
                    component: NotFound
                }
            ]
        }); */
    }
};
</script>

<style>

</style>
