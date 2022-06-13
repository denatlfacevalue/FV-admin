
import React, {useState, useEffect} from 'react';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Button from '@material-ui/core/Button';
import 'react-responsive-modal/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../index.css";
import LeftSide from '../Home/dashboard/LeftSide';
import {Link} from 'react-router-dom';
import MUIDataTable from "mui-datatables";
import SweetAlert from 'react-bootstrap-sweetalert';
import ReactClipboard from 'react-clipboardjs-copy'
import { API_URL } from '../../httpcommon'
import Moment from 'react-moment';

const ForumCommentList = (props) =>{
  const [forumcommentlist, setForumcommentlist] = useState([]);
  const [loading, setLoading] = React.useState(true)
  const [deletealert, setDeletealert] = React.useState(false)
  const [successalert, setSuccessalert] = React.useState(false)
  const [deletecommentid, setDeletecommentid] = React.useState("")
  const [deleteforumid, setDeleteforumid] = React.useState("")
    
  React.useEffect(()=>{
    fetchlist()
  },[])

  const columns = ["ForumId", "CreatorName", "Comment", "PostedBy", "CommentId", "CreatedAt", "Action"];
  const options = {
      filter:false,
      download:false,
        print: true,
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


  const fetchlist = () =>{
    const id = localStorage.getItem('forumid');
    if(id===null){
        props.history.push('/ForumList')
    }
    else{
      const accesstoken = localStorage.getItem("accesstoken");
    fetch(API_URL +"/forum/comment/list/"+id,{
        headers:{
            'x-access-token': accesstoken
        },
        method:"GET"
    })

    .then((res) => { res.json().then((result)=>{
        if(result.status){
          console.log(result)
           setForumcommentlist(result.data.map((row)=>(
            [row.forumId, row.creatorName, row.comment, <Link onClick={()=>doctordetails(row.postedBy)}>{row.postedBy}</Link>, row.commentId,  <Moment format="HH:MM:SS, DD:MM:YYYY">{row.created_at}</Moment>, <Button type="button" class="danger-btn" onClick={()=>deleteconfirm(row.commentId,row.forumId)} style={{border:"none", width:25}} variant="contained" color="primary" ><i className="fa fa-trash" /></Button>]
        )))
        }else{
          setForumcommentlist(null)
        }
        setLoading(false)
    })
  })  
}
  }

  const doctordetails = (id) =>{
    localStorage.setItem('doctorid',id);
    props.history.push('/DoctorDetails')
  }

  const deleteconfirm = (cid,fid) => {
   setDeletecommentid(cid)
   setDeleteforumid(fid)
   setDeletealert(true)
  };

  const commentdelete = () =>{
    const accesstoken = localStorage.getItem("accesstoken");
    
    fetch(API_URL +"/forum/delete/comment",{
      
        method:"POST",
        headers:{
          'Accept':'application/json',
          'Content-Type':'application/json',
          'x-access-token':accesstoken
        },

        body:JSON.stringify({
          forumId:deleteforumid,
          commentId:deletecommentid
        })
      })

      .then((res)=>{
        console.log(res)
        
          fetchlist()
          setDeletealert(false)
          setSuccessalert(true)
        
      })
      .catch((error)=>{
        alert('érror')
        console.log(error)
      })
  }

      const { classes } = props;
      var i = 1;
        return (
          <LeftSide mainsection={
            <React.Fragment>
      
  <MUIDataTable className="table_holder"
  title={"Forum Comments"}
  data={forumcommentlist}
  columns={columns}
  options={options}
  
/>

{deletealert===true ?
<SweetAlert
  warning
  showCancel
  confirmBtnText="Yes, delete it!"
  confirmBtnBsStyle="danger"
  title="Are you sure?"
  onConfirm={()=>commentdelete()}
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
export default ForumCommentList;