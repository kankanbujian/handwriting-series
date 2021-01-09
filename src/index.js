import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createStore} from '../redux-handwriting/index';
import {Provider} from 'react-redux'

const initialState = {
	goodList: [{name: 'dad'}]
}

const reducer = (state, action) => {
	switch(action.type) {
		case 'add': 
			return {...state, goodList: [...state.goodList, action.payload]};
		case 'delete':
			return {...state, goodList: action.payload};
		default:
			return state;
	}
} 

const store = createStore(reducer, initialState);

ReactDOM.render(
	<Provider store={store}>
		<React.StrictMode>
		<App />
		</React.StrictMode>
	</Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
