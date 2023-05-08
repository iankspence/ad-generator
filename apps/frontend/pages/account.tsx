import React, { useContext, useState } from 'react';
import TopNav from '../components/TopNav';
import UserContext from '../contexts/UserContext';
import useAccount from '../hooks/useAccount';
import LogoUpload from '../components/LogoUpload';

export function AccountPage() {
    const { user } = useContext(UserContext);
    const { account } = useAccount(user?._id);
    const [primaryColor, setPrimaryColor] = useState(null);
    const [secondaryColor, setSecondaryColor] = useState(null);

    const handleColorsExtracted = (primary, secondary) => {
        setPrimaryColor(primary);
        setSecondaryColor(secondary);
        // Save the colors to the account document as needed
    };

    return (
        <>
            <TopNav />
            <div className="min-h-screen bg-reviewDrumLightGray flex items-center justify-center">
                <div className="text-reviewDrumDarkGray">
                    <h1 className="text-3xl font-semibold mb-8">Account Information</h1>
                    <div className="flex">
                        <div className="w-1/2">
                            <p className="font-semibold py-2">Google:</p>
                            <p className="font-semibold py-2">RateMDs:</p>
                        </div>
                        <div className="w-1/2">
                            {account ? (
                                account.googleQuery ? (
                                    <p className="py-2">{account.googleQuery}</p>
                                ) : (
                                    <p className="py-2">Not Connected</p>
                                )
                            ) : (
                                <br />
                            )}
                            {account ? (
                                account.rateMdsLinks?.[0] ? (
                                    <ul className="py-2 break-all">
                                        {account.rateMdsLinks.map((link, index) => (
                                            <li key={index}>{link}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="py-2">Not Connected</p>
                                )
                            ) : (
                                <br />
                            )}
                        </div>
                    </div>
                    <div className="flex mt-8">
                        <div className="w-full">
                            <p className="font-semibold py-2">Upload Logo:</p>
                            <LogoUpload onColorsExtracted={handleColorsExtracted} />
                            {primaryColor && secondaryColor && (
                                <div className="mt-4">
                                    <p className="font-semibold py-2">Extracted Colors:</p>
                                    <div className="flex">
                                        <div
                                            className="w-1/2 h-10 rounded"
                                            style={{ backgroundColor: `rgb(${primaryColor[0]}, ${primaryColor[1]}, ${primaryColor[2]})` }}
                                        ></div>
                                        <div
                                            className="w-1/2 h-10 rounded ml-4"
                                            style={{ backgroundColor: `rgb(${secondaryColor[0]}, ${secondaryColor[1]}, ${secondaryColor[2]})` }}
                                        ></div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AccountPage;
