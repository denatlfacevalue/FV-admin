
import React from 'react';
import 'react-confirm-alert/src/react-confirm-alert.css';
import 'react-responsive-modal/styles.css';
import Button from '@material-ui/core/Button';
import LeftSide from './../Home/dashboard/LeftSide';
import MUIDataTable from "mui-datatables";
import {Link} from 'react-router-dom';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import ReactClipboard from 'react-clipboardjs-copy'
import { API_URL } from '../../httpcommon';
import Moment from 'react-moment';

const PatientList = (props) =>{
  const [patientlist, setPatientlist] = React.useState([])  
  const [loading, setLoading] = React.useState(true)
  React.useEffect(()=>{
    fetchlist()
  },[])

  const fetchlist = () =>{
      const id = localStorage.getItem('hospitalid');
      if(id===null){
          props.history.push('/HospitalList')
      }
    else{
    fetch(API_URL+"/admin/patient/all",
    {
        method:"POST",
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            hospitalId:id
        })
    })
    .then((res) => res.json())
    .then((res)=>{
        setPatientlist(res.data.map((row)=>(
          [<ReactClipboard text={row._id}
            onSuccess={(e) => console.log(e)}
            onError={(e) => console.log(e)}>
            <button title="Click To Copy" style={{border:"none"}}>{row._id}</button>
        </ReactClipboard>,row.name, 
        row.email, 
        row.mobileNumber.code+''+row.mobileNumber.number,
         <Moment format="DD:MM:YYYY">{row.dateofBirth}</Moment>,
         row.age, 
         row.gender,
          row.city,
           row.state,
           <>
           <Button title="View Patient Details" class="extra-btn" type="button" onClick={()=>PatientDetails(row)}  style={{border:"none", width:25}} variant="contained" color="primary" ><i className="fa fa-info" /> </Button> 
            
            <Button class="warning-btn" type="button" onClick={()=>treatmentdetails(row._id,row.hospitalId)}  style={{border:"none", width:25}} variant="contained" color="primary" title="View Treatment List"> <i className="fa fa-arrow-right" /></Button> 

           </>
        ]
        )))
        console.log(res.data)
        setLoading(false)
    })
    }
}

  //const columns = ["Id","Name", "Email", "Mobile", "DateofBirth", "Age", "Gender", "City", "State","Action"];
 
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
  name: "Name",
  label: "Name",
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
  name: "Mobile",
  label: "Mobile",
  options: {
   filter: false,
   sort: true,
  }
 },

 {
  name: "DateOfBirth",
  label: "DateOfBirth",
  options: {
   filter: false,
   sort: true,
  }
 },

 {
  name: "Age",
  label: "Age",
  options: {
   filter: true,
   sort: true,
  }
 },

  {
  name: "Gender",
  label: "Gender",
  options: {
   filter: true,
   sort: true,
  }
 },

  {
  name: "City",
  label: "City",
  options: {
   filter: true,
   sort: true,
  }
 },

  {
  name: "State",
  label: "State",
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


  const PatientDetails = (data) =>{
    localStorage.setItem("patientdetails", JSON.stringify({data}))
    props.history.push("PatientDetails")
  }

  const treatmentdetails = (patientid, hospitalid) =>{
    localStorage.setItem('hospitalid', hospitalid)
    localStorage.setItem('patientid', patientid)
    props.history.push("/TreatmentList");
  }

      const { classes } = props;
        return (
    <LeftSide mainsection={
    <React.Fragment>

<Breadcrumbs maxItems={2}  aria-label="breadcrumb">
      <Link to="/HospitalList" color="inherit">
        HospitalList
      </Link>
      <Link color="inherit" style={{color:"gray", cursor:"none"}}>
        PatientList
      </Link>
</Breadcrumbs>         
  <MUIDataTable className="table_holder"
  title={"Patient List"}
  data={patientlist}
  columns={columns}
  options={options}
/>

  </React.Fragment>
  } />
        );
}
export default PatientList;