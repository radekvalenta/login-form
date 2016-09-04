import initialState from './initialState';

export default function userReducer(state = initialState.user, action) {
  switch(action.type) {
    case 'VALID_USER':
      return Object.assign({}, state, action.user);
    default:
      return state;
  }
}
