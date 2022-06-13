import React,{useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Row, Col, Grid } from 'react-bootstrap';
import Moment from 'react-moment';
import LeftSide from './../Home/dashboard/LeftSide'
import {Link} from 'react-router-dom';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-prevent-tabpanel-${index}`}
      aria-labelledby={`scrollable-prevent-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-prevent-tab-${index}`,
    'aria-controls': `scrollable-prevent-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));



const SupportDetails =  (props) => {

    const [s_at, setS_at] = useState("");
    const [s_note, setS_note] = useState("");
    const [updated_at, setUpdated_at] = useState("");
    const [created_at, setCreated_at] = useState("");
    const [s_id, setS_id] = useState("");
    const [s__v, setS__v] = useState("");
    const [status, setStatus] = useState("");

    useEffect(()=>{
        fetchdoctordetails();
    },[])

    const fetchdoctordetails = () =>{
        const id = localStorage.getItem('supportdetails');
        if(id===null){
            props.history.push('/SupportList');
        }
        else{
        const jsondata = JSON.parse(id)
        console.log(jsondata.postedBy)
            setS_at(jsondata.attachement)
            setS_note(jsondata.note)
            setUpdated_at(jsondata.updated_at)
            setCreated_at(jsondata.created_at)
            setS_id(jsondata._id)
            setS__v(jsondata.__v)
            setStatus(jsondata.status)
        }          
    }
  const classes = useStyles();
  return (
    <LeftSide mainsection={
      <div>
        <Breadcrumbs maxItems={2}  aria-label="breadcrumb">
      <Link to="/SupportList" color="inherit">
        Support List
      </Link>
      <Link color="inherit" style={{color:"gray", cursor:"none"}}>
        Support Details
      </Link>
</Breadcrumbs> 
<div className="white-box">
      
    <Row style={{marginTop:10}}>
        <Col sm={8}>
          <Row style={{marginTop:10}}>
                <div className="col-sm-6">
                <div className="details_item">
                <div className="row">
                <div className="col-xl-2 col-md-3 col-sm-3 col-3">
                <i class="fa fa-check-circle-o details_icon" aria-hidden="true"></i>
                </div>
                <div className="col-xl-10 col-md-9 col-sm-9 col-9">
                    <b> _id </b>
                    <p> {s_id} </p>
                </div>
              
                </div>
                </div>
                </div>

                <div className="col-sm-6">
                <div className="details_item">
                <div className="row">
                <div className="col-xl-2 col-md-3 col-sm-3 col-3">
                <i class="fa fa-check-circle-o details_icon" aria-hidden="true"></i>
                </div>
                <div className="col-xl-10 col-md-9 col-sm-9 col-9">
                    <b> Notes </b>
                    <p> {s_note} </p>
                </div>
              
                </div>
                </div>
                </div>
                </Row>

                <Row style={{marginTop:10}}>
                <div className="col-sm-6">
                <div className="details_item">
                <div className="row">
                <div className="col-xl-2 col-md-3 col-sm-3 col-3">
                <i class="fa fa-check-circle-o details_icon" aria-hidden="true"></i>
                </div>
                <div className="col-xl-10 col-md-9 col-sm-9 col-9">
                    <b> CreatedDate </b>
                    <p> <Moment format="HH:MM:SS, DD:MM:YYYY">{created_at}</Moment> </p>
                </div>
              
                </div>
                </div>
                </div>

                <div className="col-sm-6">
                <div className="details_item">
                <div className="row">
                <div className="col-xl-2 col-md-3 col-sm-3 col-3">
                <i class="fa fa-check-circle-o details_icon" aria-hidden="true"></i>
                </div>
                <div className="col-xl-10 col-md-9 col-sm-9 col-9">
                    <b> UpdatedDate </b>
                    <p> <Moment format="HH:MM:SS, DD:MM:YYYY">{updated_at}</Moment> </p>
                </div>
              
                </div>
                </div>
                </div>

                {/* <div className="col-sm-6" style={{marginTop:10}}>
                <div className="details_item">
                <div className="row">
                <div className="col-xl-2 col-md-3 col-sm-3 col-3">
                <i class="fa fa-check-circle-o details_icon" aria-hidden="true"></i>
                </div>
                <div className="col-xl-10 col-md-9 col-sm-9 col-9">
                    <b> Status </b>
                    {status!==true  ? <p> True </p> : <p> False </p> } 
                </div>
              
                </div>
                </div>
                </div> */}
                </Row>

            </Col>

            <Col sm={4}>   
            {s_at!=='' && s_at!==null  ?
            <img src={s_at} style={{width:"100%"}} />
            :
            <img src="./images/image-not-found.jpg" style={{width:"100%"}} />
            }
            </Col>
        </Row>
    
    </div>
    </div>
    }
    />
  );
}

export default SupportDetails