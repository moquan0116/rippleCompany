<template>
    <div id="nav-top">
        <div class="bg-top" id="top-bar">
            <div class="container">
                <div class="row child-pad-tb top">
                    <ul class="nav nav-pills col-md-7">
                        <router-link tag="li" v-for="(item,$key) in navTopItemsLeft"  @click.native="selected($key)" v-bind:key="$key" :to="$key" :class="{'active-top':currentRoute === $key }">
                            <a href="#">{{item}}</a>
                        </router-link>
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
        <div class="bg-top-child bg-tc" id="btm-bar">
            <div class="container">
                <div class="row child-pad-tb top">
                    <ul class="nav nav-pills col-md-7">
                        <router-link role="presentation" tag="li"  v-for="(navChild,$key) in currTopItemChild" v-bind:key="$key" @click.native="selectedChild($key)" :to="{path:'/'+ currentRoute +'/'+ $key}" :class="{'active-child':activeChild === $key }">
                            <a href="#">{{navChild}}</a>
                        </router-link>
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
            currentRoute: '',
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
            // console.log(this.$route.currentRoute);
            /* var selected = this.navTopItemChild[index];
            this.currTopItemChild = selected;
            this.active = index;
            if (typeof selected !== 'undefined') {
                this.activeChild = Object.keys(selected)[0];
                this.$router.push(this.activeChild);
            } else {
                this.activeChild = '';
                this.$router.push('notFound');
            }
            console.log(this.$root.currentRoute); */
            this.currentRoute = index;
            this.currTopItemChild = this.navTopItemChild[this.currentRoute];
        },
        selectedChild: function (key) {
            this.activeChild = key;
            console.log(this.currentRoute);
        }
    },
    created: function () {
        this.currentRoute = this.active;
        this.currTopItemChild = this.navTopItemChild[this.currentRoute];
        /* console.log(this.currentRoute);
        var selected = this.navTopItemChild[this.active];
        this.rip = this.$root.rip;
        this.currTopItemChild = selected;
        if (typeof selected !== 'undefined') {
            this.activeChild = Object.keys(selected)[0];
            this.$router.push(this.activeChild);
        } else {
            this.activeChild = '';
            this.$router.push('notFound');
        } */
        /* this.$http.get('/api/test').then(function (response) {
            console.log(response);
        }); */
    }
    /* watch: {
        '$route': function (to, from) {
            var key = to.path.substr(1);
            if (key in this.navTopItemChild) {
                this.currTopItemChild = this.navTopItemChild[to.path.substr(1)];
                this.currentRoute = key;
            }
        }
    } */
};
</script>

<style scoped>
    /*顶级导航*/
    #top-bar ul li:hover,#top-bar ul li>a:hover{
        background: #649ada !important;
    }
    .router-link-active{
        color: red;
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
