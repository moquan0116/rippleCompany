<template>
    <div class="row" style="margin-top: 1.5em">
        <div class="alert" :class="[typeClass ? 'alert-'+typeClass : 'alert-info']" role="alert">
            <p>
                {{text}}
            </p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Hint',
    data () {
        return {
            parentStyle: this.typeClass
        };
    },
    props: {
        text: {
            default: '您的Ripple帐户没有激活。要激活它，您需要发送至少20个XRP到()。'
        },
        typeClass: {
            require: false // warning、success、info、danger
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.alert-info p{
    text-indent: 2em;
}
</style>
