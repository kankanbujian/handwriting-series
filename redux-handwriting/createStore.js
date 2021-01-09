function createStore(reducer, initialState, middleware) {
    let currentState = initialState || {};
    const cbs = [];
    function getState() {
        return currentState;
    }

    function dispatch(action) {
        currentState = reducer(currentState, action);
        cbs.forEach(_cb => cb.call(null, currentState));
    }
    function subscribe(cb) {
        cbs.push(cb)
    }
    
    return {
        getState, 
        dispatch,
        subscribe,
    }
}


export default createStore;