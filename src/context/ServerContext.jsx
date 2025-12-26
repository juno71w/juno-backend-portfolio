import React, { createContext, useState, useContext, useEffect } from 'react';

const ServerContext = createContext();

export const ServerProvider = ({ children }) => {
    const [serverType, setServerState] = useState('mysql'); // 'mysql' | 'redis'

    useEffect(() => {
        const savedServer = localStorage.getItem('serverType');
        if (savedServer) {
            setServerState(savedServer);
        }
    }, []);

    const setServerType = (type) => {
        setServerState(type);
        localStorage.setItem('serverType', type);
    };

    const apiVersion = serverType === 'mysql' ? 'v1' : 'v2';
    const baseUrl = `http://localhost:8080/api/${apiVersion}`;

    return (
        <ServerContext.Provider value={{ serverType, setServerType, apiVersion, baseUrl }}>
            {children}
        </ServerContext.Provider>
    );
};

export const useServer = () => useContext(ServerContext);
