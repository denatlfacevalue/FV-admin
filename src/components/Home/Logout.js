import React from 'react';
import Typography from '@material-ui/core/Typography';
import AuthContext from './../Signup/AuthContext';
import {Link} from 'react-router-dom'
const Logout = () =>{
    const {LogoutSubmit} = React.useContext(AuthContext._currentValue)    
    
    return(
        <div>
        <Typography component="h1" variant="h6" onClick={()=>LogoutSubmit()} color="inherit" style={{cursor:"pointer"}} noWrap>
             <Link to="/Signin" style={{color:"white", textDecoration:"none"}}> Logout </Link>
        </Typography>
        </div>
    )
}

export default Logout;