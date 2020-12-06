import { render ,Element, setAttr } from "./element";

// node是要打补丁的元素 patches是元素的补丁
let allPatches;
let index = 0;
function patch(node, patches) {
    allPatches = patches;
    walk(node);
}
function walk(node) {
    let currentPatch = allPatches[index++];
    let childNodes = node.childNodes;
    childNodes.forEach(child => {
        walk(child);
    });
    if(currentPatch) {
        console.log(currentPatch);
        doPatch(node, currentPatch[0]);
    }
}
function doPatch(node, patch) {
    switch (patch.type) {
        case "TEXT":
            node.textContent = patch.text;
            break;
        case "REPLACE":
            let newNode = (patch.newNode instanceof Element) ? render(patch.newNode) : document.createTextNode(
                patch.newNode
            );
            node.parentNode.replaceChild(newNode, node);
            break;
        case "ATTRS":
                for (const key in patch.attrs) {
                    let value = patch.attrs[key]
                    setAttr(node, key, value)
                }
        break;
        case "REMOVE":
            node.parentNode.removeChild(node);
        break;
    
        default:
            break;
    }
}
export default patch