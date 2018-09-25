import Vue from 'vue';
import Router from 'vue-router';
import General from '@/components/general/General';
import Balance from '@/components/general/Balance';
import History from '@/components/general/History';
import Host from '@/components/general/Host';

import Transaction from '@/components/transaction/Transaction';
import Basic from '@/components/transaction/Basic';
import Record from '@/components/transaction/Record';
import RecordInfo from '@/components/transaction/RecordInfo';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/general',
            name: 'General',
            component: General,
            redirect: '/general/balance',
            children: [
                {path: 'balance', component: Balance},
                {path: 'history', component: History},
                {path: 'host', component: Host}
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
                {path: 'recordInfo', component: RecordInfo}
            ]
        }
    ]
});
