const routePageReducer = (state = {hasLogin: false}, action) => {
    debugger
    switch(action.type) {
        case 'login' : 
            return {
                ...state,
                hasLogin: true,
            }
        case 'logout' : 
            return {
                ...state,
                hasLogin: false,
            }
        default: 
        return state;
    }
}

export default routePageReducer