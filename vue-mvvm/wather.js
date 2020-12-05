// 给需要变化的元素增加一个观察者,当数据变化后,执行对应的方法
class Watcher {
    constructor(vm, expr, cb) {
        this.vm = vm;
        this.expr = expr;
        this.cb = cb;
        // 先获取一下老值
        this.value = this.get()
    }
    getVal(vm, expr) {
        // expr可能是message.a
        expr = expr.split(".");
        return expr.reduce((prev, next) => {
            return prev[next];
        }, vm.$data)
    }
    get() {
        // 把watcher实例赋值给Dep的一个属性
        Dep.target = this;
        let value =  this.getVal(this.vm, this.expr)
        Dep.target = null;
        return value;
    }
    // 对外暴露的方法
    update() {
        let newVal = this.getVal(this.vm, this.expr);
        let oldVal = this.value;
        if(newVal != oldVal) {
            this.cb(newVal); // 调用watch的callback
        }
    }
}

// 观察者的目的是用新值和老值进行比对,如果发生变化,就调用更新方法

/* <input type="text" v-model="message"> 首先给input添加一个观察者
起始 {message: 1}
之后 {message: 2}
input.value = message */