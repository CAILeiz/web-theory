class Observer {
    constructor(data) {
        this.observer(data)
    }
    observer(data) { 
        // 要对这个data数据将原有的属性改成set的形式 data必须有且是对象
        if(!data || typeof data != "object") {
            return;
        } 
        // 要将数据 一一劫持 先获取到data的key和value
        console.log(Object.keys(data));
        Object.keys(data).forEach( key => {
            // 劫持
            this.defineReactive(data, key, data[key])
            this.observer(data[key])
        })

    }
    defineReactive(data, key, value) {
        let that = this;
        let dep = new Dep() // 每个变化的数据都会对应一个数组 这个数组存放所有更新的操作
        Object.defineProperty(data, key, {
            enumerable: true, // 可枚举 for循环可以找到
            configurable: true, // 可配置
            get() {
                // Dep.target是每个watcher实例
                Dep.target && dep.addSub(Dep.target);
                console.log(dep);
                return value;
            },
            set(newVal) { // 当给data属性中设置的值合适, 更改获取属性的值
                if(value != newVal) {
                    that.observer(newVal)
                    value = newVal;
                    dep.nodify();
                }
            }
        })
    }
}
class Dep {
    constructor() {
        // 订阅的数组
        this.subs = [];
    }
    // 添加订阅
    addSub(watcher) {
        this.subs.push(watcher);
    }
    nodify(){
        this.subs.forEach( watcher => watcher.update())
    }
}