<template>
    <div class="box" style="width: 100%">
        <div class="box-header">
        </div>
        <div class="box-footer">
        </div>
    </div>

</template>

<script>
export default {
    name: 'RecordInfo',
    // props: ['outAddress', 'id', 'currency', 'value', 'receiveAddress', 'outAddressValue', 'receAddressValue'],
    props: ['tran'],
    /* data () {
        return {
            destination: {}
        };
    }, */
    created: function () {
        console.log(this.tran);
    }
};
</script>

<style>
.m-top{
    margin-top: 2em;
}
.el-message-box{
    width: 1200px !important;
}
</style>
