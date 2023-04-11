import { ScrapeGoogleMapsButton } from '../components/ScrapeGoogleMapsButton';
import { ScrapeRateMdsButton } from '../components/ScrapeRateMdsButton';
import TopNav from '../components/TopNav';
import UserContext from '../contexts/UserContext';
import { getAccountByUserId } from '../utils/api';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import React, { useContext, useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import io from 'socket.io-client';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
export const options = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: true,
            text: 'Review Classification',
        },
    },
};

const labels = [
    'The Stressed Professional',
    'The Weekend Warrior',
    'The Chronic Pain Sufferer',
    'The Posture Protector',
    'The Aging Gracefully',
    'The Accident Recovery',
    'The Office Worker',
    'The Parent',
    'The Migraine Sufferer',
    'The Holistic Health Seeker',
];

export const data = {
    labels,
    datasets: [
        {
            label: 'Number of Reviews',
            data: new Array(10).fill(0),
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
        },
    ],
};

export function AccountPage() {
    const { user } = useContext(UserContext);
    const [account, setAccount] = useState(null);
    const [chartData, setChartData] = useState(data);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        // Connect to the WebSocket server
        const newSocket = io('ws://localhost:3333');
        setSocket(newSocket);

        newSocket.on('reviewProcessed', (review) => {
            console.log('Received new review:', review);
            if (review && review.bestFitPersona) {
                setChartData((prevData) => {
                    const newData = { ...prevData };
                    const personaIndex = review.bestFitPersona - 1;
                    newData.datasets[0].data[personaIndex]++;
                    return newData;
                });
            } else {
                console.error('Received invalid review:', review);
            }
        });
        return () => {
            newSocket.disconnect();
        };
    }, []);

    useEffect(() => {
        // set the account for the user
        if (user) {
            console.log('use effect user', user);

            getAccountByUserId(user._id).then((account) => {
                console.log('account', account);
                setAccount(account);
            });
        }
    }, [user]);

    return (
        <>
            <TopNav />
            <div className="bg-black min-h-screen text-white px-8 py-12 flex flex-col items-center justify-center">
                {account && (
                    <>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="py-4">Google Query:</p>
                                <p className="py-4">RateMDs Link(s):</p>
                            </div>
                            <div>
                                {account.googleQuery && account ? (
                                    <ul className="py-4">{account.googleQuery}</ul>
                                ) : (
                                    <ul className="py-2">
                                        <ScrapeGoogleMapsButton
                                            userId={user._id}
                                            accountId={account._id}
                                            setAccount={setAccount}
                                        />
                                    </ul>
                                )}
                                <ul className="py-2">
                                    <ScrapeRateMdsButton
                                        userId={user._id}
                                        accountId={account._id}
                                        setAccount={setAccount}
                                    />
                                </ul>
                                {account.rateMdsLinks?.[0] && account && (
                                    <ul className="py-2">
                                        {account.rateMdsLinks.map((link, index) => (
                                            <li key={index}>{link}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    </>
                )}

                <div className="mt-8 w-full max-w-4xl">
                    <Bar key={Math.random()} options={options} data={chartData} />
                </div>
            </div>
        </>
    );
}

export default AccountPage;
