import React, { Component } from "react";
import "./ambulance.css";
import axios from "axios";
import AmbulanceList from "./AmbulanceList";
import Navbar from "../Navbar/Navbar.jsx";

export default class ambulance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      plate: "",
      driver: "",
      dob: "",
      phone: "",
      available: "",
      travelTime: 0,
    };
    this.state = { ambulance: [] };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      plate: this.state.plate,
      driver: this.state.driver,
      dob: this.state.dob,
      phone: this.state.phone,
      available: this.state.available,
      travelTime: this.state.travelTime,
    };
    console.log("Data to send", data);

    axios
      .post("http://localhost:4000/ambulance/add", data)
      .then((res) => console.log(res.data));

    this.setState({
      plate: "",
      driver: "",
      dob: "",
      phone: "",
      available: "",
      travelTime: 0,
    });
  };

  reset() {
    const res = {
      plate: "",
      driver: "",
      dob: "",
      phone: "",
      available: "",
      travelTime: 0,
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:4000/ambulance/")
      .then((response) => {
        this.setState({ ambulance: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  
  render() {
    return (
      <div>
        <Navbar/>
        <div className="AmbulanceContainer">
        <table className="col-md-12">
          <div className="col-md-6">
            <form onSubmit={this.handleSubmit}>
              <div className="messages"></div>
              <div className="controls">
                <div className="row">
                  <div className="col-sm-4">
                    <div className="form-group">
                      <label for="form_name">Plate</label>
                      <input
                        id="form_name"
                        type="text"
                        name="plate"
                        className="form-control AmbulanceForm"
                        required="required"
                        value={this.state.plate}
                        onChange={this.handleChange}
                      />
                      <div className="help-block with-errors"></div>
                    </div>
                    <div className="form-group">
                      <label for="form_email">Driver</label>
                      <input
                        id="form_email"
                        type="text"
                        name="driver"
                        className="form-control AmbulanceForm"
                        required="required"
                        value={this.state.driver}
                        onChange={this.handleChange}
                      />
                      <div className="help-block with-errors"></div>
                    </div>
                    <div className="form-group">
                      <label for="form_email">Date of Birth</label>
                      {/* <div
                        className="input-group date"
                        data-provide="datepicker"
                      > */}
                        <input
                          type="date"
                          className="form-control AmbulanceForm"
                          name="dob"
                          value={this.state.dob}
                          onChange={this.handleChange}
                        />
                        {/* <div className="input-group-addon">
                          <span className="glyphicon glyphicon-th"></span>
                        </div>
                      </div> */}
                    </div>
                    <div className="form-group">
                      <label for="form_name">Phone</label>
                      <input
                        id="form_name"
                        type="text"
                        name="phone"
                        className="form-control AmbulanceForm"
                        required="required"
                        value={this.state.phone}
                        onChange={this.handleChange}
                      />
                      <div className="help-block with-errors"></div>
                    </div>
                    <div className="form-group">
                      <label for="form_email">Available</label>
                      <input
                        id="form_email"
                        type="text"
                        name="available"
                        className="form-control AmbulanceForm"
                        required="required"
                        value={this.state.available}
                        onChange={this.handleChange}
                      />
                      <div className="help-block with-errors"></div>
                    </div>
                    <div className="form-group">
                      <label for="form_name">Travel Time</label>
                      <input
                        id="form_name"
                        type="number"
                        name="travelTime"
                        className="form-control AmbulanceForm"
                        placeholder="Enter Effects"
                        required="required"
                        value={this.state.travelTime}
                        onChange={this.handleChange}
                      />
                      <div className="help-block with-errors"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="clearfix"></div>
              <div className="row">
                <div className="input-field col s12">
                  <button
                    type="reset"
                    className="Button-Reset"
                    onClick={this.reset()}
                  >
                    Clear
                  </button>
                  <input type="submit" className="Button-Add" />
                </div>
              </div>
            </form>
          </div>
        </table>
        </div>
      </div>
    );
  }
}
