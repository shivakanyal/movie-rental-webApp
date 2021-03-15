import React, { Component } from "react";
import Input from "./common/input";
import Joi from "joi-browser";
import Form from "./common/form";
class LoginForm extends Form {
  state = {
    account: { username: "", password: "" },
    errors: {},
  };
  schema = {
    username: Joi.string().required().min(4).label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = () => {
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
          <button
            type="submit"
            class="btn btn-primary"
            disabled={this.validate()}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
