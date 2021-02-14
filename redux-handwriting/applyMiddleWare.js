const compose = (...chains) => chains.reduce( (total, cur) => (...args) => cur(total(...args)));

const applyMiddleWare = (...chains) => createStore => (reducer, initialState) => {

    const store = createStore(reducer, initialState);
    debugger
    let middleApi = {
        dispatch: store.dispatch,
        getState: store.getState,
    }
    debugger
    chains = chains.map(_chain => _chain(middleApi));
    const dispatch = compose(...chains)(store.dispatch);
    debugger
    return {
        ...store,
        dispatch
    }
}

export default applyMiddleWare;