<script type="text/javascript">
// import {RippleAPI} from 'ripple-lib';

// const rippleTest = 'wss://s.altnet.rippletest.net:51233';
export default class RippleMy {
    instance;
    server = 'wss://s1.ripple.com:443';
    /* constructor () {

    } */

    static getInstance () {
        /* if (this.instance !== undefined) {
            return this.instance;
        } else {
            return new RippleAPI(this.server);
        } */
        return new RippleMy();
    }
}

</script>
