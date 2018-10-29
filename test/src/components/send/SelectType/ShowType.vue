<template>
  <div class="show-type">
      <el-row :gutter="20">
          <el-col :span="6">
              <el-form-item label="对方将收到" :error="error">
                  <el-input v-model="num" class="width-full"></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="12">
              <el-form-item label="货币类型">
                  <el-select v-model="value" placeholder="请选择" class="gateway-select width-full">
                      <el-option
                              v-for="item in trustlines"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                      </el-option>
                  </el-select>
              </el-form-item>
          </el-col>
      </el-row>
  </div>
</template>

<script>
// import WAValidator from 'wallet-address-validator';
export default {
    name: 'ShowType',
    props: ['address', 'addressError'],
    data () {
        return {
            trustlines: [
                {
                    value: 'XRP',
                    label: 'XRP - Ripples'
                },
                {
                    value: 'CNY',
                    label: 'CNY - Chinese Yuan'
                }
            ],
            value: 'XRP',
            num: '',
            error: ''
        };
    },
    watch: {
        address: function (newVal, oldVal) {
            if (this.addressError.length <= 0) {
                console.log(newVal);
            }
        },
        num: function (newVal, oldVal) {
            let toVal = newVal;
            if (!this.checkNum(newVal)) { // 验证num通过
                toVal = -1;
            }
            this.$emit('numValue', toVal);
        }
    },
    methods: {
        checkNum: function (num) {
            if (num === '') {
                this.error = '';
                return false;
            }

            let rule = /^[1-9]\d*$/;
            if (!rule.test(num)) {
                this.error = '不正确的金额值';
                return false;
            }

            return true;
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
