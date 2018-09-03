import { Paper } from 'material-ui';
import React, { Component } from 'react';
import { YourProduct } from "../index";
class Your extends Component {
  constructor() {
    super();
    this.state = {
      value: 4,
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
        <YourProduct sold={this.props.sold} bid={this.props.bid} Products={this.props.Products} Auth={this.props.Auth} />
      </div>
    );
  }
}
export default Your;