export default class Notification {
    obServers;
    constructor (obj, status) {
        this.obj = obj;
        this.status = status;
    }

    getStatus () {
        return this.status;
    }

    setStatus (status) {
        this.status = status;
    }

    addObserve (ob) {
        let flag = false;
        this.obServers.forEach((item, key) => {
            if (item === ob) {
                flag = true;
            }
        });
        if (!flag) {
            this.obServers.push(ob);
        }
        return this;
    }
    removeObserve (ob) {
        this.obServers.forEach((item, key) => {
            if (item === ob) {
                this.obServers.splice(key, 1);
            }
        });
        return this;
    }
    notice () {
        this.obServers.forEach((item, key) => {
            item.update(this.getStatus());
        });
    }
}
