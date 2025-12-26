import React, { useState } from 'react';
import Game from '../components/Game';
import NameInput from '../components/NameInput';
import Leaderboard from '../components/Leaderboard';
import Home from '../components/Home';
import { ServerProvider } from '../context/ServerContext';
import ServerSelector from '../components/ServerSelector';

function ReactionGame() {
    const [screen, setScreen] = useState('home'); // home, game, input, leaderboard
    const [results, setResults] = useState([]);
    const [lastUserName, setLastUserName] = useState(null);

    const handleStartGame = () => {
        setScreen('game');
    };

    const handleGameComplete = (times) => {
        setResults(times);
        setScreen('input');
    };

    const handleNameSubmitted = () => {
        // Keep track of the name to highlight in leaderboard
        setLastUserName(localStorage.getItem('lastUserName'));
        setScreen('leaderboard');
    };

    const handleRetry = () => {
        setResults([]);
        setScreen('home'); // Go back to home
    };

    return (
        <ServerProvider>
            <div className="reaction-game-container">
                <ServerSelector />
                <h1>⚡ 반응 속도 테스트</h1>

                {screen === 'home' && (
                    <Home onStart={handleStartGame} />
                )}

                {screen === 'game' && (
                    <Game onComplete={handleGameComplete} />
                )}

                {screen === 'input' && (
                    <NameInput results={results} onSubmitted={handleNameSubmitted} />
                )}

                {screen === 'leaderboard' && (
                    <Leaderboard
                        onRetry={handleRetry}
                        viewMode="result"
                        currentUserName={lastUserName}
                    />
                )}
            </div>
        </ServerProvider>
    );
}

export default ReactionGame;
