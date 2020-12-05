class MVVM {
    constructor(options) {
        this.$el = options.el;
        this.$data = options.data;
        // 通过compile编译$el
        if(this.$el) {
            // 数据劫持 就是把对象的属性 改成get和set方法
            new Observer(this.$data);
            this.proxyData(this.$data);
            // 将数据和元素进行编译
            new Compile(this.$el, this)
        }
    }
    proxyData(data) {
        Object.keys(data).forEach(key => {
            Object.defineProperty(this, key, {
                get() {
                    return data[key];
                },
                set(newVal) {
                    this[key] = newVal;
                }
            }) 
        })
    }
}