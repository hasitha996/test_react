import React, { useState } from 'react';
import { Button, TextField, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';
import userpool from '../userpool';

const Signup = () => {
    const Navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailErr, setEmailErr] = useState('');
    const [passwordErr, setPasswordErr] = useState('');

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
                    const attributeList = [];
                    attributeList.push(
                        new CognitoUserAttribute({
                            Name: 'email',
                            Value: email,
                        })
                    );
                    let username = email;
                    userpool.signUp(username, password, attributeList, null, (err, data) => {
                        if (err) {
                            console.log(err);
                            alert("Couldn't sign up");
                        } else {
                            console.log(data);
                            alert('User Added Successfully');
                            Navigate('/dashboard');
                        }
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
                    Sign Up
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
                    Sign Up
                </Button>
            </Box>
        </Box>
    );
};

export default Signup;
