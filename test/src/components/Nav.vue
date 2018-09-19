<template>
    <div id="nav-top">
        <div class="bg-top" id="top-bar">
            <div class="container">
                <div class="row child-pad-tb top">
                    <ul class="nav nav-pills col-md-7">
                        <li role="presentation" v-for="(item,$key) in navTopItemsLeft"  @click="selected($key)" v-bind:key="item.key" :class="{'active-top':active === $key}" >
                            <router-link :to="$key">{{item}}</router-link>
                        </li>
                    </ul>
                    <ul class="nav nav-pills col-md-5">
                        <li role="presentation">
                            <a href="#">
                                <i class="dot"></i>
                                <span>rLPummHow5wrSVPUmKbQBmpT2QocZ5gzo9</span>
                            </a>
                        </li>
                        <li role="presentation"><a href="#">Ling</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <!--二级导航-->
        <div class="bg-top-child bg-tc" id="btm-bar" v-show="activeChild">
            <div class="container">
                <div class="row child-pad-tb top">
                    <ul class="nav nav-pills col-md-7">
                        <li role="presentation" v-for="(navChild,$key) in currTopItemChild" v-bind:key="$key" @click="selectedChild($key)" :class="{'active-child':activeChild === $key }">
                            <router-link :to="$key">{{navChild}}</router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Nav',
    data () {
        return {
            currentRoute: window.location.pathname,
            active: 'general',
            activeChild: '',
            navTopItemsLeft: {
                general: '概况',
                send: '发送',
                transaction: '交易',
                funds: '资金'
            },
            navTopItemChild: {
                general: {host: '服务器', balance: '余额', history: '历史', phone: '联系人'},
                send: {home: 'aaa', b: 'bbb', c: 'ccc'},
                transaction: {basic: '基本', record: '记录', advanced: '高级'}
            },
            currTopItemChild: [],
            rip: ''
        };
    },
    methods: {
        selected: function (index) {
            var selected = this.navTopItemChild[index];
            this.currTopItemChild = selected;
            this.active = index;
            if (typeof selected !== 'undefined') {
                this.activeChild = Object.keys(selected)[0];
                this.$router.push(this.activeChild);
            } else {
                this.activeChild = '';
                this.$router.push('notFound');
            }
            console.log(this.$root.currentRoute);
        },
        selectedChild: function (key) {
            this.activeChild = key;
        }
    },
    created: function () {
        console.log(this.currentRoute);
        var selected = this.navTopItemChild[this.active];
        this.rip = this.$root.rip;
        this.currTopItemChild = selected;
        if (typeof selected !== 'undefined') {
            this.activeChild = Object.keys(selected)[0];
            this.$router.push(this.activeChild);
        } else {
            this.activeChild = '';
            this.$router.push('notFound');
        }
        /* this.$http.get('/api/test').then(function (response) {
            console.log(response);
        }); */
    },
    watch: {
        activeChild: function (val, oldVal) {
            console.log('new: %s, old: %s', val, oldVal);
        },
        // 方法名
        '$route': function (to, from) {
            console.log(to);
        },
        // 深度 watcher
        c: {
            handler: function (val, oldVal) { /* ... */ },
            deep: true
        },
        // 该回调将会在侦听开始之后被立即调用
        d: {
            handler: function (val, oldVal) { /* ... */ },
            immediate: true
        },
        e: [
            function handle1 (val, oldVal) { /* ... */ },
            function handle2 (val, oldVal) { /* ... */ }
        ],
        // watch vm.e.f's value: {g: 5}
        'e.f': function (val, oldVal) { /* ... */ }
    }

};
</script>

<style scoped>
    /*顶级导航*/
    #top-bar ul li:hover,#top-bar ul li>a:hover{
        background: #649ada !important;
    }

    .nav li a{
        color: #fff;
    }
    .nav li a:focus{
        background: inherit !important;
    }
    .dot{
        display: inline-block;
        width: 1em;
        height: 1em;
        border-radius:50%;
        background: #5FBA5E;
        vertical-align: middle;
        margin-right: 1em;
    }
    /*二级导航*/
    #btm-bar{
        background: #f5f5f5;
        border-bottom: 1px solid #CCCCCA;
    }
    #btm-bar a{
        color: #888888 !important;
    }
    #btm-bar ul li>a:hover{
        color: black !important;
        background: none !important;
    }
    #btm-bar ul li{
        border-bottom: 2px solid #f5f5f5;
    }
    #btm-bar ul li:hover,#btm-bar .activeNavChild,#btm-bar .active-child{
        border-bottom: 2px solid #888888;
        background: none !important;
    }
    .bg-tc{
        background: #F5F5F5;
    }
    .child-pad-tb div{
        padding-top: 1em;
        padding-bottom: 1em;
    }
    /*公共*/
    .bg-top{
        background: #3A76BC;
    }
    .active-top{
        background: #649ada;
    }
    .m-top{
        margin-top: 1em;
    }
</style>
