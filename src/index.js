import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store/index';
// import {Provider} from 'react-redux';
import {Provider} from '../my-react-redux/index';

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

window.store = store;
ReactDOM.render(
	<Provider store={store}>
		<React.StrictMode>
		<App />
		</React.StrictMode>
	</Provider>,
  document.getElementById('root')
);

reportWebVitals();
