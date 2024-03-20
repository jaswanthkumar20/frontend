import { Component } from "react";

import "./index.css";

class LoginForm extends Component {
  state = {
    username: "",
    password: "",
  };

  onChangeUsername = (event) => {
    this.setState({ username: event.target.value });
  };

  onChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  renderPasswordField = () => {
    const { password } = this.state;
    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="password-input-filed"
          value={password}
          onChange={this.onChangePassword}
        />
      </>
    );
  };

  onSuccess = () => {
    const { history } = this.props;
    //console.log("success");
    history.push("/home");
  };

  onSubmitForm = async (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    const userDetails = { username, password };
    localStorage.setItem("user", userDetails);
    const url = "https://backend-1-aqc1.onrender.com/CheckUser";
    const options = {
      method: "POST",
      headers: {
        "Content-Type":"application/json",
        "Authorization": "Bearer rnd_drT34a0JihOAu4IM8qpm8nJxcFdd"
      },
      body: JSON.stringify(userDetails),
    };
    const response = await fetch(url,options);
    console.log(response);
    const responseData = await response.json();
    console.log(responseData)
    if (responseData.status === 200) {
      this.onSuccess();
    } else {
      const { history } = this.props;
      history.replace("/");
    }
  };

  renderUsernameField = () => {
    const { username } = this.state;
    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="username-input-filed"
          value={username}
          onChange={this.onChangeUsername}
        />
      </>
    );
  };

  render() {
    return (
      <div className="login-form-container">
        <form className="form-container" onSubmit={this.onSubmitForm}>
          <img
            src="https://st2.depositphotos.com/1799371/10333/v/450/depositphotos_103333512-stock-illustration-vector-image-of-an-cat.jpg"
            className="login-website-logo-desktop-image"
            alt="website logo"
          />
          <div className="input-container">{this.renderUsernameField()}</div>
          <div className="input-container">{this.renderPasswordField()}</div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
