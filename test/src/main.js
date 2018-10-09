// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import VueResource from 'vue-resource';
import 'jquery';
import 'bootstrap';
import {RippleAPI} from 'ripple-lib';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import Moment from 'moment';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
Vue.config.productionTip = false;

// const walletAddress = 'rU7xCqQeHURdPDzhE2NQ1U4XBjpDpUyFJQ';
// const walletAddress = 'rKoNYSwjt78AXCKVT7Y5PaaPfBpRgcWw25';
/* let userInfo = JSON.parse(localStorage.getItem('user'));
let walletAddress = userInfo === null ? 'null' : userInfo.address;
let secret = userInfo === null ? 'null' : userInfo.secret; */
// const secret = 'saD2EdEsCuD7YiQ9Sbw9DJuwTwYTL';
// const secret = 'ssGE93bKwjHL1ypp5BRvQeZG4sEys';
const rippleTest = 'wss://s.altnet.rippletest.net:51233';
// const rippleTest = 'wss://s1.ripple.com:443';
Vue.use(VueResource);

/* 在vue中增加一个获取RippleApi的方法 *81F5E21E35407D884A6CD4A731AEBFB6AF209E1B */
Vue.prototype.getRippleApi = function Ripple () {
    // 确保只有单例
    if (Ripple.instance !== undefined) {
        return Ripple.instance;
    } else {
        Ripple.instance = new RippleAPI({server: rippleTest});
        return Ripple.instance;
    }
};

/* Vue.filter('dateFormat', function (dateString, type, pattern = 'YYYY-MM-DD HH:mm:ss') {
    if (type === 'UTC') {
        let date = Moment.utc(dateString).toDate();
        return Moment(date).format(pattern);
    } else {
        return Moment(dateString).format(pattern);
    }
}); */

Vue.prototype.dateFormat = function (dateString, type, pattern = 'YYYY-MM-DD HH:mm:ss') {
    if (type === 'UTC') {
        let date = Moment.utc(dateString).toDate();
        return Moment(date).format(pattern);
    } else {
        return Moment(dateString).format(pattern);
    }
};

router.beforeEach((to, from, next) => {
    let login = localStorage.getItem('user');
    let path = to.path;
    if (path === '/login') {
        next();
        return;
    }

    if (login === null || login === '') {
        next({
            path: '/login'
        });
    } else {
        if (to.matched.length === 0) {
            from.name ? next({'name': from.name}) : next({ 'path': from.path });
        } else {
            next();
        }
    }
});

/* eslint-disable no-new */
new Vue({
    el: '#app',
    data: {
        currentRoute: window.location.pathname,
        rip: {
            RippleAPI: RippleAPI,
            /* walletAddress: walletAddress,
            secret: secret, */
            rippleTest: rippleTest
        }
    },
    router,
    store,
    components: { App },
    template: '<App/>'
});
