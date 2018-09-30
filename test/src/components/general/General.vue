<template>
<div class="general">
    <NavTwo></NavTwo>
    <div class="container-fluid" style="margin-top: 1em;min-height: 55em">
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
    name: 'Genneral',
    components: {
        NavTwo,
        Footer
    }
};
</script>

<style>

</style>
