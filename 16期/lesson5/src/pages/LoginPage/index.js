import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import BasicLayout from "../../layout/BasicLayout/";
import {loginAction} from "../../action/login";
import "./index.scss";

export default connect(({user}) => ({user}), {
  // login: userInfo => ({type: "LOGIN_SUCCESS", payload: userInfo})
  // login: userInfo => dispatch => {
  //   loginAction(dispatch, userInfo);
  //   // dispatch({type: "LOGIN_REQUEST"});
  //   // setTimeout(() => {
  //   //   dispatch({type: "LOGIN_SUCCESS", payload: userInfo});
  //   // }, 1000);
  // }
  // saga
  login: userInfo => ({type: "loginSaga", payload: userInfo})
})(
  class LoginPage extends Component {
    constructor(props) {
      super(props);
      this.state = {name: ""};
    }
    render() {
      const {login, user, location} = this.props;
      const {isLogin, loading, err} = user;
      if (isLogin) {
        const {redirect = "/"} = location.state || {};
        return <Redirect to={redirect} />;
      }
      const {name} = this.state;
      return (
        <BasicLayout title="登录" _className="loginPage">
          <h3>LoginPage</h3>
          <input
            type="text"
            value={name}
            onChange={event => this.setState({name: event.target.value})}
          />
          <p className="red">{err.msg}</p>
          <button onClick={() => login({name})}>
            {loading ? "loading..." : "登录"}
          </button>
        </BasicLayout>
      );
    }
  }
);
