import { Button } from '@mui/material';
import React from 'react'


const About = () => {
    return (
        <div className='about'>
            <h3> About Page </h3>
            <p>Every player must have a unique color.</p>
            <Button variant="contained" href='/'>Back to Homepage</Button>
        </div>
    )
}

export default About