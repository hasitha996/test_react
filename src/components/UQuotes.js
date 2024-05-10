import React, { useState } from 'react';
import { TextField, Button, Typography, Box, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import axios from 'axios';
import { Link as RouterLink } from 'react-router-dom';

const UQuotes = () => {
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [qtype, setQtype] = useState('');
    const [quote, setQuote] = useState('');

    const handleSave = async () => {
        try {
            await axios.post('http://localhost:8090/api/saveQuotes', {
                qtype: qtype,
                quote: quote
            });
            console.log('Quotes saved successfully.');
            setSaveSuccess(true);
        } catch (error) {
            console.error('Error saving Quotes:', error);
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
                <Typography variant="h4" style={{ marginBottom: '20px', color: '#007bff' }}>Add Your Quotes</Typography>

                <FormControl fullWidth sx={{ marginBottom: '20px' }}>
                    <InputLabel id="qtype-label">Select Type</InputLabel>
                    <Select
                        labelId="qtype-label"
                        id="qtype"
                        value={qtype}
                        label="Select Type"
                        onChange={(e) => setQtype(e.target.value)}
                    >
                        <MenuItem value="nature">Nature</MenuItem>
                        <MenuItem value="animal">Animal</MenuItem>
                        <MenuItem value="happy">Happy</MenuItem>
                        <MenuItem value="sad">Sad</MenuItem>
                    </Select>
                </FormControl>

                <TextField
                    label="Quote"
                    fullWidth
                    sx={{ marginBottom: '20px' }}
                    value={quote}
                    onChange={(e) => setQuote(e.target.value)}
                />

                <Button variant="contained" color="primary" style={{ width: '15%', marginBottom: '20px', marginRight: '10px' }} onClick={handleSave}>
                    Save
                </Button>
                {saveSuccess && <Typography variant="body1" style={{ color: 'green' }}>Quotes saved successfully.</Typography>}
                <RouterLink to="/dashboard" style={{ textDecoration: 'none', marginRight: '10px' }}>
                    <Button variant="contained" color="secondary" style={{ width: '30%', marginBottom: '20px' }}>
                        Dashboard
                    </Button>
                </RouterLink>
                <RouterLink to="/UserProfile" style={{ textDecoration: 'none', marginRight: '10px' }}>
                    <Button variant="contained" color="secondary" style={{ width: '30%', marginBottom: '20px' }}>
                        User Profile
                    </Button>
                </RouterLink>
            </Box>
        </Box>
    );
};

export default UQuotes;
