import React from 'react';
import { useNavigate } from 'react-router-dom';

function DashBoard() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.reload();
        navigate('/');
    };

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <p>Welcome to the admin dashboard!</p>
            <button onClick={handleLogout}>Log Out</button>
        </div>
    );
};

export default DashBoard;
