<template>
    <div class="loading" v-if="status === true">
        <el-row :gutter="10">
            <el-col :span="2" >
                <div class="grid-content bg-purple">
                    <div class="" v-loading="true"></div>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="grid-content bg-purple">
                    <span>{{text}}</span>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name: 'Loading',
    props: {
        status: {
            default: 0
        },
        text: {
            default: '正在计算其它路径...'
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.loading{
    margin-top: 2em;
}
.loading .el-loading-spinner{
    margin-top: 0 !important;
}
.loading .el-col{
    height: 3em !important;
}
.loading .el-col>div{
    line-height: 3em;
}
</style>
