import React from 'react'
import Player from "./Player"
import { Container } from '@mui/material';

const Players = ({ players, colors, onColorChange }) => {

    return (
        <Container className='players-container'>
            {players.map((player) => (
                <Player key={player.id}
                    player={player}
                    colors={colors}
                    onColorChange={onColorChange} />
            ))}
        </Container>
    )
}

export default Players
