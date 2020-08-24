import { createVNode } from './kvdom'

//将JSX转换成虚拟节点
//参数一：标签的类型
//参数二：所有的属性
//参数三：孩子元素
function createElement(type, props, ...children) {
    // console.log(arguments) //输出的结果会从从内到外执行
    // console.log(type)

    //把孩子元素挂到props.children的属性
    props.children = children

    let vtype
    if (typeof type === 'string') {
        //原生标签
        vtype = 1
    } else if (typeof type === 'function') {
        //函数组件和类组件的typeof都是function
        //所以需要对类组件添加一个静态属性来判断是类组件还是函数组件
        if (type.isClassComponent) {
            //类组件
            vtype = 2
        } else {
            //函数组件
            vtype = 3
        }
    }
    // console.log(vtype)
    return createVNode(vtype, type, props)
}

//类组件处理
export class Component {
    //静态属性，区分某个组件是class还是function
    static isClassComponent = true
    constructor(props) {
        this.props = props
        this.state = {}
    }

    //不实现setState，因为需要更新
    setState() {}
}

//导出在index页使用
export default { createElement }
