import React, { Component } from 'react'
import axios from "axios";
import Swal from "sweetalert2";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './updateWard.css';
import Navbar from '../Navbar/Navbar';

export default class updateWard extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.setDischarge = this.setDischarge.bind(this);
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
          wards: []
        };
      }

      async componentDidMount() {
        let id = this.props.location.id;
        console.log(id);
        await axios
          .get("http://localhost:4000/ward/" + id)
          .then((result) => {
            this.setState({
                wardName: result.data.wardName,
                building: result.data.building,
                floor: result.data.floor,
                regDate: result.data.regDate,
                wardNum: result.data.wardNum,
                discharge: result.data.discharge,
                disDate: result.data.disDate,
                availableRoom: result.data.availableRoom,
                roomCategory: result.data.roomCategory,
                roomNum: result.data.roomNum,
                bedNumber: result.data.bedNumber,
            });
          })
          .catch(function (error) {
            console.log(error);
          });
      }

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
        let id = this.props.location.id;
        axios.post("http://localhost:4000/ward/update/" + id, data).then(() => {
          Swal.fire({
            icon: "success",
            title: "Successfully Updated!",
          }).then(() => {
            window.location = "/wardList";
          });
        });
      };
    
      handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
      };

      setDischarge = (e) => {
          this.setState({ [e.target.name]: e.target.value})
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
                <div onChange={this.setDischarge}>
                  <input type="radio" value="Yes" name="discharge" /> Yes
                  <input type="radio" value="No" name="discharge" /> No
                </div>
              </div>

              <div className="col-md-6">
                <div>
                <button type="submit" className="Button-Add">
                    <FontAwesomeIcon icon={faCheckCircle} /> Update Ward
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
        )
    }
}
