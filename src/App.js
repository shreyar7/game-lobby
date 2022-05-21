import React from 'react'
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Container } from '@mui/material';
import Header from './components/Header';
import Players from './components/Players';
import Footer from './components/Footer';
import About from './components/About';


function App() {
  const [players, setPlayers] = useState([])
  const [colors, setColors] = useState([])

  useEffect(() => {
    const getPlayers = async () => {
      const playersFromServer = await fetchPlayers()
      setPlayers(playersFromServer)
    }

    getPlayers()
  }, [])

  const fetchPlayers = async () => {
    const res = await fetch('http://localhost:5000/players')
    const data = await res.json()

    return data
  }

  useEffect(() => {
    const getColors = async () => {
      const colorsFromServer = await fetchColors()
      setColors(colorsFromServer)
    }

    getColors()
  }, [])

  const fetchPlayer = async (id) => {
    const res = await fetch(`http://localhost:5000/players/${id}`)
    const data = await res.json()

    return data
  }

  const fetchColors = async () => {
    const res = await fetch('http://localhost:5000/colors')
    const data = await res.json()

    return data
  }

  const fetchColor = async (colorName) => {
    const res = await fetch(`http://localhost:5000/colors?name=${colorName}`)
    const data = await res.json()

    return data[0]
  }

  const updateColorDB = async (color, sel) => {
    const selectedColor = await fetchColor(color)
    const updatedSelectedColor = { ...selectedColor, selected: sel }
    const selectedColorRes = await fetch(`http://localhost:5000/colors/${updatedSelectedColor.id}`,
      {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(updatedSelectedColor)
      })
    const selectedColorData = await selectedColorRes.json()
    return selectedColorData
  }

  const changeColor = async (id, newColor, oldColor) => {

    //Update Player Color
    const playerToUpdate = await fetchPlayer(id)
    const updatedPlayer = { ...playerToUpdate, color: newColor }
    const playerRes = await fetch(`http://localhost:5000/players/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(updatedPlayer)
      })
    const playerData = await playerRes.json()
    setPlayers(players.map((player) => player.id === id
      ? { ...player, color: playerData.color } : player));

    //Update Colors DB to track selected and available colors
      const selectedColorData = await updateColorDB(newColor, true)
    const removedColorData = await updateColorDB(oldColor, false)
    setColors(colors.map((color) =>
      color.name === newColor ? { ...color, selected: selectedColorData.selected }
        : color.name === oldColor ? { ...color, selected: removedColorData.selected }
          : color));

  }

  return (
    <Container className='App'>
      <Router>
        <Header />
        <Routes>
          <Route path="/" exact element={
            <>
              {players.length > 0 ?
                <Players players={players} colors={colors} onColorChange={changeColor} />
                : "No Players"}
            </>} />
          <Route path='/about' element={<About />} />
        </Routes>
        <Footer />
      </Router>
    </Container>
  );
}

export default App;
