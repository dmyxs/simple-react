// 虚拟dom转换成dom

//创建虚拟节点：
//vtype是定义标签的类型，用于判断：1-html元素，2-class组件，3-function组件
//element是标签
export function createVNode(vtype, type, props) {
    const vnode = { vtype, type, props }
    return vnode
}

//vdom转换成原生节点：通过类型判断
export function initVNode(vnode) {
    // console.log(vnode)
    //需要依赖vtype
    const { vtype } = vnode
    //如果没有vtype，就是文本节点
    if (!vtype) {
        return document.createTextNode(vnode)
    }
    //原生元素
    if (vtype === 1) {
        return createElement(vnode)
        //类组件
    } else if (vtype === 2) {
        return createClassComp(vnode)
        //函数组件
    } else if (vtype === 3) {
        return createFuncComp(vnode)
    }
}

//原生元素转换与处理
function createElement(vnode) {
    //根据type创建元素
    const { type, props } = vnode
    const node = document.createElement(type)

    //处理属性
    const { key, children, ...rest } = props

    //遍历操作：获取属性的每一项，再遍历处理
    Object.keys(rest).forEach((attr) => {
        // console.log(Object.keys(rest))
        // console.log(rest[attr])
        //处理特别属性：className，htmlFor
        if (attr === 'className') {
            node.setAttribute('class', rest[attr])
        } else if (attr === 'htmlFor') {
            node.setAttribute('for', rest[attr])

            //样式属性是对象的处理
        } else if (attr === 'style' && typeof (rest[attr] === 'Object')) {
            const style = Object.keys(rest[attr])
                .map((s) => s + ':' + rest[attr][s])
                .join(';')
            node.setAttribute('style', style)

            //事件的简单处理
        } else if (attr.startsWith('on')) {
            const event = attr.toLowerCase() //转成小写：onclick

            node[event] = rest[attr]

            // console.log(rest[attr])
            // console.log(node[event])
        } else {
            node.setAttribute(attr, rest[attr])
        }
    })

    //递归子元素
    children.forEach((ele) => {
        //判断是不是数组
        if (Array.isArray(ele)) {
            //递归，追加到父节点
            ele.forEach((n) => node.appendChild(initVNode(n)))
        } else {
            //追加到父节点
            node.appendChild(initVNode(ele))
        }
    })
    return node
}

//创建类组件
function createClassComp(vnode) {
    //element是class组件声明，props是它的属性
    const { type, props } = vnode
    //组件实例
    const component = new type(props)
    //通过类组件的render方法，获取dom
    const vdom = component.render()

    //把vdom变成真实的节点，递归操作：类组件里可能有其他组件
    return initVNode(vdom)
}

//创建函数组件
function createFuncComp(vnode) {
    const { type, props } = vnode
    //调用函数，return节点
    const vdom = type(props)
    return initVNode(vdom)
}
