import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ReactionGame from './pages/ReactionGame';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/reaction-game" element={<ReactionGame />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
