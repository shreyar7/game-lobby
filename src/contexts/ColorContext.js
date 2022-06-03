import { collection, getDocs, doc, where, getDoc, updateDoc, query } from "firebase/firestore";
import React, { useState, useEffect, createContext } from "react";
import { db } from '../services/firestore'

export const ColorContext = createContext()

const ColorContextProvider = (props) => {

    const [colors, setColors] = useState([])

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

    const changeColorStatus = async (oldColor, newColor) => {
        //Update Colors DB to track selected and available colors
        const removedColorData = await updateColorDB(oldColor, false)
        const selectedColorData = await updateColorDB(newColor, true)
        setColors(colors.map((color) =>
            color.code === oldColor ? { ...removedColorData.data(), id: removedColorData.id }
                : color.code === newColor ? { ...selectedColorData.data(), id: selectedColorData.id }
                    : color));
    }

    const value = [colors, changeColorStatus, setColors]


    return (
        <ColorContext.Provider value={value}>
            {props.children}
        </ColorContext.Provider>
    )

}

export default ColorContextProvider
