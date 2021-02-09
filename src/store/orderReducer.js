
export default const reducer = (state, action) => {
	switch(action.type) {
		case 'add': 
			return {...state, goodList: [...state.goodList, action.payload]};
		case 'delete':
			return {...state, goodList: action.payload};
		default:
			return state;
	}
} 