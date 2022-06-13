
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
import { API_URL } from '../../httpcommon';
import Moment from 'react-moment';
const ClinicList = (props) =>{
    const [hospitalList, setHospitalList] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    
  React.useEffect(()=>{
    fetchlist()
  },[])

  const fetchlist = () =>{
    fetch(API_URL + "/admin/hospital/all")
    .then((res) => res.json())
    .then((res)=>{
      setHospitalList(res.data.map((row)=>(
        [row._id, row.name,  row.yearofEst, row.location.address,  row.creatorId, 
      row.location.lat+"-"+row.location.long, row.verifiedAt
    ]
        )))
        console.log(res.data)
        setLoading(false)
    })
}

// const columns = ["Id","Name", "yearofEst", "Location", "CreatorId", "Ltd-Lng", "VerifiedAt"];

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
    console.log("customBodyRender");
    return(
    <Link onClick={()=>doctorDetails(value)} style={{cursor:"pointer"}}>{value}</Link>
    )
  }
  }
 },


 {
  name: "Ltd-Lng",
  label: "Ltd-Lng",
  options: {
   filter: false,
   sort: true,
  }
 },

 {
  name: "VerifiedAt",
  label: "VerifiedAt",
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
        ClinicList
      </Link>
      
</Breadcrumbs>
<MUIDataTable className="table_holder"
  title={"Clinic List"}
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
export default ClinicList;