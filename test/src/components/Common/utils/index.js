export default{
    /* 匹配数字包括小数 */
    checkNum (num) {
        let rule = /^\d+(\.\d+)?$/;
        return rule.test(num);
    },
    /* 隐藏指字符串 */
    hiddenString (data, num) {
        let len = data.length;
        let tem = data.substring(0, num);
        let condition = arguments[2] || len - num;
        for (let i = 0; i < condition; i++) {
            tem += '*';
        }
        return tem;
    }
};
