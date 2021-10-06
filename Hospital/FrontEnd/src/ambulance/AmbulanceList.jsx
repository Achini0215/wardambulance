import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './AmbulanceList.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import Navbar from "../Navbar/Navbar";

export default class AmbulanceList extends Component {
  state = {
    plate: "",
    driver: "",
    dob: "",
    phone: "",
    available: "",
    travelTime: 0,
    ambulances: []
  };

  async componentDidMount() {
    const ambulance = await axios
      .get("http://localhost:4000/ambulance/")
      .then((result) => {
        this.setState({
          ambulances: result.data,
        });
      });
  }

  delete(_id) {
    // let id=this.props.location.id;
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Do you want to delete this record?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            "Deleted",
            "Item has been deleted",
            "success"
          );
          axios
            .delete("http://localhost:4000/ambulance/" + _id)
            .then(() => {
              this.componentDidMount();
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire("Cancelled");
        }
      });
  }

  render() {
    const { ambulances } = this.state;
    return (
      <div className="col s9">
        <Navbar/>
        <div className="ReportRow">
              <Link to='/ambulance'><button className="addAmbBtn">Add Ambulance</button></Link>
          </div>
        <table className="responsive-table highlightA">
          {/* <thead> */}
          <tr>
            <th className="td">Plate No.</th>
            <th className="td">Driver</th>
            <th className="td">DOB</th>
            <th className="td">Phone</th>
            <th className="td">Available</th>
            <th className="td">Travel Time</th>
            <th className="td"></th>
          </tr>
          {ambulances.map((ambulance) => {
            return (
      <tr>
        <td>{ambulance.plate}</td>
        <td>{ambulance.driver}</td>
        <td>{ambulance.dob.slice(0,10)}</td>
        <td>{ambulance.phone}</td>
        <td>{ambulance.available}</td>
        <td>{ambulance.travelTime}</td>
        <td>
        <Link to={{pathname: "/updateAmbulance/" ,id:ambulance._id}} ><FontAwesomeIcon size="2x"
                    icon={faEdit}/></Link>
                  <FontAwesomeIcon
                    size="2x"
                    icon={faTrash}
                    onClick={(e) => this.delete(ambulance._id)}
                  />
        </td>
      </tr>
    );
  })}
  </table>
  </div>
    )
  }
}
