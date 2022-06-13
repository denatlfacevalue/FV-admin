import React,{useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Row, Col, Grid } from 'react-bootstrap';
import ReactClipboard from 'react-clipboardjs-copy'
import Button from '@material-ui/core/Button';
import Moment from 'react-moment';
import LeftSide from './../Home/dashboard/LeftSide'
import Container from '@material-ui/core/Container';
import MUIDataTable from "mui-datatables";
import {Link} from 'react-router-dom';
import { Card } from 'antd';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
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



const LabOrderDetails =  (props) => {
    const [labOrderData, setLabOrderData] = useState([])
    const [status, setStatus] = useState("")
    const [steps, setSteps] = useState([])
    const [completed, setCompleted] = useState("")
    const [payed, setPayed] = useState("")
    const [amount, setAmount] = useState("")
    const [date, setDate] = useState("")
    const [_id, set_id] = useState("")
    const [created_at, setCreated_at] = useState("")
    const [updated_at, setUpdated_at] = useState("")
    const [patientName, setPatientName] = useState("")
    const [hospitalId, setHospitalId] = useState("")
    const [creatorId, setCreatorId] = useState("")
    const [toothdata, setToothdata] = useState("")
    const [toothdataaa, setToothdataaa] = useState([])
    const [__v, set__v] = useState("")
    const [toothnumber, set__Toothnumber] = useState([])
    const [expanded, setExpanded] = useState(false);
    

    
    useEffect(()=>{
        fetchlaborders();
    },[])

    const fetchlaborders = () => {
        const id = localStorage.getItem("laborderdetails");
        if(id===null){
            props.history.push("LabOrderList")
        }
        else{
            const jsondata = JSON.parse(id);
            setLabOrderData(jsondata.id.labOrderData)
            setStatus(jsondata.id.status)
            setSteps(jsondata.id.steps.map((row)=>(
                [row.id,row.title, row.subTitle, row.confirmed===false ? <p>not confirmed</p> : <p>confirmed</p> ]
                )))
                var idx = 0; // key2
                set__Toothnumber(Object.keys(jsondata.id.toothdata))
                var toothdataa = jsondata.id.toothdata;
                setToothdataaa(toothdataa)
                console.log('first')
                console.log(toothdataa)
                
        
                
            setCompleted(jsondata.id.completed)
            setPayed(jsondata.id.paymentDetail.payed)
            setAmount(jsondata.id.paymentDetail.amount)
            setDate(jsondata.id.paymentDetail.date)
            set_id(jsondata.id._id)
            setCreated_at(jsondata.id.created_at)
            setUpdated_at(jsondata.id.updated_at)
            setPatientName(jsondata.id.patientName)
            setHospitalId(jsondata.id.hospitalId)
            setCreatorId(jsondata.id.createdBy)
            // setToothdata(jsondata.id.toothdata.map((row)=>(
            // [row.name,row.image, <>{row.completed===true ? <span>true</span> : <span>false</span> }</>, row.cost, row.type, row.step, row.label 
            //         ]
            //     )))
            set__v(jsondata.id.__v)
        }
    }

  const handleChange2 = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
  };

  const classes = useStyles();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

 

  const stepscolumn = [ "Id", "title","subtitle","confirmed"];
  const toothdatacolumn = [ "Name", "Image", "Completed", "Cost", "Type", "Lebel", "Step"];

  return (
    <LeftSide mainsection={
      <div>
        <Breadcrumbs maxItems={2}  aria-label="breadcrumb">
      <Link to="/LabOrderList" color="inherit">
        LabOrder List
      </Link>
      <Link color="inherit" style={{color:"gray", cursor:"none"}}>
        LabOrder Details
      </Link>
</Breadcrumbs> 
    <div className={classes.root}>
      
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="off"
          aria-label="scrollable prevent tabs example"
        >
          <Tab icon="LabDetails" aria-label="phone" {...a11yProps(0)} />
          <Tab icon="Steps" aria-label="person" {...a11yProps(1)} />
          <Tab icon="LabData" aria-label="help" {...a11yProps(2)} />
          <Tab icon="ToothData" aria-label="shopping" {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
      <Row style={{marginTop:10}}>
        <Col sm={12}>
            <Row style={{marginTop:10}}>
                <div className="col-sm-6">
                <div className="details_item">
                <div className="row">
                <div className="col-xl-2 col-md-3 col-sm-3 col-3">
                    <i class="fa fa-check-circle-o details_icon" aria-hidden="true"></i>
                </div>
                <div className="col-xl-10 col-md-9 col-sm-9 col-9">
                    <b> Id </b>
                    <p> {_id} </p>
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
                    <b> Status </b>
                    <p> {status} </p>
                </div>  
                </div>
                </div>
                </div>
            </Row>

            <Row style={{marginTop:10}}>
            <div className="col-sm-12">
                <div className="details_item">
                <div className="row">
                <div className="col-xl-1 col-md-2 col-sm-2 col-2">
                <i class="fa fa-check-circle-o details_icon" aria-hidden="true"></i>
                </div>
                <div className="col-xl-11 col-md-10 col-sm-10 col-10">
                    <b> PaymentDetails </b>
                    <p> Payed: {payed===true ? <span> true </span> : <span> false </span> } {amount!=='' ?  <span> , amount : {amount} </span>  :null} {date!=='' ?  <span> , date : {date} </span>  :null} </p>
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
                    <b> CreatorId </b>
                    <p> {creatorId} </p>
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
                    <b> hospitalId </b>
                    <p> {hospitalId} </p>
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
                    <b> completed </b>
                    <p> {completed===true ? <span>true</span> : <span>false</span> } </p>
                </div>
                </div>
                </div>
                </div>

                {/* <div className="col-sm-6">
                <div className="details_item">
                <div className="row">
                <div className="col-xl-2 col-md-3 col-sm-3 col-3">
                <i class="fa fa-check-circle-o details_icon" aria-hidden="true"></i>
                </div>
                <div className="col-xl-10 col-md-9 col-sm-9 col-9">
                    <b> __v </b>
                    <p> {__v} </p>
                </div>
                </div>
                </div>
                </div> */}
                </Row>

                <Row style={{marginTop:10}}>
                <div className="col-sm-6">
                <div className="details_item">
                <div className="row">
                <div className="col-xl-2 col-md-3 col-sm-3 col-3">
                <i class="fa fa-check-circle-o details_icon" aria-hidden="true"></i>
                </div>
                <div className="col-xl-10 col-md-9 col-sm-9 col-9">
                    <b> created_at </b>
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
                    <b> updated_at </b>
                    <p> <Moment format="HH:MM:SS, DD:MM:YYYY">{updated_at}</Moment> </p>
                </div>
                </div>
                </div>
                </div>
                </Row>
              </Col>
            </Row>
      </TabPanel>
     
      <TabPanel value={value} index={1}>
        <MUIDataTable className="table_holder"
        title={"Steps List"}
        data={steps}
        columns={stepscolumn}
        />
      </TabPanel>

      <TabPanel value={value} index={2}>
      <h2>Lab Data</h2>
      </TabPanel>

      <TabPanel value={value} index={3}>
    
      {toothnumber.map((row)=>(
        
      <div>
        
       { console.log(toothdataaa[row])}
      <Accordion expanded={expanded === row} style={{padding:0}}  onChange={handleChange2(row)}>
        <AccordionSummary  
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading} >ToothNumber : <span style={{fontWeight:"bold", color:"green"}}> {row} </span></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <MUIDataTable className="table_holder"
        title={"Toothdata List"}
        data={toothdataaa[row].map((row)=>(
          [row.step, row.name,row.image, row.completed===false ? <p>false</p> : <p>true</p>, row.cost, row.type, row.label,    
              ]
          ))}
        columns={toothdatacolumn}
        
      />
      
          </Typography>
        </AccordionDetails>
      </Accordion>
      </div>
      ))}
    
      {/* <Row style={{marginTop:10}}>
                        
                    <div className="col-sm-12">
                        <div className="details_item">
                        <div className="row">
                        <div className="col-xl-1 col-md-2 col-sm-2 col-2">
                        <i class="fa fa-check-circle-o details_icon" aria-hidden="true"></i>
                        </div>
                        <div className="col-xl-11 col-md-10 col-sm-10 col-10">
                            <b> Tooth Number </b>
                            <p style={{color:"green", fontWeight:"bold"}}> {toothnumber} </p>
                        </div>
                      
                        </div>
                        </div>
                        </div>
                    </Row>
      <MUIDataTable className="table_holder"
        title={"Toothdata List"}
        data={toothdata}
        columns={toothdatacolumn}
      /> */}
      </TabPanel>
     
    </div>
    </div>
    }
    />
  );
}

export default LabOrderDetails