import React,{useState,useEffect} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col } from 'react-bootstrap';
import 'react-calendar/dist/Calendar.css';
import LeftSide from './../Home/dashboard/LeftSide'
import {Link} from 'react-router-dom';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Moment from 'react-moment';
import MUIDataTable from "mui-datatables";

const ConsultationIdDetails =  (props) =>{
    const [active, setActive] = useState("");
    const [created_at, setCreated_at] = useState("");
    const [description, setDescription] = useState("");
    const [experience, setExperience] = useState("");
    const [expert_rating, setExpertRating] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [latitude, setLatitude] = useState([]);
    const [longitude, setLongitude] = useState("");
    const [type, setType] = useState("");
    const [mobile, setMobile] = useState("");
    const [name, setName] = useState("");
    const [patient, setPatient] = useState("");
    const [pincode, setPincode] = useState("");
    const [typeoff, setTypeoff] = useState("");
    const [updated_at, setUpdated_at] = useState("");
    const [url, setUrl] = useState("");
    const [verified, setVerified] = useState("");
    const [__v, set__v] = useState("");
    const [_id, set_id] = useState("");
    const [patient_rating, setPatient_rating] = useState("");
   
    

    React.useEffect(()=>{
        fetchforumdetails()
    },[])

    const columns = ["Id","Title", "SubTitle", "Confirmed"];
   
    const fetchforumdetails = () =>{
        
        const jsondata = localStorage.getItem('consultationiddetails');
        
        if(jsondata===null){
            props.history.push('/ConsultationList');
        }
        else{
            const res = JSON.parse(jsondata);
            let ex_rating = 0;
            let pt_rating = 0;
            setActive(res.data.active)
            setCreated_at(res.data.created_at)
            setDescription(res.data.description)
            setExperience(res.data.experience)
            setLanguages(res.data.languages)
            setLatitude(res.data.location.coordinates[0])
            setLongitude(res.data.location.coordinates[1])
            setType(res.data.location.type)
            setMobile(res.data.mobile.code+""+res.data.mobile.value)
            setName(res.data.name)
            setPatient(res.data.patient_rating)
            setPincode(res.data.pincode)
            setTypeoff(res.data.typeof)
            setUpdated_at(res.data.updated_at)
            setUrl(res.data.url)
            setVerified(res.data.verified)
            set__v(res.data.__v)
            set_id(res.data._id)
            res.data.expert_rating.map((row)=>{
               ex_rating = ex_rating+row
            })

            res.data.patient_rating.map((row)=>{
               pt_rating = pt_rating+row
            })
            const expert_avrg = ex_rating/5
            const patient_avrg = pt_rating/5
            
            setExpertRating(expert_avrg)
            setPatient_rating(patient_avrg)

            // setTimeout(() => {
            //     alert(ex_rating)
            // }, 1000);
        }
    }

    

        const { classes } = props;
        return (
            <LeftSide mainsection={
                <div>
                    <Breadcrumbs maxItems={2} style={{marginLeft:1}}  aria-label="breadcrumb">
                    <Link to="/ConsultationList" color="inherit">
                    Consult List
                    </Link>
                    <Link color="inherit" style={{color:"gray", cursor:"none"}}>
                    Consultant Details
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
                            <b> name </b>
                            <p> {name} </p>
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
                            <b> Mobile </b>
                            <p> {mobile}</p>
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
                            <b> Verified </b>
                            {verified===true ? <p> True </p> : <p> False </p> }
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
                            <b> Description </b>
                            <p> {description} </p>
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
                            <b> Experience </b>
                            <p> {experience} </p>
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
                            <b> Languages </b>
                            <p> {languages.map((row) => {
                                    return row +", "
                                })} </p>
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
                            <b> Patient Rating </b>
                            <p> {patient_rating} out of 5</p>
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
                            <b> Expert Rating </b>
                            <p> {expert_rating} out of 5</p>
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
                            <b> Latitude & Longitude </b>
                               <p> {latitude} : {longitude}</p>
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
                            <b> Location Type </b>
                            <p> {type} </p>
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
                            <b> PinCode </b>
                               <p> {pincode}</p>
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
                            <b>  Typeof </b>
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
                            <b> Latitude : Longitude </b>
                               <p> {latitude} : {longitude}</p>
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
                            <b> Verified </b>
                            {verified===true ? <p> True </p> : <p> False </p> }
                        </div>
                      
                        </div>
                        </div>
                        </div>
                    </Row>

                    <Row style={{marginTop:10}}>
                        {/* <div className="col-sm-6">
                        <div className="details_item">
                        <div className="row">
                        <div className="col-xl-2 col-md-3 col-sm-3 col-3">
                        <i class="fa fa-check-circle-o details_icon" aria-hidden="true"></i>
                        </div>
                        <div className="col-xl-10 col-md-9 col-sm-9 col-9">
                            <b> Completed </b>
                            {completed===true ? <p> true </p> : <p> false </p>}
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
                            <b> CreatedAt </b>
                               <p> <Moment format="HH:MM:SS, DD:MM:YYYY">{created_at}</Moment></p>
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
                           <p> <Moment format="HH:MM:SS, DD:MM:YYYY">{updated_at}</Moment></p>
                        </div>
                      
                        </div>
                        </div>
                        </div>
        
                    </Row>
                    </Col>

                    <Col sm={4}>
                        <img src={url} style={{width:"100%", borderRadius:5}} />
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
export default withStyles(useStyles)(ConsultationIdDetails);