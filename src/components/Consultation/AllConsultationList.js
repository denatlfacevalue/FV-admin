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

const AllConsultationList = (props) =>{
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
const [rating_input, setRating_input] = React.useState(0)
const [rating_input_error, setRating_input_error] = React.useState()
const [rating_update, setRating_update] = React.useState(false)
const [rating_id, setRating_id] = React.useState();
const [type, setType] = React.useState('patient');
  
  React.useEffect(()=>{
    fetchlist()
  },[])

  const rating_popup = (id) => {
    setRating_id(id);
    setRating_update(true)
  }

  const rating = () => {
    if(rating_input>5){
      setRating_input_error('max rating 5')
    }
    else{
    fetch(API_URL + "/consultation/add/rating",{
    method:"POST",
    headers: {
      'Content-Type': 'application/json'
    },
     body:JSON.stringify({
          id:rating_id,
          type:type,
          rating:rating_input
      })
  })
  .then((res)=>res.json())
  .then((res)=>{
    console.log(res)
    setSuccessalert(true)
    setDeletealert(false)
    setRating_update(false)
    fetchlist()
  })    
}
}

  const consultationupdate = (id) =>{
    localStorage.setItem('consultationid',JSON.stringify(id))
    props.history.push("/EditConsultant")
  }

  const fetchlist = () =>{
    fetch(API_URL + "/admin/consultation/allServices")
    .then((res) => { res.json().then((result)=>{
      console.log('all consultant')
      console.log(result)
        if(result.status){
          setConsultationlist(result.data.map((row)=>(
            [
            row._id,  
            row.active ? 'true' : 'false',
            row.name, 
            row.typeof, 
            row.experience, 
            <img src={row.url} style={{width:70}}/>,
            row.pincode, row.created_at,
            <>
            <Button  class="extra-btn" type="button" 
            onClick={()=>consultantdetails(row)}  style={{border:"none", width:25, marginLeft:-10}} 
            variant="contained" color="primary" ><i className="fa fa-arrow-right" /></Button> 

            <Button class="success-btn" type="button" variant="contained" title="Consultation  Update"
             style={{border:"none", width:25}} color="primary" onClick={()=>consultationupdate(row)} >
            <i className="fa fa-pencil" /></Button>

            <Button type="button" class="success-btn" title="Give Rating" 
            onClick={()=>rating_popup(row._id)} 
            style={{border:"none", width:25}} variant="contained" color="primary" >
            <i className="fa fa-star" /></Button>

            <Button type="button" class="danger-btn" title="Delete Data" 
            onClick={()=>deleteconfirm(row._id)} 
            style={{border:"none", width:25}} variant="contained" color="primary" >
            <i className="fa fa-trash" /></Button>
            </>
           
              
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
    fetch(API_URL + "/admin/consultation/"+deleteid,{
      method:"DELETE",
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((res)=>res.json())
    .then((res)=>{
      console.log(res)
      setSuccessalert(true)
      setDeletealert(false)
      fetchlist()
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
        customFilterListOptions: {
          render: v => v.toLowerCase()
        },
        responsive: "stacked",
        fixedHeaderOptions: {
            xAxis: true,
            yAxis: true,
        },
  };

 
  const stepsmodelcall = (id) => {
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
      console.log(res)
      setStepsmodel(false)
      setSuccessalert(true)
      fetchlist();
      
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
   filter: true,
   sort: true,
  }
 },

 {
  name: "Active",
  label: "Active",
  options: {
   filter: true,
   sort: true,
  }
 },

 {
  name: "Name",
  label: "Name",
  options: {
   filter: true,
   sort: true,
  }
 },

 {
  name: "Typeof",
  label: "Typeof",
  options: {
   filter: false,
   sort: true,
  }
 },

 {
  name: "Experience",
  label: "Experience",
  options: {
   filter: true,
   sort: true,
  }
 },

{
  name: "Profile",
  label: "Profile",
  options: {
   filter: false,
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
      Consultant List
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
  loading===false && consultationlist?
<MUIDataTable className="table_holder"
  title={"Consultant List"}
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
            <MenuItem value="1">Service Partner Notified</MenuItem>
            <MenuItem value="2">Service Partner Scheduled</MenuItem>
            <MenuItem value="3">Service Partner Arrived</MenuItem>
            <MenuItem value="4">Consultation completed</MenuItem>
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
            style={{background:"white"}}>
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




<Modal  open={rating_update}  onClose={() => setRating_update(false)} center>
<Container>
  <Row style={{marginTop:50}}>
     <Col sm="12" md={{ size: 6 }} className="custom-style">
     <div className="row">
      <div className="col-sm-6">
        <select className="form-control" value={type} onChange={(e) => setType(e.target.value)}>
          <option value="patient">patient</option>
          <option value="expert">expert</option>
        </select>
      </div>
      <div className="col-sm-6">
        <input className="form-control" type="number" value={rating_input} onChange={(e) => setRating_input(e.target.value)} />
        <p style={{color:"red"}}>{rating_input_error}</p>
      </div>
     </div>
     <Button className="submit_button" type="button" onClick={()=>rating()} variant="contained" color="primary" style={{marginTop: 25, float:"right"}}>Update Now</Button>
     </Col>
   </Row>
 </Container>
</Modal>



</React.Fragment>
} 
  />
        );
}
export default AllConsultationList;