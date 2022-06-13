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

const PatientDetails =  (props) =>{
    const[data, setData] = useState({
        Name:"",
        _id:"",
        age:"",
        avatar:"",
        bloodGroup:"",
        city:"",
        country:"",
        dateofBirth:"",
        doctorId:"",
        email:"",
        gender:"",
        hospitalId:"",
        medicalHistory:"",
        mobileNumber:"",
        state:"",
        TreatmentIds:[],
        __v:""
    })

    useEffect(()=>{
        fetchhospitaldetails()
    },[])

    const fetchhospitaldetails = () =>{
     const jsondata = localStorage.getItem("patientdetails")
     if(jsondata===null){
         props.history.push("PatientList")
     }
     else{
       
        const jsonparse = JSON.parse(jsondata)
        setData({
            Name:jsonparse.data.name,
            _id:jsonparse.data._id,
            age:jsonparse.data.age,
            avatar:jsonparse.data.avatar,
            bloodGroup:jsonparse.data.bloodGroup,
            city:jsonparse.data.city,
            country:jsonparse.data.country,
            dateofBirth:jsonparse.data.dateofBirth,
            doctorId:jsonparse.data.doctorId,
            email:jsonparse.data.email,
            gender:jsonparse.data.gender,
            hospitalId:jsonparse.data.hospitalId,
            medicalHistory:jsonparse.data.medicalHistory,
            
            state:jsonparse.data.state,
            TreatmentIds:jsonparse.data.treatmentIds,
            __v:jsonparse.data.__v
        })
     }
    }
   
     const { classes } = props;
        return (
            <LeftSide mainsection={
                <div>
                    <Breadcrumbs maxItems={2} style={{marginLeft:1}}  aria-label="breadcrumb">
                    <Link to="/PatientList" color="inherit">
                    Patient List
                    </Link>
                    <Link color="inherit" style={{color:"gray", cursor:"none"}}>
                    Patient Details
                    </Link>
                    </Breadcrumbs> 
                    <div className="white-box details_box">
                    <Container>
                    <Row>
                        <Col sm={8}>
                  
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
                            <b> Age </b>
                            <p> {data.age} </p>
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
                            <b> bloodGroup </b>
                            <p> {data.bloodGroup} </p>
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
                            <b> dateofBirth </b>
                            <p> <Moment format="DD:MM:YYYY">{data.dateofBirth}</Moment> </p>
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
                            <b> gender </b>
                            <p> {data.gender} </p>
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
                            <b> email </b>
                               <p> {data.email} </p>
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
                            <b> mobileNumber </b>
                            <p>{data.mobileNumber}  </p>
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
                            <b> TreatmentIds </b>
                               <p> {data.TreatmentIds.map((row)=>{
                                    return row +" ," 
                                })}</p>
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
                            <b> medicalHistory </b>
                            <p>{data.medicalHistory}  </p>
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
                            <b> doctorId </b>
                               <p> {data.doctorId} </p>
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
                            <p>{data.hospitalId}  </p>
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
                            <b> city </b>
                               <p> {data.city} </p>
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
                            <b> State , Country </b>
                            <p>{data.state} , {data.country}  </p>
                        </div>
                      
                        </div>
                        </div>
                        </div>
        
                    </Row>

                    
                    </Col>


                    <Col sm={4}>
                        <img src={data.avatar} style={{width:"100%"}} />
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
export default withStyles(useStyles)(PatientDetails);