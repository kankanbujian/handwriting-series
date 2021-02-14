export const logger = ({getState}) => next => action => {
    console.log('prvState', getState());
    console.log('action--', action);
    console.log('next state', getState());
    return next(action);;
}

export const logger2 = ({getState}) => next => action => {
    console.log('next---', next);
    console.log('logger2---running');
    return next(action);
}