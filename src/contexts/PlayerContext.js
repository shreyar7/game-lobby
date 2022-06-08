import { collection, getDocs, doc, getDoc, updateDoc, query, where } from "firebase/firestore";
import React, { useState, useEffect, createContext } from "react";
import { db } from '../services/firestore'

export const PlayerContext = createContext()

const PlayerContextProvider = (props) => {

    const [players, setPlayers] = useState([])

    useEffect(() => {
        const getPlayers = async () => {
            const playersCollection = collection(db, "players")
            const playersFromServer = await getDocs(playersCollection)
            setPlayers(playersFromServer.docs.map((doc) =>
                ({ ...doc.data(), id: doc.id })))
        }
        
        getPlayers()
    }, [])

    const changePlayerColor = async (id, newColor) => {

        //Update Player Color
        const playerDocumentRef = doc(db, "players", id)
        const updatedPlayerField = { color: newColor }
        await updateDoc(playerDocumentRef, updatedPlayerField)
        const playerData = await getDoc(playerDocumentRef)

        setPlayers(players.map((player) => player.id === id
            ? { ...playerData.data(), id: playerData.id } : player));

    }

    const updatePlayerLogin = async (uField, uValue, loginStatus) => {

        const matchingPlayers = query(collection(db, 'players'), where(uField, '==', uValue));
        const playersSnapshot = await getDocs(matchingPlayers);
        const playerDoc = playersSnapshot.docs[0]
        const playerDocumentRef = doc(db, "players", playerDoc.id)

        const updatedField = { loggedIn: loginStatus }
        await updateDoc(playerDocumentRef, updatedField)
        const selectedPlayerData = await getDoc(playerDocumentRef)

        setPlayers(players.map((player) => player.id === playerDoc.id
            ? { ...selectedPlayerData.data(), id: selectedPlayerData.id } : player));

        return selectedPlayerData
    }

    const value = [players, changePlayerColor, updatePlayerLogin, setPlayers]

    return (
        <PlayerContext.Provider value={value}>
            {props.children}
        </PlayerContext.Provider>
    )
}

export default PlayerContextProvider