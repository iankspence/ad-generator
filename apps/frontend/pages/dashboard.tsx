import React from 'react';
import useAuth from '../hooks/useAuth';

const Dashboard = () => {
    useAuth();

    return (
        <div>
            <h1>Dashboard</h1>
            <p>You need to be signed in to view this page.</p>
        </div>
    );
};

export default Dashboard;
