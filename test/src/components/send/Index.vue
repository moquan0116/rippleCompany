<template>
  <div class="send-index">
      <el-form :label-position="labelPosition" ref="formLabelAlign" label-width="80px" :model="formLabelAlign">
          <el-row>
              <el-col :span="12">
                  <el-form-item label="接收方" :error="error">
                      <el-input placeholder="Enter a Ripple Address or contract" v-model="formLabelAlign.address"></el-input>
                  </el-form-item>
              </el-col>
          </el-row>
          <show-type v-if="off === false" :address="address" :addressError="error" v-on:numValue="numValue"></show-type>
          <el-row>
              <el-col :span="12"></el-col>
          </el-row>
          <el-row>
              <el-col :span="6">
                  <el-button class="width-full" v-if="btn === true">发送XRP</el-button>
                  <el-button class="width-full" v-else disabled="">发送XRP</el-button>
              </el-col>
          </el-row>
      </el-form>
  </div>
</template>

<script>
import WAValidator from 'wallet-address-validator';
import ShowType from './SelectType/ShowType';
export default {
    name: 'Index',
    data () {
        return {
            labelPosition: 'top',
            formLabelAlign: {
                address: '',
                num: ''
            },
            btn: false,
            error: '',
            off: true
        };
    },
    created: function () {
    },
    computed: {
        address () {
            return this.formLabelAlign.address;
        }
    },
    watch: {
        address: function (newVal, oldVal) {
            if (WAValidator.validate(newVal, 'XRP')) {
                this.error = '';
                this.off = false;
            } else {
                this.error = '无效的ripple地址';
            }
        }
    },
    methods: {
        numValue: function (value) {
            this.formLabelAlign.num = value;
            this.btn = true;
            if (value === -1) {
                this.btn = false;
                this.formLabelAlign.num = '';
            }
        }
    },
    components: {
        ShowType
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.send-index{
    margin-bottom: 2em;
}
.width-full{
    width:100%;
}
</style>
