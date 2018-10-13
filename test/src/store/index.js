import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        isLogin: false,
        num: 0
    },
    mutations: {
        login (state) {
            state.isLogin = true;
        },
        notLogin (state) {
            state.isLogin = false;
        },
        test (state) {
            state.num++;
        }
    }
});
