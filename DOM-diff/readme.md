virtual dom，也就是虚拟节点。它通过JS的Object对象模拟DOM中的节点，然后再通过特定的render方法将其渲染成真实的DOM节点.

./src/element 包含的方法
--创建vNode createElement
--把VNode转换为真实的DOM render
--把真实DOM 渲染在页面上 renderDom