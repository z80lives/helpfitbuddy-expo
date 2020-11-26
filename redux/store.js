import {createStore, applyMiddleware} from 'redux';
import rootReducer from './reducers';



const jwt = ({dispatch, getState}) => {
    console.log("JWT middleware");
    return next => action => {
	next(action);
    }
};



export default createStore(
    rootReducer,
    applyMiddleware(jwt)
);

//const storeWithMiddleWare = applyMiddleware(jwt)(rootReducer));

//export default storeWithMiddleWare;
