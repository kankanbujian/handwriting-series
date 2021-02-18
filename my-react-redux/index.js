import React, {useContext, useState, useEffect} from 'react';

const Context = React.createContext();

export const Provider = (props) => {
    return <Context.Provider value={props.store}>
        {props.children}
    </Context.Provider>
}


export const connect = (mapStateToProps, mapDispatchToProps = {}) => (WrapperedCmp) => 
    props => {
        
        const store = useContext(Context);
        const getProps = () => {
            const stateProps = mapStateToProps(store.getState());
            const dispatchProps = getDispatchProps(mapDispatchToProps, store.dispatch);
            // setBool(!bool);
            return {
                ...stateProps, 
                ...dispatchProps, 
            }
        }
        const [otherProps, setOtherProps] = useState({...getProps()});
        useEffect(
            () => {
                store.subscribe(() => {
                    console.log('subscribing---------------');
                    setOtherProps({...getProps()});
                })
            }
        , [])

        console.log('render----');
        return <WrapperedCmp {...otherProps}/>
    }



const getDispatchProps = (mapDispatchToProps, dispatch) => {
    return  Object.keys(mapDispatchToProps).reduce((ret, cur) => {
        ret[cur] = () => {
            dispatch(mapDispatchToProps[cur]());
        };
        return ret;
    }, {});
}
