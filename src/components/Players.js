import React from 'react'
import Player from "./Player"
import Form from "./Form"
import { Container } from '@mui/material';
import { useContext } from 'react'
import { PlayerContext } from '../contexts/PlayerContext';

const Players = () => {

    const [players] = useContext(PlayerContext)

    function checkLoggedIn(player) {
        return player.loggedin === true
    }

    const loggedInPlayers = players.filter(checkLoggedIn)

    const playerComponents = loggedInPlayers.map((player, index) => (
        <Player key={index} player={player} playerIndex={index+1} />
    ))

  
    return (
        <Container className='players-container'>
            {playerComponents}
            <Form />
        </Container>
    )
}

export default Players
