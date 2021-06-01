

// import ReactDOM from './react/react-dom';
import ReactDOM from './react/react-dom-fiber';
import {Component} from 'react';



import "./index.css";

class ClassComponent extends Component {
  static defaultProps = {
    color: "pink"
  };
  render() {
    return (
      <div className="border">
        class组件-{this.props.name}
        <p className={this.props.color}>omg</p>
      </div>
    );
  }
}

function FunctionComponent(props) {
  // const [count, setCount] = useState(0);
  return (
    <div className="border">
      函数组件-{props.name}
      {/* <button onClick={() => setCount(count + 1)}>{count} </button>
      {count % 2 ? <button>click</button> : <span>omg</span>} */}
    </div>
  );
}

const jsx = (
  <div className="border">
    <p>我是一个P标签</p>
    <a href="https://www.baidu.com/">我是一个标签</a>
    {/* <ClassComponent name="class" color="red" /> */}
    {/* <FunctionComponent name="function" /> */}
    {/* {[1, 2].map(item => (
      <React.Fragment key={item}>{item}</React.Fragment>
    ))} */}
    {/* <>
      <h1>aaa</h1>
      <h1>bbb</h1>
    </> */}
  </div>
);
debugger
ReactDOM.render(jsx, document.getElementById("root"));
// 文本节点
// html元素节点
// 类组件
// 函数组件
// 数组
// Fragment
