import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Button, Typography, Box } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import userpool from '../userpool';
import { logout } from '../services/authenticate';
import axios from 'axios';

const Dashboard = () => {
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState('');
    const [fname, setFirstName] = useState('');
    const [lname, setLastName] = useState('');
    const [likedQuotes, setLikedQuotes] = useState([]);

    useEffect(() => {
        const currentUser = userpool.getCurrentUser();
        if (!currentUser) {
            navigate('/login');
        } else {
            setUserEmail(currentUser.username);
            fetchUserInfo(currentUser.username); 
        }
    }, [navigate]);

    useEffect(() => {
        if (userEmail) {
            fetchUserQuotes();
            fetchUserInfo();
        }
    }, [userEmail]);

    const fetchUserInfo = async () => {
        try {
            const response = await axios.post('http://localhost:8090/api/fetchUserInfo', { userId: userEmail }); 
            setFirstName(response.data.fname);
            setLastName(response.data.lname);
        } catch (error) {
            console.error('Error fetching user info:', error);
        }
    };

    const fetchUserQuotes = async () => {
        try {
            const response = await axios.post(`http://localhost:8090/api/getquotes`, { userId: userEmail });
            setLikedQuotes(response.data.quotes);
        } catch (error) {
            console.error('Error fetching user quotes:', error);
        }
    };

    const handleLogout = () => {
        logout();
    };

    const getRandomQuotes = () => {
        const shuffled = likedQuotes.sort(() => 0.5 - Math.random()); 
        const selectedQuotes = shuffled.slice(0, 10); 
        return selectedQuotes;
    };

    const selectedQuotes = getRandomQuotes();

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component={RouterLink} to="/" style={{ textDecoration: 'none', color: 'inherit', flexGrow: 1 }}>
                  
                    </Typography>
                    <Button color="inherit" component={RouterLink} to="/dashboard">Dashboard</Button>
                    <Button color="inherit" component={RouterLink} to="/userprofile">User Profile</Button>
                    <Button color="inherit" onClick={handleLogout}>Logout</Button>
                </Toolbar>
            </AppBar>
            <div className='Dashboard' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '64px' }}>
                <Typography variant='h4' style={{ margin: '20px' }}>Welcome, {fname} {lname}</Typography>
                <Box style={{ marginTop: '20px' }}>
                    <Typography variant='h6'>Your Randomly Selected Quotes:</Typography>
                    {selectedQuotes.map((quote, index) => (
                        <Box key={index} sx={{ border: 1, borderColor: 'primary.main', padding: '10px', margin: '10px', borderRadius: '5px' }}>
                            <Typography variant='body1'>{quote}</Typography>
                        </Box>
                    ))}
                </Box>
            </div>
        </>
    );
};

export default Dashboard;
