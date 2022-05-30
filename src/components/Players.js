import React from 'react'
import Player from "./Player"
import { Container } from '@mui/material';
import { useContext } from 'react'
import { PlayerContext } from '../contexts/PlayerContext';

const Players = () => {

    const [players, setPlayers] = useContext(PlayerContext)

    const playerComponents = players.map((player) => (
        <Player key={player.id} player={player} />
    ))

    return (
        <Container className='players-container'>
            { playerComponents }
        </Container>
    )
}

export default Players
