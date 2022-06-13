import React,{useState} from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormData from "form-data";
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import MenuItem from '@material-ui/core/MenuItem';  
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col } from 'react-bootstrap';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ImageViewer from 'react-simple-image-viewer';
import 'react-calendar/dist/Calendar.css';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import LeftSide from './../Home/dashboard/LeftSide';
import DateFnsUtils from '@date-io/date-fns';
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import 'react-toastify/dist/ReactToastify.css';
import SweetAlert from 'react-bootstrap-sweetalert';
import ChipInput from 'material-ui-chip-input'
import {Link} from 'react-router-dom';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { API_URL } from '../../httpcommon';
import { DropzoneArea } from 'material-ui-dropzone';
const CreateEvent =  (props) =>{
const [fee, setFee] = useState("paid");
const [fee_error, setFee_error] = useState("");
const [eventType, setEventType] = useState("Laser Dentists");
const [tags, setTags] = useState([]);
const [tags_error, setTags_error] = useState("");
const [tag, setTag] = useState("");
const [entryfee, setEntryfee] = useState("");
const [prequest, setPrequest] = useState("");
const [prequesties, setPrequesties] = useState([]);
const [seatAvailable, setSeatAvailable] = useState("");
const [title, setTitle] = useState("");
const [description, setDescription] = useState("");
const [address, setAddress] = useState("");
const [latitude, setLatitude] = useState("");
const [longitude, setLongitude] = useState("");
const [requiredfield, setRequiredfield] = useState("");
const [success, setSuccess] = useState("");
const [Category, setCategory] = useState("seminar");
const [event_date, setEvent_date] = useState(new Date());
const [images,setImages] = useState([])
const [date, changeDate] = useState(new Date());
const [successalert, setSuccessalert] = useState(false)
const [files, setFiles] = useState([])

 const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [imagess, setImagess] = useState([
  ]);

  const openImageViewer = React.useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

const filehandleChange = (files) => {
    setFiles(files)
    console.log(files)
  }

const submithandle = () =>{
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
method: 'post',
url: API_URL +'/event/create',
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

const img_handle = (e) =>{
    let file = e.target.files[0]
    let reader = new FileReader();
    reader.readAsDataURL(file)
    reader.onload = () => {
      setImagess([...imagess, reader.result])
    };
    
    setImages([...images, e.target.files[0]])
}

// const removeInput = (task,) => {
//      let d = [...fileInput]
//     d.splice(index,1)
//     setfileInput(
//         d
//     )
// }

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

const { classes } = props;



return (
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

<Button type="submit" className="submit_button" onClick={()=>submithandle()} variant="contained" color="primary"  style={{ marginTop: 25, marginLeft:10, width:200, border:"none" }}>
        Submit Event
</Button>
</div>
</div>
</Container >
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
export default withStyles(useStyles)(CreateEvent);