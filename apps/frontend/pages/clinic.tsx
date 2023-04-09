import TopNav from '../components/TopNav';
import SelectedClinicContext from '../contexts/SelectedClinicContext';
import UserContext from '../contexts/UserContext';
import {
    deleteClinic,
    getClinics,
    getGoogleMapsReviews,
    startRobotJob,
    updateClinicFacebookLink,
    updateClinicGoogleLink,
    updateClinicRateMdsLinks,
} from '../utils/api';
import { useRouter } from 'next/router';
import React, { useContext, useState, useEffect } from 'react';

export function ClinicPage() {
    const router = useRouter();
    const { user } = useContext(UserContext);
    const { selectedClinic, setSelectedClinic } = useContext(SelectedClinicContext);
    const [clinics, setClinics] = useState([]);
    const [showRateMDsForm, setShowRateMDsForm] = useState(false);
    const [rateMdsLink, setRateMdsLink] = useState('');

    const [showGoogleQueryForm, setShowGoogleQueryForm] = useState(false);
    const [googleQuery, setGoogleQuery] = useState('');

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

    const handleRateMdsSubmit = async () => {
        if (!selectedClinic || !rateMdsLink) return;

        const confirmationMessage =
            'Submitting this link will run a web scraper to collect all of the reviews on this platform. Do you still want to proceed?';
        const userConfirmed = window.confirm(confirmationMessage);

        if (userConfirmed) {
            try {
                const updatedClinic = await updateClinicRateMdsLinks(selectedClinic._id, rateMdsLink);
                setSelectedClinic(updatedClinic);

                await startRobotJob(
                    user._id.toString(),
                    selectedClinic._id.toString(),
                    process.env.NEXT_PUBLIC_BROWSE_AI_RATE_MDS_HEADER_ROBOT,
                    rateMdsLink,
                );
                // Hide the form after submission
                setShowRateMDsForm(false);
            } catch (error) {
                console.error('Error updating RateMDs Link:', error);
            }
        }
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

    const handleGoogleQuerySubmit = async () => {
        if (!selectedClinic || !googleQuery) return;

        const confirmationMessage =
            'Submitting this query will fetch all of the Google Maps reviews for the specified location. Do you still want to proceed?';
        const userConfirmed = window.confirm(confirmationMessage);

        if (userConfirmed) {
            try {
                const reviews = await getGoogleMapsReviews(user._id, selectedClinic._id._id, googleQuery);
                // Process the reviews data as needed
                console.log('Fetched Google Maps reviews:', reviews);

                // Hide the form after submission
                setShowGoogleQueryForm(false);
            } catch (error) {
                console.error('Error fetching Google Maps Reviews:', error);
            }
        }
    };

    const toggleGoogleQueryForm = () => {
        setShowGoogleQueryForm(!showGoogleQueryForm);
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
                                    <p className="py-4">Google Query:</p>
                                    <p className="py-4">RateMDs Link(s):</p>
                                </div>
                                <div>
                                    {selectedClinic.googleLink && selectedClinic ? (
                                        <ul className="py-4">{selectedClinic.googleLink}</ul>
                                    ) : (
                                        <ul className="py-2">
                                            {showGoogleQueryForm && (
                                                <div className="flex justify-between py-2">
                                                    <input
                                                        type="text"
                                                        value={googleQuery}
                                                        onChange={(e) => setGoogleQuery(e.target.value)}
                                                        className="bg-gray-800 text-white py-2 px-4 rounded"
                                                    />
                                                    <button
                                                        className="bg-red-500 py-2 px-4 rounded hover:bg-red-600"
                                                        onClick={toggleGoogleQueryForm}
                                                    >
                                                        Hide
                                                    </button>
                                                    <button
                                                        className="bg-blue-500 py-2 px-4 rounded hover:bg-blue-600 ml-2"
                                                        onClick={handleGoogleQuerySubmit}
                                                    >
                                                        Submit
                                                    </button>
                                                </div>
                                            )}
                                            {!showGoogleQueryForm && (
                                                <button
                                                    className="bg-blue-500 py-2 px-4 rounded hover:bg-blue-600"
                                                    onClick={toggleGoogleQueryForm}
                                                >
                                                    Add Google Query
                                                </button>
                                            )}
                                        </ul>
                                    )}
                                    <ul className="py-2">
                                        {showRateMDsForm && (
                                            <div className="flex justify-between py-2">
                                                <input
                                                    type="text"
                                                    value={rateMdsLink}
                                                    onChange={(e) => setRateMdsLink(e.target.value)}
                                                    className="bg-gray-800 text-white py-2 px-4 rounded"
                                                />
                                                <button
                                                    className="bg-red-500 py-2 px-4 rounded hover:bg-red-600"
                                                    onClick={toggleRateMDsForm}
                                                >
                                                    Hide
                                                </button>
                                                <button
                                                    className="bg-blue-500 py-2 px-4 rounded hover:bg-blue-600 ml-2"
                                                    onClick={handleRateMdsSubmit}
                                                >
                                                    Submit
                                                </button>
                                            </div>
                                        )}
                                        {!showRateMDsForm && (
                                            <button
                                                className="bg-blue-500 py-2 px-4 rounded hover:bg-blue-600"
                                                onClick={toggleRateMDsForm}
                                            >
                                                Add RateMDs Link
                                            </button>
                                        )}
                                    </ul>
                                    {selectedClinic.rateMdsLinks?.[0] && selectedClinic && (
                                        <ul className="py-2">
                                            {selectedClinic.rateMdsLinks.map((link, index) => (
                                                <li key={index}>{link}</li>
                                            ))}
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
