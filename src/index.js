import React, { Component } from './kreact'
import ReactDom from './kreact-dom'
console.log(React)

// 函数组件
function Comp(props) {
    return <h2>{props.name}</h2>
}

//类组件
class Comp2 extends Component {
    render() {
        return (
            <div>
                <h2>{this.props.name}</h2>
            </div>
        )
    }
}

//数组
const users = [
    { name: 'tom', age: 20 },
    { name: 'dashen', age: 18 },
]

const jsx = (
    <div
        id="demo"
        className="ddd"
        onClick={() => alert('click')}
        style={{ color: 'red', border: '1px solid red' }}
    >
        <span>hi</span>
        <p>hello world</p>
        <div>
            <Comp name="函数组件" />
            <Comp2 name="类组件" />
        </div>
        <ul>
            {users.map((user) => (
                <li key={user.name}>{user.name}</li>
            ))}
        </ul>
    </div>
)

//jsx是什么？
//描述dom数据结构的对象
ReactDom.render(jsx, document.getElementById('root'))
