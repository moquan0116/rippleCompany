import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
    accountActivated: true,
    account: '',
    login: false
};
const mutations = {
    login (state, account) {
        if (account.extend.xrpBalance < 20) {
            state.accountActivated = false;
        }
        state.account = account;
        state.login = true;
    },
    loginOut (state) {
        state.account = '';
        state.login = false;
    },
    notActivated (state) {
        state.accountActivated = false;
    },
    activated (state) {
        state.accountActivated = true;
    }
};

export default new Vuex.Store({
    state,
    mutations
});
