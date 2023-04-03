import TopNav from '../components/TopNav';
import userContext from '../contexts/UserContext';
import { createClinic, addClinicToUser } from '../utils/api';
import React, { useState, useContext } from 'react';

export function CreateClinicPage() {
    const { user } = useContext(userContext);
    const [errorMessage, setErrorMessage] = useState('');
    const [formData, setFormData] = useState({
        clinicName: '',
        contactName: '',
        contactRole: '',
        email: '',
        city: '',
        provinceState: '',
        country: '',
        googleLink: '',
        facebookLink: '',
        rateMDLinks: [],
        facebookAdAccount: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const newClinic = await createClinic(formData);
            await addClinicToUser(user._id, newClinic._id);
            alert('Clinic created successfully');
            window.location.href = '/clinic';
        } catch (error) {
            console.error('Error creating clinic:', error);
            setErrorMessage(error.message || 'An error occurred. Please try again later.');
        }
    };

    return (
        <>
            <TopNav />
            {errorMessage && <div className="bg-red-500 text-white px-4 py-2 mb-4 rounded">{errorMessage}</div>}
            <div className="bg-black min-h-screen text-white px-8 py-12 flex flex-col items-center justify-center">
                <h1 className="text-3xl mb-4 mt-4 text-center font-semibold">Create New Clinic</h1>
                <div className="w-full max-w-md mx-auto">
                    <form className="bg-gray-800 p-6 rounded shadow-md" onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm font-bold mb-2">Clinic Name</label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                name="clinicName"
                                value={formData.clinicName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-bold mb-2">Contact Name</label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                name="contactName"
                                value={formData.contactName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-bold mb-2">Contact Role</label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                name="contactRole"
                                value={formData.contactRole}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-bold mb-2">Email</label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-bold mb-2">City</label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-bold mb-2">Province/State</label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                name="provinceState"
                                value={formData.provinceState}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-bold mb-2">Country</label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-bold mb-2">Google Link</label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                name="googleLink"
                                value={formData.googleLink}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-bold mb-2">Facebook Link</label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                name="facebookLink"
                                value={formData.facebookLink}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-bold mb-2">RateMD Links</label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                name="rateMDLinks"
                                value={formData.rateMDLinks}
                                onChange={handleChange}
                            />
                        </div>

                        <button type="submit" className="bg-blue-500 py-2 px-4 rounded hover:bg-blue-600">
                            Create New Clinic
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default CreateClinicPage;
