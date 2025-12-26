import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useServer } from '../context/ServerContext';

const NameInput = ({ results, onSubmitted }) => {
    const { serverType } = useServer();
    const [name, setName] = useState('');
    const [loading, setLoading] = useState({ mysql: false, redis: false });
    const [logs, setLogs] = useState([]);

    // Remove global error state in favor of per-log errors, specifically handled in logs
    // But we might want a general error if something totally fails outside requests
    const [error, setError] = useState(null);

    useEffect(() => {
        const savedName = localStorage.getItem('lastUserName');
        if (savedName) {
            // Remove suffix if present to show clean name to user
            const cleanName = savedName.replace(/-MySQL$/, '').replace(/-Redis$/, '');
            setName(cleanName);
        }
    }, []);

    const handleSubmit = async (server) => {
        if (!name.trim()) {
            setError('이름을 입력해주세요.');
            return;
        }

        setError(null);

        const isMysql = server === 'MySQL';
        const key = isMysql ? 'mysql' : 'redis';
        const apiVersion = isMysql ? 'v1' : 'v2';

        // Prevent double submit for same button
        if (loading[key]) return;

        setLoading(prev => ({ ...prev, [key]: true }));

        const startTime = performance.now();
        const payload = {
            attempt1: results[0],
            attempt2: results[1],
            attempt3: results[2],
            name: `${name}-${server}`
        };

        try {
            await axios.post(`/api/${apiVersion}/records`, payload);
            const duration = (performance.now() - startTime).toFixed(2);

            // Add to logs
            setLogs(prev => [
                ...prev,
                {
                    id: Date.now() + Math.random(),
                    server: server,
                    status: 'success',
                    duration: duration
                }
            ]);

            // Save the appropriate name for highlighter based on most recent successful submit
            localStorage.setItem('lastUserName', `${name}-${server}`);

        } catch (err) {
            setLogs(prev => [
                ...prev,
                {
                    id: Date.now() + Math.random(),
                    server: server,
                    status: 'error',
                    message: err.message
                }
            ]);
        } finally {
            setLoading(prev => ({ ...prev, [key]: false }));
        }
    };

    const calculateAverage = () => {
        return (results.reduce((a, b) => a + b, 0) / results.length).toFixed(2);
    };

    const handleConfirm = () => {
        onSubmitted();
    };

    return (
        <div className='card flex-center' style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2>축하합니다!</h2>
            <p>당신의 평균 반응 속도는 <strong>{calculateAverage()}ms</strong> 입니다.</p>

            <div style={{ width: '100%', margin: '1.5rem 0' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', textAlign: 'left' }}>
                    랭킹에 등록할 이름:
                </label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="이름 (최대 10자)"
                    maxLength={10}
                    style={{ width: '100%', padding: '0.8rem', fontSize: '1rem' }}
                />
                {error && <p style={{ color: 'var(--error-color)', marginTop: '0.5rem', fontSize: '0.9rem' }}>{error}</p>}
            </div>

            {/* Split Cards Container */}
            <div style={{ display: 'flex', gap: '1rem', width: '100%', marginBottom: '1.5rem' }}>
                {/* MySQL Card */}
                <div style={{
                    flex: 1,
                    padding: '1rem',
                    borderRadius: '8px',
                    border: '1px solid #444',
                    background: 'rgba(255, 255, 255, 0.05)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '1rem'
                }}>
                    <strong style={{ fontSize: '1.2rem' }}>MySQL</strong>
                    <button
                        onClick={() => handleSubmit('MySQL')}
                        disabled={loading.mysql}
                        style={{ width: '100%', background: '#00758f' }} // Custom MySQL color hint
                    >
                        {loading.mysql ? '전송 중...' : 'MySQL 전송'}
                    </button>
                </div>

                {/* Redis Card */}
                <div style={{
                    flex: 1,
                    padding: '1rem',
                    borderRadius: '8px',
                    border: '1px solid #444',
                    background: 'rgba(255, 255, 255, 0.05)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '1rem'
                }}>
                    <strong style={{ fontSize: '1.2rem' }}>Redis</strong>
                    <button
                        onClick={() => handleSubmit('Redis')}
                        disabled={loading.redis}
                        style={{ width: '100%', background: '#d82c20' }} // Custom Redis color hint
                    >
                        {loading.redis ? '전송 중...' : 'Redis 전송'}
                    </button>
                </div>
            </div>

            {/* Logs Area */}
            {logs.length > 0 && (
                <div style={{ width: '100%', marginBottom: '1.5rem', textAlign: 'left' }}>
                    <h4>전송 결과:</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
                        {logs.map(log => (
                            <div key={log.id} style={{
                                padding: '10px',
                                backgroundColor: log.status === 'success' ? 'rgba(0, 255, 0, 0.1)' : 'rgba(255, 0, 0, 0.1)',
                                borderRadius: '5px',
                                borderLeft: `4px solid ${log.status === 'success' ? '#4caf50' : '#f44336'}`,
                                display: 'flex',
                                justifyContent: 'space-between',
                                fontSize: '0.9rem'
                            }}>
                                <span><strong>{log.server}</strong></span>
                                <span>
                                    {log.status === 'success'
                                        ? `성공 (${log.duration}ms)`
                                        : `실패: ${log.message}`}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <button onClick={handleConfirm} style={{ padding: '0.8rem 2rem', fontSize: '1rem', marginTop: '1rem' }}>
                랭킹 확인하기
            </button>
        </div>
    );
};

export default NameInput;
