import React, { useState } from 'react';
import { Button, TextField, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { authenticate } from '../services/authenticate';

const Login = () => {
    const Navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailErr, setEmailErr] = useState('');
    const [passwordErr, setPasswordErr] = useState('');
    const [loginErr, setLoginErr] = useState('');

    const formInputChange = (formField, value) => {
        if (formField === 'email') {
            setEmail(value);
        }
        if (formField === 'password') {
            setPassword(value);
        }
    };

    const validation = () => {
        return new Promise((resolve, reject) => {
            if (email === '' && password === '') {
                setEmailErr('Email is Required');
                setPasswordErr('Password is required');
                resolve({ email: 'Email is Required', password: 'Password is required' });
            } else if (email === '') {
                setEmailErr('Email is Required');
                resolve({ email: 'Email is Required', password: '' });
            } else if (password === '') {
                setPasswordErr('Password is required');
                resolve({ email: '', password: 'Password is required' });
            } else if (password.length < 6) {
                setPasswordErr('Password must be at least 6 characters long');
                resolve({ email: '', password: 'Password must be at least 6 characters long' });
            } else {
                resolve({ email: '', password: '' });
            }
        });
    };

    const handleClick = () => {
        setEmailErr('');
        setPasswordErr('');
        validation()
            .then((res) => {
                if (res.email === '' && res.password === '') {
                    authenticate(email, password)
                        .then((data) => {
                            setLoginErr('');
                            Navigate('/dashboard');
                        })
                        .catch((err) => {
                            console.log(err);
                            setLoginErr(err.message);
                        });
                }
            })
            .catch((err) => console.log(err));
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: '#f0f0f0',
            }}
        >
            <Box
                sx={{
                    backgroundColor: '#fff',
                    padding: '30px',
                    borderRadius: '10px',
                    boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)',
                    textAlign: 'center',
                }}
            >
                <Typography variant='h4' sx={{ marginBottom: '20px', color: '#007bff', fontWeight: 'bold' }}>
                    Login
                </Typography>
                <TextField
                    value={email}
                    onChange={(e) => formInputChange('email', e.target.value)}
                    label='Email'
                    variant='outlined'
                    fullWidth
                    sx={{ marginBottom: '20px' }}
                    error={emailErr !== ''}
                    helperText={emailErr}
                />
                <TextField
                    value={password}
                    onChange={(e) => formInputChange('password', e.target.value)}
                    type='password'
                    label='Password'
                    variant='outlined'
                    fullWidth
                    sx={{ marginBottom: '20px' }}
                    error={passwordErr !== ''}
                    helperText={passwordErr}
                />
                <Button
                    variant='contained'
                    onClick={handleClick}
                    sx={{ backgroundColor: '#007bff', color: '#fff', '&:hover': { backgroundColor: '#0056b3' } }}
                >
                    Login
                </Button>
                <Typography variant='body1' sx={{ color: 'red', marginTop: '10px' }}>{loginErr}</Typography>
            </Box>
        </Box>
    );
};

export default Login;
