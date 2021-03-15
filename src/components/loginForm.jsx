import React, { Component } from "react";
import Input from "./common/input";

class LoginForm extends Component {
  state = {
    account: { username: "", password: "" },
    errors: {},
  };
  validate = () => {
    const { account } = this.state;
    const errors = {};
    if (account.username.trim().length === 0)
      errors.username = "username is required!";

    if (account.password.trim().length === 0)
      errors.password = "password is required!";

    return Object.keys(errors).length === 0 ? null : errors;
  };
  validateProperty = ({ name, value }) => {
    if (name === "username") {
      if (value.trim() === "") return "username is required!";
    }
    if (name === "password") {
      if (value.trim() === "") return "Password is required!";
    }
  };
  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account, errors });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate() || {};
    console.log(errors);
    this.setState({ errors });
    if (errors) return;

    // call the server
    console.log("submitted");
  };
  render() {
    const { account, errors } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            onChange={this.handleChange}
            value={account.username}
            label="Username"
            name="username"
            error={errors.username}
          />
          <Input
            onChange={this.handleChange}
            value={account.password}
            label="Password"
            name="password"
            error={errors.password}
          />
          <button type="submit" class="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
