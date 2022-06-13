
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
    fetchtreatmentdetails()
},[])

const fetchtreatmentdetails = () =>{
    const accesstoken  = localStorage.getItem("accesstoken")
    const treatmentid  = localStorage.getItem("treatmentid")

    fetch(API_URL+"/patient/records/"+treatmentid,{
        headers:{
            'x-access-token':accesstoken,
        },
        method:"GET"
    })
   .then((res)=>res.json())
    .then((res)=>{
      console.log("treatment detal")
      console.log(res)
        setTreatmentlist(res.data.map((row)=>(
            [<ReactClipboard text={row._id}
              onSuccess={(e) => console.log(e)}
              onError={(e) => console.log(e)}>
              <button title="Click To Copy" style={{border:"none"}}>{row._id.substring(0,5)+"...."}</button>
          </ReactClipboard>,row.patientName, row.chiefComplaint, row.investigation, row.diagnosis, row.totalAmount, row.amountPaid,   <Button type="button" className="warning-btn" onClick={()=>treatmentdetails(row)} variant="contained" color="primary" style={{border:"none", minWidth:25}} title="View Details"><i class="fa fa-info" /></Button>
          ]
          )))
    })
    .catch((error)=>{
        console.log(error)
    })
}

  const columns = ["Id","Name", "ChiefComplaint", "Investigation", "Diagnosis", "TotalAmount", "TotalPaidAmount", "Action"];
 
  const options = {
    selectableRows: 'none',
    filter: false,
  };



  const treatmentdetails = (id) =>{
    localStorage.setItem("treatmenthistorydetails",JSON.stringify(id)) 
    props.history.push("/TreatmentDetails")
  }
    const { classes } = props;
        return (
    <LeftSide mainsection={
    <React.Fragment>
     <Breadcrumbs maxItems={4} aria-label="breadcrumb">
      <Link href="/HospitalList" color="inherit">
        HospitalList
      </Link>
      <Link onClick={()=>props.history.push("/PatientList")} style={{cursor:"pointer"}} color="inherit">
        PatientList
      </Link>
      <Link onClick={()=>props.history.push("/TreatmentList")} style={{cursor:"pointer"}} color="inherit">
        TreatmentList
      </Link>
      <Link  color="inherit">
        Treatment History List
      </Link>
    
</Breadcrumbs> 
  <MUIDataTable className="table_holder"
  title={"Treatment History List"}
  data={treatmentlist}
  columns={columns}
  options={options}
/>

  </React.Fragment>
  } />
        );
}
export default TreatementList;