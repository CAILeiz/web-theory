class Promise {
    constructor(fn) {
        this.state = "pending";
        this.successValue = undefined;
        this.failValue = undefined;
        this.successList = [];
        this.errorList = [];
        try {
            fn(this.resolve, this.reject)
        } catch (err) {
            this.reject(err)
        }
    }
    resolve(val) {
        if(this.state == "pending") {
            this.state = "fulfilled";
            this.successValue = val;
        }
    }
    reject(val) {
        if(this.state == "pending") {
            this.state = "rejected";
            this.failValue = val;
        };
    }
    fn() {

    }
}
new Permise((resolve, reject) => {

})