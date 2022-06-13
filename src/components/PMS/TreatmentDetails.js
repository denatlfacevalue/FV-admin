import React,{useState,useEffect,createContext,useContext} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col } from 'react-bootstrap';
import 'react-calendar/dist/Calendar.css';
import {Link} from 'react-router-dom'
import { Card } from 'antd';
import LeftSide from './../Home/dashboard/LeftSide';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Moment from 'react-moment';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import ReactClipboard from 'react-clipboardjs-copy'
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
const TreatmentDetails = (props) =>{
    const [InvestigationImages, setInvestigationImages] = useState([])
    const [amountPaid, setAmountPaid] = useState()
    const [attachment, setAttachment] = useState([])
    const [balance, setBalance] = useState()
    const [cancelled, setCancelled] = useState()
    const [chiefComplaint, setChiefComplaint] = useState()
    const [diagnosis, setDiagnosis] = useState()
    const [doctorId, setDoctorId] = useState()
    const [hospitalId, sethospitalId] = useState()
    const [investigation, setInvestigation] = useState()
    const [medicalHistory, setMedicalHistory] = useState()
    const [nextAppointmentDate, setNextAppointmentDate] = useState()
    const [nextAppointmentTime, setNextAppointmentTime] = useState()
    const [notes, setNotes] = useState()
    const [observation, setObservation] = useState()
    const [patientName, setPatientName] = useState()
    const [patientId, setPatientId] = useState()
    const [patientType, setPatientType] = useState()
    const [timein, setTimein] = useState()
    const [timeout, setTimeout] = useState()
    const [totalAmount, setTotalAmount] = useState()
    const [treatmentId, setTreatmentId] = useState()
    const [treatmentPlan, setTreatmentPlan] = useState()
    const [__v, set__v] = useState()
    const [_id, set_id] = useState()
    const [paymenttype, setPaymentType] = useState()
    const [loading, setLoading] = useState(true)
    const [treatmentdetailslist, setTreatmentdetailslist] = useState()

    useEffect(()=>{
        fetchtreatmentdetails()
    },[])

    const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

    const fetchtreatmentdetails = () =>{
        
        const accesstoken  = localStorage.getItem("accesstoken")
        const treatmentrow  = localStorage.getItem("treatmenthistorydetails")
        console.log("treat")
        const jsondata = JSON.parse(treatmentrow)
        console.log(jsondata)
        set_id(jsondata._id)
        setPatientName(jsondata.patientName)
        setPatientId(jsondata.patinetId)
        setPaymentType(jsondata.paymentType)
        setTimeout(jsondata.timeout)
        setTimein(jsondata.timein)
        setObservation(jsondata.observation)
        setNotes(jsondata.notes)
        setNextAppointmentDate(jsondata.nextAppoinmentDate)
        setNextAppointmentTime(jsondata.nextAppoinmentTime)
        setTreatmentId(jsondata.treatmentId)
        setTreatmentPlan(jsondata.treatmentPlan)
        setTotalAmount(jsondata.totalAmount)
        setChiefComplaint(jsondata.chiefComplaint)
        setBalance(jsondata.balance)
        setAttachment(jsondata.attachment)
        setDoctorId(jsondata.doctorId)
        sethospitalId(jsondata.hospitalId)
        setCancelled(jsondata.cancelled)
        setAmountPaid(jsondata.amountPaid)
        setDiagnosis(jsondata.diagnosis)
        set__v(jsondata.__v)
        setInvestigation(jsondata.investigation)
        setInvestigationImages(jsondata.InvestigationImages)
    }

    const {classes} = props;
    return (
        <LeftSide mainsection={
            <div>
                   <Breadcrumbs maxItems={5} aria-label="breadcrumb">
      <Link href="/HospitalList" color="inherit">
        HospitalList
      </Link>
      <Link to="/PatientList" style={{cursor:"pointer"}} color="inherit">
        PatientList
      </Link>
      <Link to="/TreatmentList" style={{cursor:"pointer"}} color="inherit">
        TreatmentList
      </Link>
      <Link to="/TreatmentDetailsList" color="inherit">
        Treatment History List
      </Link>

      <Link  color="inherit" style={{color:"gray", cursor:"none"}}>
        Treatment History All Details
      </Link>
    
</Breadcrumbs> 
                <div className="white-box details_box">
                <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="off"
          aria-label="scrollable prevent tabs example"
        >
          <Tab icon="Treatment Details" aria-label="phone" {...a11yProps(0)} />
          <Tab icon="Attachment" aria-label="person" {...a11yProps(1)} />
          <Tab icon="Investigation Images" aria-label="help" {...a11yProps(2)} />
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0}>
            <Container>
            <Row>
            <Col sm={12}>
                <Row style={{marginTop:10}}>
                    <div className="col-sm-6">
                    <div className="details_item">
                    <div className="row">
                    <div className="col-xl-2 col-md-3 col-sm-3 col-3">
                    <i class="fa fa-check-circle-o details_icon" aria-hidden="true"></i>
                    </div>
                    <div className="col-xl-10 col-md-9 col-sm-9 col-9">
                        <b> _Id </b>
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
                        <b> Patient Name </b>
                        <p> {patientName} </p>
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
                            <b> Patient Id </b>
                            <p> {patientId} </p>
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
                        <b> Treatment Id </b>
                        <p> {treatmentId} </p>
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
                        <b> Treatment Plan </b>
                        <p> {treatmentPlan} </p>
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
                        <b> Notes </b>
                            <p>{notes}</p>
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
                        <b> Observation </b>
                        <p> {observation}  </p>
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
                        <b> Hospital Id </b>
                            {hospitalId}
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
                        <b> Doctor Id </b>
                        <p> {doctorId}  </p>
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
                        <b> Medical History </b>
                            {medicalHistory}
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
                        <b> Investigation </b>
                        <p> {investigation}  </p>
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
                        <b> Dialognosis </b>
                           <p> {diagnosis}</p>
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
                        <b> Chief Complaint </b>
                        <p> {chiefComplaint}  </p>
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
                        <b> Total Amount </b>
                        <p> {totalAmount} </p>
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
                        <b> Amount Paid </b>
                        <p> {amountPaid}  </p>
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
                        <b> Balance </b>
                            <p>{balance}</p>
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
                        <b> Payment Type </b>
                        <p> {paymenttype} </p>
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
                        <b> Time In </b>
                      <p>  <Moment format="HH:MM:SS, DD:MM:YYYY">{timein}</Moment></p>
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
                        <b> Time Out </b>
                        <p> <Moment format="MM-DD-yyyy hh:mm a">{timeout}</Moment>  </p>
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
                        <b> Next Appointment Date & Time </b>
                          <p>  {nextAppointmentDate} , {nextAppointmentTime}</p>
                    </div>
                  
                    </div>
                    </div>
                    </div>
                    </Row>
                </Col>
                </Row>
                </Container>
      </TabPanel>

      <TabPanel value={value} index={1}>
            <Row>
                {attachment.map((row) =>{
                    return <Col sm={6}> <img src={row} style={{width:"100%"}}/> </Col>
                })}                
            </Row>
      </TabPanel>

      <TabPanel value={value} index={2}>
      <Row>
                {InvestigationImages.map((row) =>{
                    return <Col sm={6}> <img src={row} style={{width:"100%"}}/> </Col>
                })}                
            </Row>
      </TabPanel>
    </div>
</div>
    } />
    );
    
    }


    const useStyles = (theme) => ({
        Container: {
            width: "100%",
            display: "flex",
            backgroundColor: "#DFDFDF",
            margin: 10
        },
        TextField: {
            margin: 10,
            width: "100%"
        },
        Typography: {
            margin: 20
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        }
    })

export default withStyles(useStyles)(TreatmentDetails);