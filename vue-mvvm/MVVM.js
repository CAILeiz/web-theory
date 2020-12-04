class MVVM {
    constructor(options) {
        this.$el = options.el;
        this.$data = options.data;
        // 通过compile编译$el
        if(this.$el) {
            // 将数据和元素进行编译
            new Compile(this.$el, this)
        }
    }
}