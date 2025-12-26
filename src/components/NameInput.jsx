import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useServer } from '../context/ServerContext';

const NameInput = ({ results, onSubmitted }) => {
    const { baseUrl } = useServer();
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const savedName = localStorage.getItem('lastUserName');
        if (savedName) {
            setName(savedName);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name.trim()) return;

        setLoading(true);
        setError(null);

        const average = results.reduce((a, b) => a + b, 0) / results.length;

        try {
            localStorage.setItem('lastUserName', name);

            // Construct payload according to API spec
            // Assuming API expects attempt1, attempt2, attempt3 in ms or seconds?
            // The API spec shows "score" in response but input shows attempt1, 2, 3.
            // Let's assume the API handles the average calculation or expects raw data.
            // Based on API doc:
            // {
            //   "name": "",
            //   "attempt1": 0,
            //   "attempt2": 0,
            //   "attempt3": 0
            // }

            const payload = {
                name: name,
                attempt1: results[0],
                attempt2: results[1],
                attempt3: results[2]
            };

            await axios.post(`${baseUrl}/records`, payload);
            onSubmitted();
        } catch (err) {
            console.error('Failed to submit record:', err);
            setError('기록 전송에 실패했습니다. 다시 시도해주세요.');
        } finally {
            setLoading(false);
        }
    };

    const calculateAverage = () => {
        return (results.reduce((a, b) => a + b, 0) / results.length).toFixed(2);
    };

    return (
        <div className='card flex-center'>
            <h2>축하합니다!</h2>
            <p>당신의 평균 반응 속도는 <strong>{calculateAverage()}ms</strong> 입니다.</p>

            <form onSubmit={handleSubmit} style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <label>
                    랭킹에 등록할 이름을 입력하세요:
                </label>
                <div style={{ display: 'flex' }}>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="이름 (최대 10자)"
                        maxLength={10}
                        required
                    />
                    <button type="submit" disabled={loading}>
                        {loading ? '전송 중...' : '등록'}
                    </button>
                </div>
            </form>
            {error && <p style={{ color: 'var(--error-color)', marginTop: '0.5rem' }}>{error}</p>}
        </div>
    );
};

export default NameInput;
