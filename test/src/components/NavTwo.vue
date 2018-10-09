<template>
    <div id="nav-top">
        <div class="bg-top" id="top-bar">
            <div class="container">
                <div class="row child-pad-tb top">
                    <ul class="nav nav-pills col-md-6">
                        <router-link tag="li" v-for="(item,$key) in navTopItemsLeft"  @click.native="selected($key)" v-bind:key="$key" :to="{path:'/' + $key}" :class="{'active-top':currentOneRoute === $key }">
                            <a href="#">{{item}}</a>
                        </router-link>
                    </ul>
                    <ul class="nav nav-pills col-md-6 behind">
                        <li role="presentation">
                            <a href="#">
                                <i class="dot"></i>
                                <span>{{user}}</span>
                            </a>
                        </li>
                        <li role="presentation">
                            <a href="#">
                                <i class="el-icon-bell" style="font-size:1.2em;color: #fff"></i>
                            </a>
                        </li>
                        <li role="presentation">
                            <a>
                                <!--<i class="el-icon-setting" style="font-size:1.2em;"></i>-->
                                <el-dropdown trigger="click" @command="handleCommand">
                                    <span class="el-dropdown-link">
                                        <i class="el-icon-setting" style="font-size:1.2em;color: #fff"></i>
                                    </span>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item command="settings">设置</el-dropdown-item>
                                        <el-dropdown-item command="logout">退出</el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <!--二级导航-->
        <div class="bg-top-child bg-tc" id="btm-bar">
            <div class="container">
                <div class="row child-pad-tb top">
                    <ul class="nav nav-pills col-md-7">
                        <router-link role="presentation" tag="li"  v-for="(navChild,$key) in currTopItemChild" v-bind:key="$key" :to="{path:'/'+ currentOneRoute +'/'+ $key}" :class="{'active-child':$route.path === '/'+ currentOneRoute +'/'+ $key }">
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
            currentOneRoute: '',
            navTopItemsLeft: {
                general: '概况',
                send: '发送',
                transaction: '交易',
                funds: '资金'
            },
            navTopItemChild: {
                general: {host: '服务器', balance: '余额', history: '历史', phone: '联系人'},
                // send: {not: '...'},
                transaction: {basic: '基本', record: '记录', advanced: '高级'}
                // funds: {not: '...'}
            },
            currTopItemChild: [],
            rip: '',
            user: JSON.parse(localStorage.getItem('user')).address
        };
    },
    methods: {
        selected: function (index) {
            this.currentOneRoute = index;
            this.currTopItemChild = this.navTopItemChild[this.currentOneRoute];
        },
        handleCommand: function (command) {
            if (command === 'logout') {
                this.logOut();
            }
        },
        logOut: function () {
            localStorage.removeItem('user');
            this.$router.push({path: '/login'});
        }
    },
    created: function () {
        this.currentOneRoute = this.$router.currentRoute.path.split('/')[1];
        this.currTopItemChild = this.navTopItemChild[this.currentOneRoute];
    }
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
    .el-dropdown{
        padding: 0 !important;
    }
</style>
