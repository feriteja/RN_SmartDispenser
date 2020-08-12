import authReducer from './authReducer';
import dataDispenser from './dataDispenser';
import historyReducer from './historyReducer';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  dataDispenser,
  authReducer,
  historyReducer,
});

export default rootReducer;
