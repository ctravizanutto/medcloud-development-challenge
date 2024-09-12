import { useState, ChangeEvent, FormEvent } from 'react';
import { Grid, FormLabel, OutlinedInput, Button } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

// Define types for the form data and errors
interface FormData {
    name: string;
    email: string;
    birthday: dayjs.Dayjs | null;
    address: string;
    number: string;
    city: string;
    state: string;
    cep: string;
}

interface FormErrors {
    name?: string;
    email?: string;
    birthday?: string;
    address?: string;
    number?: string;
    city?: string;
    state?: string;
    cep?: string;
}

export default function PatientForm() {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        birthday: null,
        address: '',
        number: '',
        city: '',
        state: '',
        cep: ''
    });
    const [errors, setErrors] = useState<FormErrors>({});

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleDateChange = (date: dayjs.Dayjs | null) => {
        setFormData(prev => ({ ...prev, birthday: date }));
    };

    const validate = (): boolean => {
        const tempErrors: FormErrors = {};
        if (!formData.name) tempErrors.name = 'Name is required';
        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = 'Valid email is required';
        if (!formData.birthday) tempErrors.birthday = 'Birthday is required';
        if (!formData.address) tempErrors.address = 'Address is required';
        if (!formData.number || isNaN(Number(formData.number))) tempErrors.number = 'Valid number is required';
        if (!formData.city) tempErrors.city = 'City is required';
        if (!formData.state) tempErrors.state = 'State is required';
        if (!formData.cep || formData.cep.length !== 8) tempErrors.cep = 'Valid CEP is required';

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validate()) {
            // Handle form submission here
            console.log('Form submitted:', formData);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <FormLabel htmlFor="name" required>Name</FormLabel>
                    <OutlinedInput
                        id="name"
                        name="name"
                        type="text"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        size="small"
                        error={!!errors.name}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormLabel htmlFor="email" required>Email</FormLabel>
                    <OutlinedInput
                        id="email"
                        name="email"
                        type="email"
                        placeholder="example@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        size="small"
                        error={!!errors.email}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormLabel required>Birthday</FormLabel>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            value={formData.birthday}
                            onChange={handleDateChange}

                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormLabel htmlFor="address" required>Address</FormLabel>
                    <OutlinedInput
                        id="address"
                        name="address"
                        type="text"
                        placeholder="Apartment, suite, unit, etc."
                        value={formData.address}
                        onChange={handleChange}
                        size="small"
                        error={!!errors.address}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormLabel htmlFor="number" required>Number</FormLabel>
                    <OutlinedInput
                        id="number"
                        name="number"
                        type="text"
                        placeholder="Number"
                        value={formData.number}
                        onChange={handleChange}
                        size="small"
                        error={!!errors.number}
                    />
                </Grid>
                <Grid item xs={6}>
                    <FormLabel htmlFor="city" required>City</FormLabel>
                    <OutlinedInput
                        id="city"
                        name="city"
                        type="text"
                        placeholder="New York"
                        value={formData.city}
                        onChange={handleChange}
                        size="small"
                        error={!!errors.city}
                    />
                </Grid>
                <Grid item xs={6}>
                    <FormLabel htmlFor="state" required>State</FormLabel>
                    <OutlinedInput
                        id="state"
                        name="state"
                        type="text"
                        placeholder="NY"
                        value={formData.state}
                        onChange={handleChange}
                        size="small"
                        error={!!errors.state}
                    />
                </Grid>
                <Grid item xs={6}>
                    <FormLabel htmlFor="cep" required>CEP</FormLabel>
                    <OutlinedInput
                        id="cep"
                        name="cep"
                        type="text"
                        placeholder="12345"
                        value={formData.cep}
                        onChange={handleChange}
                        size="small"
                        error={!!errors.cep}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button type="submit" variant="contained">Submit</Button>
                </Grid>
            </Grid>
        </form>
    );
}
