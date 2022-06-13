import React from 'react';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { Modal } from 'react-responsive-modal';
import FormControl from '@material-ui/core/FormControl';
import LeftSide from './../Home/dashboard/LeftSide'
import { SpinnerCircular } from 'spinners-react';
import { Container, Row, Col  } from 'reactstrap';
import 'react-toastify/dist/ReactToastify.css';
import SweetAlert from 'react-bootstrap-sweetalert';
import MUIDataTable from "mui-datatables";
import Moment from 'react-moment';
import ReactClipboard from 'react-clipboardjs-copy'

import Link from '@material-ui/core/Link';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { API_URL } from '../../httpcommon'
const Services = (props) => {
    const[services, setServices] = React.useState(null)
 
    const[open, setOpen] = React.useState(false)
    const[updatemodel, setUpdatemodel] = React.useState(false)
    const[statusupdate, setStatusupdate] = React.useState("Approved")
    const[statusupdateid, setStatusupdateid] = React.useState("")
    const[updatemodel_steps, setUpdatemodel_steps] = React.useState(false)
    const[stepsupdate, setStepsupdate] = React.useState("1");
    const[stepsupdateid, setStepsupdateid] = React.useState("");
    const[loading, setLoading] = React.useState(true)
    const[successalert, setSuccessalert] = React.useState(false)
    const [deletealert, setDeletealert] = React.useState(false)
    const [deleteid, setDeleteid] = React.useState("");

    const [notice, setNotice] = React.useState(false);
    const [arrived, setArrived] = React.useState(false);
    const [scheduled, setScheduled] = React.useState(false);
    const [completed, setCompleted] = React.useState(false);

    React.useEffect(()=>{
       fetchservices()
    },[])

    const fetchservices = () =>{
      fetch(API_URL + "/admin/service/list")
      .then((res) => { res.json().then((result)=>{
        console.log(result)
          if(result.status){
            setServices(result.data.map((row)=>(
            [
            row.status==='Requested' ?
            row.status
            :
            row.status==='Completed' ?
            row.status
            :
            row.status==='Progress' ?
            row.status
            :
            row.status
            ,
            row._id, row.typeof, row.desc, row.related, row.scheduleDate, row.createdBy.user.userName, row.createdBy._id,
            <Button>
            <Button type="button" class="warning-btn" title="View Details" onClick={()=>ServiceDetails(row._id)} variant="contained" color="primary" style={{border:"none", width:25}}><i class="fa fa-info" /></Button>
            <Button class="update-btn" type="button" variant="contained" title="Update Status" onClick={()=>onOpenModal(row._id)} variant="contained" color="primary" style={{border:"none", width:25}}><i class="fa fa-star" /></Button>
            {row.status!='Completed' &&  row.status!='Requested' && row.status!='Approved' && row.status!='Declined' ?
            <Button type="button" title="Update Steps" class="success-btn" onClick={()=>onStepModal(row._id, row.steps)} variant="contained" color="primary" style={{border:"none", width:25}}><i class="fa fa-arrow-right" /></Button>
            :null}
            <Button type="button" title="Delete Service" class="danger-btn" onClick={()=>deleteconfirm(row._id)} variant="contained" color="primary" style={{border:"none", width:25}}><i class="fa fa-trash" /></Button> 
              </Button>   
              ]
              )))
             
          }else{
            setServices(null)
          }
          setLoading(false)
      })
  })
    }

    const onDelete = () => {

    }

   const onOpenModal = (id) => {
      	setStatusupdateid(id);
        setUpdatemodel(true)
    };

    const onStepModal = (id, steps) => {
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
      setUpdatemodel_steps(true)

      fetchservices()
  };

  const doctorDetails = (id) =>{
    localStorage.setItem('doctorid',id);
    props.history.push('/DoctorDetails')
  }
   
    const onCloseModal = () => {
      setOpen(false)
      setUpdatemodel_steps(false)
      setUpdatemodel(false)
    };

    const update = () =>{
    
      fetch(API_URL + '/admin/service/update',{
        method:"PUT",
        headers:{
            'Accept':'*/*',
            'Content-Type':'application/json',
        },
        
        body:JSON.stringify({
            serviceId:statusupdateid,
            status:statusupdate,
        })
    })

    .then((res)=>res.json())
    .then((res)=>{
        fetchservices()
        setSuccessalert(true)
        setUpdatemodel(false)
        console.log(res)
    })
    .catch((error)=>{
        alert('error')
        console.log(error)
    })
    }

    const updatesteps = () =>{
      fetch(API_URL +'/service/update/book/status',{
        method:"POST",
        headers:{
          'Accept':'*/*',
          'Content-Type':'application/json',
        },
        
        body:JSON.stringify({
            serviceId:stepsupdateid,
            stepId:stepsupdate
        })
    })
  
    .then((res)=>{
        console.log(res)
        setSuccessalert(true)
        setUpdatemodel_steps(false)
        fetchservices()
    })
    .catch((error)=>{
        alert('error')
        console.log(error)
    })
    }

    const ServiceDetails = (serviceid) =>{
      localStorage.setItem('serviceid',serviceid)
      props.history.push('ServiceDetails');
    }
    
const servicedelete = (id) => {
    fetch(API_URL + "/admin/service/" + id, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },

      method: "DELETE"
    })
      .then((res) => res.json())
      .then((res) => {

        if (res.status === true) {
          setDeletealert(false)
          setSuccessalert(true)
          fetchservices();
        }
      })
      .catch((error) => {
        alert('érror')
        console.log(error)
      })
  }


  const deleteconfirm = (id) => {
    setDeleteid(id);
    setDeletealert(true)
  };
    
