import { Dialog, FlatButton, RaisedButton, TextField } from 'material-ui';
import React, { Component } from 'react';
class Product extends Component {
  constructor() {
    super();
    this.state = {
      value: 4,
      product: false,
      bidAmount: 0,
      open: false,
      show: false,
      bidHigh: 0,
      modalId: '',
      details: {
        Uid: "",
        bidAmount: "",
        buyer: { Email: "", Name: "", Uid: "", bidAmount: "" },
        catogary: "",
        description: "",
        endTime: "",
        index: "-",
        name: "",
        notSold: false,
        sold: true,
        url: "",
        user: "",
      },
      Auth: {
        Name: "",
        Email: "",
        Password: "",
        Uid: "",
      },
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.Auth !== undefined) {
      this.setState({ Auth: nextProps.Auth })
    }
  }
  handleOpen = (bidHigh, Bids) => {
    let Bid = bidHigh;
    if (Bids !== undefined) {
      Bid = Object.values(Bids).reverse()[0].bidAmount
    }
    this.setState({ open: true, bidAmount: Bid, bidHigh: Bid, })
  };
  handleChange = (e, value) => { this.setState({ value }) };
  bid = (Bid, index) => {
    this.props.bid(Bid, index);
    this.setState({ show: false, open: false })
  }
  check = (Product) => {
    let interval = setInterval(() => {
      let endTime = new Date(Product.endTime).getTime()
      let time = new Date().getTime()
      if (Product.sold === true || Product.notSold === true) {
        clearInterval(interval)
      } else {
        if (endTime <= time) {
          if (Product.Bids !== undefined) {
            this.props.sold({ ...Product, sold: true, notSold: false, buyer: Object.values(Product.Bids).reverse()[0] })
            clearInterval(interval)
          } else {
            this.props.sold({ ...Product, sold: false, notSold: true, buyer: { Email: "", Name: "", Uid: "", bidAmount: "" } })
            clearInterval(interval)
          }
        }
      }
    }, 2000)
  }

  render() {
    return (
      <div>
        {
          this.props.Products
            .filter((Product) => { return Product.catogary === this.props.type })
            .filter((Product) => { return Product.sold === false })
            .filter((Product) => { return Product.notSold === false })
            .filter((Product) => { return Product.Uid !== this.state.Auth.Uid })
            .map((Product) => {
              this.check(Product)
              return (
                <div key={Product.index}
                  style={{
                    width: "95%", backgroundColor: "#ff0000", textAlign: "left",
                    float: "left", margin: "10px", wordBreak: "break-all"
                  }}
                >
                  <img src={Product.url} alt={Product.url} style={{ height: "155px", margin: "5px", float: "left" }} />
                  <div style={{ backgroundColor: "white", padding: "6px", margin: "5px", height: "143px", width: "98.5%" }}>
                    <table>
                      <tr>
                        <th>Name: </th>
                        <td>{Product.name}</td>
                      </tr>
                      <tr>
                        <th>Initial Amount: </th>
                        <td>{Product.bidAmount}</td>
                      </tr>
                      {Product.Bids !== undefined
                        ? <tr>
                          <th>Highest Bid: </th>
                          <td> {Object.values(Product.Bids).reverse()[0].bidAmount}</td>
                        </tr>
                        : null
                      }
                    </table>
                    <RaisedButton
                      label="Details" disabled={false} primary={true}
                      style={{ float: "right", margin: "39px 6px 6px 3px" }}
                      onClick={() => this.setState({ product: true, details: Product })}
                    />
                  </div>
                  <Dialog
                    title={`Product Name: ${this.state.details.name}`}
                    autoScrollBodyContent={true}
                    actions={[
                      <RaisedButton
                        label="Bid" disabled={false} primary={true}
                        onClick={() => this.handleOpen(Number(this.state.details.bidAmount), this.state.details.Bids)}
                      />,
                      <FlatButton
                        label="Cancel"
                        primary={true}
                        onClick={() => this.setState({ product: false })}
                      />,
                    ]}
                    modal={false}
                    open={this.state.product}
                    onRequestClose={() => this.setState({ open: false })}
                  >
                    <img src={this.state.details.url} alt={this.state.details.url} style={{ width: "100%" }} />
                    <div style={{ backgroundColor: "#303030", padding: "6px" }}>
                      <table>
                        <tr>
                          <th>Name: </th>
                          <td>{this.state.details.name}</td>
                        </tr>
                        <tr>
                          <th>Description: </th>
                          <td>{this.state.details.description}</td>
                        </tr>
                        <tr>
                          <th>Active Untill: </th>
                          <td>{this.state.details.endTime}</td>
                        </tr>
                        <tr>
                          <th>Initial Amount: </th>
                          <td>{this.state.details.bidAmount}</td>
                        </tr>
                        {this.state.details.Bids !== undefined
                          ? <tr>
                            <th>Highest Bid: </th>
                            <td> {Object.values(this.state.details.Bids).reverse()[0].bidAmount}</td>
                          </tr>
                          : null
                        }
                      </table>
                    </div>
                  </Dialog>
                  <Dialog
                    title={`Product Name: ${this.state.details.name}`}
                    actions={[
                      <RaisedButton
                        label="Apply"
                        primary={true}
                        keyboardFocused={true}
                        onClick={() => this.setState({ show: true })}
                      />,
                      <FlatButton
                        label="Cancel"
                        primary={true}
                        onClick={() => this.setState({ open: false })}
                      />,
                    ]}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={() => this.setState({ open: false })}
                  >
                    <div>Product Description: {this.state.details.description}</div>
                    <TextField
                      onChange={(val) => { this.setState({ bidAmount: val.target.value }) }}
                      type="number" floatingLabelText="Bidding Amount"
                      className="Bidding Amount" value={Number(this.state.bidAmount)}
                    />
                  </Dialog>
                  <Dialog
                    title={"ALERT"}
                    actions={
                      this.state.bidHigh >= this.state.bidAmount
                        ?
                        <RaisedButton
                          label="Okey"
                          primary={true}
                          keyboardFocused={true}
                          onClick={() => { this.setState({ show: false }) }}
                        />
                        : [
                          <RaisedButton
                            label="Yes"
                            primary={true}
                            keyboardFocused={true}
                            onClick={() => { this.bid({ ...this.props.Auth, bidAmount: this.state.bidAmount }, this.state.details.index) }}
                          />,
                          <FlatButton
                            label="No"
                            primary={true}
                            onClick={() => { this.setState({ show: false }) }}
                          />,
                        ]}
                    modal={true}
                    open={this.state.show}
                    onRequestClose={this.handleOpen}
                  >
                    {this.state.bidHigh >= this.state.bidAmount
                      ? `Bid Amount Should Be Greater Than ${this.state.details.Bids === undefined ? "Initial Amount" : "Highest Bid"}`
                      : `Are You Sure You Want To Bid Rs.${this.state.bidAmount} For ${this.state.details.name} ?`}
                  </Dialog>
                </div>
              )
            })
        }
      </div>
    )
  }
}
export default Product;