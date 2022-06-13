
import React, {useState, useEffect} from 'react';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Button from '@material-ui/core/Button';
import 'react-responsive-modal/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../index.css";
import LeftSide from '../Home/dashboard/LeftSide';
import {Link} from 'react-router-dom'
import MUIDataTable from "mui-datatables";
import SweetAlert from 'react-bootstrap-sweetalert';
import Moment from 'react-moment';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import ReactClipboard from 'react-clipboardjs-copy'
import { API_URL } from '../../httpcommon'
const SupportList = (props) =>{
  const [supportlist, setSupportlist] = useState([]);
  const [loading, setLoading] = React.useState(true)    
  const [successalert, setSuccessalert] = React.useState(false)
  const [deletealert, setDeletealert] = React.useState(false)
    const [deleteid, setDeleteid] = React.useState("");
  React.useEffect(()=>{
    fetchlist()
  },[])

  const fetchlist = () =>{
    setLoading(true)
    fetch(API_URL +"/admin/get/all/support")
    .then((res) => { res.json().then((result)=>{
        if(result.status){
          console.log(result)
          setSupportlist(result.data.map((row)=>(
            [row._id, row.note, row.postedBy.user.userName, row.postedBy._id,
            row.attachement ? <img src={row.attachement} style={{width:100, height:50, borderRadius:5}} /> : <img src="./images/image-not-found.jpg" style={{width:100, height:50, borderRadius:5}} />,
           row.created_at,                
          <Button type="button" className="warning-btn" onClick={()=>supportdetails(row)} variant="contained" color="primary" style={{border:"none", minWidth:25}} title="View Details"><i class="fa fa-info" /></Button>
          ]
          )))
        }else{
          setSupportlist(null)
        }
        setLoading(false)
    })
  })  
  }

  const supportdetails = (id) =>{
    localStorage.setItem('supportdetails',JSON.stringify(id));
    props.history.push('/SupportDetails')
  }

  const doctordetails = (id) => {
    localStorage.setItem('doctorid',id);
    props.history.push('/DoctorDetails')
  }

  //const columns = [ "Id", "SupportDetails", "UserName", "Attachment", "CreatedDate",  "Action"];

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
  name: "SupportDetails",
  label: "SupportDetails",
  options: {
   filter: false,
   sort: true,
  }
 },

 {
  name: "UserName",
  label: "UserName",
  options: {
   filter: false,
   sort: true,
  }
 },

 {
  name: "PostedBy",
  label: "PostedBy",
  options: {
   filter: false,
   sort: true,

   customBodyRender: (value, tableMeta, updateValue) => {
    return(
      <Link onClick={()=>doctordetails(value)}> 
              {value}
              </Link>
    )
  }
  }
 },

 
 {
  name: "Attachment",
  label: "Attachment",
  options: {
   filter: false,
   sort: true,
  }
 },

 {
  name: "CreatedDate",
  label: "CreatedDate",
  options: {
   filter: false,
   sort: true,
   customBodyRender: (value, tableMeta, updateValue) => {
    return(
      <Moment format="HH:MM:SS, DD:MM:YYYY">{value}</Moment> 
    )
  }
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
      filter:false,
      download:false,
       selectableRows: 'none',
    };

    const { classes } = props;
    var i = 1;
    return (
    <LeftSide mainsection={
    <React.Fragment>
<Breadcrumbs maxItems={2}  aria-label="breadcrumb">
<Link style={{color:"gray", cursor:"none"}} color="inherit">
  Support List
</Link>
</Breadcrumbs> 

    {supportlist?
    <MUIDataTable className="table_holder"
    title={"Support List"}
    data={supportlist}
    columns={columns}
     options={options}
    />
    :null}    


    {successalert===true ?
    <SweetAlert
    success
    title="Success Data!"
    timeout={2000}
    onConfirm={()=>setSuccessalert(false)}
    >
    This success message will automatically close after 2 seconds
    </SweetAlert>
    :null}
    </React.Fragment>
    } />
        );
}
export default SupportList;