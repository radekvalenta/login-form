const DELAY = 500;

class membershipApi {
  static loginUser(user) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {

        if (typeof user.username !== 'undefined'
          && typeof user.password !== 'undefined') {
          // Simulate server-side user validation
          // Lowercase and remove all non-alphanumeric characters
          // and reverse password
          user.validUser = (() => {
            if(user.username.replace(/\W/g, '').toLowerCase() ===
              [...user.password.replace(/\W/g, '').toLowerCase()].reverse().join('')) {
              return true;
            } else {
              return false;
            }
          })();
        }

        // password should never be returned
        user.password = '';

        resolve(user);
      }, DELAY);
    });
  }
}

export default membershipApi;
