import React from 'react';
import { useServer } from '../context/ServerContext';

const ServerSelector = () => {
    const { serverType, setServerType } = useServer();

    return (
        <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ color: '#888', marginBottom: '0.8rem', fontSize: '2rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                서버 선택
            </h2>
            <div className="server-selector-container">
                <button
                    className={`server-option ${serverType === 'mysql' ? 'active' : ''}`}
                    onClick={() => setServerType('mysql')}
                >
                    MySQL (v1)
                </button>
                <button
                    className={`server-option ${serverType === 'redis' ? 'active' : ''}`}
                    onClick={() => setServerType('redis')}
                >
                    Redis (v2)
                </button>
            </div>
        </div>
    );
};

export default ServerSelector;
