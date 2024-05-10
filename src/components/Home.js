import React from 'react';
import { Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import backgroundImage from '../background.jpg'; 
const Home = () => {
    const Navigate = useNavigate();

    return (
        <Box
            sx={{
                position: 'relative', 
                height: '100vh',
                backgroundImage: `url(${backgroundImage})`, // Set the background image
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Transparent white background
                    padding: '30px',
                    borderRadius: '10px',
                    boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)',
                    textAlign: 'center',
                    maxWidth: '700px',
                   
                }}
            >
                <Typography variant='h3' sx={{ marginBottom: '30px', color: '#3f51b5', fontWeight: 'bold' }}>
                    INSPIRE AI Quotes
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                    }}
                >
                    <Button
                        variant='contained'
                        sx={{ backgroundColor: '#f44336', color: '#fff', '&:hover': { backgroundColor: '#d32f2f' } }}
                        onClick={() => Navigate('/signup')}
                    >
                        Signup
                    </Button>
                    <Button
                        variant='contained'
                        sx={{ backgroundColor: '#4caf50', color: '#fff', '&:hover': { backgroundColor: '#388e3c' } }}
                        onClick={() => Navigate('/login')}
                    >
                        Login
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default Home;
