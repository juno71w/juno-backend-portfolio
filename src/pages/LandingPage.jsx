import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Construction, Code, ArrowRight } from 'lucide-react';

const LandingPage = () => {
    const navigate = useNavigate();

    const projects = [
        {
            id: 'reaction-game',
            title: '반응 속도 테스트',
            description: '당신의 반응 속도를 측정하고 글로벌 랭킹에 도전하세요! Redis와 RDBMS를 활용한 고성능 백엔드.',
            icon: <Zap size={48} className="text-yellow-400" />,
            path: '/reaction-game',
            color: 'from-orange-400 to-red-500',
            status: 'Live'
        },
        {
            id: 'coming-soon',
            title: '새로운 프로젝트',
            description: '다음에 추가될 흥미로운 프로젝트를 기대해주세요.',
            icon: <Construction size={48} className="text-blue-400" />,
            path: '#',
            color: 'from-blue-400 to-purple-500',
            status: 'Coming Soon'
        }
    ];

    return (
        <div className="landing-container">
            <header className="landing-header">
                <div className="logo-container">
                    <Code size={32} />
                    <span className="logo-text">DevPortfolio</span>
                </div>
            </header>

            <main className="landing-main">
                <div className="hero-section">
                    <h1 className="hero-title">
                        <span className="gradient-text">Interactive</span> Project Hub
                    </h1>
                    <p className="hero-subtitle">
                        다양한 웹 기술과 실험적인 프로젝트를 모아둔 공간입니다.
                        <br />
                        아래에서 프로젝트를 선택하여 경험해보세요.
                    </p>
                </div>

                <div className="projects-grid">
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className="project-card"
                            onClick={() => project.path !== '#' && navigate(project.path)}
                        >
                            <div className={`card-gradient-bg bg-gradient-to-br ${project.color}`}></div>
                            <div className="card-content">
                                <div className="card-icon-wrapper">
                                    {project.icon}
                                </div>
                                <div className="card-info">
                                    <div className="card-header-row">
                                        <h3 className="card-title">{project.title}</h3>
                                        <span className={`status-badge ${project.status === 'Live' ? 'status-live' : 'status-soon'}`}>
                                            {project.status}
                                        </span>
                                    </div>
                                    <p className="card-description">{project.description}</p>
                                </div>
                                <div className="card-footer">
                                    <span className="explore-text">Explore Project</span>
                                    <ArrowRight size={20} className="arrow-icon" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            <footer className="landing-footer">
                <p>© 2025 Park Junho. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default LandingPage;
