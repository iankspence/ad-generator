import TopNav from '../components/TopNav';
import ClinicContext from '../contexts/ClinicContext';
import UserContext from '../contexts/UserContext';
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';

export function ClinicPage() {
    const { user } = useContext(UserContext);
    const { clinics } = useContext(ClinicContext);
    const [selectedClinic, setSelectedClinic] = useState(clinics?.[0] || null);
    const router = useRouter();

    const handleCreateNewClinic = () => {
        router.push('/create-clinic');
    };

    console.log('Clinics: ', clinics);

    console.log('user', user);

    const handleSelectedClinicChange = (e) => {
        const selectedClinicId = e.target.value;
        const selectedClinic = clinics.find((clinic) => clinic._id === selectedClinicId);

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
                                    clinics.map((clinic) => (
                                        <option key={clinic._id} value={clinic._id}>
                                            {clinic.country}/{clinic.provinceState}/{clinic.city}/{clinic.clinicName}
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
                                    <p className="py-4">RateMDs Link(s):</p>
                                    <p className="py-4">Google Link:</p>
                                    <p className="py-4">Facebook Link:</p>
                                    <p className="py-4">Facebook Ad Account:</p>
                                </div>
                                <div>
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

                                    {selectedClinic.facebookAdAccount && selectedClinic ? (
                                        <ul>{selectedClinic.facebookAdAccount}</ul>
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
