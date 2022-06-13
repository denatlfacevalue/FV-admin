import React,{useState,useEffect} from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormData from "form-data";
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';  
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Grid } from 'react-bootstrap';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import Button from '@material-ui/core/Button';
import {  map } from "lodash";
import axios from 'axios';
import LeftSide from './../Home/dashboard/LeftSide';
import DateFnsUtils from '@date-io/date-fns';
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import { ToastContainer, toast } from 'react-toastify';
import { SpinnerCircular } from 'spinners-react';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import 'react-toastify/dist/ReactToastify.css';
import Moment from 'react-moment';
import {Link} from 'react-router-dom'
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { API_URL } from '../../httpcommon'
const EventDetails =  (props) =>{
    const [fee, setFee] = useState("paid");
    const [eventType, setEventType] = useState("Laser Dentists");
    const [tags, setTags] = useState([]);
    const [entryfee, setEntryfee] = useState("");
    const [prequest, setPrequest] = useState("");
    const [prequisites, setPrequisites] = useState([""]);
    const [seatAvailable, setSeatAvailable] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [address, setAddress] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [locationtype, setLocationtype] = useState("");
    const [requiredfield, setRequiredfield] = useState("");
    const [success, setSuccess] = useState("");
    const [Category, setCategory] = useState("seminar");
    const [event_date, setEvent_date] = useState(new Date());
    const [images,setImages] = useState(null)
    const [attendees,setAttendees] = useState([])
    const [_id,set_id] = useState(null)
    const [created_at,setCreated_at] = useState(null)
    const [updated_at,setUpdated_at] = useState(null)
    const [__v,set__v] = useState(null)
    const [date, changeDate] = useState(new Date());
    const [loading, setLoading] = React.useState(true)
    const [seatNumber, setSeatNumber] = React.useState()

React.useEffect(()=>{
    fetcheventdetails();
},[])

const fetcheventdetails  = () =>{
    const id = localStorage.getItem("eventid");
    if(id===null){
        props.history.push('/EventList');
    }
    else{
    fetch(API_URL + "/admin/event/"+id,{
        headers:{
          'Accept':'application/json',
          'Content-Type':'application/json'
        },
        method:"GET"
      })
      
      .then((res)=>res.json())
       .then((res)=>{
           console.log(res)
        setFee(res.data.fee)
        setEventType(res.data.event_type)
        setTags(res.data.tags)
        setEntryfee(res.data.entryfee)
        setPrequisites(res.data.prequisites)
        setSeatAvailable(res.data.seatAvailable)
        setTitle(res.data.title)
        setDescription(res.data.description)
        setAddress(res.data.address)
        setLatitude(res.data.location.coordinates[0])
        setLongitude(res.data.location.coordinates[1])
        setLocationtype(res.data.location.type)
        setCategory(res.data.Category)
        setEvent_date(res.data.event_date)
        setImages(res.data.images)
        setSeatNumber(res.data.seatsBooked)
        if(res.data.attendees.length!==0){
        setAttendees(res.data.attendees)
        }
        set_id(res.data._id)
        setCreated_at(res.data.created_at)
        setUpdated_at(res.data.updated_at)
        set__v(res.data.__v)
        changeDate(res.data.event_date)
        setLoading(false)
       })
       .then((error)=>{
         console.log(error)
       })
    }
}

    const tags_str = tags.map((row=>{return `${row}  `}))
    const prequesties_str = prequisites.map((row=>{return `${row}  `}))
    
    const { classes } = props;
        return (
        <LeftSide mainsection={
            loading===true ?
                <div style={{textAlign:"center", marginTop:150}}>
                    <SpinnerCircular  enabled={loading} />
                </div>
                :
            <Container >
    <Breadcrumbs maxItems={2}  aria-label="breadcrumb">
      <Link to="/EventList" color="inherit">
        Event List
      </Link>
      <Link color="inherit" style={{color:"gray", cursor:"none"}}>
        EventDetails
      </Link>
</Breadcrumbs> 
            <div className="white-box details_box" style={{paddingTop:30, paddingBottom:30, paddingLeft:0, paddingRight:0}}>
            <Container>
            <Row>
                <h4 style={{marginLeft:15,marginBottom:20}}>Event Details</h4>
            </Row>
            <Row>
                <Col sm={7}>
                    <div className="service_details_holder">
                <Row style={{marginTop:-10}}>
                <div className="col-sm-12">
                <div className="details_item">
                <div className="row">
                <div className="col-xl-1 col-md-2 col-sm-2 col-2">
                <i class="fa fa-check-circle-o details_icon" aria-hidden="true"></i>
                </div>
                <div className="col-xl-11 col-md-10 col-sm-10 col-10">
                    <b> Title </b>
                    <p> {title} </p>
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
                    <b> Entryfee </b>
                    <p> {entryfee} </p>
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
                    <b> Seat Booked </b>
                    <p> {seatNumber} </p>
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
                    <b> SeatAvailable </b>
                    <p> {seatAvailable} </p>
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
                      <b> Attendees </b>
                    <p>  <p> {attendees.map((row)=>{
                                    return ` ${row._id}  `
                                }).toString()} </p> </p>
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
                    <b> Address </b>
                    <p> {address} </p>
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
                    <b> Latitude </b>
                    <p> {latitude} </p>
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
                    <b> Longitude </b>
                    <p> {longitude} </p>
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
                    <b> LocationType </b>
                    <p> {locationtype} </p>
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
                    <b> Category </b>
                    <p> {Category} </p>
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
                    <b> Fee </b>
                    <p> {fee} </p>
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
                    <b> EventType </b>
                    <p> {eventType} </p>
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
                    <b> EventDate </b>
                    <p> <Moment format="HH:MM:SS, DD:MM:YYYY">{event_date}</Moment> </p>
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
                    <b> Tags </b>
                    
                    <p> {tags_str.toString()} </p>
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
                    <b> CreatedAt </b>
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
                    <b> UpdatedAt </b>
                    <p> <Moment format="HH:MM:SS, DD:MM:YYYY">{updated_at}</Moment> </p>
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
                    <b> Prequisites </b>
                    <p> {prequesties_str.toString()} </p>
                </div>
              
                </div>
                </div>
                </div>
            </Row>
          
            </div>
                </Col>

                <Col sm={5}>
                <div className="details_description">
                    {images!="" ? 
                    images.map((row)=>{
                    return <img src={row} style={{width:"100%", height: 300, borderRadius:5}} />
                    })
                    :null}
                    <Row style={{marginTop:10}}>
                    <div class="service_details">
                <Col sm={12}>
                    <h5>Description:</h5>
                </Col>
                <Col sm={12}><p> : {description} </p></Col>
                </div>
            </Row>
            </div>
                </Col>
            </Row>
            </Container>
            </div>
        </Container >
        
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
export default withStyles(useStyles)(EventDetails);