import React,{useState,useEffect} from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormData from "form-data";
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col } from 'react-bootstrap';
import 'react-calendar/dist/Calendar.css';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';  
import axios from 'axios';
import LeftSide from './../Home/dashboard/LeftSide';
import ChipInput from 'material-ui-chip-input'
import SweetAlert from 'react-bootstrap-sweetalert';
import {Link} from 'react-router-dom';
import xtype from 'xtypejs'
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { API_URL } from '../../httpcommon'
    const EditConsultation = (props) =>{
    const [name, setName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [cc, setcc] = useState('');
    const [typeoff, setTypeoff] = useState('');
    const [experience, setExperience] = useState('');
    const [pincode, setPincode] = useState('');
    const [file, setFile] = useState('');
    const [updateid, setUpdateid] = useState('');
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [languages, setLanguages] = useState([]);
    const [description, setDescription] = useState('');
    const [requiredfields, setRequiredfields] = useState('')
    const [successalert, setSuccessalert] = useState(false)

    useEffect(()=>{
        fetchdetails();
    },[])
    


    const fetchdetails = () => {
        
        var data = JSON.parse(localStorage.getItem("consultationid"))
        var array_language = [];
        
        if(data.languages!=''){ 
        try{
        var jsonlanguage = JSON.parse(data.languages);
        jsonlanguage.map((row)=>(
            array_language.push('"'+row+'"')
        ))
        }
        catch{
            data.languages.map((row)=>(
                array_language.push('"'+row+'"')
            ))
        }
        }
    
        setName(data.name)
        setMobileNumber(data.mobile.value)
        setTypeoff(data.typeof)
        setExperience(data.experience)
        setPincode(data.pincode)
        setLat(data.location.coordinates[0])
        setLng(data.location.coordinates[1])
        setcc(data.mobile.code)
        setDescription(data.description)
        setUpdateid(data._id)
        setLanguages(array_language)
    }

    const submithandle = () =>{
        if(name!=="" && mobileNumber!=="" && cc!=="" && typeoff!=="" && experience!=="" && pincode!=="" && lat!=="" && lng!=="" && description!==""){
            var data = new FormData();
            data.append('name', name);
            data.append('mobileNumber', mobileNumber);
            data.append('cc', cc);
            data.append('typeof', typeoff);
            data.append('experience', experience);
            data.append('pincode', pincode);
            data.append('file', file);
            data.append('lat', lat);
            data.append('lng', lng);
            data.append('languages', '['+languages+']');
            data.append('description', description);
            
        
            var config = {  
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },             
              url: API_URL +'/admin/consultation/'+updateid,
              data: data
            };
        
            axios(config)
              .then(function (response) {
                console.log(JSON.stringify(response.data));
                setLat("")
                setLng("")
                setName("")
                setMobileNumber("")
                setcc("")
                setTypeoff("")
                setExperience("")
                setPincode("")
                setFile("")
                setLanguages("")
                setDescription("")
                props.history.push('/AllConsultationList')
                setSuccessalert(true)
              })
              .catch(function (error) {
                  alert(error)
                console.log(error);
              });
              
        }

        else{
           setRequiredfields("this field is required")
        }
    }
   

    const handleDeleteChip = (chipToDelete) =>{
        setLanguages((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
    }

    const handleAddChip = (chip) =>{
        setLanguages([...languages,'"'+chip+'"'])
        console.log(languages)
    }

        const { classes } = props;
        return (
        <LeftSide mainsection={
            <div>
        <Breadcrumbs style={{marginLeft:20}} maxItems={2}  aria-label="breadcrumb">
      <Link to="/AllConsultationList" style={{cursor:"pointer"}} color="inherit">
        Consultation List
      </Link>
      <Link color="inherit" style={{color:"gray", cursor:"none"}}>
      Consultation Update
      </Link>
        </Breadcrumbs> 
        <Container >
        {successalert===true ?
        <SweetAlert
        success
        title="Success Data!"
        timeout={2000}
        onConfirm={()=>setSuccessalert(false)}
        >
        This success message will automatically close after 2 seconds
        </SweetAlert>
        :null}
                <div className="white-box">
               <Typography style={{marginBottom:-15}} component="h1" variant="h5" className={classes.Typography}>
                    Update Consultation
                </Typography>
                <div style={{ margin: 10, alignSelf: "center"}}>          

                <Row>
                <Col>
                <TextField id="outlined-basic" name="name" label="Name" value={name} variant="outlined" onChange={(e)=>setName(e.target.value)} className={classes.TextField} />
                {name==="" ?
                <p style={{color:"red", fontWeight:"bold", marginLeft:10, marginTop:-8}}>{requiredfields}</p>
                :null}
                </Col>
                <Col>
                <TextField id="outlined-basic" name="mobileNumber" label="Mobile Number" value={mobileNumber} variant="outlined" onChange={(e)=>setMobileNumber(e.target.value)} className={classes.TextField} />
                {mobileNumber==="" ?
                <p style={{color:"red", fontWeight:"bold", marginLeft:10, marginTop:-8}}>{requiredfields}</p>
                :null}
                </Col>
                <Col>
                <TextField id="outlined-basic" name="cc" label="CC" value={cc} variant="outlined" onChange={(e)=>setcc(e.target.value)} className={classes.TextField} />
                {cc==="" ?
                <p style={{color:"red", fontWeight:"bold", marginLeft:10, marginTop:-8}}>{requiredfields}</p>
                :null}
                </Col>
                </Row>
                <Row>
                <Col>
                <FormControl className={classes.formControl} id="selectborder">
    
    <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={typeoff}
        onChange={(e)=>setTypeoff(e.target.value)}
        className="select_box"
        style={{borderWidth:1, width:"100%", borderColor:"black"}}
    >
        <MenuItem value="Oral and Maxillofacial Surgeon">Oral and Maxillofacial Surgeon</MenuItem>
        <MenuItem value="Periodontist">Periodontist</MenuItem>
        <MenuItem value="Paedodontist">Paedodontist</MenuItem>
        <MenuItem value="Oral Pathologist">Oral Pathologist</MenuItem>
        <MenuItem value="Orthodontist">Orthodontist</MenuItem>
        <MenuItem value="Prosthodontist">Prosthodontist</MenuItem>
        <MenuItem value="Endodontist">Endodontist</MenuItem>
        <MenuItem value="Oral Medicine & Radiologist">Oral Medicine & Radiologist</MenuItem>
        <MenuItem value="Oral Oncologist">Oral Oncologist</MenuItem>
        <MenuItem value="Smile Designers">Smile Designers</MenuItem>
        <MenuItem value="Implantologist">Implantologist</MenuItem>
        <MenuItem value="Clinical Cosmetologist">Clinical Cosmetologist</MenuItem>
        <MenuItem value="Facial Plastic Surgeons">Facial Plastic Surgeons</MenuItem>
        <MenuItem value="Emergency Medicines">Emergency Medicines</MenuItem>
        v<MenuItem value="Laser Dentists">Laser Dentists</MenuItem>
    </Select>
</FormControl>
                {typeoff==="" ?
                <p style={{color:"red", fontWeight:"bold", marginLeft:10, marginTop:-8}}>{requiredfields}</p>
                :null}
                </Col>
                <Col>
                    <TextField id="outlined-basic" name="experience" label="Experience" value={experience} variant="outlined" onChange={(e)=>setExperience(e.target.value)} className={classes.TextField} />
                    {experience==="" ?
                <p style={{color:"red", fontWeight:"bold", marginLeft:10, marginTop:-8}}>{requiredfields}</p>
                :null}
                </Col>
                <Col>
                <TextField id="outlined-basic" name="pincode" label="PinCode" value={pincode} variant="outlined" onChange={(e)=>setPincode(e.target.value)} className={classes.TextField} />
                {pincode==="" ?
                <p style={{color:"red", fontWeight:"bold", marginLeft:10, marginTop:-8}}>{requiredfields}</p>
                :null}
                </Col>
                </Row>
                <Row>
                
                <Col>
                    <TextField id="outlined-basic" name="lat" label="Latitude" value={lat} variant="outlined" onChange={(e)=>setLat(e.target.value)} className={classes.TextField} />
                    {lat==="" ?
                <p style={{color:"red", fontWeight:"bold", marginLeft:10, marginTop:-8}}>{requiredfields}</p>
                :null}
                </Col>
                <Col>
                <TextField id="outlined-basic" name="lng" label="Longitude" value={lng} variant="outlined" onChange={(e)=>setLng(e.target.value)} className={classes.TextField} />
                {lng==="" ?
                <p style={{color:"red", fontWeight:"bold", marginLeft:10, marginTop:-8}}>{requiredfields}</p>
                :null}
                </Col>

                <Col>
                <input type="file" onChange={(event)=>setFile(event.target.files[0])} id="outlined-basic" name="file" label="File Upload"  variant="outlined" className={classes.TextField} />
                {file==="" ?
                <p style={{color:"red", fontWeight:"bold", marginLeft:10, marginTop:-8}}>{requiredfields}</p>
                :null}
                </Col>
                </Row>

                <Row>
                    <Col>
                    <ChipInput
                    value={languages}
                    onAdd={(chip) => handleAddChip(chip)}
                    onDelete={(chipdaa) => handleDeleteChip(chipdaa)}
                    placeholder="Languages it's tags data"
                    style={{marginTop:20, marginLeft:10}}
                    />
                    
                    </Col>
                </Row>
                <Row>
                <Col>
                <TextField id="outlined-basic" name="Description" label="Description" value={description} variant="outlined" onChange={(e)=>setDescription(e.target.value)} className={classes.TextField} />
                </Col>
                </Row>
                
                  
                    <Button className="submit_button" type="submit" onClick={()=>submithandle()} variant="contained" color="primary"  style={{ marginTop: 25, marginLeft:10, width:200 }}>
                           Submit Consulation
                    </Button>
                </div>
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
export default withStyles(useStyles)(EditConsultation);