import React,{useState,useEffect} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col } from 'react-bootstrap';
import 'react-calendar/dist/Calendar.css';
import LeftSide from './../Home/dashboard/LeftSide';
import { SpinnerCircular } from 'spinners-react';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import 'react-toastify/dist/ReactToastify.css';

import MUIDataTable from "mui-datatables";
import {Link} from 'react-router-dom';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { API_URL } from '../../httpcommon';
import Moment from 'react-moment';

const ServiceDetails =  (props) =>{
    const[_id, set_id] = React.useState("")
    const[typeoff, setTypeoff] = React.useState("")
    const[description, setDescription] = React.useState("")
    const[related, setRelated] = React.useState("")
    const[notes, setNotes] = React.useState("")
    const[scheduleDate, setScheduleDate] = React.useState("")
    const[scheduleTime, setScheduleTime] = React.useState("")
    const[createdBy, setcreatedBy] = React.useState("")
    const[completed, setCompleted] = React.useState(false)
    const[paymentDetail, setpaymentDetail] = React.useState({})
    const[steps, setSteps] = React.useState([])
    const[status, setStatus] = React.useState("")
    const[images, setImages] = React.useState("")

    const[paymentAmount, setPaymentAmount] = React.useState("")
    const[paymentDate, setPaymentDate] = React.useState("")
    const[paymentPayed, setPaymentPayed] = React.useState(false)

    const [loading, setLoading] = React.useState(true)

    useEffect(()=>{
        fetchservicedetails()
    },[])

    const columns = ["Id","Title", "UpdatedDate", "Confirmed"];
    const fetchservicedetails = () =>{
        const id = localStorage.getItem('serviceid');
        if(id===null){
            props.history.push('/ServiceList');
        }
        else{
        fetch(API_URL +"/admin/service/"+id,{
            headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
            },
            method:"GET"
        })
        
        .then((res)=>res.json())
        .then((res)=>{
            console.log(res.data)
            setTypeoff(res.data.typeof)
            set_id(res.data._id)
            setDescription(res.data.desc)
            setRelated(res.data.related)
            setNotes(res.data.notes)
            setScheduleDate(res.data.scheduleDate)
            setScheduleTime(res.data.scheduleTime)
            setcreatedBy(res.data.createdBy)
            setCompleted(res.data.completed)
            setpaymentDetail(res.data.paymentDetail)
            
            setStatus(res.data.status)
            setImages(res.data.images)
            setLoading(false)
            setPaymentAmount(res.data.paymentDetail.amount)
            setPaymentPayed(res.data.paymentDetail.payed)
            setPaymentDate(res.data.paymentDetail.date)

            setSteps(res.data.steps.map((row)=>(
                [row.id,row.title, row.subTitle, row.confirmed===false ? <p>not confirmed</p> : <p>confirmed</p> 
                    ]
                )))
        })
        .then((error)=>{
            console.log(error)
        })
        }
    }

        const { classes } = props;
        return (
            <LeftSide mainsection={
                loading===true ?
                    <div style={{textAlign:"center", marginTop:150}}>
                    <SpinnerCircular  enabled={loading} />
                    </div>
                    :
        <div>

<Breadcrumbs  maxItems={2} style={{marginLeft:20}}  aria-label="breadcrumb">
<Link to="/ServiceList" color="inherit">
        Service List
      </Link>
      <Link color="inherit" style={{color:"gray", cursor:"none"}}>
      Service Details
      </Link>
</Breadcrumbs> 
                <Container >
                
                <div className="white-box details_box">
                <Container>
                <Row>
                <Col sm={12}>
                    <div className="service_details_holder">
               

            <Row style={{marginTop:10}}>
                <div className="col-sm-6">
                <div className="details_item">
                <div className="row">
                <div className="col-xl-2 col-md-3 col-sm-3 col-3">
                <i class="fa fa-check-circle-o details_icon" aria-hidden="true"></i>
                </div>
                <div className="col-xl-10 col-md-9 col-sm-9 col-9">
                    <b> _id </b>
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
                    <b> TypeOf </b>
                    <p> {typeoff} </p>
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
                    <b> Relatedto </b>
                    <p> {related} </p>
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
                    <p> {notes} </p>
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
                    <b> ScheduleDate </b>
                    <p> <Moment format="DD:MM:YYYY">{scheduleDate}</Moment> </p>
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
                <div className="col-sm-6">
                <div className="details_item">
                <div className="row">
                <div className="col-xl-2 col-md-3 col-sm-3 col-3">
                <i class="fa fa-check-circle-o details_icon" aria-hidden="true"></i>
                </div>
                <div className="col-xl-10 col-md-9 col-sm-9 col-9">
                    <b> ScheduleTime </b>
                    <p> {scheduleTime} </p>
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
                    <b> CreatedBy </b>
                    <p> {createdBy} </p>
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
                    <b> Completed </b>
                    {completed===true ?<p> true  </p> : <p>  false </p>}
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
                    <b> Payment Date </b>
                    <p> {paymentDate} </p>
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
                    <b> Payment Amount </b>
                    <p> {paymentAmount} </p>
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
                    <b> PaymentType </b>
                    <p> {paymentAmount} </p>
                </div>
              
                </div>
                </div>
                </div>
            </Row>



          
            </div>
                </Col>
                    </Row>
                
             

                <Row style={{marginTop:10, marginTop:20}}>
                    <Col sm={3}><b>Steps - </b></Col>
                </Row>
            
            <MUIDataTable className="table_holder"
  title={"Steps List"}
  data={steps}
  columns={columns}

  
/>
                </Container>
                </div>
                
            </Container >
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
export default withStyles(useStyles)(ServiceDetails);