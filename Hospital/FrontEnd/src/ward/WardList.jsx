import React, { Component } from 'react'
import axios from 'axios';
import './WardList.css';
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";
import generateWardPDF from './WardReport';
import Navbar from '../Navbar/Navbar';

export default class WardList extends Component {
   state = {
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
   }

   async componentDidMount() {
     const ward = await axios.get('http://localhost:4000/ward/')
     .then((result) => {
       this.setState({
         wards: result.data,
       })
     })
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
            .delete("http://localhost:4000/ward/" + _id)
            .then(() => {
              this.componentDidMount();
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire("Cancelled");
        }
      });
  }
    render() {
      const { wards } = this.state;
        return (
          <div className="col s9">
            <Navbar/>
            <div>
            <Link to='/ward'><button className="addWardBtn">Add Medicine</button></Link>
                  <button type="button" className="wardReportGen" onClick={() => {generateWardPDF(this.state.wards)}}>
                    Generate Report
                  </button>
                </div>
          <table className="responsive-table highlight">
          {/* <thead> */}
          <tr>
            <th className="td">Ward Name</th>
            <th className="td">Building</th>
            <th className="td">Floor</th>
            <th className="td">Register date</th>
            <th className="td">Ward Number</th>
            <th className="td">Discharge</th>
            <th className="td">Discharge Date</th>
            <th className="td">Available Room</th>
            <th className="td">Room Category</th>
            <th className="td">Room Number</th>
            <th className="td">Bed Number</th>
            <th className="td"></th>
          </tr>
          {wards.map((ward) => {
            return (
              <tr 
              key={ward._id}
              className="">
            
                <td>{ward.wardName}</td>
                <td>{ward.building}</td>
                <td>{ward.floor}</td>
                <td>{ward.regDate.slice(0,10)}</td>
                <td>{ward.wardNum}</td>
                <td>{ward.discharge}</td>
                <td>{ward.disDate.slice(0,10)}</td>
                <td>{ward.availableRoom}</td>
                <td>{ward.roomCategory}</td>
                <td>{ward.roomNum}</td>
                <td>{ward.bedNumber}</td>
                <td>
                <Link to={{pathname: "/updateWard/" ,id:ward._id}} ><FontAwesomeIcon size="2x"
                    icon={faEdit}/></Link>
                  <FontAwesomeIcon
                    size="2x"
                    icon={faTrash}
                    onClick={(e) => this.delete(ward._id)}
                  />
                </td>
              </tr>
               );
              })}
            </table>
            </div>
        );
    }
}
