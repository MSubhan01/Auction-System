import SwipeableViews from 'react-swipeable-views';
import React, { Component } from 'react';
import AuthAction from '../../store/actions/AuthAction';
import { connect } from 'react-redux';
import { Auctioneer, Sold, Purchased, Bidder } from '../../components/index'
import {
  Tabs, Tab,
  FlatButton,
  ToolbarGroup,
  ToolbarTitle,
  MenuItem,
  Toolbar,
} from 'material-ui'

const mapStateToProps = (state) => {
  return {
    Auth: state.AuthReducer.auth,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    signout: (history) => {
      dispatch(AuthAction.signout(history))
    },
    apply: (slot, auth) => {
      dispatch(AuthAction.apply(slot, auth))
    },
    delete: (key) => {
      dispatch(AuthAction.delete(key))
    },
    send: (payload) => {
      dispatch(AuthAction.send(payload))
    },
  };
};

class Dashboard extends Component {
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
      <div style={{ margin: "1% auto auto auto", display: "block" }}>
        <Toolbar style={{ margin: "auto 2%" }}>
          <ToolbarGroup firstChild={true}>
            <MenuItem>
              <ToolbarTitle style={{ color: "white" }} text={this.props.Auth.Name} />
            </MenuItem>
          </ToolbarGroup>
          <ToolbarGroup style={{ width: "100%", margin: "auto" }} >
            <Tabs
              style={{ width: "50%", margin: "auto" }}
              onChange={this.handleChange.bind(this)}
              value={this.state.value}
            >
              <Tab label="Auctioneer" value={0} />
              <Tab label="Sold Product" value={1} />
              <Tab label="Purchased Product" value={2} />
              <Tab label="Bidder" value={3} />
            </Tabs>
          </ToolbarGroup>
          <ToolbarGroup lastChild={true}>

            <FlatButton label="SignOut" onClick={() => { this.props.signout(this.props.history) }} />
          </ToolbarGroup>
        </Toolbar>
        <SwipeableViews
          index={this.state.value}
          onChangeIndex={this.handleChange}
        >
          <div><Auctioneer /></div>
          <div><Sold /></div>
          <div><Purchased /></div>
          <div><Bidder /></div>
        </SwipeableViews>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);