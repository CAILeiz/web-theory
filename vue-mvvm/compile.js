class Compile {
    constructor(el, vm) {
        this.el = this.isElementNode(el) ? el : document.querySelector(el);
        this.vm = vm;
        if(this.el) {
            // 如果这个元素你能获取到 就开始编译
            // 1. 我们先把真是的DOM移到内存中 fragment
            let fragment = this.node2fragment(this.el);
            // 2.在内存中编译
            this.compile(fragment);
            // 3. 将编译好的文档碎片移到dom中
            this.fragment2node(fragment);
        }
        
    }
    /* 辅助方法 */
    isElementNode(node) {
        return node.nodeType === 1;
    }
    // 是不是指令
    isDirective(name) {
        return name.includes("v-")
    }
    node2fragment(el) { // 需要将el中的全部内容放到内存中
        // 文档碎片 内存中高端dom节点
        let fragment = document.createDocumentFragment();
        let firstChild;
        while(firstChild = el.firstChild) {
            fragment.appendChild(firstChild);
        }
        return fragment;
    }
    fragment2node(fragment) {
    document.body.appendChild(fragment);
    }
    /* 核心方法 */
    compileElement(node) {
        let attrs = Array.from(node.attributes);
        attrs.forEach(attr => {
            let attrName = attr.name;
            // 判断名字是否带v-
            if(this.isDirective(attrName)) {
                // console.log(attr.name, attr.value);
                // 如果是v-xx 取到对应的值
                let expr = attr.value;
                // 取到对应的值放到对应的节点中 node this.vm.data expr // v-model v-text v-html 
                // todo....
                let [, type] = attrName.split("-");
                CompileUtils[type](node, this.vm, expr)

            }
        })
    }
    compileText(node) {
        // 带{{}}
        let expr = node.textContent; // 取文本中的内容
        console.log(node);
        let reg = /\{\{([^}]+)\}\}/g;
        if(reg.test(expr)) {
            // 如果带{{}} 给对应节点编译 
            // node this.vm.$data expr
            // todo....
            CompileUtils["text"](node, this.vm, expr);

        }

    }
    compile(fragment) {
        let childNodes = fragment.childNodes;
        Array.from(childNodes).forEach( node => {
            if(this.isElementNode(node)) {
                // 是元素节点
                // 元素可能还有儿子 进行递归编译
                this.compileElement(node);
            } else {
                // 是文本节点
                this.compileText(node)
            }
        })
    }
}

CompileUtils = {
    getVal(vm, expr) {
        // expr可能是message.a
        expr = expr.split(".");
        return expr.reduce((prev, next) => {
            return prev[next];
        }, vm.$data)
    },
    // 获取{{}}里面的内容
    getTextVal(vm, expr) {
        return expr.replace(/\{\{([^}]+)\}\}/g, (...arguments) => {
            // 获取第一个分组
            //  ("arguments",arguments); // ["{{message.a}}", "message.a", 0, "{{message.a}}"]
            return this.getVal(vm ,arguments[1])
        })
    },
    // 文本处理
    text(node, vm, expr) {
        let updateFn = this.updater["textUpdater"];
        let value = this.getTextVal(vm, expr);
        updateFn && updateFn(node, value);
    },
    // v-model处理
    model(node, vm, expr) {
        let updateFn = this.updater["modelUpdater"];
        let value = this.getVal(vm, expr);
        updateFn && updateFn(node, value);
    },
    updater: {
        // 文本更新
        textUpdater(node, value) {
            node.textContent = value;
        },
        // 输入框更新
        modelUpdater(node, value) {
            node.value = value;
        }
    }

}