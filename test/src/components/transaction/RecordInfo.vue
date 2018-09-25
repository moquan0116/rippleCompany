<template>
    <div class="box">
        <div class="box-header">
        </div>
        <div class="box-body">
            <form>
                <table class="table table-bordered">
                    <thead>
                    <tr>
                        <th>序号</th>
                        <th>事务ID</th>
                        <th>转出地址</th>
                        <th>货币类型</th>
                        <th>货币数量</th>
                        <th>接收地址</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>{{id}}</td>
                            <td>{{outAddress}}</td>
                            <td>{{currency}}</td>
                            <td>{{value}}</td>
                            <td>{{receiveAddress}}</td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
        <div class="box-footer">
        </div>
    </div>

</template>

<script>
export default {
    name: 'RecordInfo',
    props: ['outAddress', 'id', 'currency', 'value', 'receiveAddress', 'test'],
    /* data () {
        return {
            destination: {}
        };
    }, */
    created: function () {
        console.log(this.test);
    }
};
</script>

<style>
/* .vl-notify-content{
    min-height: 600px !important;
    overflow: auto !important;
} */
</style>
