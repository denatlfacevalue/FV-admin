import React,{useState,useEffect} from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem'; 
import FormData from "form-data"
import ChipInput from 'material-ui-chip-input'
import axios from 'axios';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import DateFnsUtils from '@date-io/date-fns';
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import 'react-toastify/dist/ReactToastify.css';
import SweetAlert from 'react-bootstrap-sweetalert';
import Calendar from 'react-calendar'
import {Link} from 'react-router-dom';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import 'react-calendar/dist/Calendar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col } from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import {  map } from "lodash";
import { API_URL } from '../../httpcommon'
import { DropzoneArea } from 'material-ui-dropzone';
import LeftSide from './../Home/dashboard/LeftSide';
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

const EditEvent =  (props) =>{
    const [fee, setFee] = useState("paid");
    const [fee_error, setFee_error] = useState("");
    const [eventType, setEventType] = useState("Orthodontist");
    const [tags, setTags] = useState(["dental","dental","oral Pathology"]);
    const [tag, setTag] = useState("tag");
    const [entryfee, setEntryfee] = useState("30000");
    const [prequest, setPrequest] = useState("prequest");
    const [prequesties, setPrequesties] = useState(["To remove all files from a directory","first you need to list all files in the directory using","concat with the directory name to get the full path"]);
    const [seatAvailable, setSeatAvailable] = useState("5");
    const [title, setTitle] = useState("titlte");
    const [description, setDescription] = useState("Lorem ipsum dolor sit amet, dictumst est, scelerisque adipiscing consequat et, vel sollicitudin velit sit convallis molestie auctor, dui nullam consequuntur ullamcorper maecenas eu. Tempus fringilla, lorem ac amet sem vulputate massa, nam augue praesent fermentum adipiscing elementum aenean. Posuere eum turpis ornare justo justo morbi, elementum in sit mattis et eros. Arcu elit iaculis non sem sit erat, sodales massa sed suspendisse urna porta tempor. Ultricies eros imperdiet risus, nec eu, vel magna arcu integer duis augue, interdum convallis non. Nonummy sit, turpis tortor lacus maecenas vivamus elementum, urna euismod aptent consequat. Aliquam magna lorem dignissim massa, vel neque eu est aliquam pede enim, dolor nec quis malesuada. Tempus lacus nullam, nec eu amet lectus et eros eget, lectus orci voluptate dolor augue fermentum vel, incididunt scelerisque fermentum suspendisse sagittis sit magna");
    const [address, setAddress] = useState("Banglore resident ");
    const [latitude, setLatitude] = useState("11.258753");
    const [longitude, setLongitude] = useState("75.780411");
    const [requiredfield, setRequiredfield] = useState("ljsld");
    const [success, setSuccess] = useState("");
    const [Category, setCategory] = useState("seminar");
    const [event_date, setEvent_date] = useState("2019-12-26T09:52:43.733Z");
    const [attendees, setAttendees] = React.useState([])
    const [successalert, setSuccessalert] = useState(false)
    const [updateid, setUpdateid] = useState("")
    const [files, setFiles] = useState([])

    useEffect(()=>{
    
         fetchforUpdate()
    },[])
    const array_tags = []
    const array_pre = []

    const fetchforUpdate = () =>{
        const id = localStorage.getItem('eventid');
        fetch(API_URL + "/admin/event/"+id,{
            headers:{
              'Accept':'application/json',
              'Content-Type':'application/json'
            },
            method:"GET"
          })
          
          .then((res)=>res.json())
           .then((res)=>{
             res.data.tags.map((row)=>(
                 array_tags.push('"'+row+'"')
             ))
              res.data.prequisites.map((row)=>(
                 array_pre.push('"'+row+'"')
             ))
            setTags(array_tags)
            setFiles(res.data.images)
            setPrequesties(array_pre)
            setEntryfee(res.data.entryfee)
            setFee(res.data.fee)
            setCategory(res.data.Category)
            setEventType(res.data.event_type)
            setAttendees(res.data.attendees)
            setTitle(res.data.title)
            setAddress(res.data.address)
            setDescription(res.data.description)
            setSeatAvailable(res.data.seatAvailable)
            setEvent_date(res.data.event_date)
            setLatitude(res.data.location.coordinates[0])
            setLongitude(res.data.location.coordinates[1])
            setUpdateid(id)
           })
           .then((error)=>{
             console.log(error)
           })
    }

const UpdateEvent = () =>{
if(title!='' &&  description!='' && address!='' && entryfee!='' && seatAvailable!='' && latitude!='' && longitude!='' && tags!=''){
var data = new FormData();
data.append('title', title);
if(files){
files.map((row)=>{
data.append('images', row);
})
}
data.append('tags', '['+tags+']');
data.append('address', address);
data.append('description', description);
data.append('prequisites', '['+prequesties+']');
data.append('seatAvailable', seatAvailable);
data.append('entryfee', entryfee);
data.append('event_date', event_date);
data.append('fee', fee);
data.append('Category', Category);
data.append('event_type', eventType);
data.append('lat', latitude);
data.append('lng', longitude);

var config = {
method: 'PUT',
url: API_URL +'/admin/event/'+updateid,
data: data
};

axios(config)
.then(function (response) {
console.log(JSON.stringify(response.data));
setLatitude("")
setLongitude("")
setTags("")
setPrequesties("")
setEntryfee("")
setFee("")
setCategory("")
setTitle("")
setAddress("")
setDescription("")
setSeatAvailable("")
setEventType("")
setEvent_date("")
setSuccessalert(true)
setRequiredfield('')
setTimeout(
function() {
    props.history.push('/EventList')
}
.bind(this),
2000
);
})
.catch(function (error) {
console.log(error);
});

}

else{
setFee_error("red")
setRequiredfield('this field is required!')
}
}


const handleDeleteChip = (chipToDelete) =>{
setTags((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
}

const handleAddChip = (chip) =>{
setTags([...tags,'"'+chip+'"'])
console.log(tags)
}

const handleDeleteChip2 = (chipToDelete2) =>{
setPrequesties((chips2) => chips2.filter((chip2) => chip2.key !== chipToDelete2.key));
}

const handleAddChip2 = (chip2) =>{
setPrequesties([...prequesties,'"'+chip2+'"'])
    console.log(prequesties)
}

const filehandleChange = (files) => {
    setFiles(files)
    console.log(files)
  }

        const { classes } = props;
        return (
    <div>
<LeftSide mainsection={    
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
{console.log(tags)}
<Breadcrumbs maxItems={2}  aria-label="breadcrumb">
<Link to="/EventList" color="inherit">
Event List
</Link>
<Link color="inherit" style={{color:"gray", cursor:"none"}}>
Create Event
</Link>
</Breadcrumbs> 
<div className="white-box">
<Typography component="h1" variant="h5" style={{marginBottom:-10}} className={classes.Typography}>
CreateEvent
</Typography>
<div style={{ margin: 10, alignSelf: "center" }}>          
<TextField id="outlined-basic" label="Title" value={title} onChange={(e)=>setTitle(e.target.value)} variant="outlined"  className={classes.TextField} />
{title==='' ?
<p style={{color:"red", marginLeft:10, fontWeight:"bold", marginTop:-5}}>{requiredfield}</p>
:null}
<TextField id="outlined-basic" name="description" label="Description" value={description} variant="outlined" onChange={(e)=>setDescription(e.target.value)} className={classes.TextField} multiline rows={3} />
{description==='' ?
<p style={{color:"red", marginLeft:10, fontWeight:"bold", marginTop:-5}}>{requiredfield}</p>
:null}
<Row style={{flexDirection:"row"}}>
<Col>
<TextField id="outlined-basic" type="number" name="seatAvailable" label="Seat Available" value={seatAvailable} variant="outlined" onChange={(e)=>setSeatAvailable (e.target.value)} className={classes.TextField} />
{seatAvailable==='' ?
<p style={{color:"red", marginLeft:10, fontWeight:"bold", marginTop:-5}}>{requiredfield}</p>
:null}
</Col>
<Col>
<TextField id="outlined-basic" type="number" name="entryfee" label="Entry Fee" value={entryfee} variant="outlined" onChange={(e)=>setEntryfee(e.target.value)} className={classes.TextField} />
{entryfee==='' ?
<p style={{color:"red", marginLeft:10, fontWeight:"bold", marginTop:-5}}>{requiredfield}</p>
:null}
</Col>
</Row>
<TextField id="outlined-basic" name="address" label="Address" value={address} variant="outlined" onChange={(e)=>setAddress(e.target.value)} className={classes.TextField} multiline rows={2} />
{address==='' ?
<p style={{color:"red", marginLeft:10, fontWeight:"bold", marginTop:-5}}>{requiredfield}</p>
:null}
<Row>
<Col>
<TextField id="outlined-basic" type="number" name="latitude" label="Latitude" value={latitude} variant="outlined" onChange={(e)=>setLatitude(e.target.value)} className={classes.TextField} />
{latitude==='' ?
<p style={{color:"red", marginLeft:10, fontWeight:"bold", marginTop:-5}}>{requiredfield}</p>
:null}
</Col>
<Col>
<TextField id="outlined-basic" type="number" name="longitude" label="Longitude" value={longitude} variant="outlined" onChange={(e)=>setLongitude(e.target.value)} className={classes.TextField} />
{longitude==='' ?
<p style={{color:"red", marginLeft:10, fontWeight:"bold", marginTop:-5}}>{requiredfield}</p>
:null}
</Col>
</Row>
<Row style={{flexDirection:"row"}}>
<Col sm="4" md="4">
    <FormControl className={classes.formControl} id="selectborder">
    
    <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={fee}
        onChange={(e)=>setFee(e.target.value)}  
        className="select_box"
        label="Fee"
        >
        <MenuItem value="paid">Paid</MenuItem>
        <MenuItem value="free">Free</MenuItem>
    </Select>
    
</FormControl>
</Col>
<Col sm="4" md="4">
<FormControl className={classes.formControl} id="selectborder">
    
    <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={Category}
        onChange={(e)=>setCategory(e.target.value)}
        className="select_box"
    >
        <MenuItem value="seminar">seminar</MenuItem>
        <MenuItem value="symposium">symposium</MenuItem>
        <MenuItem value="conferences">conferences</MenuItem>
        <MenuItem value="webinars">webinars</MenuItem>
    </Select>
</FormControl>
</Col>
<Col sm="4" md="4">
<FormControl className={classes.formControl} id="selectborder">
    
    <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={eventType}
        onChange={(e)=>setEventType(e.target.value)}
        className="select_box"
        style={{borderWidth:1 , borderColor:"black"}}
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
</Col>
</Row>
<Row>
<Col>

<ChipInput
value={tags}
onAdd={(chip) => handleAddChip(chip)}
onDelete={(chipdaa) => handleDeleteChip(chipdaa)}
placeholder="Tags"
style={{marginTop:20, marginLeft:10, marginBottom:15}}
/>

{tags==='' ?
<p style={{color:"red", marginLeft:10, fontWeight:"bold", marginTop:-5}}>{requiredfield}</p>
:null}
</Col>
<Col>
<ChipInput
value={prequesties}
onAdd={(chip2) => handleAddChip2(chip2)}
onDelete={(chipdaa2) => handleDeleteChip2(chipdaa2)}
placeholder="prequesties"
style={{marginTop:20, marginLeft:10, marginBottom:15}}
/>
    {prequesties==='' ?
<p style={{color:"red", marginLeft:10, fontWeight:"bold", marginTop:-5}}>{requiredfield}</p>
:null}
</Col>
</Row>
<Row style={{marginLeft:10, marginTop:20}}>
    <Col>
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <DateTimePicker autoOk format="MM-dd-yyyy hh:mm a" disablePast ampm={false} value={event_date} onChange={setEvent_date} />
    </MuiPickersUtilsProvider>
    </Col>
</Row>

<Row>
   
     <Col >
     <DropzoneArea
                   open="true"
                    onChange={filehandleChange}
                    acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                    maxFileSize={5000000}
                />
    </Col>
</Row>

<Button type="submit" className="submit_button" onClick={()=>UpdateEvent()} variant="contained" color="primary"  style={{ marginTop: 25, marginLeft:10, width:200, border:"none" }}>
        Submit Event
</Button>
</div>
</div>
</Container >
} />
</div>
);}
export default withStyles(useStyles)(EditEvent);