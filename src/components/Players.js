import React from 'react'
import Player from "./Player"
import Form from "./Form"
import { Container } from '@mui/material';
import { useContext } from 'react'
import { PlayerContext } from '../contexts/PlayerContext';
import { useAuth } from '../functions/auth';

const Players = () => {

    const [players] = useContext(PlayerContext)
    const currentUser = useAuth()

    function checkLoggedIn(player) {
        return player.loggedIn === true
    }

    function getCurrentPlayer(player) {
        return player.uid === currentUser.uid
    }

    const loggedInPlayers = players.filter(checkLoggedIn)

    const playerComponents = loggedInPlayers.map((player, index) => (
        <Player key={index} player={player} playerIndex={index+1} />
    ))

  
    return (
        <Container className='players-container'>
            {playerComponents}
            {
                currentUser == null ?
                <Form />
                :null
            }
        </Container>
    )
}

export default Players
