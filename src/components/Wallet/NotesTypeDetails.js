import React,{useState,useEffect} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, } from 'react-bootstrap';
import 'react-calendar/dist/Calendar.css';
import LeftSide from './../Home/dashboard/LeftSide'
import {Link} from 'react-router-dom';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';

const NotesTypeDetails =  (props) =>{
    const [notestypelist, setNotestypelist] = useState(""); 
    const [type, setType] = useState(""); 
    const [setaNumber, setSetaNumber] = useState(""); 
    const [name, setName] = useState(""); 
    const [Category, setCategory] = useState(""); 
    const [address, setAddress] = useState(""); 
    useEffect(()=>{
        fetchlist();
    },[])

    const fetchlist = () => {
        const getlist = localStorage.getItem("notestypelist")
        if(getlist===null){
            props.history.push("/TransactionList");
        }
        else{
            const res = JSON.parse(getlist)
            console.log(res)
            setType(res.notes.type)
            setSetaNumber(res.notes.setaNumber)
            setName(res.notes.name)
            setCategory(res.notes.category)
            setAddress(res.notes.address)

        }
    }
   
        const { classes } = props;
        return (
        <LeftSide mainsection={
            <div>
            <Breadcrumbs maxItems={2}  aria-label="breadcrumb">
            <Link to="/TransactionList" color="inherit" >
                Trasaction list
            </Link>
            <Link color="inherit" style={{color:"gray", cursor:"none"}}>
                Notes Type Details
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
                    <b> Type </b>
                    <p> {type} </p>
                </div>
              
                </div>
                </div>
                </div>
            {type==='event' ?
                <div className="col-sm-6">
                <div className="details_item">
                <div className="row">
                <div className="col-xl-2 col-md-3 col-sm-3 col-3">
                <i class="fa fa-check-circle-o details_icon" aria-hidden="true"></i> 
                </div>
                <div className="col-xl-10 col-md-9 col-sm-9 col-9">
                    <b> Seta Number </b>
                    <p> {setaNumber} </p>
                </div>
              
                </div>
                </div>
                </div>
            :null}
                </Row>
            
            {type==='event' ?
              <Row style={{marginTop:10}}>
                <div className="col-sm-6">
                <div className="details_item">
                <div className="row">
                <div className="col-xl-2 col-md-3 col-sm-3 col-3">
                <i class="fa fa-check-circle-o details_icon" aria-hidden="true"></i> 
                </div>
                <div className="col-xl-10 col-md-9 col-sm-9 col-9">
                    <b> Name </b>
                    <p> {name} </p>
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
:null}

{type==='event' ?
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
        :null}
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
export default withStyles(useStyles)(NotesTypeDetails);