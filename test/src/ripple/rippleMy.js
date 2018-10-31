import {RippleAPI} from 'ripple-lib';
import Notification from './Notification';

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

    test () {
        return new Notification({}, 'aaa');
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
    payment (address, secret, payment) {
        this.rippleConnect().then(() => {
            return this.preparePayment(address, payment);
        }).then((prepared) => {
            return this.sign(prepared.txJSON, secret);
        }).then((signedData) => {
            return this.submitTransaction(signedData);
        }).then((data) => {
            console.log('有没有呀', data);
        }).catch((error) => {
            console.log(error);
        });
    }

    /* 准备支付 */
    preparePayment (address, payment) {
        return new Promise((resolve, reject) => {
            try {
                this.ripple.preparePayment(address, payment).then((result) => {
                    resolve(result);
                });
            } catch (e) {
                reject(e);
            }
        });
    }

    /* 签名 */
    sign (txJSON, secret) {
        return new Promise((resolve, reject) => {
            try {
                resolve(this.ripple.sign(txJSON, secret));
            } catch (e) {
                reject(e);
            }
        });
    }

    /* 提交事务 */
    submitTransaction (signedData) {
        return new Promise((resolve, reject) => {
            try {
                this.ripple.submit(signedData.signedTransaction).then((result) => {
                    resolve(result);
                });
            } catch (e) {
                reject(e);
            }
        });
    }

    /* 验证事务 */
    verifyTransaction (transId, options) {
        return new Promise((resolve, reject) => {
            try {
                this.ripple.getTransaction(transId).then((result) => {
                    resolve(result);
                });
            } catch (e) {
                reject(e);
            }
        });
    }
}
