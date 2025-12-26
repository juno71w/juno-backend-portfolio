import React from 'react';
import Leaderboard from './Leaderboard';

const Home = ({ onStart }) => {
    return (
        <div>
            <div style={{ marginBottom: '2rem' }}>
                <p>당신의 반응 속도를 테스트해보세요!</p>
                <button onClick={onStart} style={{ fontSize: '1.2rem', padding: '1rem 2rem' }}>
                    게임 시작 🎮
                </button>
            </div>
            <Leaderboard viewMode="global" />
        </div>
    );
};

export default Home;
