
import React from 'react';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Button from '@material-ui/core/Button';
import 'react-responsive-modal/styles.css';

import { Modal } from 'react-responsive-modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col } from 'react-bootstrap';
import Container from '@material-ui/core/Container';

import LeftSide from './../Home/dashboard/LeftSide'
import "../../index.css";
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import SweetAlert from 'react-bootstrap-sweetalert';
import { SpinnerCircular } from 'spinners-react';
import FormControl from '@material-ui/core/FormControl';
import MUIDataTable from "mui-datatables";
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { API_URL } from '../../httpcommon'

const ConsultationList = (props) =>{
const [consultationlist, setConsultationlist] = React.useState("");
const [loading, setLoading] = React.useState(true)
const [deletealert, setDeletealert] = React.useState(false)
const [deleteid, setDeleteid] = React.useState("");
const [successalert, setSuccessalert] = React.useState(false)
const [statusupdateid, setStatusupdateid] = React.useState("")
const [stepsupdateid, setStepsupdateid] = React.useState("")
const [statusupdate, setStatusupdate] = React.useState("Approved")
const [stepsupdate, setStepsupdate] = React.useState(1)
const [stepsmodel, setStepsmodel] = React.useState(false)
const [statusmodel, setStatusmodel] = React.useState(false)
const [notice, setNotice] = React.useState(false);
const [arrived, setArrived] = React.useState(false);
const [scheduled, setScheduled] = React.useState(false);
const [completed, setCompleted] = React.useState(false);
  React.useEffect(()=>{
    fetchlist()
  },[])

//   const consultantdelete = () => {
//     var config = {
//  method: 'delete',
//  url: 'http://18.217.27.219/admin/consultation/5f7f5e3eb9e9bf4c30446c79',
//  headers: {
//    'Content-Type': 'application/json'
//  }
// };
//   }

  const fetchlist = () =>{
    fetch(API_URL + "/admin/consultation/booked/service")
    .then((res) => { res.json().then((result)=>{
      console.log(result)
        if(result.status){
          setConsultationlist(result.data.map((row)=>(
            [
              row._id,
            //   row.status==='Requested' ?
            // <span style={{color:"#FCAA21"}} >{row.status}</span>
            // :
            // row.status==='Approved' ?
            // <span style={{color:"green"}} >{row.status}</span>

            // :
            // row.status==='Progress' ?
            // <span style={{color:"orange"}} >{row.status}</span>

            // :
            // <span style={{color:"red"}} >{row.status}</span>
            // ,

            row.status,
            row.complete ? 'true' : 'false' ,
              row.consultantId.typeof,  row.consultantId.pincode, row.consultantId,row.bookeduserId._id,row.created_at,<Button>
              <Button class="warning-btn" type="button" title="View Details" onClick={()=>consultationdetails(row)}  style={{border:"none", width:25}} variant="contained" color="primary" ><i className="fa fa-info" /></Button>
              <Button class="status-update-btn" type="button" title="Status Update" onClick={()=>statusmodelcall(row._id)}  style={{border:"none", backgroundColor:"pink", width:25}} variant="contained" color="primary" ><i className="fa fa-tasks" /></Button>
              {row.status!='Completed' &&  row.status!='Requested' && row.status!='Approved' && row.status!='Declined' ?
              <Button class="update-btn" type="button" variant="contained" title="Steps Update" style={{border:"none", width:25}} color="primary" onClick={()=>stepsmodelcall(row._id, row.steps)} ><i className="fa fa-wrench" /></Button>
              :null}
              <Button type="button" class="danger-btn" title="Delete Data" onClick={()=>deleteconfirm(row._id)} style={{border:"none", width:25}} variant="contained" color="primary" ><i className="fa fa-trash" /></Button></Button>
              ]
            )))
            setLoading(false)
        }else{
          setConsultationlist(null)
        }
        console.log(result)
    })
  })  
  }

  const consultantdetails = (data) =>{
    localStorage.setItem('consultationiddetails',JSON.stringify({data}));
    props.history.push('/ConsultantDetails')
  }


  const consultationdetails = (data) =>{
    localStorage.setItem('consultationdetail',JSON.stringify({data}))
    props.history.push("/ConsultationDetails")
  }

  const doctorDetails = (id) =>{
    localStorage.setItem('doctorid',id);
    props.history.push('/DoctorDetails')
  }

  const consultationdelete = () =>{

    fetch(API_URL + "/admin/consultation/booked/service/"+deleteid,{
      method:"DELETE",
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((res)=>res.json())
    .then((res)=>{
      console.log(res)
      setSuccessalert(true)
      fetchlist()
      setDeletealert(false)
    })
  }

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

 
  const stepsmodelcall = (id, steps) => {
    setNotice(steps[0].confirmed)
      setScheduled(steps[1].confirmed)
      setArrived(steps[2].confirmed)
      setCompleted(steps[3].confirmed)
      if(steps[0].confirmed==false){
        setStepsupdate(1)
      }
      else if(steps[1].confirmed==false){
        setStepsupdate(2)
      }

      else if(steps[2].confirmed==false){
        setStepsupdate(3)
      }

      else if(steps[3].confirmed==false){
        setStepsupdate(4)
      }
    setStepsupdateid(id);
    setStepsmodel(true)
};

const statusmodelcall = (id) => {
  setStatusupdateid(id);
  setStatusmodel(true)
};
 
  const deleteconfirm = (id) => {
    setDeletealert(true)
    setDeleteid(id)
  }

  const updatesteps = () =>{
   
    fetch(API_URL + '/consultation/update/book/status',{
      method:"POST",
      headers:{
        'Accept':'*/*',
        'Content-Type':'application/json',
        
      },
      
      body:JSON.stringify({
        stepId: stepsupdate,
        bookedId: stepsupdateid        
      })
  })
  .then((res)=>res.json())
    .then((res)=>{
      fetchlist()
      setStepsmodel(false)
      setSuccessalert(true)
      
    })
}



const updatestatus = () =>{
  const accesstoken = localStorage.getItem("accesstoken")
  fetch(API_URL + '/consultation/update',{
    method:"PUT",
    headers:{
      'Accept':'*/*',
      'Content-Type':'application/json',
      'x-access-token': accesstoken
    },
    
    body:JSON.stringify({
      bookedId:statusupdateid,
      status:statusupdate      
    })
    
})
.then((res)=>res.json())
    .then((res)=>{
      console.log(res)
      setStatusmodel(false)
      setSuccessalert(true)
      fetchlist();
      
    })
}

  //const columns = ["Id","Status", "Typeof",  "PinCode", "ConsultantName", "BookedUser", "CreatedAt", "Action"];

 const columns =  [
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
  name: "Complete",
  label: "Complete",
  options: {
   filter: true,
   sort: true,
  }
 },

 {
  name: "Typeof",
  label: "Typeof",
  options: {
   filter: true,
   sort: true,
  }
 },

 {
  name: "PinCode",
  label: "PinCode",
  options: {
   filter: false,
   sort: true,
  }
 },

 {
  name: "ConsultantName",
  label: "ConsultantName",
  options: {
   filter: false,
   sort: true,
   customBodyRender: (value, tableMeta, updateValue) => {
    return(
      <Link onClick={()=>consultantdetails(value)}> {value.name} </Link>
    )
  }
  }
 },

{
  name: "BookedUser",
  label: "BookedUser",
  options: {
   filter: false,
   sort: true,
   customBodyRender: (value, tableMeta, updateValue) => {
    return(
      <Link onClick={()=>doctorDetails(value)}>{value}</Link>
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
  name: "Action",
  label: "Action",
  options: {
   filter: false,
   sort: true,
  }
 },
]

    const { classes } = props;
      return (
        <LeftSide mainsection={
        <React.Fragment>
        <Breadcrumbs  maxItems={2}  aria-label="breadcrumb">
        <Link color="inherit" style={{color:"gray", cursor:"none"}}>
            Consultation List
        </Link>
        </Breadcrumbs> 
     {deletealert===true ?
<SweetAlert
  warning
  showCancel
  confirmBtnText="Yes, delete it!"
  confirmBtnBsStyle="danger"
  title="Are you sure?"
  onConfirm={()=>consultationdelete(deleteid)}
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
  timeout={6000}
  onConfirm={()=>setSuccessalert(false)}
>
  This success message will automatically close after 6 seconds
</SweetAlert>
:null}
  {loading===true ?
  <div style={{textAlign:"center", marginTop:150}}>
  <SpinnerCircular  enabled={loading} />
  </div>
  :null}
  {
  loading===false && consultationlist?
<MUIDataTable className="table_holder"
  title={"Consultation List"}
  data={consultationlist}
  columns={columns}
  options={options}
/>
  :null}

<Modal  open={stepsmodel}  onClose={() => setStepsmodel(false)} center> 
<Container>
  <Row style={{marginTop:50}}>
     <Col sm="12"  className="custom-style">
     <InputLabel id="demo-simple-select-label" style={{marginLeft:30}}>Steps Update</InputLabel>
     <Col>
     <br />
     <Col>
     <FormControl  id="selectborderstatus_update" >
     <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={stepsupdate}
            style={{height:50}}
            onChange={(e) => setStepsupdate(e.target.value)}
            style={{background:"white"}} >
            {notice==false ? <MenuItem value="1">Service Partner Notified</MenuItem> :null}
            {scheduled==false ? <MenuItem value="2">Service Partner Scheduled</MenuItem> :null}
            {arrived==false ? <MenuItem value="3">Service Partner Arrived</MenuItem> :null}
            {completed==false ? <MenuItem value="4">Service Order  Completed</MenuItem> :null}
        </Select>
        </FormControl>
     </Col>
     </Col>
     </Col>
     <Col sm="12" style={{marginTop:-40}}  className="custom-style">
     <center><Button className="submit_button" type="button" onClick={()=>updatesteps()} variant="contained" color="primary" style={{marginTop: 25, width:"90%"}}>Update Now</Button></center>
     </Col>
   </Row>
 </Container>
</Modal>



<Modal  open={statusmodel}  onClose={() => setStatusmodel(false)} center> 
<Container>
  <Row style={{marginTop:50}}>

     <Col sm="12" className="custom-style">
       <InputLabel id="demo-simple-select-label" style={{marginLeft:30}}>Status Update</InputLabel>
     <Col>

     <br />
     <Col sm="12"  className="custom-style">
     <FormControl  id="selectborderstatus_update" >

     <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={statusupdate}
            onChange={(e) => setStatusupdate(e.target.value)}
            style={{background:"white"}}
            
        >
             <MenuItem value="Approved">Approved</MenuItem>
            <MenuItem value="Requested">Requested</MenuItem>
            <MenuItem value="Progress">Progress</MenuItem>
            <MenuItem value="Declined">Declined</MenuItem>

        </Select>
        </FormControl>
        </Col>
     </Col>
     </Col>
     <Col sm="12"  className="custom-style" style={{marginTop:-60}}>
     <center><Button className="submit_button" type="button" onClick={()=>updatestatus()} variant="contained" color="primary" style={{marginTop: 25, width:"90%"}}>Update Now</Button></center>
     </Col>
   </Row>
 </Container>
</Modal>

  </React.Fragment>
} 
  />
        );
}
export default ConsultationList;