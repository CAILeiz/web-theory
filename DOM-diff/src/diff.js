function diff(oldTree, newTree) {
    let pathches = {};
    let index = 0;
    // 递归树
    walk(oldTree, newTree, index, pathches);
    return pathches;
}
const ATTRS = "ATTRS" 
const TEXT = "TEXT"  
const REMOVE = "REMOVE" 
const REPLACE = "REPLACE" 
let Index = 0
// 判断是不是
function isString(node) {
    return Object.prototype.toString.call(node) === '[object String]';
} 
// 比较单个节点属性的不同
function walk(oldNode, newNode, index, pathches) {
    let currentPatch = [];
    // 如果新节点被删除了
    if(!newNode) {
        currentPatch.push({
            type: REMOVE, index
        })
    } else if(isString(oldNode) && isString(newNode)) {
    // 判断老节点和新节点是不是文本类型且是否一致
        if(oldNode !== newNode) {
            currentPatch.push({
                type: TEXT, text: newNode
            })
        }
    } else if(oldNode.type === newNode.type) {
        // 当节点类型相同时,看一下属性是否相同, 产生一个属性的补丁包
        // 比较属性是否修改
        let attrs = diffAttr(oldNode.props, newNode.props);
        if(Object.keys(attrs).length) {
            currentPatch.push({type: ATTRS, attrs})
        }
        diffChildren(oldNode.children, newNode.children, pathches);
    } else {
        // 说明节点被替换了
        currentPatch.push({
            type: REPLACE, newNode
        })
    }
    // 当前元素确实有补丁 将元素和补丁对应起来 放到补丁包中
    if(currentPatch.length) {
        pathches[index] = currentPatch;
    }
}
function diffChildren(oldChildren, newChildren, patches) {
    // 比较老的第一个和新的第一个
    oldChildren.forEach((child, idx) => {
        // 
        walk(child, newChildren[idx], ++Index, patches);
    });
}
// 比较节点中行内属性的不同 并生成补丁对象 eg: {class: 'list-group'}
function diffAttr(oldAttrs, newAttrs) {
    let patch = {};
    // 比较原来attrs 如果不相等 放入补丁包patch
    for (let key in oldAttrs) {
        if (newAttrs[key] !== oldAttrs[key]) {
            newAttrs[key] && (patch[key] = newAttrs[key]);
        }
    }
    // 如果是newAttrs里面新增的属性 同样放入patch补丁包
    for (const key in newAttrs) {
        if (!oldAttrs.hasOwnProperty(key)) {
            patch[key] = newAttrs[key];
        }
    }
    return patch;
}

export default diff

// 当节点类型相同时,看一下属性是否相同, 产生一个属性的补丁包, { type: "ATTRS", attrs: { class: "list-group" }} 
// 新的DOM节点不存在 {type: "REMOVE", index: XXX} inedx是删除的索引
// 节点类型不相同 直接采用替换模式 {type: "REPLACE" newNode: newNode}
// 文本的变化 {type: "TEXT", text: 1}   