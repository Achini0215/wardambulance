import React, { Component } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from "../Navbar/Navbar";

export default class updateAmbulance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      plate: "",
      driver: "",
      dob: "",
      phone: "",
      available: "",
      travelTime: 0,
      ambulances: [],
    };
  }

  async componentDidMount() {
    let id = this.props.location.id;
    console.log(id);
    await axios
      .get("http://localhost:4000/ambulance/" + id)
      .then((result) => {
        this.setState({
          plate: result.data.plate,
          driver: result.data.driver,
          dob: result.data.dob,
          phone: result.data.phone,
          available: result.data.available,
          travelTime: result.data.travelTime,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      plate: this.state.plate,
      driver: this.state.driver,
      dob: this.state.dob.slice(0,10),
      phone: this.state.phone,
      available: this.state.available,
      travelTime: this.state.travelTime,
    };
    let id = this.props.location.id;
    axios.post("http://localhost:4000/ambulance/update/" + id, data).then(() => {
      Swal.fire({
        icon: "success",
        title: "Successfully Updated!",
      }).then(() => {
        window.location = "/ambulanceList";
      });
    });
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

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
                          className="form-control"
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
                          className="form-control"
                          required="required"
                          value={this.state.driver}
                          onChange={this.handleChange}
                        />
                        <div className="help-block with-errors"></div>
                      </div>
                      <div className="form-group">
                        <label for="form_email">Date of Birth</label>
                        <div
                          className="input-group date"
                          data-provide="datepicker"
                        >
                          <input
                            type="date"
                            className="form-control"
                            name="dob"
                            value={this.state.dob}
                            onChange={this.handleChange}
                          />
                          <div className="input-group-addon">
                            <span className="glyphicon glyphicon-th"></span>
                          </div>
                        </div>
                      </div>
                      <div className="form-group">
                        <label for="form_name">Phone</label>
                        <input
                          id="form_name"
                          type="text"
                          name="phone"
                          className="form-control"
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
                          className="form-control"
                          required="required"
                          placeholder="Enter Availability"
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
                          className="form-control"
                          placeholder="Enter Travel Time"
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
                  <button type="submit" className="Button-Add">
                    <FontAwesomeIcon icon={faCheckCircle} /> Update Ambulance
                  </button>
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
