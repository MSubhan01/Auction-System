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
                      <tr>
                        <th>Purchase Amount: </th>
                        <td>{Product.buyer.bidAmount}</td>
                      </tr>
                    </table>
                    <RaisedButton
                      label="Details" primary={true} style={{ float: "right", margin: "39px 6px 6px 3px" }}
                      onClick={() => this.setState({ product: true })}
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
                    <img src={Product.url} alt={Product.url} style={{ width: "100%" }} />
                    <div style={{ backgroundColor: "#303030", padding: "6px" }}>
                      <table>
                        <tr>
                          <th>Name: </th>
                          <td>{Product.name}</td>
                        </tr>
                        <tr>
                          <th>Catogary: </th>
                          <td>{Product.catogary}</td>
                        </tr>
                        <tr>
                          <th>Description: </th>
                          <td>{Product.description}</td>
                        </tr>
                        <tr>
                          <th>Ended On: </th>
                          <td>{Product.endTime}</td>
                        </tr>
                        <tr>
                          <th>Initial Amount: </th>
                          <td>{Product.bidAmount}</td>
                        </tr>
                        <tr>
                          <th>Purchase Amount: </th>
                          <td> {Product.buyer.bidAmount}</td>
                        </tr>
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