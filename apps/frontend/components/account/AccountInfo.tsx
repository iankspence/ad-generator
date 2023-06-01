import React, {useContext } from 'react';
import LogoUpload from './LogoUpload';
import UserContext from "../../contexts/UserContext";

export default function AccountInfo() {
    const { account } = useContext(UserContext);

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
                <div className="flex mt-2">
                    <div className="w-full">
                        <LogoUpload />
                    </div>
                </div>
            )}
        </>
    );
}


