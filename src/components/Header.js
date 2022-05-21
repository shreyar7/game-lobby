import React from 'react'
import PropTypes from 'prop-types'
import { Container } from '@mui/material';

const Header = ({title}) => {
    return(
        <Container className='header'>
            <h1>{title}</h1>
        </Container>
    )
}

Header.defaultProps = {
    title: 'Game Lobby'
}

Header.propTypes = {
    title: PropTypes.string
}

export default Header