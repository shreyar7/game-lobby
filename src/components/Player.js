import React from 'react'
import { FormControl, MenuItem, Select, Card } from '@mui/material';
import { useContext } from 'react'
import { PlayerContext } from '../contexts/PlayerContext';

const Player = ({ playerIndex, player }) => {

    const [players, setPlayers, colors, setColors, changeColor] = useContext(PlayerContext)
    const [value, setValue] = React.useState('grey')

    const changeValue = (event) => {
        setValue(event.target.value);
        changeColor(player.id, event.target.value, player.color)
    }

    const availableColors = colors.map((color) => (
        color.selected !== true ?
            (<MenuItem key={color.id} value={color.code}>{color.name}</MenuItem>)
            : null))

    return (
        <Card key={player.id} className='player-box' sx={{ maxwidth: '20vw' }} style={{ backgroundColor: player.color }}>
            <h4 className='player-heading'>Player {playerIndex}</h4>
            <hr />
            <br />
            <FormControl size="small" style={{ backgroundColor: "#FFFFFF", margin: "5%", alignSelf: 'center' }}>
                <Select id="color-select"
                    value={value}
                    onChange={changeValue}>
                    <MenuItem disabled value={value}>
                        Select
                    </MenuItem>
                    {availableColors}
                </Select>
            </FormControl>

        </Card>
    )
}

export default Player