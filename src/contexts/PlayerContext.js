// import { collection, getDocs, doc, getDoc, updateDoc, query, where } from "firebase/firestore";
import React, { useState, useEffect, createContext } from "react";
import { app } from '../services/firestore'
import { getFunctions, httpsCallable } from "firebase/functions";

const functions = getFunctions(app);

export const PlayerContext = createContext()

const PlayerContextProvider = (props) => {

    const [players, setPlayers] = useState([])

    useEffect(() => {
        const getPlayers = async () => {
            const retrieveCollection = httpsCallable(functions, 'retrieveCollection')
            retrieveCollection({"collection" : "players"}).then(result => {
                setPlayers(result.data)
            })
        }
        getPlayers()
    }, [])

    const changePlayerColor = async (id, newColor) => {
        //Update Player Color
        const updatePlayer = httpsCallable(functions, 'updatePlayer')
        updatePlayer({
            "playerId": id,
            "colorCode": newColor
        }).then(result => {
            setPlayers(players.map((player) => player.id === id
            ? result.data[1] : player));
        })
    }

    const updatePlayerLogin = async (uField, uValue, loginStatus) => {
        const updateLogin = httpsCallable(functions, 'updateLogin')
        updateLogin({
            "field": uField,
            "value": loginStatus,
            "id": uValue
        }).then(result => {
            setPlayers(players.map((player) => 
            player.uid === uValue ? result.data[1]
            : player.email === uValue ? result.data[1]
            : player));
        })
    }

    const value = [players, changePlayerColor, updatePlayerLogin, setPlayers]

    return (
        <PlayerContext.Provider value={value}>
            {props.children}
        </PlayerContext.Provider>
    )
}

export default PlayerContextProvider