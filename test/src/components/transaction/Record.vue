<template>
  <div class="strut">
     <!--<div class="row">
         <div class="form-group">
             <label for="inputPassword3" class="col-xs-3 control-label">供应商名称</label>
             <div class="col-xs-9">
                 <input type="text" class="form-control" name="agent_name" value="暂测试" required="" placeholder="供应商名称" aria-required="true" readonly="readonly">
             </div>
         </div>
     </div>-->
      <div class="box">
          <div class="box-header">
              <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline">
                  <el-form-item label="事务ID">
                      <el-input v-model="formInline.id" placeholder="事务ID"></el-input>
                  </el-form-item>
                  <el-form-item label="类型">
                      <el-select v-model="formInline.type" placeholder="交易类型">
                          <el-option label="payment" value="付款"></el-option>
                          <el-option label="aaa" value="beijing"></el-option>
                      </el-select>
                  </el-form-item>
                  <el-form-item>
                      <el-button type="primary" @click="onSubmit('formInline')">查询</el-button>
                      <el-button type="warning" @click="onReset('formInline')">重置</el-button>
                  </el-form-item>
              </el-form>
             <!-- <div class="row">
                  <div class="col-xs-6">
                      <div class="input-group">
                          <span class="input-group-addon">交易查询</span>
                          <input type="text" class="form-control" title="支持模糊匹配" placeholder="交易hash值" name="keyword" value="">
                      </div>
                  </div>
                  <div class="col-xs-2">
                      <div class="input-group">
                          <span class="input-group-addon">类型</span>
                          <select class="form-control" name="agent_type_id">
                              <option value="">请选择</option>
                              <option value="1"> 付款 </option>
                              <option value="2"> 订单 </option>
                          </select>
                      </div>
                  </div>
                  <div class="col-xs-2">
                      <div class="input-group">
                          <span class="input-group-addon">结果</span>
                          <select class="form-control" name="agent_type_id">
                              <option value="">请选择</option>
                              <option value="1"> 成功 </option>
                              <option value="2"> 失败 </option>
                          </select>
                      </div>
                  </div>
                  <div class="col-xs-2">
                      <div class="btn-group" role="group" aria-label="...">
                          <button type="button" class="btn btn-info">
                              <i class="glyphicon glyphicon-search"></i>
                              查询
                          </button>
                      </div>
                      <div class="btn-group" role="group" aria-label="...">
                          <button type="button" class="btn btn-warning">
                              <i class="glyphicon glyphicon-repeat"></i>
                              重置
                          </button>
                      </div>
                  </div>
              </div>-->
          </div>
          <div class="box-body">
              <!--<form>
                  <table class="table table-bordered">
                      <thead>
                      <tr>
                          <th>序号</th>
                          <th>交易账户</th>
                          <th>账户序号</th>
                          <th>交易类型</th>
                          <th>交易结果</th>
                          <th>交易费用</th>
                          <th>账目版本</th>
                          <th>账目索引</th>
                          <th>操作</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr v-for="(data,key) in tranInfo" v-bind:key="key">
                          <td>{{key+=1}}</td>
                         &lt;!&ndash; <td>{{data.id}}</td>&ndash;&gt;
                          <td>
                              <a @click="see(data)">{{data.address}}</a>
                          </td>
                          <td>{{data.sequence}}</td>
                          <td>
                              <span v-if="data.type == 'payment'">付款</span>
                          </td>
                          <td>
                              <span :class="{'label-success':data.outcome.result == 'tesSUCCESS'}" class="label">成功</span>
                          </td>
                          <td>{{data.outcome.fee}}</td>
                          <td>{{data.outcome.ledgerVersion}}</td>
                          <td>{{data.outcome.indexInLedger}}</td>
                          <td>
                              <div class="btn-group">
                                  <a class="btn btn-primary btn-sm" @click="see(data)" title="查看详情">
                                      查看
                                  </a>
                              </div>
                          </td>
                      </tr>
                      </tbody>
                  </table>
              </form>-->
              <el-table
                      :data="tableData"
                      border
                      :height="1100"
                      style="width: 100%">
                  <el-table-column
                          prop="num"
                          label="序号"
                          width="80">
                  </el-table-column>
                  <el-table-column
                          prop="address"
                          label="交易账户"
                          width="380">
                  </el-table-column>
                  <el-table-column
                          prop="type"
                          label="类型"
                          width="80">
                  </el-table-column>
                  <el-table-column
                          prop="fee"
                          label="费用"
                          width="180">
                  </el-table-column>
                  <el-table-column
                          prop="result"
                          label="结果"
                          width="180">
                  </el-table-column>
                  <el-table-column
                          prop="version"
                          label="版本"
                          width="180">
                  </el-table-column>
                  <el-table-column
                          prop="time"
                          label="日期"
                          width="200">
                  </el-table-column>
                  <el-table-column label="操作">
                      <template slot-scope="scope">
                          <el-button
                                  type="info"
                                  size="mini"
                                  @click="handleEdit(scope.$index, scope.row)">查看</el-button>
                      </template>
                  </el-table-column>
              </el-table>
          </div>
          <pulse-loader class="testLoad" :loading="isLoading" :color="color"></pulse-loader>
          <div class="box-footer">
              <!--<div class="row text-center">
                  <ul class="pagination pagination-sm no-margin">
                      <li class="active" @click="prev">
                          <a href="https://nbadmin.wenlongli.com/admin.php/workflow/main/agent_list?keyword=&amp;agent_type_id=&amp;page=1#">首页</a>
                      </li>
                      <li class="disabled">
                          <a v-on:click="prev">上一页</a>
                      </li>
                      <li><span>1/3</span></li>
                      <li>
                          <a @click="next">下一页</a>
                      </li>
                      <li class=""><a href="https://nbadmin.wenlongli.com/admin.php/workflow/main/agent_list?keyword=&amp;agent_type_id=&amp;page=3#">尾页</a></li>
                  </ul>
              </div>-->
          </div>
      </div>
  </div>
