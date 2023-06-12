import { register } from '../utils/api/mongo/user/register/registerApi';
import React, { useState } from 'react';
import RegisterForm from '../components/register/RegisterForm';
import RegisterSuccessPopup from '../components/register/RegisterSuccessPopup';
import { useRouter } from 'next/router';

export function RegisterPage() {
    const [formData, setFormData] = useState({
        companyName: '',
        email: '',
        password: '',
        country: '',
        city: '',
        provinceState: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const router = useRouter();

    const handleChange = (fieldName, fieldValue) => {
        setFormData(prevState => ({
            ...prevState,
            [fieldName]: fieldValue
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register({
                companyName: formData.companyName,
                email: formData.email,
                password: formData.password,
                roles: ['client'],
                country: formData.country,
                provinceState: formData.provinceState,
                city: formData.city,
            });
            setShowPopup(true);
        } catch (error) {
            console.error('Error registering:', error);
            setErrorMessage(error.message || 'An error occurred. Please try again later.');
        }
    };

    const closePopupAndRedirect = () => {
        setShowPopup(false);
        router.push('/sign-in')
    };

    return (
        <div>
            <div className="min-h-screen bg-reviewDrumLightGray flex flex-col items-center justify-start overflow-auto pt-8">
                <h1 className="text-3xl mb-4 mt-4 text-center font-semibold text-reviewDrumDarkGray">Register</h1>
                <RegisterForm
                    formData={formData}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                />
                <RegisterSuccessPopup open={showPopup} handleClose={closePopupAndRedirect} />
            </div>
        </div>
    );
}

export default RegisterPage;
