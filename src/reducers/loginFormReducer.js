import initialState from './initialState';

export default function loginFormReducer(state = initialState.loginForm, action) {
  switch(action.type) {
    case 'SHOW_LOGIN':
      return Object.assign({}, state, action.loginForm);
    default:
      return state;
  }
}
