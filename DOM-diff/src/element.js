// type--元素的类型/ul等等 props--class children--它的孩子元素
// 虚拟DOM元素的类
class Element {
    constructor(type, props, children) {
        this.type = type;
        this.props = props;
        this.children = children; 
    }
}
// 给DOM设置行内属性
function setAttr(node, key , value) {
    node.setAttribute(key, value)
    switch (key) {
        case "value": // 如果是input框或者是textarea value=value
            if(node.tagName.toUpperCase() === "INPUT" || node.tagName.toUpperCase() === "TEXTAREA") {
                node.value = value;
            } else {
                node.setAttribute(key, value);
            }
            break;
        case "style": 
            node.style.cssText = value;
            break;
        default:
            node.setAttribute(key, value);
            break;
    }
}
// 创建虚拟DOM
function createElement(type, props, children) {
    return new Element(type, props, children)
}
// render方法可以将vnode转换为真实的dom
function render(eleObj) {
    let {type, props, children} = eleObj;
    let el = document.createElement(type);
    Object.keys(props).forEach(item => {
        setAttr(el, item, props[item])
    })
    // 遍历children 如果儿子是虚拟DOM继续渲染 否则创建文本节点
    children.forEach(child => {
        child = ( child instanceof Element) ? render(child) : document.createTextNode(child);
        console.log("child", child);
        el.appendChild(child);
    })
    return el;
}
// 将元素插入到页面内 
function renderDom(el ,target) {
    target.appendChild(el)
}
export {
    createElement,
    render,
    Element,
    renderDom
}