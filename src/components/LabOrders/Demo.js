import React, {useState, useEffect} from 'react';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Button from '@material-ui/core/Button';
import 'react-responsive-modal/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../index.css";
import { Row, Col } from 'react-bootstrap';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { FormControlLabel } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Container from '@material-ui/core/Container';
import { Modal } from 'react-responsive-modal';
import Select from '@material-ui/core/Select';
import LeftSide from '../Home/dashboard/LeftSide';
import MUIDataTable from "mui-datatables";
import Moment from 'react-moment';
import SweetAlert from 'react-bootstrap-sweetalert';
import Link from '@material-ui/core/Link';
import ReactClipboard from 'react-clipboardjs-copy'
import { API_URL } from '../../httpcommon'
import Done from "@material-ui/icons/Done";
import Error from "@material-ui/icons/Error";
import Tooltip from "@material-ui/core/Tooltip";

const Demo = (props) =>{
  const [laborder, setLabOrder] = useState([]);
  const [loading, setLoading] = React.useState(true)    
  const [successalert, setSuccessalert] = React.useState(false)
  const [deletealert, setDeletealert] = React.useState(false)
  const [deleteid, setDeleteid] = React.useState("");
  const [statusmodel, setStatusmodel] = React.useState(false)
  const [statusupdateid, setStatusupdateid] = React.useState("")
  const [statusupdate, setStatusupdate] = React.useState("1")
  const [stepsmodel, setStepsmodel] = React.useState(false)
  const [stepsupdateid, setStepsupdateid] = React.useState("")
  const [stepsupdate, setStepsupdate] = React.useState(1)
  const [scheduled, setScheduled] = React.useState(false)
  const [order, setOrder] = React.useState(false)
  const [transit, setTransit] = React.useState(false)
  const [shipped, setShipped] = React.useState(false)
  const [delivered, setDelivered] = React.useState(false)
  
  React.useEffect(()=>{
    fetchlist()
  },[])

  const fetchlist = () =>{
    setLoading(true)
    const accesstoken = localStorage.getItem("accesstoken")
    fetch(API_URL + "/admin/labOrder/allLabOrders",{
        headers:{
            'x-access-token': accesstoken
        },
        method:"GET"
    })
    .then((res) => { res.json().then((result)=>{
      console.log('labordr')
      console.log(result)
        if(result.status){
          console.log(result)
          setLabOrder(result.data.map((row)=>(
              
          [row._id,row.status, row.createdBy ]
            
          )))
        }else{
            setLabOrder(null)
        }
        setLoading(false)
    })
  })  
  }

  console.log('new')
  console.log(laborder)

const columns = [
  {
  name: "Id",
  label: "Id",
  options: {
   filter: false,
   sort: true,
  }
 },

 {
  name: "Status",
  label: "Status",
  options: {
   filter: true,
   sort: true,
  }
 },

 {
    name: "Status",
    label: "Status",
    options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          console.log("customBodyRender");
          if (value === "OK")
            return (
              <Link>
{value}
              </Link>
            );
          else
            return (
                <Link>
                {value}
        </Link>
            );
        }
      }
   },
]

   const options = {
      filterType: "checkbox",
        print: true,
        viewColumns: true,
        download:false,
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


        return (
  <LeftSide mainsection={
    <React.Fragment>

  {laborder?
<MUIDataTable className="table_holder"
  title={"LabOrder List"}
  data={laborder}
  columns={columns}
  options={options}
/>
:null}    


  </React.Fragment>
          } />
        );
}
export default Demo;