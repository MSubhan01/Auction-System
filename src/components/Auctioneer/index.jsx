import { RaisedButton, TextField } from 'material-ui';
import React, { Component } from 'react';
import { Paper, DatePicker, TimePicker } from "material-ui";
class Auctioneer extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      discription: "",
      margin: 12,
      date: null,
      fromTime: null,
      toTime: null,
      checkDate: null,
      checkFromTime: null,
      checkToTime: null,
      img: null,
    };
  }
  signin(e) {
    e.preventDefault(e);
    this.props.signin({ Email: this.state.email, Password: this.state.password })
  }
  disabled = (a) => {
    switch (true) {
      case (new Date().getFullYear() > a.getFullYear()):
        return true
      // break;
      case (new Date().getMonth() > a.getMonth() && new Date().getFullYear() === a.getFullYear()):
        return new Date().getMonth() > a.getMonth()
      // break;
      case (new Date().getMonth() === a.getMonth() && new Date().getFullYear() === a.getFullYear()):
        return new Date().getDate() > a.getDate()
      // break;
      default:
        return false
      // break;
    }
  }

  PreviewImage() {
    var oFReader = new FileReader();
    oFReader.readAsDataURL(document.getElementById("uploadImage").files[0]);

    oFReader.onload = function (oFREvent) {
      document.getElementById("uploadPreview").src = oFREvent.target.result;
    };
  };
  render() {
    return (
      <div style={{ margin: "1px 40vw auto" }} >
        <Paper style={{ width: "fit-content", padding: "15px" }}>
          <form onSubmit={this.signin.bind(this)} style={{/* float: "left" */ }} >
            <TextField
              className="Name" value={this.state.Name}
              onChange={(val) => { this.setState({ password: val.target.value }) }}
              hintText="Something" floatingLabelText="Name"
            />
            <br />
            <TextField
              onChange={(val) => { this.setState({ email: val.target.value }) }}
              hintText="Discription" floatingLabelText="Discription"
              className="discription" value={this.state.discription}
            />
            <br />
            <TextField
              onChange={(val) => { this.setState({ email: val.target.value }) }}
              type="number" floatingLabelText="Bidding Amount"
              className="Bidding Amount" value={this.state.discription}
            />
            <br />
            <br />
            <DatePicker hintText="Date"
              value={this.state.date}
              onChange={this.date}
              autoOk={true}
              shouldDisableDate={this.disabled}
            />
            <br />
            <TimePicker
              format="ampm"
              hintText="From Time"
              value={this.state.fromTime}
              onChange={this.fromTime}
            />
            <RaisedButton
              primary={true} onClick={() => { }}
              label="Post Auction" style={{ margin: "3px" }}
            />
          </form>
          <input type="file" name="Product" id="img" onChange={(a) => { console.log(a.target.files); this.setState({ img: a.target.files[0] }) }} />
          <img id="uploadPreview" style={{ width: "100px", height: "100px" }} />
          <input id="uploadImage" type="file" name="myPhoto" onChange={this.PreviewImage.bind(this)} />


          {this.state.img !== null ? <img src={this.state.img} alt="qwerty" /> : null}
        </Paper>
      </div>
    );
  }
}
export default Auctioneer;