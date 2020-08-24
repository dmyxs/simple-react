import { initVNode } from './kvdom'

// render做两件事
//1.把虚拟DOM转换成DOM
//2.把需要转换的DOM添加到容器中
function render(vnode, container) {
    // container.innerHTML = `<pre>${JSON.stringify(vnode, null, 2)}</pre>`
    console.log(vnode)
    //将虚拟节点变成真实节点
    const node = initVNode(vnode)

    // console.log(node)

    //将真实节点追加到容器中
    container.appendChild(node)
}

export default { render }
