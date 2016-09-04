import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as loginActions from '../../actions/LoginActions';

class LoginBtn extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      loginForm: Object.assign({}, props.loginForm),
      user: Object.assign({}, props.user)
    };

    this.handleClose = this.handleClose.bind(this);
    this.updateLoginForm = this.updateLoginForm.bind(this);
    this.doLogin = this.doLogin.bind(this);
  }

  handleClose() {
    let loginForm = this.state.loginForm;
    loginForm.visible = false;
    this.props.actions.showLogin(loginForm);
  }

  updateLoginForm(e) {
    const FIELD = e.target.id;
    let user = this.state.user;
    user[FIELD] = e.target.value;
    return this.setState({user: user});
  }

  doLogin(e) {
    e.preventDefault();
    e.target.checkValidity();
    this.props.actions.doLogin(this.state.user);
  }

  render() {
    const IS_VISIBLE =
      this.props.loginForm.visible ? 'login-form is-visible' : 'login-form';
    const LOGIN_SUCCESS_MESSAGE =
      this.props.user.validUser === true
      ? this.props.user.successMessage : '';
    const LOGIN_ERROR_MESSAGE =
      this.props.user.validUser === false
      ? this.props.user.errorMessage : '';

    return (
      <div className={IS_VISIBLE}>
        {(() => {
          if(LOGIN_SUCCESS_MESSAGE.length || LOGIN_ERROR_MESSAGE.length) {
            return (
              <div className="message-wrap">
                {LOGIN_ERROR_MESSAGE}{LOGIN_SUCCESS_MESSAGE}
              </div>
            );
          }
        })()}
        <form action="" method="post" onSubmit={this.doLogin}>
          <div className="input-wrap">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              className="input-control"
              type="text"
              onChange={this.updateLoginForm}
              pattern=".{4,}"
              title="Username must be at least 4 characters long"
              required />
          </div>
          <div className="input-wrap">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              className="input-control"
              type="password"
              onChange={this.updateLoginForm}
              pattern="(?=.*?[^a-zA-Z]).{4,}"
              title="Password must be at least 4 characters long and contain at least one non-alphabetical character"
              required />
          </div>
          <input className="btn btn-primary" type="submit" value="LOGIN" />
        </form>
        <a href="javascript:;" className="btn-close"
          onClick={this.handleClose}>
          <span className="hide-visually">CLOSE</span>
        </a>
      </div>
    );
  }
}

LoginBtn.propTypes = {
  loginForm: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    loginForm: state.loginForm,
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(loginActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginBtn);
