import React from 'react'
import logo from './logo.svg';
import './App.css';
import CountView from './CountView';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <CountView />
        {/* 
        <input onChange={(e) => {
          setValue(e.target.value);
        }}></input>
        <button onClick={() => {
          window.store.dispatch({
            type: 'add',
            payload: {name: value}
          })
        }}></button>

        <div>
          <GoodsList/>
        </div> */}
      </header>
    </div>
  );
}

// const Goods = (props) => {
//   console.log('props--', props);
//   return <div>
//     this is a GoodsList
//     <ul>
//     {
//       props.goodList.map(_good => <li>{_good.name}</li>)
//     }
//     </ul>
//   </div>
// }

// const mapStateToProps = (state) => {
//   console.log('state---', state);
//   return {
//     goodList: state.goodList
//   }
// }

// const GoodsList = connect(mapStateToProps)(Goods)


export default App;