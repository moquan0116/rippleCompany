<template>
    <div class="layout">
        <div class="main" v-if="login === true">
            <NavTwo></NavTwo>
            <div class="container-fluid" style="margin-top: 1em;">
                <div class="container">
                    <router-view></router-view>
                </div>
            </div>
            <Footer></Footer>
        </div>
        <div class="login" v-else>
            <router-view></router-view>
            <Footer></Footer>
        </div>
    </div>
</template>

<script>
import NavTwo from './components/NavTwo';
import Footer from './components/Footer';
export default {
    name: 'App',
    data () {
        return {
            login: false
        };
    },
    created: function () {
        this.login = this.$root.login;
    },
    components: {
        NavTwo,
        Footer
    }
};
</script>

<style>

</style>
