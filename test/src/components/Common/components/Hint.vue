<template>
    <div class="row" style="margin-top: 1.5em">
        <div class="alert alert-info" role="alert">
            <p>
                {{set.text}}
            </p>
            <p>
                {{$store.state.test}}
            </p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Hint',
    props: {
        set: {
            type: Object,
            default () {
                return {text: '您的Ripple帐户没有激活。要激活它，您需要发送至少20个XRP到()。'};
            }
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
