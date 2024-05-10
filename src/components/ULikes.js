import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Box, FormControlLabel, Checkbox } from '@mui/material';
import userpool from '../userpool';
import axios from 'axios';
import { Link as RouterLink } from 'react-router-dom';

const ULikes = () => {
    const [userEmail, setUserEmail] = useState('');
    const [saveSuccess, setSaveSuccess] = useState(false);

    const [nature, setNature] = useState(false);
    const [animal, setAnimal] = useState(false);
    const [sad, setSad] = useState(false);
    const [happy, setHappy] = useState(false);

    useEffect(() => {
        const currentUser = userpool.getCurrentUser();
        setUserEmail(currentUser.username);
    }, []);

    const handleSave = async () => {
        try {
            await axios.post('http://localhost:8080/api/saveLikes', {
                userId: userEmail,
                nature: nature,
                animal: animal,
                sad: sad,
                happy: happy
            });
            console.log('Likes saved successfully.');
            setSaveSuccess(true);

             // Reset checkbox values
        setNature(false);
        setAnimal(false);
        setSad(false);
        setHappy(false);
        // Refresh component
        setUserEmail('');
       

        } catch (error) {
            console.error('Error saving likes:', error);
        }
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
                <Typography variant="h4" style={{ marginBottom: '20px', color: '#007bff' }}>Add Your Likes</Typography>
                <TextField
                    label="User ID"
                    value={userEmail}
                    disabled
                    fullWidth
                    sx={{ marginBottom: '20px' }}
                />
                <Button variant="contained" color="primary" style={{ width: '15%', marginBottom: '20px', marginRight: '10px' }} onClick={handleSave}>
                    Save
                </Button>
                {saveSuccess && <Typography variant="body1" style={{ color: 'green' }}>Likes saved successfully.</Typography>}
                <RouterLink to="/dashboard" style={{ textDecoration: 'none', marginRight: '10px' }}>
                    <Button variant="contained" color="secondary" style={{ width: '15%', marginBottom: '20px' }}>
                        Dashboard
                    </Button>
                </RouterLink>
                <RouterLink to="/UserProfile" style={{ textDecoration: 'none', marginRight: '10px' }}>
                    <Button variant="contained" color="secondary" style={{ width: '15%', marginBottom: '20px' }}>
                        User Profile
                    </Button>
                </RouterLink>

                <RouterLink to="/UQuotes" style={{ textDecoration: 'none', marginRight: '10px' }}>
                    <Button variant="contained" color="secondary" style={{ width: '15%', marginBottom: '20px' }}>
                        Add Quotes
                    </Button>
                </RouterLink>

                <FormControlLabel
                    control={<Checkbox checked={nature} onChange={(e) => setNature(e.target.checked)} />}
                    label="Nature"
                    style={{ marginRight: '10px' }}
                />
                <FormControlLabel
                    control={<Checkbox checked={animal} onChange={(e) => setAnimal(e.target.checked)} />}
                    label="Animal"
                    style={{ marginRight: '10px' }}
                />
                <FormControlLabel
                    control={<Checkbox checked={sad} onChange={(e) => setSad(e.target.checked)} />}
                    label="Sad"
                    style={{ marginRight: '10px' }}
                />
                <FormControlLabel
                    control={<Checkbox checked={happy} onChange={(e) => setHappy(e.target.checked)} />}
                    label="Happy"
                />
            </Box>
        </Box>
    );
};

export default ULikes;
