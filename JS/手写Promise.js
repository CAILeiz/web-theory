class myPromise {
    //秘籍对Promise有规定：
    // Promise存在三个状态（state）pending、fulfilled、rejected
    // pending（等待态）为初始态，并可以转化为fulfilled（成功态）和rejected（失败态）
    // 成功时，不可转为其他状态，且必须有一个不可改变的值（value）
    // 失败时，不可转为其他状态，且必须有一个不可改变的原因（reason）
    // new Promise((resolve, reject)=>{resolve(value)}) resolve为成功，接收参数value，状态改变为fulfilled，不可再次改变。
    // new Promise((resolve, reject)=>{reject(reason)}) reject为失败，接收参数reason，状态改变为rejected，不可再次改变。
    // 若是executor函数报错 直接执行reject();
    constructor(executor) {
        // 初始状态
        this.state = "pending";
        // 成功的值
        this.value = undefined;
        // 失败的值
        this.reason = undefined;
        // 定义成功的数组和失败的数据 用来解决异步函数(setTimeout)等函数的问题
        this.onResolvedCallbacks = [];
        this.onRejectedCallbacks = [];
        let resolve = value => {
            if(this.state === "pending") {
                // resolve之后state如果是pending转化为fulfilled
                this.state = "fulfilled";
                // 存储成功的值
                this.value = value;
                // 异步函数一旦执行resolve,就去遍历成功数组进行函数的调用
                this.onResolvedCallbacks.forEach(fn => fn());
            }
        };
        let reject = reason => {
            // reject之后state如果是pending变成了rejected
            if(this.state === "pending") {
                this.state = "rejected";
                // 存储失败的原因
                this.reason = reason;
                // 异步函数一旦执行reject,就去执行失败数组进行数组遍历函数的调用
                this.onRejectedCallbacks.forEach(fn => fn());
            }
        };
        try {
            executor(resolve, reject);
        } catch (error) {
            reject(error);
        }
    }
    // 秘籍规定:Promise有一个叫做then的方法，里面有两个参数：onFulfilled,onRejected,成功有成功的值，失败有失败的原因
    // then 方法 有两个参数onFulfilled onRejected
    then(onFulfilled, onRejected) {
        // promise2是为了解决链式调用promise
        let promise2 = new myPromise((resolve, reject) => {
            // 状态为fulfilled，执行onFulfilled，传入成功的值
            if(this.state === "fulfilled") {
                onFulfilled(this.value);
            }
            // 状态为rejected, 执行onRejected
            if(this.state == "rejected") {
                onRejected(this.reason);
            }
            // 解决异步实现
            if(this.state = "pending") {
                this.onResolvedCallbacks.push( () => {
                    onFulfilled(this.value);
                })
                this.onRejectedCallbacks.push(() => {
                    onRejected(this.reason);
                })
            }
        })
        return promise2;
    }
} 
// 测试 正常的异步和promise顺序
// new Promise((resolve, reject) => {setTimeout(() => {console.log("settimeout")}, 1000); resolve(1)}).then(res => {console.log(res)}).then(res => {console.log(res)})
// 测试异步
new myPromise((resolve, reject) => {setTimeout(() => {console.log("settimeout"); resolve(1)}, 1000);}).then(res => {console.log(res)}).then(res => {console.log(res)})
