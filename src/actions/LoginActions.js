import membershipApi from '../api/mockMembership.js';

export function showLogin(loginForm) {
  return {type: 'SHOW_LOGIN', loginForm};
}

export function validUser(user) {
  return {type: 'VALID_USER', user};
}

// thunks
export function doLogin(user) {
  return function(dispatch) {
    return membershipApi.loginUser(user).then(user => {
      dispatch(validUser(user));
    }).catch(error => {
      throw(error);
    });
  };
}
