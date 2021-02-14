function createStore(reducer, initialState, enhance) {
    let currentState = initialState;
    const cbs = [];
    
    if (typeof initialState === 'function' ) {
        enhance = initialState;
        initialState = undefined;
    }

    if (enhance) {
        return enhance(createStore)(reducer, initialState);
    }

    function getState() {
        return currentState;
    }

    function dispatch(action) {
        currentState = reducer(currentState, action);
        cbs.forEach(_cb => _cb());
    }
    function subscribe(cb) {
        cbs.push(cb)
        return cbs.filter(_cb => _cb === cb);
    }

    dispatch({type: 'redux-init'});
    
    return {
        getState, 
        dispatch,
        subscribe,
    }
}


export default createStore;