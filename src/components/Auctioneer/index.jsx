import React, { Component } from 'react';
import { Paper, DatePicker, TimePicker, RaisedButton, TextField, DropDownMenu, MenuItem } from "material-ui";
import FolderIcon from 'material-ui/svg-icons/file/folder-open';

class Auctioneer extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      description: "",
      bidAmount: 50,
      date: null,
      time: null,
      file: null,
      img: null,
      value: 0,
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
  handleChange = (event, index, value) => this.setState({ value });
  date = (e, date) => { this.setState({ date }) }
  time = (e, time) => { this.setState({ time }) }
  post = () => {
    let { name, description, bidAmount, date, time, img, file, value } = this.state
    let { Name, Uid } = this.props.Auth
    let type = ["Others", "Mobiles", "Refrigerators", "Flat Screens", "LCD's"]
    switch (true) {
      case name === "":
        alert("Name is Required")
        break;
      case Name === "":
        alert("Wait a Brief Moment than Try Again")
        break;
      case Uid === "":
        alert("Wait a Brief Moment than Try Agains")
        break;
      case description === "":
        alert("Description is Required")
        break;
      case bidAmount < 50:
        alert("Bidding Amount should Greater than 50")
        break;
      case date === null:
        alert("Date is Required")
        break;
      case time === null:
        alert("Time is Required")
        break;
      case img === null:
        alert("Image is Required")
        break;
      case (date.getDate() === new Date().getDate() && date.getHours() === new Date().getHours):
        alert("Can Not Post For Current Hour")
        break;

      default:
        let endTime = new Date()
        endTime.setDate(date.getDate())
        endTime.setMonth(date.getMonth())
        endTime.setFullYear(date.getFullYear())
        endTime.setHours(time.getHours())
        endTime.setMinutes(time.getMinutes())
        let product = { name, description, bidAmount, file, endTime: endTime.toLocaleString(), Uid, user: Name, catogary: type[value] }
        this.props.post(product);
        this.setState({
          name: "",
          description: "",
          bidAmount: 50,
          date: null,
          time: null,
          file: null,
          img: null,
          value: 0,
        })
        break;
    }
  }

  PreviewImage = (e) => {
    let oFReader = new FileReader();
    let file = e.target.files[0];
    oFReader.readAsDataURL(file);
    oFReader.onload = (event) => {
      this.setState({ img: event.target.result, file })
      document.getElementById("uploadPreview").src = event.target.result;
    };
  };
  render() {
    return (
      <div style={{ margin: "1px 40vw auto" }} >
        <Paper style={{ width: "fit-content", padding: "15px" }}>
          <form onSubmit={this.signin.bind(this)} >
            <DropDownMenu value={this.state.value} onChange={this.handleChange}>
              <MenuItem value={0} primaryText="Others" />
              <MenuItem value={1} primaryText="Mobiles" />
              <MenuItem value={2} primaryText="Refrigerators" />
              <MenuItem value={3} primaryText="Flat Screens" />
              <MenuItem value={4} primaryText="LCD's" />
            </DropDownMenu>
            <br />
            <TextField
              className="Name" value={this.state.name}
              onChange={(val) => { this.setState({ name: val.target.value.toUpperCase() }) }}
              hintText="Something" floatingLabelText="Name"
            />
            <br />
            <TextField
              onChange={(val) => { this.setState({ description: val.target.value }) }}
              hintText="Description" floatingLabelText="Description" multiLine={true}
              rowsMax={3} className="description" value={this.state.description}
              floatingLabelStyle={{ marginLeft: "-50%" }}
            />
            <br />
            <TextField
              onChange={(val) => { this.setState({ bidAmount: val.target.value }) }}
              type="number" floatingLabelText="Bidding Amount"
              className="Bidding Amount" value={Number(this.state.bidAmount)}
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
              hintText="Time"
              value={this.state.time}
              onChange={this.time}
            />
            <RaisedButton
              label="Image"
              labelPosition="before"
              style={{ margin: "0px 12px", minWidth: "36px" }}
              primary={true}
              icon={<FolderIcon />}
              containerElement="label"
            >
              <input type="file" onChange={this.PreviewImage} id="img" accept="image/*"
                style={{
                  cursor: 'pointer', position: 'absolute',
                  top: 0, bottom: 0, right: 0, left: 0, width: '100%', opacity: 0,
                }}
              />
            </RaisedButton>
            <br />
            {this.state.img !== null ? <img id="uploadPreview" style={{ width: "100%" }} src={this.state.img} alt="qwerty" /> : null}
            <br />
            <RaisedButton
              primary={true} onClick={this.post}
              label="Post Auction" style={{ margin: "3px" }}
            />
          </form>
        </Paper>
      </div>
    );
  }
}
export default Auctioneer;