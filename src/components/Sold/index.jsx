import { RaisedButton, TextField } from 'material-ui';
import React, { Component } from 'react';
class Sold extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      margin: 12,
    };
  }
  signin(e) {
    e.preventDefault(e);
    this.props.signin({ Email: this.state.email, Password: this.state.password })
  }
  render() {
    return (
      <div>
        <form onSubmit={this.signin.bind(this)}>
          <TextField
            onChange={(val) => { this.setState({ email: val.target.value }) }}
            hintText="someone@example.com" floatingLabelText="E-Mail"
            className="email-in" value={this.state.email}
          />
          <br />
          <TextField
            type="password" className="password-in" value={this.state.password}
            onChange={(val) => { this.setState({ password: val.target.value }) }}
            hintText="Password Field" floatingLabelText="Password"
          />
          <br />
          <RaisedButton
            primary={true} onClick={this.signin.bind(this)}
            label="Sign In" style={{ margin: "3px" }}
          />
        </form>
      </div>
    );
  }
}
export default Sold;