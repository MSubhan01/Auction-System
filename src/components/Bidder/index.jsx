import { DropDownMenu, MenuItem } from 'material-ui';
import React, { Component } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { Product } from "../index";
class Bidder extends Component {
  constructor() {
    super();
    this.state = {
      value: 0,
      open: false,
      show: false,
      bidAmount: 0,
      productAmount: 0,
      name: "",
      description: "",
    };
  }
  handleOpen = (bidAmount, name, description) => { this.setState({ open: !this.state.open, productAmount: bidAmount - 50, bidAmount, name, description }) };
  handleChange = (e, value) => { this.setState({ value }) };
  render() {
    return (
      <div style={{ margin: "1px auto" }}>
        <DropDownMenu value={this.state.value} onChange={this.handleChange} openImmediately={false} style={{ backgroundColor: "#2d2d2d" }} >
          <MenuItem value={0} primaryText="Others" />
          <MenuItem value={1} primaryText="Mobiles" />
          <MenuItem value={2} primaryText="Refrigerators" />
          <MenuItem value={3} primaryText="Flat Screens" />
          <MenuItem value={4} primaryText="LCD's" />
        </DropDownMenu>
        <SwipeableViews
          index={this.state.value}
          onChangeIndex={this.handleChange}
        >
          <div><Product sold={this.props.sold} bid={this.props.bid} Products={this.props.Products} Auth={this.props.Auth} type="Others" /></div>
          <div><Product sold={this.props.sold} bid={this.props.bid} Products={this.props.Products} Auth={this.props.Auth} type="Mobiles" /></div>
          <div><Product sold={this.props.sold} bid={this.props.bid} Products={this.props.Products} Auth={this.props.Auth} type="Refrigerators" /></div>
          <div><Product sold={this.props.sold} bid={this.props.bid} Products={this.props.Products} Auth={this.props.Auth} type="Flat Screens" /></div>
          <div><Product sold={this.props.sold} bid={this.props.bid} Products={this.props.Products} Auth={this.props.Auth} type="LCD's" /></div>
        </SwipeableViews>
      </div>
    );
  }
}
export default Bidder;