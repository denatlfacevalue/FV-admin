import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';





export default class SignupComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
        this.onSubmitClick = this.onSubmitClick.bind(this);
        this.emailFieldChange = this.emailFieldChange.bind(this);
        this.passkeyFieldChange = this.passkeyFieldChange.bind(this);

    }
    emailFieldChange = (passKey) => {


        this.setState({ username: passKey.target.value })
    }
    passkeyFieldChange = (passKey) => {
        this.setState({ password: passKey.target.value })
    }
    onSubmitClick(e) {
        if (this.state.username === "arun@fv.com" && this.state.password === "pass") {
            this.props.history.push("/home")
        } else {
            alert("Enter correct username and password")
        }
    }
    render() {
        return (
            <div style={{ marginTop: 100 }}>
                <Container component="main" maxWidth="xs">
                    <div style={{
                        marginTop: 10,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>

                        <Typography component="h1" variant="h5">
                            Sign in
        </Typography>
                        <form style={{
                            width: '100%', // Fix IE 11 issue.
                            marginTop: 1,
                        }} noValidate>
                            <TextField variant="outlined" margin="normal" required fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoFocus
                                value={this.state.username}
                                onChange={this.emailFieldChange}

                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={this.passkeyFieldChange}
                                value={this.state.password}

                            />

                            <Button type="submit"
                                variant="contained"
                                color="primary"
                                style={{
                                    marginTop: 25,
                                }}
                                onClick={this.onSubmitClick}
                            >
                                Sign In
          </Button>
                        </form>
                    </div>

                </Container>
            </div>
        );
    }
}