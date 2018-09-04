import { RaisedButton, Dialog, FlatButton } from 'material-ui';
import React, { Component } from 'react';
class PurchasedProduct extends Component {
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

  render() {
    return (
      <div>
        {
          this.props.Products
            .filter((Product) => { return Product.buyer.Uid === this.state.Auth.Uid })
            .map((Product, i) => {
              return (
                <div key={Product.index}
                  style={{
                    width: "95%", backgroundColor: "#ff0000", textAlign: "left",
                    float: "left", margin: "10px", wordBreak: "break-all"
                  }}
                >
                  <img src={Product.url} alt={Product.name} style={{ height: "155px", margin: "5px", float: "left" }} />
                  <div style={{ backgroundColor: "white", padding: "6px", margin: "5px", height: "143px", width: "98.5%" }}>
                    <table>
                      <tbody>
                        <tr>
                          <th>Name </th>
                          <th>:</th>
                          <td>{this.state.details.name}</td>
                        </tr>
                        <tr>
                          <th>Initial Amount </th>
                          <th>:</th>
                          <td>{this.state.details.bidAmount}</td>
                        </tr>
                        <tr>
                          <th>Purchase Amount</th>
                          <th>: </th>
                          <td>{Product.buyer.bidAmount}</td>
                        </tr>
                      </tbody>
                    </table>
                    <RaisedButton
                      label="Details" primary={true} style={{ float: "right", margin: "39px 6px 6px 3px" }}
                      onClick={() => this.setState({ product: true, details: Product })}
                    />
                    <RaisedButton
                      label="Purchased" disabled={true} primary={true}
                      onClick={() => { }} style={{ float: "right", margin: "39px 6px 6px 3px" }}
                    />
                  </div>
                  <Dialog
                    title={`Product Name: ${Product.name}`}
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
                    <img src={this.state.details.url} alt={this.state.details.name} style={{ width: "100%" }} />
                    <div style={{ backgroundColor: "#303030", padding: "6px" }}>
                      <table style={{ margin: "auto" }} >
                        <tbody>
                          <tr>
                            <th>Name </th>
                            <th>:</th>
                            <td>{this.state.details.name}</td>
                          </tr>
                          <tr>
                            <th>Catogary </th>
                            <th>:</th>
                            <td>{this.state.details.catogary}</td>
                          </tr>
                          <tr>
                            <th>Description </th>
                            <th>:</th>
                            <td>{this.state.details.description}</td>
                          </tr>
                          <tr>
                            <th>Ended On </th>
                            <th>:</th>
                            <td>{this.state.details.endTime}</td>
                          </tr>
                          <tr>
                            <th>Initial Amount </th>
                            <th>:</th>
                            <td>{this.state.details.bidAmount}</td>
                          </tr>
                          <tr>
                            <th>Purchase Amount </th>
                            <th>:</th>
                            <td> {this.state.details.buyer.bidAmount}</td>
                          </tr>
                        </tbody>
                      </table>
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
export default PurchasedProduct;