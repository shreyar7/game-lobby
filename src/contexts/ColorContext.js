import React, { useState, useEffect, createContext } from "react";

export const ColorContext = createContext()

const ColorContextProvider = (props) => {

    const [colors, setColors] = useState([])

    useEffect(() => {
        const getColors = async () => {
            const retrieveColors = await fetch('http://localhost:3005/getColors')
            const colorsJson = await retrieveColors.json()
            setColors(colorsJson)
        }
        getColors()
    }, [])

    const updateColorDB = async (oldColor, newColor) => {
        const updatePrevColor = await fetch(
            `http://localhost:3005/setColorSelect/`,
            {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    "prev": oldColor,
                    "curr": newColor
                })
            }
        ).then(
            async res => {
                const resJson = res.json()
                setColors(colors.map((color) =>
                            color.code === oldColor ? resJson[1]
                                : color.code === newColor ? resJson[0]
                                    : color))
            window.location = "/"
            }
        )
    }

    const value = [colors, updateColorDB, setColors]


    return (
        <ColorContext.Provider value={value}>
            {props.children}
        </ColorContext.Provider>
    )

}

export default ColorContextProvider
