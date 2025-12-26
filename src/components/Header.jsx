import React from 'react';
import { Code } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    return (
        <header className="landing-header global-header">
            <div className="logo-container" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
                <Code size={32} />
                <span className="logo-text">DevPortfolio</span>
            </div>
        </header>
    );
};

export default Header;
