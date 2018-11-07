import Vue from 'vue';
import Router from 'vue-router';
import General from '@/components/general/General';
import Balance from '@/components/general/Balance';
import Host from '@/components/general/Host';

import Send from '@/components/send/Send';

import Transaction from '@/components/transaction/Transaction';
import Basic from '@/components/transaction/Basic';
import Record from '@/components/transaction/Record';
import RecordInfo from '@/components/transaction/RecordInfo';

import Funds from '@/components/funds/Funds';

import NotFound from '@/components/Error/NotFound';
import Login from '@/components/Login/Login';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/general/balance'
        },
        {
            path: '/NotFound',
            name: 'NotFound',
            component: NotFound
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/general',
            name: 'General',
            component: General,
            redirect: '/general/balance',
            children: [
                {path: 'balance', component: Balance},
                {path: 'host', component: Host}
            ]
        },
        {
            path: '/send',
            name: 'Send',
            component: Send,
            children: [
                {path: '', component: () => import('@/components/send/index')}
            ]
        },
        {
            path: '/transaction',
            name: 'Transaction',
            component: Transaction,
            redirect: '/transaction/basic',
            children: [
                {path: 'basic', component: Basic},
                {path: 'record', component: Record},
                {path: 'recordInfo', component: RecordInfo},
                {path: 'Advanced', component: () => import('@/components/transaction/Advanced/Index')}
            ]
        },
        {
            path: '/funds',
            name: 'Funds',
            component: Funds,
            children: [
                {path: '', component: () => import('@/components/funds/index')}
            ]
        }
    ]
});
