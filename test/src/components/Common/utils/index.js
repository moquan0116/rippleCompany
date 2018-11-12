export default{
    /* 匹配数字包括小数 */
    checkNum (num) {
        let rule = /^\d+(\.\d+)?$/;
        return rule.test(num);
    }
};
