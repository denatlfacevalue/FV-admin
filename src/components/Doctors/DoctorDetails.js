import React,{useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Row, Col } from 'react-bootstrap';
import ReactClipboard from 'react-clipboardjs-copy'
import Moment from 'react-moment';
import LeftSide from './../Home/dashboard/LeftSide'
import Container from '@material-ui/core/Container';
import MUIDataTable from "mui-datatables";
import {Link} from 'react-router-dom';
import { Card } from 'antd';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { API_URL } from '../../httpcommon'
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

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));



const DoctorDetails =  (props) => {
    const [userName, setUserName] = useState("");
    const [gender, setGender] = useState("");
    const [dob, setDob] = useState("");
    const [location_id, setlocation_id] = useState("");
    const [lat, setLat] = useState("");
    const [lng, setLng] = useState("");
    const [address, setAddress] = useState("");
    const [verificationEmail, setVerificationEmail] = useState("");
    const [verificationPhone, setVerificationPhone] = useState("");
    const [role, setRole] = useState("");
    const [clinics, setClinics] = useState([]);
    const [associates, setAssociates] = useState([]);
    const [userDetailCompleted, setUserDetailCompleted] = useState("");
    const [professionalDetailAdded, setProfessionalDetailAdded] = useState("");
    const [registrationCompleted, setRegistrationCompleted] = useState("");
    const [isDeleted, setIsDeleted] = useState("");
    const [createdDate, setCreatedDate] = useState("");

    const [bdsdocUrl, setbdsdocUrl] = useState("");
    const [resident, setResident] = useState([]);
    const [partner, setPartner] = useState("");
    const [consultant, setConsultant] = useState("");
    const [wallet_balance, setWallet_balance] = useState("");
    const [freeTickets, setFreeTickets] = useState("");
    const [_id, set_id] = useState("");
    const [phoneNumbers, setphoneNumbers]  = useState([]);
    const [assistants, setAssistants] = useState([]);
    const [academics, setAcademics] = useState([]);
    const [academicslist, setAcademicslist] = useState([]);
    const [thesis, setThesis] = useState([]);
    const [thesislist, setThesislist] = useState([]);
    const [emails, setEmails] = useState([]);
    const [qualification, setQualification] = useState([]);
    const [profileUrl, setProfileUrl] = useState();
    const [__v, set__v] = useState("");
    const [mdsdocurl, setMdsdocUrl] = useState("");
    const [user_token, setUser_token] = useState("");

    useEffect(()=>{
        fetchdoctordetails();
        fetchclinics()
    },[])


    const fetchassociation  = (token) =>{

      fetch(API_URL +"/profile/get/associates",{
          headers:{
              'x-access-token': token
          },
          method:"GET"
      })
      .then((res) => { res.json().then((result)=>{
        console.log('association')
        console.log(result)
          if(result.status){
            setAssociates(result.data.map((row)=>(
            [<ReactClipboard text={row._id}
              onSuccess={(e) => console.log(e)}
              onError={(e) => console.log(e)}>
              <button title="Click To Copy" style={{border:"none"}}>{row.hospitalId._id}</button>
          </ReactClipboard>,
          row.hospitalId.name,
          row.owneredBy.user.userName,
          row.hospitalId.location.address,
          row.role,
          <span>
          {row.verified!==true ?
              <span style={{color:"green"}}>true</span>
              :
              <span style={{color:"red"}}>false</span>
          }
          </span>, 
        
              row.hospitalId.yearofEst
              , <Moment format="HH:MM:SS, DD:MM:YYYY">{row.created_at}</Moment>
            ]
            )))
          }else{
            setAssociates(null)
          }
          
      })
    })  
    }




    const fetchclinics  = (token) =>{
      fetch(API_URL +"/user/get/clinics",{
          headers:{
              'x-access-token': token
          },
          method:"GET"
      })
      .then((res)=>res.json())
      .then((res) => {
      
        if(res.status){
            setClinics(res.data.map((row)=>(
            [<ReactClipboard text={row._id}
              onSuccess={(e) => console.log(e)}
              onError={(e) => console.log(e)}>
              <button title="Click To Copy" style={{border:"none"}}>{row._id}</button>
          </ReactClipboard>,
          row.name,
          row.verifiedAt,
          row.yearofEst
          , 
        
              row.creatorId
              , 
              row.location.address
            ]
            )))
          }else{
            setClinics(null)
          }
      })
      .catch(error=>{
       
      })
    }


    const fetchdoctordetails = () =>{
        const id = localStorage.getItem('doctorid');
  
        if(id===null){
            props.history.push('/DoctorList');
        }
        else{
        fetch(API_URL +"/admin/users/"+id,{
            headers:{
              'Accept':'application/json',
              'Content-Type':'application/json'
            },
            method:"GET"
          })
          .then((res)=>res.json())
           .then((res)=>{
             if(res.data!==null){
             if(res.data.user!==undefined){
             setUserName(res.data.user.userName);
             setGender(res.data.user.gender);
             setDob(res.data.user.dob);
             setlocation_id(res.data.user.location._id);
             setLat(res.data.user.location.lat);
             setLng(res.data.user.location.long);
             setAddress(res.data.user.location.address);
             }
             
             setVerificationEmail(res.data.verificationStatus.email);
             setVerificationPhone(res.data.verificationStatus.phone);
             setRole(res.data.role);
             
             setUserDetailCompleted(res.data.userDetailCompleted);
             setProfessionalDetailAdded(res.data.professionalDetailAdded);
             setRegistrationCompleted(res.data.registrationCompleted);
             setIsDeleted(res.data.isDeleted);
             setCreatedDate(res.data.createdDate);
             setbdsdocUrl(res.data.bdsdocUrl);
             setResident(res.data.resident);
             setPartner(res.data.partner);
             setConsultant(res.data.consultant);
             setWallet_balance(res.data.wallet_balance);
             setFreeTickets(res.data.freeTickets);
             set_id(res.data._id);
             setphoneNumbers(res.data.phoneNumbers)
             setAssistants(res.data.assistants)
             setAcademics(res.data.academics)
             setThesis(res.data.thesis)
             setEmails(res.data.emails)
             setQualification(res.data.qualifications)
             set__v(res.data.__v);
             fetchqualification(res.data.qualifications)
             fetchacademic(res.data.academics)
             fetchthesis(res.data.thesis)
             setProfileUrl(res.data.profileUrl)
             setMdsdocUrl(res.data.mdsdocUrl)
             fetchassociation(res.data.token)
             fetchclinics(res.data.token)
             
             }
           })
           .then((error)=>{
             console.log(error)
           })
        }
    }

  const fetchqualification = (data) =>{
    setQualification(data.map((row)=>(
      [row._id,row.type, row.yearOfPassing, row.institute, row.registrationNumber]
    )))
  }

  // const fetchconsultant = (data) =>{
  //   setConsultant()
  // }

  const fetchacademic = (data) =>{
    setAcademics(data.map((row)=>(
      [row._id,row.yearOfExperience, row.institute, row.designation
  ]
    )))
  }

  const fetchthesis = (data) =>{
    setThesis(data.map((row)=>(
      [row._id,row.name,row.duration
      ]
    )))
  }

 

  const fetchasistants = (data) =>{
    setAssistants()
  }

  const classes = useStyles();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const qualificationcolumns = [ "Id", "Type","yearofPassing","institute", "registrationNumber"];
//   const consultantcolumns = [ "Id", "UserName"];
  const thesiscolumns = [ "Id", "Name", "Duration"];
  const academiccolumns = [ "Id", "yearOfExperience", "institute", "Designation"];
   const associationcolumns = [ "Id", "Name", "OwnerName", "Location", "Role", "Verified", "YearofEast", "Created At"];
 //  const cliniccolumns = [ "Id", "Name", "Verified", "YearofEast", "CreatorId", "Address"];


const cliniccolumns = [
  {
  name: "Id",
  label: "Id",
  options: {
   filter: false,
   sort: true,
  }
 },

 {
  name: "Name",
  label: "Name",
  options: {
   filter: false,
   sort: true,
  }
 },

 {
  name: "Verified",
  label: "Verified",
  options: {
   filter: false,
   sort: true,
  }
 },

 {
  name: "yearofEst",
  label: "yearofEst",
  options: {
   filter: true,
   sort: true,
  }
 },


 {
  name: "CreatorId",
  label: "CreatorId",
  options: {
   filter: false,
   sort: true,
  }
 },


 {
  name: "Address",
  label: "Address",
  options: {
   filter: false,
   sort: true,
  }
 },

 
]
 
  const clinicoptions = {
      filterType: "checkbox",
        print: true,
        download:false,
        viewColumns: true,
        selectableRows: 'none',
        onRowClick: (rowData) => {
            console.log("RowClicked->", rowData);
        },
        responsive: "stacked",
        fixedHeaderOptions: {
            xAxis: true,
            yAxis: true,
        },
  };

const options = {
  filter:false,
  download:false
}


  return (
    <LeftSide mainsection={
      <div>
        <Breadcrumbs maxItems={2}  aria-label="breadcrumb">
      <Link to="/DoctorList" color="inherit">
        Doctor List
      </Link>
      <Link color="inherit" style={{color:"gray", cursor:"none"}}>
        Doctor Details
      </Link>
</Breadcrumbs> 
    <div className={classes.root}>
      
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="off"
          aria-label="scrollable prevent tabs example"
        >
          <Tab icon="User" aria-label="phone" {...a11yProps(0)} />
          {/* <Tab icon="Consultants" aria-label="favorite" {...a11yProps(1)} /> */}
          <Tab icon="Academic" aria-label="person" {...a11yProps(1)} />
          <Tab icon="Thesis" aria-label="help" {...a11yProps(2)} />
          <Tab icon="Qualification" aria-label="shopping" {...a11yProps(3)} />
          <Tab icon="Clinics" aria-label="up" {...a11yProps(4)} />
          <Tab icon="Associations" aria-label="down" {...a11yProps(5)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
      <Row style={{marginTop:10}}>
        <Col sm={7}>
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
                    <b> UserName </b>
                    <p> {userName!==undefined ? userName :null} </p>
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
                    <b> DateofBirth </b>
                    <p> <Moment format="DD:MM:YYYY">{dob}</Moment> </p>
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
                    <b> Role </b>
                    <p> {role} </p>
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
                    <b> Resident </b>
                    <p> {resident.map((row) => {
                                    return row + ", "
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
                    <b> verificationEmail </b>
                     {verificationEmail===true ? <p>Verified </p> : <p> Not Verified</p> } 
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
                    <b> verificationPhone </b>
                    <p>   {verificationPhone===true ? <p>Verified </p> : <p> Not Verified</p> }  </p>
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
                    <b> RegisterationCompleted </b>
                     {registrationCompleted===true ? <p> Completed </p> : <p> Not Completed</p> } 
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
                    <b> isDeleted </b>
                    <p>   {isDeleted===true ? <p>true </p> : <p> false</p> }  </p>
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
                    <b> professionalDetailAdded </b>
                     {professionalDetailAdded===true ? <p> true </p> : <p> false</p> } 
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
                    <b> userDetailCompleted </b>
                    <p>   {userDetailCompleted===true ? <p>true </p> : <p> false</p> }  </p>
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
                    <b> FreeTickets </b>
                    <p> {freeTickets} </p>
                </div>
              
                </div>
                </div>
                </div> */}


                <div className="col-sm-6">
                <div className="details_item">
                <div className="row">
                <div className="col-xl-2 col-md-3 col-sm-3 col-3">
                <i class="fa fa-check-circle-o details_icon" aria-hidden="true"></i>
                </div>
                <div className="col-xl-10 col-md-9 col-sm-9 col-9">
                    <b> Wallet Balance </b>
                    <p> Rs. {wallet_balance} </p>
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
                    <b> CreatedDate </b>
                    <p> <Moment format="HH:MM:SS, DD:MM:YYYY">{createdDate}</Moment>  </p>
                </div>
              
                </div>
                </div>
                </div>
                </Row>
                <Row style={{marginTop:10}}></Row>
</Col>

<Col sm={5}>
  <img src={profileUrl} style={{width:"100%", borderRadius:5}} />
  </Col>
            </Row>
      </TabPanel>
      {/* <TabPanel value={value} index={1}>
       <MUIDataTable className="table_holder"
  title={"Consultant List"}
  data={consultant}
  columns={consultantcolumns}
/> 
      </TabPanel> */}
      <TabPanel value={value} index={1}>
      <MUIDataTable className="table_holder"
  title={"Academic List"}
  data={academics}
  columns={academiccolumns}
  options={options}
/>
      </TabPanel>
      <TabPanel value={value} index={2}>
      <MUIDataTable className="table_holder"
      title={"Thesis List"}
      data={thesis}
      columns={thesiscolumns}
      options={options}
      />
      </TabPanel>
      <TabPanel value={value} index={3}>
      <MUIDataTable className="table_holder"
  title={"Qualification List"}
  options={options}
  data={qualification}
  columns={qualificationcolumns}
/>

<Container>
  <Row>
    <Col sm={6}>
    <Card title="BDS Doc" bordered={false} style={{ width: "100%", textAlign:"center", padding:8, background:"#e6e6e6" }}>
      </Card>
      <img src={bdsdocUrl} style={{width:"100%", borderRadius:5}} />
      
      </Col>

      <Col sm={6}>
      <Card title="MDS Doc" bordered={false} style={{ width: "100%", textAlign:"center", padding:8, background:"#e6e6e6" }}>
      </Card>
      <img src={mdsdocurl} style={{width:"100%", borderRadius:5}} />
      
      </Col>
    </Row>
  </Container>
      </TabPanel>
      <TabPanel value={value} index={4}>
      <MUIDataTable className="table_holder"
  title={"Clinics List"}
  data={clinics}
  columns={cliniccolumns}
  options={clinicoptions}
/>
      </TabPanel>
      <TabPanel value={value} index={5}>
      <MUIDataTable className="table_holder"
  title={"Associates List"}
  data={associates}
  options={options}
  columns={associationcolumns}
/>
      </TabPanel>
    </div>
    </div>
    }
    />
  );
}

export default DoctorDetails