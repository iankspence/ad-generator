import TopNav from '../components/TopNav';
import UserContext from '../contexts/UserContext';
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';

export function ClinicPage() {
    const { user } = useContext(UserContext);
    const [selectedClinic, setSelectedClinic] = useState(user?.clinicIds?.[0] || null);
    const router = useRouter();

    const handleCreateNewClinic = () => {
        router.push('/create-clinic');
    };

    console.log(user);

    const handleSelectedClinicChange = (e) => {
        const selectedClinicId = e.target.value;
        const selectedClinic = user.clinicIds.find((clinic) => clinic._id.toString() === selectedClinicId);
        setSelectedClinic(selectedClinic);
    };

    return (
        <>
            <TopNav />
            <div className="bg-black min-h-screen text-white px-8 py-12 flex flex-col items-center justify-center">
                {user && (
                    <>
                        <div className="flex items-center pb-4">
                            <select
                                className="bg-gray-800 text-white px-4 py-2 rounded"
                                onChange={handleSelectedClinicChange}
                            >
                                {user.clinicIds &&
                                    user.clinicIds.map((clinicId, index) => (
                                        <option key={index} value={clinicId.toString()}>
                                            {clinicId.toString()}
                                        </option>
                                    ))}
                            </select>
                            <button
                                className="bg-blue-500 py-2 px-4 rounded hover:bg-blue-600 ml-4"
                                onClick={handleCreateNewClinic}
                            >
                                Create New Clinic
                            </button>
                        </div>
                        {selectedClinic && (
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="py-4">Google Link:</p>
                                    <p className="py-4">Facebook Link:</p>
                                    <p className="py-4">RateMDs Link(s):</p>
                                    <p className="py-4">Facebook Ad Account:</p>
                                </div>
                                <div>
                                    {selectedClinic.googleLink && selectedClinic ? (
                                        <ul>{selectedClinic.googleLink}</ul>
                                    ) : (
                                        <ul className="py-2">
                                            <button className="bg-blue-500 py-2 px-4 rounded hover:bg-blue-600">
                                                Add Google Link
                                            </button>
                                        </ul>
                                    )}
                                    {selectedClinic.facebookLink && selectedClinic ? (
                                        <ul>{selectedClinic.facebookLink}</ul>
                                    ) : (
                                        <ul className="py-2">
                                            <button className="bg-blue-500 py-2 px-4 rounded hover:bg-blue-600">
                                                Add Facebook Link
                                            </button>
                                        </ul>
                                    )}
                                    {selectedClinic.rateMDLinks && selectedClinic && (
                                        <ul className="py-2">
                                            {selectedClinic.rateMDLinks.map((link, index) => (
                                                <li key={index}>{link}</li>
                                            ))}
                                        </ul>
                                    )}
                                    <ul className="py-2">
                                        <button className="bg-blue-500 py-2 px-4 rounded hover:bg-blue-600">
                                            Add RateMDs Link
                                        </button>
                                    </ul>

                                    {selectedClinic.facebookAdAccount && selectedClinic ? (
                                        <p>{selectedClinic.facebookAdAccount}</p>
                                    ) : (
                                        <ul className="py-2">
                                            <button className="bg-blue-500 py-2 px-4 rounded hover:bg-blue-600">
                                                Connect Facebook Ad Account
                                            </button>
                                        </ul>
                                    )}
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </>
    );
}

export default ClinicPage;
