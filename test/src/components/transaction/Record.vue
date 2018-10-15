<template>
  <div class="strut">
      <div class="box">
          <div class="box-header">
              <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline">
                  <el-form-item label="事务ID">
                      <el-input v-model="formInline.id" placeholder="事务ID"></el-input>
                  </el-form-item>
                  <el-form-item label="类型">
                      <el-select v-model="formInline.types" placeholder="交易类型">
                          <el-option label="请选择" value=""></el-option>
                          <el-option label="付款" value='payment'></el-option>
                          <el-option label="订单" value='order'></el-option>
                      </el-select>
                  </el-form-item>
                  <el-form-item>
                      <el-button type="primary" @click="onSubmit('formInline')">查询</el-button>
                      <el-button type="warning" @click="onReset('formInline')">重置</el-button>
                  </el-form-item>
              </el-form>
          </div>
          <div class="box-body">
              <el-table
                      @row-click="clickRow"
                      ref='moviesTable'
                      :data="tableData"
                      :height="1100"
                      border
                      v-loading="isLoading"
                      element-loading-text="没加缓存呢，稍等会儿啊"
                      element-loading-spinner="el-icon-loading"
                      element-loading-background="rgba(0, 0, 0, 0.8)"
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
                          align="center"
                          width="200">
                  </el-table-column>
                  <el-table-column label="操作">
                      <template slot-scope="scope">
                          <el-button
                                  type="info"
                                  size="mini"
                                  slot="reference"
                                  @click="seeTranInfo(scope.$index, scope.row)">查看</el-button>
                      </template>
                  </el-table-column>
              </el-table>
              <div style="margin-top: 20px">
                  <el-row>
                      <el-col :span="24" :offset="10">
                          <el-button @click="showNextMore">显示更多</el-button>
                      </el-col>
                  </el-row>
              </div>
              <el-dialog title="交易详情" :visible.sync="dialogFormVisible">
                  <el-form :model="form">
                      <el-row :gutter="20">
                          <el-col :span="24">
                              <el-form-item label="事务ID" :label-width="formLabelWidth">
                                  <el-input v-model="form.id" autocomplete="off"></el-input>
                              </el-form-item>
                          </el-col>
                      </el-row>
                      <el-row>
                          <el-col :span="6">
                              <el-form-item label="货币类型" :label-width="formLabelWidth">
                                  <el-input v-model="form.currency" autocomplete="off"></el-input>
                              </el-form-item>
                          </el-col>
                          <el-col :span="6">
                              <el-form-item label="货币数量" :label-width="formLabelWidth">
                                  <el-input v-model="form.value" autocomplete="off"></el-input>
                              </el-form-item>
                          </el-col>
                      </el-row>
                      <el-row>
                          <el-col :span="12">
                              <el-form-item label="转出地址" :label-width="formLabelWidth">
                                  <el-input v-model="form.outAddress" autocomplete="off"></el-input>
                              </el-form-item>
                          </el-col>
                          <el-col :span="6">
                              <el-form-item label="货币数量" :label-width="formLabelWidth">
                                  <el-input v-model="form.outAddressValue" autocomplete="off"></el-input>
                              </el-form-item>
                          </el-col>
                      </el-row>
                      <el-row>
                          <el-col :span="12">
                              <el-form-item label="接收地址" :label-width="formLabelWidth">
                                  <el-input v-model="form.receiveAddress" autocomplete="off"></el-input>
                              </el-form-item>
                          </el-col>
                          <el-col :span="6">
                              <el-form-item label="货币数量" :label-width="formLabelWidth">
                                  <el-input v-model="form.receAddressValue" autocomplete="off"></el-input>
                              </el-form-item>
                          </el-col>
                      </el-row>
                  </el-form>
                  <div slot="footer" class="dialog-footer">
                      <el-button @click="dialogFormVisible = false">关闭</el-button>
                  </div>
              </el-dialog>
          </div>
          <div class="box-footer">
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
            walletAddress: JSON.parse(sessionStorage.getItem('user')).address,
            secret: JSON.parse(sessionStorage.getItem('user')).password,
            firstTran: '',
            lastTran: '',
            lastIndex: 0,
            tranInfo: [],
            tranParams: {limit: 20},
            page: '',
            isLoading: false,
            color: '#3a76bc',
            serverInfo: '',
            tableData: [],
            appendTableData: [],
            border: false,
            formInline: {
                id: '',
                types: ''
            },
            'visible-arrow': false,
            dialogFormVisible: false,
            form: {},
            formLabelWidth: '120px',
            tranType: {
                payment: '支付',
                order: '订单'
            },
            tranResult: {
                tesSUCCESS: '支付'
            }
        };
    },
    components: {
        PulseLoader,
        RecordInfo
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
                    return api.getTransactions(self.walletAddress, params);
                });
            }).then(function (tranInfo) {
                self.tranInfo = tranInfo;
                self.formatTableData(tranInfo);
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
            const self = this;
            const api = this.getRippleApi();
            api.connect().then(function () {
                return api.getTransaction(params);
            }).then(function (tranInfo) {
                self.tranInfo = tranInfo;
                self.formatTableData(tranInfo);
            }).catch(function (error) {
                // 需要指定版本范围 minLedgerVersion  maxLedgerVersion
                if (error instanceof api.errors.MissingLedgerHistoryError) {
                    var ledgers = self.serverInfo.completeLedgers.split('-');
                    self.tranParams.minLedgerVersion = parseInt(ledgers[0]);
                    self.tranParams.maxLedgerVersion = parseInt(ledgers[1]);
                    setTimeout(self.getTran(self.tranParams), 1000);
                }

                // 交易不在最新验证分类帐中 minLedgerVersion  maxLedgerVersion
                if (error instanceof api.errors.PendingLedgerVersionError) {
                    console.log('交易不在最新验证分类帐中');
                }
                return error;
            });
        },
        formatTableData: function (tranInfo) {
            let self = this;
            this.isLoading = false;
            if ('start' in this.tranParams) {
                if (tranInfo.length) { // 多条时
                    tranInfo.forEach((value, index, arr) => {
                        let tr = {
                            num: self.lastIndex += 1,
                            type: self.tranType[value.type],
                            address: value.address,
                            fee: value.outcome.fee,
                            result: (value.outcome.result === 'tesSUCCESS') ? '成功' : '未成功',
                            time: self.dateFormat(value.outcome.timestamp, 'UTC'),
                            version: value.outcome.ledgerVersion,
                            original: value
                        };
                        this.tableData.push(tr);
                    });
                    this.lastTran = tranInfo[tranInfo.length - 1].id;
                }
            } else {
                if (!Object.keys(tranInfo).length) {
                    this.tableData = [];
                    this.lastTran = null;
                } else {
                    if (tranInfo.length) { // 多条时
                        tranInfo.forEach((value, index, arr) => {
                            let tr = {
                                num: self.lastIndex += 1,
                                type: self.tranType[value.type],
                                address: value.address,
                                fee: value.outcome.fee,
                                result: (value.outcome.result === 'tesSUCCESS') ? '成功' : '未成功',
                                time: self.dateFormat(value.outcome.timestamp, 'UTC'),
                                version: value.outcome.ledgerVersion,
                                original: value
                            };
                            this.tableData.push(tr);
                        });
                        this.lastTran = tranInfo[tranInfo.length - 1].id;
                    }
                    if ('id' in tranInfo) { // 单条时
                        let tr1 = {
                            num: 1,
                            type: self.tranType[tranInfo.type],
                            address: tranInfo.address,
                            fee: tranInfo.outcome.fee,
                            result: (tranInfo.outcome.result === 'tesSUCCESS') ? '成功' : '未成功',
                            time: self.dateFormat(tranInfo.outcome.timestamp, 'UTC'),
                            version: tranInfo.outcome.ledgerVersion,
                            original: tranInfo
                        };
                        this.tableData = [];
                        this.tableData.push(tr1);
                    }
                }
            }
        },
        seeTranInfo: function (index, row) {
            let data = row.original; // rippleApi 返回原始对象
            let tranId = data.id; // 交易哈希/ID
            let spec = data.specification; // 交易明细对象
            let source = spec.source; // 交易发起源
            let destination = spec.destination; // 交易目标源
            let outcome = data.outcome; // 交易结果对象

            this.form = {
                id: tranId, // 事务ID
                outAddress: data.address, // 转出地址
                currency: source.maxAmount.currency, // 货币类型
                value: source.maxAmount.value, // 货币数量
                receiveAddress: destination.address, // 接收地址
                outAddressValue: outcome.balanceChanges[spec.source.address][0]['value'], // 余额变动值
                receAddressValue: outcome.balanceChanges[spec.destination.address][0]['value'] // 余额变动值
            };
            this.dialogFormVisible = true;
        },
        clickRow (index, row) {
            this.$refs.moviesTable.toggleRowSelection(row);
        },
        onSubmit (formName) {
            delete this.tranParams.start;
            if ('id' in this.formInline && this.formInline.id !== '') {
                this.isLoading = true;
                this.getTran(this.formInline.id);
            } else if ('types' in this.formInline && this.formInline.types !== undefined && this.formInline.types !== '') {
                this.tranParams.types = [this.formInline.types];
                this.isLoading = true;
                this.getTrans(this.tranParams);
            } else {
                this.$message({
                    message: '请检测查询参数',
                    type: 'error'
                });
            }
        },
        onReset (formName) {
            this.isLoading = true;
            this.tableData = [];
            let self = this;
            let keys = Object.keys(this.formInline);
            keys.forEach(function (value, index, arr) {
                self.formInline[value] = '';
                if (value in self.tranParams) {
                    delete self.tranParams[value];
                }
            });
            this.getTrans(this.tranParams);
        },
        showNextMore () {
            this.isLoading = true;
            this.appendTableData = [];
            this.tranParams['start'] = this.lastTran;
            this.getTrans(this.tranParams);
        },
        utcToLocal (row, column, cellValue, index) {
            console.log(cellValue);
        }
    },
    watch: {
        '$router': function (to, from) {
            console.log(to);
        }
    },
    created: function () {
        this.isLoading = true;
        this.tableData = [];
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
    .td_click{
        background: #f5f7fa;
    }
</style>
