import {combineReducers} from 'redux';
import loginFormReducer from './loginFormReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  loginForm: loginFormReducer,
  user: userReducer
});

export default rootReducer;
