<template>
<div class="transaction">
    <NavTwo></NavTwo>
    <div class="container-fluid" style="margin-top: 1em;">
        <div class="container">
            <router-view></router-view>
        </div>
    </div>
    <Footer></Footer>
</div>
</template>

<script>
import NavTwo from '../NavTwo';
import Footer from '../Footer';
export default {
    name: 'Transaction',
    components: {
        NavTwo,
        Footer
    }
};
</script>

<style>

</style>
