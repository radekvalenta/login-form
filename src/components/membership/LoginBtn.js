import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as loginActions from '../../actions/LoginActions';

class LoginBtn extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      loginForm: Object.assign({}, props.loginForm)
    };

    this.handleOpen = this.handleOpen.bind(this);
  }

  handleOpen() {
    let loginForm = this.state.loginForm;
    loginForm.visible = true;
    this.props.actions.showLogin(loginForm);
  }

  render() {
    const IS_VISIBLE =
      this.props.loginForm.visible ? 'btn-wrap' : 'btn-wrap is-visible';

    return (
      <div className={IS_VISIBLE}>
        <button className="btn btn-primary btn-lg"
          onClick={this.handleOpen}>LOGIN</button>
      </div>
    );
  }
}

LoginBtn.propTypes = {
  loginForm: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    loginForm: state.loginForm
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(loginActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginBtn);
