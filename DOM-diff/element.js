// type--元素的类型 props--class children--它的孩子元素
class Element {
    constructor(type, props, children) {
        this.type = type;
        this.props = props;
        this.children = children;
    }
}
// 创建虚拟DOM
function createElement(type, props, children) {
    return new Element(type, props, children)
}
// 根据虚拟DOM渲染tree
function render() {
    
}
export {
    createElement
}