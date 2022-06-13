import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import LeftSide from './../Home/dashboard/LeftSide'
import MUIDataTable from "mui-datatables";
import { SpinnerCircular } from 'spinners-react';
import MenuItem from '@material-ui/core/MenuItem';
import { Row, Col, Grid } from 'react-bootstrap';
import 'react-responsive-modal/styles.css';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Container from '@material-ui/core/Container';
import SweetAlert from 'react-bootstrap-sweetalert';    
import ReactClipboard from 'react-clipboardjs-copy'
import { API_URL } from '../../httpcommon'
const ServiceTypeList = (props) => {
    const[services, setServices] = React.useState(null)
    const [loading, setLoading] = React.useState(true)
    const [name, setName] = React.useState("");
    const [relateto, setRelateto] = React.useState("clinic");
    const [success, setSuccess] = React.useState("");
    const [successalert, setSuccessalert] = React.useState(false)
    const [required, setRequired] = React.useState("")
    const [deletealert, setDeletealert] = React.useState(false)
    const [deleteid, setDeleteid] = React.useState("");

    React.useEffect(() =>{
    fetchservicetypelist()
},[])

const fetchservicetypelist = () =>{
    fetch(API_URL +"/admin/types/service/list",{
        headers:{
          'Accept':'application/json',
          'Content-Type':'application/json'
        },
        
        method:"GET"
      })
      .then((res)=>res.json())
      .then((res)=>{
          setServices(res.data.map((row)=>(
              [row.label,row.type, <Button type="button" onClick={()=>deleteconfirm(row.id)} variant="contained" className="danger-btn" color="primary">Delete</Button>]
          )))
          console.log(res.data)
          setLoading(false)
      })
      .catch((error)=>{
          console.log(error)
      })
}

const typedelete = (id) => {
    fetch(API_URL + "/admin/service/deleteServiceType/" + id, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },

      method: "DELETE"
    })
      .then((res) => res.json())
      .then((res) => {

        if (res.status === true) {
          setDeletealert(false)
          setSuccessalert(true)
          fetchservicetypelist()
        }
      })
      .catch((error) => {
        alert('érror')
        console.log(error)
      })
  }


  const deleteconfirm = (id) => {
    setDeleteid(id);
    setDeletealert(true)
  };

//const columns = [ "Name", "Relatedto", "Action"];
 
const columns =  [
  {
  name: "Name",
  label: "Name",
  options: {
   filter: false,
   sort: true,
  }
 },

 {
  name: "Relatedto",
  label: "Relatedto",
  options: {
   filter: true,
   sort: true,
  }
 },

 {
  name: "Action",
  label: "Action",
  options: {
   filter: false,
   sort: false,
  }
 }
]

const data = [ 
      [ "Test Corp", "Yonkers", "NY"],
];
 
const options = {
      filterType: "checkbox",
      download:false,
        print: true,
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



const submithandle = () =>{
  if(name===""){
    setRequired("this field is required.")
  }
  else{
  fetch(API_URL +'/admin/typeof/service',{
      method:"POST",
      headers:{
          'Accept':'*/*',
          'Content-Type':'application/json',
          'Accept-Encoding':'gzip,deflate,br',
          'Connection':'keep-alive',
      },
      
      body:JSON.stringify({
          name:name,
          relateto:relateto,
      })
  })
  .then((res)=>res.json())
  .then((res)=>{
      if(res.status===true){
      setName("");
      setRelateto("")
      console.log(res)
      setSuccessalert(true)
      fetchservicetypelist()
  }
  else{
      alert(res.message)
      setName("");
      setRelateto("")
  }
  })
  .catch((error)=>{
      alert('error')
      console.log(error)
  })
}


}

const { classes } = props;
return (
  <LeftSide mainsection={ 
            <React.Fragment>

{deletealert === true ?
  <SweetAlert
    warning
    showCancel
    confirmBtnText="Yes, delete it!"
    confirmBtnBsStyle="danger"
    title="Are you sure?"
    onConfirm={() => typedelete(deleteid)}
    onCancel={() => setDeletealert(false)}
    focusCancelBtn
  >

    You will not be able to recover this data!
</SweetAlert>
  : null}

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


{loading===true ?
      <div style={{textAlign:"center", marginTop:150}}>
      <SpinnerCircular  enabled={loading} />
      </div>
      :null}
{loading===false ?
<Container style={{marginBottom:50}}>
                <div className="white-box">
        <Typography component="h1" variant="h5" className={classes.Typography}>
            Create Service Type

                <h4 style={{color:"green", fontWeight:"bold"}}>
                {success}
            </h4>
            </Typography>
                    
        <div style={{ margin: 10, alignSelf: "center", marginTop:-20 }}>
            <Row>
            <Col>
            <TextField id="outlined-basic" label="Name" value={name} onChange={(e)=>setName(e.target.value)} variant="outlined"  className={classes.TextField} />
            <p style={{color:"red", fontWeight:"bold", marginLeft:10, marginTop:-10}}>
            {
            name==="" ?
            required
            :null
            }
              </p>
            </Col>
            <Col>
            <FormControl className={classes.formControl} id="selectborder" >
        
            <Select labelId="demo-simple-select-label" id="demo-simple-select" value={relateto} onChange={(e)=>setRelateto(e.target.value)} className="select_box">
                <MenuItem value="clinic">clinic</MenuItem>
                <MenuItem value="practice">practice</MenuItem>
            </Select>
 
            </FormControl>
            </Col>
            </Row>                        
        <div style={{ margin: 10, alignSelf: "center", marginTop:-20, width: "20%" }}>
           <Button className="submit_button" type="submit" variant="contained"  color="primary" style={{ marginTop: 25, width:200}} onClick={()=>submithandle()}>
                Submit Service Type
          </Button>           
        </div>
    </div>
    </div>
</Container >
:null}


{loading===false && services?
<MUIDataTable className="table_holder"
  title={"Service Type List"}
  data={services}
  columns={columns}
   options={options}
/>
  :null}
    </React.Fragment>
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
export default withStyles(useStyles)(ServiceTypeList);