const columns =  [
  {
  name: "Status",
  label: "Status",
  options: {
   filter: true,
   sort: true,
  }
 },

 {
  name: "Id",
  label: "Id",
  options: {
   filter: false,
   sort: true,
  }
 },

 {
  name: "ServiceType",
  label: "ServiceType",
  options: {
   filter: true,
   sort: true,
  }
 },

 {
  name: "Description",
  label: "Description",
  options: {
   filter: false,
   sort: true,
  }
 },

 {
  name: "ReletedDepartment",
  label: "ReletedDepartment",
  options: {
   filter: true,
   sort: true,
  }
 },

 {
  name: "ScheduleDate",
  label: "ScheduleDate",
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
  name: "CreaterName",
  label: "CreaterName",
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
    return(
      <Link onClick={()=>doctorDetails(value)} style={{cursor:"pointer"}}>{value}</Link> 
    )
  }
  }
 },



 {
  name: "Action",
  label: "Action",
  options: {
   filter: false,
   sort: false,
  }
 }
]


   const options = {
      filterType: "checkbox",
        print: true,
        download:false,
        viewColumns: true,
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
      {
        deletealert === true ?
  <SweetAlert
    warning
    showCancel
    confirmBtnText="Yes, delete it!"
    confirmBtnBsStyle="danger"
    title="Are you sure?"
    onConfirm={() => servicedelete(deleteid)}
    onCancel={() => setDeletealert(false)}
    focusCancelBtn
  >

    You will not be able to recover this data!
</SweetAlert>
  : null
      }
        <Breadcrumbs  maxItems={2}  aria-label="breadcrumb">

      <Link color="inherit" style={{color:"gray", cursor:"none"}}>
      Service List
      </Link>
</Breadcrumbs> 

    {loading===true ?
    <div style={{textAlign:"center", marginTop:150}}>
    <SpinnerCircular  enabled={loading} />
    </div>
    :null}
      
{loading===false && services?
<MUIDataTable className="table_holder"
  title={"Service List"}
  data={services}
  columns={columns}
   options={options}
/>
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
<Modal  open={updatemodel}  onClose={() => onCloseModal()} center> 
<Container>
  <Row style={{marginTop:50}}>
     <Col sm="12" md={{ size: 6, offset: 3 }} className="custom-style">
     
     <InputLabel id="demo-simple-select-label">Status </InputLabel>
     <FormControl  id="selectborderstatus_update" >
     <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={statusupdate}
            onChange={(e) => setStatusupdate(e.target.value)}
            style={{background:"white"}}
        >
            <MenuItem value="Approved">Approved</MenuItem>
            {/* <MenuItem value="Requested">Requested</MenuItem> */}
            <MenuItem value="Progress">Progress</MenuItem>
            <MenuItem value="Declined">Declined</MenuItem>

        </Select>
        </FormControl>
     </Col>

     <Col sm="12" md={{ size: 6, offset: 3 }} className="custom-style">
     <Button className="submit_button" type="button" onClick={()=>update()} variant="contained" color="primary" style={{marginTop: 25}}>Update Now</Button>
     </Col>
   </Row>
 </Container>
</Modal>

<Modal  open={updatemodel_steps}  onClose={() => onCloseModal()} center> 
<Container>
  <Row style={{marginTop:50}}>
     <Col sm="12" md={{ size: 6, offset: 3 }} className="custom-style">
     
     <InputLabel id="demo-simple-select-label">Steps </InputLabel>
     <FormControl  id="selectborderstatus_update" >
     <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={stepsupdate}
            onChange={(e) => setStepsupdate(e.target.value)}
            style={{background:"white"}}            
        >
            {notice==false ? <MenuItem value="1">Service Partner Notified</MenuItem> :null}
            {scheduled==false ? <MenuItem value="2">Service Partner Scheduled</MenuItem> :null}
            {arrived==false ? <MenuItem value="3">Service Partner Arrived</MenuItem> :null}
            {completed==false ? <MenuItem value="4">Service Order  Completed</MenuItem> :null}

        </Select>
        </FormControl>
     </Col>

     <Col sm="12" md={{ size: 6, offset: 3 }} className="custom-style">
     <Button className="submit_button" type="button" onClick={()=>updatesteps()} variant="contained" color="primary" style={{marginTop: 25}}>Update Now</Button>
     </Col>
   </Row>
 </Container>
</Modal>

  </React.Fragment>
  } />
);
}
export default Services;