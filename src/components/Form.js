import React, { useState, useRef, useContext } from 'react'
import { Card, Button, Grid, TextField } from '@mui/material';
import { playerLogin } from '../functions/auth';
import { PlayerContext } from '../contexts/PlayerContext';


const Form = () => {

    const emailRef = useRef()
    const passwordRef = useRef()
    const [players, changePlayerColor, updatePlayerLogin] = useContext(PlayerContext)


    const [loginEmail, setLoginEmail] = useState("")
    const [loginPassword, setLoginPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            playerLogin(loginEmail, loginPassword).then(
                () => { 
                    updatePlayerLogin('email', loginEmail, true)
                }
            )

        }
        catch (error) {
            console.log(error.message)
        }
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
                            ref={emailRef}
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
                            ref={passwordRef}
                            type={"password"}
                            label="Password"
                            variant='outlined'
                            size="small"
                            sx={{ maxwidth: '10vw' }}
                            style={{ backgroundColor: "#FFFFFF", margin: "5%", alignSelf: 'center' }} />
                    </Grid>
                    <Button id="login-button"
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

