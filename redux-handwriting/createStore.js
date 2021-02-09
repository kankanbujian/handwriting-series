function createStore(reducer, initialState, middleware) {
    let currentState = initialState;
    const cbs = [];
    function getState() {
        return currentState;
    }

    function dispatch(action) {
        currentState = reducer(currentState, action);
        cbs.forEach(_cb => _cb());
    }
    function subscribe(cb) {
        cbs.push(cb)
        return cbs.filter(_cb === cb);
    }

    dispatch({type: 'redux-init'});
    
    return {
        getState, 
        dispatch,
        subscribe,
    }
}


export default createStore;