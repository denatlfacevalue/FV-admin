import React,{useState,useEffect} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col } from 'react-bootstrap';
import LeftSide from './../Home/dashboard/LeftSide'
import {Link} from 'react-router-dom';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { API_URL } from '../../httpcommon'

const AssociationDetails =  (props) =>{
    const[role, setRole] = useState("");
    const[verified, setVerified] = useState("");
    const[Id, setId] = useState("");
    const[pushedBy, setPushedBy] = useState("");
    const[owneredBy, setOwneredBy] = useState("");
    const[UserName, setUserName] = useState("");
    const[user_id, setUser_id] = useState("");
    const[hospitalId, setHospitalId] = useState("");
    const[address, setAddress] = useState("");
    const[lat, setLat] = useState("");
    const[long, setLong] = useState("");
    const[hospital_id, set_Hospitalid] = useState("");
    const[hospitalName, setHospitalName] = useState("");
    const[yearofEast, setYearofEast] = useState("");
    const[created_at, setCreated_at] = useState("");
    const[updated_at, setUpdated_at] = useState("");
    const[__v, set__v] = useState("");



    useEffect(()=>{
        fetchassociationdetails()
    },[])
   
    const fetchassociationdetails = () =>{
        const id = localStorage.getItem('associationid');
        if(id===null){
            props.history.push('/AssociationList');
        }
        else{
            const jsondata = JSON.parse(id)
            console.log('association')
            
            setRole(jsondata.role)
            setVerified(jsondata.verified)
            setId(jsondata._id)
            setPushedBy(jsondata.pushedBy)
            setUserName(jsondata.owneredBy.user.userName)
            setUser_id(jsondata.owneredBy._id)
            setHospitalId(jsondata.hospitalId._id)
            setAddress(jsondata.hospitalId.location.address)
            setLat(jsondata.hospitalId.location.lat)
            setLong(jsondata.hospitalId.location.long)
            setHospitalId(jsondata.hospitalId._id)
            setHospitalName(jsondata.hospitalId.name)
            setYearofEast(jsondata.hospitalId.yearofEast)
            setCreated_at(jsondata.created_at)
            setUpdated_at(jsondata.updated_at)
            set__v(jsondata.__v)
        }
    }
  

        const { classes } = props;
        return (
            <LeftSide mainsection={
                <div>
                    <Breadcrumbs maxItems={2} style={{marginLeft:1}}  aria-label="breadcrumb">
                    <Link to="/AssociationList" color="inherit">
                    Association List
                    </Link>
                    <Link color="inherit" style={{color:"gray", cursor:"none"}}>
                    Association Details
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
                            <p> {Id} </p>
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
                            <b> Role </b>
                            <p> {role} </p>
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
                            <b> OwneredBy UserName </b>
                            <p> {UserName} </p>
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
                            <b> UserId </b>
                            <p> {user_id} </p>
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
                            <b> Verified </b>
            <p>{verified===true ? <span> true </span> : <span>false</span> } </p>
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
                            <b> Pushed By </b>
                            <p> {pushedBy}  </p>
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
                            <b> Hospital Name </b>
                               <p>{hospitalName} </p>
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
                            <b> Hospital Id </b>
                            <p> {hospitalId}  </p>
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
                            <b> Address </b>
                               <p>{address} </p>
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
                            <b> Latitude - Longitude</b>
                            <p> {lat} - {long}  </p>
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
                            <b> Created At </b>
                               <p>{created_at} </p>
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
                            <b> Updated At </b>
                            <p> {updated_at}  </p>
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
                            <b> yearofEast </b>
                               <p>{yearofEast} </p>
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
                            <b> __v </b>
                            <p> {__v}  </p>
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
export default withStyles(useStyles)(AssociationDetails);