import React,{useState,useEffect} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col } from 'react-bootstrap';
import 'react-calendar/dist/Calendar.css';
import Button from '@material-ui/core/Button';
import Moment from 'react-moment';
import LeftSide from './../Home/dashboard/LeftSide'
import {Link} from 'react-router-dom';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';

const HospitalDetails =  (props) =>{
    const[data, setData] = useState({
        Name:"",
        _id:"",
        address:"",
        latitude:"",
        longitude:"",
        verifiedAt:"",
        yearofEst:"",
        creatorId:"",
        __v:""
    })

    useEffect(()=>{
        fetchhospitaldetails()
    },[])

    const fetchhospitaldetails = () =>{
     const jsondata = localStorage.getItem("hospitaldetails")
     if(jsondata===null){
         props.history.push("HospitalList")
     }
     else{
        const jsonparse = JSON.parse(jsondata)
        setData({
            Name:jsonparse.data.name,
            _id:jsonparse.data._id,
            latitude:jsonparse.data.location.lat,
            longitude:jsonparse.data.location.long,
            address:jsonparse.data.location.address,
            yearofEst:jsonparse.data.yearofEst,
            creatorId:jsonparse.data.creatorId,
            __v:jsonparse.data.__v,
            verifiedAt:jsonparse.data.verifiedAt,
        })
     }
    }
   
     const { classes } = props;
        return (
            <LeftSide mainsection={
                <div>
                    <Breadcrumbs maxItems={2} style={{marginLeft:1}}  aria-label="breadcrumb">
                    <Link to="/HospitalList" color="inherit">
                    Hospital List
                    </Link>
                    <Link color="inherit" style={{color:"gray", cursor:"none"}}>
                    Hospital Details
                    </Link>
                    </Breadcrumbs> 
                    <div className="white-box details_box">
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
                            <p> {data._id} </p>
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
                            <b> Name </b>
                            <p> {data.Name} </p>
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
                            <p> {data.address} </p>
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
                            <b> creatorId </b>
                            <p> {data.creatorId} </p>
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
                            <b> Laitude - Longitude </b>
                            <p> {data.latitude} - {data.longitude} </p>
                        </div>
                      
                        </div>
                        </div>
                        </div>
{/*         
                        <div className="col-sm-6">
                        <div className="details_item">
                        <div className="row">
                        <div className="col-xl-2 col-md-3 col-sm-3 col-3">
                        <i class="fa fa-check-circle-o details_icon" aria-hidden="true"></i>
                        </div>
                        <div className="col-xl-10 col-md-9 col-sm-9 col-9">
                            <b> __v </b>
                            <p> {data.__v} </p>
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
                            <b> yearofEst </b>
                               <p> {data.yearofEst} </p>
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
                            <b> verifiedAt </b>
                            <p><Moment format="HH:MM:SS, DD:MM:YYYY"> {data.verifiedAt} </Moment>  </p>
                        </div>
                      
                        </div>
                        </div>
                        </div>
        
                    </Row>

                    
                    </Col>
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
export default withStyles(useStyles)(HospitalDetails);