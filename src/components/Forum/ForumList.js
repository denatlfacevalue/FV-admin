
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
import { API_URL } from '../../httpcommon';
import Moment from 'react-moment';

const ForumList = (props) =>{
  const [forumlist, setForumlist] = useState([]);
  const [loading, setLoading] = React.useState(true)    
  const [successalert, setSuccessalert] = React.useState(false)
  const [deletealert, setDeletealert] = React.useState(false)
    const [deleteid, setDeleteid] = React.useState("");
  React.useEffect(()=>{
    fetchlist()
  },[])

  const fetchlist = () =>{
    setLoading(true)
    fetch(API_URL +"/admin/forum/list")
    .then((res) => { res.json().then((result)=>{
        if(result.status){
          console.log("re")
          console.log(result)
          setForumlist(result.data.map((row)=>(
          [row.id,
        row.imageIncludes ? 'true' : 'false',
        
        row.creatorName,
        <Link style={{cursor:"pointer"}} onClick={()=>likes(row.id)}>
        <Button type="button" className="danger-btn" variant="contained" color="primary" 
        style={{border:"none", minWidth:25, marginLeft:2}} title="Delete">{row.likes}</Button>
        </Link>, 
        <Link style={{cursor:"pointer"}} onClick={()=>comment(row.id)}>
            <Button type="button" className="danger-btn" onClick={()=>deleteconfirm(row.id)}
             variant="contained" color="primary" style={{border:"none", minWidth:25, marginLeft:2}} title="view Details">
            {row.comments===undefined ? <span> 0</span> : row.comments}
            </Button>
            </Link>, row.forumcreatorId, row.created_at, 
            <Button>
          <Button type="button" className="warning-btn" onClick={()=>forumdetails(row.id)} variant="contained" color="primary" style={{border:"none", minWidth:25}} title="View Details"><i class="fa fa-info" /></Button>
          <Button type="button" className="danger-btn" onClick={()=>deleteconfirm(row.id)} variant="contained" color="primary" style={{border:"none", minWidth:25, marginLeft:2}} title="Delete"><i class="fa fa-trash" /></Button>
          </Button>
          ]
          )))
        }else{
          setForumlist(null)
        }
        setLoading(false)
    })
  })  
  }

  const forumdetails = (id) =>{
    localStorage.setItem('forumid',id);
    props.history.push('/ForumDetails')
  }

  const deleteconfirm = (id) => {
   setDeleteid(id)
   setDeletealert(true)
  };

  const doctorDetails = (id) =>{
    localStorage.setItem('doctorid',id);
    props.history.push('/DoctorDetails')
  }

  const forumdelete = (id) =>{
    fetch(API_URL +"/admin/forum/"+id,{
        headers:{
          'Accept':'application/json',
          'Content-Type':'application/json'
        },
        
        method:"DELETE"
      })
      .then((res)=>res.json())
      .then((res)=>{
        console.log(res)
        setDeletealert(false)
        setSuccessalert(true)
        if(res.status===true){
          fetchlist()
        }
      })
      .catch((error)=>{
        alert('érror')
        console.log(error)
      })
  }

  const comment = (id) =>{
    localStorage.setItem('forumid',id);
    props.history.push('/ForumCommentList')
  }

  const likes = (id) =>{
    
    localStorage.setItem('forumid',id);
    props.history.push('/ForumLikes')
  }

 // const columns = [ "Id", "Creater Name", "Likes", "Comments", "forumcreatorId", "created_at",  "Action"];

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
 name: "ImageIncludes",
  label: "ImageIncludes",
  options: {
   filter: true,
   sort: true,
  }
 },

  {
  name: "Creater Name",
  label: "Creater Name",
  options: {
   filter: false,
   sort: true,
  }
 },

 {
  name: "Likes",
  label: "Likes",
  options: {
   filter: false,
   sort: true,
  }
 },

 {
  name: "Comment",
  label: "Comment",
  options: {
   filter: false,
   sort: true,
  }
 },

 {
  name: "forumcreatorId",
  label: "forumcreatorId",
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


      const { classes } = props;
      var i = 1;
        return (
          <LeftSide mainsection={
            <React.Fragment>
              <Link style={{color:"gray"}} color="inherit">
        Forum List
      </Link>
  {forumlist?
<MUIDataTable className="table_holder"
  title={"Forum List"}
  data={forumlist}
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
  onConfirm={()=>forumdelete(deleteid)}
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
export default ForumList;