import { createElement } from "./element"
let virtualDom = createElement("ui", {class: "list"}, [
    createElement("li", {class: "item"}, [0]),
    createElement("li", {class: "item"}, [1]),
    createElement("li", {class: "item"}, [2]),
])
console.log(virtualDom);