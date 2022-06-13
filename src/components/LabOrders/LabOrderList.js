import React, { useState, useEffect } from 'react';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Button from '@material-ui/core/Button';
import 'react-responsive-modal/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../index.css";
import { Row, Col } from 'react-bootstrap';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Container from '@material-ui/core/Container';
import { Modal } from 'react-responsive-modal';
import Select from '@material-ui/core/Select';
import LeftSide from '../Home/dashboard/LeftSide';
import MUIDataTable, { TableBody, TableBodyRow } from "mui-datatables";
import Moment from 'react-moment';
import SweetAlert from 'react-bootstrap-sweetalert';
import Link from '@material-ui/core/Link';
import ReactClipboard from 'react-clipboardjs-copy'
import { API_URL } from '../../httpcommon';


import { createMuiTheme, MuiThemeProvider, rgbToHex, withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import clsx from 'clsx';




const LabOrderList = (props) => {
  const [laborder, setLabOrder] = useState([]);
  const [loading, setLoading] = React.useState(true)
  const [successalert, setSuccessalert] = React.useState(false)
  const [deletealert, setDeletealert] = React.useState(false)
  const [deleteid, setDeleteid] = React.useState("");
  const [statusmodel, setStatusmodel] = React.useState(false)
  const [statusupdateid, setStatusupdateid] = React.useState("")
  const [rowStatusValue, setRowStatusValue] = React.useState("")
  const [statusupdate, setStatusupdate] = React.useState("1")
  const [stepsmodel, setStepsmodel] = React.useState(false)
  const [stepsupdateid, setStepsupdateid] = React.useState("")
  const [stepsupdate, setStepsupdate] = React.useState(1)
  const [scheduled, setScheduled] = React.useState(false)
  const [order, setOrder] = React.useState(false)
  const [transit, setTransit] = React.useState(false)
  const [shipped, setShipped] = React.useState(false)
  const [delivered, setDelivered] = React.useState(false);

  /*
  #FF0000 - red
  #FF8C00 - orange
  #FFFF00 - yellow
  #008000 - green
  #00FFFF - aqua
  #0000FF - blue
  #9400D3 - violet
  #FF1493 - pink
  #800000 - maroon
*/
  const DentalScannerScheduled = '#FF1493';
  const PreparingYourOrder = '#9400D3';
  const InTransit = '#0000FF';
  const Shipped = '#FFFF00';
  const Delivered = '#008000';

  React.useEffect(() => {
    fetchlist()
  }, [])


  function getColor(v) {

    switch (v) {
      case 'Scheduled': return DentalScannerScheduled;
        break;
      case 'Preparing': return PreparingYourOrder;
        break;
      case 'Transit': return InTransit;
        break;
      case 'Shipped': return Shipped;
        break;
      case 'Delivered': return Delivered;
        break;
    }
    return "white";

  }
  const fetchlist = () => {
    setLoading(true)
    const accesstoken = localStorage.getItem("accesstoken")
    fetch(API_URL + "/admin/labOrder/allLabOrders", {
      headers: {
        'x-access-token': accesstoken
      },
      method: "GET"
    })
      .then((res) => {
        res.json().then((result) => {
          console.log('labordr')
          console.log(result)
          if (result.status) {
            console.log(result)
            setLabOrder(result.data.map((row) => (
              [
                row.status,
                row.patientId
                ,
                row.createdBy,
                row.created_at,

                row.extraData[0].label,
                row.extraData[1].label.substring(0, 16) == 'Tooth impression' ? row.extraData[1].label : 'Dental Scanner, ' + row.extraData[1].label,
                row.extraData[2].label,
                <Button>
                  <Button type="button" className="warning-btn" onClick={() => laborderdetails(row)} variant="contained" color="primary" style={{ border: "none", minWidth: 25, marginRight: 2, height: 29, }} title="View Details"><i class="fa fa-info" /></Button>
                  <Button class="status-update-btn" type="button" title="Status Update" onClick={() => statusmodelcall(row._id, row.status)} style={{ border: "none", backgroundColor: "pink", width: 25 }} variant="contained" color="primary" ><i className="fa fa-tasks" /></Button>
                  {/* {row.Status=='progress' ?  */}
                  <Button class="update-btn" type="button" variant="contained" title="Steps Update" style={{ border: "none", width: 25 }} color="primary" onClick={() => stepsmodelcall(row._id, row.steps)} ><i className="fa fa-wrench" /></Button>
                  {/* :null} */}
                </Button>
              ]
            )))
          } else {
            setLabOrder(null)
          }
          setLoading(false)
        })
      })
  }


  const statusmodelcall = (id, st) => {
    setRowStatusValue(st);
    setStatusupdateid(id);
    setStatusmodel(true)
  };

  const stepsmodelcall = (id, steps) => {
    // console.log('stepsss')
    // console.log(steps)

    // setScheduled(steps[0].confirmed)
    // setOrder(steps[1].confirmed)
    // setTransit(steps[2].confirmed)
    // setShipped(steps[3].confirmed)
    // setDelivered(steps[4].confirmed)

    // if(steps[0].confirmed==false){
    //   setStepsupdate(1)
    // }
    // else if(steps[1].confirmed==false){
    //   setStepsupdate(2)
    // }

    // else if(steps[2].confirmed==false){
    //   setStepsupdate(3)
    // }

    // else if(steps[3].confirmed==false){
    //   setStepsupdate(4)
    // }

    // else if(steps[4].confirmed==false){
    //   setStepsupdate(5)
    // }

    setStepsupdateid(id);
    setStepsmodel(true)
  };

  const doctorDetails = (id) => {
    localStorage.setItem('doctorid', id);
    props.history.push('/DoctorDetails')
  }

  const PatientDetails = (data) => {
    localStorage.setItem("patientdetails", JSON.stringify({ data }))
    props.history.push("PatientDetails")
  }

  const laborderdetails = (id) => {
    localStorage.setItem('laborderdetails', JSON.stringify({ id }));
    props.history.push('/LabOrderDetails')
  }


  const updatesteps = () => {
    fetch(API_URL + '/laborder/update/status', {
      method: "POST",
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',

      },

      body: JSON.stringify({
        stepId: stepsupdate,
        orderId: stepsupdateid
      })
    })
      .then((res) => res.json())
      .then((res) => {

        setStepsmodel(false)
        setSuccessalert(true)
        fetchlist();

      })
  }



  const updatestatus = () => {
    const accesstoken = localStorage.getItem("accesstoken")

    fetch(API_URL + '/laborder/update/status', {

      method: "POST",
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        stepId: statusupdate,
        orderId: statusupdateid,
      })
    })
      .then((res) => res.json())
      .then((res) => {
        console.log('hel')
        console.log(res)
        setStatusmodel(false)
        setSuccessalert(true)
        fetchlist();
      })
  }


  //const columns = [ "Id", "Status", "PatientId", "CreatedBy", "CreatedAt",  "Action"];

  const columns = [

    {
      name: "Status",
      label: "Status",
      options: {
        filter: true,
        sort: true,
        setCellProps: value => {
          return {
            style: {
              backgroundColor: getColor(value)
            }
          };
        },

      }
    },

    {
      name: "PatientId",
      label: "PatientId",
      options: {
        filter: false,
        sort: true,
      }
    },

    {
      name: "CreatedBy",
      label: "CreatedBy",
      options: {
        filter: false,
        sort: true,

        customBodyRender: (value, tableMeta, updateValue) => {
          console.log("customBodyRender");
          return (
            <Link onClick={() => doctorDetails(value)} style={{ cursor: "pointer" }}>{value}</Link>
          )
        }
      }
    },


    {
      name: "CreatedAt",
      label: "CreatedAt",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Moment format="HH:MM:SS, DD:MM:YYYY">{value}</Moment>
          )
        }
      }
    },


    {
      name: "Warranty",
      label: "Warranty",
      options: {
        filter: true,
        sort: true,
      }
    },

    {
      name: "Scanning",
      label: "Scanning",
      options: {
        filter: true,
        sort: true,
      }
    },

    {
      name: "Delivery",
      label: "Delivery",
      options: {
        filter: true,
        sort: true,
      }
    },

    {
      name: "Action",
      label: "Action",
      options: {
        filter: false,
        sort: true,
      }
    },


  ]

  const options = {
    filterType: "checkbox",
    print: true,
    viewColumns: true,
    download: false,
    selectableRows: 'none',
    onRowClick: (rowData) => {
      console.log("RowClicked->", rowData);
    },
    responsive: "stacked",
    fixedHeaderOptions: {
      xAxis: true,
      yAxis: true,
    },
  };


  const { classes } = props;
  var i = 1;
  return (
    <LeftSide mainsection={
      <React.Fragment>
        <Link style={{ color: "gray" }} color="inherit">
          LabOrder List
</Link>
        {laborder ?
          <MUIDataTable className="table_holder"
            title={"LabOrder List"}
            data={laborder}
            columns={columns}
            options={options}
          />
          : null}

        {successalert === true ?
          <SweetAlert
            success
            title="Success Data!"
            timeout={2000}
            onConfirm={() => setSuccessalert(false)}
          >
            This success message will automatically close after 2 seconds
</SweetAlert>
          : null}

        <Modal open={stepsmodel} onClose={() => setStepsmodel(false)} center>
          <Container>
            <Row style={{ marginTop: 50 }}>
              <Col sm="12" className="custom-style">
                <InputLabel id="demo-simple-select-label" style={{ marginLeft: 30 }}>Steps Update</InputLabel>
                <Col>
                  <br />
                  <Col>
                    <FormControl id="selectborderstatus_update" >
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={stepsupdate}
                        style={{ height: 50 }}
                        onChange={(e) => setStepsupdate(e.target.value)}
                        style={{ background: "white" }} >
                        <MenuItem value="1">Dental Scanner Scheduled</MenuItem>
                        <MenuItem value="2">Preparing your order</MenuItem>
                        <MenuItem value="3">In Transit</MenuItem>
                        <MenuItem value="4">Shipped</MenuItem>
                        <MenuItem value="5">Delivered</MenuItem>
                      </Select>
                    </FormControl>
                  </Col>
                </Col>
              </Col>
              <Col sm="12" style={{ marginTop: -40 }} className="custom-style">
                <center><Button className="submit_button" type="button" onClick={() => updatesteps()} variant="contained" color="primary" style={{ marginTop: 25, width: "90%" }}>Update Now</Button></center>
              </Col>
            </Row>
          </Container>
        </Modal>



        <Modal open={statusmodel} onClose={() => setStatusmodel(false)} center>
          <Container>
            <Row style={{ marginTop: 50 }}>

              <Col sm="12" className="custom-style">
                <InputLabel id="demo-simple-select-label" style={{ marginLeft: 30 }}>Status Update</InputLabel>
                <Col>

                  <br />
                  <Col sm="12" className="custom-style">
                    <FormControl id="selectborderstatus_update" >

                      {rowStatusValue == 'Scheduled' &&
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={statusupdate}
                          onChange={(e) => setStatusupdate(e.target.value)}
                          style={statusupdate === "1" ? { background: DentalScannerScheduled } :
                            statusupdate === "2" ? { background: PreparingYourOrder } :
                              statusupdate === "3" ? { background: InTransit } :
                                statusupdate === "4" ? { background: Shipped } :
                                  statusupdate === "5" ? { background: Delivered } :
                                    { background: "white" }
                          }
                        >


                          <MenuItem value="1">Scheduled</MenuItem>
                          <MenuItem value="2">Preparing</MenuItem>


                        </Select>
                      }

                      {rowStatusValue == 'Preparing' &&
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={statusupdate}
                          onChange={(e) => setStatusupdate(e.target.value)}
                          style={statusupdate === "1" ? { background: DentalScannerScheduled } :
                            statusupdate === "2" ? { background: PreparingYourOrder } :
                              statusupdate === "3" ? { background: InTransit } :
                                statusupdate === "4" ? { background: Shipped } :
                                  statusupdate === "5" ? { background: Delivered } :
                                    { background: "white" }
                          }
                        >


                          <MenuItem value="1">Scheduled</MenuItem>
                          <MenuItem value="2">Preparing</MenuItem>
                          <MenuItem value="3">Transit</MenuItem>


                        </Select>
                      }

                      {rowStatusValue == 'Transit' &&
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={statusupdate}
                          onChange={(e) => setStatusupdate(e.target.value)}
                          style={statusupdate === "1" ? { background: DentalScannerScheduled } :
                            statusupdate === "2" ? { background: PreparingYourOrder } :
                              statusupdate === "3" ? { background: InTransit } :
                                statusupdate === "4" ? { background: Shipped } :
                                  statusupdate === "5" ? { background: Delivered } :
                                    { background: "white" }
                          }
                        >



                          <MenuItem value="2">Preparing</MenuItem>
                          <MenuItem value="3">Transit</MenuItem>
                          <MenuItem value="4">Shipped</MenuItem>


                        </Select>
                      }

                      {rowStatusValue == 'Shipped' &&
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={statusupdate}
                          onChange={(e) => setStatusupdate(e.target.value)}
                          style={statusupdate === "1" ? { background: DentalScannerScheduled } :
                            statusupdate === "2" ? { background: PreparingYourOrder } :
                              statusupdate === "3" ? { background: InTransit } :
                                statusupdate === "4" ? { background: Shipped } :
                                  statusupdate === "5" ? { background: Delivered } :
                                    { background: "white" }
                          }
                        >



                          <MenuItem value="3">Transit</MenuItem>
                          <MenuItem value="4">Shipped</MenuItem>
                          <MenuItem value="5">Delivered</MenuItem>

                        </Select>
                      }

                      {rowStatusValue == 'Delivered' &&
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={statusupdate}
                          onChange={(e) => setStatusupdate(e.target.value)}
                          style={statusupdate === "1" ? { background: DentalScannerScheduled } :
                            statusupdate === "2" ? { background: PreparingYourOrder } :
                              statusupdate === "3" ? { background: InTransit } :
                                statusupdate === "4" ? { background: Shipped } :
                                  statusupdate === "5" ? { background: Delivered } :
                                    { background: "white" }
                          }
                        >

                          <MenuItem value="4">Shipped</MenuItem>
                          <MenuItem value="5">Delivered</MenuItem>

                        </Select>
                      }




                    </FormControl>
                  </Col>
                </Col>
              </Col>
              <Col sm="12" className="custom-style" style={{ marginTop: -60 }}>
                <center><Button className="submit_button" type="button" onClick={() => updatestatus()} variant="contained" color="primary" style={{ marginTop: 25, width: "90%" }}>Update Now</Button></center>
              </Col>
            </Row>
          </Container>
        </Modal>
      </React.Fragment>
    } />
  );
}
export default LabOrderList;