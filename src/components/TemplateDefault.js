import React from 'react';

import LoginBtn from './membership/LoginBtn';
import LoginForm from './membership/LoginForm';

class TemplateDefault extends React.Component {
  render() {
    return (
      <div className="page-inner-wrap">
        <div className="membership-login">
          <LoginBtn />
          <LoginForm />
        </div>
      </div>
    );
  }
}

export default TemplateDefault;
