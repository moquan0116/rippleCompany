<template>
<div>
<NavTwo></NavTwo>
    <div class="container-fluid" style="margin-top: 1em;">
        <div class="container">
            <router-view></router-view>
        </div>
    </div>
</div>
</template>

<script>
import NavTwo from './components/NavTwo';
// import General from './components/general/General';
export default {
    name: 'App',
    components: {
        NavTwo: NavTwo
    }
};
</script>

<style>

</style>
