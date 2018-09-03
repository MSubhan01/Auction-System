import { RaisedButton, Dialog, FlatButton } from 'material-ui';
import React, { Component } from 'react';
class YourProduct extends Component {
  constructor() {
    super();
    this.state = {
      value: 4,
      product: false,
      open: false,
      show: false,
      bidAmount: 0,
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
  handleChange = (e, value) => { this.setState({ value }) }
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
            .filter((Product) => { return Product.Uid === this.state.Auth.Uid })
            .map((Product, i) => {
              this.check(Product)
              console.log('====================================');
              console.log(Product);
              console.log('====================================');
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
                      label="Details" primary={true} style={{ float: "right", margin: "39px 6px 6px 3px" }}
                      onClick={() => this.setState({ product: true })}
                    />
                    <RaisedButton
                      label={Product.sold ? "Sold" : Product.notSold ? "NotSold" : "Ongoing"} disabled={true} primary={true}
                      onClick={() => { }} style={{ float: "right", margin: "39px 6px 6px 3px" }}
                    />
                  </div>
                  <Dialog
                    title={`Product Name: ${this.state.details.name}`}
                    autoScrollBodyContent={true}
                    actions={
                      <FlatButton
                        label="Cancel"
                        primary={true}
                        onClick={() => this.setState({ product: false })}
                      />
                    }
                    modal={false}
                    open={this.state.product}
                    onRequestClose={() => this.setState({ open: false })}
                  >
                    <img src={this.state.details.url} alt={this.state.details.url} style={{ width: "100%" }} />
                    <div style={{ backgroundColor: "#303030", padding: "6px" }}>
                      <div>Product Name: {this.state.details.name}</div>
                      <div>Product Description: {this.state.details.description}</div>
                      <div>Active Untill: {this.state.details.endTime}</div>
                      <div>Initial Amount: {this.state.details.bidAmount}</div>
                      {this.state.details.Bids !== undefined
                        ? <div>
                          <div>Highest Bid: {
                            this.state.details.Bids !== undefined
                              ? Object.values(this.state.details.Bids).reverse()[0].bidAmount
                              : null
                          }</div>
                          Bids
                        <div style={{ maxHeight: "35px", overflow: "auto", textAlign: "center" }} >
                            {
                              Object.values(this.state.details.Bids)
                                .reverse()
                                .map((bid, index) => {
                                  return <p style={{ margin: 0 }} key={index + 1}>{bid.Name}  Rs.{bid.bidAmount}</p>
                                })
                            }
                          </div>
                        </div>
                        : null
                      }
                    </div>
                  </Dialog>
                </div>
              )
            })
        }
      </div>
    )
  }
}
export default YourProduct;