import SwipeableViews from 'react-swipeable-views';
import React, { Component } from 'react';
import AuthAction from '../../store/actions/AuthAction';
import { connect } from 'react-redux';
import { Auctioneer, Your, Purchased, Bidder } from '../../components/index'
import {
  Tabs, Tab,
  FlatButton,
  ToolbarGroup,
  LinearProgress,
  ToolbarTitle,
  MenuItem,
  Toolbar,
} from 'material-ui'

const mapStateToProps = (state) => {
  return {
    Auth: state.AuthReducer.auth,
    Products: state.Products.Products,
    isLoading: state.Products.isLoading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    signout: (history) => {
      dispatch(AuthAction.signout(history))
    },
    post: (product) => {
      dispatch(AuthAction.post(product))
    },
    delete: (key) => {
      dispatch(AuthAction.delete(key))
    },
    send: (payload) => {
      dispatch(AuthAction.send(payload))
    },
    bid: (Bid, index) => {
      dispatch(AuthAction.bid(Bid, index))
    },
    sold: (product) => {
      dispatch(AuthAction.sold(product))
    },
  };
};

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 3,
    };
  }

  handleChange = (value) => { this.setState({ value }) };

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
              <Tab label="Your Products" value={1} />
              <Tab label="Purchased Products" value={2} />
              <Tab label="Bidder" value={3} />
            </Tabs>
          </ToolbarGroup>
          <ToolbarGroup lastChild={true}>
            <FlatButton label="SignOut" onClick={() => { this.props.signout(this.props.history) }} />
          </ToolbarGroup>
        </Toolbar>
        {this.props.isLoading ? <LinearProgress mode="indeterminate" color="gold" style={{ width: "94vw", margin: "auto" }} /> : null}
        <SwipeableViews
          index={this.state.value}
          onChangeIndex={this.handleChange}
        >
          <div><Auctioneer Auth={this.props.Auth} post={this.props.post} /></div>
          <div><Your sold={this.props.sold} bid={this.props.bid} Products={this.props.Products} Auth={this.props.Auth} /></div>
          <div><Purchased bid={this.props.bid} Products={this.props.Products} Auth={this.props.Auth} /></div>
          <div><Bidder sold={this.props.sold} bid={this.props.bid} Products={this.props.Products} Auth={this.props.Auth} /></div>
        </SwipeableViews>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);