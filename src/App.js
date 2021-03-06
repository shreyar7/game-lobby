import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Container } from '@mui/material';
import Header from './components/Header';
import Players from './components/Players';
import Footer from './components/Footer';
import About from './components/About';
import PlayerContextProvider from './contexts/PlayerContext';
import ColorContextProvider from './contexts/ColorContext';


function App() {

  return (
    <Container className='App'>
      <Router>
        <Header />
        <PlayerContextProvider>
        <ColorContextProvider>
          <Routes>
            <Route path="/" exact element={<Players />} />
            <Route path='/about' element={<About />} />
          </Routes>
        </ColorContextProvider>
        </PlayerContextProvider>
        <Footer />
      </Router>
    </Container>
  );
}

export default App;
