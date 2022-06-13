import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { Row, Col } from 'react-bootstrap';
import Select from '@material-ui/core/Select';
import 'react-calendar/dist/Calendar.css';
import Button from '@material-ui/core/Button';
import SweetAlert from 'react-bootstrap-sweetalert';
import LeftSide from './../Home/dashboard/LeftSide'
import { API_URL } from '../../httpcommon'

const CreateServiceType = (props) => {
    const [name, setName] = React.useState("");
    const [relateto, setRelateto] = React.useState("clinic");
    const [success, setSuccess] = React.useState("");
    const [successalert, setSuccessalert] = React.useState(false)

    const submithandle = () =>{
            fetch(API_URL + '/admin/typeof/service',{
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
                <div className="white-box">
        <Typography component="h1" variant="h5" className={classes.Typography}>
            Create Service Type
        </Typography>
                    
        <div style={{ margin: 10, alignSelf: "center" }}>
            <Row>
            <Col>
            <TextField id="outlined-basic" label="Name" value={name} onChange={(e)=>setName(e.target.value)} variant="outlined"  className={classes.TextField} />
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
        <div style={{ margin: 10, alignSelf: "center", width: "20%" }}>
           <Button className="submit_button" type="submit" variant="contained"  color="primary" style={{ marginTop: 25, width:200}} onClick={()=>submithandle()}>
                Submit Service Type
          </Button>           
        </div>
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
export default withStyles(useStyles)(CreateServiceType);


