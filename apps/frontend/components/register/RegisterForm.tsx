import React, { useEffect, useState } from 'react';
import { TextField, Button, IconButton, InputAdornment, Select, MenuItem, FormControl, InputLabel, OutlinedInput } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { getCountries } from '../../utils/api/mongo/country/getCountriesApi';
import { findProvinceStateByCountryApi } from '../../utils/api/mongo/province-state/findProvinceStateByCountryApi';
import { findCitiesByProvinceStateApi } from '../../utils/api/mongo/city/findCitiesByProvinceStateApi';

const RegisterForm = ({ formData, handleChange, handleSubmit, showPassword, setShowPassword }) => {
    const [passwordFieldType, setPasswordFieldType] = useState("password");
    const [countries, setCountries] = useState([]);
    const [provinceStates, setProvinceStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [step, setStep] = useState(1);
    const [passwordError, setPasswordError] = useState('');
    const [emailError, setEmailError] = useState('');

    useEffect(() => {
        setPasswordFieldType(showPassword ? "text" : "password");
    }, [showPassword]);

    useEffect(() => {
        // Fetch the countries when the component mounts
        const fetchCountries = async () => {
            try {
                const countries = await getCountries();
                setCountries(countries);
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        };
        fetchCountries();
    }, []);

    useEffect(() => {
        if (formData.country) {
            const fetchStates = async () => {
                try {
                    const provinceStates = await findProvinceStateByCountryApi(formData.country);
                    console.log('provinceStates:', provinceStates);
                    console.log('formData:', formData);
                    setProvinceStates(provinceStates);
                } catch (error) {
                    console.error('Error fetching states:', error);
                }
            };
            fetchStates();
        }
    }, [formData.country]);

    useEffect(() => {
        if (formData.provinceState) {
            const fetchCities = async () => {
                try {
                    const cities = await findCitiesByProvinceStateApi(formData.provinceState);
                    setCities(cities);
                } catch (error) {
                    console.error('Error fetching cities:', error);
                }
            };
            fetchCities();
        }
    }, [formData.provinceState]);

    // const validateEmail = (email) => {
    //     const re = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //     return re.test(String(email).toLowerCase());
    // }

    const handleNext = (e) => {

        e.preventDefault();
        if (formData.password.length < 8) {
            setPasswordError('Password should be at least 8 characters');
            return;
        }
        setPasswordError('');
        // if ( formData.email.length < 4 ) { {// !validateEmail(formData.email)) {{
        //     setEmailError('Invalid email address');
        //     return;
        // }

        // setEmailError('');
        setStep(step + 1);
    }

    const handleBack = (e) => {
        e.preventDefault();
        setStep(step - 1);
    }
    return (
        <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto mt-4 bg-white p-8 rounded-lg shadow-lg">
            {step === 1 && (
                <>
                    <TextField
                        fullWidth
                        label="Company Name"
                        name="companyName"
                        required
                        value={formData.companyName}
                        onChange={(event) => handleChange('companyName', event.target.value)}
                        autoComplete="false"
                    />

                    <div className="mb-4"></div>

                    <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        required
                        type="email"
                        value={formData.email}
                        onChange={(event) => handleChange('email', event.target.value)}
                        error={!!emailError}
                        helperText={emailError}
                        autoComplete="false"
                    />

                    <div className="mb-4"></div>

                    <TextField
                        fullWidth
                        label="Password"
                        type={passwordFieldType}
                        name="password"
                        required
                        value={formData.password}
                        onChange={(event) => handleChange('password', event.target.value)}
                        error={!!passwordError}
                        helperText={passwordError}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        autoComplete="false"
                    />

                    <div className="mb-4"></div>
                    <Button type="button" variant="contained" color="inherit" className="w-full" onClick={handleNext}>
                        Next
                    </Button>
                </>
            )}

            {step === 2 && (
                <>
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel>Country</InputLabel>
                        <Select
                            name="country"
                            value={formData.country || ""}
                            onChange={(event) => handleChange('country', event.target.value)}
                            input={<OutlinedInput label="Country"/>}
                            autoComplete="false"
                        >
                            {countries.map((country) => (
                                <MenuItem key={country.name} value={country.name}>{country.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <div className="mb-4"></div>

                    <FormControl variant="outlined" fullWidth>
                        <InputLabel>Province/State</InputLabel>
                        <Select
                            name="provinceState"
                            value={formData.provinceState || ""}
                            onChange={(event) => handleChange('provinceState', event.target.value)}
                            input={<OutlinedInput label="Province/State"/>}
                            autoComplete="false"
                        >
                            {provinceStates.map((provinceState) => (
                                <MenuItem key={provinceState.name} value={provinceState.name}>{provinceState.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <div className="mb-4"></div>

                    <FormControl variant="outlined" fullWidth>
                        <InputLabel>City</InputLabel>
                        <Select
                            name="city"
                            value={formData.city || ""}
                            onChange={(event) => handleChange('city', event.target.value)}
                            input={<OutlinedInput label="City"/>}
                            autoComplete="false"
                        >
                            {cities.map((city) => (
                                <MenuItem key={city.name} value={city.name}>{city.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <div className="mb-4"></div>
                    <Button type="button" variant="contained" color="inherit" className="w-1/2" onClick={handleBack}>
                        Back
                    </Button>
                    <Button type="submit" variant="contained" color="inherit" className="w-1/2">
                        Register
                    </Button>

                </>
            )}
        </form>
    );
};

export default RegisterForm;
