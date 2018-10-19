<template>
<div class="general">
    <NavTwo></NavTwo>
    <div class="container-fluid" style="margin-top: 1em;">
        <div class="container">
            <Hint v-if="$store.state.accountActivated === false"></Hint>
            <router-view v-else></router-view>
        </div>
    </div>
    <Footer></Footer>
</div>
</template>

<script>
export default {
    name: 'Send'
};
</script>

<style>

</style>
