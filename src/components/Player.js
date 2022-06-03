import React, { useState } from 'react'
import { FormControl, MenuItem, Select, Card, Button } from '@mui/material';
import { useContext } from 'react'
import { PlayerContext } from '../contexts/PlayerContext';
import { ColorContext } from '../contexts/ColorContext';
import { playerLogout, useAuth } from '../functions/auth';
import { storage } from '../services/firestore';
import { getDownloadURL, ref } from 'firebase/storage';

const Player = ({ playerIndex, player }) => {

    const currentUser = useAuth();
    const [colors, changeColorStatus] = useContext(ColorContext)
    const [players, changePlayerColor, updatePlayerLogin] = useContext(PlayerContext)
    const [url, setUrl] = useState("") 

    const changeValue = (event) => {
        changePlayerColor(player.id, event.target.value);
        changeColorStatus(player.color, event.target.value);
    }

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            if (currentUser != null) {
                updatePlayerLogin('uid', currentUser.uid, false)
            }
            else {
                updatePlayerLogin('uid', player.uid, false)
            }
            playerLogout()
        }
        catch (error) {
            console.log(error.message)
        }
    }

    const photoURL = getDownloadURL(ref(storage, player.photourl)).then(
        (url) => {
            setUrl(url)
        }
    )


    const availableColors = colors.map((color) => (
        color.selected !== true ?
            (<MenuItem key={color.id} value={color.code}>{color.name}</MenuItem>)
            : null))

    return (
        <Card key={player.id} className='player-box' sx={{ maxwidth: '20vw' }} style={{ backgroundColor: player.color }}>
            {currentUser != null ?
                (currentUser.uid === player.uid ?
                    <h4 className='player-heading'>You ({player.email})</h4>
                    : null)
                : null}
            <h4 className='player-heading'>Player {playerIndex}</h4>
            {currentUser != null ?
                <img src={url} className='profile-image' alt="profile"/>
                : null
            }
            {/* {currentUser != null ?
                (currentUser.uid === player.uid ?
                    <div>
                        <Button
                            id="upload-button"
                            onClick={handleUpload}
                            size="small"
                            sx={{ maxwidth: '10vw' }} variant="contained">
                            Upload Image
                        </Button>
                    </div>
                    : null)
                : null} */}
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
            {currentUser != null ?
                (currentUser.uid === player.uid ?
                    <Button id="logout-button"
                        onClick={handleLogout}
                        size="small"
                        sx={{ maxwidth: '10vw' }} variant="contained">
                        Logout
                    </Button>
                    : null)
                : null
            }

        </Card>
    )
}

export default Player