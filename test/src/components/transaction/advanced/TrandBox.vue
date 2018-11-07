<template>
  <div class="trand-box">
      <el-row class="title">
          <div class="grid-content bg-purple">
              {{flag}} rPT74sU… CNY104.99 XRP available
          </div>
      </el-row>
      <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign" class="trand-box-form">
          <el-form-item :label="flag" class="form-item">
              <el-input v-model="formLabelAlign.buyNum"></el-input>
              <div class="right-block">
                  <span>{{bcc.base}}</span>
                  <span>rPT74sU</span>
              </div>
          </el-form-item>
          <el-form-item label="单价">
              <el-input v-model="formLabelAlign.buyPrice"></el-input>
              <div class="right-block">
                  <span>{{bcc.counCurr}}</span>
                  <span>rPT74sU</span>
              </div>
          </el-form-item>
          <el-form-item label="本单(最多)价值">
              <el-input v-model="formLabelAlign.type"></el-input>
              <div class="right-block">
                  <span>{{bcc.counCurr}}</span>
                  <span>rPT74sU</span>
              </div>
          </el-form-item>
          <el-row class="msg">
              <el-col :span="24">
                  <span>
                      你想以 9 CNY 买入 1 XRP ( XRP 的单价为 4 CNY)
                  </span>
              </el-col>
          </el-row>
          <el-row>
              <el-col :span="24" class="btn-col">
                  <el-button class="btn enable">{{flag}} {{bcc.base}} (rPT74sU)</el-button>
              </el-col>
          </el-row>
      </el-form>
  </div>
</template>

<script>
export default {
    name: 'TrandBox',
    props: ['bcc', 'direction'],
    data () {
        return {
            labelPosition: 'top',
            formLabelAlign: {
                name: '',
                region: '',
                type: ''
            }
        };
    },
    computed: {
        flag: function () {
            if (this.direction === 'buy') {
                return '买入';
            }

            if (this.direction === 'sell') {
                return '卖出';
            }
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.trand-box{
    background: #FAFAFA !important;
    border: 1px solid #E6E6E6;
    padding-bottom: 1em;
}
.trand-box-form,.title{
    padding: 1em;
}
.title{
    background: #F2F2F2 !important;
    font-size: inherit !important;
}
.el-form-item__content>.el-input{
    width: 70% !important;
}
.el-input>.el-input__inner{
    /* border-top-right-radius: unset !important;
    border-bottom-right-radius: unset !important; */
}
.el-form-item__content>.right-block{
    display: inline-block;
    background: #CCCCCA;
    position: relative;
    font-size: 14px;
    top: 8px;
    width: 28%;
    padding: 0.3em 0;
    text-align: center;
    right: 4px;
}
.right-block>span{
    display: block;
    color: #ffffff;
    line-height: normal !important;
}
.btn-col{
    text-align: center;
}
.btn{
    display:inline-block;
}
.disabled-my{
    background: #CCCCCA;
    color: #fff;
}
.disabled-my:hover{
    cursor: auto !important;
}
.enable{
    background: #346AA9 !important;
    color: #fff;
}
.enable:hover{
    background: #22456E !important;
}
.msg{
    padding: 1em 0;
    color: #41A447 !important;
}
</style>
