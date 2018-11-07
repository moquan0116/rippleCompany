import {RippleAPI} from 'ripple-lib';
// import Notification from './Notification';

export default class RippleMy {
    server = 'wss://s1.ripple.com:443';

    constructor () {
        this.ripple = this.getRippleApi();
        // this.rippleConnect();
    }

    static getInstance () {
        if (!RippleMy.instance) {
            return new RippleMy();
        }
        return RippleMy.instance;
    }

    getRippleApi () { // 暂先不改变vue内部获取rippleApi接口
        if (!RippleMy.ripple) {
            return new RippleAPI({server: 'wss://s1.ripple.com:443'});
        }
        return RippleMy.ripple;
    }

    /* 连接ripple服务器 */
    rippleConnect () {
        this.ripple.on('error', (errorCode, errorMessage) => {
            console.log(errorCode + ': ' + errorMessage);
        });
        this.ripple.on('connected', () => {
            console.log('on connected');
        });
        this.ripple.on('disconnected', (code) => {
            console.log('disconnected, code:', code);
        });
        return this.ripple.connect();
    }

    /**
     * ==================================
     * 支付流程(暂先这样写)
     * 1、准备支付__preparePayment
     * 2、支付签名__sign
     * 3、提交已签名的支付__submit
     * 4、验证事务结果__getTransaction
     * ==================================
     * */
    /* 发起支付 */
    payment (address, secret, payment, getData, getStatus) {
        this.rippleConnect().then(() => {
            return this.preparePayment(address, payment, getStatus);
        }).then((prepared) => {
            return this.sign(prepared.txJSON, secret, getStatus);
        }).then((signedData) => {
            return this.submitTransaction(signedData, getStatus);
        }).then((data) => {
            getData(data);
        }).catch((error) => {
            console.log(error);
        });
    }

    /**
     * ==================================
     * 提交订单(暂先这样写)
     * 1、准备支付__preparePayment
     * 2、支付签名__sign
     * 3、提交已签名的支付__submit
     * 4、验证事务结果__getTransaction
     * ==================================
     * */
    /* 发起支付 */
    submitOrder (address, secret, order, getData, getStatus) {
        this.rippleConnect().then(() => {
            return this.prepareOrder(address, order, getStatus);
        }).then((prepared) => {
            return this.sign(prepared.txJSON, secret, getStatus);
        }).then((signedData) => {
            return this.submitTransaction(signedData, getStatus);
        }).then((data) => {
            getData(data);
        }).catch((error) => {
            console.log(error);
        });
    }

    /* 准备支付 */
    preparePayment (address, payment, getStatus) {
        getStatus({info: '准备支付'});
        return new Promise((resolve, reject) => {
            try {
                this.ripple.preparePayment(address, payment).then((result) => {
                    resolve(result);
                });
                getStatus({success: '准备完成'});
            } catch (e) {
                reject(e);
            }
        });
    }

    /* 准备支付 */
    prepareOrder (address, order, getStatus) {
        getStatus({info: '准备订单'});
        return new Promise((resolve, reject) => {
            this.ripple.prepareOrder(address, order).then((result) => {
                getStatus({success: '准备完成'});
                resolve(result);
            }).catch(error => {
                reject(error);
            });
        });
    }

    /* 签名 */
    sign (txJSON, secret, getStatus) {
        getStatus({info: '签名...'});
        return new Promise((resolve, reject) => {
            try {
                resolve(this.ripple.sign(txJSON, secret));
                getStatus({success: '签名完成'});
            } catch (e) {
                reject(e);
            }
        });
    }

    /* 提交事务 */
    submitTransaction (signedData, getStatus) {
        getStatus({info: '提交事务...'});
        return new Promise((resolve, reject) => {
            try {
                this.ripple.submit(signedData.signedTransaction).then((result) => {
                    resolve(result);
                    getStatus({success: '提交事务完成'});
                });
            } catch (e) {
                reject(e);
            }
        });
    }

    /* 验证事务 */
    verifyTransaction (transId, getStatus) {
        getStatus({info: '验证事务...'});
        return new Promise((resolve, reject) => {
            try {
                this.ripple.getTransaction(transId).then((result) => {
                    resolve(result);
                    getStatus({success: '验证事务完成'});
                });
            } catch (e) {
                reject(e);
            }
        });
    }

    /* 获取路径 */
    getPath (pathfind, getStatus) {
        getStatus({info: '路径获取中...'});
        return new Promise((resolve, reject) => {
            this.rippleConnect().then(() => {
                return this.ripple.getPaths(pathfind);
            }).then((paths) => {
                // pathfind.paths = paths.length >= 1 ? paths[0].paths : paths.paths;
                resolve(paths);
            }).catch((error) => {
                reject(error);
            });
        });
    }

    /*
    *
    * 订单列有
    * */
    orderBook (params, getStatus) {
        getStatus({info: '订单获取中...'});
        return new Promise((resolve, reject) => {
            this.rippleConnect().then(() => {
                return this.ripple.getOrderbook(params.address, params.orderbook, params.options);
            }).then((orders) => {
                getStatus({success: '订单获取完成'});
                resolve(orders);
            }).catch((error) => {
                reject(error);
            });
        });
    }
}
