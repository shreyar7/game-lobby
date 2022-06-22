import React from 'react'
import { FormControl, MenuItem, Select, Card, Button } from '@mui/material';
import { useContext } from 'react'
import { PlayerContext } from '../contexts/PlayerContext';
import { ColorContext } from '../contexts/ColorContext';

const Player = ({ playerIndex, player }) => {

    const [colors, updateColorDB] = useContext(ColorContext)
    const [players, changePlayerColor, updatePlayerLogin] = useContext(PlayerContext)

    const changeValue = (event) => {
        changePlayerColor(player.id, event.target.value);
        updateColorDB(player.color, event.target.value);
    }

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            updatePlayerLogin(player.email, false)
            window.location = "/"
        }
        catch (error) {
            console.log(error.message)
        }
    }

    const availableColors = colors.map((color) => (
        color.selected !== true ?
            (<MenuItem key={color.id} value={color.code}>{color.name}</MenuItem>)
            : null))

    return (
        <Card key={player.id} className='player-box' sx={{ maxwidth: '20vw' }} style={{ backgroundColor: player.color }}>
            <h4 className='player-heading'>({player.email})</h4>
            <h4 className='player-heading'>Player {playerIndex}</h4>
            <img src={player.photourl} className='profile-image' alt="profile" />
            <br />
            <hr />
            <br />
            <FormControl size="small" style={{ backgroundColor: "#FFFFFF", margin: "5%", alignSelf: 'center' }}>
                <Select id="color-select"
                    value={'grey'}
                    onChange={changeValue}>
                    <MenuItem disabled value={'grey'}>
                        Select
                    </MenuItem>
                    {availableColors}
                </Select>
            </FormControl>
            <br />

            <Button id="logout-button"
                onClick={handleLogout}
                size="small"
                sx={{ maxwidth: '10vw' }} variant="contained">
                Logout
            </Button>

        </Card>
    )
}

export default Player