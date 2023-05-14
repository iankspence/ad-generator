import React, { useState } from 'react';
import LogoUpload from './LogoUpload';

export default function AccountInfo({ account }) {
    const [primaryColor, setPrimaryColor] = useState(null);
    const [secondaryColor, setSecondaryColor] = useState(null);

    const handleColorsExtracted = (primary, secondary) => {
        setPrimaryColor(primary);
        setSecondaryColor(secondary);
    };

    return (
        <>
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
            {account && (
                <div className="flex mt-8">
                    <div className="w-full">
                        <p className="font-semibold py-2">Upload Logo:</p>
                        <LogoUpload
                            onColorsExtracted={handleColorsExtracted}
                            accountId={account._id}
                            initialLogo={account?.logo}
                            initialPrimaryColor={account?.primaryColor}
                            initialSecondaryColor={account?.secondaryColor}
                        />
                        {(account?.logo && primaryColor && secondaryColor) && (
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
            )}
        </>
    );
}


