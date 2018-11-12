// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import VueResource from 'vue-resource';

import 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import Moment from 'moment';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import Utils from './components/Common/utils/index.js';
import components from './components/Common/components.js';
import RippleMy from './ripple/rippleMy';
import Global from './components/Common/Global';

Vue.use(components);
Vue.use(ElementUI);
Vue.use(VueResource);
Vue.prototype.$utils = Utils;
Vue.prototype.getRipple = RippleMy.getInstance();
Vue.prototype.getRippleApi = RippleMy.getInstance().getRippleApi();
Vue.prototype.$GLOBAL = Global;
Vue.prototype.dateFormat = function (dateString, type, pattern = 'YYYY-MM-DD HH:mm:ss') {
    if (type === 'UTC') {
        let date = Moment.utc(dateString).toDate();
        return Moment(date).format(pattern);
    } else {
        return Moment(dateString).format(pattern);
    }
};

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
    let login = store.state.login;
    let path = to.path;
    if (path === '/login') {
        next();
        return;
    }

    if (login === false || login === '') {
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
            RippleAPI: RippleMy.getInstance().getRippleApi()
        }
    },
    router,
    store,
    components: { App },
    template: '<App/>'
});
