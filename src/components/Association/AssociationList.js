
import React, {useState, useEffect} from 'react';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Button from '@material-ui/core/Button';
import 'react-responsive-modal/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../index.css";
import LeftSide from '../Home/dashboard/LeftSide';
import MUIDataTable from "mui-datatables";
import SweetAlert from 'react-bootstrap-sweetalert';
import Link from '@material-ui/core/Link';
import ReactClipboard from 'react-clipboardjs-copy'
import Moment from 'react-moment';
import { API_URL } from '../../httpcommon'

const AssociationList = (props) =>{
  const [associationlist, setAssociationlist] = useState([]);
  const [loading, setLoading] = React.useState(true)    
  const [successalert, setSuccessalert] = React.useState(false)
  const [deletealert, setDeletealert] = React.useState(false)
    const [deleteid, setDeleteid] = React.useState("");
  React.useEffect(()=>{
    fetchlist()
  },[])

  const fetchlist = () =>{
    setLoading(true)
    const accesstoken = localStorage.getItem("accesstoken");
    fetch(API_URL + "/profile/get/associates",{
        headers:{
            'x-access-token': accesstoken
        },
        method:"GET"
    })
    
    .then((res) => { res.json().then((result)=>{
        if(result.status){
            console.log(result)
          setAssociationlist(result.data.map((row)=>(
          [<ReactClipboard text={row._id}
            onSuccess={(e) => console.log(e)}
            onError={(e) => console.log(e)}>
            <button title="Click To Copy" style={{border:"none"}}>{row._id}</button>
        </ReactClipboard>,<Link style={{cursor:"pointer"}} onClick={()=>doctorDetails(row.owneredBy._id)}>{row.owneredBy.user.userName}</Link>, 
        row.role,
        <span>
        {row.verified!==true ?
            <span style={{color:"green"}}>true</span>
            :
            <span style={{color:"red"}}>false</span>
        }
        </span>, 
      
            row.hospitalId.name
            , <Moment format="HH:MM:SS, DD:MM:YYYY">{row.created_at}</Moment>, 
          <Button type="button" className="warning-btn" onClick={()=>AssociationDetails(row)} variant="contained" color="primary" style={{border:"none", minWidth:25}} title="View Details"><i class="fa fa-info" /></Button>
          ]
          )))
        }else{
          setAssociationlist(null)
        }
        setLoading(false)
    })
  })  
  }

  const AssociationDetails = (id) =>{
    localStorage.setItem('associationid',JSON.stringify(id));
    props.history.push('/AssociationDetails')
  }


  const doctorDetails = (id) =>{
    localStorage.setItem('doctorid',id);
    props.history.push('/DoctorDetails')
  }



  const columns = [ "Id", "UserName", "Role", "Verified", "HospitalName", "created_at",  "Action"];
    
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

      const { classes } = props;
      var i = 1;
        return (
          <LeftSide mainsection={
            <React.Fragment>
              <Link style={{color:"gray"}} color="inherit">
        Association List
      </Link>
  {associationlist?
<MUIDataTable className="table_holder"
  title={"Association List"}
  data={associationlist}
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
//   onConfirm={()=>forumdelete(deleteid)}
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
export default AssociationList;