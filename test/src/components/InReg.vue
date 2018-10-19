<template>
    <div class="row">
        <div class="reg-box" v-if="isShow === false">
            <el-row>
                <el-button v-on:click="showDialog">打开一个空账户</el-button>
            </el-row>
            <el-row>
                <el-button type="primary">通过秘钥创建一个新账户</el-button>
            </el-row>
        </div>
        <div class="reg-box" v-else>
            <Encryption :path=path></Encryption>
        </div>
    </div>
</template>

<script>
import Encryption from './Encryption';
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
        Encryption
    },
    methods: {
        showDialog: function () {
            this.$GLOBAL.ipc.send('save-dialog', this.defaultFileName);
            this.$GLOBAL.ipc.on('in-reg', (event, path) => {
                if (path) {
                    this.isShow = true;
                    this.path = path;
                }
            });
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
