import React, { Component } from "react";
import "./ward.css";
import axios from "axios";
import WardList from "./WardList";
import Navbar from "../Navbar/Navbar";

export default class ward extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wardName: "",
      building: "",
      floor: "",
      regDate: "",
      wardNum: 0,
      discharge: "",
      disDate: "",
      availableRoom: "",
      roomCategory: "",
      roomNum: 0,
      bedNumber: 0,
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      wardName: this.state.wardName,
      building: this.state.building,
      floor: this.state.floor,
      regDate: this.state.regDate,
      wardNum: this.state.wardNum,
      discharge: this.state.discharge,
      disDate: this.state.disDate,
      availableRoom: this.state.availableRoom,
      roomCategory: this.state.roomCategory,
      roomNum: this.state.roomNum,
      bedNumber: this.state.bedNumber,
    };
    console.log("Data to send", data);

    axios
      .post("http://localhost:4000/ward/add", data)
      .then((res) => console.log(res.data));

    this.setState({
      wardName: "",
      building: "",
      floor: "",
      regDate: "",
      wardNum: 0,
      discharge: "",
      disDate: "",
      availableRoom: 0,
      roomCategory: "",
      roomNum: 0,
      bedNumber: 0,
    });
  };

  reset() {
    const res = {
      wardName: "",
      building: "",
      floor: "",
      regDate: "",
      wardNum: 0,
      discharge: "",
      disDate: "",
      availableRoom: 0,
      roomCategory: "",
      roomNum: 0,
      bedNumber: 0,
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:4000/ward/")
      .then((response) => {
        this.setState({ ward: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  wardList() {
	  return this.state.ward.map((res, i) => {
		  return <WardList obj={res} key={i} />
	  })
  }

  setDischarge(e) {
    this.setState({ [e.target.name]: e.target.value });
    console.log(e.target.value);
  }

  render() {
    return (
      <div>
        <Navbar/>
        <div className="WardContainer col-md-12">
          <form onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="col">
                <label>Ward Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="wardName"
                  value={this.state.wardName}
                  onChange={this.handleChange}
                />
              </div>
              <div className="col">
                <label>Available Room</label>
                <input
                  type="text"
                  className="form-control"
                  name="availableRoom"
                  value={this.state.availableRoom}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <label>Building</label>
                <input
                  type="text"
                  className="form-control"
                  name="building"
                  value={this.state.building}
                  onChange={this.handleChange}
                />
              </div>
              <div className="col">
                <label>Room Category</label>
                <input
                  type="text"
                  className="form-control"
                  name="roomCategory"
                  value={this.state.roomCategory}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <label>Floor</label>
                <input
                  type="text"
                  className="form-control"
                  name="floor"
                  value={this.state.floor}
                  onChange={this.handleChange}
                />
              </div>
              <div className="col">
                <label>Room Number</label>
                <input
                  type="number"
                  className="form-control"
                  name="roomNum"
                  value={this.state.roomNum}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <label>Register Date</label>
                <input
                  type="date"
                  className="form-control"
                  name="regDate"
                  value={this.state.regDate}
                  onChange={this.handleChange}
                />
              </div>
              <div className="col">
                <label>Bed Number</label>
                <input
                  type="number"
                  className="form-control"
                  name="bedNumber"
                  value={this.state.bedNumber}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <label>Ward Number</label>
                <input
                  type="number"
                  className="form-control"
                  name="wardNum"
                  value={this.state.wardNum}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <label>Discharge</label>
                <div onChange={this.setDischarge.bind(this)}>
                  <input type="radio" value="Yes" name="discharge" /> Yes
                  <input type="radio" value="No" name="discharge" /> No
                </div>
              </div>

              <div className="col-md-6">
                <div>
                  <button type="submit" className="wardSubmit">
                    Save
                  </button>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <label>Discharge Date</label>
                <input
                  type="date"
                  className="form-control"
                  name="disDate"
                  value={this.state.disDate}
                  onChange={this.handleChange}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
