import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
class Form extends Component {
  state = {
    data: {},
    errors: {},
  };
  validate = () => {
    const result = Joi.validate(this.state.account, this.schema, {
      abortEarly: false,
    });
    if (!result.error) return null;
    const { account } = this.state;
    const errors = {};
    for (let item of result.error.details) errors[item.path[0]] = item.message;
    return errors;
  };
  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate() || {};
    console.log(errors);
    this.setState({ errors });
    if (errors) return;

    this.doSubmit();
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
  renderButton(label) {
    return (
      <button type="submit" class="btn btn-primary" disabled={this.validate()}>
        {label}
      </button>
    );
  }
  renderInput(name, label, type = "text") {
    const { account, errors } = this.state;
    return (
      <Input
        type={type}
        onChange={this.handleChange}
        value={account[name]}
        label={label}
        name={name}
        error={errors[name]}
      />
    );
  }
}

export default Form;
