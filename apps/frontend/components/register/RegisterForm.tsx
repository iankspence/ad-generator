import React, { useEffect, useState } from 'react';
import { TextField, Button, IconButton, InputAdornment, Select, MenuItem, FormControl, InputLabel, OutlinedInput } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Country, State, City }  from 'country-state-city';

export async function getStaticProps() {
    const allCountries = Country.getAllCountries();
    const selectedCountries = allCountries.filter(country => country.isoCode === 'US' || country.isoCode === 'CA');

    // get states and cities for each country
    const countriesWithStatesAndCities = selectedCountries.map(country => {
        const states = State.getStatesOfCountry(country.isoCode);
        const cities = City.getCitiesOfCountry(country.isoCode);

        return {
            ...country,
            states,
            cities
        }
    });

    return {
        props: {
            countries: countriesWithStatesAndCities
        }
    }
}

const RegisterForm = ({ formData, handleChange, handleSubmit, showPassword, setShowPassword, countries }) => {
    const [passwordFieldType, setPasswordFieldType] = useState("password");
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [step, setStep] = useState(1);
    const [passwordError, setPasswordError] = useState('');
    const [emailError, setEmailError] = useState('');

    useEffect(() => {
        setPasswordFieldType(showPassword ? "text" : "password");
    }, [showPassword]);

    useEffect(() => {
        if (formData.country) {
            const selectedCountry = countries.find(country => country.isoCode === formData.country);
            setStates(selectedCountry ? selectedCountry.states : []);
        }
    }, [formData.country, countries]);

    useEffect(() => {
        if (formData.provinceState) {
            const selectedCountry = countries.find(country => country.isoCode === formData.country);
            const selectedState = selectedCountry.states.find(state => state.isoCode === formData.provinceState);
            setCities(selectedState ? selectedState.cities : []);
        }
    }, [formData.provinceState, countries]);


    const validateEmail = (email) => {
        const re = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
