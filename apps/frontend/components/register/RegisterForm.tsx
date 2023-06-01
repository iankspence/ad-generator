import React, { useEffect, useState } from 'react';
import { TextField, Button, IconButton, InputAdornment, Select, MenuItem, FormControl, InputLabel, OutlinedInput } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Country, State, City }  from 'country-state-city';

const RegisterForm = ({ formData, handleChange, handleSubmit, showPassword, setShowPassword }) => {
    const [passwordFieldType, setPasswordFieldType] = useState("password");
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [step, setStep] = useState(1);
    const [passwordError, setPasswordError] = useState('');
    const [emailError, setEmailError] = useState(''); // Added

    useEffect(() => {
        setPasswordFieldType(showPassword ? "text" : "password");
        const allCountries = Country.getAllCountries();
        const selectedCountries = allCountries.filter(country => country.isoCode === 'US' || country.isoCode === 'CA');
        setCountries(selectedCountries);
    }, [showPassword]);

    useEffect(() => {
        if (formData.country) {
            setStates(State.getStatesOfCountry(formData.country));
        }
    }, [formData.country]);

    useEffect(() => {
        if (formData.provinceState) {
            setCities(City.getCitiesOfState(formData.country, formData.provinceState));
        }
    }, [formData.provinceState]);

    const validateEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const handleNext = (e) => {
        e.preventDefault();
        if (formData.password.length < 8) {
            setPasswordError('Password should be at least 8 characters');
            return;
        }
        setPasswordError('');
        if (!validateEmail(formData.email)) {
            setEmailError('Invalid email address');
            return;
        }
        setEmailError('');
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
                                <MenuItem key={country.isoCode} value={country.isoCode}>{country.name}</MenuItem>
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
                            {states.map((state) => (
                                <MenuItem key={state.isoCode} value={state.isoCode}>{state.name}</MenuItem>
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
