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
import Moment from 'react-moment';
import LeftSide from './../Home/dashboard/LeftSide'
import {Link} from 'react-router-dom';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';

const UserDetails =  (props) =>{
    const [userName, setUserName] = useState(""); 
    const [dob, setDob] = useState(""); 
    const [address, setAddress] = useState(""); 
    const [gender, setGender] = useState(""); 
    useEffect(()=>{
        fetchlist();
    },[])

    const fetchlist = () => {
        const getlist = localStorage.getItem("UserDetails")
        if(getlist===null){
            props.history.push("/TransactionList");
        }
        else{
            const res = JSON.parse(getlist)
            console.log(res)
            setUserName(res.object.userName)
            setDob(res.object.dob)
            setAddress(res.object.location.address)
            setGender(res.object.gender)
        }
    }
   
        const { classes } = props;
        return (
        <LeftSide mainsection={
            <div>
                <Breadcrumbs maxItems={2}  aria-label="breadcrumb">
            <Link to="/TransactionList" color="inherit" >
                Transaction List
            </Link>
            <Link color="inherit" style={{color:"gray", cursor:"none"}}>
                User Details
            </Link>
            </Breadcrumbs> 
            <div className="white-box details_box">
            <Container>
            <Row style={{marginTop:10}}>
                <div className="col-sm-6">
                <div className="details_item">
                <div className="row">
                <div className="col-xl-2 col-md-3 col-sm-3 col-3">
                <i class="fa fa-check-circle-o details_icon" aria-hidden="true"></i>
                </div>
                <div className="col-xl-10 col-md-9 col-sm-9 col-9">
                    <b> UserName </b>
                    <p> {userName} </p>
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
                    <b> DateofBirth </b>
                    <p> <Moment format="HH:MM:SS, DD:MM:YYYY">{dob}</Moment> </p>
                </div>
              
                </div>
                </div>
                </div>
                </Row >
                <Row style={{marginTop:10}}>
                <div className="col-sm-6">
                <div className="details_item">
                <div className="row">
                <div className="col-xl-2 col-md-3 col-sm-3 col-3">
                <i class="fa fa-check-circle-o details_icon" aria-hidden="true"></i>
                </div>
                <div className="col-xl-10 col-md-9 col-sm-9 col-9">
                    <b> Gender </b>
                    <p> {gender} </p>
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
                    <b> Address </b>
                    <p> {address} </p>
                </div>
              
                </div>
                </div>
                </div>

            </Row>

            </Container>
            
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
export default withStyles(useStyles)(UserDetails);