<template>
    <div class="main-footer">
        <div class="container">
            <el-row type="flex" class="footer_row">
                <el-col :span="14">
                    版本：汇金智能-ripple-v1.0
                </el-col>
                <el-col :span="2">
                    帮助中心
                </el-col>
                <el-col :span="2">
                    报告问题
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Footer'
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .main-footer{
        padding: 2em auto;
    }
    .main-footer .container{
        border-top:1px solid #ccc;
    }
    .main-footer .footer_row{
        color: #8a8a86;
        padding: 1em 0 2em 0;
    }
</style>
