import React, { useContext } from 'react';
import UserContext from '../contexts/UserContext';
import TopNav from '../components/TopNav';

export function AccountPage() {
    const { user } = useContext(UserContext);

    return (
        <>
            <TopNav />
            <div className="bg-black min-h-screen text-white px-8 py-12 flex flex-col items-center justify-center">
                <h1 className="text-6xl font-bold mt-16 mb-48">People love you, because you do great work.</h1>
                {user && (
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p>Clinic Name:</p>
                            <p>Name:</p>
                            <p>Email:</p>
                            <p>Phone:</p>
                            <p>Google Link(s):</p>
                            <p>Facebook Link(s):</p>
                            <p>Facebook Ad Account:</p>
                        </div>
                        <div>
                            <p>{user.clinicName}</p>
                            <p>{user.name}</p>
                            <p>{user.email}</p>
                            <p>{user.phone}</p>
                            <ul>
                                googleLinks
                                {/*{user.googleLinks.map((link, index) => (*/}
                                {/*    <li key={index}>*/}
                                {/*        <a href={link} target="_blank" rel="noopener noreferrer">*/}
                                {/*            {link}*/}
                                {/*        </a>*/}
                                {/*    </li>*/}
                                {/*))}*/}
                            </ul>
                            <ul>
                                facebookLinks
                                {/*{user.facebookLinks.map((link, index) => (*/}
                                {/*    <li key={index}>*/}
                                {/*        <a href={link} target="_blank" rel="noopener noreferrer">*/}
                                {/*            {link}*/}
                                {/*        </a>*/}
                                {/*    </li>*/}
                                {/*))}*/}
                            </ul>
                            <p>{user.facebookAdAccount}</p>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default AccountPage;
