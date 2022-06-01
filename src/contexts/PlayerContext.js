import { collection, getDocs, doc, where, getDoc, updateDoc, query } from "firebase/firestore";
import React, { useState, useEffect, createContext } from "react";
import { db } from '../services/firestore'

export const PlayerContext = createContext()

const PlayerContextProvider = (props) => {

    const [players, setPlayers] = useState([])
    const [colors, setColors] = useState([])


    useEffect(() => {
        const getPlayers = async () => {
            const playersCollection = collection(db, "players")
            const playersFromServer = await getDocs(playersCollection)
            setPlayers(playersFromServer.docs.map((doc) =>
                ({ ...doc.data(), id: doc.id })))
        }

        getPlayers()
    }, [])


    useEffect(() => {
        const getColors = async () => {
            const colorsCollection = collection(db, "colors")
            const colorsFromServer = await getDocs(colorsCollection)
            setColors(colorsFromServer.docs.map((doc) =>
                ({ ...doc.data(), id: doc.id })))
        }

        getColors()
    }, [])


    const updateColorDB = async (color, sel) => {

        const matchingColors = query(collection(db, 'colors'), where('code', '==', color));
        const colorsSnapshot = await getDocs(matchingColors);
        const colorDoc = colorsSnapshot.docs[0]
        const colorDocumentRef = doc(db, "colors", colorDoc.id)

        const updatedField = { selected: sel }
        await updateDoc(colorDocumentRef, updatedField)
        const selectedColorData = await getDoc(colorDocumentRef)

        return selectedColorData
    }


    const changeColor = async (id, newColor, oldColor) => {

        //Update Player Color
        const playerDocumentRef = doc(db, "players", id)
        const updatedPlayerField = { color: newColor }
        await updateDoc(playerDocumentRef, updatedPlayerField)
        const playerData = await getDoc(playerDocumentRef)

        setPlayers(players.map((player) => player.id === id
            ? { ...playerData.data(), id: playerData.id } : player));

        //Update Colors DB to track selected and available colors
        const selectedColorData = await updateColorDB(newColor, true)
        const removedColorData = await updateColorDB(oldColor, false)
        setColors(colors.map((color) =>
            color.code === newColor ? { ...selectedColorData.data(), id: selectedColorData.id }
                : color.code === oldColor ? { ...removedColorData.data(), id: removedColorData.id }
                    : color));
    }


    const value = [players, setPlayers, colors, setColors, changeColor]


    return (
        <PlayerContext.Provider value={value}>
            {props.children}
        </PlayerContext.Provider>
    )
}

export default PlayerContextProvider