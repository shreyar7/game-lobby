// import { collection, getDocs, doc, where, getDoc, updateDoc, query } from "firebase/firestore";
import React, { useState, useEffect, createContext } from "react";
import { app } from '../services/firestore'
import { getFunctions, httpsCallable } from "firebase/functions";

const functions = getFunctions(app);

export const ColorContext = createContext()

const ColorContextProvider = (props) => {

    const [colors, setColors] = useState([])

    useEffect(() => {
        const getColors = async () => {
            const retrieveCollection = httpsCallable(functions, 'retrieveCollection')
            retrieveCollection({ "collection": "colors" }).then(result => {
                setColors(result.data)
            })
        }
        getColors()
    }, [])

    const updateColorDB = async (oldColor, newColor) => {
        const updateColor = httpsCallable(functions, 'updateColor')
        updateColor({
            "colorCode": oldColor,
            "select": false
        }).then(prevColor => {
            updateColor({
                "colorCode": newColor,
                "select": true
            }).then(currColor => {
                setColors(colors.map((color) =>
                    color.code === oldColor ? prevColor.data[1]
                        : color.code === newColor ? currColor.data[1]
                            : color));

            })
        })
    }

    const value = [colors, updateColorDB, setColors]


    return (
        <ColorContext.Provider value={value}>
            {props.children}
        </ColorContext.Provider>
    )

}

export default ColorContextProvider
