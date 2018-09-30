<template>
    <div class="layout">
        <div class="main" v-if="login">
            <NavTwo></NavTwo>
            <div class="container-fluid" style="margin-top: 1em;">
                <div class="container">
                    <router-view v-if="login"></router-view>
                </div>
            </div>
            <Footer></Footer>
        </div>
        <div class="login" v-else>
            <router-view v-if="login"></router-view>
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
    components: {
        NavTwo,
        Footer
    },
    created: function () {
        console.log(this.login);
        this.login = this.$store.state.isLogin;
    }
};
</script>

<style>

</style>
