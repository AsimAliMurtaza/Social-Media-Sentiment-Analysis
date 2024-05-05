import React, { useState } from 'react';
import { Card, CardContent, Container, Typography, TextField, Button, Select, MenuItem } from '@mui/material';

const MainPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [platform, setPlatform] = useState('');
    const [redirectTo, setRedirectTo] = useState('');

    const handleSignInSignUp = () => {
        // You can handle sign-in/sign-up logic here
        // For demonstration, let's just display user information
        console.log(`Username: ${username}, Email: ${email}, Role: ${role}, Platform: ${platform}`);

        // If username is not empty and role is admin, set redirectTo to /viewproducts
        if (username.trim() !== '' && role === 'admin') {
            setRedirectTo('/viewproducts');
        }
        // If username is not empty and role is engager, set redirectTo to /feed
        else if (username.trim() !== '' && role === 'engager') {
            setRedirectTo('/postsfeed');
        }
    };

    const handleRoleChange = (event) => {
        setRole(event.target.value);
        // Clear email when role changes
        setEmail('');
    };

    const handlePlatformChange = (event) => {
        setPlatform(event.target.value);
    };

    if (redirectTo) {
        // Redirect to the appropriate page
        window.location.href = redirectTo;
        return null;
    }

    return (
        <Container maxWidth="sm" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div style={{ textAlign: 'center' }}>
                <Typography variant="h4" gutterBottom>
                    Social Media Sentiment Analysis
                </Typography>
                <Card>
                    <CardContent style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <TextField
                            label="Username"
                            variant="outlined"
                            fullWidth
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <Select
                            value={role}
                            onChange={handleRoleChange}
                            fullWidth
                            variant="outlined"
                            displayEmpty
                        >
                            <MenuItem value="" disabled>
                                Select Role
                            </MenuItem>
                            <MenuItem value="engager">Engager</MenuItem>
                            <MenuItem value="admin">Admin</MenuItem>
                        </Select>
                        {role === 'engager' && (
                            <TextField
                                label="Email (Optional)"
                                variant="outlined"
                                fullWidth
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        )}
                        {role && (
                            <Select
                                value={platform}
                                onChange={handlePlatformChange}
                                fullWidth
                                variant="outlined"
                                displayEmpty
                            >
                                <MenuItem value="" disabled>
                                    Select Platform
                                </MenuItem>
                                <MenuItem value="instagram">Instagram</MenuItem>
                                <MenuItem value="facebook">Facebook</MenuItem>
                            </Select>
                        )}
                        <Button variant="contained" color="primary" fullWidth onClick={handleSignInSignUp}>
                            Sign In / Sign Up
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </Container>
    );
};

export default MainPage;
