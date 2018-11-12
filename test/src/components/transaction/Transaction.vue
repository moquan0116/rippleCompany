<template>
<div class="transaction">
    <NavTwo></NavTwo>
    <div class="container-fluid" style="margin-top: 1em;">
        <div class="container">
            <Hint v-if="$store.state.accountActivated === false"></Hint>
            <router-view v-if="isRouterAlive && $store.state.accountActivated"></router-view>
        </div>
    </div>
    <Footer></Footer>
</div>
</template>

<script>
export default {
    name: 'Transaction',
    provide () {
        return {
            reload: this.reload
        };
    },
    data () {
        return {
            isRouterAlive: true
        };
    },
    methods: {
        reload: function () {
            this.isRouterAlive = false;
            this.$nextTick(function () {
                this.isRouterAlive = true;
            });
        }
    }
};
</script>

<style>

</style>
