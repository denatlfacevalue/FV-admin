import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import AuthContext from './AuthContext';
import jwt from 'jsonwebtoken';
const Signin = (props) => {
    const { Login } = React.useContext(AuthContext._currentValue);

    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const onSubmitClick = () => {
        if (username === 'admin' && password === 'admin') {
            var token = jwt.sign({ token_password: 'FACEVAL_RESILIENCE', exp: Math.floor(Date.now() / 1000) + (60 * 60) }, 'FACEVAL_RESILIENCE');
            localStorage.setItem('token', token)
            Login();
            props.history.push('/')
        }
        else {
            alert('Username or Password is invalid')
        }
    }

    React.useEffect(() => {

    }, [])


    return (
        <div style={{ paddingTop: 100, backgroundColor: "white", height: "100vh" }}>
            <Container component="main" maxWidth="xs">
                <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                    <Typography component="h1" variant="h5">
                        Sign in
                 </Typography>
                    <div style={{ width: '100%' }}>
                        <TextField variant="outlined" margin="normal" required fullWidthid="email" label="Email Address" name="email" autoFocus value={username}
                            onChange={(e) => setUsername(e.target.value)}

                        />
                        <TextField variant="outlined" margin="normal" required fullWidthname="password" label="Password" type="password"
                            id="password" autoComplete="current-password" onChange={(e) => setPassword(e.target.value)} value={password}

                        />

                        <Button type="submit" variant="contained" color="primary" style={{ marginTop: 25, }} onClick={() => onSubmitClick()}>
                            Sign In
          </Button>
                    </div>
                </div>

            </Container>
        </div>
    );
}
export default Signin