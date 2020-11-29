import {ActionConst} from 'react-native-router-flux';
import {combineReducers, createStore} from 'redux';
import authReducer from "./auth";
import gymReducer from "./gym";

const sceneReducer = (state = {}, {type, scene}) => {
  switch (type) {
    case ActionConst.FOCUS:
      return {...state, scene};
    default:
      return state;
  }
};



export default combineReducers({sceneReducer, authReducer, gymReducer});
