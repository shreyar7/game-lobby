import React, { useState, useEffect, createContext } from "react";

export const PlayerContext = createContext()

const PlayerContextProvider = (props) => {

    const [players, setPlayers] = useState([])

    useEffect(() => {
        const getPlayers = async () => {
            const retrievePlayers = await fetch('http://localhost:3005/getPlayers')
            const playersJson = await retrievePlayers.json()
            setPlayers(playersJson)
        }
        getPlayers()
    }, [])

    const changePlayerColor = async (id, newColor) => {

        const updatePlayer = await fetch(
            `http://localhost:3005/setPlayerColor/`,
            {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    "id": id,
                    "newColor": newColor
                })
            }).then(result => {
                const resJson = result.json()
                setPlayers(players.map((player) => player.id === id
                    ? resJson : player));
            })
    }

    const updatePlayerLogin = async (uField, loginStatus) => {
        const updateLogin = await fetch(
            `http://localhost:3005/setLogin/`,
            {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    "state": loginStatus,
                    "field": uField
                })
            }
        ).then((result) => {
            const resJson = result.json()
            setPlayers(players.map((player) => player.email === uField ? resJson
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