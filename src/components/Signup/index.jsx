import { RaisedButton, TextField } from 'material-ui';
import React, { Component } from 'react';
class Signup extends Component {
  constructor() {
    super();
    this.state = {
      admin: "admin",
      name: "",
      email: "",
      password: "",
    };
  }
  signup(e) {
    e.preventDefault(e);
    switch (true) {
      case (this.state.name === ""):
        alert("Write A User Name")
        break;
      case (this.state.admin === this.state.name.toLowerCase()):
        alert(`Username: ${this.state.name} Is Not Allowed`)
        break;
      default:
        this.props.signup({
          Email: this.state.email,
          Password: this.state.password,
          Name: this.state.name,
        })
        break;
    }
  }
  render() {
    return (
      <div style={{ padding: 10 }}>
        <form onSubmit={this.signup.bind(this)}>
          <TextField
            onChange={(val) => { this.setState({ name: val.target.value }) }}
            hintText="Example" floatingLabelText="User Name"
            className="name-up"
          />
          <br />
          <TextField
            onChange={(val) => { this.setState({ email: val.target.value }) }}
            hintText="someone@example.com" floatingLabelText="E-Mail"
            className="email-up"
          />
          <br />
          <TextField
            onChange={(val) => { this.setState({ password: val.target.value }) }}
            hintText="Key Word" floatingLabelText="Password"
            type="password" className="password-up"
          />
          <br />
          <RaisedButton
            primary={true} onClick={this.signup.bind(this)}
            label="Sign Up" style={{ margin: "3px" }}
          />
        </form>
      </div>
    );
  }
}
export default Signup;