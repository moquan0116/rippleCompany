<template>
    <div class="box">
        <div class="box-header">
        </div>
        <div class="box-body">
            <div class="row m-top">
                <div class="title col-xs-7">
                    <label class="col-xs-2">事务ID</label>
                    <div class="col-xs-10 info">
                        <span>{{id}}</span>
                    </div>
                </div>
                <div class="title col-xs-3">
                    <label class="col-xs-6">货币数量</label>
                    <div class="col-xs-6 info">
                        <span>{{value}}</span>
                    </div>
                </div>
                <div class="title col-xs-2">
                    <label class="col-xs-8">货币类型</label>
                    <div class="col-xs-4 info">
                        <span>{{currency}}</span>
                    </div>
                </div>
            </div>
            <div class="row m-top">
                <div class="title col-xs-7">
                    <label class="col-xs-2">转出地址</label>
                    <div class="col-xs-8 info">
                        <span>{{outAddress}}</span>
                    </div>
                </div>
                <div class="title col-xs-4">
                    <label class="col-xs-4">资金变动</label>
                    <div class="col-xs-6 info">
                        <span>{{outAddressValue}}</span>
                    </div>
                </div>
            </div>
            <div class="row m-top">
                <div class="title col-xs-7">
                    <label class="col-xs-2">接收地址</label>
                    <div class="col-xs-6 info">
                        <span>{{receiveAddress}}</span>
                    </div>
                </div>
                <div class="title col-xs-4">
                    <label class="col-xs-4">资金变动</label>
                    <div class="col-xs-6 info">
                        <span>{{receAddressValue}}</span>
                    </div>
                </div>
            </div>
            <!--<form>
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
                            <td></td>
                            <td>{{outAddress}}</td>
                            <td>{{currency}}</td>
                            <td>{{value}}</td>
                            <td>{{receiveAddress}}</td>
                        </tr>
                    </tbody>
                </table>
            </form>-->
        </div>
        <div class="box-footer">
        </div>
    </div>

</template>

<script>
export default {
    name: 'RecordInfo',
    props: ['outAddress', 'id', 'currency', 'value', 'receiveAddress', 'outAddressValue', 'receAddressValue'],
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
.m-top{
    margin-top: 2em;
}
</style>
