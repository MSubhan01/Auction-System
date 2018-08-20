import SwipeableViews from 'react-swipeable-views';
import { Tabs, Tab, Paper } from 'material-ui';
import React, { Component } from 'react';
import AuthAction from '../../store/actions/AuthAction';
import { connect } from 'react-redux';
import { Signin, Signup } from '../../components/index'

const mapStateToProps = (state) => {
  return {
    Store: state.AuthReducer.auth,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    signup: (payload, history) => {
      dispatch(AuthAction.signup(payload, history))
    },
    signin: (payload, history) => {
      dispatch(AuthAction.signin(payload, history))
    },
  };
};

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    };
  }

  handleChange = (value) => { this.setState({ value }) };

  componentWillReceiveProps(nextProps) {
    // if (nextProps.Auth.Catogary === "Company") {
    //   nextProps.history.push("/company")
    // } else if (nextProps.Auth.Catogary === "Student") {
    //   nextProps.history.push("/student")
    // } else if (nextProps.Auth.Catogary === "Admin") {
    //   nextProps.history.push("/admin")
    // } else { }
  }

  render() {
    return (
      <div style={{ margin: "1% auto auto auto", display: "block", width: "40%" }}>
        <Paper>
          <Tabs
            onChange={this.handleChange}
            value={this.state.slideIndex}
          >
            <Tab label="Sign In" value={0} />
            <Tab label="Sign Up" value={1} />
          </Tabs>
          <SwipeableViews
            index={this.state.value}
            onChangeIndex={this.handleChange}
          >
            <div style={{ padding: 10 }}>
              <Signin signin={(payload) => { this.props.signin(payload, this.props.history) }} />
              <div className="button is-primary"></div>
            </div>
            <div style={{ padding: 10 }}>
              <Signup signup={(payload) => { this.props.signup(payload, this.props.history) }} />
            </div>
          </SwipeableViews>
        </Paper>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);