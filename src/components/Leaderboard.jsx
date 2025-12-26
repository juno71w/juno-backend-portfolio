import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useServer } from '../context/ServerContext';

const Leaderboard = ({ onRetry, viewMode = 'global', currentUserName = null }) => {
    const { baseUrl } = useServer();
    const [leaders, setLeaders] = useState([]);
    const [myRankData, setMyRankData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchLeaderboard();
    }, [baseUrl]);

    const fetchLeaderboard = async () => {
        try {
            setError(null);
            setLoading(true);
            const response = await axios.get(`${baseUrl}/records`);
            setLeaders(response.data.rankList);

            if (viewMode === 'result' && currentUserName) {
                await fetchMyRank(currentUserName);
            }
        } catch (err) {
            setError('랭킹을 불러오는데 실패했습니다.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchMyRank = async (name) => {
        try {
            const response = await axios.get(`${baseUrl}/records/me?name=${name}`);
            setMyRankData(response.data.rankList);
        } catch (err) {
            console.error('Failed to fetch my rank', err);
        }
    };

    // Loading and Error states are now handled within the main render to prevent layout shifts

    return (
        <div className="card" style={{ minHeight: '600px', position: 'relative' }}>
            {loading && (
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: '12px',
                    zIndex: 10,
                    backdropFilter: 'blur(2px)'
                }}>
                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#fff' }}>로딩 중...</div>
                </div>
            )}

            {error ? (
                <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--error-color)' }}>
                    <p>{error}</p>
                    <button onClick={fetchLeaderboard}>재시도</button>
                </div>
            ) : (
                <>

                    <h2>🏆 명예의 전당</h2>

                    {/* Global Top 10 */}
                    <table className="leaderboard-table">
                        <thead>
                            <tr>
                                <th>순위</th>
                                <th>이름</th>
                                <th>기록 (ms)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaders.map((record, index) => (
                                <tr key={record.id} className={currentUserName === record.name ? 'my-rank' : ''}>
                                    <td>{index + 1}</td>
                                    <td>{record.name}</td>
                                    <td>{record.score}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* My Rank Section (Only in Result Mode) */}
                    {viewMode === 'result' && myRankData.length > 0 && (
                        <div style={{ marginTop: '2rem', borderTop: '1px solid #444', paddingTop: '1rem' }}>
                            <h3>내 순위 확인</h3>
                            <table className="leaderboard-table">
                                <thead>
                                    <tr>
                                        <th>순위</th>
                                        <th>이름</th>
                                        <th>기록 (ms)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {myRankData.map((record) => (
                                        <tr key={record.id} className={currentUserName === record.name ? 'my-rank' : ''}>
                                            <td>{record.rank}</td>
                                            <td>{record.name}</td>
                                            <td>{record.score}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <p style={{ fontSize: '0.8rem', color: '#888', marginTop: '0.5rem' }}>* 내 기록 주변 5명의 순위입니다.</p>
                        </div>
                    )}

                    {onRetry && (
                        <div style={{ marginTop: '2rem' }}>
                            <button onClick={onRetry}>{viewMode === 'global' ? '게임 시작' : '처음으로 돌아가기'}</button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Leaderboard;
