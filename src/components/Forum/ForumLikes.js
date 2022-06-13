
import React, {useState, useEffect} from 'react';
import 'react-confirm-alert/src/react-confirm-alert.css';
import 'react-responsive-modal/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../index.css";
import LeftSide from '../Home/dashboard/LeftSide';
import MUIDataTable from "mui-datatables";
import ReactClipboard from 'react-clipboardjs-copy'
import { API_URL } from '../../httpcommon';
import Moment from 'react-moment';

const ForumLikesList = (props) =>{
  const [forumcommentlist, setForumcommentlist] = useState([]);
  const [loading, setLoading] = React.useState(true)
    
  React.useEffect(()=>{
    fetchlist()
  },[])

  const fetchlist = () =>{
    setLoading(true)
    const id = localStorage.getItem('forumid');
    if(id===null){
        props.history.push('/ForumList')
    }
    else{
    const accesstoken = localStorage.getItem("accesstoken");
    
    fetch(API_URL +"/forum/like/list/"+id,{
        headers:{
            'x-access-token': accesstoken
        },
        method:"GET",
        
    })
    .then((res) => { res.json().then((result)=>{
      
      console.log(result)
        if(result.status){
          setForumcommentlist(result.data.map((row)=>(
            [row.forumId, row.creatorName,  <Moment format="HH:MM:SS, DD:MM:YYYY">{row.created_at}</Moment>]
        )))
        }else{
          setForumcommentlist(null)
        }
        setLoading(false)
    })
  })  
}
  }
  const columns = ["ForumId", "CreatorName", "Createdat"];
 const options = {
        filter: false,
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
          <MUIDataTable className="table_holder"
          title={"Forum Likes"}
          data={forumcommentlist}
          columns={columns}
           options={options}

          /> 
          </React.Fragment>
          } />
        );
}
export default ForumLikesList;