import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import userpool from '../userpool';
import axios from 'axios';
import { Link as RouterLink } from 'react-router-dom';


const UserProfile = () => {
    const [userEmail, setUserEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        const currentUser = userpool.getCurrentUser();
        setUserEmail(currentUser.username);
    }, []);

    const handleSave = async () => {
        try {
            await axios.post('http://localhost:8080/api/createProfile', { userId: userEmail, firstName, lastName });
            console.log('User profile saved successfully.');
            setSaveSuccess(true);
            setEditMode(false); 
            setFirstName('');
            setLastName('');
        } catch (error) {
            console.error('Error saving user:', error);
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
                <Typography variant="h4" style={{ marginBottom: '20px', color: '#007bff' }}>User Profile</Typography>
                <TextField
                    label="User ID"
                    value={userEmail}
                    disabled
                    fullWidth
                    sx={{ marginBottom: '20px' }}
                />
                <TextField
                    label="First Name"
                    fullWidth
                    sx={{ marginBottom: '20px' }}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    disabled={!editMode} // Disable if not in edit mode
                />
                <TextField
                    label="Last Name"
                    fullWidth
                    sx={{ marginBottom: '20px' }}
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    disabled={!editMode} // Disable if not in edit mode
                />
                {!editMode && (
                    <Button variant="contained" color="primary" style={{ width: '15%', marginBottom: '20px' ,marginRight: '10px' }} onClick={() => setEditMode(true)}>
                        Edit
                    </Button>
                )}
                {editMode && (
                    <Button variant="contained" color="primary" style={{ width: '15%', marginBottom: '20px', marginRight: '10px'  }} onClick={handleSave}>
                        Save
                    </Button>
                )}
                {!editMode && (
                    <Button variant="contained" color="primary" style={{ width: '15%', marginBottom: '20px' ,marginRight: '10px' }} onClick={() => {setEditMode(true); setFirstName(''); setLastName(''); setSaveSuccess(false);}}>
                        Add
                    </Button>
                )}
                {saveSuccess && <Typography variant="body1" style={{ color: 'green' }}>User profile saved successfully.</Typography>}
              

                <RouterLink to="/dashboard" style={{ textDecoration: 'none' }}>
                    <Button variant="contained" color="secondary" style={{ width: '15%', marginBottom: '20px', marginRight: '10px' }}>
                        Dashboard
                    </Button>
                </RouterLink>

                <RouterLink to="/Ulikes" style={{ textDecoration: 'none' }}> 
                    <Button variant="contained" color="secondary" style={{ width: '15%', marginBottom: '20px', marginRight: '10px' }}>
                      interesting
                    </Button>
                </RouterLink>
            </Box>
        </Box>
    );
};

export default UserProfile;
