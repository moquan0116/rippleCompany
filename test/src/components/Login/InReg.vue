<template>
    <div class="row">
        <div class="reg-box" v-if="isShow === false">
            <el-row>
                <el-button v-on:click="showDialog">打开一个空账户</el-button>
            </el-row>
            <el-row>
                <el-button type="primary" v-on:click="seedCreate">通过秘钥创建一个新账户</el-button>
            </el-row>
        </div>
        <div class="reg-box" v-else-if="isShow === 1">
            <PassEncryption v-on:off="resetShow" :path=path></PassEncryption>
        </div>
        <div class="reg-box" v-else-if="isShow === 2">
            <SeedEncryption v-on:off="resetShow" :path=path></SeedEncryption>
        </div>
    </div>
</template>

<script>
import PassEncryption from './PassEncryption';
import SeedEncryption from './SeedEncryption';
export default {
    name: 'InReg',
    data () {
        return {
            path: false,
            defaultFileName: 'huijin.txt',
            isShow: false
        };
    },
    components: {
        PassEncryption,
        SeedEncryption
    },
    methods: {
        resetShow: function () {
            this.isShow = false;
        },
        showDialog: function () {
            this.$GLOBAL.ipc.send('save-dialog', this.defaultFileName);
            this.$GLOBAL.ipc.on('in-reg', (event, path) => {
                if (path) {
                    this.isShow = 1;
                    this.path = path;
                }
            });
        },
        seedCreate: function () {
            this.isShow = 2;
        }
    }
};
</script>

<style scoped>
.reg-box{
    padding: 1em 2em 2em 2em;
}
.reg-box .el-row{
    margin-top: 2em;
}
.reg-box .el-button{
    width: 100%;
}
.info-box{
    margin-top: 1em;
    color: #1F1F1E;
}
</style>
