import React, { useState } from 'react'
import { Card,  Button, Grid, TextField } from '@mui/material';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../services/firestore';

const Form = () => {

    const [loginEmail, setLoginEmail] = useState("")
    const [loginPassword, setLoginPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
        }
        catch (error) {
            console.log(error.message)
        }
        console.log('successful login')
    }

    return (
        <Card className='player-box' sx={{ maxwidth: '20vw' }} style={{ backgroundColor: 'grey' }}>
            <h4 className='player-heading'>Login</h4>
            <hr />
            <br />
            <form id="player-login-form" onSubmit={handleSubmit}>
                <Grid container alignItems={"center"} justifyContent="center" direction={"column"}>
                    <Grid item>
                        <TextField id="login-id"
                            onChange={(event) => {
                                setLoginEmail(event.target.value)
                            }}
                            type="email"
                            label="E-Mail"
                            variant='outlined'
                            size="small"
                            sx={{ maxwidth: '10vw' }}
                            style={{ backgroundColor: "#FFFFFF", margin: "5%", alignSelf: 'center' }} />
                    </Grid>
                    <Grid item>
                        <TextField id="login-password"
                            onChange={(event) => {
                                setLoginPassword(event.target.value)
                            }}
                            type={"password"}
                            label="Password"
                            variant='outlined'
                            size="small"
                            sx={{ maxwidth: '10vw' }}
                            style={{ backgroundColor: "#FFFFFF", margin: "5%", alignSelf: 'center' }} />
                    </Grid>
                    <Button id="login"
                        type="submit"
                        size="small"
                        sx={{ maxwidth: '10vw' }} variant="contained">
                        Submit
                    </Button>
                </Grid>
            </form>

        </Card>
    );
}

export default Form;

