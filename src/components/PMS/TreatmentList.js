
import React from 'react';
import 'react-confirm-alert/src/react-confirm-alert.css';
import 'react-responsive-modal/styles.css';
import Button from '@material-ui/core/Button';
import LeftSide from './../Home/dashboard/LeftSide';
import MUIDataTable from "mui-datatables";
import Link from '@material-ui/core/Link';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import ReactClipboard from 'react-clipboardjs-copy'
import { API_URL } from '../../httpcommon'

const TreatementList = (props) =>{
  const [treatmentlist, setTreatmentlist] = React.useState([])  
  const [loading, setLoading] = React.useState(true)
  React.useEffect(()=>{
    fetchlist()
  },[])

  const fetchlist = () =>{
      const hid = localStorage.getItem('hospitalid');
      const pid = localStorage.getItem('patientid');
      if(hid===null){
          props.history.push('/HospitalList')
      }
    else{
      const accesstoken = localStorage.getItem("accesstoken");
    fetch(API_URL+"/patient/treatments",
    {
        method:"POST",
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',
            'x-access-token':accesstoken
        },
        body:JSON.stringify({
            hospitalId:hid,
            patientID:pid
        })
    })
    .then((res) => res.json())
    .then((res)=>{
      console.log("treatments")
      console.log(res)
        setTreatmentlist(res.data.map((row)=>(
          [row._id,row.name, row.patientId, row.hospitalId, row.category, <Button type="button" className="warning-btn" onClick={()=>treatmentdetails(row._id)} variant="contained" color="primary" style={{border:"none", minWidth:25}} title="View Details"><i class="fa fa-info" /></Button>
        ]
        )))
        setLoading(false)
    })
    }
}

//  const columns = ["Id","Name", "PatientId", "HospitalId", "Category","Action"];
 
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
   filter: true,
   sort: true,
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
  name: "HospitalId",
  label: "HospitalId",
  options: {
   filter: false,
   sort: true,
  }
 },

 {
  name: "Category",
  label: "Category",
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



  const treatmentdetails = (id) =>{
    localStorage.setItem("treatmentid",id) 
    props.history.push("/TreatmentDetailsList")
  }
    const { classes } = props;
        return (
    <LeftSide mainsection={
    <React.Fragment>
      <Breadcrumbs maxItems={3} aria-label="breadcrumb">
      <Link href="/HospitalList" color="inherit">
        HospitalList
      </Link>
      <Link onClick={()=>props.history.push("/PatientList")} style={{cursor:"pointer"}} color="inherit">
        PatientList
      </Link>
      <Link  color="inherit">
        TreatmentList
      </Link>
</Breadcrumbs>    
  <MUIDataTable className="table_holder"
  title={"Treatment List"}
  data={treatmentlist}
  columns={columns}
   options={options}
/>

  </React.Fragment>
  } />
        );
}
export default TreatementList;