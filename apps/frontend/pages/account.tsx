import PersonaList from '../components/PersonaList';
import ProcessedReviewChart, { data } from '../components/ProcessedReviewChart';
import QualityControlPanel from '../components/QualityControlPanel';
import { ScrapeGoogleMapsButton } from '../components/ScrapeGoogleMapsButton';
import { ScrapeRateMdsButton } from '../components/ScrapeRateMdsButton';
import TopNav from '../components/TopNav';
import UserContext from '../contexts/UserContext';
import { getAccountByUserId } from '../utils/api';
import React, { useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

export function AccountPage() {
    const { user } = useContext(UserContext);
    const [account, setAccount] = useState(null);
    const [chartData, setChartData] = useState(data);
    const [socket, setSocket] = useState(null);
    const [showChart, setShowChart] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Connect to the WebSocket server
        const newSocket = io('ws://localhost:3333');
        setSocket(newSocket);

        newSocket.on('reviewProcessed', (review) => {
            console.log('Received new review:', review);
            if (review && review.bestFitPersona) {
                setChartData((prevData) => {
                    setIsLoading(false);
                    setShowChart(true);

                    const newData = { ...prevData };
                    const personaIndex = review.bestFitPersona - 1;
                    const newDataset = { ...newData.datasets[0] };
                    const newDatasetData = [...newData.datasets[0].data];
                    newDatasetData[personaIndex]++;
                    newDataset.data = newDatasetData;
                    newData.datasets = [newDataset];

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

    console.log('account', account);
    console.log('chartData', chartData);

    return (
        <>
            <TopNav />
            {isLoading ? (
                <div className="w-full max-w-7xl bg-black">
                    {isLoading && (
                        <div className="fixed top-0 left-0 w-screen h-screen z-50 flex items-center justify-center">
                            <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
                        </div>
                    )}
                </div>
            ) : (
                <div className="bg-black min-h-screen text-white px-8 py-12 flex flex-col items-center justify-center">
                    {showChart ? (
                        <div className="w-full max-w-7xl">
                            <ProcessedReviewChart chartData={chartData} onCloseChart={() => setShowChart(false)} />
                        </div>
                    ) : (
                        account && (
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
                                                    setIsLoading={setIsLoading}
                                                />
                                            </ul>
                                        )}
                                        <ul className="py-2">
                                            <ScrapeRateMdsButton
                                                userId={user._id}
                                                accountId={account._id}
                                                setAccount={setAccount}
                                                setIsLoading={setIsLoading}
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
                        )
                    )}
                </div>
            )}
        </>
    );
}

export default AccountPage;
