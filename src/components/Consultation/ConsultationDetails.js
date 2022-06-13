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

const ConsultationDetails =  (props) =>{
    const [completed, setCompleted] = useState("");
    const [created_at, setCreated_at] = useState("");
    const [updated_at, setUpdated_at] = useState("");
    const [_id, set_id] = useState("");
    const [__v, set__v] = useState("");
    const [status, setStatus] = useState([]);
    const [paid, setPaid] = useState("");
    const [amount, setAmount] = useState("");
    const [paymentdate, setPaymentdate] = useState("");
    const [steps, setSteps] = useState();
    

    React.useEffect(()=>{
        fetchforumdetails()
    },[])

    const columns = ["Id","Title", "SubTitle", "Confirmed"];
   
    const fetchforumdetails = () =>{
        
        const jsondata = localStorage.getItem('consultationdetail');
        
        if(jsondata===null){
            props.history.push('/ConsultationList');
        }
        else{
            const res = JSON.parse(jsondata);
            setCompleted(res.data.completed)
            setCreated_at(res.data.created_at)
            setUpdated_at(res.data.updated_at)
            set_id(res.data._id)
            setPaid(res.data.paymentDetail.payed)
            setAmount(res.data.paymentDetail.amount)
            set__v(res.data.__v)
            setPaymentdate(res.data.paymentDetail.date)
       console.log(res.data.steps)

            setSteps(res.data.steps.map((row)=>(
                [row.id,row.title, row.subTitle, row.confirmed===false ? <p>not confirmed</p> : <p>confirmed</p> 
                    ]
                )))
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
                    Consult Details
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
                            {status===true ? <p > true </p> : <p>false</p> }
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
            <p> {amount}</p>
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
                            <b> Paid </b>
                            {paid===true ? <p> True </p> : <p> False </p> }
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
            <p> {completed===true ? <span> true </span> : <span> false </span> }</p>
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
                            {__v }
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
                            <p><Moment format="HH:MM:SS, DD:MM:YYYY">{updated_at}</Moment></p>
                        </div>
                      
                        </div>
                        </div>
                        </div>
        
                    </Row>
                    </Col>

                    </Row>

                    <MUIDataTable className="table_holder"
  title={"Steps List"}
  data={steps}
  columns={columns}
  
/>
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
export default withStyles(useStyles)(ConsultationDetails);