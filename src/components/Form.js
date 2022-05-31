import React from 'react'
import { Card,  Button, Grid, TextField } from '@mui/material';

const Form = () => {

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submit')
    }

    return (
        <Card className='player-box' sx={{ maxwidth: '20vw' }} style={{ backgroundColor: 'grey' }}>
            <h4 className='player-heading'>Login</h4>
            <hr />
            <br />
            <form onSubmit={handleSubmit}>
                <Grid container alignItems={"center"} justifyContent="center" direction={"column"}>
                    <Grid item>
                        <TextField id="login-id"
                            type="email"
                            label="E-Mail"
                            variant='outlined'
                            size="small"
                            sx={{ maxwidth: '10vw' }}
                            style={{ backgroundColor: "#FFFFFF", margin: "5%", alignSelf: 'center' }} />
                    </Grid>
                    <Grid item>
                        <TextField id="login-password"
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

