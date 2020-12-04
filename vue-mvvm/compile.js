class Compile {
    constructor(el, data) {
        this.el = el;
        this.data = data;
        let fragment = this.createFragment(el);
        this.compile(fragment);
        
    }
    /* 辅助方法 */
    isElement(node) {
        return node.nodeType === 1;
    }
    hasV_(attr) {
        return Array.from(attr).includes("el")
    }
    createFragment(el) {
        let fragment = document.createDocumentFragment();
        let firstChild ;
        while(firstChild = el.firstChild) {
            fragment.appendChild(firstChild);
        }
        return fragment;
    }
    /* 核心方法 */
    compile(element) {
        let childNodes = element.childNodes();
        Array.from(childNodes).forEach( node => {
            if(this.isElement(node)) {
                this.compileElement(node);
            } else {
                this.compileText(node);
            }
        })
    }
    compileElement(node) {
        let attributes = Array.from(node.attributes);
        attributes.forEach(attr => {
            if(this.hasV_(attr)) {
                /* 如果是v-xx */


            } else {
                /* 编译{{}} */
            }
        })
    }
    compileText(node) {

    }
}

CompileUtils = {
    
}