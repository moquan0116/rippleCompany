import Vue from 'vue';
import Router from 'vue-router';
import NotFound from '@/components/NotFound';
import Balance from '@/components/general/Balance';
import History from '@/components/History';
import Host from '@/components/Host';
import Basic from '@/components/Basic';
import General from '@/components/general/General';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'NotFound',
            component: NotFound
        },
        {
            path: '/general',
            name: 'General',
            component: General,
            children: [
                {path: 'balance', component: Balance}
            ]
        },
        {
            path: '/balance',
            name: 'Balance',
            component: Balance
        },
        {
            path: '/history',
            name: 'History',
            component: History
        },
        {
            path: '/host',
            name: 'Host',
            component: Host
        },
        {
            path: '/basic',
            name: 'Basic',
            component: Basic
        }
    ]
});
