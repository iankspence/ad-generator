import TopNav from '../components/TopNav';
import UserContext from '../contexts/UserContext';
import React, { useContext } from 'react';

export function ClinicPage() {
    const { user } = useContext(UserContext);

    return (
        <>
            <TopNav />
            <div className="bg-black min-h-screen text-white px-8 py-12 flex flex-col items-center justify-center">
                {user && (
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p>Clinic Name:</p>
                            <p>Name:</p>
                            <p>Email:</p>
                            <p>Phone:</p>
                            <p>Google Link:</p>
                            <p>Facebook Link:</p>
                            <p>RateMDs Link(s):</p>
                            <p>Facebook Ad Account:</p>
                        </div>
                        <div>
                            <p>{user.clinicName}</p>
                            <p>{user.name}</p>
                            <p>{user.email}</p>
                            <p>{user.phone}</p>
                            <ul>googleLink</ul>
                            <ul>facebookLink</ul>
                            <ul>rateMdsLink</ul>
                            <p>{user.facebookAdAccount}</p>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default ClinicPage;
