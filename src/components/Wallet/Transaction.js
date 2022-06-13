
import React from 'react';
import 'react-confirm-alert/src/react-confirm-alert.css';
import 'react-responsive-modal/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import LeftSide from './../Home/dashboard/LeftSide'
import "../../index.css";
import { Link } from 'react-router-dom';
import { SpinnerCircular } from 'spinners-react';
import MUIDataTable from "mui-datatables";
import 'react-toastify/dist/ReactToastify.css';
import Moment from 'react-moment';
import SweetAlert from 'react-bootstrap-sweetalert';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { API_URL } from '../../httpcommon'

const Transaction = (props) =>{
    const [transactionlist, setTransactionlist] = React.useState("")
    const [loading, setLoading] = React.useState(true)
    const [deletealert, setDeletealert] = React.useState(false)
    const [deleteid, setDeleteid] = React.useState("");
    const [successalert, setSuccessalert] = React.useState(false)
    
  React.useEffect(()=>{
    fetchlist()
  },[])
  
  const fetchlist = () =>{
    setLoading(true)
    fetch(API_URL+"/admin/wallet/transaction")
    .then((res) => { res.json().then((result)=>{
        if(result.status){
          console.log(result)
          
          setTransactionlist(result.data.map((row)=>(
            
          [
            
            row._id,row.amount,
             row.type, row.mode, 
             row.transactionFee, 
              row.purpose, 
              row.userId.user.userName, 
              row.userId._id,
              row.notes!==undefined ? row.notes.type : null ,row.created_at, 
              row.status
          
          ])))
          setLoading(false)
        }else{
            setTransactionlist(null)
        }
        console.warn(result)
    })
  })  
  }


//const columns = ["TransactionId","Amount", "Type", "Mode", "Transactionsfee", "Purpose" ,"Username", "NoteType", "CreatedAt","Status"];

const columns = [
  {
  name: "TransactionId",
  label: "TransactionId",
  options: {
   filter: false,
   sort: true,
  }
 },

 {
  name: "Amount",
  label: "Amount",
  options: {
   filter: false,
   sort: true,
  }
 },

 {
  name: "Type",
  label: "Type",
  options: {
   filter: true,
   sort: true,
  }
 },

 {
  name: "Mode",
  label: "Mode",
  options: {
   filter: true,
   sort: true,
  }
 },

 {
  name: "Transactionsfee",
  label: "Transactionsfee",
  options: {
   filter: false,
   sort: true,
  }
 },


 {
  name: "Purpose",
  label: "Purpose",
  options: {
   filter: false,
   sort: true,
  }
 },

  {
  name: "Username",
  label: "Username",
  options: {
   filter: false,
   sort: true,
   
  }
 },

 {
  name: "UserId",
  label: "UserId",
  options: {
   filter: false,
   sort: true,
   customBodyRender: (value, tableMeta, updateValue) => {
    return(
      <Link onClick={()=>userdetails(value)}> 
              {value}
              </Link>
    )
  }
  }
 },

  {
  name: "NoteType",
  label: "NoteType",
  options: {
   filter: false,
   sort: true,
   customBodyRender: (value, tableMeta, updateValue) => {
    return(
      <Link onClick={()=>NotesTypeDetails(value)}>{value}</Link>
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
    return(
      <Moment format="HH:MM:SS, DD:MM:YYYY">{value}</Moment> 
    )
  }
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
]
  
 
  const options = {
    filterType: 'checkbox',
    download:false,
     selectableRows: 'none',
  };

  const NotesTypeDetails = (notes) => {
    localStorage.setItem("notestypelist",JSON.stringify({notes}))
    props.history.push("/NotesTypeDetails");
  }

  const userdetails = (id) => {
    localStorage.setItem('doctorid',id);
    props.history.push('/DoctorDetails');
  }


      const { classes } = props;
        return (
  <LeftSide mainsection={
    
    <React.Fragment>
       <Breadcrumbs maxItems={2}  aria-label="breadcrumb">
      
      <Link color="inherit" style={{color:"gray", cursor:"none"}}>
        Trasaction list
      </Link>
</Breadcrumbs> 
{deletealert===true ?
<SweetAlert
  warning
  showCancel
  confirmBtnText="Yes, delete it!"
  confirmBtnBsStyle="danger"
  title="Are you sure?"
  
  
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


      {loading===true ?
      <div style={{textAlign:"center", marginTop:150}}>
      <SpinnerCircular  enabled={loading} />
      </div>
      :null}
  {
  loading===false && transactionlist?
<MUIDataTable className="table_holder"
  title={"Transaction List"}
  data={transactionlist}
  columns={columns}
  options={options}
  
/>
  :null}
    
  </React.Fragment>
          } />
        );
}
export default Transaction;