</template>

<script>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import RecordInfo from './RecordInfo.vue';
export default {
    name: 'Record',
    data () {
        return {
            firstTran: '',
            lastTran: '',
            tranInfo: [],
            tranParams: {limit: 20},
            page: '',
            isLoading: true,
            color: '#3a76bc',
            serverInfo: '',
            tableData: [],
            border: false,
            formInline: {
                id: '',
                type: ''
            }
        };
    },
    components: {
        PulseLoader
    },
    methods: {
        prev: function () {
            this.isLoading = true;
            // console.log(this.firstTran);
            this.getTrans(this.firstTran);
        },
        next: function () {
            this.isLoading = true;
            this.getTrans(this.lastTran);
        },
        getTrans: function (params) {
            const self = this;
            const api = this.getRippleApi();
            api.connect().then(function () {
                return api.getServerInfo().then(info => {
                    self.serverInfo = info;
                }).then(serverInfo => {
                    return api.getTransactions(self.$root.rip.walletAddress, params);
                });
            }).then(function (tranInfo) {
                // console.log(tranInfo);
                self.tranInfo = tranInfo;
                self.formatTableData(tranInfo);
                self.firstTran = tranInfo[0].id;
                self.lastTran = tranInfo[tranInfo.length - 1].id;
                self.isLoading = false;
            }).catch(function (error) {
                // 需要指定版本范围 minLedgerVersion  maxLedgerVersion
                if (error instanceof api.errors.MissingLedgerHistoryError) {
                    var ledgers = self.serverInfo.completeLedgers.split('-');
                    self.tranParams.minLedgerVersion = parseInt(ledgers[0]);
                    self.tranParams.maxLedgerVersion = parseInt(ledgers[1]);
                    setTimeout(self.getTrans(self.tranParams), 1000);
                }

                // 交易不在最新验证分类帐中 minLedgerVersion  maxLedgerVersion
                if (error instanceof api.errors.PendingLedgerVersionError) {
                    console.log('交易不在最新验证分类帐中');
                }
                return error;
            });
        },
        getTran: function (params) {
            console.log(params);
            const self = this;
            const api = this.getRippleApi();
            api.connect().then(function () {
                return api.getTransaction(params);
            }).then(function (tranInfo) {
                self.tranInfo = tranInfo;
                self.formatTableData(tranInfo);
                self.firstTran = tranInfo[0].id;
                self.lastTran = tranInfo[tranInfo.length - 1].id;
                self.isLoading = false;
            }).catch(function (error) {
                // 需要指定版本范围 minLedgerVersion  maxLedgerVersion
                if (error instanceof api.errors.MissingLedgerHistoryError) {
                    var ledgers = self.serverInfo.completeLedgers.split('-');
                    self.tranParams.minLedgerVersion = parseInt(ledgers[0]);
                    self.tranParams.maxLedgerVersion = parseInt(ledgers[1]);
                    setTimeout(self.getTrans(self.tranParams), 1000);
                }

                // 交易不在最新验证分类帐中 minLedgerVersion  maxLedgerVersion
                if (error instanceof api.errors.PendingLedgerVersionError) {
                    console.log('交易不在最新验证分类帐中');
                }
                return error;
            });
        },
        formatTableData: function (tranInfo) {
            console.log(tranInfo);
            if (tranInfo.length) { // 多条时
                tranInfo.forEach((value, index, arr) => {
                    let tr = {
                        num: index += 1,
                        type: value.type,
                        address: value.address,
                        fee: value.outcome.fee,
                        result: value.outcome.result,
                        time: value.outcome.timestamp,
                        version: value.outcome.ledgerVersion
                    };
                    this.tableData.push(tr);
                });
            }

            if (typeof tranInfo === 'object' && tranInfo.length === undefined) { // 单条时
                let tr = {
                    num: 1,
                    type: tranInfo.type,
                    address: tranInfo.address,
                    fee: tranInfo.outcome.fee,
                    result: tranInfo.outcome.result,
                    time: tranInfo.outcome.timestamp,
                    version: tranInfo.outcome.ledgerVersion
                };
                this.tableData.push(tr);
            }
        },
        see: function (data) {
            // console.log(data);
            this.$layer.open({
                type: 2,
                title: '信息',
                shadeClose: true,
                shade: 0.8,
                area: ['1200px', '700px'],
                content: {
                    content: RecordInfo, // 传递的组件对象
                    parent: this, // 当前的vue对象
                    data: {
                        id: data.id, // 事务ID
                        outAddress: data.specification.source.address, // 转出地址
                        currency: data.specification.source.maxAmount.currency, // 货币类型
                        value: data.specification.source.maxAmount.value, // 货币数量
                        receiveAddress: data.specification.destination.address, // 接收地址
                        outAddressValue: data.outcome.balanceChanges[data.specification.source.address][0]['value'], // 余额变动值
                        receAddressValue: data.outcome.balanceChanges[data.specification.destination.address][0]['value'] // 余额变动值
                    }
                }
            });
        },
        test: function (obj) {
            if (typeof obj !== 'object') {
                return obj;
            }
            var newobj = {};
            for (var attr in obj) {
                newobj[attr] = this.test(obj[attr]);
            }
            return newobj;
        },
        handleEdit: function () {

        },
        handleDelete: function () {

        },
        onSubmit (formName) {
            this.tableData = [];
            this.getTran(this.formInline.id);
            // console.log(this.tableData);
        },
        onReset (formName) {
            this.$refs[formName].resetFields();
        }
    },
    watch: {
        '$router': function (to, from) {
            console.log(to);
        }
    },
    created: function () {
        // this.page = this.$router.currentRoute.query.page;
        this.getTrans(this.tranParams);
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .strut{
        position: relative;
        left: -10em;
        width: 110em;
    }
    .box{
        border-top: 3px solid #d2d6de;
        margin-bottom: 20px;
        width: 100%;
    }
    .box .box-body{
        border-top-left-radius: 0;
        border-top-right-radius: 0;
        border-bottom-right-radius: 3px;
        border-bottom-left-radius: 3px;
        padding: 10px;
        min-height: 20%;
    }
    .box .box-header{
        border-bottom: 1px solid #f4f4f4;
        display: block;
        padding: 10px;
    }
    .input-group .input-group-addon {
        border-radius: 0;
        border-color: #d2d6de;
        background-color: #fff;
    }
    .input-group input,.input-group select{
        border-radius: 0 !important;
    }
    .query-button{
        padding-left: 0 !important;
        padding-right: 0 !important;
    }
    .testLoad{
        position: absolute;
        left: 50em;
        top: 28em;
    }
    td a:hover{
        cursor: pointer;
    }
</style>
