import { createElement, render, Element, renderDom } from "./element"
import diff from "./diff"
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
])
let patch = diff(virtualDom1, virtualDom2);
let el1 = render(virtualDom1);
renderDom(el1, window.root)
