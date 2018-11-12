<template>
    <div class="send-box" style="margin-top: 2em">
        <el-row :gutter="12">
            <div v-for="item in cardData" :key="item.id">
                <el-col :span="8">
                    <el-card shadow="hover" :body-style="{ padding: '0px' }">
                        <el-card>
                            <div class="text item primary-rip">
                                <span class="title">{{item.value}}</span>
                                <span class="content">{{item.currency}}</span>
                            </div>
                            <div class="text item primary-rip">
                                <span class="memo">({{item.value}} {{item.flag}}/{{item.currency}})</span>
                            </div>
                        </el-card>
                        <el-card :body-style="{ padding: '0px'}">
                            <div class="text item">
                                <el-button class="reset-btn" v-on:click="sendConfirm(item)">Exchange {{item.currency}}</el-button>
                            </div>
                        </el-card>
                    </el-card>
                </el-col>
            </div>
        </el-row>
    </div>
</template>

<script>
export default {
    name: 'SendCny',
    props: ['sendPath'],
    data () {
        return {
            cardData: ''
        };
    },
    created: function () {
        this.format(this.sendPath);
    },
    watch: {
        sendPath: function (newVal, oldVal) {
            if (newVal.hasOwnProperty('length') && newVal.length) {
                this.format(newVal);
            } else {
                this.cardData = '';
            }
        }
    },
    methods: {
        format: function (data) {
            const that = this;
            that.cardData = [];
            data.forEach(function (item, key) {
                let temp = {
                    id: key,
                    value: parseFloat(item.source.maxAmount.value).toFixed(4),
                    currency: item.source.maxAmount.currency,
                    flag: item.destination.amount.currency,
                    original: item
                };
                that.cardData.push(temp);
            });
            this.loading = false;
        },
        sendConfirm: function (data) {
            this.$emit('sendConfirm', data);
        }
    }

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.reset-btn{
    width: 100% !important;
    border: none !important;
    background: #346AA9 !important;
    border-radius: unset !important;
    color: #fff !important;
    letter-spacing: 0.1em;
}
.reset-btn:hover{
    background: #22456E !important;
}
.primary-rip {
    text-align: center !important;
}
.title,.content,.memo{
    font-weight: normal !important;
}
.title {
    font-size: 2.2em;
    color: black;
}
.content{
    font-size: 2em;
    color: #8F93B4;
}
.memo{
    font-size: 1em;
    color: #8F93B4;
}
</style>
