import TopNav from '../components/TopNav';
import SelectedClinicContext from '../contexts/SelectedClinicContext';
import UserContext from '../contexts/UserContext';
import { deleteClinic, getClinics } from '../utils/api';
import { useRouter } from 'next/router';
import React, { useContext, useState, useEffect } from 'react';

export function ClinicPage() {
    const router = useRouter();
    const { user } = useContext(UserContext);
    const { selectedClinic, setSelectedClinic } = useContext(SelectedClinicContext);
    const [clinics, setClinics] = useState([]);
    const [showRateMDsForm, setShowRateMDsForm] = useState(false);
    const [rateMDsLink, setRateMDsLink] = useState('');

    useEffect(() => {
        if (user) {
            getClinics(user._id).then(
                (data) => {
                    setClinics(data);
                    if (data.length > 0) {
                        setSelectedClinic(data?.[0]);
                    }
                },
                (error) => {
                    console.log('Error: ', error);
                },
            );
        } else {
            setClinics(clinics);
        }
    }, [user]);

    const toggleRateMDsForm = () => {
        setShowRateMDsForm(!showRateMDsForm);
    };

    const handleRateMDsSubmit = async () => {
        // Add API call here to update the Clinic document with the new RateMDs link
        // Then update the selectedClinic state with the updated clinic data

        // Hide the form after submission
        setShowRateMDsForm(false);
    };
    const handleCreateNewClinic = () => {
        router.push('/create-clinic');
    };

    const handleSelectedClinicChange = (e) => {
        const selectedClinicId = e.target.value;
        const selectedClinic = clinics.find((clinic) => clinic._id === selectedClinicId);

        setSelectedClinic(selectedClinic);
    };

    const handleDeleteClinic = async () => {
        if (!selectedClinic) return;
        if (confirm('Are you sure you want to delete this clinic?')) {
            await deleteClinic(selectedClinic._id);
            getClinics(user._id).then(
                (data) => {
                    setClinics(data);
                    if (data.length > 0) {
                        setSelectedClinic(data?.[0]);
                    }
                },
                (error) => {
                    console.log('Error: ', error);
                },
            );
        }
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
                                {clinics &&
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
                            {selectedClinic && (
                                <button
                                    className="border border-red-500 text-white bg-black py-2 px-4 rounded hover:bg-red-600 ml-4"
                                    onClick={handleDeleteClinic}
                                >
                                    Delete Clinic
                                </button>
                            )}
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
                                        {showRateMDsForm ? (
                                            <>
                                                <input
                                                    type="text"
                                                    value={rateMDsLink}
                                                    onChange={(e) => setRateMDsLink(e.target.value)}
                                                    className="bg-gray-800 text-white py-2 px-4 rounded"
                                                />
                                                <button
                                                    className="bg-blue-500 py-2 px-4 rounded hover:bg-blue-600 ml-2"
                                                    onClick={handleRateMDsSubmit}
                                                >
                                                    Submit
                                                </button>
                                            </>
                                        ) : (
                                            <button
                                                className="bg-blue-500 py-2 px-4 rounded hover:bg-blue-600"
                                                onClick={toggleRateMDsForm}
                                            >
                                                Add RateMDs Link
                                            </button>
                                        )}
                                    </ul>
                                    {selectedClinic.googleLink && selectedClinic ? (
                                        <ul className="py-4">{selectedClinic.googleLink}</ul>
                                    ) : (
                                        <ul className="py-2">
                                            <button className="bg-blue-500 py-2 px-4 rounded hover:bg-blue-600">
                                                Add Google Link
                                            </button>
                                        </ul>
                                    )}
                                    {selectedClinic.facebookLink && selectedClinic ? (
                                        <ul className="py-4">{selectedClinic.facebookLink}</ul>
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
