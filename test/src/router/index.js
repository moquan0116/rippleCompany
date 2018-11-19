import Vue from 'vue';
import Router from 'vue-router';

import General from '@/components/general/General';
import Balance from '@/components/general/Balance';
import HistoryIndex from '@/components/general/history/Index';

import Send from '@/components/send/Send';
import SendIndex from '@/components/send/Index';

import Transaction from '@/components/transaction/Transaction';
import Simple from '@/components/transaction/simple/Index';
import Advanced from '@/components/transaction/Advanced/Index';

import Funds from '@/components/funds/Funds';
import FundsIndex from '@/components/funds/index';

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
                {path: 'history', component: HistoryIndex}
            ]
        },
        {
            path: '/send',
            name: 'Send',
            component: Send,
            children: [
                {path: '', component: SendIndex}
            ]
        },
        {
            path: '/transaction',
            name: 'Transaction',
            component: Transaction,
            redirect: '/transaction/simple',
            children: [
                {path: 'simple', component: Simple},
                {path: 'Advanced', component: Advanced}
            ]
        },
        {
            path: '/funds',
            name: 'Funds',
            component: Funds,
            children: [
                {path: '', component: FundsIndex}
            ]
        }
    ]
});
