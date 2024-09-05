import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Card, CardContent, CardActions, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff, Person } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { adminCheck } from '../services/userService';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loginError, setLoginError] = useState('');  // State to handle login errors
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            // Call the adminCheck function with username and password
            const response = await adminCheck(username, password);
            console.log("status=",response);

            
            // Check if response indicates success and contains a token
            if (response.status == 'success' && response.token) {
                // Store the token in localStorage or sessionStorage
                sessionStorage.setItem('authToken', response.token);
                sessionStorage.setItem('role','true');
                console.log("ok token=",response.token);
                
                // Navigate to the list page
                navigate('/list');
            } else {
                // Set an error message if the login is invalid
                setLoginError('שם המשתמש או הסיסמה אינם נכונים');
            }
        } catch (error) {
            console.error('Login error:', error);
            setLoginError('אירעה שגיאה במהלך הכניסה');
        }
    };

    const handleClickShowPassword = () => setShowPassword(!showPassword);

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f0f0' }}>
            <Card sx={{ maxWidth: 400, width: '100%', padding: 2, borderRadius: 2, boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
                <CardContent>
                    <Typography variant="h4" align="center" sx={{ marginBottom: 2, fontFamily: 'Roboto', fontWeight: 'bold' }}>
                        כניסת מנהל
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="שם משתמש"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            fullWidth
                            required
                            sx={{ marginBottom: 2 }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Person />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            label="סיסמא"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            fullWidth
                            required
                            sx={{ marginBottom: 2 }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <IconButton onClick={handleClickShowPassword}>
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        {loginError && (
                            <Typography variant="body2" color="error" align="center" sx={{ marginBottom: 2 }}>
                                {loginError}
                            </Typography>
                        )}
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{
                                borderRadius: '20px',
                                padding: '10px',
                                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
                                '&:hover': {
                                    boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.3)',
                                },
                            }}
                        >
                            כניסת מנהל
                        </Button>
                    </form>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center' }}>
                    <Typography variant="body2" color="textSecondary">
                        <a href="/home" style={{ textDecoration: 'none', color: '#1976d2' }}>חזרה לדף הבית</a>
                    </Typography>
                </CardActions>
            </Card>
        </Box>
    );
};

export default AdminLogin;
