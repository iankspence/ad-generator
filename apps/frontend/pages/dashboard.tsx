import React from 'react';
import useAuth from '../hooks/useAuth';
import TopNav from "../components/TopNav";

const Dashboard = () => {
    useAuth();

    return (
        <div>
            <TopNav />
            <h1>Dashboard</h1>
            <p>You need to be signed in to view this page.</p>
        </div>
    );
};

export default Dashboard;
