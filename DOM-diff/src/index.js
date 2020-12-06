import { createElement, render, Element, renderDom } from "./element"
import diff from "./diff"
import patch from "./patch"
let virtualDom1 = createElement("ui", {class: "list", style: {
    width:"200px",height:"200px"
}, value: 123}, [
    createElement("li", {class: "item"}, ["0"]),
    createElement("li", {class: "item"}, ["1"]),
    createElement("li", {class: "item"}, ["2"]),
])
let virtualDom2 = createElement("ui", {class: "list"}, [
    createElement("li", {class: "item"}, ["3"]),
    createElement("li", {class: "item"}, ["1"]),
    createElement("div", {class: "item"}, ["2"]),
])
let el = render(virtualDom1);
renderDom(el, window.root)

let patches = diff(virtualDom1, virtualDom2);
console.log(patches);
// 给元素打补丁 重新更新视图
patch(el, patches);