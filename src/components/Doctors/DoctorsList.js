
import React, {useState, useEffect} from 'react';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Row, Col, Grid } from 'react-bootstrap';
import useClipboard from "react-use-clipboard";
import Button from '@material-ui/core/Button';
import 'rc-tooltip/assets/bootstrap.css';
import 'react-responsive-modal/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../index.css";
import LeftSide from '../Home/dashboard/LeftSide';
import {Link} from 'react-router-dom'
import MUIDataTable from "mui-datatables";
import { SpinnerCircular } from 'spinners-react';
import SweetAlert from 'react-bootstrap-sweetalert';
import Moment from 'react-moment';
import ReactClipboard from 'react-clipboardjs-copy'
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import { API_URL } from '../../httpcommon'
const DoctorList = (props) =>{
  const [doctorslist, setDoctorlist] = useState([]);
  const [loading, setLoading] = React.useState(true)    
  const [successalert, setSuccessalert] = React.useState(false)
  const [deletealert, setDeletealert] = React.useState(false)
    const [deleteid, setDeleteid] = React.useState("");
    const [isCopied, setCopied] = useClipboard("");
  React.useEffect(()=>{
    fetchlist()
  },[])



  const fetchlist = () =>{
    setLoading(true)
    fetch(API_URL +"/admin/users")
    .then((res) => { res.json().then((result)=>{
        if(result.status){
          console.log(result)
          setDoctorlist(result.data.map((row)=>(
          [
            row._id, 
            row.user!==undefined ? row.user.userName:null, 
            row.emails[0]!==undefined ? row.emails[0].value :null, 
            row.phoneNumbers[0].number,
            row.wallet_balance, <Link> {row.profileUrl!==undefined ? <img src={row.profileUrl} style={{width:60}} /> :null}</Link>, 
                row.registrationCompleted===true ? 'Completed' : 'NotCompleted',
          <Button type="button"  className="warning-btn" onClick={()=>doctordetails(row._id)} variant="contained" color="primary" style={{border:"none", minWidth:25}} title="View Details"><i class="fa fa-info" /></Button>
        
          ]
          )))
        }else{
          setDoctorlist(null)
        }
        setLoading(false)
    })
  })  
  }

  const doctordetails = (id) =>{
    localStorage.setItem('doctorid',id);
    props.history.push('/DoctorDetails')
  }

  const deleteconfirm = (id) => {
   setDeleteid(id)
   setDeletealert(true)
  };

  const doctordelete = (id) =>{
   
  }


  //const columns = [ "Id", "UserName", "Email", "PhoneNumber", "WalletBalance", "ProfileURL", "RegistrationCompleted",  "Action"];
    
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
  name: "UserName",
  label: "UserName",
  options: {
   filter: false,
   sort: true,
  }
 },

 {
  name: "Email",
  label: "Email",
  options: {
   filter: false,
   sort: true,
  }
 },

 {
  name: "PhoneNumber",
  label: "PhoneNumber",
  options: {
   filter: false,
   sort: true,
  }
 },

 {
  name: "WalletBalance",
  label: "WalletBalance",
  options: {
   filter: false,
   sort: true,
  }
 },


 {
  name: "ProfileUrl",
  label: "ProfileUrl",
  options: {
   filter: false,
   sort: true,
  }
 },

 {
  name: "RegistrationCompleted",
  label: "RegistrationCompleted",
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


    const { classes } = props;
    var i = 1;
    return (
    <LeftSide mainsection={
    <React.Fragment>
      <Breadcrumbs maxItems={2}  aria-label="breadcrumb">
<Link style={{color:"gray", cursor:"none"}} color="inherit">
  Doctors List
</Link>
</Breadcrumbs> 
    {doctorslist?
    <MUIDataTable className="table_holder"
    title={"Doctors List"}
    data={doctorslist}
    columns={columns}
     options={options}
    />
    :null}    


    {deletealert===true ?
    <SweetAlert
    warning
    showCancel
    confirmBtnText="Yes, delete it!"
    confirmBtnBsStyle="danger"
    title="Are you sure?"
    onConfirm={()=>doctordelete(deleteid)}
    onCancel={()=>setDeletealert(false)}
    focusCancelBtn
    >

    You will not be able to recover this data!
    </SweetAlert>
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
export default DoctorList;