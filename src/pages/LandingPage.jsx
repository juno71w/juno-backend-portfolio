import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Construction, Code, ArrowRight, Github, Info } from 'lucide-react';
import ProjectModal from '../components/ProjectModal';

const LandingPage = () => {
    const navigate = useNavigate();
    const [selectedProject, setSelectedProject] = React.useState(null);

    const handleOpenModal = (e, project) => {
        e.stopPropagation();
        setSelectedProject(project);
    };

    const handleCloseModal = () => {
        setSelectedProject(null);
    };

    const projects = [
        {
            id: 'reaction-game',
            title: '반응 속도 테스트',
            description: '당신의 반응 속도를 측정하고 글로벌 랭킹에 도전하세요! Redis와 RDBMS를 활용한 고성능 백엔드.',
            icon: <Zap size={48} className="text-yellow-400" />,
            path: '/reaction-game',
            color: 'from-orange-400 to-red-500',
            status: 'Live',
            githubUrl: 'https://github.com/juno71w/react-game',
            detailDescription: '이 프로젝트는 React와 Spring Boot, Redis를 활용하여 개발된 반응 속도 테스트 게임입니다. 사용자의 반응 속도를 밀리초 단위로 측정하며, 실시간 랭킹 시스템을 제공합니다. 백엔드에서는 Redis를 사용하여 고성능 데이터 처리를 구현했습니다.'
        },
        {
            id: 'coming-soon',
            title: '새로운 프로젝트',
            description: '다음에 추가될 흥미로운 프로젝트를 기대해주세요.',
            icon: <Construction size={48} className="text-blue-400" />,
            path: '#',
            color: 'from-blue-400 to-purple-500',
            status: 'Coming Soon',
            githubUrl: null,
            detailDescription: '현재 기획 중인 새로운 웹 프로젝트입니다. 혁신적인 아이디어와 최신 기술을 접목하여 사용자에게 새로운 경험을 제공할 예정입니다.'
        }
    ];

    return (
        <div className="landing-container">

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

                            {/* GitHub Link (Top Right) */}
                            {project.githubUrl && (
                                <a
                                    href={project.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="card-action-btn action-btn-top-right"
                                    onClick={(e) => e.stopPropagation()}
                                    title="View on GitHub"
                                >
                                    <Github size={20} />
                                </a>
                            )}

                            {/* Info Button (Bottom Right) */}
                            <button
                                className="card-action-btn action-btn-bottom-right"
                                onClick={(e) => handleOpenModal(e, project)}
                                title="Project Info"
                            >
                                <Info size={20} />
                            </button>

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

            {/* Project Modal */}
            <ProjectModal
                isOpen={!!selectedProject}
                onClose={handleCloseModal}
                title={selectedProject?.title || ''}
                description={selectedProject?.detailDescription || ''}
            />
        </div>
    );
};

export default LandingPage;
