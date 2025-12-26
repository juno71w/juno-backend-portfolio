import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ReactionGame from './pages/ReactionGame';
import ThemeToggle from './components/ThemeToggle';
import Header from './components/Header';


function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/reaction-game" element={<ReactionGame />} />
        </Routes>
        <ThemeToggle />
      </div>
    </BrowserRouter>
  );
}

export default App;
