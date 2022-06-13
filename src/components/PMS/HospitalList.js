
import React from 'react';
import 'react-confirm-alert/src/react-confirm-alert.css';
import 'react-responsive-modal/styles.css';
import Button from '@material-ui/core/Button';
import LeftSide from './../Home/dashboard/LeftSide';
import MUIDataTable from "mui-datatables";
import { SpinnerCircular } from 'spinners-react';
import Link from '@material-ui/core/Link';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import ReactClipboard from 'react-clipboardjs-copy'
import { API_URL } from '../../httpcommon'
const HospitalList = (props) =>{
    const [hospitalList, setHospitalList] = React.useState([])
    const [loading, setLoading] = React.useState(true)
        
  React.useEffect(()=>{
    fetchlist()
  },[])

  const fetchlist = () =>{
    fetch(API_URL+ "/admin/hospital/all")
    .then((res) => res.json())
    .then((res)=>{
      setHospitalList(res.data.map((row)=>(
        [row._id, row.name,  row.yearofEst, row.location.address, row.creatorId, 
      <><Button title="Patient List" class="extra-btn" type="button" onClick={()=>patientlist(row._id)}  
      style={{border:"none", width:25, marginLeft:-10}} variant="contained" 
      color="primary" ><i className="fa fa-arrow-right" /></Button> 
      <Button title="Hospital Details" class="warning-btn" type="button" onClick={()=>hospitaldetails(row)}  
      style={{border:"none", width:25}} variant="contained" color="primary" ><i className="fa fa-hospital-o" /></Button>
       </>]
        )))
        console.log(res.data)
        setLoading(false)
    })
}

//const columns = ["Id","Name", "yearofEst", "Location",  "CreatorId", "Action"];

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
  name: "yearofEst",
  label: "yearofEst",
  options: {
   filter: true,
   sort: true,
  }
 },

 {
  name: "Location",
  label: "Location",
  options: {
   filter: false,
   sort: true,
  }
 },

 {
  name: "CreatorId",
  label: "CreatorId",
  options: {
   filter: false,
   sort: true,
   customBodyRender: (value, tableMeta, updateValue) => {
    return(
      <Link style={{cursor:"pointer"}} onClick={()=>doctorDetails(value)}>{value}</Link>
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




const patientlist = (hospitalid) =>{
  localStorage.setItem('hospitalid',hospitalid)
  props.history.push('/PatientList')
}


const doctorDetails = (id) =>{
  localStorage.setItem('doctorid',id);
  props.history.push('/DoctorDetails')
}

const hospitaldetails = (data) => {
  localStorage.setItem("hospitaldetails",JSON.stringify({data}))
  props.history.push('/HospitalDetails')
}

      const { classes } = props;
        return (
    <LeftSide mainsection={
    <React.Fragment>
      {loading===true ?
      <div style={{textAlign:"center", marginTop:150}}>
      <SpinnerCircular  enabled={loading} />
      </div>
      :
<div>
<Breadcrumbs maxItems={2} aria-label="breadcrumb">
      <Link color="inherit">
        HospitalList
      </Link>
      
</Breadcrumbs>
<MUIDataTable className="table_holder"
  title={"Hospital List"}
  data={hospitalList}
  columns={columns}
   options={options}
/>

</div>
}
  </React.Fragment>
  } />
        );
}
export default HospitalList;